import { useState } from 'react'
import styles from './Contact.module.css'

const businessTypes = ['Real Estate', 'Education', 'Healthcare', 'E-Commerce', 'Finance', 'Hospitality', 'Retail', 'Manufacturing', 'Other']

export default function Contact() {
  const [form, setForm] = useState({ fullName: '', businessName: '', phoneNumber: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setSent(true);
    } else {
      alert(data.message || "Something went wrong");
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
              <p style={{ color: 'var(--text2)', lineHeight: 1.8, marginBottom: 40 }}>Have any question about Automation? <br/>We're here to help.</p>
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
                  <button className="btn btn-outline" onClick={() => setSent(false)}>Send Another</button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={submit}>
                  <h3>Get in Touch</h3>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Full Name <span className={styles.req}>*</span></label>
                      <input className={styles.inp} type="text" placeholder="Dhruv Sharma" value={form.fullName} onChange={set('fullName')} required />
                    </div>
                    <div className={styles.field}>
                      <label>Business Name <span className={styles.req}>*</span></label>
                      <input className={styles.inp} type="text" placeholder="ABC Realty" value={form.businessName} onChange={set('businessName')} required />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Phone Number <span className={styles.req}>*</span></label>
                      <input className={styles.inp} type="tel" placeholder="+91 98765 43210" value={form.phoneNumber} onChange={set('phoneNumber')} required />
                    </div>
                    <div className={styles.field}>
                      <label>Email</label>
                      <input className={styles.inp} type="email" placeholder="your@business.com" value={form.email} onChange={set('email')} />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>Message</label>
                    <textarea className={styles.inp} rows="4" placeholder="Tell us about your business and what you want to automate..." value={form.message} onChange={set('message')} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '15px 28px' }}>
                    Send Message →
                  </button>
                  <p className={styles.note}><span className={styles.safe}><img src='/icons/safe.png' alt='safe' width="15" /></span> Your information is safe with us. No spam, ever.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
