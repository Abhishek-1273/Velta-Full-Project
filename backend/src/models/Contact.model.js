import mongoose from "mongoose";

// Allowed values for the dropdown fields - supports both en-dash and standard hyphen
export const PROJECT_TYPES = ['Website', 'Application', 'Automation', 'Marketing / Content', 'SEO', 'Other'];
export const BUDGET_RANGES = [
    'Under $500',
    '$500 – $2,000',
    '$500 - $2,000',
    '$2,000 – $5,000',
    '$2,000 - $5,000',
    '$5,000 – $10,000',
    '$5,000 - $10,000',
    '$10,000+',
    'Not sure yet'
];
export const TIMELINES = [
    'As soon as possible',
    'Within 1 month',
    '1–3 months',
    '1-3 months',
    '3+ months',
    'Flexible'
];

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    businessName: {
        type: String,
        trim: true,
        maxlength: 150,
        default: '',
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        maxlength: 254,
        match: [/^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/, "Invalid email"]
    },
    country: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    projectType: {
        type: String,
        required: true,
        enum: PROJECT_TYPES,
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
    budgetRange: {
        type: String,
        default: '',
    },
    timeline: {
        type: String,
        default: '',
    },
}, {
    timestamps: true
});

export const Contact = mongoose.model("Contact", contactSchema);
