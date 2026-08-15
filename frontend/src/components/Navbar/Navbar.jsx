import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import ThemeToggle from '../Theme/ThemeToggle'
import { useAuth } from '../../context/AuthContext'
const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setDropdownOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    await logout()
    setDropdownOpen(false)
    navigate('/')
  }

  const avatar = user?.name?.charAt(0).toUpperCase() || '?'
  const isAdmin = user?.role === 'admin'

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.show : ''}`}
        onClick={() => setOpen(false)}
      />

      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${open ? styles.menuOpen : ''}`}>
        <div className={"container " + styles.inner}>

          {/* LOGO */}
          <Link to="/" className={styles.logo}>
            <img src="/logo/logo.png?v=2" alt="Veltaz Logo" className={styles.logoImg} />
          </Link>

          {/* RIGHT GROUP (Links + Actions) */}
          <div className={styles.rightGroup}>
            {/* NAV LINKS */}
            <ul className={`${styles.links} ${open ? styles.open : ''}`}>
              {/* MOBILE DRAWER HEADER LOGO */}
              <li className={styles.mobileLogoItem}>
                <Link to="/" className={styles.mobileLogoLink} onClick={() => setOpen(false)}>
                  <img src="/logo/logo-gold.png" alt="Veltaz Emblem" className={styles.mobileLogoImg} />
                </Link>
              </li>
              {links.map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`${styles.link} ${location.pathname === l.to ? styles.active : ''}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}

              {/* MOBILE THEME TOGGLE */}
              <li className={styles.mobileThemeToggle}>
                <div className={styles.mobileToggleInner}>
                  <span>Appearance</span>
                  <ThemeToggle />
                </div>
              </li>

              {/* MOBILE AUTH */}
              <li className={styles.mobileAuth}>
                {user ? (
                  <div className={styles.mobileUser}>
                    <div className={styles.mobileUserInfo}>
                      <div className={styles.mobileAvatar}>{avatar}</div>
                      <div>
                        <div className={styles.mobileUserName}>{user.name}</div>
                        <span className={`${styles.roleBadge} ${isAdmin ? styles.adminBadge : styles.userBadge}`}>
                          {isAdmin ? 'Admin' : 'User'}
                        </span>
                      </div>
                    </div>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className={styles.signInBtn} onClick={() => setOpen(false)}>
                      Log In
                    </Link>
                    <Link to="/signup" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }} onClick={() => setOpen(false)}>
                      Get Started
                    </Link>
                  </>
                )}
              </li>
            </ul>

            {/* DESKTOP ACTIONS */}
            <div className={styles.desktopActions}>
              <ThemeToggle />

              {user ? (
                <div className={styles.userMenu} ref={dropdownRef}>
                  <button
                    className={styles.avatarBtn}
                    onClick={() => setDropdownOpen(o => !o)}
                  >
                    <div className={styles.avatarCircle}>{avatar}</div>
                    <div className={styles.avatarInfo}>
                      <span className={styles.avatarName}>{user.name.split(' ')[0]}</span>
                    </div>
                    <svg className={`${styles.chevron} ${dropdownOpen ? styles.chevronUp : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className={styles.dropdown}>
                      <div className={styles.dropdownHeader}>
                        <div className={styles.dropdownAvatar}>{avatar}</div>
                        <div>
                          <div className={styles.dropdownName}>{user.name}</div>
                          <div className={styles.dropdownEmail}>{user.email}</div>
                        </div>
                      </div>
                      <div className={styles.dropdownDivider} />
                      <button className={styles.dropdownLogout} onClick={handleLogout}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.authButtons}>
                  <Link to="/login" className={styles.signInBtn}>
                    Log In
                  </Link>
                  <Link to="/signup" className="btn btn-primary">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* BURGER */}
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle navigation menu"
          >
            <span /><span /><span />
          </button>

        </div>
      </nav>
    </>
  )
}
