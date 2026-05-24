import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

// ── Helper: sign JWT and set httpOnly cookie ─────────────────────
const sendTokenCookie = (res, user) => {
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // ensure NODE_ENV=production in prod
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,  // 1 day in ms
    });

    return token;
};

// ── Helper: strip sensitive fields before sending to client ───────
const safeUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
});

// ── POST /api/auth/signup ────────────────────────────────────────
export const signup = async (req, res) => {
    try {
        const { name, email, phone, business, password } = req.body;

        // ── Validate required fields ──────────────────────────────
        const missing = [];
        if (!name?.trim())     missing.push('name');
        if (!email?.trim())    missing.push('email');
        if (!password)         missing.push('password');

        if (missing.length) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missing.join(', ')}`,
            });
        }

        // ── Email format ──────────────────────────────────────────
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ success: false, message: 'Enter a valid email address.' });
        }

        // ── Password strength (mirrors frontend rules) ────────────
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
        }

        // ── Duplicate check ───────────────────────────────────────
        const existing = await User.findOne({ email: email.toLowerCase().trim() });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists. Please sign in.',
            });
        }

        const user = await User.create({ name: name.trim(), email, phone, password });
        sendTokenCookie(res, user);

        return res.status(201).json({
            success: true,
            message: 'Account created successfully.',
            user: safeUser(user),
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists.',
            });
        }
        console.error('❌ signup error:', err.message);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

// ── POST /api/auth/signin ────────────────────────────────────────
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        // select('+password') because the field is select:false by default
        const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

        // Use identical message for wrong email OR wrong password to prevent
        // user enumeration attacks
        const invalid = () =>
            res.status(401).json({ success: false, message: 'Invalid email or password.' });

        if (!user) return invalid();

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return invalid();

        sendTokenCookie(res, user);

        return res.json({
            success: true,
            message: 'Signed in successfully.',
            user: safeUser(user),
        });
    } catch (err) {
        console.error('❌ signin error:', err.message);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

// ── POST /api/auth/signout ───────────────────────────────────────
export const signout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
    return res.json({ success: true, message: 'Signed out successfully.' });
};

// ── GET /api/auth/me ─────────────────────────────────────────────
// Called by the Data Router root loader on every navigation to restore session.
export const getMe = (req, res) => {
    return res.json({ success: true, user: safeUser(req.user) });
};
