import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/product', label: 'Product' },
  { to: '/demo', label: 'Whatsflow' },
  { to: '/plan', label: 'Plans' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location])

  // Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  return (
    <>
      {/* ✅ OVERLAY */}
      <div
        className={`${styles.overlay} ${open ? styles.show : ''}`}
        onClick={() => setOpen(false)}
      />

      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${open ? styles.menuOpen : ''}`}>
        <div className={"container " + styles.inner}>

          {/* LOGO */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}><img src="logo/logo-icon.png" alt="logo-icon" /></span>

          </Link>

          <li className={styles.mobileToggle}>
            <ThemeToggle />
          </li>


          {/* LINKS */}
          <ul className={`${styles.links} ${open ? styles.open : ''}`}>
            {links.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}   // ✅ close on click
                  className={`${styles.link} ${location.pathname === l.to ? styles.active : ''}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {/* DESKTOP ACTIONS */}
          <div className={styles.actions}>
            <ThemeToggle />         
          </div>
          </ul>


          

          {/* BURGER */}
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen(o => !o)}
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </nav>
    </>
  )
}