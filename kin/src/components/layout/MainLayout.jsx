import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthModal from '../common/AuthModal';
import SearchModal from '../common/SearchModal';
import ScrollProgress from '../common/ScrollProgress';
import AIChatbot from '../common/AIChatbot';
import { useAuth, useSearch } from '../../contexts';

const MainLayout = () => {
  const { showAuthModal } = useAuth();
  const { showSearch } = useSearch();
  const location = useLocation();
  const lenisRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const prevPath = useRef(location.pathname);

  // ── 1.5s spinner on every route change ───────────────────────────────────
  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => {
      clearTimeout(t);
      setLoading(false);
    };
  }, [location.pathname]);

  // ── Lenis smooth scroll ──────────────────────────────────────────────────
  useEffect(() => {
    let lenis = null;
    let rafId = null;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('@studio-freight/lenis');
        lenis = new Lenis({
          // Reduced duration for snappier feel — 1.2 felt sluggish
          duration: 0.9,
          easing: (t) => 1 - Math.pow(1 - t, 3), // cubic ease-out, lighter on CPU
          orientation: 'vertical',
          smoothWheel: true,
          // Disable smooth touch — native iOS/Android scroll is already smooth
          smoothTouch: false,
          touchMultiplier: 1.5,
          wheelMultiplier: 0.85,
        });
        lenisRef.current = lenis;
        window.lenis = lenis;

        if (document.body.style.overflow === 'hidden') lenis.stop();

        // Single shared RAF — avoids double rAF with KineticGrid/ScrollProgress
        const raf = (time) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch {
        // Lenis not available, native scroll works fine
      }
    };

    initLenis();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        window.lenis = null;
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped');
    };
  }, []);

  // ── Lock scroll when modals open ──────────────────────────────────────────
  useEffect(() => {
    const locked = showAuthModal || showSearch;
    document.body.style.overflow = locked ? 'hidden' : '';
    if (locked && lenisRef.current) lenisRef.current.stop();
    else if (!locked && lenisRef.current) lenisRef.current.start();
    return () => { document.body.style.overflow = ''; };
  }, [showAuthModal, showSearch]);

  // ── Scroll to top on route change ────────────────────────────────────────
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col w-full max-w-[100vw]">

      <ScrollProgress />
      <Navbar />

      <main className="flex-1 w-full">
        <AnimatePresence mode="sync">
          {loading ? (
            <motion.div
              key="route-spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <motion.div
                className="w-10 h-10 rounded-full"
                style={{
                  border: '2.5px solid rgba(184,134,11,0.15)',
                  borderTopColor: '#C9940A',
                  borderRightColor: 'rgba(201,148,10,0.4)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          ) : (
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <AIChatbot />
      {showAuthModal && <AuthModal />}
      {showSearch && <SearchModal />}
    </div>
  );
};

export default MainLayout;
