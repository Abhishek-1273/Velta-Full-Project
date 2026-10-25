import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../../contexts';
import { useNavigate } from 'react-router-dom';

function ConfettiBurst() {
  const pieces = Array.from({ length: 28 });
  const colors = ['#C9940A', '#B8860B', '#ffffff', '#fde68a', '#A67A08', '#f9a825', '#fff7d6'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((_, i) => {
        const color  = colors[i % colors.length];
        const left   = `${5 + Math.random() * 90}%`;
        const delay  = Math.random() * 0.6;
        const size   = 4 + Math.random() * 7;
        const rotate = Math.random() * 360;
        const drift  = (Math.random() - 0.5) * 140;
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: '40%',
              left,
              width: size,
              height: size * (Math.random() > 0.5 ? 1 : 2.2),
              background: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              rotate,
            }}
            initial={{ y: 0, opacity: 1, x: 0 }}
            animate={{
              y: [0, -100 - Math.random() * 70, 260],
              x: [0, drift],
              opacity: [1, 1, 0],
              rotate: rotate + Math.random() * 420,
            }}
            transition={{ duration: 1.3 + Math.random() * 0.6, delay, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

export default function SuccessToast() {
  const { successData, clearSuccess, pendingRedirect } = useAuth();
  const navigate = useNavigate();

  const visible = !!successData;

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      clearSuccess();
      if (pendingRedirect) navigate(pendingRedirect);
    }, 3500);
    return () => clearTimeout(t);
  }, [visible, clearSuccess, pendingRedirect, navigate]);

  const handleDone = () => {
    clearSuccess();
    if (pendingRedirect) navigate(pendingRedirect);
  };

  const firstName = successData?.userName?.split(' ')[0] || 'there';
  const isNew     = successData?.isNew;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="success-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[300] flex items-center justify-center px-5"
          style={{ background: 'rgba(10, 14, 35, 0.75)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
          onClick={handleDone}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 36 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl overflow-hidden text-center"
            style={{
              background: 'linear-gradient(160deg, #0f1628 0%, #161e38 60%, #0f1628 100%)',
              border: '1px solid rgba(201,148,10,0.25)',
              boxShadow: '0 0 50px rgba(201,148,10,0.1), 0 20px 50px rgba(0,0,0,0.55)',
            }}
          >
            {/* Gold top line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent, #C9940A, transparent)' }}
            />

            <div className="px-6 py-8 sm:px-8 sm:py-10 space-y-5">
              <ConfettiBurst />

              {/* Pulse rings + icon */}
              <div className="relative flex items-center justify-center h-20">
                <motion.div
                  className="absolute w-24 h-24 rounded-full"
                  style={{ border: '2px solid rgba(201,148,10,0.18)' }}
                  animate={{ scale: [1, 1.5, 1.75], opacity: [0.5, 0.15, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.6 }}
                />
                <motion.div
                  className="absolute w-[72px] h-[72px] rounded-full"
                  style={{ border: '2px solid rgba(201,148,10,0.35)' }}
                  animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
                  transition={{ duration: 1.1, delay: 0.2, repeat: Infinity, repeatDelay: 0.6 }}
                />
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.1 }}
                  className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center z-10 shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #B8860B, #C9940A)',
                    boxShadow: '0 0 36px rgba(201,148,10,0.5)',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.32, type: 'spring', stiffness: 400 }}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
                className="space-y-2"
              >
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                  {isNew ? `Welcome aboard, ${firstName}! 🎉` : `Welcome back, ${firstName}! 👋`}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-white/50 max-w-[260px] mx-auto">
                  {isNew
                    ? "You're all set! Explore verified properties, save favorites, and connect with owners."
                    : "Great to have you back! Your wishlist and preferences are right where you left them."}
                </p>
              </motion.div>

              {/* CTA button */}
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleDone}
                className="btn-primary text-white mx-auto py-2.5 sm:py-3 px-7 sm:px-8 text-xs sm:text-sm w-full max-w-[220px]"
              >
                {pendingRedirect ? 'Continue to Service' : 'Explore Properties'}
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </motion.button>

              {/* Auto hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-[10px] text-white/25 pb-1"
              >
                Closing automatically in a moment…
              </motion.p>
            </div>

            {/* Gold bottom line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(201,148,10,0.3), transparent)' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
