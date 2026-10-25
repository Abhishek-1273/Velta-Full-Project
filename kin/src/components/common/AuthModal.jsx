import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth, useSiteSettings, getLogoInitials, getBrandName } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/api';
// Firebase phone auth removed — using Message Central OTP
import OTPStep from './AuthModal/OTPStep';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

export default function AuthModal() {
  const { user, closeAuth, signIn, triggerSuccess, pendingRedirect } = useAuth();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  const [tab, setTab]                 = useState('login');
  const [step, setStep]               = useState('form');
  const [form, setForm]               = useState({ name: '', phone: '', email: '', userType: 'Owner' });
  const [loginTarget, setLoginTarget] = useState('');
  const [otpTarget, setOtpTarget]     = useState('');
  const [otpCode, setOtpCode]         = useState(['', '', '', '', '', '']);
  const [timer, setTimer]             = useState(30);
  const [canResend, setCanResend]     = useState(false);
  const [isNew, setIsNew]             = useState(false);
  const [successName, setSuccessName] = useState('');
  const [errors, setErrors]           = useState({});
  const [loading, setLoading]         = useState(false);
  const [serverError, setServerError] = useState('');
  const [otpSuccessMessage, setOtpSuccessMessage] = useState('');

  // Message Central ke liye verificationId aur authToken store karo — APITxt mein zaroorat nahi
  // (placeholder rakha hai future use ke liye)

  // Auto-close if user logged in — but success step pe nahi, woh khud close karta hai
  useEffect(() => {
    if (user) closeAuth();
  }, [user, closeAuth, step]);

  // Scroll lock
  useEffect(() => {
    const origBody = document.body.style.overflow;
    const origHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();

    const block = (e) => {
      const formEl = document.querySelector('.auth-modal-scrollable');
      if (formEl?.contains(e.target) && formEl.scrollHeight > formEl.clientHeight) return;
      e.preventDefault();
    };
    window.addEventListener('wheel', block, { passive: false });
    window.addEventListener('touchmove', block, { passive: false });

    return () => {
      document.body.style.overflow = origBody;
      document.documentElement.style.overflow = origHtml;
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
      if (window.lenis) window.lenis.start();
    };
  }, []);

  // Resend timer
  useEffect(() => {
    let interval;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) { setCanResend(true); clearInterval(interval); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Validation
  const validateForm = () => {
    const e = {};
    setServerError('');

    if (tab === 'login') {
      if (!loginTarget.trim()) {
        e.loginTarget = 'Mobile number is required';
      } else if (!/^[6-9]\d{9}$/.test(loginTarget.replace(/\D/g, ''))) {
        e.loginTarget = 'Enter a valid 10-digit mobile number';
      }
    } else {
      if (!form.name.trim()) e.name = 'Name is required';
      if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter valid 10-digit mobile number';
      if (!form.email.trim()) {
        e.email = 'Email Address is required';
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        e.email = 'Enter a valid email address';
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Send OTP via Message Central
  const handleSendOtp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setServerError('');
    setOtpSuccessMessage('');

    const targetVal = tab === 'login'
      ? loginTarget.trim().replace(/\D/g, '')
      : form.phone.trim();

    try {
      const res = await fetch(`${API_URL}/api/auth/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: targetVal, mode: tab }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.message || 'Verification failed.');
        return;
      }

      // APITxt: koi extra data store karna nahi, bas step change karo
      setOtpTarget(targetVal);
      setStep('otp');
      setTimer(30);
      setCanResend(false);
      setOtpCode(['', '', '', '', '', '']);

      setTimeout(() => {
        document.getElementById('otp-input-0')?.focus();
      }, 100);

    } catch (err) {
      console.error('Send OTP error:', err);
      setServerError(err.message || 'Cannot send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP via Message Central
  const handleResendOtp = async () => {
    if (!canResend) return;

    setLoading(true);
    setServerError('');
    setOtpSuccessMessage('');

    try {
      const res = await fetch(`${API_URL}/api/auth/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: otpTarget, mode: tab }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.message || 'Resend failed.');
        return;
      }

      // APITxt: koi extra data store karna nahi
      setTimer(30);
      setCanResend(false);
      setOtpCode(['', '', '', '', '', '']);
      setOtpSuccessMessage('OTP resent successfully.');

      setTimeout(() => {
        document.getElementById('otp-input-0')?.focus();
      }, 100);

    } catch (err) {
      console.error('Resend OTP error:', err);
      setServerError(err.message || 'Cannot resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP — backend se validate karo
  const handleVerifyOtp = async () => {
    const code = otpCode.join('');
    if (code.length !== 6) {
      setServerError('Please enter all 6 digits of the OTP.');
      return;
    }

    setLoading(true);
    setServerError('');
    setOtpSuccessMessage('');

    try {
      const payload = {
        phone: otpTarget,
        otp:   code,
        mode:  tab,
      };
      if (tab === 'signup') {
        payload.name  = form.name.trim();
        payload.email = form.email.trim();
      }

      const res = await fetch(`${API_URL}/api/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.message || 'Verification failed.');
        return;
      }

      signIn(data.user, data.token);
      triggerSuccess(data.user?.name || form.name, data.isNew);

    } catch (err) {
      console.error('Verify OTP error:', err);
      setServerError(err.message || 'Cannot verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // OTP input handlers
  const handleOtpChange = (value, index) => {
    const val = value.replace(/\D/g, '');
    const newOtp = [...otpCode];
    newOtp[index] = val.substring(val.length - 1);
    setOtpCode(newOtp);
    if (val && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otpCode[index] && index > 0) {
        const newOtp = [...otpCode];
        newOtp[index - 1] = '';
        setOtpCode(newOtp);
        document.getElementById(`otp-input-${index - 1}`)?.focus();
      } else {
        const newOtp = [...otpCode];
        newOtp[index] = '';
        setOtpCode(newOtp);
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').substring(0, 6);
    if (pastedData.length === 6) {
      setOtpCode(pastedData.split(''));
      document.getElementById('otp-input-5')?.focus();
    }
  };

  const handleDone = () => {
    closeAuth();
    if (pendingRedirect) navigate(pendingRedirect);
  };

  const handleClose = () => {
    closeAuth();
    const gatedPaths = ['/services/buy', '/services/sell', '/services/lease', '/services/management'];
    if (gatedPaths.includes(window.location.pathname)) navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-md"
      onClick={e => e.target === e.currentTarget && handleClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="relative w-full max-w-md md:max-w-[780px] bg-white rounded-[2rem] shadow-luxury-deep overflow-hidden md:flex md:flex-row border border-gray-100"
      >
        {/* ── Left visual panel (desktop only) ─────────────────────────────── */}
        <div className="hidden md:flex w-full md:w-2/5 relative flex-col justify-between p-8 overflow-hidden shrink-0 select-none"
          style={{ background: 'linear-gradient(160deg, #fffbea 0%, #fef9e0 60%, #fffdf5 100%)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, #B8860B, transparent)' }} />
          <div className="absolute inset-0 opacity-[0.15]"
            style={{ backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #B8860B 0%, transparent 70%)', transform: 'translate(30%, 30%)' }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gold shadow-gold overflow-hidden">
                {settings?.logoIconImage ? (
                  <img src={settings.logoIconImage} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-white font-display font-black text-sm">{getLogoInitials(settings)}</span>
                )}
              </div>
              <div>
                <span className="font-display font-bold text-sm tracking-wider uppercase text-navy block">{getBrandName(settings)}</span>
                <span className="text-[9px] text-ink-soft tracking-widest uppercase">Your Property. Our Trust.</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 space-y-5">
            {[
              { icon: '🛡️', label: 'Verified Listings', desc: 'Connect directly with buyers & tenants' },
              { icon: '⚡', label: 'Faster Closures', desc: 'Premium listings get 3× more responses' },
              { icon: '👥', label: '10,000+ Connections', desc: 'Verified NRI & local buyer network' },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base bg-white border border-gold/20 shadow-sm">
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-navy">{label}</p>
                  <p className="text-[10px] text-ink-muted mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-5" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gold">Free Listing</span>
            </div>
            <h2 className="font-display font-light text-lg leading-snug text-navy">
              Sell or Rent <br />
              <span className="font-bold" style={{ color: '#B8860B' }}>Your Property</span>
            </h2>
            <p className="text-[10px] text-ink-soft mt-1"></p>
          </div>
        </div>

        {/* ── Right form panel ──────────────────────────────────────────────── */}
        <div className="w-full md:w-3/5 relative flex flex-col justify-center bg-white auth-modal-scrollable shrink-0">
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, #B8860B, transparent)' }} />

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-navy transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 md:py-6 md:px-8">
            <AnimatePresence mode="wait">

              {/* ── Signup/Login Form Step ──────────────────────────────────── */}
              {step === 'form' && (
                <motion.div
                  key="form-step"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants} className="text-left mb-2">
                    <h2 className="font-display font-bold text-2xl text-navy tracking-tight">Welcome</h2>
                    <p className="text-ink-muted text-[11px] mt-1">Enter details below to access your account.</p>
                  </motion.div>

                  {/* Tabs */}
                  <motion.div variants={itemVariants} className="flex border-b border-gray-100 mb-4 bg-gray-50 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => { setTab('login'); setServerError(''); setErrors({}); }}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        tab === 'login'
                          ? 'bg-gold text-white shadow-md'
                          : 'text-ink-muted hover:text-navy'
                      }`}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => { setTab('signup'); setServerError(''); setErrors({}); }}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        tab === 'signup'
                          ? 'bg-gold text-white shadow-md'
                          : 'text-ink-muted hover:text-navy'
                      }`}
                    >
                      Sign Up
                    </button>
                  </motion.div>

                  {serverError && (
                    <motion.div variants={itemVariants} className="bg-red-50 border border-red-200 rounded-2xl px-4 py-2 text-red-500 text-xs">
                      {serverError}
                    </motion.div>
                  )}

                  <div className="space-y-3">
                    {tab === 'login' ? (
                      <motion.div variants={itemVariants} className="space-y-1">
                        <div className="group relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 transition-colors group-focus-within:text-gold" />
                          <input
                            type="tel"
                            placeholder="Mobile Number *"
                            value={loginTarget}
                            maxLength={10}
                            onChange={e => setLoginTarget(e.target.value.replace(/\D/g, ''))}
                            onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                            className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 border ${
                              errors.loginTarget ? 'border-red-400' : 'border-gray-200 focus:border-gold/60'
                            } rounded-2xl text-navy placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all`}
                          />
                        </div>
                        {errors.loginTarget && <p className="text-red-500 text-[9px] mt-0.5 ml-1">{errors.loginTarget}</p>}
                      </motion.div>
                    ) : (
                      <>
                        <motion.div variants={itemVariants} className="space-y-1">
                          <div className="group relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 transition-colors group-focus-within:text-gold" />
                            <input
                              type="text"
                              placeholder="Full Name *"
                              value={form.name}
                              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                              onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                              className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 border ${
                                errors.name ? 'border-red-400' : 'border-gray-200 focus:border-gold/60'
                              } rounded-2xl text-navy placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all`}
                            />
                          </div>
                          {errors.name && <p className="text-red-500 text-[9px] mt-0.5 ml-1">{errors.name}</p>}
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-1">
                          <div className="group relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 transition-colors group-focus-within:text-gold" />
                            <input
                              type="tel"
                              placeholder="Mobile Number *"
                              value={form.phone}
                              maxLength={10}
                              onChange={e => setForm(p => ({ ...p, phone: e.target.value.replace(/\D/g, '') }))}
                              onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                              className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 border ${
                                errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-gold/60'
                              } rounded-2xl text-navy placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all`}
                            />
                          </div>
                          {errors.phone && <p className="text-red-500 text-[9px] mt-0.5 ml-1">{errors.phone}</p>}
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-1">
                          <div className="group relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 transition-colors group-focus-within:text-gold" />
                            <input
                              type="email"
                              placeholder="Email Address *"
                              value={form.email}
                              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                              onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                              className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 border ${
                                errors.email ? 'border-red-400' : 'border-gray-200 focus:border-gold/60'
                              } rounded-2xl text-navy placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all`}
                            />
                          </div>
                          {errors.email && <p className="text-red-500 text-[9px] mt-0.5 ml-1">{errors.email}</p>}
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-1.5">
                          <p className="text-[10px] font-bold text-ink-soft tracking-widest uppercase">I am a</p>
                          <div className="flex gap-2">
                            {['Owner', 'Broker'].map(type => {
                              const isSelected = form.userType === type;
                              return (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setForm(p => ({ ...p, userType: type }))}
                                  className={`flex items-center gap-2 flex-1 px-4 py-2.5 rounded-2xl border text-xs font-semibold transition-all duration-200 ${
                                    isSelected
                                      ? 'bg-gold/10 border-gold text-gold-dark'
                                      : 'bg-gray-50 border-gray-200 text-ink-muted hover:border-gold/40 hover:text-navy'
                                  }`}
                                >
                                  <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                    isSelected ? 'border-gold' : 'border-gray-300'
                                  }`}>
                                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                                  </span>
                                  {type}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </div>

                  <motion.div variants={itemVariants} className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-gray-300">OTP Verification required ✦</span>
                    <a href={`mailto:${settings?.contactEmail1 || 'support@realestate.com'}`} className="text-ink-muted hover:text-navy transition-colors hover:underline">Need help?</a>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-3 pt-1">
                    <button
                      onClick={handleSendOtp}
                      disabled={loading}
                      className="btn-primary text-white w-full disabled:opacity-60 disabled:cursor-not-allowed justify-center py-2.5 text-xs font-bold"
                    >
                      {loading ? (
                        <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending OTP...</>
                      ) : (
                        <>Send Verification Code <ArrowRight className="w-3.5 h-3.5" /></>
                      )}
                    </button>
                  </motion.div>

                  <motion.p variants={itemVariants} className="text-center text-[10px] text-gray-400">
                    By continuing you agree to our{' '}
                    <a href="#terms" className="text-gold hover:underline">Terms</a>
                    {' '}&{' '}
                    <a href="#privacy" className="text-gold hover:underline">Privacy Policy</a>
                  </motion.p>
                </motion.div>
              )}

              {/* ── OTP Step ───────────────────────────────────────────────── */}
              {step === 'otp' && (
                <OTPStep
                  otpTarget={otpTarget}
                  timer={timer}
                  loading={loading}
                  serverError={serverError}
                  otpSuccessMessage={otpSuccessMessage}
                  otpCode={otpCode}
                  onBack={() => { setStep('form'); setServerError(''); setOtpSuccessMessage(''); }}
                  onOtpChange={handleOtpChange}
                  onOtpKeyDown={handleOtpKeyDown}
                  onOtpPaste={handleOtpPaste}
                  onResendOtp={handleResendOtp}
                  onVerifyOtp={handleVerifyOtp}
                  lightTheme
                />
              )}
</AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
