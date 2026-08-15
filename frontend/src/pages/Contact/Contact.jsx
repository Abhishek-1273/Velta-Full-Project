import { useState } from 'react'
import api from '../../api/api.js'
import { toast } from 'sonner'
import { FaEnvelope, FaWhatsapp, FaCheck, FaMapMarkerAlt } from 'react-icons/fa'
import styles from './Contact.module.css'
const INIT = { fullName: '', businessName: '', phoneNumber: '', email: '', whatToAutomate: '', message: '' }

function validate(form) {
  const e = {}
  if (!form.fullName.trim()) e.fullName = 'Name is required'
  if (!form.businessName.trim()) e.businessName = 'Company name is required'
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
      const combinedMessage = `What to automate:\n${form.whatToAutomate}\n\nAdditional Details:\n${form.message}`
      
      await api.post('/contact', {
        fullName: form.fullName,
        businessName: form.businessName,
        phoneNumber: form.phoneNumber,
        email: form.email,
        message: combinedMessage
      })
      setSent(true)
      toast.success('Message sent! We\'ll be in touch shortly.')
    } catch (err) {
      toast.error(err.userMessage || 'Failed to submit form. Please check your network.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.bg}>
          <div className={styles.grid} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="tag">Contact Us</span>
            <h1 className={styles.title}>
              Let's Build<br />
              <span className="gradient-text">Something Smarter.</span>
            </h1>
            <p className={styles.sub}>
              Tell us about your business operations, and let's design an intelligent system that eliminates manual work.
            </p>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.layout}>
            {/* Info panel */}
            <div className={styles.infoCol}>
              <h2>Operational Audit</h2>
              <p className={styles.infoText}>
                Connect directly with a VeltaZ systems engineer. We will audit your current process pipeline and construct a custom automation flow blueprint.
              </p>
              <div className={styles.detailsList}>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}><FaEnvelope /></span>
                  <div>
                    <span className={styles.detailLabel}>Direct Email</span>
                    <a href="mailto:support@veltalabs.net" className={styles.detailVal}>support@veltalabs.net</a>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}><FaWhatsapp /></span>
                  <div>
                    <span className={styles.detailLabel}>WhatsApp Broadcast</span>
                    <a href="https://wa.me/919960240648" target="_blank" rel="noopener noreferrer" className={styles.detailVal}>Chat with an Architect</a>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}><FaMapMarkerAlt /></span>
                  <div>
                    <span className={styles.detailLabel}>Headquarters</span>
                    <span className={styles.detailVal} style={{ color: 'var(--text2)', fontSize: '0.95rem' }}>
                      Office 405, G Wing, Mega Center,<br />Hadapsar, Pune, India
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.promises}>
                <h4>Our Guarantee</h4>
                <ul>
                  <li><FaCheck className={styles.checkIcon} /> Complete operational architecture blueprint.</li>
                  <li><FaCheck className={styles.checkIcon} /> Direct integration audit with your existing tech stack.</li>
                  <li><FaCheck className={styles.checkIcon} /> Zero commitment required.</li>
                </ul>
              </div>
            </div>

            {/* Form panel */}
            <div className={styles.formCol}>
              {sent ? (
                <div className={styles.success}>
                  <span className={styles.successIcon}><FaCheck /></span>
                  <h3>Audit Requested</h3>
                  <p>Our automation engineering team will review your scope and follow up within 2 hours.</p>
                  <button className="btn btn-outline" onClick={() => { setSent(false); setForm(INIT) }}>
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={submit} noValidate>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Full Name</label>
                      <input
                        className={`${styles.inp} ${errors.fullName ? styles.inpErr : ''}`}
                        type="text"
                        placeholder="John Smith"
                        value={form.fullName}
                        onChange={set('fullName')}
                        aria-invalid={!!errors.fullName}
                      />
                      {errors.fullName && <span className={styles.error} role="alert">{errors.fullName}</span>}
                    </div>

                    <div className={styles.field}>
                      <label>Company Name</label>
                      <input
                        className={`${styles.inp} ${errors.businessName ? styles.inpErr : ''}`}
                        type="text"
                        placeholder="Acme Corp"
                        value={form.businessName}
                        onChange={set('businessName')}
                        aria-invalid={!!errors.businessName}
                      />
                      {errors.businessName && <span className={styles.error} role="alert">{errors.businessName}</span>}
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Email Address</label>
                      <input
                        className={`${styles.inp} ${errors.email ? styles.inpErr : ''}`}
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={set('email')}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <span className={styles.error} role="alert">{errors.email}</span>}
                    </div>

                    <div className={styles.field}>
                      <label>Phone Number</label>
                      <input
                        className={`${styles.inp} ${errors.phoneNumber ? styles.inpErr : ''}`}
                        type="tel"
                        placeholder="+91 99999 88888"
                        value={form.phoneNumber}
                        onChange={set('phoneNumber')}
                        aria-invalid={!!errors.phoneNumber}
                      />
                      {errors.phoneNumber && <span className={styles.error} role="alert">{errors.phoneNumber}</span>}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label>What can VeltaZ help you automate?</label>
                    <textarea
                      className={styles.inp}
                      rows="3"
                      placeholder="e.g. Capture real estate leads on Facebook and route to CRM"
                      value={form.whatToAutomate}
                      onChange={set('whatToAutomate')}
                    />
                  </div>

                  <div className={styles.field}>
                    <label>Message / Additional Details</label>
                    <textarea
                      className={styles.inp}
                      rows="4"
                      placeholder="Tell us more about your target conversions..."
                      value={form.message}
                      onChange={set('message')}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px 0' }} disabled={loading}>
                    {loading ? 'Submitting...' : 'Talk to VeltaZ'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
