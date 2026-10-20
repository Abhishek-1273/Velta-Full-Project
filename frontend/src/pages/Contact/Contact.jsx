import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api.js'
import { FaEnvelope, FaWhatsapp, FaCheck, FaMapMarkerAlt } from 'react-icons/fa'
import CustomSelect from '../../components/CustomSelect/CustomSelect.jsx'
import styles from './Contact.module.css'

// Contact details already used elsewhere in the project
// (WhatsApp number: Services pages; email: Privacy Policy "Your Rights" section).
const CONTACT_EMAIL = 'support@veltalabs.net'
const WHATSAPP_URL = 'https://wa.me/919960240648'

// Keep these lists in sync with backend/src/models/Contact.model.js
const PROJECT_TYPES = ['Website', 'Application', 'Automation', 'Marketing / Content', 'SEO', 'Other']
const BUDGET_RANGES = ['Under $500', '$500 – $2,000', '$2,000 – $5,000', '$5,000 – $10,000', '$10,000+', 'Not sure yet']
const TIMELINES = ['As soon as possible', 'Within 1 month', '1–3 months', '3+ months', 'Flexible']

const SUCCESS_MESSAGE =
  "Thanks for reaching out to VeltaZ! Your enquiry has been submitted successfully. We'll review your details and follow up using your provided contact information."

const INIT = {
  fullName: '',
  businessName: '',
  email: '',
  country: '',
  projectType: '',
  message: '',
  budgetRange: '',
  timeline: '',
}

// Order used to focus the first invalid field
const FIELD_ORDER = ['fullName', 'businessName', 'email', 'country', 'projectType', 'message', 'budgetRange', 'timeline']

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/

function validate(form) {
  const e = {}
  const name = form.fullName.trim()
  const business = form.businessName.trim()
  const email = form.email.trim()
  const country = form.country.trim()
  const message = form.message.trim()

  if (!name) e.fullName = 'Please enter your name'
  else if (name.length > 100) e.fullName = 'Name must be 100 characters or fewer'

  if (business.length > 150) e.businessName = 'Business name must be 150 characters or fewer'

  if (!email) e.email = 'Please enter your email address'
  else if (email.length > 254 || !EMAIL_RE.test(email)) e.email = 'Enter a valid email address, e.g. you@company.com'

  if (!country) e.country = 'Please enter your country'
  else if (country.length > 100) e.country = 'Country must be 100 characters or fewer'

  if (!form.projectType) e.projectType = 'Please select a project type'

  if (!message) e.message = 'Please briefly describe your project'
  else if (message.length < 10) e.message = 'Please add a little more detail (at least 10 characters)'
  else if (message.length > 2000) e.message = 'Description must be 2000 characters or fewer'

  return e
}

function Field({ id, label, required, error, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>
        {label}
        {required
          ? <span className={styles.req} aria-hidden="true"> *</span>
          : <span className={styles.opt}> (optional)</span>}
      </label>
      {children}
      {error && <span id={`${id}-err`} className={styles.error} role="alert">{error}</span>}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState(INIT)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const inFlight = useRef(false)   // blocks double-submits even before React re-renders
  const formRef = useRef(null)
  const successRef = useRef(null)

  useEffect(() => {
    if (sent) successRef.current?.focus()
  }, [sent])

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors(er => ({ ...er, [k]: '' }))
  }

  const focusFirstError = (errs) => {
    const first = FIELD_ORDER.find(k => errs[k])
    if (first) formRef.current?.querySelector(`#contact-${first}`)?.focus()
  }

  // Shared props for every control
  const fieldProps = (k, required = false) => ({
    id: `contact-${k}`,
    name: k,
    value: form[k],
    onChange: set(k),
    'aria-required': required || undefined,
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `contact-${k}-err` : undefined,
    className: `${styles.inp} ${errors[k] ? styles.inpErr : ''}`,
  })

  const submit = async (e) => {
    e.preventDefault()
    if (inFlight.current) return

    setSubmitError('')
    const errs = validate(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      focusFirstError(errs)
      return
    }

    inFlight.current = true
    setLoading(true)
    try {
      const { data } = await api.post('/contact', {
        fullName: form.fullName.trim(),
        businessName: form.businessName.trim(),
        email: form.email.trim(),
        country: form.country.trim(),
        projectType: form.projectType,
        message: form.message.trim(),
        budgetRange: form.budgetRange,
        timeline: form.timeline,
      })

      // Only treat the enquiry as submitted when the backend explicitly confirms it.
      if (data?.success !== true) throw new Error('Unexpected response from server')

      setErrors({})
      setForm(INIT)
      setSent(true)
    } catch (err) {
      const serverErrors = err.response?.data?.errors
      if (err.response?.status === 400 && serverErrors && typeof serverErrors === 'object') {
        setErrors(serverErrors)
        focusFirstError(serverErrors)
        setSubmitError('Some details need attention. Please check the highlighted fields and try again.')
      } else {
        setSubmitError(
          `${err.userMessage || 'We could not submit your enquiry.'} Your details are still in the form — please try again.`
        )
      }
    } finally {
      inFlight.current = false
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
              Tell Us What{' '}<br />
              <span className="gradient-text">You're Building.</span>
            </h1>
            <p className={styles.sub}>
              Share your business challenge, project idea or current requirements. We'll review the details and discuss a practical next step.
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
              <h2>Contact Details</h2>
              <p className={styles.infoText}>
                Prefer to reach us directly? You can use any of the channels below.
              </p>
              <div className={styles.detailsList}>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}><FaEnvelope /></span>
                  <div>
                    <span className={styles.detailLabel}>Business Email</span>
                    <a href={`mailto:${CONTACT_EMAIL}`} className={styles.detailVal}>{CONTACT_EMAIL}</a>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}><FaWhatsapp /></span>
                  <div>
                    <span className={styles.detailLabel}>WhatsApp</span>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.detailVal}>Chat with us on WhatsApp</a>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}><FaMapMarkerAlt /></span>
                  <div>
                    <span className={styles.detailLabel}>Location</span>
                    <span className={styles.detailVal}>Pune, India</span>
                  </div>
                </div>
              </div>

              <div className={styles.promises}>
                <h4>What Happens Next</h4>
                <ul>
                  <li><FaCheck className={styles.checkIcon} /> You share your project details.</li>
                  <li><FaCheck className={styles.checkIcon} /> We review them and consider a practical next step.</li>
                  <li><FaCheck className={styles.checkIcon} /> We follow up using the contact details you provide.</li>
                </ul>
              </div>
            </div>

            {/* Form panel */}
            <div className={styles.formCol}>
              {sent ? (
                <div className={styles.success} ref={successRef} tabIndex={-1} role="status">
                  <span className={styles.successIcon}><FaCheck /></span>
                  <h3>Enquiry Submitted</h3>
                  <p>{SUCCESS_MESSAGE}</p>
                  <button type="button" className="btn btn-outline" onClick={() => { setSent(false); setSubmitError('') }}>
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={submit} noValidate ref={formRef} aria-busy={loading}>
                  <p className={styles.legend}>Fields marked <span className={styles.req}>*</span> are required.</p>

                  <div className={styles.row}>
                    <Field id="contact-fullName" label="Name" required error={errors.fullName}>
                      <input {...fieldProps('fullName', true)} type="text" placeholder="John Smith" autoComplete="name" maxLength={100} />
                    </Field>

                    <Field id="contact-businessName" label="Business Name" error={errors.businessName}>
                      <input {...fieldProps('businessName')} type="text" placeholder="Acme Corp" autoComplete="organization" maxLength={150} />
                    </Field>
                  </div>

                  <div className={styles.row}>
                    <Field id="contact-email" label="Email Address" required error={errors.email}>
                      <input {...fieldProps('email', true)} type="email" placeholder="you@company.com" autoComplete="email" inputMode="email" maxLength={254} />
                    </Field>

                    <Field id="contact-country" label="Country" required error={errors.country}>
                      <input {...fieldProps('country', true)} type="text" placeholder="e.g. United States" autoComplete="country-name" maxLength={100} />
                    </Field>
                  </div>

                  <Field id="contact-projectType" label="Project Type" required error={errors.projectType}>
                    <CustomSelect
                      {...fieldProps('projectType', true)}
                      placeholder="Select a project type"
                      options={PROJECT_TYPES}
                      error={!!errors.projectType}
                    />
                  </Field>

                  <Field id="contact-message" label="Short Project Description" required error={errors.message}>
                    <textarea
                      {...fieldProps('message', true)}
                      rows="5"
                      maxLength={2000}
                      placeholder="What are you looking to build or improve? Any goals, challenges or requirements worth knowing?"
                    />
                    <span className={styles.counter} aria-hidden="true">{form.message.length}/2000</span>
                  </Field>

                  <div className={styles.row}>
                    <Field id="contact-budgetRange" label="Budget Range (USD)" error={errors.budgetRange}>
                      <CustomSelect
                        {...fieldProps('budgetRange')}
                        placeholder="Select a range"
                        options={BUDGET_RANGES}
                        error={!!errors.budgetRange}
                      />
                    </Field>

                    <Field id="contact-timeline" label="Expected Timeline" error={errors.timeline}>
                      <CustomSelect
                        {...fieldProps('timeline')}
                        placeholder="Select a timeline"
                        options={TIMELINES}
                        error={!!errors.timeline}
                      />
                    </Field>
                  </div>

                  {submitError && (
                    <div className={styles.errorBanner} role="alert">
                      <p>{submitError}</p>
                      <p>
                        Still stuck? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or{' '}
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.submitBtn}`}
                    disabled={loading}
                  >
                    {loading ? 'Sending…' : 'Discuss My Project'}
                  </button>

                  <p className={styles.privacy}>
                    We'll use the details you share to review and respond to your enquiry. All shared business information is kept strictly confidential.
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