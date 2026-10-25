import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import ThemeToggle from '../Theme/ThemeToggle'
import { 
  FaLaptopCode, FaMobileAlt, FaSearch, 
  FaVideo, FaCogs, FaBullhorn 
} from 'react-icons/fa'

const veltaServices = [
  {
    to: '/services/website-development',
    title: 'Website Development',
    desc: 'Modern SPAs, business websites & custom admin portals',
    icon: <FaLaptopCode />,
  },
  {
    to: '/services/mobile-app-development',
    title: 'Mobile Applications',
    desc: 'Hybrid iOS & Android apps with offline sync & 60fps',
    icon: <FaMobileAlt />,
  },
  {
    to: '/services/seo-blogging-google-business-profile',
    title: 'SEO & Google Profile',
    desc: 'Technical search ranking, blogging & verified GBP setup',
    icon: <FaSearch />,
  },
  {
    to: '/content',
    title: 'Content Studio & Social Media',
    desc: 'Reels, video creation & LinkedIn / Instagram branding',
    icon: <FaVideo />,
  },
  {
    to: '/services/automation-systems',
    title: 'Automation Systems',
    desc: 'Lead routing, CRM pipeline automation & message triggers',
    icon: <FaCogs />,
  },
  {
    to: '/services/performance-marketing',
    title: 'Performance Marketing',
    desc: 'Meta Campaign Ads, Insta Boost, Google Ads, ChatGPT & LinkedIn Ads',
    icon: <FaBullhorn />,
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownTimerRef = useRef(null)
  const location = useLocation()

  const isServicesActive = location.pathname.startsWith('/services') || location.pathname === '/content'
  const isCaseStudy = location.pathname.startsWith('/case-studies') || location.pathname.startsWith('/products/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  const handleMouseEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current)
    setServicesOpen(true)
  }

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setServicesOpen(false)
    }, 180)
  }

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.show : ''}`}
        onClick={() => setOpen(false)}
      />

      <nav className={`${styles.nav} ${scrolled || isCaseStudy ? styles.scrolled : ''} ${open ? styles.menuOpen : ''}`}>
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

              {/* 1. HOME */}
              <li>
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}
                >
                  Home
                </Link>
              </li>



              {/* 3. SERVICES (CLEAN 6-SERVICE DROPDOWN) */}
              <li
                className={styles.dropdownParent}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Desktop Link / Mobile Expand */}
                <div className={styles.dropdownTriggerWrapper}>
                  <Link
                    to="/services"
                    onClick={(e) => {
                      if (window.innerWidth <= 900) {
                        e.preventDefault()
                        setMobileServicesOpen(prev => !prev)
                      } else {
                        setOpen(false)
                      }
                    }}
                    className={`${styles.link} ${styles.dropdownTrigger} ${isServicesActive ? styles.active : ''}`}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    <span>Services</span>
                    <svg
                      className={`${styles.chevron} ${(servicesOpen || mobileServicesOpen) ? styles.chevronOpen : ''}`}
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </Link>
                </div>

                {/* DESKTOP DROPDOWN (ONLY OUR 6 REAL SERVICES) */}
                <div className={`${styles.dropdownMenu} ${servicesOpen ? styles.dropdownVisible : ''}`}>
                  <div className={styles.dropdownCard}>
                    <div className={styles.dropdownHeader}>
                      <span className={styles.dropdownEyebrow}>Our Services</span>
                      <Link 
                        to="/services" 
                        className={styles.viewAllLink}
                        onClick={() => {
                          setServicesOpen(false)
                          setOpen(false)
                        }}
                      >
                        All Services Overview →
                      </Link>
                    </div>

                    <div className={styles.servicesGrid}>
                      {veltaServices.map((s, idx) => (
                        <Link
                          key={idx}
                          to={s.to}
                          onClick={() => {
                            setServicesOpen(false)
                            setOpen(false)
                          }}
                          className={styles.serviceCard}
                        >
                          <div className={styles.serviceIconWrap}>
                            {s.icon}
                          </div>
                          <div className={styles.serviceText}>
                            <span className={styles.serviceTitle}>{s.title}</span>
                            <span className={styles.serviceDesc}>{s.desc}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* MOBILE ACCORDION SUBMENU */}
                <ul className={`${styles.mobileSubmenu} ${mobileServicesOpen ? styles.mobileSubmenuOpen : ''}`}>
                  <li className={styles.mobileOverviewItem}>
                      <Link
                        to="/services"
                        onClick={() => {
                          setMobileServicesOpen(false)
                          setOpen(false)
                        }}
                        className={styles.mobileOverviewLink}
                      >
                        <span>All Services Overview</span>
                        <span className={styles.mobileOverviewArrow}>→</span>
                      </Link>
                    </li>
                    {veltaServices.map((s, idx) => (
                    <li key={idx}>
                      <Link
                        to={s.to}
                        onClick={() => setOpen(false)}
                        className={styles.mobileSubLink}
                      >
                        <span className={styles.mobileSubIcon}>{s.icon}</span>
                        <span>{s.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* 4. CASE STUDIES */}
              <li>
                <Link
                  to="/case-studies"
                  onClick={() => setOpen(false)}
                  className={`${styles.link} ${location.pathname.startsWith('/case-stud') ? styles.active : ''}`}
                >
                  Case Studies
                </Link>
              </li>

              {/* 5. ABOUT US */}
              <li>
                <Link
                  to="/about"
                  onClick={() => setOpen(false)}
                  className={`${styles.link} ${location.pathname === '/about' ? styles.active : ''}`}
                >
                  About Us
                </Link>
              </li>

              {/* 5. CONTACT */}
              <li>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className={`${styles.link} ${location.pathname === '/contact' ? styles.active : ''}`}
                >
                  Contact
                </Link>
              </li>

              {/* MOBILE THEME TOGGLE */}
              <li className={styles.mobileThemeToggle}>
                <div className={styles.mobileToggleInner}>
                  <span>Appearance</span>
                  <ThemeToggle />
                </div>
              </li>
            </ul>

            {/* DESKTOP ACTIONS */}
            <div className={styles.desktopActions}>
              <ThemeToggle />
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
