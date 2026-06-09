import mongoose from "mongoose";

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

    // ── Plan ──────────────────────────────────────────────────────
    plan_type: {
        type: String,
        required: [true, 'Plan type is required'],
        enum: {
            values: ['Starter', 'Pro', 'Enterprise'],
            message: 'Plan must be Starter, Pro, or Enterprise'
        },
        default: 'Pro'
    },

    // ── Terms & Services ──────────────────────────────────────────
    agreed_to_terms: {
        type: Boolean,
        default: false,
        required: [true, 'Must agree to Terms & Services']
    },
    terms_accepted_at: {
        type: Date,
        default: null
    },
    terms_version: {
        type: String,
        default: '1.0'
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