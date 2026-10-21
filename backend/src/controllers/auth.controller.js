import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

// Helper: Sign JWT and set cookie
const sendTokenCookie = (res, user) => {
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000,
    });

    return token;
};

// Helper: Strip sensitive fields
const safeUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
});

// Signup
export const signup = async (req, res) => {
    try {
        const { name, email, phone, business, password } = req.body;

        // Validate required fields
        const missing = [];
        if (!name?.trim()) missing.push('name');
        if (!email?.trim()) missing.push('email');
        if (!password) missing.push('password');

        if (missing.length) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missing.join(', ')}`,
            });
        }

        // Email format validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ success: false, message: 'Enter a valid email address.' });
        }

        // Password strength validation
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
        }

        // Duplicate check
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
        console.error('Signup error:', err.message);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

// Signin
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

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
        console.error('Signin error:', err.message);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

// Signout
export const signout = (req, res) => {
    const isProd = process.env.NODE_ENV === 'production';
    res.clearCookie('token', {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
    });
    return res.json({ success: true, message: 'Signed out successfully.' });
};

// Get Current User
export const getMe = (req, res) => {
    return res.json({ success: true, user: safeUser(req.user) });
};
