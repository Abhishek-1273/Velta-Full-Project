import { Plan } from '../models/Plan.model.js';
import { sendToWebhook } from '../utils/webhook.js';

const VALID_PLANS = ['Starter', 'Pro', 'Enterprise'];

// ── POST /api/plan/create ────────────────────────────────────────
const createPlan = async (req, res) => {
    const {
        owner_name, business_name, email, phone, plan_type,
        agreed_to_terms, raw_data,
    } = req.body;

    // ── 1. Validate required fields ───────────────────────────────
    const fieldErrors = {};

    if (!owner_name?.trim())
        fieldErrors.owner_name = 'Owner name is required';

    if (!business_name?.trim())
        fieldErrors.business_name = 'Business name is required';

    if (!email?.trim())
        fieldErrors.email = 'Email address is required';
    else if (!/^\S+@\S+\.\S+$/.test(email.trim()))
        fieldErrors.email = 'Enter a valid email address';

    if (!phone?.trim())
        fieldErrors.phone = 'Phone number is required';
    else if (phone.trim().replace(/[^0-9]/g, '').length < 7 || phone.trim().length > 15)
        fieldErrors.phone = 'Phone number must be 7–15 digits';

    if (!plan_type)
        fieldErrors.plan_type = 'Plan type is required';
    else if (!VALID_PLANS.includes(plan_type))
        fieldErrors.plan_type = `Plan must be one of: ${VALID_PLANS.join(', ')}`;

    if (!agreed_to_terms)
        fieldErrors.agreed_to_terms = 'You must agree to Terms & Services';

    if (Object.keys(fieldErrors).length) {
        return res.status(400).json({
            success: false,
            message: 'Please fix the errors below.',
            errors: fieldErrors,
        });
    }

    try {
        // ── 2. Save to MongoDB ─────────────────────────────────────
        const newPlan = await Plan.create({
            owner_name:        owner_name.trim(),
            business_name:     business_name.trim(),
            email:             email.trim().toLowerCase(),
            phone:             phone.trim(),
            plan_type,
            agreed_to_terms:   Boolean(agreed_to_terms),
            terms_accepted_at: new Date(),
            terms_version:     '1.0',
            raw_data:          raw_data || {},
        });

        console.log('✅ Plan saved — ID:', newPlan._id);

        // ── 3. Notify n8n (non-blocking) ───────────────────────────
        sendToWebhook(process.env.N8N_PLAN_WEBHOOK, {
            event:             'plan_submission',
            id:                String(newPlan._id),
            owner_name:        newPlan.owner_name,
            business_name:     newPlan.business_name,
            email:             newPlan.email,
            phone:             newPlan.phone,
            plan_type:         newPlan.plan_type,
            agreed_to_terms:   newPlan.agreed_to_terms,
            terms_accepted_at: newPlan.terms_accepted_at,
            submittedAt:       new Date().toISOString(),
        });

        // ── 4. Respond ────────────────────────────────────────────
        return res.status(201).json({
            success: true,
            message: 'Plan submitted successfully.',
            data: {
                id:        newPlan._id,
                plan_type: newPlan.plan_type,
                status:    newPlan.status,
            },
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.fromEntries(
                Object.entries(err.errors).map(([k, v]) => [k, v.message])
            );
            return res.status(400).json({ success: false, message: 'Validation failed.', errors });
        }

        console.error('❌ plan controller error:', err.message);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

export default createPlan;