import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'sonner'
import styles from './SignUp.module.css'

export default function SignUp() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [apiError, setApiError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^[0-9+\s\-]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number (7–15 digits)'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    else if (!/[A-Z]/.test(form.password)) e.password = 'Include at least one uppercase letter'
    if (!form.confirm) e.confirm = 'Please confirm your password'
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match'
    if (!agreed) e.agreed = 'You must accept the Terms and Privacy Policy'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
    if (apiError) setApiError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await signup({ name: form.name, email: form.email, phone: form.phone, password: form.password })
      toast.success('Account created! Let\'s set up your plan.')
      navigate('/plan', { replace: true })
    } catch (err) {
      const msg = err.userMessage || 'Signup failed. Please try again.'
      setApiError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const strength = (() => {
    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })()
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = ['', '#ef4444', '#f59e0b', '#06ffa5', '#00e5ff'][strength]

  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.orb1} /><div className={styles.orb2} /><div className={styles.grid} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <div className={styles.logoDot} />
          <span>Create your Velta account</span>
        </div>
        <div className={styles.card}>
          <div className={styles.cardGlow} />
          <div className={styles.cardInner}>
            <h1 className={styles.title}>Get started free</h1>

            {/* API error banner */}
            {apiError && (
              <div role="alert" style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#f87171',
                fontSize: '0.875rem',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {apiError}
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className={`${styles.field} ${errors.name ? styles.hasError : ''}`}>
                <label className={styles.label}>Full name</label>
                <div className={styles.inputWrap}>
                  <span className={styles.icon}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </span>
                  <input className={styles.input} type="text" name="name" placeholder="John Smith" value={form.name} onChange={handleChange} aria-invalid={!!errors.name} />
                </div>
                {errors.name && <span className={styles.error} role="alert">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className={`${styles.field} ${errors.email ? styles.hasError : ''}`}>
                <label className={styles.label}>Email address</label>
                <div className={styles.inputWrap}>
                  <span className={styles.icon}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </span>
                  <input className={styles.input} type="email" name="email" placeholder="you@company.com" value={form.email} onChange={handleChange} aria-invalid={!!errors.email} />
                </div>
                {errors.email && <span className={styles.error} role="alert">{errors.email}</span>}
              </div>

              {/* Phone */}
              <div className={`${styles.field} ${errors.phone ? styles.hasError : ''}`}>
                <label className={styles.label}>Phone number</label>
                <div className={styles.inputWrap}>
                  <span className={styles.icon}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" /></svg>
                  </span>
                  <input className={styles.input} type="tel" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} aria-invalid={!!errors.phone} />
                </div>
                {errors.phone && <span className={styles.error} role="alert">{errors.phone}</span>}
              </div>

              {/* Password */}
              <div className={`${styles.field} ${errors.password ? styles.hasError : ''}`}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputWrap}>
                  <span className={styles.icon}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                  </span>
                  <input className={styles.input} type={showPass ? 'text' : 'password'} name="password" placeholder="Min 8 chars, 1 uppercase" value={form.password} onChange={handleChange} aria-invalid={!!errors.password} />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(s => !s)} tabIndex={-1} aria-label={showPass ? 'Hide password' : 'Show password'}>
                    {showPass
                      ? <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      : <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    }
                  </button>
                </div>
                {form.password && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    <div className={styles.strengthBar}>
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`${styles.strengthSeg} ${strength >= i ? styles[`s${strength}`] : ''}`} />
                      ))}
                    </div>
                    {strengthLabel && <span style={{ fontSize: 11, color: strengthColor, fontWeight: 500 }}>{strengthLabel}</span>}
                  </div>
                )}
                {errors.password && <span className={styles.error} role="alert">{errors.password}</span>}
              </div>

              {/* Confirm */}
              <div className={`${styles.field} ${errors.confirm ? styles.hasError : ''}`}>
                <label className={styles.label}>Confirm password</label>
                <div className={styles.inputWrap}>
                  <span className={styles.icon}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </span>
                  <input className={styles.input} type={showConfirm ? 'text' : 'password'} name="confirm" placeholder="Repeat your password" value={form.confirm} onChange={handleChange} aria-invalid={!!errors.confirm} />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowConfirm(s => !s)} tabIndex={-1} aria-label={showConfirm ? 'Hide password' : 'Show password'}>
                    {showConfirm
                      ? <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      : <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    }
                  </button>
                </div>
                {errors.confirm && <span className={styles.error} role="alert">{errors.confirm}</span>}
              </div>

              {/* Terms */}
              <div className={`${styles.field} ${errors.agreed ? styles.hasError : ''}`}>
                <label className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => { setAgreed(e.target.checked); if (errors.agreed) setErrors(er => ({ ...er, agreed: '' })) }}
                  />
                  <span>I agree to the <Link to="/terms" className={styles.switchLink}>Terms</Link> and <Link to="/privacy" className={styles.switchLink}>Privacy Policy</Link></span>
                </label>
                {errors.agreed && <span className={styles.error} role="alert">{errors.agreed}</span>}
              </div>

              <button type="submit" className={`${styles.submitBtn} ${loading ? styles.loading : ''}`} disabled={loading}>
                {loading ? <span className={styles.spinner} /> : <>Create Account <span className={styles.arrow}>→</span></>}
              </button>
            </form>

            <p className={styles.switchText}>
              Already have an account?{' '}
              <Link to="/signin" className={styles.switchLink}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
