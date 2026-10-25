import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteSettings, getLogoInitials, renderBrandLogo } from '../../contexts';

export default function PageLoader({ onDone }) {
  const { settings, loading } = useSiteSettings();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => {
      setVisible(false);
      if (onDone) onDone();
    }, 2000);
    return () => clearTimeout(t);
  }, [loading, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="pageloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: '#071A2F' }}
        >
          {loading ? null : (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Logo box */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #B8860B 0%, #C9940A 50%, #8B6B09 100%)',
                boxShadow: '0 0 60px rgba(184,134,11,0.3)',
              }}
            >
              {settings?.logoIconImage ? (
                <img src={settings.logoIconImage} alt="Logo" className="w-full h-full object-contain" />
              ) : (
                <span className="text-navy font-display font-black text-3xl leading-none tracking-tight">
                  {getLogoInitials(settings)}
                </span>
              )}
            </div>

            {/* Brand name */}
            <div className="text-center">
              <p className="font-display font-bold text-white text-xl tracking-tight">
                {renderBrandLogo(settings, '#B8860B')}
              </p>
              <p className="text-white/40 text-[9px] font-accent tracking-[0.3em] uppercase mt-1">
                {settings?.logoSubtitle || 'Luxury Real Estate · Pune'}
              </p>
            </div>

            {/* Gold spinner */}
            <div className="relative w-10 h-10 mt-1">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2.5px solid rgba(184,134,11,0.15)',
                }}
              />
              {/* Spinning arc */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2.5px solid transparent',
                  borderTopColor: '#C9940A',
                  borderRightColor: 'rgba(201,148,10,0.4)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              />

            </div>
          </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
