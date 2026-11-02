import express from 'express';
import { signin, signout, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public signup is disabled for security (Internal admin access only)
router.post('/signup', (_req, res) => {
    res.status(403).json({ success: false, message: 'Public registrations are disabled.' });
});

router.post('/signin', signin);
router.post('/signout', signout);
router.get('/me', protect, getMe);

export default router;
