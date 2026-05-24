import { Contact } from '../models/Contact.model.js';
import { sendToWebhook } from '../utils/webhook.js';

// ── POST /api/contact ────────────────────────────────────────────
const createContact = async (req, res) => {
    const { fullName, businessName, phoneNumber, email, message } = req.body;

    // ── 1. Validate ───────────────────────────────────────────────
    const fieldErrors = {};
    if (!fullName?.trim())       fieldErrors.fullName = 'Full name is required';
    if (!businessName?.trim())   fieldErrors.businessName = 'Business name is required';
    if (!phoneNumber?.trim())    fieldErrors.phoneNumber = 'Phone number is required';
    else if (!/^[0-9+\s\-]{7,15}$/.test(phoneNumber.trim()))
        fieldErrors.phoneNumber = 'Phone number must be 7–15 digits';
    if (!email?.trim())          fieldErrors.email = 'Email address is required';
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
            fullName:     fullName.trim(),
            businessName: businessName.trim(),
            phoneNumber:  phoneNumber.trim(),
            email:        email.trim().toLowerCase(),
            message:      message?.trim() || '',
        });

        console.log('✅ Contact saved — ID:', newContact._id);

        // ── 3. Notify n8n (non-blocking) ───────────────────────────
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
        // Mongoose validation errors
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
