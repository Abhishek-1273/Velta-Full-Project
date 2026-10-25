import { motion } from 'framer-motion';

/* ── Confetti burst — same style as AuthModal SuccessStep ── */
function ConfettiBurst({ accent }) {
  const pieces = Array.from({ length: 18 });
  const colors = [accent, '#ffffff', '#fde68a', `${accent}99`, '#fff7d6', accent];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {pieces.map((_, i) => {
        const color  = colors[i % colors.length];
        const left   = `${8 + Math.random() * 84}%`;
        const delay  = Math.random() * 0.45;
        const size   = 4 + Math.random() * 6;
        const rotate = Math.random() * 360;
        const drift  = (Math.random() - 0.5) * 100;
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
              y: [0, -70 - Math.random() * 50, 180],
              x: [0, drift],
              opacity: [1, 1, 0],
              rotate: rotate + Math.random() * 320,
            }}
            transition={{ duration: 1.1 + Math.random() * 0.5, delay, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

/* ── Animated SVG Tick (drawn stroke) ── */
function AnimatedTick() {
  return (
    <svg
      width="30"
      height="24"
      viewBox="0 0 30 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-5 sm:w-7 sm:h-6"
    >
      <motion.path
        d="M2 12L10.5 21L28 2"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
      />
    </svg>
  );
}

/**
 * FormSuccessStep
 * ---------------
 * Props:
 *   accent       — service color (e.g. '#3B82F6')
 *   title        — heading text  (default: 'Request Received!')
 *   subtitle     — body text
 *   onReset      — callback for "Submit another request" button
 */
export default function FormSuccessStep({
  accent = '#A67A08',
  title = 'Request Received!',
  subtitle = "We've received your request. An advisor will get in touch with you shortly.",
  onReset,
}) {
  const ring1Color = `${accent}30`;
  const ring2Color = `${accent}50`;
  const glowColor  = `${accent}40`;

  return (
    <motion.div
      key="form-success"
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -16 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="relative py-8 sm:py-10 text-center overflow-hidden"
    >
      <ConfettiBurst accent={accent} />

      {/* ── Pulse rings + tick circle ── */}
      <div className="relative flex items-center justify-center mb-5 sm:mb-6">

        {/* Outer pulse ring */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: 88, height: 88, border: `2px solid ${ring1Color}` }}
          animate={{ scale: [1, 1.45, 1.65], opacity: [0.55, 0.18, 0] }}
          transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 0.9 }}
        />

        {/* Inner pulse ring */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: 70, height: 70, border: `2px solid ${ring2Color}` }}
          animate={{ scale: [1, 1.28], opacity: [0.75, 0] }}
          transition={{ duration: 1.05, delay: 0.18, repeat: Infinity, repeatDelay: 0.9 }}
        />

        {/* Icon circle — spring pop-in */}
        <motion.div
          initial={{ scale: 0, rotate: -25 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.1 }}
          className="relative z-10 flex items-center justify-center rounded-full"
          style={{
            width: 58,
            height: 58,
            background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
            boxShadow: `0 0 28px ${glowColor}`,
          }}
        >
          <AnimatedTick />
        </motion.div>
      </div>

      {/* ── Text ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
        className="space-y-2 px-4"
      >
        <h3 className="font-display font-bold text-lg sm:text-xl text-navy dark:text-white">
          {title}
        </h3>
        <p className="text-xs sm:text-[13px] text-ink-muted dark:text-white/50 leading-relaxed max-w-[280px] mx-auto font-body">
          {subtitle}
        </p>
      </motion.div>

      {/* ── Reset button ── */}
      {onReset && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
          onClick={onReset}
          className="mt-5 sm:mt-6 text-[11px] sm:text-xs font-semibold underline underline-offset-2 transition-opacity hover:opacity-70"
          style={{ color: accent }}
        >
          Submit another request
        </motion.button>
      )}
    </motion.div>
  );
}
