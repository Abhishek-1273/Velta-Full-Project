import { Plan } from '../models/Plan.model.js';
import { sendToWebhook } from '../utils/webhook.js';

const VALID_PLANS    = ['starter', 'growth', 'enterprise'];
const VALID_FEATURES = ['ai', 'rag', 'bulk', 'followup', 'dashboard'];

// ── POST /api/plan ───────────────────────────────────────────────
const createPlan = async (req, res) => {
    const {
        email, raw_data, business_name, owner_name, phone, plan_type,
        whatsapp_api_key, whatsapp_number, openai_api_key,
        industry, employees, features_selected, system_prompt,
        questions, rag_enabled, business_description, address,
    } = req.body;

    // ── 1. Validate required fields ───────────────────────────────
    const fieldErrors = {};
    if (!owner_name?.trim())    fieldErrors.owner_name    = 'Owner name is required';
    if (!business_name?.trim()) fieldErrors.business_name = 'Business name is required';
    if (!email?.trim())         fieldErrors.email         = 'Email address is required';
    else if (!/^\S+@\S+\.\S+$/.test(email.trim()))
        fieldErrors.email = 'Enter a valid email address';
    if (!phone?.trim())         fieldErrors.phone         = 'Phone number is required';
    else if (phone.trim().replace(/[^0-9]/g, '').length < 7 || phone.trim().length > 15)
        fieldErrors.phone = 'Phone number must be 7–15 digits';
    if (!plan_type)             fieldErrors.plan_type     = 'Plan type is required';
    else if (!VALID_PLANS.includes(plan_type))
        fieldErrors.plan_type = `Plan must be one of: ${VALID_PLANS.join(', ')}`;

    if (features_selected && features_selected.some(f => !VALID_FEATURES.includes(f))) {
        fieldErrors.features_selected = `Invalid feature. Allowed: ${VALID_FEATURES.join(', ')}`;
    }

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
            email:               email.trim().toLowerCase(),
            raw_data:            raw_data || {},
            business_name:       business_name.trim(),
            owner_name:          owner_name.trim(),
            phone:               phone.trim(),
            plan_type,
            whatsapp_api_key:    whatsapp_api_key?.trim()   || '',
            whatsapp_number:     whatsapp_number?.trim()    || '',
            openai_api_key:      openai_api_key?.trim()     || '',
            industry:            industry?.trim().toLowerCase() || '',
            employees:           (employees || []).filter(e => e.name?.trim() && e.email?.trim()),
            features_selected:   features_selected || [],
            system_prompt:       system_prompt?.trim()      || '',
            questions:           questions?.trim()          || '',
            rag_enabled:         Boolean(rag_enabled),
            business_description: business_description?.trim() || '',
            address:             address?.trim()            || '',
        });

        console.log('✅ Plan saved — ID:', newPlan._id);

        // ── 3. Notify n8n (non-blocking) ───────────────────────────
        sendToWebhook(process.env.N8N_PLAN_WEBHOOK, {
            event: 'plan_submission',
            id: String(newPlan._id),
            email: newPlan.email,
            business_name: newPlan.business_name,
            owner_name: newPlan.owner_name,
            phone: newPlan.phone,
            plan_type: newPlan.plan_type,
            features_selected: newPlan.features_selected,
            industry: newPlan.industry,
            employees: newPlan.employees,
            rag_enabled: newPlan.rag_enabled,
            submittedAt: new Date().toISOString(),
            // NOTE: API keys intentionally excluded from webhook payload
        });

        // ── 4. Respond ────────────────────────────────────────────
        return res.status(201).json({
            success: true,
            message: 'Plan submitted successfully.',
            data: {
                id: newPlan._id,
                plan_type: newPlan.plan_type,
                status: newPlan.status,
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
