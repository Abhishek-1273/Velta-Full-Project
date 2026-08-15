import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import styles from './Docket14.module.css'

export default function Docket14() {
  const navigate = useNavigate()
  // Video player refs and playing states
  const employeeVideoRef = useRef(null)
  const adminVideoRef = useRef(null)
  const [employeePlaying, setEmployeePlaying] = useState(true)
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
            <h1 className={styles.heroTitle}>Docket14</h1>
            <p className={styles.heroSub}>
              Centralized case management and task tracking engine built for modern law practices. 
              Assign case intake portfolios, track stage transitions through six critical legal phases, 
              and audit associate expenses directly.
            </p>
            <div className={styles.heroButtons}>
              <a href="#showcase" className={`btn btn-primary ${styles.primaryBtnOverride}`}>Watch Demo Videos</a>
              <Link to="/contact" className={`btn btn-outline ${styles.outlineBtnOverride}`}>Request Custom Audit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS & VALUE CAPABILITIES */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Capabilities</span>
            <h2>Why Law Firms Trust Docket14</h2>
            <p>Built specifically to eliminate administrative friction and keep case lifecycles transparent.</p>
          </div>

          <div className={styles.featuresGrid}>
            {[
              { title: 'Secure CNR Case Intake', desc: 'Add new cases with unique CNR numbers and client attributes to track legal records securely.' },
              { title: '6-Phase Visual Tracking', desc: 'Guide associates through Draft Ready, Data Entry, Challan, Agreement, and Handover stages.' },
              { title: 'Roster Expense Auditing', desc: 'Associate lawyers log expenses (travel, filing fees) directly inside case profiles for admin approval.' },
              { title: 'Unified Activity Logs', desc: 'Real-time timeline feed tracking login records and case milestone transitions instantly.' }
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

      {/* DUAL APP VIDEO DOCK SHOWCASE */}
      <section id="showcase" className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">App Showcase</span>
            <h2>Docket14 Mobile Experience</h2>
            <p>Observe the legal operations system in action. Clean, responsive, and automated workflows.</p>
          </div>

          <div className={styles.videoShowcaseRow}>
            {/* Employee App Demo */}
            <div className={styles.videoShowcaseCard}>
              <div 
                className={styles.phoneMockup} 
                onClick={() => toggleVideoPlay(employeeVideoRef, employeePlaying, setEmployeePlaying, 'Employee')}
                title={employeePlaying ? 'Click to Pause' : 'Click to Play'}
              >
                <div className={styles.phoneBezel}>
                  <div className={styles.phoneCameraPill} />
                  <video 
                    ref={employeeVideoRef}
                    src="https://res.cloudinary.com/dqc1awrnc/video/upload/v1786782535/Employee_Docket_14_mixgsb.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className={styles.phoneScreenVideo}
                    poster="/images/whatsflow/leads.png" 
                  />
                </div>
                
                {/* Center Hover Control Overlay */}
                <button className={styles.playPauseFloat}>
                  {employeePlaying ? (
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
              <div className={styles.videoShowcaseDetails}>
                <h4>Employee Workspace</h4>
                <p>Junior advocates view assigned cases, complete 6-phase lifecycles, and submit travel/filing expense receipts for partner approval.</p>
              </div>
            </div>

            {/* Admin App Demo */}
            <div className={styles.videoShowcaseCard}>
              <div 
                className={styles.phoneMockup} 
                onClick={() => toggleVideoPlay(adminVideoRef, adminPlaying, setAdminPlaying, 'Admin')}
                title={adminPlaying ? 'Click to Pause' : 'Click to Play'}
              >
                <div className={styles.phoneBezel}>
                  <div className={styles.phoneCameraPill} />
                  <video 
                    ref={adminVideoRef}
                    src="https://res.cloudinary.com/dqc1awrnc/video/upload/v1786782545/Admin_Docket_14_lf6icd.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className={styles.phoneScreenVideo}
                    poster="/images/whatsflow/employees.png"
                  />
                </div>

                {/* Center Hover Control Overlay */}
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
              <div className={styles.videoShowcaseDetails}>
                <h4>Admin Control Dashboard</h4>
                <p>Managing lawyers register new CNR case files, assign associates, monitor live activity logs, and audit ledger balances.</p>
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
