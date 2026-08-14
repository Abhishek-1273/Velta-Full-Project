import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext.jsx'
import { toast } from 'sonner'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane, FaSun, FaMoon } from 'react-icons/fa'
import styles from './Footer.module.css'

export default function Footer() {
  const { theme, toggle } = useTheme()
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
            <h3>Stay<br />Connected</h3>
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
            <Link to="/services" className={styles.link}>Services</Link>
            <Link to="/products" className={styles.link}>Products</Link>
            <Link to="/contact" className={styles.link}>Contact</Link>
          </div>

          {/* Column 3: Our Products */}
          <div className={styles.col}>
            <span className={styles.colTitle}>Our Products</span>
            <Link to="/products/whatsflow" className={styles.link}>WhatsFlow</Link>
            <Link to="/products/docket14" className={styles.link}>Docket14</Link>
            <Link to="/products/kin-property" className={styles.link}>Kin Property</Link>
          </div>

          {/* Column 4: Follow Us */}
          <div className={styles.col}>
            <span className={styles.colTitle}>Follow Us</span>
            <div className={styles.socialsRow}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>

            {/* Theme Toggle Switch */}
            <div className={styles.themeToggleWrapper}>
              <FaSun className={styles.sunIcon} />
              <button
                type="button"
                className={`${styles.toggleSwitch} ${theme === 'dark' ? styles.toggleSwitchActive : ''}`}
                onClick={toggle}
                aria-label="Toggle theme"
              >
                <span className={styles.toggleSlider} />
              </button>
              <FaMoon className={styles.moonIcon} />
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copy}>© {new Date().getFullYear()} VeltaZ | All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link to="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
            <Link to="/terms" className={styles.bottomLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
