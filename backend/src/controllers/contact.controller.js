import { Contact } from '../models/Contact.model.js';
import { Resend } from 'resend';
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Send notification email to owner ─────────────────────────────
const sendNotificationEmail = async ({ fullName, businessName, phoneNumber, email, message }) => {
    await resend.emails.send({
        from: 'VeltaZ Contact <onboarding@resend.dev>',
        to: process.env.NOTIFY_EMAIL,
        subject: `🔔 New Lead: ${fullName} — ${businessName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 12px;">
                <h2 style="color: #0091a1; margin-bottom: 4px;">New Contact Form Submission</h2>
                <p style="color: #666; margin-top: 0;">Someone filled your contact form on VeltaZ</p>
                
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

                <div style="margin-top: 20px;">
                    <a href="tel:${phoneNumber}" style="background: #0091a1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; margin-right: 10px;">📞 Call Now</a>
                    <a href="https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}" style="background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">💬 WhatsApp</a>
                </div>

                <p style="color: #aaa; font-size: 12px; margin-top: 24px;">
                    Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                </p>
            </div>
        `,
    });
};

// ── POST /api/contact ────────────────────────────────────────────
const createContact = async (req, res) => {
    const { fullName, businessName, phoneNumber, email, message } = req.body;

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
        return res.status(400).json({ success: false, message: 'Please fix the errors below.', errors: fieldErrors });
    }

    try {
        const newContact = await Contact.create({
            fullName: fullName.trim(),
            businessName: businessName.trim(),
            phoneNumber: phoneNumber.trim(),
            email: email.trim().toLowerCase(),
            message: message?.trim() || '',
        });

        console.log('✅ Contact saved — ID:', newContact._id);

        // Non-blocking email + webhook
        sendNotificationEmail({
            fullName: newContact.fullName,
            businessName: newContact.businessName,
            phoneNumber: newContact.phoneNumber,
            email: newContact.email,
            message: newContact.message,
        }).then(() => console.log('✅ Email sent!'))
            .catch(err => console.error('⚠️ Email failed:', err.message));



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