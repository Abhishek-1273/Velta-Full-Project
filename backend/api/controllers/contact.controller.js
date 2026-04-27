import { Contact } from '../models/contact.model.js';

// ─────────────────────────────────────────────────────────────────
// WEBHOOK HELPER — Fire & Forget (same as demo controller)
// ─────────────────────────────────────────────────────────────────
const sendToWebhook = async (url, payload) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            console.warn(`⚠️  Webhook responded with status: ${response.status}`);
        } else {
            console.log('✅ n8n webhook notified successfully');
        }
    } catch (err) {
        console.error('❌ Webhook call failed (non-critical):', err.message);
    }
};

// ─────────────────────────────────────────────────────────────────
// CONTROLLER — POST /api/contact
//
// Flow:
//   1. Validate request body
//   2. Save to MongoDB  ← primary, must succeed
//   3. Send to n8n      ← secondary, failure is safe
//   4. Respond to frontend
// ─────────────────────────────────────────────────────────────────
const createContact = async (req, res) => {
    const { fullName, businessName, phoneNumber, email, message } = req.body;

    // ── 1. Validate ───────────────────────────────────────────────
    if (!fullName || !businessName || !phoneNumber || !email) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    try {
        // ── 2. Save to MongoDB ────────────────────────────────────────
        const newContact = await Contact.create({
            fullName,
            businessName,
            phoneNumber,
            email,
            message
        });

        console.log('✅ Contact saved to MongoDB — ID:', newContact._id);

        // ── 3. Send to n8n Webhook (non-blocking) ────────────────────
        const webhookUrl = process.env.N8N_CONTACT_WEBHOOK;

        if (webhookUrl) {
            sendToWebhook(webhookUrl, {
                event: 'contact_form',
                id: newContact._id,
                fullName,
                businessName,
                phoneNumber,
                email,
                message,
                submittedAt: new Date().toISOString()
            });
        } else {
            console.warn('⚠️  N8N_CONTACT_WEBHOOK not set in .env — skipping webhook');
        }

        // ── 4. Respond to Frontend ────────────────────────────────────
        return res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: newContact
        });

    } catch (err) {
        console.error('❌ Contact controller error:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message
        });
    }
};

export default createContact;