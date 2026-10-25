import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

export default function OTPStep({
  otpTarget, timer, loading, serverError, otpSuccessMessage,
  otpCode, onBack, onOtpChange, onOtpKeyDown, onOtpPaste, onResendOtp, onVerifyOtp,
  lightTheme = false,
}) {
  return (
    <motion.div
      key="otp-step"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className={`p-1 rounded-full transition-colors ${
            lightTheme
              ? 'hover:bg-gray-100 text-gray-400 hover:text-navy'
              : 'hover:bg-white/5 text-white/40 hover:text-white'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="text-left">
          <h2 className={`font-display font-bold text-xl tracking-tight ${lightTheme ? 'text-navy' : 'text-white'}`}>
            Enter Verification Code
          </h2>
          <p className={`text-[10px] mt-0.5 ${lightTheme ? 'text-ink-muted' : 'text-white/50'}`}>
            Sent to: <span className="text-gold font-bold">{otpTarget}</span>
          </p>
        </div>
      </div>

      {/* Server error / success banner */}
      {serverError && (
        <div className={`rounded-2xl px-4 py-2 text-xs border ${
          lightTheme
            ? 'bg-red-50 border-red-200 text-red-500'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {serverError}
        </div>
      )}

      {otpSuccessMessage && (
        <div className={`rounded-2xl px-4 py-2 text-xs text-center border ${
          lightTheme
            ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
        }`}>
          {otpSuccessMessage}
        </div>
      )}

      {/* 6 OTP Boxes */}
      <div className="flex justify-between gap-2 max-w-xs mx-auto py-2">
        {otpCode.map((digit, idx) => (
          <input
            key={idx}
            id={`otp-input-${idx}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={e => onOtpChange(e.target.value, idx)}
            onKeyDown={e => onOtpKeyDown(e, idx)}
            onPaste={idx === 0 ? onOtpPaste : undefined}
            className={`w-10 h-11 text-center text-base font-extrabold rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all border ${
              lightTheme
                ? 'bg-gray-50 border-gray-200 focus:border-gold/60 text-navy'
                : 'bg-white/5 border-white/10 focus:border-gold/50 text-white focus:bg-white/8'
            }`}
          />
        ))}
      </div>

      {/* Countdown Timer */}
      <div className={`text-center text-xs ${lightTheme ? 'text-gray-400' : 'text-white/40'}`}>
        {timer > 0 ? (
          <p>Resend code in <span className="text-gold font-bold">{timer}s</span></p>
        ) : (
          <button
            type="button"
            onClick={onResendOtp}
            disabled={loading}
            className="text-gold hover:underline font-bold transition-all disabled:opacity-50"
          >
            Resend OTP code
          </button>
        )}
      </div>

      <div className="pt-2">
        <button
          onClick={onVerifyOtp}
          disabled={loading}
          className="btn-primary text-white w-full disabled:opacity-60 disabled:cursor-not-allowed justify-center py-2.5 text-xs font-bold"
        >
          {loading ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Verifying...</>
          ) : (
            <>Verify & Login <CheckCircle2 className="w-3.5 h-3.5" /></>
          )}
        </button>
      </div>
    </motion.div>
  );
}
