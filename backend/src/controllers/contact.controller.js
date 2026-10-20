import { Contact, PROJECT_TYPES, BUDGET_RANGES, TIMELINES } from '../models/Contact.model.js';
import { Resend } from 'resend';
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

// A retry of the same enquiry inside this window (e.g. the first request
// succeeded but the browser timed out) is treated as already received.
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;

// User input is placed inside an HTML email — always escape it.
const escapeHtml = (v = '') =>
    String(v)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

const oneLine = (v = '') => String(v).replace(/[\r\n]+/g, ' ').trim();

// ── Send notification email to owner ─────────────────────────────
const sendNotificationEmail = async ({ fullName, businessName, email, country, projectType, budgetRange, timeline, message }) => {
    const row = (label, value, first = false) => `
                        <tr${first ? '' : ' style="border-top: 1px solid #f0f0f0;"'}>
                            <td style="padding: 10px 0; color: #888; font-size: 13px; width: 140px; vertical-align: top;">${label}</td>
                            <td style="padding: 10px 0; font-weight: 600; color: #222;">${value}</td>
                        </tr>`;

    const { error } = await resend.emails.send({
        from: process.env.NOTIFY_FROM || 'VeltaZ Contact <onboarding@resend.dev>',
        to: process.env.NOTIFY_EMAIL,
        subject: `🔔 New Enquiry: ${oneLine(projectType)} — ${oneLine(fullName)}${businessName ? ` (${oneLine(businessName)})` : ''}`.slice(0, 200),
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 12px;">
                <h2 style="color: #0091a1; margin-bottom: 4px;">New Project Enquiry</h2>
                <p style="color: #666; margin-top: 0;">Someone filled in the contact form on VeltaZ</p>

                <div style="background: white; border-radius: 10px; padding: 24px; margin-top: 20px; border: 1px solid #e5e5e5;">
                    <table style="width: 100%; border-collapse: collapse;">
                        ${row('👤 Name', escapeHtml(fullName), true)}
                        ${row('🏢 Business', businessName ? escapeHtml(businessName) : '—')}
                        ${row('📧 Email', `<a href="mailto:${escapeHtml(email)}" style="color: #0091a1;">${escapeHtml(email)}</a>`)}
                        ${row('🌍 Country', escapeHtml(country))}
                        ${row('🧩 Project Type', escapeHtml(projectType))}
                        ${row('💰 Budget', budgetRange ? escapeHtml(budgetRange) : '—')}
                        ${row('⏱️ Timeline', timeline ? escapeHtml(timeline) : '—')}
                        <tr style="border-top: 1px solid #f0f0f0;">
                            <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">💬 Description</td>
                            <td style="padding: 10px 0; color: #444; line-height: 1.6;">${escapeHtml(message).replace(/\r?\n/g, '<br>')}</td>
                        </tr>
                    </table>
                </div>

                <div style="margin-top: 20px;">
                    <a href="mailto:${escapeHtml(email)}" style="background: #0091a1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">✉️ Reply by Email</a>
                </div>

                <p style="color: #aaa; font-size: 12px; margin-top: 24px;">
                    Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                </p>
            </div>
        `,
    });

    // The Resend SDK does NOT throw on API errors (bad key, unverified sender,
    // invalid recipient...) — it resolves with { error }. Surface it.
    if (error) throw new Error(error.message || 'Resend rejected the email');
};

// ── POST /api/contact ────────────────────────────────────────────
const createContact = async (req, res) => {
    const body = req.body && typeof req.body === 'object' ? req.body : {};
    const str = (v) => (typeof v === 'string' ? v.trim() : '');

    const fullName = str(body.fullName);
    const businessName = str(body.businessName);
    const email = str(body.email).toLowerCase();
    const country = str(body.country);
    const projectType = str(body.projectType);
    const message = str(body.message);
    const budgetRange = str(body.budgetRange);
    const timeline = str(body.timeline);

    const fieldErrors = {};
    if (!fullName) fieldErrors.fullName = 'Name is required';
    else if (fullName.length > 100) fieldErrors.fullName = 'Name must be 100 characters or fewer';

    if (businessName.length > 150) fieldErrors.businessName = 'Business name must be 150 characters or fewer';

    if (!email) fieldErrors.email = 'Email address is required';
    else if (email.length > 254 || !EMAIL_RE.test(email)) fieldErrors.email = 'Enter a valid email address';

    if (!country) fieldErrors.country = 'Country is required';
    else if (country.length > 100) fieldErrors.country = 'Country must be 100 characters or fewer';

    if (!projectType) fieldErrors.projectType = 'Please select a project type';
    else if (!PROJECT_TYPES.includes(projectType)) fieldErrors.projectType = 'Please select a valid project type';

    if (!message) fieldErrors.message = 'Please describe your project';
    else if (message.length < 10) fieldErrors.message = 'Please add a little more detail (at least 10 characters)';
    else if (message.length > 2000) fieldErrors.message = 'Description must be 2000 characters or fewer';

    if (budgetRange && !BUDGET_RANGES.includes(budgetRange)) fieldErrors.budgetRange = 'Please select a valid budget range';
    if (timeline && !TIMELINES.includes(timeline)) fieldErrors.timeline = 'Please select a valid timeline';

    if (Object.keys(fieldErrors).length) {
        return res.status(400).json({ success: false, message: 'Please fix the errors below.', errors: fieldErrors });
    }

    try {
        // Idempotency guard against accidental duplicate submissions / retries.
        const existing = await Contact.findOne(
            { email, projectType, message, createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) } },
            '_id'
        );
        if (existing) {
            console.log('ℹ️ Duplicate contact submission ignored — existing ID:', existing._id);
            return res.status(201).json({ success: true, message: 'Message sent successfully.' });
        }

        const newContact = await Contact.create({
            fullName, businessName, email, country, projectType, message, budgetRange, timeline,
        });

        console.log('✅ Contact saved — ID:', newContact._id);

        // Non-blocking: the enquiry is already saved, so an email problem must not
        // fail the visitor's submission — but it must be logged accurately.
        sendNotificationEmail({
            fullName: newContact.fullName,
            businessName: newContact.businessName,
            email: newContact.email,
            country: newContact.country,
            projectType: newContact.projectType,
            budgetRange: newContact.budgetRange,
            timeline: newContact.timeline,
            message: newContact.message,
        }).then(() => console.log(`✅ Notification email accepted by Resend — contact ${newContact._id}`))
            .catch(err => console.error(`⚠️ Notification email FAILED — contact ${newContact._id} is saved in the database but nobody was emailed: ${err.message}`));

        return res.status(201).json({ success: true, message: 'Message sent successfully.' });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v.message]));
            return res.status(400).json({ success: false, message: 'Validation failed.', errors });
        }
        console.error('❌ contact controller error:', err.message);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

export default createContact;