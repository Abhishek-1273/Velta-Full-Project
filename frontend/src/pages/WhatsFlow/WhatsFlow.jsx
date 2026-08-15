import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import styles from './WhatsFlow.module.css'

export default function WhatsFlow() {
  const navigate = useNavigate()
  // Main view switcher: 'employee' or 'admin'
  const [portalView, setPortalView] = useState('employee')
  
  // Sub-tabs for Employee View: 'leads' (Today's Leads) or 'archive' (Lead Archive)
  const [employeeTab, setEmployeeTab] = useState('leads')
  
  // Sub-tabs for Admin View: 'team' (Staff), 'broadcast' (Alerts), 'appointments' (Scheduler), 'archive' (All Leads)
  const [adminTab, setAdminTab] = useState('team')

  // Search & Filter state for Employee Leads
  const [searchTerm, setSearchTerm] = useState('')
  const [leadFilter, setLeadFilter] = useState('pending') // default pending like screenshot
  
  // Search & Filter state for Lead Archive
  const [archiveSearch, setArchiveSearch] = useState('')
  const [archiveFilter, setArchiveFilter] = useState('all')

  // Active status state for employees (Admin panel toggles)
  const [employees, setEmployees] = useState([
    { id: 1, name: 'dhruv', email: 'dhruv@leadz.com', phone: '9787979489', leads: 54, today: 0, active: true },
    { id: 2, name: 'rohan', email: 'rohan1@gmail.com', phone: '6565556655', leads: 12, today: 3, active: false },
    { id: 3, name: 'amit', email: 'amit@lead1.com', phone: '9794949941', leads: 59, today: 5, active: true },
    { id: 4, name: 'dhruv_bkp', email: 'dhruv.backup@lead.com', phone: '8383838466', leads: 2, today: 0, active: false }
  ])

  // Leads state to allow interactive status changes
  const [leads, setLeads] = useState([
    // dhruv's leads (Visible in Employee View)
    { id: 1, name: 'Zorawar Gill', phone: '8889012345', status: 'Pending', agent: 'dhruv', date: '07 Aug', time: '2:34 pm' },
    { id: 2, name: 'Xenith Almeida', phone: '8867890123', status: 'Pending', agent: 'dhruv', date: '07 Aug', time: '2:34 pm' },
    { id: 3, name: 'Wasim Shaikh', phone: '8856789012', status: 'Pending', agent: 'dhruv', date: '07 Aug', time: '2:34 pm' },
    { id: 4, name: 'Veena Shetty', phone: '8845678901', status: 'Pending', agent: 'dhruv', date: '07 Aug', time: '2:34 pm' },
    { id: 5, name: 'Uday Rane', phone: '8834567890', status: 'Pending', agent: 'dhruv', date: '07 Aug', time: '2:34 pm' },
    // Other agents' leads (Only visible in Admin View)
    { id: 6, name: 'Anushka Tomar', phone: '8890123456', status: 'Contacted', agent: 'rohan', date: '07 Aug', time: '2:34 pm' },
    { id: 7, name: 'Yamini Hegde', phone: '8878901234', status: 'Interested', agent: 'amit', date: '07 Aug', time: '2:34 pm' },
    { id: 8, name: 'Karan Malhotra', phone: '9988776655', status: 'Booked', agent: 'rohan', date: '08 Aug', time: '11:15 am' },
    { id: 9, name: 'Sneha Reddy', phone: '9876543210', status: 'Pending', agent: 'amit', date: '08 Aug', time: '12:30 pm' }
  ])

  // Appointments state (Admin view scheduler)
  const [appointments, setAppointments] = useState([
    { id: 1, name: 'Aditi', phone: '6286566555', status: 'Missed', date: '2026-07-05', time: '17:00', agent: 'dhruv' },
    { id: 2, name: 'Rohan Mehta', phone: '9911223344', status: 'Upcoming', date: '2026-08-15', time: '14:30', agent: 'amit' }
  ])

  // Broadcast state inputs
  const [broadcastTitle, setBroadcastTitle] = useState('')
  const [broadcastMsg, setBroadcastMsg] = useState('')
  const [broadcastType, setBroadcastType] = useState('Info')
  const [broadcastTarget, setBroadcastTarget] = useState('All Users')

  // Toaster notification alert
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  // Custom Dropdown active state tracker
  const [openDropdownId, setOpenDropdownId] = useState(null)

  // Video player refs and playing states
  const employeeVideoRef = useRef(null)
  const adminVideoRef = useRef(null)
  const [employeePlaying, setEmployeePlaying] = useState(true)
  const [adminPlaying, setAdminPlaying] = useState(true)

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

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Toggle active status for employee (Admin View)
  const toggleEmployeeActive = (id, name) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === id) {
        const nextState = !emp.active
        triggerToast(`Employee Updated: ${name} updated successfully`)
        return { ...emp, active: nextState }
      }
      return emp
    }))
  }

  // Change lead status (Employee View)
  const changeLeadStatus = (leadId, newStatus) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        triggerToast(`Status Updated: ${l.name} marked as ${newStatus}`)
        return { ...l, status: newStatus }
      }
      return l
    }))
  }

  // Handle Send Broadcast
  const handleSendBroadcast = (e) => {
    e.preventDefault()
    if (!broadcastTitle || !broadcastMsg) {
      triggerToast('Please fill all broadcast fields!')
      return
    }
    triggerToast(`Broadcast Sent: "${broadcastTitle}" sent to ${broadcastTarget}`)
    setBroadcastTitle('')
    setBroadcastMsg('')
  }

  // Filters for Employee Leads Panel (Only shows dhruv's leads)
  const filteredLeads = leads.filter(lead => {
    const isMyLead = lead.agent === 'dhruv'
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.phone.includes(searchTerm)
    if (leadFilter === 'all') return isMyLead && matchesSearch
    return isMyLead && matchesSearch && lead.status.toLowerCase().replace(' ', '') === leadFilter.toLowerCase()
  })

  // Filters for Employee Lead Archive (Only shows dhruv's leads)
  const filteredEmployeeArchive = leads.filter(lead => {
    const isMyLead = lead.agent === 'dhruv'
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.phone.includes(searchTerm)
    if (leadFilter === 'all') return isMyLead && matchesSearch
    return isMyLead && matchesSearch && lead.status.toLowerCase().replace(' ', '') === leadFilter.toLowerCase()
  })

  // Filters for Admin Lead Archive (Shows all agents' leads)
  const filteredAdminArchive = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(archiveSearch.toLowerCase()) || lead.phone.includes(archiveSearch)
    if (archiveFilter === 'all') return matchesSearch
    return matchesSearch && lead.status.toLowerCase().replace(' ', '') === archiveFilter.toLowerCase()
  })

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
                    src="https://res.cloudinary.com/dqc1awrnc/video/upload/v1786782543/Employee_WhatsFlow_vey0gq.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className={styles.phoneScreenVideo}
                    poster="/images/whatsflow/leads.png"
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
                <p>Watch how agents review inbound queues, manage follow-up statuses, and send WhatsApp notices directly from their phone.</p>
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
                    src="https://res.cloudinary.com/dqc1awrnc/video/upload/v1786782548/Admin_WhatsFlow_i38idg.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className={styles.phoneScreenVideo}
                    poster="/images/whatsflow/employees.png"
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
              { title: 'Status Tracking Board', desc: 'Triggers automatic sequence nudges to prospects who go silent, reducing drop-off rates and recovering deals.' },
              { title: 'Appointment Reminders', desc: 'Integrates natively with calendar scheduling tools to lock in meetings, site visits, and consultation slots.' },
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
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
              <a href="/contact" className="btn btn-primary">Schedule Deployment</a>
              <a href="/plan" className="btn btn-outline">Explore Custom Setup</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
