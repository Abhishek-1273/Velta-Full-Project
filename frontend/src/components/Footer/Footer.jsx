import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { FaPaperPlane } from 'react-icons/fa'
import SocialCard from '../ui/social-card.tsx'
import styles from './Footer.module.css'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    toast.success('Thank you for subscribing to our newsletter!')
    setEmail('')
  }

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          {/* Column 1: Newsletter */}
          <div className={styles.newsletter}>
            <h3>Stay Connected</h3>
            <p>Join our newsletter for the latest updates and exclusive offers.</p>
            <form onSubmit={handleSubscribe} className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.subscribeBtn} aria-label="Subscribe">
                <FaPaperPlane size={12} />
              </button>
            </form>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.col}>
            <span className={styles.colTitle}>Quick Links</span>
            <Link to="/" className={styles.link}>Home</Link>
            <Link to="/about" className={styles.link}>About Us</Link>
            <Link to="/case-studies" className={styles.link}>Case Studies</Link>
            <Link to="/contact" className={styles.link}>Contact</Link>
          </div>

          {/* Column 3: Live Suites */}
          <div className={styles.col}>
            <span className={styles.colTitle}>Live Suites</span>
            <Link to="/kin-property" className={styles.link}>Kin Property</Link>
            <Link to="/whatsflow" className={styles.link}>WhatsFlow CRM</Link>
            <Link to="/docket14" className={styles.link}>Docket14 Legal</Link>
          </div>

          {/* Column 4: Services */}
          <div className={`${styles.col} ${styles.servicesCol}`}>
            <span className={styles.colTitle}>Services</span>
            <div className={styles.servicesLinks}>
              <Link to="/website-development" className={styles.link}>Website Development</Link>
              <Link to="/mobile-app-development" className={styles.link}>Mobile Applications</Link>
              <Link to="/seo-blogging-google-business-profile" className={styles.link}>SEO &amp; Google Profile</Link>
              <Link to="/content" className={styles.link}>Social Media &amp; Content</Link>
              <Link to="/performance-marketing" className={styles.link}>Performance Marketing</Link>
            </div>
          </div>

          {/* Column 5: Follow Us */}
          <div className={`${styles.col} ${styles.followCol}`}>
            <span className={styles.colTitle}>Follow Us</span>
            <div className={styles.followActions}>
              <div className={styles.socialCardWrapper}>
                <SocialCard />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copy}>© {new Date().getFullYear()} VeltaZ | All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link to="/privacy-policy" className={styles.legalLink}>Privacy Policy</Link>
            <span className={styles.legalDivider}>•</span>
            <Link to="/terms" className={styles.legalLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
