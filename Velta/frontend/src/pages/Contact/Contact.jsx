import { useState } from 'react'
import api from '../../api/api.js'
import { toast } from 'sonner'
import styles from './Contact.module.css'

const INIT = { fullName: '', businessName: '', phoneNumber: '', email: '', message: '' }

function validate(form) {
  const e = {}
  if (!form.fullName.trim()) e.fullName = 'Full name is required'
  if (!form.businessName.trim()) e.businessName = 'Business name is required'
  if (!form.phoneNumber.trim()) e.phoneNumber = 'Phone number is required'
  else if (!/^[0-9+\s\-]{7,15}$/.test(form.phoneNumber)) e.phoneNumber = 'Enter a valid phone number'
  if (!form.email.trim()) e.email = 'Email address is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
  return e
}

export default function Contact() {
  const [form, setForm] = useState(INIT)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors(er => ({ ...er, [k]: '' }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await api.post('/contact', form)
      setSent(true)
      toast.success('Message sent! We\'ll be in touch within 2 hours.')
    } catch (err) {
      toast.error(err.userMessage || 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.bg}><div className={styles.orb} /><div className={styles.grid} /></div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className="tag">Get In Touch</div>
            <h1 className={styles.title}>Let's Build Your<br /><span className="gradient-text">Automation System</span></h1>
            <p className={styles.sub}>Tell us about your business and we'll design the perfect automation system for you.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.left}>
              <h2 className={styles.h2}>Contact Us</h2>
              <p style={{ color: 'var(--text2)', lineHeight: 1.8, marginBottom: 40 }}>Have any question about Automation? <br />We're here to help.</p>
              <div className={styles.contacts}>
                <div className={styles.cItem}>
                  <img src='/icons/call.png' alt='call' width="40" />
                  <div><div className={styles.cLabel}>Phone</div><a href="tel:+919960240648" className={styles.cVal}>+91 99602 40648</a></div>
                </div>
                <div className={styles.cItem}>
                  <img src='/icons/mail.png' alt='mail' width="45" />
                  <div><div className={styles.cLabel}>Email</div><a href="mailto:veltaaisystem@gmail.com" className={styles.cVal}>veltaaisystem@gmail.com</a></div>
                </div>
                <div className={styles.cItem}>
                  <img src='/icons/whatsapp.png' alt='whatsapp' width="45" />
                  <div><div className={styles.cLabel}>WhatsApp</div><a href="https://wa.me/919960240648" className={styles.cVal}>Chat with us</a></div>
                </div>
              </div>
              <div className={styles.promise}>
                <h3>Our Promise</h3>
                <ul>
                  {['Response within 2 hours', 'Free business automation audit', 'No commitment required', 'Dedicated support post-setup'].map(i => (
                    <li key={i}><span>✓</span>{i}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.right}>
              {sent ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>🎉</div>
                  <h3>Message Sent!</h3>
                  <p>Our team will reach out to you within 2 hours. Get ready to automate!</p>
                  <button className="btn btn-outline" onClick={() => { setSent(false); setForm(INIT); setErrors({}) }}>Send Another</button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={submit} noValidate>
                  <h3>Get in Touch</h3>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Full Name <span className={styles.req}>*</span></label>
                      <input
                        className={`${styles.inp} ${errors.fullName ? styles.inpError : ''}`}
                        type="text"
                        placeholder="Dhruv Sharma"
                        value={form.fullName}
                        onChange={set('fullName')}
                        aria-invalid={!!errors.fullName}
                      />
                      {errors.fullName && <span className={styles.fieldErr} role="alert">{errors.fullName}</span>}
                    </div>
                    <div className={styles.field}>
                      <label>Business Name <span className={styles.req}>*</span></label>
                      <input
                        className={`${styles.inp} ${errors.businessName ? styles.inpError : ''}`}
                        type="text"
                        placeholder="ABC Realty"
                        value={form.businessName}
                        onChange={set('businessName')}
                        aria-invalid={!!errors.businessName}
                      />
                      {errors.businessName && <span className={styles.fieldErr} role="alert">{errors.businessName}</span>}
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Phone Number <span className={styles.req}>*</span></label>
                      <input
                        className={`${styles.inp} ${errors.phoneNumber ? styles.inpError : ''}`}
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phoneNumber}
                        onChange={set('phoneNumber')}
                        aria-invalid={!!errors.phoneNumber}
                      />
                      {errors.phoneNumber && <span className={styles.fieldErr} role="alert">{errors.phoneNumber}</span>}
                    </div>
                    <div className={styles.field}>
                      <label>Email <span className={styles.req}>*</span></label>
                      <input
                        className={`${styles.inp} ${errors.email ? styles.inpError : ''}`}
                        type="email"
                        placeholder="your@business.com"
                        value={form.email}
                        onChange={set('email')}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <span className={styles.fieldErr} role="alert">{errors.email}</span>}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label>Message</label>
                    <textarea
                      className={styles.inp}
                      rows="4"
                      placeholder="Tell us about your business and what you want to automate..."
                      value={form.message}
                      onChange={set('message')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '15px 28px' }}
                    disabled={loading}
                  >
                    {loading ? 'Sending…' : 'Send Message →'}
                  </button>
                  <p className={styles.note}>
                    <img src='/icons/safe.png' alt='safe' width="15" /> Your information is safe with us. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
