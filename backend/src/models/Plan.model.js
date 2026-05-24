import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true }
}, { _id: false });

const planSchema = new mongoose.Schema({

    // ── Business Info ──────────────────────────────────────────────
    owner_name: {
        type: String,
        required: [true, 'Owner name is required'],
        trim: true
    },
    business_name: {
        type: String,
        required: [true, 'Business name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        minlength: [8, 'Phone too short'],
        maxlength: [15, 'Phone too long']
    },
    industry: {
        type: String,
        trim: true,
        lowercase: true
    },
    address: {
        type: String,
        trim: true
    },
    business_description: {
        type: String,
        trim: true
    },

    // ── Plan ──────────────────────────────────────────────────────
    plan_type: {
        type: String,
        required: [true, 'Plan type is required'],
        enum: {
            values: ['starter', 'growth', 'enterprise'],
            message: 'Plan must be starter, growth, or enterprise'
        },
        default: 'growth'
    },

    // ── Features ──────────────────────────────────────────────────
    features_selected: {
        type: [String],
        enum: {
            values: ['ai', 'rag', 'bulk', 'followup', 'dashboard'],
            message: 'Invalid feature: {VALUE}'
        },
        default: []
    },
    rag_enabled: {
        type: Boolean,
        default: false
    },

    // ── API Keys ──────────────────────────────────────────────────
    whatsapp_number: {
        type: String,
        trim: true
    },
    whatsapp_api_key: {
        type: String,
        trim: true
    },
    openai_api_key: {
        type: String,
        trim: true
    },

    // ── Team ──────────────────────────────────────────────────────
    employees: {
        type: [employeeSchema],
        default: []
    },

    // ── AI Config ─────────────────────────────────────────────────
    system_prompt: {
        type: String,
        trim: true
    },
    questions: {
        type: String,
        trim: true
    },

    // ── Meta ──────────────────────────────────────────────────────
    raw_data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    }

}, { timestamps: true });

export const Plan = mongoose.model('Plan', planSchema);