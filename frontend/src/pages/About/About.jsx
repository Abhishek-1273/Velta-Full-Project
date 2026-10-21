import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaCheck,
  FaExternalLinkAlt,
  FaWhatsapp,
  FaCompass,
  FaLaptopCode,
  FaChartLine,
  FaCogs,
  FaShieldAlt,
  FaPlay,
  FaPause,
  FaMapMarkerAlt,
  FaGlobe,
  FaDatabase,
  FaLayerGroup,
  FaPenNib,
  FaSearch,
  FaBolt,
  FaRocket,
  FaBuilding,
  FaBriefcase
} from 'react-icons/fa'
import { CircularTeam } from '../../components/CircularTeam/CircularTeam'
import styles from './About.module.css'

const WHATSAPP_NUMBER = '919960240648'
const WHATSAPP_MSG = encodeURIComponent("Hi VeltaZ, I'd like to discuss my business and explore practical digital solutions.")
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

const teamMembers = [
  {
    name: 'Dhruv',
    designation: 'Co-Founder & CEO',
    quote: 'VeltaZ was born to make operations seamless. I lead our business growth, marketing, and client communications, ensuring that the custom software ecosystems we build align perfectly with our clients\' real-world scaling goals.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786874509/Dhruv_wcdpti.png'
  },
  {
    name: 'Arman',
    designation: 'Co-Founder & CTO',
    quote: 'We architect bulletproof technology. My focus is engineering ultra-secure backend infrastructures, custom APIs, and high-performance databases that handle heavy operational loads silently and reliably.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786874508/Arman_b46q6r.png'
  },
  {
    name: 'Abhishek',
    designation: 'Co-Founder & CPO',
    quote: 'I am obsessed with product perfection. From high-fidelity user flows to custom product design, I bridge backend functionality with premium UX, ensuring every system we build looks stunning and works flawlessly.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786874508/Abhishek_rpscb3.png'
  }
]

export default function About() {
  const kinVideoRef = useRef(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [kinTab, setKinTab] = useState('portal') // 'portal' | 'crm'
  const [activeConsoleTab, setActiveConsoleTab] = useState('web') // 'web' | 'auto' | 'seo'

  useEffect(() => {
    document.title = "About VeltaZ | Business Growth & Digital Systems"

    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = "description"
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = "Learn about VeltaZ, a business growth and digital systems partner combining strategy, digital development, creative execution and automation to solve practical business problems."

    window.scrollTo(0, 0)
  }, [])

  const toggleVideo = () => {
    if (kinVideoRef.current) {
      if (isVideoPlaying) {
        kinVideoRef.current.pause()
        setIsVideoPlaying(false)
      } else {
        kinVideoRef.current.play().catch(() => {})
        setIsVideoPlaying(true)
      }
    }
  }

  const handleTabSwitch = (tab) => {
    setKinTab(tab)
    setIsVideoPlaying(true)
    if (kinVideoRef.current) {
      kinVideoRef.current.load()
      kinVideoRef.current.play().catch(() => {})
    }
  }

  const scrollToSection = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={styles.page}>

      {/* ── 1. HERO SECTION ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.gridOverlay} />
          <div className={styles.ambientGlow} />
        </div>
        
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.badgeRow}>
                <span className="tag">ABOUT VELTAZ</span>
              </div>

              <h1 className={styles.heroTitle}>
                We Build the Systems Behind <span className={styles.titleGradient}>Business Growth.</span>
              </h1>

              <p className={styles.heroLead}>
                VeltaZ unites business thinking, digital experiences, creative execution, and custom automation to help modern companies scale with clarity.
              </p>

              {/* Quick Value Points */}
              <div className={styles.heroHighlights}>
                <div className={styles.highlightChip}>
                  <FaCompass className={styles.chipIcon} />
                  <span>Problem-First Strategy</span>
                </div>
                <div className={styles.highlightChip}>
                  <FaLaptopCode className={styles.chipIcon} />
                  <span>Proprietary Tech</span>
                </div>
                <div className={styles.highlightChip}>
                  <FaBolt className={styles.chipIcon} />
                  <span>Frictionless Automation</span>
                </div>
                <div className={`${styles.highlightChip} ${styles.mobileOnlyChip}`}>
                  <FaChartLine className={styles.chipIcon} />
                  <span>Measurable Growth</span>
                </div>
              </div>

              <div className={styles.heroCtas}>
                <a
                  href="#case-study"
                  onClick={(e) => scrollToSection(e, 'case-study')}
                  className="btn btn-primary"
                >
                  <span>Explore Flagship Work</span>
                  <FaArrowRight size={12} />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FaWhatsapp size={14} style={{ color: '#25D366' }} />
                  <span>Discuss Your Business</span>
                </a>
              </div>
            </div>

            {/* Interactive Live Architecture Console */}
            <div className={styles.heroVisual}>
              <div className={styles.consoleCard}>
                <div className={styles.consoleHeader}>
                  <div className={styles.consoleDots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                  </div>
                  <div className={styles.consoleStatusBadge}>
                    <span className={styles.consolePulseDot} />
                    <span>Live Systems Console</span>
                  </div>
                </div>

                {/* Console Navigation Switcher */}
                <div className={styles.consoleNav}>
                  <button
                    onClick={() => setActiveConsoleTab('web')}
                    className={`${styles.consoleTabBtn} ${activeConsoleTab === 'web' ? styles.consoleTabBtnActive : ''}`}
                  >
                    <FaLaptopCode size={12} />
                    <span>Web Engine</span>
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab('auto')}
                    className={`${styles.consoleTabBtn} ${activeConsoleTab === 'auto' ? styles.consoleTabBtnActive : ''}`}
                  >
                    <FaWhatsapp size={12} />
                    <span>WhatsFlow AI</span>
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab('seo')}
                    className={`${styles.consoleTabBtn} ${activeConsoleTab === 'seo' ? styles.consoleTabBtnActive : ''}`}
                  >
                    <FaSearch size={11} />
                    <span>Search Engine</span>
                  </button>
                </div>

                {/* Console Screen View */}
                <div className={styles.consoleScreen}>
                  {activeConsoleTab === 'web' && (
                    <div className={styles.consoleViewPane}>
                      <div className={styles.codeSnippetBar}>
                        <span className={styles.codeMethod}>GET</span>
                        <span className={styles.codeRoute}>/api/v1/properties/search</span>
                        <span className={styles.codeStatus}>200 OK (18ms)</span>
                      </div>

                      <div className={styles.metricsBoxRow}>
                        <div className={styles.metricMiniBox}>
                          <span className={styles.metricMiniLabel}>Core Web Vitals</span>
                          <strong className={styles.metricMiniVal}>99 / 100</strong>
                        </div>
                        <div className={styles.metricMiniBox}>
                          <span className={styles.metricMiniLabel}>Architecture</span>
                          <strong className={styles.metricMiniVal}>Custom React</strong>
                        </div>
                        <div className={styles.metricMiniBox}>
                          <span className={styles.metricMiniLabel}>Deployment</span>
                          <strong className={styles.metricMiniVal}>Edge Cloud</strong>
                        </div>
                      </div>

                      <div className={styles.consoleStackChips}>
                        <span>Zero Template Bloat</span>
                        <span>Responsive UX</span>
                        <span>API-First</span>
                      </div>
                    </div>
                  )}

                  {activeConsoleTab === 'auto' && (
                    <div className={styles.consoleViewPane}>
                      <div className={styles.flowTraceBox}>
                        <div className={styles.traceStep}>
                          <span className={styles.traceNum}>01</span>
                          <span>Inbound Lead Captured on Website Form</span>
                        </div>
                        <div className={styles.traceArrow}>↓ 0.2s</div>
                        <div className={styles.traceStep}>
                          <span className={styles.traceNum}>02</span>
                          <span>Intent Tagged: High Budget Pune Real Estate</span>
                        </div>
                        <div className={styles.traceArrow}>↓ 0.2s</div>
                        <div className={styles.traceStep}>
                          <span className={styles.traceNum}>03</span>
                          <span>Routed to Agent WhatsApp & Synced with CRM</span>
                        </div>
                      </div>

                      <div className={styles.consoleStackChips}>
                        <span>Zero Manual Entry</span>
                        <span>Instant Follow-ups</span>
                        <span>n8n Routing</span>
                      </div>
                    </div>
                  )}

                  {activeConsoleTab === 'seo' && (
                    <div className={styles.consoleViewPane}>
                      <div className={styles.serpMockCard}>
                        <div className={styles.serpHeader}>
                          <span className={styles.serpUrl}>https://kinpropertymanagement.com</span>
                          <span className={styles.serpBadge}>Google Search #1</span>
                        </div>
                        <h4 className={styles.serpTitle}>Luxury Property Management in Pune | KIN</h4>
                        <p className={styles.serpSnippet}>
                          Verified listings, leasing agreements, and tenant onboarding in prime Pune neighborhoods.
                        </p>
                      </div>

                      <div className={styles.metricsBoxRow}>
                        <div className={styles.metricMiniBox}>
                          <span className={styles.metricMiniLabel}>Google Profile</span>
                          <strong className={styles.metricMiniVal}>Verified 5.0 ★</strong>
                        </div>
                        <div className={styles.metricMiniBox}>
                          <span className={styles.metricMiniLabel}>Search Intent</span>
                          <strong className={styles.metricMiniVal}>Commercial</strong>
                        </div>
                        <div className={styles.metricMiniBox}>
                          <span className={styles.metricMiniLabel}>Local Rank</span>
                          <strong className={styles.metricMiniVal}>Top 1% Pune</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.consoleFooter}>
                  <span>Architecture: Built with Purpose</span>
                  <span className={styles.consoleUptime}>● 99.9% Monitored Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHY WE EXIST: BENTO ECOSYSTEM ── */}
      <section className={styles.whySection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <span className="tag">WHY WE EXIST</span>
            <h2 className={styles.sectionTitle}>
              Business Growth Is More Than a Single Deliverable.
            </h2>
            <p className={styles.sectionSub}>
              A website alone isn’t enough. Neither is isolated marketing or disconnected software. 
              Real momentum happens when every piece of your digital footprint connects seamlessly.
            </p>
          </div>

          {/* Symmetrical 2x2 Ecosystem Grid */}
          <div className={styles.ecosystemGrid}>
            {/* Card 1 */}
            <div className={styles.ecoCard}>
              <div className={styles.ecoTop}>
                <span className={styles.ecoPill}>The Digital Front</span>
                <span className={styles.ecoNumber}>01</span>
              </div>
              <h3>Web & Brand Architecture</h3>
              <p>
                We engineer fast, responsive web platforms and brand identities designed to convert visitors into inquiries.
              </p>
              <div className={styles.ecoChipsRow}>
                <span>Custom React Code</span>
                <span>Responsive UI</span>
                <span>High Speed</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className={styles.ecoCard}>
              <div className={styles.ecoTop}>
                <span className={styles.ecoPill}>Market Discovery</span>
                <span className={styles.ecoNumber}>02</span>
              </div>
              <h3>Market Search & Content</h3>
              <p>
                We structure targeted Google SEO, Business Profiles, and editorial content so high-intent customers discover you first.
              </p>
              <div className={styles.ecoChipsRow}>
                <span>Google 1st Page</span>
                <span>GBP Management</span>
                <span>Content Strategy</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className={styles.ecoCard}>
              <div className={styles.ecoTop}>
                <span className={styles.ecoPill}>Connected Software</span>
                <span className={styles.ecoNumber}>03</span>
              </div>
              <h3>Custom Business Software</h3>
              <p>
                We build private portals, internal staff dashboards, and operational software that organize your daily business data.
              </p>
              <div className={styles.ecoChipsRow}>
                <span>Client Portals</span>
                <span>Agency CRMs</span>
                <span>Case Dockets</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className={styles.ecoCard}>
              <div className={styles.ecoTop}>
                <span className={styles.ecoPill}>The Multiplier</span>
                <span className={styles.ecoNumber}>04</span>
              </div>
              <h3>Intelligent Automation</h3>
              <p>
                We automate lead capture, route inquiries instantly on WhatsApp, and eliminate repetitive manual data entry.
              </p>
              <div className={styles.ecoChipsRow}>
                <span>WhatsApp Routing</span>
                <span>n8n Webhooks</span>
                <span>Zero Drop-off</span>
              </div>
            </div>
          </div>

          {/* Central Highlight Banner */}
          <div className={styles.philosophyBanner}>
            <div className={styles.bannerIcon}><FaShieldAlt size={20} /></div>
            <div className={styles.bannerText}>
              <h4>The VeltaZ Principle</h4>
              <p>
                We never force a predetermined template or sell unneeded services. We diagnose your bottleneck first and build only what delivers genuine, measurable value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HOW WE THINK ── */}
      <section className={styles.philosophySection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <span className="tag">OUR PHILOSOPHY</span>
            <h2 className={styles.sectionTitle}>Understand First. Build with Purpose.</h2>
            <p className={styles.sectionSub}>Four clear rules that govern how we design, code, and deliver.</p>
          </div>

          <div className={styles.thinkingGrid}>
            <div className={styles.thinkingCard}>
              <div className={styles.thinkingHead}>
                <span className={styles.thinkingNum}>01</span>
                <div className={styles.thinkingLine} />
              </div>
              <h4>Understand the Business</h4>
              <p>
                We study your problem, unit economics, and customers first. Deep research helps us ask the right questions before proposing any technology.
              </p>
            </div>

            <div className={styles.thinkingCard}>
              <div className={styles.thinkingHead}>
                <span className={styles.thinkingNum}>02</span>
                <div className={styles.thinkingLine} />
              </div>
              <h4>Build What Is Needed</h4>
              <p>
                Every business is distinct. We craft the exact web application, operational dashboard, or campaign required—with zero feature bloat.
              </p>
            </div>

            <div className={styles.thinkingCard}>
              <div className={styles.thinkingHead}>
                <span className={styles.thinkingNum}>03</span>
                <div className={styles.thinkingLine} />
              </div>
              <h4>Connect the Pieces</h4>
              <p>
                A digital experience must fit your real-world workflow—from initial lead capture to CRM updates and customer management.
              </p>
            </div>

            <div className={styles.thinkingCard}>
              <div className={styles.thinkingHead}>
                <span className={styles.thinkingNum}>04</span>
                <div className={styles.thinkingLine} />
              </div>
              <h4>Improve with Evidence</h4>
              <p>
                We use hard analytics, real-world customer usage, and stress testing to validate performance and deploy ongoing enhancements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT WE BRING TOGETHER (CAPABILITIES) ── */}
      <section className={styles.capabilitiesSection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <span className="tag">CONNECTED CAPABILITIES</span>
            <h2 className={styles.sectionTitle}>
              Different Capabilities. One Business-Focused Approach.
            </h2>
            <p className={styles.sectionSub}>
              Not every business needs every service. We recommend the exact combination that fits your actual challenge, requirements, and available resources.
            </p>
          </div>

          <div className={styles.capabilitiesGrid}>
            {/* Strategy */}
            <div className={styles.capCard}>
              <div className={styles.capHead}>
                <div className={styles.capIcon}><FaCompass size={18} /></div>
                <span className={styles.capTag}>Discipline 01</span>
              </div>
              <h3>Strategy</h3>
              <p>Business diagnosis, competitor analysis, customer journey mapping, and technical roadmaps.</p>
              <div className={styles.capChips}>
                <span>Market Audit</span>
                <span>Scope Planning</span>
              </div>
              <Link to="/contact" className={styles.capLink}>
                <span>Request Strategic Audit</span>
                <FaArrowRight size={11} />
              </Link>
            </div>

            {/* Build */}
            <div className={styles.capCard}>
              <div className={styles.capHead}>
                <div className={styles.capIcon}><FaLaptopCode size={18} /></div>
                <span className={styles.capTag}>Discipline 02</span>
              </div>
              <h3>Build</h3>
              <p>High-speed custom websites, web applications, client portals, and internal agency tools.</p>
              <div className={styles.capChips}>
                <span>Modern Websites</span>
                <span>Custom Software</span>
              </div>
              <Link to="/services/website-development" className={styles.capLink}>
                <span>Explore Development</span>
                <FaArrowRight size={11} />
              </Link>
            </div>

            {/* Grow */}
            <div className={styles.capCard}>
              <div className={styles.capHead}>
                <div className={styles.capIcon}><FaChartLine size={18} /></div>
                <span className={styles.capTag}>Discipline 03</span>
              </div>
              <h3>Grow</h3>
              <p>Targeted Google SEO, Google Business Profiles, editorial content, and performance acquisition.</p>
              <div className={styles.capChips}>
                <span>Google Search SEO</span>
                <span>Content Strategy</span>
              </div>
              <Link to="/services/seo-blogging-gbp" className={styles.capLink}>
                <span>Explore SEO & Content</span>
                <FaArrowRight size={11} />
              </Link>
            </div>

            {/* Automate */}
            <div className={styles.capCard}>
              <div className={styles.capHead}>
                <div className={styles.capIcon}><FaCogs size={18} /></div>
                <span className={styles.capTag}>Discipline 04</span>
              </div>
              <h3>Automate</h3>
              <p>AI-assisted workflows, lead-management setups, n8n automations, and WhatsApp notifications.</p>
              <div className={styles.capChips}>
                <span>WhatsApp Workflows</span>
                <span>n8n Routing</span>
              </div>
              <Link to="/services/automation-systems" className={styles.capLink}>
                <span>Explore Automation</span>
                <FaArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FLAGSHIP CASE STUDY: KIN PROPERTY (REDESIGNED) ── */}
      <section id="case-study" className={styles.caseStudySection}>
        <div className="container">
          <div className={styles.caseStudyContainer}>
            
            {/* Top Navigation Bar with View Switcher */}
            <div className={styles.caseStudyTopBar}>
              <div className={styles.caseStudyBadges}>
                <span className={styles.flagshipPill}>Flagship Project</span>
                <span className={styles.locationPill}><FaMapMarkerAlt size={11} /> Pune, India</span>
              </div>

              {/* Interactive View Switcher Tabs */}
              <div className={styles.tabSwitcher}>
                <button
                  onClick={() => handleTabSwitch('portal')}
                  className={`${styles.tabBtn} ${kinTab === 'portal' ? styles.tabBtnActive : ''}`}
                >
                  <FaLaptopCode size={13} />
                  <span>Client Search Portal</span>
                </button>
                <button
                  onClick={() => handleTabSwitch('crm')}
                  className={`${styles.tabBtn} ${kinTab === 'crm' ? styles.tabBtnActive : ''}`}
                >
                  <FaDatabase size={13} />
                  <span>Agency Admin CRM</span>
                </button>
              </div>
            </div>

            <div className={styles.caseStudyMainGrid}>
              
              {/* Left Column: Scope & Overview */}
              <div className={styles.caseStudyInfo}>
                <h2 className={styles.caseStudyTitle}>KIN Property Management</h2>
                <p className={styles.caseStudyBio}>
                  An internally connected flagship deployment demonstrating how VeltaZ unites brand identity, full-stack web engineering, Google search discoverability, and lead-routing automation into a single cohesive ecosystem.
                </p>

                {/* 2x2 Bento Scope Cards */}
                <div className={styles.scopeBento}>
                  <div className={styles.scopeCard}>
                    <div className={styles.scopeIconWrap}><FaLaptopCode size={14} /></div>
                    <div>
                      <strong>Full-Stack Portal</strong>
                      <p>Custom search engine, map geolocation & filterable property listings.</p>
                    </div>
                  </div>

                  <div className={styles.scopeCard}>
                    <div className={styles.scopeIconWrap}><FaWhatsapp size={14} /></div>
                    <div>
                      <strong>WhatsFlow Routing</strong>
                      <p>Automated lead capture, instant agent assignment & follow-ups.</p>
                    </div>
                  </div>

                  <div className={styles.scopeCard}>
                    <div className={styles.scopeIconWrap}><FaSearch size={14} /></div>
                    <div>
                      <strong>GBP & Local SEO</strong>
                      <p>Targeted Pune keywords, listing schema & verified business profile.</p>
                    </div>
                  </div>

                  <div className={styles.scopeCard}>
                    <div className={styles.scopeIconWrap}><FaPenNib size={14} /></div>
                    <div>
                      <strong>Brand & Media Production</strong>
                      <p>Complete logo identity, property photography & social growth.</p>
                    </div>
                  </div>
                </div>

                <div className={styles.caseStudyActions}>
                  <Link to="/products/kin-property" className="btn btn-primary">
                    <span>Explore Full Case Study</span>
                    <FaArrowRight size={12} />
                  </Link>
                  <a
                    href="https://kinpropertymanagement.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <span>Visit Live Portal</span>
                    <FaExternalLinkAlt size={11} />
                  </a>
                </div>
              </div>

              {/* Right Column: Realistic Browser Mockup */}
              <div className={styles.mockupWrapper}>
                <div className={styles.luxuryBrowser}>
                  <div className={styles.browserHeaderBar}>
                    <div className={styles.browserWindowDots}>
                      <span className={styles.dotRed} />
                      <span className={styles.dotYellow} />
                      <span className={styles.dotGreen} />
                    </div>
                    <div className={styles.browserAddressBox}>
                      <span className={styles.lockIcon}>🔒</span>
                      <span>
                        {kinTab === 'portal' ? 'https://kinpropertymanagement.com' : 'https://admin.kinpropertymanagement.com'}
                      </span>
                    </div>
                    <button
                      onClick={toggleVideo}
                      className={styles.videoPauseButton}
                      aria-label={isVideoPlaying ? 'Pause demo' : 'Play demo'}
                    >
                      {isVideoPlaying ? <FaPause size={10} /> : <FaPlay size={10} />}
                    </button>
                  </div>

                  <div className={styles.browserScreen}>
                    <video
                      key={kinTab}
                      ref={kinVideoRef}
                      src={
                        kinTab === 'portal'
                          ? "https://pub-e1d70b5018194b73862065bede05370e.r2.dev/lv_0_20261019161435.mp4"
                          : "https://pub-e1d70b5018194b73862065bede05370e.r2.dev/lv_0_20261019162600.mp4"
                      }
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={styles.screenVideo}
                    />

                  </div>
                </div>

                <p className={styles.browserCaption}>
                  {kinTab === 'portal'
                    ? 'Interactive client search portal with verified property galleries, location maps & direct enquiry triggers.'
                    : 'Internal agency CRM with live lead assignment, document management & deal tracking.'}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 6. REAL PRODUCTS & SYSTEMS ── */}
      <section className={styles.productsSection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <span className="tag">PRACTICAL SOLUTIONS</span>
            <h2 className={styles.sectionTitle}>We Build Solutions Around Real Operational Needs.</h2>
            <p className={styles.sectionSub}>Practical software platforms engineered to solve tangible operational bottlenecks.</p>
          </div>

          <div className={styles.productsGrid}>
            {/* WhatsFlow */}
            <div className={styles.productCard}>
              <div className={styles.productHead}>
                <span className={styles.productBadge}>Lead Routing</span>
                <span className={styles.productStatusDot}>Active Tool</span>
              </div>
              <h3>WhatsFlow</h3>
              <p>A specialized lead-management tool supporting customer enquiries, agent status tracking, and automated follow-ups.</p>
              <div className={styles.productSpecs}>
                <div><span>Interface</span><strong>Agent & Admin Boards</strong></div>
                <div><span>Core Value</span><strong>Zero Lead Drop-Off</strong></div>
              </div>
              <Link to="/products/whatsflow" className={styles.productLink}>
                <span>View Details</span>
                <FaArrowRight size={11} />
              </Link>
            </div>

            {/* Docket14 */}
            <div className={styles.productCard}>
              <div className={styles.productHead}>
                <span className={styles.productBadge}>Legal Practice</span>
                <span className={styles.productStatusDot}>Internal Tool</span>
              </div>
              <h3>Docket14</h3>
              <p>A practice management platform built around court dockets, multi-stage case lifecycles, and advocate expense approvals.</p>
              <div className={styles.productSpecs}>
                <div><span>Interface</span><strong>Advocate Workspaces</strong></div>
                <div><span>Core Value</span><strong>Lifecycle Clarity</strong></div>
              </div>
              <Link to="/products/docket14" className={styles.productLink}>
                <span>View Details</span>
                <FaArrowRight size={11} />
              </Link>
            </div>

            {/* Kin Property */}
            <div className={styles.productCard}>
              <div className={styles.productHead}>
                <span className={styles.productBadge}>Real Estate</span>
                <span className={styles.productStatusDot}>Live Platform</span>
              </div>
              <h3>Kin Property</h3>
              <p>A real estate engine featuring localized property search, listing verifications, and streamlined backend lead management.</p>
              <div className={styles.productSpecs}>
                <div><span>Interface</span><strong>Client Portal + CRM</strong></div>
                <div><span>Core Value</span><strong>Fast Discovery</strong></div>
              </div>
              <Link to="/products/kin-property" className={styles.productLink}>
                <span>View Details</span>
                <FaArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. HONEST WORKING PRINCIPLES ── */}
      <section className={styles.principlesSection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <span className="tag">HOW WE OPERATE</span>
            <h2 className={styles.sectionTitle}>A More Thoughtful Way to Build.</h2>
            <p className={styles.sectionSub}>
              Clear standards that ensure transparency, realistic roadmaps, and disciplined delivery.
            </p>
          </div>

          <div className={styles.principlesGrid}>
            <div className={styles.principleCard}>
              <div className={styles.principleIcon}><FaCompass size={18} /></div>
              <h3 className={styles.principleTitle}>Purpose Before Tools</h3>
              <p className={styles.principleText}>
                We diagnose the problem first, selecting the exact technology that fits.
              </p>
            </div>

            <div className={styles.principleCard}>
              <div className={styles.principleIcon}><FaCheck size={18} /></div>
              <h3 className={styles.principleTitle}>Useful Over Unnecessary</h3>
              <p className={styles.principleText}>
                We engineer features that add real value, eliminating speculative bloat.
              </p>
            </div>

            <div className={styles.principleCard}>
              <div className={styles.principleIcon}><FaShieldAlt size={18} /></div>
              <h3 className={styles.principleTitle}>Clarity Before Commitment</h3>
              <p className={styles.principleText}>
                We define deliverables and realistic timelines clearly before starting work.
              </p>
            </div>

            <div className={styles.principleCard}>
              <div className={styles.principleIcon}><FaChartLine size={18} /></div>
              <h3 className={styles.principleTitle}>Evidence Over Exaggeration</h3>
              <p className={styles.principleText}>
                We share verified results and limitations, never making false promises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. CLIENT FIT & THE TEAM ── */}
      <section className={styles.teamSection}>
        <div className="container">
          {/* Client Fit Section */}
          <div className={styles.fitContainer}>
            <div className={styles.sectionHeaderCentered}>
              <span className="tag">CLIENT FIT & PARTNERSHIPS</span>
              <h2 className={styles.sectionTitle}>Built for Businesses Ready to Move Forward.</h2>
              <p className={styles.sectionSub}>
                We partner with ambitious teams to engineer digital infrastructure, eliminate operational friction, and scale revenue.
              </p>
            </div>

            <div className={styles.fitCardsGrid}>
              {/* Card 1: Founders */}
              <div className={styles.fitCard}>
                <div className={styles.fitCardHead}>
                  <div className={styles.fitCardIcon}><FaRocket size={18} /></div>
                  <span className={styles.fitCardStage}>Stage: 0 to 1</span>
                </div>
                <h3>Founders & Startups</h3>
                <p>
                  Founders launching new ventures who need an authoritative brand presence, modern web applications, and fast search discoverability.
                </p>
                <div className={styles.fitDeliverables}>
                  <span>Brand & Identity</span>
                  <span>Custom Web App</span>
                  <span>Google SEO</span>
                </div>
              </div>

              {/* Card 2: Growing Companies */}
              <div className={styles.fitCard}>
                <div className={styles.fitCardHead}>
                  <div className={styles.fitCardIcon}><FaBuilding size={18} /></div>
                  <span className={styles.fitCardStage}>Stage: Scaling</span>
                </div>
                <h3>Growing Companies</h3>
                <p>
                  Businesses suffering from manual bottlenecks who need custom CRM workspaces, lead-routing automation, and high-converting funnels.
                </p>
                <div className={styles.fitDeliverables}>
                  <span>WhatsFlow CRM</span>
                  <span>Workflow Automation</span>
                  <span>Lead Funnels</span>
                </div>
              </div>

              {/* Card 3: Service Practices */}
              <div className={styles.fitCard}>
                <div className={styles.fitCardHead}>
                  <div className={styles.fitCardIcon}><FaBriefcase size={18} /></div>
                  <span className={styles.fitCardStage}>Stage: Operational</span>
                </div>
                <h3>Professional Practices</h3>
                <p>
                  Legal, real estate, and professional firms seeking proprietary portals, case dockets, and verified client booking platforms.
                </p>
                <div className={styles.fitDeliverables}>
                  <span>Client Portals</span>
                  <span>Docket Management</span>
                  <span>Listing Platforms</span>
                </div>
              </div>
            </div>

            {/* Global Reach Banner */}
            <div className={styles.locationBanner}>
              <div className={styles.locationIcon}>
                <FaMapMarkerAlt size={15} />
              </div>
              <div className={styles.locationText}>
                <strong>Headquartered in Pune, India</strong>
                <span>Operating remote-first with clients across India, the Middle East, UK, and globally.</span>
              </div>
              <Link to="/contact" className={styles.locationLink}>
                <span>Check Availability</span>
                <FaArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaGridOverlay} />

            <span className="tag">START A CONVERSATION</span>
            <h2 className={styles.ctaHeading}>
              Every Business Has a Different Challenge. <br />
              <span className={styles.ctaTitleGradient}>Let's Engineer the Solution.</span>
            </h2>
            <p className={styles.ctaDesc}>
              Tell us what your business is trying to achieve, what is not working and where you need help. We will start by understanding the requirement and discussing a practical next step.
            </p>

            {/* 2 Interactive Channels */}
            <div className={styles.ctaActionGrid}>
              {/* Channel 1: WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.channelCard}
              >
                <div className={styles.channelHead}>
                  <div className={styles.channelIconWa}>
                    <FaWhatsapp size={20} />
                  </div>
                  <span className={styles.channelBadgeWa}>Instant Response</span>
                </div>
                <h3>Direct WhatsApp Channel</h3>
                <p>Chat directly with our founding team. Quick turnaround, direct technical scope & zero waiting.</p>
                <span className={styles.channelActionBtn}>
                  <span>Discuss Your Business</span>
                  <FaArrowRight size={11} />
                </span>
              </a>

              {/* Channel 2: Services & Audit */}
              <Link to="/services" className={styles.channelCard}>
                <div className={styles.channelHead}>
                  <div className={styles.channelIconAudit}>
                    <FaCompass size={18} />
                  </div>
                  <span className={styles.channelBadgeAudit}>Full Capabilities</span>
                </div>
                <h3>Explore Services & Scope</h3>
                <p>Browse our complete engineering capabilities across web development, custom software & SEO.</p>
                <span className={styles.channelActionBtn}>
                  <span>Explore Our Services</span>
                  <FaArrowRight size={11} />
                </span>
              </Link>
            </div>

            {/* Trust Guarantee Strip */}
            <div className={styles.ctaTrustStrip}>
              <div className={styles.trustItem}>
                <FaShieldAlt size={12} className={styles.trustIcon} />
                <span>Strict NDA & Data Confidentiality</span>
              </div>
              <span className={styles.trustDivider}>•</span>
              <div className={styles.trustItem}>
                <FaBolt size={12} className={styles.trustIcon} />
                <span>24-Hour Initial Scope Review</span>
              </div>
              <span className={styles.trustDivider}>•</span>
              <div className={styles.trustItem}>
                <FaCheck size={12} className={styles.trustIcon} />
                <span>Direct Founder-Led Execution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
