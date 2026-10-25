import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, User, X, ChevronDown, ArrowRight,
  Home, Building2, Key, Settings, Calendar, LogOut,
  Sun, Moon, Search
} from 'lucide-react';
import { useAuth, useWishlist, useSearch, useSiteSettings, getLogoInitials, renderBrandLogo } from '../../contexts';

import Magnetic from '../common/Magnetic';
import PremiumIcon from '../common/PremiumIcon';

// ── Sign Out Confirmation Modal ───────────────────────────────────────────────
function SignOutModal({ onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center px-4"
        style={{ background: 'rgba(7,26,47,0.6)', backdropFilter: 'blur(8px)' }}
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={e => e.stopPropagation()}
          className="bg-white dark:bg-navy-dark rounded-3xl shadow-2xl p-8 max-w-sm w-full space-y-6 border border-gray-100 dark:border-white/10"
        >
          <div className="space-y-1.5">
            <h3 className="font-display font-bold text-xl text-navy dark:text-white">
              Sign out?
            </h3>
            <p className="text-sm text-ink-muted dark:text-white/50 leading-relaxed">
              You'll need to verify your number again to access your account.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-2xl border border-gray-200 dark:border-white/10 text-sm font-semibold text-navy dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #B8860B, #C9940A)' }}
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const services = [
  { id: 'buy', title: 'Buy Property', desc: "Find your perfect luxury home from our verified Pune listings", icon: <Home className="w-5 h-5" />, link: '/services/buy', color: 'from-gold/10 to-transparent' },
  { id: 'sell', title: 'Sell Property', desc: "List with Pune's most trusted luxury real estate platform", icon: <Building2 className="w-5 h-5" />, link: '/services/sell', color: 'from-royal/10 to-transparent' },
  { id: 'lease', title: 'Lease Property', desc: 'Premium rental solutions for discerning clients in Pune', icon: <Key className="w-5 h-5" />, link: '/services/lease', color: 'from-emerald-500/10 to-transparent' },
  { id: 'manage', title: 'Property Management', desc: 'End-to-end care for your real estate portfolio', icon: <Settings className="w-5 h-5" />, link: '/services/management', color: 'from-purple-500/10 to-transparent' },
];

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
];

function MenuToggle({ isOpen }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="flex items-center justify-center">
      <line
        x1="3" y1="6" x2="21" y2="6"
        className={`transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[6px]' : ''}`}
      />
      <line
        x1="3" y1="12" x2="21" y2="12"
        className={`transition-all duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
      />
      <line
        x1="3" y1="18" x2="21" y2="18"
        className={`transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}
      />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const { openAuth, user, signOut } = useAuth();
  const { setShowSearch } = useSearch();
  const { count } = useWishlist();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();
  const megaRef = useRef(null);
  const megaPanelRef = useRef(null);
  const profileRef = useRef(null);

  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    // Throttled scroll — only update state if value actually changes
    let ticking = false;
    const fn = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        ticking = false;
      });
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // ── Mega menu outside-click close ─────────────────────────────────────────
  useEffect(() => {
    const fn = (e) => {
      if (
        megaRef.current && !megaRef.current.contains(e.target) &&
        megaPanelRef.current && !megaPanelRef.current.contains(e.target)
      ) setMegaOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => window.removeEventListener('mousedown', fn);
  }, []);

  // ── Profile dropdown outside-click close ─────────────────────────────────
  useEffect(() => {
    const fn = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', fn);
    return () => window.removeEventListener('mousedown', fn);
  }, []);

  // ── Mobile body scroll lock ───────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    if (window.lenis) {
      if (mobileOpen) window.lenis.stop();
      else window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [mobileOpen]);

  const handleService = (link) => {
    setMegaOpen(false);
    setMobileOpen(false);
    if (!user) { openAuth(link); return; }
    navigate(link);
  };

  const handleSignOut = () => {
    setProfileOpen(false);
    setMobileOpen(false);
    setShowSignOutModal(true);
  };

  const confirmSignOut = async () => {
    setShowSignOutModal(false);
    await signOut();
    navigate('/');
  };

  const { pathname } = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setProfileOpen(false);
  }, [pathname]);
  const isSolid = true;

  const navText = isSolid ? 'text-black dark:text-cream/90 hover:text-black dark:hover:text-white' : 'text-white/90 hover:text-white';
  const activeStyle = isSolid ? 'text-gold-muted dark:text-gold font-semibold' : 'text-gold font-semibold';

  return (
    <>
      {/* ── Sign Out Confirmation ── */}
      {showSignOutModal && (
        <SignOutModal
          onConfirm={confirmSignOut}
          onCancel={() => setShowSignOutModal(false)}
        />
      )}
      {/* ── Header ── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${isSolid
          ? 'bg-white/95 dark:bg-navy-dark/95 backdrop-blur-2xl shadow-[0_1px_0_rgba(7,26,47,0.06),0_8px_32px_rgba(7,26,47,0.06)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(3,14,27,0.4)]'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full pl-4 pr-5 lg:pl-6 lg:pr-10 xl:pl-8 xl:pr-16">
          <div className="flex items-center justify-between h-[74px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #C9A050 0%, #ECD7AA 50%, #C69D59 100%)' }}
              >
                {settings?.logoIconImage ? (
                  <img src={settings.logoIconImage} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-navy font-display font-black text-sm leading-none tracking-tight">
                    {getLogoInitials(settings)}
                  </span>

                )}
              </div>
              <div className="flex flex-col justify-center">
                <p className={`font-display font-bold text-[17px] leading-tight tracking-tight transition-colors duration-300 ${isSolid ? 'text-black dark:text-white' : 'text-white'}`}>
                  {renderBrandLogo(settings, '#B8860B')}
                </p>
                <p className={`text-[8px] font-accent tracking-[0.25em] uppercase mt-[1.5px] transition-colors duration-300 ${isSolid ? 'text-black/70 dark:text-white/50' : 'text-white/70'}`}>
                  {settings?.logoSubtitle || 'Luxury Real Estate · Pune'}
                </p>
              </div>



            </Link>



            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl transition-all duration-200 group focus:outline-none hover:bg-gray-100 dark:hover:bg-white/10"
                aria-label="Toggle theme"
              >
                {isDark
                  ? <Sun  style={{ width:17, height:17, color: isDark ? '#FFFFFF' : '#0B1728' }} />
                  : <Moon style={{ width:17, height:17, color: isDark ? '#FFFFFF' : '#0B1728' }} />
                }
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-xl transition-all duration-200 group focus:outline-none hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <Heart style={{ width:17, height:17, color: isDark ? '#FFFFFF' : '#0B1728' }} />
                {count > 0 && (
                  <span
                    className="absolute top-1 right-1 w-[14px] h-[14px] text-navy text-[8px] font-black rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #C9A050, #B8860B)' }}
                  >
                    {count}
                  </span>
                )}
              </Link>

              {/* Divider */}
              <span className="h-5 w-px mx-1 bg-gray-200 dark:bg-white/10" />

              {/* Profile / Sign In */}
              {user ? (
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setProfileOpen(v => !v)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 focus:outline-none hover:bg-gray-100 dark:hover:bg-white/10 text-navy dark:text-white"
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                      style={{ background: 'linear-gradient(135deg, #B8860B, #C9940A)', color: '#FFFFFF' }}>
                      {user.name[0].toUpperCase()}
                    </div>
                    {user.name.split(' ')[0]}
                    <ChevronDown className={`w-3 h-3 opacity-60 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.14 }}
                        className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-navy rounded-2xl shadow-luxury border border-gray-100 dark:border-white/10 overflow-hidden z-50"
                      >
                        <div className="p-3 border-b border-gray-100 dark:border-white/10">
                          <p className="font-bold text-navy dark:text-white text-sm">{user.name}</p>
                          <p className="text-[12px] mt-0.5 text-slate-400 dark:text-white/45">{user.phone}</p>
                          {user.email && <p className="text-[12px] text-slate-400 dark:text-white/45 truncate">{user.email}</p>}
                        </div>
                        <div className="p-1.5">
                          <Link to="/my-account" onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors text-slate-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-navy dark:hover:text-white"
                          >
                            <User className="w-4 h-4" /> My Account
                          </Link>
                          {user.role && user.role !== 'client' && (
                            <Link to="/panel/dashboard" onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors"
                              style={{ color: '#92400E' }}>
                              <span className="text-xs">⚡</span> Staff Panel
                            </Link>
                          )}
                          <button onClick={handleSignOut}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors w-full text-left">
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => openAuth()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 focus:outline-none text-navy dark:text-white hover:text-gold dark:hover:text-gold"
                >
                  <User className="w-4 h-4" /> Sign In
                </button>
              )}

              {/* Post Property Ad CTA */}
              <Magnetic>
                <button
                  onClick={() => navigate('/services/post-property')}
                  className="ml-1 flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-200 hover:-translate-y-px active:scale-95 focus:outline-none"
                  style={{ background: 'linear-gradient(135deg, #C9940A, #B8860B)', color: '#FFFFFF', boxShadow: '0 4px 16px rgba(184,134,11,0.4)' }}
                >
                  <Calendar className="w-3.5 h-3.5" /> Post Property Ad
                </button>
              </Magnetic>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className={`lg:hidden p-2.5 rounded-xl transition-colors flex items-center justify-center ${isSolid ? 'text-black dark:text-cream/90 hover:bg-gray-100 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'}`}
              aria-label="Toggle menu"
            >
              <MenuToggle isOpen={mobileOpen} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mega Menu ── */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            ref={megaPanelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onMouseLeave={() => setMegaOpen(false)}
            className={`fixed top-[74px] inset-x-0 z-40 border-b transition-colors duration-500 ${isSolid ? 'bg-white dark:bg-navy-dark border-gray-200 dark:border-white/10' : 'bg-navy/95 dark:bg-navy-dark/95 backdrop-blur-2xl border-white/10'
              }`}
            style={{ boxShadow: '0 16px 48px rgba(7,26,47,0.10)' }}
          >
            <div className="container-luxury py-7">
              <div className="grid grid-cols-4 gap-3">
                {services.map((s, i) => (
                  <motion.button
                    key={s.id}
                    onClick={() => handleService(s.link)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`text-left p-5 rounded-2xl bg-gradient-to-br ${s.color} border transition-all duration-250 group ${isSolid
                      ? 'border-gray-100/80 dark:border-white/10 hover:border-gold/25 hover:shadow-card'
                      : 'border-white/10 hover:border-gold/25 hover:shadow-luxury'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <PremiumIcon icon={s.icon} size="md" variant="gold" />
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                    <h3 className={`font-display font-bold text-sm mb-1.5 ${isSolid ? 'text-navy dark:text-white' : 'text-white'}`}>{s.title}</h3>
                    <p className={`text-xs leading-relaxed ${isSolid ? 'text-ink-muted dark:text-cream/80' : 'text-white/60'}`}>{s.desc}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[1999] w-full h-[100dvh] bg-navy/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="fixed top-0 right-0 z-[2000] w-[310px] h-[100dvh] flex flex-col"
              style={{ background: '#0A192F' }}
              data-lenis-prevent
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-[74px] shrink-0"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #C9A050, #ECD7AA)' }}>
                    {settings?.logoIconImage ? (
                      <img src={settings.logoIconImage} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-navy font-black text-xs">{getLogoInitials(settings)}</span>

                    )}
                  </div>
                  <span className="text-white font-display font-bold text-sm">
                    {renderBrandLogo(settings, '#B8860B')}
                  </span>

                </div>
                <button onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-0.5">
                {navLinks.map((link) =>
                  link.hasMenu ? (
                    <div key="svc-mobile">
                      <Link
                        to="/services"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-3.5 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/8 transition-all"
                      >
                        Services
                      </Link>
                      <p className="text-white/40 text-[9px] font-accent tracking-[0.25em] uppercase px-3 pt-2 pb-1">
                        All Services
                      </p>
                      {services.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => handleService(s.link)}
                          className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/8 transition-all text-sm text-left"
                        >
                          <span className="text-gold opacity-90">{s.icon}</span>
                          {s.title}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <NavLink
                      key={link.label}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block px-3 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'text-gold font-semibold' : 'text-white/80 hover:text-white hover:bg-white/8'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )
                )}

                {/* Subtle Divider */}
                <div className="h-px bg-white/10 my-3.5 mx-3" />

                {/* Wishlist link in mobile drawer */}
                <Link
                  to="/my-account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/8 transition-all"
                >
                  <User className="w-4 h-4 text-gold opacity-80" />
                  My Account
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/8 transition-all"
                >
                  <Heart className="w-4 h-4 text-gold opacity-80" />
                   My Shortlist
                </Link>

                {/* Staff Panel link — only for non-client roles */}
                {user && user.role && user.role !== 'client' && (
                  <Link
                    to="/panel/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-semibold transition-all"
                    style={{ color: '#B8860B', background: 'rgba(184,134,11,0.08)' }}
                  >
                    <span className="text-base">⚡</span>
                    Staff Panel
                  </Link>
                )}

                {/* Theme toggle in mobile drawer */}
                <button
                  onClick={() => { setMobileOpen(false); toggleTheme(); }}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/8 transition-all w-full text-left"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-4 h-4 text-gold opacity-80" />
                      <span>Light Theme</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-gold opacity-80" />
                      <span>Dark Theme</span>
                    </>
                  )}
                </button>

              </nav>

              {/* Bottom actions */}
              <div className="p-4 space-y-3 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  onClick={() => { setMobileOpen(false); navigate('/services/post-property'); }}
                  className="w-full btn-book-visit justify-center"
                >
                  <Calendar className="w-3.5 h-3.5" /> Post Property Ad
                </button>

                {!user && (
                  <button
                    onClick={() => { setMobileOpen(false); openAuth(); }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 text-sm font-semibold transition-all"
                  >
                    <User className="w-4 h-4" /> Sign In
                  </button>
                )}

                {user && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/6">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'linear-gradient(135deg, #C9A050, #ECD7AA)' }}>
                        <span className="text-navy font-black text-sm">{user.name[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm leading-none truncate">{user.name}</p>
                        <p className="text-white/50 text-xs mt-0.5">{user.phone}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-semibold transition-all"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
