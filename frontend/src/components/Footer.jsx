import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoWrapper}>
                <img src="logo/logo.png" alt="logo" className={styles.logoIconFooter} />
              </span>
            </Link>
            <p>Not just a tool — a complete business automation system for SMBs.</p>
            <div className={styles.socials}>
              <a href="https://wa.me/919960240648" className={styles.social} aria-label="WhatsApp">
                <img src="icons/whats-foot.png" alt="whatsapp" width="45px" />
              </a>
              <a href="https://www.linkedin.com/company/velta-ai" className={styles.social} aria-label="LinkedIn">
                <img src="icons/linkedin.png" alt="linkedIn" width="45px" />
              </a>
              <a href="https://www.instagram.com/velta_ai" className={styles.social} aria-label="Instagram">
                <img src="icons/insta.png" alt="instagram" width="45px" />
              </a>
            </div>
          </div>
          <div className={styles.links}>
            <div className={styles.col}>
              <h4>Product</h4>
              <Link to="/">Home</Link>
              <Link to="/product">Product</Link>
              <Link to="/demo">Demo</Link>
            </div>
            <div className={styles.col}>
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className={styles.col}>
              <h4>Contact</h4>
              <a href="mailto:veltaaisystem@gmail.com">veltaaisystem@gmail.com</a>
              <a href="tel:+919960240648">+91 99602 40648</a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© 2025 Velta | All rights reserved</p>
          <p>Built for SMBs 🇮🇳</p>
        </div>
      </div>
    </footer>
  )
}
