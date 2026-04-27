import { Plan } from '../models/plan.model.js';

const sendToWebhook = async (url, payload) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            console.warn(`⚠️  Plan webhook responded with status: ${response.status}`);
        } else {
            console.log('✅ n8n plan webhook notified successfully');
        }
    } catch (err) {
        console.error('❌ Plan webhook call failed (non-critical):', err.message);
    }
};

const createPlan = async (req, res) => {
    const {
        email,
        raw_data,
        business_name,
        owner_name,
        phone,
        plan_type,
        whatsapp_api_key,
        whatsapp_number,
        openai_api_key,
        industry,
        employees,
        features_selected,
        system_prompt,
        questions,
        rag_enabled,
        business_description,
        address
    } = req.body;

    // ── 1. Validate required fields ───────────────────────────────
    if (!owner_name || !business_name || !email || !phone || !plan_type) {
        return res.status(400).json({
            success: false,
            message: 'owner_name, business_name, email, phone and plan_type are required'
        });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (phone.length < 8 || phone.length > 15) {
        return res.status(400).json({ success: false, message: 'Phone number must be 8–15 digits' });
    }

    const validPlans = ['starter', 'growth', 'enterprise'];
    if (!validPlans.includes(plan_type)) {
        return res.status(400).json({ success: false, message: 'Invalid plan_type. Use starter, growth or enterprise' });
    }

    const validFeatures = ['ai', 'rag', 'bulk', 'followup', 'dashboard'];
    if (features_selected && features_selected.some(f => !validFeatures.includes(f))) {
        return res.status(400).json({ success: false, message: 'Invalid feature in features_selected' });
    }

    try {
        // ── 2. Save to MongoDB ────────────────────────────────────
        const newPlan = await Plan.create({
            email,
            raw_data:             raw_data || {},
            business_name,
            owner_name,
            phone,
            plan_type,
            whatsapp_api_key:     whatsapp_api_key  || '',
            whatsapp_number:      whatsapp_number   || '',
            openai_api_key:       openai_api_key    || '',
            industry:             industry          || '',
            employees:            employees         || [],
            features_selected:    features_selected || [],
            system_prompt:        system_prompt     || '',
            questions:            questions         || '',
            rag_enabled:          rag_enabled       || false,
            business_description: business_description || '',
            address:              address           || '',
        });

        console.log('✅ Plan saved to MongoDB — ID:', newPlan._id);

        // ── 3. Send to n8n Webhook (non-blocking) ─────────────────
        const webhookUrl = process.env.N8N_PLAN_WEBHOOK;

        if (webhookUrl) {
            sendToWebhook(webhookUrl, {
                event:                'plan_submission',
                id:                   newPlan._id,
                email,
                raw_data:             raw_data || {},
                business_name,
                owner_name,
                phone,
                plan_type,
                whatsapp_api_key,
                whatsapp_number,
                openai_api_key,
                industry,
                employees:            employees         || [],
                features_selected:    features_selected || [],
                system_prompt,
                questions,
                rag_enabled:          rag_enabled       || false,
                business_description,
                address,
                submittedAt:          new Date().toISOString()
            });
        } else {
            console.warn('⚠️  N8N_PLAN_WEBHOOK not set in .env — skipping webhook');
        }

        // ── 4. Respond to Frontend ────────────────────────────────
        return res.status(201).json({
            success: true,
            message: 'Plan submitted successfully',
            data: newPlan
        });

    } catch (err) {
        // Mongoose validation errors → 400, everything else → 500
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }

        console.error('❌ Plan controller error:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message
        });
    }
};

export default createPlan;