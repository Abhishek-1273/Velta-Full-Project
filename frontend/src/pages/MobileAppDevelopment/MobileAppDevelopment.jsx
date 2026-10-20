import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaWhatsapp, 
  FaCheck, 
  FaArrowRight, 
  FaMobileAlt, 
  FaSyncAlt, 
  FaWifi, 
  FaDatabase, 
  FaBell, 
  FaShieldAlt, 
  FaApple, 
  FaAndroid, 
  FaRupeeSign, 
  FaDollarSign,
  FaCheckCircle,
  FaPlus,
  FaMinus,
  FaCode,
  FaRocket,
  FaLayerGroup
} from 'react-icons/fa'
import styles from './MobileAppDevelopment.module.css'

const WHATSAPP_NUMBER = '919960240648'
const WHATSAPP_MSG = encodeURIComponent("Hi VeltaZ, I'm interested in Mobile App Development. I'd like to discuss my cross-platform app requirements.")
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

const faqItems = [
  {
    q: "Do you build for both Android and iOS?",
    a: "Yes. We specialize in cross-platform frameworks (React Native and Flutter) that produce native 60fps applications for both Google Play Store and Apple App Store from a unified codebase, reducing cost and maintenance by 50%."
  },
  {
    q: "How does offline synchronization work?",
    a: "We implement offline-first local data storage with queued operational actions. When a user creates a lead or logs a task without internet, the app caches it locally and automatically synchronizes with your central MongoDB database the moment network connectivity restores."
  },
  {
    q: "Can the mobile app connect to our existing web dashboard or database?",
    a: "Yes. We build clean, secure REST and GraphQL API layers connecting your mobile app directly to your existing database, ERP, CRM, or web administration portals."
  },
  {
    q: "Do you assist with Google Play and Apple App Store publishing?",
    a: "Yes. We handle end-to-end store compliance, bundle generation, screenshot packaging, privacy policy drafting, and review submissions under your own developer accounts."
  },
  {
    q: "What is the typical delivery timeframe for a mobile MVP?",
    a: "A focused cross-platform MVP (such as an internal field agent app or lead-tracking mobile suite) typically takes 3 to 6 weeks from architecture sign-off to test build."
  }
]

export default function MobileAppDevelopment() {
  const [currency, setCurrency] = useState('INR')
  const [activeFaq, setActiveFaq] = useState(null)
  const [activeAppTab, setActiveAppTab] = useState('whatsflow') // 'whatsflow' | 'docket14' | 'memine'

  const displayScrollRef = useRef(null)
  const isDraggingRef = useRef(false)
  const startYRef = useRef(0)
  const scrollTopRef = useRef(0)

  // Reset scroll to top whenever user switches app tab
  useEffect(() => {
    if (displayScrollRef.current) {
      displayScrollRef.current.scrollTop = 0
    }
  }, [activeAppTab])

  // Global mouse handlers for fluid desktop drag-to-scroll
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false
        if (displayScrollRef.current) {
          displayScrollRef.current.style.cursor = 'grab'
        }
      }
    }

    const handleGlobalMouseMove = (e) => {
      if (!isDraggingRef.current || !displayScrollRef.current) return
      e.preventDefault()
      const deltaY = e.clientY - startYRef.current
      displayScrollRef.current.scrollTop = scrollTopRef.current - deltaY
    }

    window.addEventListener('mouseup', handleGlobalMouseUp)
    window.addEventListener('mousemove', handleGlobalMouseMove)
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp)
      window.removeEventListener('mousemove', handleGlobalMouseMove)
    }
  }, [])

  const handleMouseDown = (e) => {
    if (e.button !== 0 || !displayScrollRef.current) return
    isDraggingRef.current = true
    startYRef.current = e.clientY
    scrollTopRef.current = displayScrollRef.current.scrollTop
    displayScrollRef.current.style.cursor = 'grabbing'
  } // 'whatsflow' | 'docket14' | 'memine'

  useEffect(() => {
    document.title = "Cross-Platform Mobile App Development | VeltaZ"
    
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = "description"
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = "VeltaZ engineers dedicated native iOS and Android apps with offline sync, fluid 60fps performance, and custom enterprise backend integrations."

    window.scrollTo(0, 0)
  }, [])

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx)
  }

  const appData = {
    whatsflow: {
      name: "WhatsFlow Mobile App",
      category: "Field Operations & Lead Capture",
      desc: "Instant lead intake, pipeline qualification, and automated WhatsApp messaging hooks built for real-time sales coordination.",
      img: "https://res.cloudinary.com/dqc1awrnc/image/upload/v1792475226/whatsflow_cbybon.jpg",
      tags: ["Real-time CRM", "WhatsApp API", "Role Permissions"],
      link: "/products/whatsflow"
    },
    docket14: {
      name: "Docket14 Legal & Task App",
      category: "Court Scheduling & Case Logging",
      desc: "Designed for high-frequency legal updates, automated hearing reminders, offline case logs, and client notification feeds.",
      img: "https://res.cloudinary.com/dqc1awrnc/image/upload/v1786538519/Screenshot_20260812_180225_Docket_14.jpg_nxm7zh.jpg",
      tags: ["Offline Mode", "Push Alerts", "Encrypted Docs"],
      link: "/products/docket14"
    },
    memine: {
      name: "Me & Mine (Social App Prototype)",
      category: "Interactive Design Prototype",
      desc: "A custom interactive prototype engineered by VeltaZ to demonstrate matchmaking UI/UX flows, geo-location filters, dynamic questionnaires, and real-time chat interface architecture.",
      img: "https://res.cloudinary.com/dqc1awrnc/image/upload/v1786538759/IMG-20260726-WA0025.jpg_1_uq78d1.jpg",
      tags: ["Interactive Prototype", "UI/UX Architecture", "Geo-Discovery Concept", "Chat UI Flow"],
      link: null
    }
  }

  return (
    <div className={styles.pageContainer}>
      
      {/* ── 1. HERO SECTION ── */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                <span>NATIVE & CROSS-PLATFORM APP SUITES</span>
              </div>
              
              <h1 className={styles.heroTitle}>
                High-Performance <br />
                <span className={styles.heroTitleHighlight}>Mobile Applications</span> <br />
                Built for Scale & Field Use.
              </h1>
              
              <p className={styles.heroSubtitle}>
                We build dedicated native client/admin panels and employee management systems optimized to run fluidly on low-end as well as flagship smartphones.
              </p>
              
              <p className={styles.heroNote}>
                From guaranteed offline synchronization to real-time push alerts, we engineer apps that your workforce and customers can rely on even in zero-connectivity zones.
              </p>

              <div className={styles.heroBtnRow}>
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`btn btn-primary ${styles.heroWhatsappBtn}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '13px 26px', fontSize: '15px' }}
                >
                  <FaWhatsapp size={19} />
                  <span>Discuss Your App Project</span>
                </a>
                
                <a 
                  href="#apps-showcase" 
                  className="btn btn-outline"
                  style={{ padding: '13px 22px', fontSize: '14.5px' }}
                >
                  <span>Explore Live Apps</span>
                  <FaArrowRight size={13} style={{ marginLeft: 6 }} />
                </a>
              </div>

              <div className={styles.platformBadges}>
                <div className={styles.platformItem}><FaApple size={18} /><span>iOS 16+</span></div>
                <div className={styles.platformItem}><FaAndroid size={18} /><span>Android 9+</span></div>
                <div className={styles.platformItem}><FaSyncAlt size={16} /><span>Offline-First Sync</span></div>
                <div className={styles.platformItem}><FaRocket size={16} /><span>60 FPS Fluidity</span></div>
              </div>
            </div>

            {/* S24 Ultra Multi-Phone Mockup */}
            <div className={styles.heroRight}>
              <div className={styles.phoneStack}>
                <div className={`${styles.mockupPhone} ${styles.phoneLeft}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786538519/Screenshot_20260812_180225_Docket_14.jpg_nxm7zh.jpg" alt="Docket14 Mobile App" />
                </div>
                <div className={`${styles.mockupPhone} ${styles.phoneCenter}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792475226/whatsflow_cbybon.jpg" alt="WhatsFlow Mobile App" />
                </div>
                <div className={`${styles.mockupPhone} ${styles.phoneRight}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786538759/IMG-20260726-WA0025.jpg_1_uq78d1.jpg" alt="Me & Mine Social App" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ENGINEERING HIGHLIGHTS ── */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Mobile Architecture</span>
            <h2>Engineered for Harsh Real-World Conditions</h2>
            <p>
              A mobile app should never crash or freeze when network reception drops. We architect apps with resilience at the core.
            </p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}><FaWifi size={20} /></div>
              <h3>Guaranteed Offline Sync</h3>
              <p>Smart local caching queues actions and seamlessly synchronizes with your MongoDB cloud database once connectivity resumes.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconCircle}><FaMobileAlt size={20} /></div>
              <h3>Budget Smartphone Optimization</h3>
              <p>Minimized memory footprints and GPU-accelerated list rendering ensure 60fps scrolling on budget Android handsets.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconCircle}><FaBell size={20} /></div>
              <h3>Intelligent Push Notifications</h3>
              <p>Targeted APNs and Firebase Cloud Messaging hooks for automated lead alerts, status updates, and task triggers.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconCircle}><FaShieldAlt size={20} /></div>
              <h3>Role-Based Security</h3>
              <p>JWT token authentication, biometric login (FaceID/Fingerprint), and encrypted local storage protect corporate data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SHOWCASE TABS ── */}
      <section id="apps-showcase" className={styles.showcaseSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Production Builds</span>
            <h2>Proven Mobile Implementations</h2>
            <p>Explore production mobile apps engineered for operational workflows, real-time communication, and compliance.</p>
          </div>

          <div className={styles.showcaseTabsRow}>
            <button 
              type="button" 
              onClick={() => setActiveAppTab('whatsflow')}
              className={`${styles.appTabBtn} ${activeAppTab === 'whatsflow' ? styles.appTabBtnActive : ''}`}
            >
              WhatsFlow CRM App
            </button>
            <button 
              type="button" 
              onClick={() => setActiveAppTab('docket14')}
              className={`${styles.appTabBtn} ${activeAppTab === 'docket14' ? styles.appTabBtnActive : ''}`}
            >
              Docket14 Legal App
            </button>
            <button 
              type="button" 
              onClick={() => setActiveAppTab('memine')}
              className={`${styles.appTabBtn} ${activeAppTab === 'memine' ? styles.appTabBtnActive : ''}`}
            >
              Me & Mine Social App
            </button>
          </div>

          <div className={styles.showcaseDetailBox}>
            <div className={styles.detailGrid}>
              <div className={styles.detailLeft}>
                <span className="tag" style={{ marginBottom: 12 }}>{appData[activeAppTab].category}</span>
                <h3>{appData[activeAppTab].name}</h3>
                <p className={styles.detailDesc}>{appData[activeAppTab].desc}</p>
                
                <div className={styles.tagPillRow}>
                  {appData[activeAppTab].tags.map((t, idx) => (
                    <span key={idx} className={styles.tagPill}>✓ {t}</span>
                  ))}
                </div>

                <div style={{ marginTop: '24px' }}>
                  {appData[activeAppTab].link ? (
                    <Link to={appData[activeAppTab].link} className="btn btn-outline" style={{ padding: '10px 22px', fontSize: '13.5px' }}>
                      <span>View Live Product Suite</span>
                      <FaArrowRight size={12} style={{ marginLeft: 6 }} />
                    </Link>
                  ) : (
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '10px 22px', fontSize: '13.5px' }}>
                      <span>Request Prototype Walkthrough</span>
                    </a>
                  )}
                </div>
              </div>

              <div className={styles.detailRight}>
                {/* AUTHENTIC SAMSUNG GALAXY S25 ULTRA MOCKUP (WITH VERTICAL SCROLL) */}
                <div className={styles.s25UltraMockupBox}>
                  <div className={styles.s25TitaniumFrame}>
                    {/* Top Micro Speaker Slit */}
                    <div className={styles.s25Speaker} />
                    
                    {/* Fixed Hardware Punch-Hole & Gesture Home Bar overlay */}
                    <div className={styles.s25HardwareOverlay}>
                      <div className={styles.s25PunchHole} />
                      <div className={styles.s25HomeBar} />
                    </div>

                    {/* S25 Edge-to-Edge Smooth Scrollable Display Screen */}
                    <div 
                      className={styles.s25Display}
                      ref={displayScrollRef}
                      onMouseDown={handleMouseDown}
                    >
                      {/* Full-Length App Screenshot */}
                      <img 
                        src={appData[activeAppTab].img} 
                        alt={appData[activeAppTab].name} 
                        className={styles.s25ScreenImg}
                        draggable="false"
                      />
                    </div>
                  </div>

                  {/* Interactive Scroll Hint Badge */}
                  <div className={styles.s25ScrollHint}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="7 9 12 4 17 9"></polyline>
                      <polyline points="7 15 12 20 17 15"></polyline>
                    </svg>
                    <span>Scroll</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PRICING & SCOPE ── */}
      <section className={styles.pricingSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">App Development Scope</span>
            <h2>Transparent Cross-Platform Pricing</h2>
            <p>From initial design proto to App Store submission, we build with clear scope and zero hidden bloat.</p>


          </div>

          <div className={styles.pricingCardsGrid}>
            {/* MVP Tier */}
            <div className={styles.priceCard}>
              <span className="tag">Rapid Launch</span>
              <h3>Cross-Platform MVP</h3>
              <p>Ideal for startups, internal field logs, or validating an app concept with real users.</p>
              
              <div className={styles.priceValue}>
                ₹24,999
                <span>/ project</span>
              </div>

              <ul className={styles.cardFeatures}>
                <li><FaCheck color="#10b981" /> Unified codebase (iOS & Android)</li>
                <li><FaCheck color="#10b981" /> Up to 5 core functional screens</li>
                <li><FaCheck color="#10b981" /> User authentication (OTP / Email)</li>
                <li><FaCheck color="#10b981" /> REST API backend integration</li>
                <li><FaCheck color="#10b981" /> Push notifications setup</li>
                <li><FaCheck color="#10b981" /> APK & TestFlight build delivery</li>
              </ul>

              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline" 
                style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}
              >
                Discuss MVP Scope
              </a>
            </div>

            {/* Custom Enterprise Tier */}
            <div className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
              <div className={styles.featuredTag}>Full Operational Suite</div>
              <span className="tag">Custom Scaled</span>
              <h3>Enterprise Mobile Solution</h3>
              <p>Complete multi-role mobile suite with real-time sync, offline databases, and custom backend API.</p>
              
              <div className={styles.priceValue}>
                From ₹49,999
                <span>/ project</span>
              </div>

              <ul className={styles.cardFeatures}>
                <li><FaCheck color="#10b981" /> Complete custom UI/UX design system</li>
                <li><FaCheck color="#10b981" /> Offline-first data caching & MongoDB cloud sync</li>
                <li><FaCheck color="#10b981" /> Role-based permissions & admin sync</li>
                <li><FaCheck color="#10b981" /> WebSockets / Real-time messaging</li>
                <li><FaCheck color="#10b981" /> Google Play & App Store publishing support</li>
                <li><FaCheck color="#10b981" /> 30 days post-launch technical warranty</li>
              </ul>

              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}
              >
                Get Custom Estimate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Clarity</span>
            <h2>Mobile App Development FAQs</h2>
            <p>Direct answers regarding platforms, performance, timelines, and store approvals.</p>
          </div>

          <div className={styles.faqList}>
            {faqItems.map((item, idx) => (
              <div 
                key={idx} 
                className={`${styles.faqItem} ${activeFaq === idx ? styles.faqActive : ''}`}
              >
                <button 
                  type="button" 
                  onClick={() => toggleFaq(idx)} 
                  className={styles.faqQuestion}
                >
                  <span>{item.q}</span>
                  <span className={styles.faqIcon}>
                    {activeFaq === idx ? <FaMinus size={13} /> : <FaPlus size={13} />}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className={styles.faqAnswer}>
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA ── */}
      <section className={styles.finalCtaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <span className="tag" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
              Let's Build
            </span>
            <h2>Ready to Deploy Your Mobile Application?</h2>
            <p>
              Share your concept, workflow requirements, or target release timeline. We'll outline a clean technical architecture and deliver a fixed-scope milestone proposal.
            </p>

            <div style={{ marginTop: '24px' }}>
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 34px', fontSize: '16px', fontWeight: 700 }}
              >
                <FaWhatsapp size={20} />
                <span>Discuss Your Mobile App</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
