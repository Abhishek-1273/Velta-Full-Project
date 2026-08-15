import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import styles from './KinProperty.module.css'

export default function KinProperty() {
  const navigate = useNavigate()
  // Video player refs and playing states
  const websiteVideoRef = useRef(null)
  const adminVideoRef = useRef(null)
  const [websitePlaying, setWebsitePlaying] = useState(true)
  const [adminPlaying, setAdminPlaying] = useState(true)

  // Notification state
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const toggleVideoPlay = (videoRef, isPlaying, setIsPlaying, label) => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
        triggerToast(`Paused ${label} demo`)
      } else {
        videoRef.current.play().catch(() => {})
        setIsPlaying(true)
        triggerToast(`Playing ${label} demo`)
      }
    }
  }

  return (
    <div className={styles.page}>
      <button onClick={() => navigate(-1)} className={styles.backBtn} aria-label="Go back">
        <FaArrowLeft />
      </button>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.gridOverlay} />
          <div className={styles.ambientGlow} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="tag">Product Roster</span>
            <h1 className={styles.heroTitle}>Kin Property</h1>
            <p className={styles.heroSub}>
              A comprehensive portal designed to buy, sell, rent, and manage properties. 
              Streamlines lead matching, listing verifications, and property management workflows 
              for modern agencies.
            </p>
            <div className={styles.heroButtons}>
              <a href="#showcase" className="btn btn-primary">Watch Demo Videos</a>
              <Link to="/contact" className="btn btn-outline">Request Custom Audit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE CAPABILITIES SECTION */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Capabilities</span>
            <h2>Automation for Real Estate</h2>
            <p>Empower your agents and delight your customers with streamlined property portals.</p>
          </div>

          <div className={styles.featuresGrid}>
            {[
              { title: 'Buy/Sell/Rent Listings', desc: 'Custom search engines with verification stamps, filtering, and responsive gallery previews.' },
              { title: 'Interactive Location Maps', desc: 'Geolocate listings with interactive maps, neighborhood coordinates, and transit markers.' },
              { title: 'Agent Lead Routing', desc: 'AI routes buyer inquiries to matching agents based on budget, location, and specialization.' },
              { title: 'Tenant Document Storage', desc: 'Directly manage leases, security deposits, tenancy agreements, and key letters.' }
            ].map(f => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureDot} />
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DUAL LAPTOP BROWSER SHOWCASE */}
      <section id="showcase" className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Portal Showcase</span>
            <h2>Desktop & CRM Interface</h2>
            <p>Observe the client-facing property portal and the back-end agency management workspace side-by-side.</p>
          </div>

          <div className={styles.browserShowcaseGrid}>
            
            {/* Website Listings Screen */}
            <div className={styles.showcaseCard}>
              <div className={styles.browserHeaderDetails}>
                <h4>Client Portal Experience</h4>
                <p>Browse luxury listings, schedule virtual site-visits, and view interactive neighborhood maps.</p>
              </div>
              <div 
                className={styles.browserMockup}
                onClick={() => toggleVideoPlay(websiteVideoRef, websitePlaying, setWebsitePlaying, 'Client Portal')}
                title={websitePlaying ? 'Click to Pause' : 'Click to Play'}
              >
                <div className={styles.browserChromeBar}>
                  <div className={styles.chromeWindowButtons}>
                    <span className={styles.chromeClose} />
                    <span className={styles.chromeMinimize} />
                    <span className={styles.chromeMaximize} />
                  </div>
                  <div className={styles.chromeAddressBar}>https://kinproperty.com/listings</div>
                </div>
                <div className={styles.browserViewport}>
                  <video 
                    ref={websiteVideoRef}
                    src="https://res.cloudinary.com/dqc1awrnc/video/upload/v1786559690/website_1_gell7s.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className={styles.browserVideo}
                  />
                  {/* Play/Pause Float Overlay */}
                  <button className={styles.playPauseFloat}>
                    {websitePlaying ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="5" y="4" width="4" height="16" rx="1"/><rect x="15" y="4" width="4" height="16" rx="1"/>
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translateX(1px)' }}>
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Admin CRM Screen */}
            <div className={styles.showcaseCard}>
              <div className={styles.browserHeaderDetails}>
                <h4>Agent CRM & Management</h4>
                <p>Manage list audits, assign leads dynamically, review agreements, and track sales progress.</p>
              </div>
              <div 
                className={styles.browserMockup}
                onClick={() => toggleVideoPlay(adminVideoRef, adminPlaying, setAdminPlaying, 'Agent CRM')}
                title={adminPlaying ? 'Click to Pause' : 'Click to Play'}
              >
                <div className={styles.browserChromeBar}>
                  <div className={styles.chromeWindowButtons}>
                    <span className={styles.chromeClose} />
                    <span className={styles.chromeMinimize} />
                    <span className={styles.chromeMaximize} />
                  </div>
                  <div className={styles.chromeAddressBar}>https://admin.kinproperty.com/dashboard</div>
                </div>
                <div className={styles.browserViewport}>
                  <video 
                    ref={adminVideoRef}
                    src="https://res.cloudinary.com/dqc1awrnc/video/upload/v1786558468/admin_an7wy5.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className={styles.browserVideo}
                  />
                  {/* Play/Pause Float Overlay */}
                  <button className={styles.playPauseFloat}>
                    {adminPlaying ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="5" y="4" width="4" height="16" rx="1"/><rect x="15" y="4" width="4" height="16" rx="1"/>
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translateX(1px)' }}>
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TOASTER NOTIFICATION ALERT */}
      <div className={`${styles.toastAlert} ${showToast ? styles.showToast : ''}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginRight: '8px' }}>
          <circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 16 14"/>
        </svg>
        {toastMsg}
      </div>

    </div>
  )
}
