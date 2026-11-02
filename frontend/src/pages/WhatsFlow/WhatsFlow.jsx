import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import styles from './WhatsFlow.module.css'

export default function WhatsFlow() {
  const navigate = useNavigate()

  // Video player refs and playing states
  const employeeVideoRef = useRef(null)
  const adminVideoRef = useRef(null)
  const [employeePlaying, setEmployeePlaying] = useState(true)
  const [adminPlaying, setAdminPlaying] = useState(true)

  // Toaster notification alert
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const triggerToast = (msg) => {
    setToastMessage(msg)
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

      {/* Toast Alert popup */}
      {showToast && (
        <div className={styles.toastNotification}>
          <div className={styles.toastBody}>
            <svg className={styles.toastIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.bg}>
          <div className={styles.grid} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="tag">WhatsFlow Platform</span>
            <h1 className={styles.title}>
              Multi-Tenant AI Lead<br />
              <span className="gradient-text">Automation Platform.</span>
            </h1>
            <p className={styles.sub}>
              Connect WhatsApp conversations to custom CRM workspace dashboards. Automate qualifying inquiries, auto-route tasks to active employees, and track performance indicators in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* REAL APP VIDEO DOCK SHOWCASE */}
      <section className="section" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">App Showcase</span>
            <h2>WhatsFlow Mobile Experience</h2>
            <p>Step inside the actual app interface. Custom built for high-speed lead management and team automation.</p>
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
                    src="https://res.cloudinary.com/dqc1awrnc/video/upload/v1792919480/employee_wf_xgg38y.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className={styles.phoneScreenVideo}
                  />
                </div>
                
                {/* Float control overlay indicator */}
                <button className={styles.playPauseFloat}>
                  {employeePlaying ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
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
                <p>Watch how agents review inbound queues, update lead stages, and reply to prospects directly from their phone.</p>
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
                    src="https://res.cloudinary.com/dqc1awrnc/video/upload/v1792919469/admin_wf_dp0qwa.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className={styles.phoneScreenVideo}
                    poster="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792917399/admin_whatsFlow.jpg_pcyu3j.jpg"
                  />
                </div>

                {/* Float control overlay indicator */}
                <button className={styles.playPauseFloat}>
                  {adminPlaying ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
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
                <p>Observe how administrators monitor agent performance roster metrics, allocate leads, and broadcast announcements instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORYTELLING FLOW COMPARISON */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Workflow Story</span>
            <h2>The Friction Shift</h2>
            <p>Compare operational efficiency before and after deploying VeltaZ's WhatsFlow.</p>
          </div>

          <div className={styles.comparisonGrid}>
            {/* Before VeltaZ */}
            <div className={`${styles.comparisonCard} ${styles.before}`}>
              <h3>Without WhatsFlow</h3>
              <p className={styles.compSub}>Inefficient manual operations</p>
              
              <div className={styles.compSteps}>
                {[
                  { title: 'Lead Arrives', desc: 'Prospect clicks an ad, enters the chat queue.' },
                  { title: 'Manual Reply Required', desc: 'Representatives reply hours later. Lead is cold.' },
                  { title: 'Lead Forgotten', desc: 'No central CRM or auto-logging tracker. Spreadsheet out of date.' },
                  { title: 'No Follow-up', desc: 'No sequence nudges sent. Customer goes to competitors.' }
                ].map((s, idx) => (
                  <div key={s.title} className={styles.compStep}>
                    <span className={styles.stepNumRed}>{idx + 1}</span>
                    <div>
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* With WhatsFlow */}
            <div className={`${styles.comparisonCard} ${styles.after}`}>
              <h3>With WhatsFlow</h3>
              <p className={styles.compSub}>Automated operations engine</p>
              
              <div className={styles.compSteps}>
                {[
                  { title: 'WhatsApp Capture', desc: 'System automatically qualified leads and maps user parameters.' },
                  { title: 'AI Qualification', desc: 'Context-aware AI conversational models qualifying queries 24/7.' },
                  { title: 'Smart Distribution', desc: 'Automatically parses leads to active agents based on roster status.' },
                  { title: 'Closed Loop', desc: 'Employee manages status board, bookings booked, performance logged.' }
                ].map((s, idx) => (
                  <div key={s.title} className={styles.compStep}>
                    <span className={styles.stepNumGold}>{idx + 1}</span>
                    <div>
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES DETAILS */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Platform Capabilities</span>
            <h2>Core Features Built for Scale</h2>
            <p>Every element designed to support enterprise-level reliability and performance.</p>
          </div>

          <div className={styles.featuresGrid}>
            {[
              { title: 'WhatsApp AI qualification', desc: 'Instantly captures contact numbers, profile names, referral metadata, and custom query fields upon greeting.' },
              { title: 'Multi-Tenant System', desc: 'Multiple companies or franchises can isolate data workspace channels safely.' },
              { title: 'Smart Roster Distribution', desc: 'Automatically matches leads to available representatives using customizable load limits or manual assignments.' },
              { title: 'Visual Pipeline Board', desc: 'Move leads through clean status stages (Pending, Contacted, Interested, Booked) so representatives never drop context.' },
              { title: 'Instant Lead Capture', desc: 'Automatically captures incoming inquiries 24/7 with prospect names and query details, ensuring zero lost opportunities.' },
              { title: 'Team Performance Roster', desc: 'Monitor representative activities, call status updates, and lead closure statistics from a single panel.' },
              { title: 'Custom Broadcasts', desc: 'Safely execute promotional campaigns, service broadcasts, and customer updates within WhatsApp guidelines.' },
              { title: 'Open Integrations', desc: 'Synchronizes database records with external CRMs, sheets, and marketing platforms via webhook events.' }
            ].map(f => (
              <div key={f.title} className={styles.featureCard}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to Deploy WhatsFlow?</h2>
            <p>Automate your WhatsApp lead flow and upgrade your customer operations today.</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn btn-primary">Schedule Deployment</a>
              <a href="https://wa.me/919960240648" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
