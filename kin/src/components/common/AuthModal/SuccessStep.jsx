import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

// Confetti burst — pure CSS/JS, no library needed
function ConfettiBurst() {
  const pieces = Array.from({ length: 22 });
  const colors = ['#C9940A', '#B8860B', '#ffffff', '#fde68a', '#A67A08', '#f9a825'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {pieces.map((_, i) => {
        const color = colors[i % colors.length];
        const left  = `${10 + Math.random() * 80}%`;
        const delay = Math.random() * 0.5;
        const size  = 5 + Math.random() * 7;
        const rotate= Math.random() * 360;
        const drift = (Math.random() - 0.5) * 120;
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: '30%',
              left,
              width: size,
              height: size * (Math.random() > 0.5 ? 1 : 2.5),
              background: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              rotate,
            }}
            initial={{ y: 0, opacity: 1, x: 0 }}
            animate={{
              y: [0, -80 - Math.random() * 60, 200],
              x: [0, drift],
              opacity: [1, 1, 0],
              rotate: rotate + Math.random() * 360,
            }}
            transition={{ duration: 1.2 + Math.random() * 0.6, delay, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

export default function SuccessStep({ isNew, userName, pendingRedirect, onDone, lightTheme = false }) {
  // Auto-close after 3.5s
  useEffect(() => {
    const t = setTimeout(() => onDone(), 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  const firstName = userName?.split(' ')[0] || 'there';

  return (
    <motion.div
      key="success-step"
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative text-center py-6 space-y-5 overflow-hidden"
    >
      <ConfettiBurst />

      {/* Gold ring pulse + checkmark */}
      <div className="relative flex items-center justify-center">
        {/* Outer pulse ring */}
        <motion.div
          className="absolute w-24 h-24 rounded-full"
          style={{ border: '2px solid rgba(201,148,10,0.3)' }}
          animate={{ scale: [1, 1.4, 1.6], opacity: [0.6, 0.2, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8 }}
        />
        {/* Inner pulse ring */}
        <motion.div
          className="absolute w-20 h-20 rounded-full"
          style={{ border: '2px solid rgba(201,148,10,0.5)' }}
          animate={{ scale: [1, 1.3], opacity: [0.8, 0] }}
          transition={{ duration: 1, delay: 0.15, repeat: Infinity, repeatDelay: 0.8 }}
        />
        {/* Icon circle */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.1 }}
          className="relative w-16 h-16 rounded-full flex items-center justify-center z-10"
          style={{ background: 'linear-gradient(135deg, #B8860B, #C9940A)', boxShadow: '0 0 30px rgba(201,148,10,0.4)' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
          >
            <Sparkles className="w-7 h-7 text-white" />
          </motion.div>
        </motion.div>
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="space-y-2 px-4"
      >
        <h3 className={`font-display font-bold text-2xl ${lightTheme ? 'text-navy' : 'text-white'}`}>
          {isNew ? `Welcome aboard, ${firstName}! 🎉` : `Welcome back, ${firstName}! 👋`}
        </h3>
        <p className={`text-xs leading-relaxed max-w-[260px] mx-auto ${lightTheme ? 'text-ink-muted' : 'text-white/60'}`}>
          {isNew
            ? "You're all set! Explore verified properties, save your favorites, and connect with owners directly."
            : "Great to have you back! Your wishlist and preferences are right where you left them."}
        </p>
      </motion.div>

      {/* CTA button */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onDone}
        className="btn-primary text-white mx-auto py-2.5 px-7 text-xs"
      >
        {pendingRedirect ? 'Continue to Service' : 'Explore Properties'}
        <ArrowRight className="w-3.5 h-3.5" />
      </motion.button>

      {/* Auto-close hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className={`text-[10px] ${lightTheme ? 'text-ink-soft' : 'text-white/30'}`}
      >
        Redirecting automatically…
      </motion.p>
    </motion.div>
  );
}
