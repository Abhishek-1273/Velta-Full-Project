import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import styles from './Product.module.css'

const veltaProducts = [
  {
    id: 'whatsflow',
    badge: 'ACTIVE PRODUCT',
    name: 'WhatsFlow',
    tagline: 'WhatsApp Lead Management Platform',
    desc: 'Capture, qualify, respond to, assign, and convert WhatsApp leads automatically. Includes a unified web admin portal and native employee mobile application workflows.',
    color: '#0284c7',
    features: [
      'Automated lead qualification via AI',
      'Round-robin representative routing',
      'Admin monitoring dashboard',
      'Employee task follow-up ledger',
      'Site-visit appointment scheduler'
    ],
    status: 'active',
    architecture: [
      { 
        num: '01', 
        label: 'Webhook Capture', 
        desc: 'Inbound chat webhooks captured in < 2ms.',
        status: 'Listening',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
        )
      },
      { 
        num: '02', 
        label: 'AI Roster Routing', 
        desc: 'NLP qualifier parses intent & matches agent.',
        status: 'Active',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        )
      },
      { 
        num: '03', 
        label: 'Workspace Sync', 
        desc: 'Real-time pipeline refresh & mobile warnings.',
        status: 'Synced',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
        )
      }
    ]
  },
  {
    id: 'docket14',
    badge: 'ACTIVE PRODUCT',
    name: 'Docket14',
    tagline: 'Legal Practice Management & Tracking',
    desc: 'Centralized case management and task tracking engine for law firms. Enables senior partners to monitor case stages, deadlines, and associate assignments in real time.',
    color: '#1f2937',
    features: [
      'Associate assignment matrices',
      'Case stage transition trackers',
      'Task deadline alerts',
      'Client document lockers',
      'Court date reminders'
    ],
    status: 'active',
    architecture: [
      { 
        num: '01', 
        label: 'Intake & CNR Parsing', 
        desc: 'Auto-fetches legal data from court APIs.',
        status: 'Ready',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
        )
      },
      { 
        num: '02', 
        label: 'Transition Tracker', 
        desc: 'Tracks hearing history & state status transitions.',
        status: 'Active',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>
          </svg>
        )
      },
      { 
        num: '03', 
        label: 'Deadline Sync', 
        desc: 'Triggers client SMS notices & alerts key calendar.',
        status: 'Armed',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        )
      }
    ]
  },
  {
    id: 'realestate',
    badge: 'ACTIVE PRODUCT',
    name: 'Kin Property Management',
    tagline: 'Property Management & Marketplace',
    desc: 'A comprehensive portal designed to buy, sell, rent, and manage properties. Streamlines lead matching, listing verifications, and property management workflows.',
    color: '#b8973b',
    features: [
      'Buy/Sell/Rent listing engines',
      'Property location map widgets',
      'Agent lead-matching algorithms',
      'Tenant agreement storage',
      'Maintenance ticket tracker'
    ],
    status: 'active',
    architecture: [
      { 
        num: '01', 
        label: 'Listing Verification', 
        desc: 'Geo-tagging audit & verified title check.',
        status: 'Verified',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
        )
      },
      { 
        num: '02', 
        label: 'Broker Match System', 
        desc: 'Lead-scoring maps customer requests to agents.',
        status: 'Active',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M16 12l-4-4-4 4M12 16V8"/>
          </svg>
        )
      },
      { 
        num: '03', 
        label: 'Tenant Portal Sync', 
        desc: 'Executes rental agreement logs & support ticks.',
        status: 'Completed',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        )
      }
    ]
  },
  {
    id: 'dating',
    badge: 'UNDER DEVELOPMENT',
    name: 'Me & Mine',
    tagline: 'Location-Based Matchmaking & Chat',
    desc: 'An interactive mobile matchmaking engine featuring secure chats and real-time user discovery widgets. Designed to manage conversational traffic and connections.',
    color: '#ff6b9d',
    features: [
      'Real-time chat channels',
      'Location matchmaking filters',
      'Profile verification protocols',
      'Connection routing filters',
      'Interactive icebreakers'
    ],
    status: 'development',
    architecture: [
      { 
        num: '01', 
        label: 'Compatibility Intake', 
        desc: 'Parses location parameters & personality index.',
        status: 'Ready',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>
          </svg>
        )
      },
      { 
        num: '02', 
        label: 'Vector Score Matching', 
        desc: 'Compatibility algorithms suggest verified profiles.',
        status: 'Active',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        )
      },
      { 
        num: '03', 
        label: 'Secure Chat Sync', 
        desc: 'Syncs dynamic chats and chat icebreakers.',
        status: 'Armed',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )
      }
    ]
  }
]

export default function Product() {
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [waitlistProduct, setWaitlistProduct] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const openWaitlist = (prodName) => {
    setWaitlistProduct(prodName)
    setShowWaitlist(true)
    setIsSubmitted(false)
    setEmail('')
    setName('')
  }

  const handleSubmitWaitlist = (e) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitted(true)
  }

  return (
    <div className={styles.page}>
      
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.bg}>
          <div className={styles.grid} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="tag">Product Catalog</span>
            <h1 className={styles.title}>
              Engineering Software for<br />
              <span className="gradient-text">Real Capabilities</span>
            </h1>
            <p className={styles.sub}>
              VeltaZ builds targeted product systems that eliminate manual chores, coordinate pipeline workflows, and manage client conversions.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS DISPLAY */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.productsList}>
            {veltaProducts.map((p, idx) => (
              <React.Fragment key={p.id}>
                {idx > 0 && <div className={styles.productDivider} />}
                <div className={styles.productCard} data-product-id={p.id}>
                <div className={styles.productInfo}>
                  <span className={`${styles.statusLabel} ${p.status === 'development' ? styles.devBadge : styles.activeBadge}`}>
                    {p.badge}
                  </span>
                  <h2 className={styles.productName}>{p.name}</h2>
                  <span className={styles.productTagline}>{p.tagline}</span>
                  <p className={styles.productDesc}>{p.desc}</p>
                  
                  <div className={styles.featuresGrid}>
                    {p.features.map(f => (
                      <div key={f} className={styles.featureItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {p.id === 'whatsflow' ? (
                    <Link to="/products/whatsflow" className={`btn btn-primary ${styles.whatsflowBtn}`} style={{ marginTop: '24px' }}>
                      Explore WhatsFlow
                    </Link>
                  ) : p.id === 'docket14' ? (
                    <Link to="/products/docket14" className={`btn btn-primary ${styles.docketBtn}`} style={{ marginTop: '24px' }}>
                      Explore Docket14
                    </Link>
                  ) : p.id === 'realestate' ? (
                    <Link to="/products/kin-property" className={`btn btn-primary ${styles.kinBtn}`} style={{ marginTop: '24px' }}>
                      Explore Kin Property
                    </Link>
                  ) : p.status === 'active' ? (
                    <Link to="/contact" className="btn btn-outline" style={{ marginTop: '24px' }}>
                      Request Demo
                    </Link>
                  ) : (
                    <button 
                      onClick={() => {
                        setWaitlistProduct(p.name)
                        setIsSubmitted(false)
                        setEmail('')
                        setName('')
                        setShowWaitlist(true)
                      }} 
                      className={styles.waitlistBtn}
                      style={{ pointerEvents: 'all', position: 'relative', zIndex: 10 }}
                    >
                      <span className={styles.pulseDotPink} />
                      Join Matchmaking Waitlist
                    </button>
                  )}
                </div>

                <div className={styles.productVisual}>
                  <div className={styles.workflowMock}>
                    <div className={styles.workflowHeader}>
                      <span>{p.name} Architecture Node</span>
                    </div>
                    <div className={styles.nodes}>
                      {p.architecture.map((n, idx) => (
                        <div key={n.num} style={{ display: 'contents' }}>
                          <div className={styles.node}>
                            <div 
                              className={styles.nodeIcon} 
                              style={{ color: p.color, background: `${p.color}15`, border: `1.5px solid ${p.color}30` }}
                            >
                              {n.icon}
                            </div>
                            <div className={styles.nodeText}>
                              <span className={styles.nodeLabel}>{n.label}</span>
                              <span className={styles.nodeDesc}>{n.desc}</span>
                            </div>
                            <span className={styles.nodeStatusBadge} style={{ color: p.color, background: `${p.color}12` }}>
                              <span className={styles.statusDot} style={{ background: p.color }} />
                              {n.status}
                            </span>
                          </div>
                          {idx < p.architecture.length - 1 && (
                            <div className={styles.nodeConnector} style={{ background: `linear-gradient(to bottom, ${p.color}bb, rgba(255,255,255,0.02))` }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div className={styles.futureContainer}>
            <span className="tag">Let's Deploy</span>
            <h2>Need a Custom Operational System?</h2>
            <p className={styles.futureSub}>
              VeltaZ builds customized workflow automation and custom applications for businesses looking to scale without hiring operations teams.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Schedule Architecture Audit
            </Link>
          </div>
        </div>
      </section>

      {/* WAITLIST SIGNUP DIALOG OVERLAY — rendered via portal on document.body */}
      {showWaitlist && ReactDOM.createPortal(
        <div className={styles.modalOverlay} onClick={() => setShowWaitlist(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setShowWaitlist(false)}>×</button>
            
            {!isSubmitted ? (
              <>
                <h3>Join {waitlistProduct} Waitlist</h3>
                <p>Get early beta access, private launch invites, and product updates directly in your inbox.</p>
                <form onSubmit={handleSubmitWaitlist} className={styles.waitlistForm}>
                  <div className={styles.formField}>
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Rahul Sharma" 
                      className={styles.formInput}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="rahul@example.com" 
                      className={styles.formInput}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className={styles.btnSubmitWaitlist}>
                    Request Invite
                  </button>
                </form>
              </>
            ) : (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✓</div>
                <h3>You're on the list!</h3>
                <p>We've reserved a spot for <strong>{email}</strong>. We will contact you as soon as private beta slots open up for {waitlistProduct}!</p>
                <button className="btn btn-primary" onClick={() => setShowWaitlist(false)} style={{ width: '100%', marginTop: '16px' }}>
                  Awesome
                </button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

    </div>
  )
}
