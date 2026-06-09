import 'dotenv/config' 
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import contactRouter from './routes/contact.routes.js';
import planRouter from './routes/plan.routes.js';
import chatRouter from './routes/chat.routes.js'


// ── Validate critical env vars early ─────────────────────────────
const REQUIRED_ENV = ['MONGO_URI', 'JWT_SECRET'];
const missing = REQUIRED_ENV.filter(k => !process.env[k]);
if (missing.length) {
    console.error(`❌ Missing required env vars: ${missing.join(', ')}`);
    process.exit(1);
}

const app = express();

app.set('trust proxy', 1)

// ── Connect MongoDB ───────────────────────────────────────────────
connectDB();

// ── CORS ──────────────────────────────────────────────────────────
// ── CORS ──────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map(o => o.trim().replace(/\/$/, '')); // strip trailing slash

app.use(cors({
    origin: (origin, cb) => {
        if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
            return cb(null, true);
        }
        return cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
}));

// ── Body & Cookie parsing ─────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));   // cap payload size
app.use(cookieParser());

// ── Simple in-process rate limiter for auth endpoints ─────────────
// Replace with express-rate-limit + Redis for multi-instance deploys:
//   npm install express-rate-limit
const authAttempts = new Map();  // ip → { count, resetAt }
const AUTH_WINDOW  = 15 * 60 * 1000;  // 15 min
const AUTH_LIMIT   = 20;

app.use('/api/auth/signin', (req, res, next) => {
    const ip  = req.ip;
    const now = Date.now();
    const rec = authAttempts.get(ip);

    if (rec && now < rec.resetAt) {
        if (rec.count >= AUTH_LIMIT) {
            const wait = Math.ceil((rec.resetAt - now) / 60000);
            return res.status(429).json({
                success: false,
                message: `Too many sign-in attempts. Please try again in ${wait} minute${wait !== 1 ? 's' : ''}.`,
            });
        }
        rec.count++;
    } else {
        authAttempts.set(ip, { count: 1, resetAt: now + AUTH_WINDOW });
    }

    next();
});

// ── Routes ────────────────────────────────────────────────────────
app.use('/api/auth',    authRoutes);
app.use('/api/contact', contactRouter);
app.use('/api/plan',    planRouter);
app.use("/api/chat", chatRouter);

// ── Health check ──────────────────────────────────────────────────
app.get('/', (_req, res) => {
    res.json({ status: 'OK', message: 'Velta API running', env: process.env.NODE_ENV });
});

// ── 404 for unknown API routes ────────────────────────────────────
app.use('/api', (_req, res) => {
    res.status(404).json({ success: false, message: 'API endpoint not found.' });
});

// ── Global error handler ──────────────────────────────────────────
// Catches anything passed to next(err)
app.use((err, req, res, _next) => {
    console.error('❌ Unhandled error:', err.stack);

    // Don't leak internal details in production
    const message = process.env.NODE_ENV === 'production'
        ? 'Internal server error.'
        : (err.message || 'Internal server error.');

    res.status(err.status || 500).json({ success: false, message });
});

// ── Start server ──────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT} [${process.env.NODE_ENV || 'development'}]`);
});
