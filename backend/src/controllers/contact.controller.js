import { Contact } from '../models/Contact.model.js';
import { sendToWebhook } from '../utils/webhook.js';
import nodemailer from 'nodemailer';

// ── Nodemailer transporter ────────────────────────────────────────
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NOTIFY_EMAIL,        // gmail
        pass: process.env.NOTIFY_EMAIL_PASS,   // gmail app password
    },
});

// ── Send notification email to owner ─────────────────────────────
const sendNotificationEmail = async ({ fullName, businessName, phoneNumber, email, message }) => {
    const mailOptions = {
        from: `"Velta Contact Form" <${process.env.NOTIFY_EMAIL}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: `🔔 New Lead: ${fullName} — ${businessName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 12px;">
                <h2 style="color: #0091a1; margin-bottom: 4px;">New Contact Form Submission</h2>
                <p style="color: #666; margin-top: 0;">Someone filled your contact form on Velta</p>
                
                <div style="background: white; border-radius: 10px; padding: 24px; margin-top: 20px; border: 1px solid #e5e5e5;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; color: #888; font-size: 13px; width: 140px;">👤 Name</td>
                            <td style="padding: 10px 0; font-weight: 600; color: #222;">${fullName}</td>
                        </tr>
                        <tr style="border-top: 1px solid #f0f0f0;">
                            <td style="padding: 10px 0; color: #888; font-size: 13px;">🏢 Business</td>
                            <td style="padding: 10px 0; font-weight: 600; color: #222;">${businessName}</td>
                        </tr>
                        <tr style="border-top: 1px solid #f0f0f0;">
                            <td style="padding: 10px 0; color: #888; font-size: 13px;">📞 Phone</td>
                            <td style="padding: 10px 0; font-weight: 600; color: #222;">
                                <a href="tel:${phoneNumber}" style="color: #0091a1;">${phoneNumber}</a>
                            </td>
                        </tr>
                        <tr style="border-top: 1px solid #f0f0f0;">
                            <td style="padding: 10px 0; color: #888; font-size: 13px;">📧 Email</td>
                            <td style="padding: 10px 0; font-weight: 600; color: #222;">
                                <a href="mailto:${email}" style="color: #0091a1;">${email}</a>
                            </td>
                        </tr>
                        ${message ? `
                        <tr style="border-top: 1px solid #f0f0f0;">
                            <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">💬 Message</td>
                            <td style="padding: 10px 0; color: #444; line-height: 1.6;">${message}</td>
                        </tr>
                        ` : ''}
                    </table>
                </div>

                <div style="margin-top: 20px; display: flex; gap: 12px;">
                    <a href="tel:${phoneNumber}" style="background: #0091a1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; margin-right: 10px;">📞 Call Now</a>
                    <a href="https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}" style="background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">💬 WhatsApp</a>
                </div>

                <p style="color: #aaa; font-size: 12px; margin-top: 24px;">
                    Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                </p>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};

// ── POST /api/contact ────────────────────────────────────────────
const createContact = async (req, res) => {
    const { fullName, businessName, phoneNumber, email, message } = req.body;

    // ── 1. Validate ───────────────────────────────────────────────
    const fieldErrors = {};
    if (!fullName?.trim()) fieldErrors.fullName = 'Full name is required';
    if (!businessName?.trim()) fieldErrors.businessName = 'Business name is required';
    if (!phoneNumber?.trim()) fieldErrors.phoneNumber = 'Phone number is required';
    else if (!/^[0-9+\s\-]{7,15}$/.test(phoneNumber.trim()))
        fieldErrors.phoneNumber = 'Phone number must be 7–15 digits';
    if (!email?.trim()) fieldErrors.email = 'Email address is required';
    else if (!/^\S+@\S+\.\S+$/.test(email.trim()))
        fieldErrors.email = 'Enter a valid email address';

    if (Object.keys(fieldErrors).length) {
        return res.status(400).json({
            success: false,
            message: 'Please fix the errors below.',
            errors: fieldErrors,
        });
    }

    try {
        // ── 2. Save to MongoDB ─────────────────────────────────────
        const newContact = await Contact.create({
            fullName: fullName.trim(),
            businessName: businessName.trim(),
            phoneNumber: phoneNumber.trim(),
            email: email.trim().toLowerCase(),
            message: message?.trim() || '',
        });

        console.log('✅ Contact saved — ID:', newContact._id);

        // ── 3. Send email + n8n webhook (non-blocking) ─────────────
        sendNotificationEmail({
            fullName: newContact.fullName,
            businessName: newContact.businessName,
            phoneNumber: newContact.phoneNumber,
            email: newContact.email,
            message: newContact.message,
        }).catch(err => console.error('⚠️ Email notification failed:', err.message));

        sendToWebhook(process.env.N8N_CONTACT_WEBHOOK, {
            event: 'contact_form',
            id: String(newContact._id),
            fullName: newContact.fullName,
            businessName: newContact.businessName,
            phoneNumber: newContact.phoneNumber,
            email: newContact.email,
            message: newContact.message,
            submittedAt: new Date().toISOString(),
        });

        // ── 4. Respond ────────────────────────────────────────────
        return res.status(201).json({
            success: true,
            message: 'Message sent successfully.',
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.fromEntries(
                Object.entries(err.errors).map(([k, v]) => [k, v.message])
            );
            return res.status(400).json({ success: false, message: 'Validation failed.', errors });
        }

        console.error('❌ contact controller error:', err.message);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

export default createContact;