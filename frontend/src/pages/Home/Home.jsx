import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import PhoneMockupBasic from '../../components/ui/phone-mockups-1'

// Factual Business Claims
const stats = [
  { value: '3+', label: 'Flagship Products Deployed' },
  { value: '3x', label: 'Lead Conversion Lift' },
  { value: '5x', label: 'Faster Response Time' },
  { value: '100%', label: 'Bespoke Tailored Systems' },
]

// Business Challenges & Solutions
const businessSolutions = [
  { 
    num: '01', 
    problem: 'Time-Consuming Lead Chores', 
    solution: 'Tailored CRM Routing', 
    desc: 'Unburden your chat operations. Deploy secure lead qualifiers, round-robin representative routing, and instant automated chat flows (like WhatsFlow).' 
  },
  { 
    num: '02', 
    problem: 'Legal Practice Disarray', 
    solution: 'Centralized Case Dashboards', 
    desc: 'Unify hearing history logs, court case status transitions, associate tasks, and document lockers in a singular secure workspace (like Docket14).' 
  },
  { 
    num: '03', 
    problem: 'Scattered Property Management', 
    solution: 'Automated Listing Portals', 
    desc: 'Buy, sell, rent, and manage listing verifications with location mapping, tenant agreement storage, and agent matching algorithms (like Kin Property).' 
  },
  { 
    num: '04', 
    problem: 'Rigid Off-the-Shelf SaaS', 
    solution: 'Custom Enterprise Software', 
    desc: 'Get private proprietary software engineered specifically around your workflows, fully owned by you with zero license subscription fees.' 
  },
]

// Why VeltaZ Pillars
const whyPillars = [
  { title: 'Bespoke & Private', desc: 'Keep your business operations secure. Our custom software is fully owned by you, built for your internal teams, with isolated hosting.' },
  { title: 'Custom Built', desc: 'We design software specifically around your operations. No force-fitting your workflow into static legacy templates.' },
  { title: 'Scalable Architecture', desc: 'Built for enterprise reliability. Handles everything from ten conversations to tens of thousands of requests daily.' },
  { title: 'Optimized Economics', desc: 'Enterprise-grade automation engineered with efficiency in mind. Premium technology at a sustainable cost structure.' },
]

const flagshipProducts = [
  {
    tag: 'Custom CRM Suite',
    title: 'WhatsFlow',
    sub: 'Private WhatsApp CRM System',
    desc: 'WhatsFlow is a custom private CRM and team routing platform, built to securely manage customer chats, qualify inquiries, and distribute tasks automatically.',
    bullets: ['Lead Capture', 'AI Autoreplies', 'Round-robin Routing', 'Bulk Campaigns', 'Chat Analytics', 'Booking System'],
    btnText: 'Explore WhatsFlow',
    btnLink: '/products/whatsflow',
    mockTitle: 'whatsflow-admin-portal',
    stats: [
      { val: '142', label: 'Leads Today' },
      { val: '74.2%', label: 'Conversion Index' }
    ],
    tableHeader: ['Name', 'Source', 'Status'],
    tableRows: [
      { c1: 'Rahul Sharma', c2: 'Meta WhatsApp Ad', c3: 'Booked' },
      { c1: 'Priya Patel', c2: 'Direct Chat Link', c3: 'Interested' },
      { c1: 'Amit Kumar', c2: 'Instagram Inbound', c3: 'Converted' }
    ]
  },
  {
    tag: 'Private Legal CRM',
    title: 'Docket14',
    sub: 'Legal Case & Team Practice Management',
    desc: 'Docket14 simplifies case tracking, task assignments, hearing schedules, and client communications for modern law firms.',
    bullets: ['Case File Tracking', 'Task Delegation', 'Hearing Reminders', 'Automated Client SMS', 'Time Billing', 'Document Vault'],
    btnText: 'Explore Docket14',
    btnLink: '/products/docket14',
    mockTitle: 'docket14-firm-dashboard',
    stats: [
      { val: '38', label: 'Active Cases' },
      { val: '4', label: 'Hearings This Week' }
    ],
    tableHeader: ['Case Title', 'Assigned To', 'Next Hearing'],
    tableRows: [
      { c1: 'State vs. Sharma', c2: 'Adv. Dhruv', c3: '14-Aug-2026' },
      { c1: 'Verma Properties', c2: 'Adv. Rohan', c3: '18-Aug-2026' },
      { c1: 'Mehra Trust Appeal', c2: 'Adv. Dhruv', c3: '22-Aug-2026' }
    ]
  },
  {
    tag: 'Real Estate Platform',
    title: 'Kin Property',
    sub: 'Modern Real Estate Listing & Agent CRM',
    desc: 'Kin Property helps real estate agencies list properties, coordinate virtual tours, verify buyers, and match clients to listings.',
    bullets: ['Dynamic Map Filters', 'Virtual Video Tours', 'Agent Matching', 'Document Vault', 'Lead Follow-ups', 'Broker Analytics'],
    btnText: 'Explore Kin Property',
    btnLink: '/products/kin-property',
    mockTitle: 'kin-property-portal',
    stats: [
      { val: '84', label: 'Properties Listed' },
      { val: '12', label: 'Site Visits Today' }
    ],
    tableHeader: ['Property Name', 'Location', 'Status'],
    tableRows: [
      { c1: '3 BHK Apartment', c2: 'Gurugram, Sec 45', c3: 'Available' },
      { c1: 'Luxury Villa', c2: 'Noida, Sector 15', c3: 'Under Tour' },
      { c1: 'Commercial Space', c2: 'Delhi, CP', c3: 'Booked' }
    ]
  },
  {
    tag: 'Dating & Social App',
    title: 'Me & Mine',
    sub: 'Compatibility-Based Matchmaking',
    desc: 'Me & Mine connects people through smart matchmaking, context-aware icebreakers, and verified user profiles.',
    bullets: ['Compatibility Score', 'Secure Private Chat', 'Profile Verification', 'Icebreaker Prompts', 'Event Listings', 'Smart Filters'],
    btnText: 'Explore Products',
    btnLink: '/products',
    mockTitle: 'me-and-mine-user-metrics',
    stats: [
      { val: '1,240', label: 'Daily Swipes' },
      { val: '94%', label: 'Match Ratio' }
    ],
    tableHeader: ['Match Profile', 'Compatibility', 'Chat Status'],
    tableRows: [
      { c1: 'Priya, 26', c2: '92% Score', c3: 'Active Chat' },
      { c1: 'Rohan, 28', c2: '88% Score', c3: 'Icebreaker' },
      { c1: 'Karan, 27', c2: '95% Score', c3: 'Matched' }
    ]
  }
]

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const currentProduct = flagshipProducts[activeTab]
  return (
    <div className={styles.page}>
      
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.gridOverlay} />
          <div className={styles.ambientGlow1} />
          <div className={styles.ambientGlow2} />
        </div>
        <div className="container">
          <div className={styles.heroLayout}>
            <div className={styles.heroLeft}>
              <span className="tag">Custom Software Development</span>
              <h1 className={styles.heroTitle}>
                Custom Apps & Software
              </h1>
              <p className={styles.heroTagline}>
                Systems by VeltaZ. Success by default.
              </p>
              <p className={styles.heroSub}>
                We build custom CRMs, client databases, and automated workflows designed around your unique team operations. No rigid templates, no limits.
              </p>
              
              <div className={styles.heroCta}>
                <Link to="/products" className="btn btn-primary">
                  Explore Products
                </Link>
                <Link to="/products/whatsflow" className="btn btn-outline">
                  See WhatsFlow
                </Link>
              </div>
            </div>

            {/* Interactive Phone Showcase Mockup */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PhoneMockupBasic />
            </div>
          </div>
        </div>
      </section>

      {/* METRICS / TRUST SECTION */}
      <section className={styles.metrics}>
        <div className="container">
          <div className={styles.metricsGrid}>
            {stats.map(s => (
              <div key={s.label} className={styles.metricCard}>
                <span className={styles.metricVal}>{s.value}</span>
                <span className={styles.metricLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SUITE SECTION */}
      <section className={styles.suiteSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Our Products</span>
            <h2>One Company. Multiple Powerful Products.</h2>
            <p>From lead management to legal tracking, real estate to matchmaking — VeltaZ builds software that actually works.</p>
          </div>
          <div className={styles.suiteGrid}>
            {[
              {
                name: 'WhatsFlow',
                tag: 'Lead Management',
                desc: 'Automate WhatsApp leads, qualify prospects, and convert faster with AI-powered CRM.',
                color: '#10b981',
                link: '/products/whatsflow',
                status: 'Live',
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    <path d="M8 10h.01M12 10h.01M16 10h.01"/>
                  </svg>
                )
              },
              {
                name: 'Docket14',
                tag: 'Legal Practice',
                desc: 'Track cases, manage tasks, and streamline your legal team — all in one dashboard.',
                color: '#4F8EF7',
                link: '/products/docket14',
                status: 'Live',
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                )
              },
              {
                name: 'Kin Property',
                tag: 'Real Estate',
                desc: 'Buy, sell, rent, and manage properties with a modern platform built for agents and clients.',
                color: '#F5A623',
                link: '/products/kin-property',
                status: 'Live',
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                )
              },
              {
                name: 'Me & Mine',
                tag: 'Dating & Social',
                desc: 'Discover meaningful connections through smart matching and seamless conversations.',
                color: '#FF6B9D',
                link: '/products',
                status: 'Coming Soon',
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                )
              },
            ].map(p => (
              <Link to={p.link} key={p.name} className={styles.suiteCard}>
                <div className={styles.suiteIconWrap} style={{ background: `${p.color}15`, border: `1.5px solid ${p.color}35`, color: p.color }}>
                  {p.svg}
                </div>
                <div className={styles.suiteBody}>
                  <div className={styles.suiteTop}>
                    <span className={styles.suiteName}>{p.name}</span>
                    <span className={styles.suiteStatus} style={{
                      color: p.status === 'Live' ? '#22c55e' : '#f59e0b',
                      background: p.status === 'Live' ? '#22c55e15' : '#f59e0b15'
                    }}>{p.status}</span>
                  </div>
                  <span className={styles.suiteTag}>{p.tag}</span>
                  <p className={styles.suiteDesc}>{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* WHAT VELTA DOES (Core Problems & Solutions Section) */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Problem vs. Solution</span>
            <h2>We Build Software to Solve Your Core Business Challenges.</h2>
            <p>Don't force-fit your workflows into generic templates. VeltaZ solves operational bottlenecks with custom software architecture.</p>
          </div>

          <div className={styles.processDiagram}>
            {businessSolutions.map((p) => (
              <div key={p.num} className={styles.processCard}>
                <div className={styles.processHeader}>
                  <span className={styles.processNum}>{p.num}</span>
                </div>
                <div className={styles.problemTag}>Problem: {p.problem}</div>
                <h3>VeltaZ Solution: {p.solution}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE PRODUCT SHIFT SWITCHER */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className={styles.productSplit}>
            <div className={styles.productLeft}>
              <span className="tag">{currentProduct.tag}</span>
              <h2>{currentProduct.title}</h2>
              <span className={styles.productSub}>{currentProduct.sub}</span>
              <p>{currentProduct.desc}</p>
              <ul className={styles.featureBullets}>
                {currentProduct.bullets.map(f => (
                  <li key={f}>
                    <svg className={styles.bulletCheck} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to={currentProduct.btnLink} className="btn btn-primary" style={{ marginTop: '24px' }}>
                {currentProduct.btnText}
              </Link>
            </div>
            
            <div className={styles.productRight}>
              {/* Fictional Dashboard Preview */}
              <div className={styles.dashboardMock}>
                <div className={styles.mockHeader}>
                  <div className={styles.mockCircles}>
                    <span className={styles.circleRed} />
                    <span className={styles.circleYellow} />
                    <span className={styles.circleGreen} />
                  </div>
                  <span className={styles.mockTitle}>{currentProduct.mockTitle}</span>
                </div>
                <div className={styles.mockStats}>
                  {currentProduct.stats.map(s => (
                    <div key={s.label} className={styles.mockStatCard}>
                      <span className={styles.mockStatVal}>{s.val}</span>
                      <span className={styles.mockStatLabel}>{s.label}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.mockTable}>
                  <div className={styles.tableHeader}>
                    {currentProduct.tableHeader.map(h => (
                      <span key={h}>{h}</span>
                    ))}
                  </div>
                  {currentProduct.tableRows.map((r, rIdx) => (
                    <div key={rIdx} className={styles.tableRow}>
                      <span className={styles.tableName}>{r.c1}</span>
                      <span className={styles.tableSource}>{r.c2}</span>
                      <span className={styles.tableStatus}>{r.c3}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Selector at the Bottom */}
          <div className={styles.productTabs}>
            {flagshipProducts.map((p, idx) => (
              <button
                key={p.title}
                className={`${styles.tabBtn} ${activeTab === idx ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* WHY VELTA */}
      <section className="section">
        <div className="container">
          <div className={styles.whyWrapper}>
            <div className={styles.whyLeft}>
              <span className="tag">Value Proposition</span>
              <h2>Why Businesses Choose VeltaZ</h2>
              <p className={styles.whyHeroText}>
                Enterprise-style automation without enterprise complexity.
              </p>
            </div>
            <div className={styles.whyRight}>
              <div className={styles.whyGrid}>
                {whyPillars.map(p => (
                  <div key={p.title} className={styles.whyCard}>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Let's Build Something Smarter.</h2>
            <p>Deploy scalable automation. Remove operational friction. Focus on growth.</p>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '14px 32px' }}>
              Talk to VeltaZ
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
