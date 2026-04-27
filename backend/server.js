import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import contactRouter from "./api/routes/contact.routes.js";
import planRouter from "./api/routes/plan.routes.js"; 
import cors from 'cors';

// ── CORS — allow React frontend ───────────────────────────────────
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
}));

// ── Routes ────────────────────────────────────────────────────────
app.use('/api', contactRouter);
app.use('/api', planRouter)

// ── Health check ──────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.json({ status: 'Velta backend is running ✅' });
});

// ── Connect DB & Start Server ─────────────────────────────────────
const port = process.env.PORT || 5000;
connectDB();

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});