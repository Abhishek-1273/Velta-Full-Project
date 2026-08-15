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

      {/* TABS SELECTOR / SWITCHER PANEL FOR PORTALS */}
      <section className={styles.portalToggleSection}>
        <div className="container">
          <div className={styles.portalSwitchWrapper}>
            <button 
              className={`${styles.portalSwitchBtn} ${portalView === 'employee' ? styles.portalSwitchBtnActive : ''}`}
              onClick={() => setPortalView('employee')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Employee Workspace View
            </button>
            <button 
              className={`${styles.portalSwitchBtn} ${portalView === 'admin' ? styles.portalSwitchBtnActive : ''}`}
              onClick={() => setPortalView('admin')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              Admin Management View
            </button>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW / SIMULATOR */}
      <section className="section" style={{ paddingTop: '10px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.simulatorWrapper}>
            
            {/* The Simulation Screen frame */}
            <div className={styles.dashboardMock}>
              <div className={styles.mockHeader}>
                <div className={styles.mockCircles}>
                  <span className={styles.circleRed} />
                  <span className={styles.circleYellow} />
                  <span className={styles.circleGreen} />
                </div>
                <div className={styles.mockTitle}>
                  {portalView === 'employee' ? 'whatsflow-employee-portal' : 'whatsflow-admin-management'}
                </div>

                {/* Sub navigation depending on portal view */}
                <div className={styles.mockNav}>
                  {portalView === 'employee' ? (
                    <>
                      <button 
                        className={`${styles.mockTab} ${employeeTab === 'leads' ? styles.activeTab : ''}`}
                        onClick={() => setEmployeeTab('leads')}
                      >
                        Today's Leads
                      </button>
                      <button 
                        className={`${styles.mockTab} ${employeeTab === 'archive' ? styles.activeTab : ''}`}
                        onClick={() => setEmployeeTab('archive')}
                      >
                        Lead Archive
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        className={`${styles.mockTab} ${adminTab === 'team' ? styles.activeTab : ''}`}
                        onClick={() => setAdminTab('team')}
                      >
                        Active Staff Directory
                      </button>
                      <button 
                        className={`${styles.mockTab} ${adminTab === 'broadcast' ? styles.activeTab : ''}`}
                        onClick={() => setAdminTab('broadcast')}
                      >
                        Send Announcements
                      </button>
                      <button 
                        className={`${styles.mockTab} ${adminTab === 'appointments' ? styles.activeTab : ''}`}
                        onClick={() => setAdminTab('appointments')}
                      >
                        Appointments Scheduler
                      </button>
                      <button 
                        className={`${styles.mockTab} ${adminTab === 'archive' ? styles.activeTab : ''}`}
                        onClick={() => setAdminTab('archive')}
                      >
                        All Leads Archive
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* SIMULATOR SCREEN CONTENT AREA */}
              <div className={styles.mockContent}>
                
                {/* ================= EMPLOYEE VIEW ================= */}
                {portalView === 'employee' && (
                  <div>
                    {/* Employee Leads Queue tab */}
                    {employeeTab === 'leads' && (
                      <div className={styles.simulatorPane}>
                        <div className={styles.paneHeader}>
                          <div className={styles.paneTitleBlock}>
                            <h3 className={styles.simulatorTitle}>Today's Leads</h3>
                            <span className={styles.counterBadge}>{filteredLeads.length} total</span>
                          </div>
                          
                          {/* Search bar */}
                          <div className={styles.searchContainer}>
                            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            <input 
                              type="text" 
                              placeholder="Search my leads..." 
                              className={styles.simInput}
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Filter Tabs */}
                        <div className={styles.filterBar}>
                          {[
                            { value: 'all', label: 'All', icon: null },
                            { value: 'pending', label: 'Pending', icon: (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '5px', verticalAlign: 'middle' }}>
                                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                              </svg>
                            )},
                            { value: 'booked', label: 'Booked', icon: (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '5px', verticalAlign: 'middle' }}>
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                              </svg>
                            )},
                            { value: 'interested', label: 'Interested', icon: (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '5px', verticalAlign: 'middle' }}>
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                              </svg>
                            )},
                            { value: 'notinterested', label: 'Not Interested', icon: (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '5px', verticalAlign: 'middle' }}>
                                <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                              </svg>
                            )}
                          ].map(pill => (
                            <button
                              key={pill.value}
                              onClick={() => setLeadFilter(pill.value)}
                              className={`${styles.filterPill} ${leadFilter === pill.value ? styles.activeFilterPill : ''}`}
                            >
                              {pill.icon}
                              {pill.label}
                            </button>
                          ))}
                        </div>

                        {/* Interactive Leads List cards */}
                        <div className={styles.leadsGrid}>
                          {filteredLeads.length === 0 ? (
                            <div className={styles.emptyState}>No leads assigned to you found in this queue.</div>
                          ) : (
                            filteredLeads.map(lead => (
                              <div key={lead.id} className={styles.leadListItem} style={{ zIndex: openDropdownId === lead.id ? 100 : 'auto' }}>
                                <div className={styles.leadAvatar}>{lead.name.charAt(0)}</div>
                                <div className={styles.leadInfo}>
                                  <div className={styles.leadMeta}>
                                    <span className={styles.leadName}>{lead.name}</span>
                                    <span className={styles.leadPhone}>{lead.phone}</span>
                                  </div>
                                  <div className={styles.agentTag}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                    </svg>
                                    Agent: {lead.agent}
                                  </div>
                                </div>
                                <div className={styles.leadStatusSection}>
                                  {/* Custom React Dropdown status changer */}
                                  <div className={styles.customSelectWrapper}>
                                    <button 
                                      className={`${styles.customSelectBtn} ${styles[lead.status.toLowerCase().replace(' ', '')]}`}
                                      onClick={() => setOpenDropdownId(openDropdownId === lead.id ? null : lead.id)}
                                    >
                                      <span>{lead.status}</span>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginLeft: '4px', transition: 'transform 0.2s ease', transform: openDropdownId === lead.id ? 'rotate(180deg)' : 'rotate(0)' }}>
                                        <polyline points="6 9 12 15 18 9"/>
                                      </svg>
                                    </button>

                                    {openDropdownId === lead.id && (
                                      <>
                                        {/* Dropdown Backdrop to close dropdown on click outside */}
                                        <div className={styles.dropdownBackdrop} onClick={() => setOpenDropdownId(null)} />
                                        <div className={styles.customSelectMenu}>
                                          {[
                                            { value: 'Pending', label: 'Pending', keyClass: 'pending' },
                                            { value: 'Interested', label: 'Interested', keyClass: 'interested' },
                                            { value: 'Booked', label: 'Booked', keyClass: 'booked' },
                                            { value: 'Contacted', label: 'Contacted', keyClass: 'contacted' },
                                            { value: 'Not Interested', label: 'Not Interested', keyClass: 'notinterested' }
                                          ].map(opt => (
                                            <button
                                              key={opt.value}
                                              type="button"
                                              className={`${styles.customSelectItem} ${styles[opt.keyClass]} ${lead.status === opt.value ? styles.customSelectItemActive : ''}`}
                                              onClick={() => {
                                                changeLeadStatus(lead.id, opt.value)
                                                setOpenDropdownId(null)
                                              }}
                                            >
                                              <span>{opt.label}</span>
                                            </button>
                                          ))}
                                        </div>
                                      </>
                                    )}
                                  </div>

                                  <div className={styles.leadActions}>
                                    <button 
                                      className={styles.iconBtnCall} 
                                      title="Call Lead"
                                      onClick={() => triggerToast(`Initiating call with ${lead.name} (${lead.phone})`)}
                                    >
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                      </svg>
                                    </button>
                                    <button 
                                      className={styles.iconBtnChat} 
                                      title="Chat on WhatsApp"
                                      onClick={() => triggerToast(`Opening WhatsApp chat with ${lead.name}`)}
                                    >
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {/* Employee Archive Tab (Only shows dhruv's leads) */}
                    {employeeTab === 'archive' && (
                      <div className={styles.simulatorPane}>
                        <div className={styles.paneHeader}>
                          <div className={styles.paneTitleBlock}>
                            <h3 className={styles.simulatorTitle}>My Lead Archive</h3>
                            <span className={styles.counterBadge}>{filteredEmployeeArchive.length} leads stored</span>
                          </div>

                          {/* Search bar */}
                          <div className={styles.searchContainer}>
                            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            <input 
                              type="text" 
                              placeholder="Search archive database..." 
                              className={styles.simInput}
                              value={archiveSearch}
                              onChange={(e) => setArchiveSearch(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Archive Table */}
                        <div className={styles.leadsTableWrapper}>
                          <table className={styles.leadsTable}>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Assigned Agent</th>
                                <th>Logged Date</th>
                                <th>Current Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredEmployeeArchive.length === 0 ? (
                                <tr>
                                  <td colSpan="5" className={styles.emptyState}>No archive logs matching.</td>
                                </tr>
                              ) : (
                                filteredEmployeeArchive.map(lead => (
                                  <tr key={lead.id}>
                                    <td><strong>{lead.name}</strong></td>
                                    <td>{lead.phone}</td>
                                    <td>
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                      </svg>
                                      {lead.agent}
                                    </td>
                                    <td>{lead.date} • {lead.time}</td>
                                    <td>
                                      <span className={`${styles.statusLabelBadge} ${styles[lead.status.toLowerCase().replace(' ', '')]}`}>
                                        {lead.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ================= ADMIN VIEW ================= */}
                {portalView === 'admin' && (
                  <div>
                    {/* Admin Active Staff Directory */}
                    {adminTab === 'team' && (
                      <div className={styles.simulatorPane}>
                        <div className={styles.paneHeader}>
                          <h3 className={styles.simulatorTitle}>Active Staff Directory</h3>
                          <span className={styles.counterBadge}>{employees.length} employees</span>
                        </div>

                        <div className={styles.employeeList}>
                          {employees.map(emp => (
                            <div key={emp.id} className={styles.employeeCard}>
                              <div className={styles.empHeader}>
                                <div className={styles.empAvatar}>{emp.name.charAt(0).toUpperCase()}</div>
                                <div className={styles.empInfoBlock}>
                                  <h4 className={styles.empName}>{emp.name}</h4>
                                  <span className={styles.empMeta}>{emp.email} • {emp.phone}</span>
                                  <div className={styles.empStatsRow}>
                                    <span>
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                                      </svg>
                                      {emp.leads} leads assigned
                                    </span>
                                    <span>
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                      </svg>
                                      {emp.today} assigned today
                                    </span>
                                  </div>
                                </div>

                                <div className={styles.empActiveControls}>
                                  <span className={`${styles.statusLabelBadge} ${emp.active ? styles.empActive : styles.empInactive}`}>
                                    {emp.active ? '● Active' : '○ Inactive'}
                                  </span>
                                  
                                  {/* Toggle Switch */}
                                  <label className={styles.toggleSwitch}>
                                    <input 
                                      type="checkbox" 
                                      checked={emp.active}
                                      onChange={() => toggleEmployeeActive(emp.id, emp.name)}
                                    />
                                    <span className={styles.switchSlider}></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Admin Announcements Broadcast tab */}
                    {adminTab === 'broadcast' && (
                      <div className={styles.simulatorPane}>
                        <div className={styles.paneHeader}>
                          <h3 className={styles.simulatorTitle}>Send Broadcast Notification</h3>
                        </div>

                        <form onSubmit={handleSendBroadcast} className={styles.broadcastForm}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Title *</label>
                            <input 
                              type="text" 
                              placeholder="e.g. New Policy Update" 
                              className={styles.formInput}
                              value={broadcastTitle}
                              onChange={(e) => setBroadcastTitle(e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Message *</label>
                            <textarea 
                              placeholder="Write your message..." 
                              className={styles.formTextarea}
                              rows={4}
                              value={broadcastMsg}
                              onChange={(e) => setBroadcastMsg(e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Alert Type</label>
                            <div className={styles.alertTypesGrid}>
                              {[
                                { name: 'Info', icon: (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                                  </svg>
                                )},
                                { name: 'Success', icon: (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                                  </svg>
                                )},
                                { name: 'Warning', icon: (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                                  </svg>
                                )},
                                { name: 'Alert', icon: (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                                  </svg>
                                )}
                              ].map(type => (
                                <button
                                  type="button"
                                  key={type.name}
                                  onClick={() => setBroadcastType(type.name)}
                                  className={`${styles.alertTypeBtn} ${broadcastType === type.name ? styles.activeAlertType : ''}`}
                                >
                                  {type.icon}
                                  {type.name}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Send To</label>
                            <select 
                              className={styles.formSelect}
                              value={broadcastTarget}
                              onChange={(e) => setBroadcastTarget(e.target.value)}
                            >
                              <option value="All Users">All Active Employees</option>
                              <option value="dhruv">dhruv (dhruv@leadz.com)</option>
                              <option value="rohan">rohan (rohan1@gmail.com)</option>
                            </select>
                          </div>

                          <button type="submit" className={styles.btnBroadcast}>
                            🚀 Send Notification
                          </button>
                        </form>
                      </div>
                    )}

                    {/* Admin Appointments Scheduler Tab */}
                    {adminTab === 'appointments' && (
                      <div className={styles.simulatorPane}>
                        <div className={styles.paneHeader}>
                          <h3 className={styles.simulatorTitle}>Team Appointments Scheduler</h3>
                          <span className={styles.counterBadge}>{appointments.length} total</span>
                        </div>

                        <div className={styles.appointmentsList}>
                          {appointments.map(apt => (
                            <div key={apt.id} className={styles.appointmentCard}>
                              <div className={styles.aptHeader}>
                                <div className={styles.aptAvatar}>{apt.name.charAt(0)}</div>
                                <div>
                                  <h4 className={styles.aptName}>{apt.name}</h4>
                                  <span className={styles.aptPhone}>{apt.phone}</span>
                                </div>
                                <span className={`${styles.badge} ${apt.status === 'Missed' ? styles.badgeMissed : styles.badgeUpcoming || ''}`} style={{ background: apt.status === 'Upcoming' ? 'rgba(16, 185, 129, 0.08)' : '', color: apt.status === 'Upcoming' ? '#10b981' : '', border: apt.status === 'Upcoming' ? '1px solid rgba(16, 185, 129, 0.15)' : '' }}>
                                  {apt.status}
                                </span>
                              </div>
                              
                              <div className={styles.aptMetaRow}>
                                <div className={styles.aptMetaItem}>
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '5px' }}>
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                                  </svg>
                                  {apt.date}
                                </div>
                                <div className={styles.aptMetaItem}>
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '5px' }}>
                                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                  </svg>
                                  {apt.time}
                                </div>
                                <div className={styles.aptMetaItem}>
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '5px' }}>
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                  </svg>
                                  Assigned Agent: <strong>{apt.agent}</strong>
                                </div>
                              </div>

                              <div className={styles.aptActions}>
                                <button 
                                  className={styles.btnAptWa}
                                  onClick={() => triggerToast(`Sending reminder to ${apt.name} via WhatsApp API...`)}
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                  </svg>
                                  Send on WhatsApp
                                </button>
                                <button 
                                  className={styles.btnAptDone}
                                  onClick={() => triggerToast('Appointment marked as completed!')}
                                  title="Mark Completed"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12"/>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Admin Lead database archive tab (Shows all agents' leads) */}
                    {adminTab === 'archive' && (
                      <div className={styles.simulatorPane}>
                        <div className={styles.paneHeader}>
                          <div className={styles.paneTitleBlock}>
                            <h3 className={styles.simulatorTitle}>All Leads Archive</h3>
                            <span className={styles.counterBadge}>{leads.length} leads logged</span>
                          </div>

                          {/* Search bar */}
                          <div className={styles.searchContainer}>
                            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            <input 
                              type="text" 
                              placeholder="Search database..." 
                              className={styles.simInput}
                              value={archiveSearch}
                              onChange={(e) => setArchiveSearch(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Status filters */}
                        <div className={styles.filterBar}>
                          {['all', 'pending', 'booked', 'interested', 'contacted', 'notinterested'].map(filterVal => (
                            <button
                              key={filterVal}
                              onClick={() => setArchiveFilter(filterVal)}
                              className={`${styles.filterPill} ${archiveFilter === filterVal ? styles.activeFilterPill : ''}`}
                            >
                              {filterVal === 'notinterested' ? 'Not Interested' : filterVal.charAt(0).toUpperCase() + filterVal.slice(1)}
                            </button>
                          ))}
                        </div>

                        {/* Leads database table */}
                        <div className={styles.leadsTableWrapper}>
                          <table className={styles.leadsTable}>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Assigned Agent</th>
                                <th>Logged Date</th>
                                <th>Current Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredAdminArchive.map(lead => (
                                <tr key={lead.id}>
                                  <td><strong>{lead.name}</strong></td>
                                  <td>{lead.phone}</td>
                                  <td>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                    </svg>
                                    {lead.agent}
                                  </td>
                                  <td>{lead.date} • {lead.time}</td>
                                  <td>
                                    <span className={`${styles.statusLabelBadge} ${styles[lead.status.toLowerCase().replace(' ', '')]}`}>
                                      {lead.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
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
