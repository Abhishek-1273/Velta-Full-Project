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
  FaDatabase,
  FaPenNib,
  FaSearch,
  FaBolt,
  FaRocket,
  FaBuilding,
  FaBriefcase
} from 'react-icons/fa'
import styles from './About.module.css'

const WHATSAPP_NUMBER = '919960240648'
const WHATSAPP_MSG = encodeURIComponent("Hi VeltaZ, I'd like to discuss my business and explore practical digital solutions.")
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

export default function About() {
  const kinVideoRef = useRef(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [kinTab, setKinTab] = useState('portal') // 'portal' | 'crm'
  const [activeHeroTab, setActiveHeroTab] = useState('kin') // 'kin' | 'whatsflow' | 'content'

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
                  <span>Reliable Delivery</span>
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

            {/* Interactive Project Switcher (Single Unified Luxury Card) */}
            <div className={styles.heroVisual}>
              <div className={styles.switcherCard}>
                
                {/* Top Bar with Window Dots & Badge */}
                <div className={styles.switcherTopBar}>
                  <div className={styles.switcherDots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                  </div>
                  <div className={styles.switcherStatusBadge}>
                    <span className={styles.livePulseDot} />
                    <span>Verified Project Deployments</span>
                  </div>
                </div>

                {/* 3 Interactive Tab Buttons */}
                <div className={styles.switcherNav}>
                  <button
                    type="button"
                    onClick={() => setActiveHeroTab('kin')}
                    className={`${styles.switcherTabBtn} ${activeHeroTab === 'kin' ? styles.switcherTabBtnActive : ''}`}
                  >
                    <FaLaptopCode size={13} />
                    <span>KIN Website</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveHeroTab('whatsflow')}
                    className={`${styles.switcherTabBtn} ${activeHeroTab === 'whatsflow' ? styles.switcherTabBtnActive : ''}`}
                  >
                    <FaWhatsapp size={13} />
                    <span>WhatsFlow CRM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveHeroTab('content')}
                    className={`${styles.switcherTabBtn} ${activeHeroTab === 'content' ? styles.switcherTabBtnActive : ''}`}
                  >
                    <FaPenNib size={12} />
                    <span>Content Studio</span>
                  </button>
                </div>

                {/* Tab Screen Pane */}
                <div className={styles.switcherScreen}>
                  
                  {/* TAB 1: KIN Property Website */}
                  {activeHeroTab === 'kin' && (
                    <div className={styles.tabContentPane}>
                      <div className={styles.browserBarSmall}>
                        <span className={styles.lockIcon}>🔒</span>
                        <span className={styles.browserUrlText}>https://kinpropertymanagement.com</span>
                        <span className={styles.tagPill}>Web Platform</span>
                      </div>
                      
                      <div className={styles.previewImageContainer}>
                        <img
                          src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792408084/website-mockup_qnmqqk.png"
                          alt="KIN Property Desktop Website Mockup"
                          className={styles.kinDesktopImg}
                        />
                      </div>

                      <div className={styles.paneMetaRow}>
                        <div className={styles.paneDeliverables}>
                          <span>Custom Search</span>
                          <span>Geo Maps</span>
                          <span>Lead Hooks</span>
                        </div>
                        <a
                          href="#case-study"
                          onClick={(e) => scrollToSection(e, 'case-study')}
                          className={styles.paneActionLink}
                        >
                          <span>Case Study</span>
                          <FaArrowRight size={10} />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: WhatsFlow CRM */}
                  {activeHeroTab === 'whatsflow' && (
                    <div className={styles.tabContentPane}>
                      <div className={styles.browserBarSmall}>
                        <FaWhatsapp size={13} style={{ color: '#25D366' }} />
                        <span className={styles.browserUrlText}>Inbound Lead Routing Engine</span>
                        <span className={styles.tagPill}>WhatsApp CRM</span>
                      </div>

                      <div className={styles.whatsflowPaneGrid}>
                        {/* Samsung Galaxy S25 Ultra Frame */}
                        <div className={styles.s25UltraFrame}>
                          <div className={styles.s25VolumeBtn} />
                          <div className={styles.s25PowerBtn} />
                          
                          <div className={styles.s25ScreenSurface}>
                            <div className={styles.s25PunchHoleCamera} />
                            <img
                              src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792475226/whatsflow_cbybon.jpg"
                              alt="WhatsFlow Mobile App Interface"
                              className={styles.phoneScreenImg}
                            />
                          </div>
                        </div>
                        <div className={styles.whatsflowInfoCol}>
                          <h4>Automated WhatsApp Pipeline</h4>
                          <ul className={styles.featureBulletList}>
                            <li><FaCheck className={styles.bulletCheck} /> 24/7 Inbound inquiry capture</li>
                            <li><FaCheck className={styles.bulletCheck} /> Round-robin team member routing</li>
                            <li><FaCheck className={styles.bulletCheck} /> Centralized conversation database</li>
                          </ul>
                          <div className={styles.wfMetaBadge}>
                            <span>Zero lost leads • Instant agent sync</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.paneMetaRow}>
                        <div className={styles.paneDeliverables}>
                          <span>WhatsApp API</span>
                          <span>Admin Portal</span>
                          <span>Agent App</span>
                        </div>
                        <Link to="/products/whatsflow" className={styles.paneActionLink}>
                          <span>View Product</span>
                          <FaArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Content Studio */}
                  {activeHeroTab === 'content' && (
                    <div className={styles.tabContentPane}>
                      <div className={styles.browserBarSmall}>
                        <FaChartLine size={12} style={{ color: 'var(--accent)' }} />
                        <span className={styles.browserUrlText}>High-Engagement Short-Form Video</span>
                        <span className={styles.tagPill}>Content Studio</span>
                      </div>

                      <div className={styles.contentPaneGrid}>
                        {/* Samsung Galaxy S25 Ultra Frame */}
                        <div className={styles.s25UltraFrame}>
                          <div className={styles.s25VolumeBtn} />
                          <div className={styles.s25PowerBtn} />
                          
                          <div className={styles.s25ScreenSurface}>
                            <div className={styles.s25PunchHoleCamera} />
                            <img
                              src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053111/reel-193k_zbtf8g.png"
                              alt="Viral Instagram Reel with 193K Views"
                              className={styles.reelImg}
                            />
                          </div>
                        </div>
                        <div className={styles.contentInfoCol}>
                          <h4>Organic Reach & Creative Direction</h4>
                          <p className={styles.contentDescText}>
                            High-impact video production and social media handling designed to establish brand authority and drive organic customer discovery.
                          </p>
                          <div className={styles.platformPillsRow}>
                            <span>Instagram Reels</span>
                            <span>LinkedIn Media</span>
                            <span>Brand Identity</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.paneMetaRow}>
                        <div className={styles.paneDeliverables}>
                          <span>Viral Video Editing</span>
                          <span>Scripting</span>
                          <span>Page Handling</span>
                        </div>
                        <Link to="/content" className={styles.paneActionLink}>
                          <span>Explore Content</span>
                          <FaArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  )}

                </div>

                {/* Card Footer Subtitle */}
                <div className={styles.switcherFooter}>
                  <span>Actual project deliverables deployed for real businesses</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. BRAND PHILOSOPHY (CONSOLIDATED) ── */}
      <section className={styles.philosophySection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <span className="tag">OUR PHILOSOPHY</span>
            <h2 className={styles.sectionTitle}>Understand First. Build with Purpose.</h2>
            <p className={styles.sectionSub}>
              A website alone isn’t enough. Neither is isolated marketing or disconnected software. 
              Real momentum happens when your digital footprint connects directly with real-world business operations.
            </p>
          </div>

          <div className={styles.thinkingGrid}>
            <div className={styles.thinkingCard}>
              <div className={styles.thinkingHead}>
                <span className={styles.thinkingNum}>01</span>
                <div className={styles.thinkingLine} />
              </div>
              <h4>Diagnose the Bottlenecks</h4>
              <p>
                We study your business bottlenecks, customer touchpoints, and operational workflow first. Deep investigation ensures we solve core friction before writing any new code.
              </p>
            </div>

            <div className={styles.thinkingCard}>
              <div className={styles.thinkingHead}>
                <span className={styles.thinkingNum}>02</span>
                <div className={styles.thinkingLine} />
              </div>
              <h4>Build Only What Is Needed</h4>
              <p>
                We build custom web applications, internal tools, and automations tailored to your exact scope. Every system is engineered with purpose, zero bloat, and zero templates.
              </p>
            </div>

            <div className={styles.thinkingCard}>
              <div className={styles.thinkingHead}>
                <span className={styles.thinkingNum}>03</span>
                <div className={styles.thinkingLine} />
              </div>
              <h4>Connect Daily Operations</h4>
              <p>
                We connect each customer touchpoint into one unified workflow. Search inquiries, social discovery, WhatsApp qualifiers, and CRM systems work together as a single engine.
              </p>
            </div>

            <div className={styles.thinkingCard}>
              <div className={styles.thinkingHead}>
                <span className={styles.thinkingNum}>04</span>
                <div className={styles.thinkingLine} />
              </div>
              <h4>Validate Through Evidence</h4>
              <p>
                We validate technical performance through real user feedback, stress testing, and live data. Every operational upgrade is supported by solid and verifiable evidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FOUR CONNECTED CAPABILITIES ── */}
      <section className={styles.capabilitiesSection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <span className="tag">FOUR CORE CAPABILITIES</span>
            <h2 className={styles.sectionTitle}>
              Research. Build. Grow. Automate.
            </h2>
            <p className={styles.sectionSub}>
              Not every business needs every discipline. We recommend the exact combination that fits your operational challenges and resources.
            </p>
          </div>

          <div className={styles.capabilitiesGrid}>
            {/* Strategy */}
            <div className={styles.capCard}>
              <div className={styles.capHead}>
                <div className={styles.capIcon}><FaCompass size={18} /></div>
                <span className={styles.capTag}>Discipline 01</span>
              </div>
              <h3>Research & Strategy</h3>
              <p>Business diagnosis, competitive positioning, customer journey mapping, and realistic technical roadmaps.</p>
              <div className={styles.capChips}>
                <span>Market Diagnosis</span>
                <span>Scope Planning</span>
              </div>
              <Link to="/contact" className={styles.capLink}>
                <span>Discuss Project Scope</span>
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
              <p>Modern responsive business websites, web applications, client portals, and custom operational software.</p>
              <div className={styles.capChips}>
                <span>Web Platforms</span>
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
              <p>Targeted Google SEO, Google Business Profiles, editorial content planning, and qualified customer acquisition.</p>
              <div className={styles.capChips}>
                <span>Google SEO</span>
                <span>Content Strategy</span>
              </div>
              <Link to="/services/seo-blogging-google-business-profile" className={styles.capLink}>
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
              <p>Practical lead-management setups, n8n webhook automations, WhatsApp notifications, and zero manual data re-entry.</p>
              <div className={styles.capChips}>
                <span>WhatsApp CRM</span>
                <span>System Sync</span>
              </div>
              <Link to="/services/automation-systems" className={styles.capLink}>
                <span>Explore Automation</span>
                <FaArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FLAGSHIP CASE STUDY: KIN PROPERTY ── */}
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
                  A flagship project showcasing VeltaZ's work across brand identity, website development, SEO, content creation and lead-management systems.
                </p>

                {/* 2x2 Bento Scope Cards */}
                <div className={styles.scopeBento}>
                  <div className={styles.scopeCard}>
                    <div className={styles.scopeIconWrap}><FaLaptopCode size={14} /></div>
                    <div>
                      <strong>Property Search Portal</strong>
                      <p>Custom search filters, property listings, and responsive mobile layout.</p>
                    </div>
                  </div>

                  <div className={styles.scopeCard}>
                    <div className={styles.scopeIconWrap}><FaWhatsapp size={14} /></div>
                    <div>
                      <strong>WhatsFlow Lead Routing</strong>
                      <p>Inbound lead capture, team member assignment, and fast WhatsApp follow-ups.</p>
                    </div>
                  </div>

                  <div className={styles.scopeCard}>
                    <div className={styles.scopeIconWrap}><FaSearch size={14} /></div>
                    <div>
                      <strong>GBP & Local SEO</strong>
                      <p>Targeted Pune keywords, listing structured data, and verified business profile.</p>
                    </div>
                  </div>

                  <div className={styles.scopeCard}>
                    <div className={styles.scopeIconWrap}><FaPenNib size={14} /></div>
                    <div>
                      <strong>Brand & Content Studio</strong>
                      <p>Clean visual identity, property photography, and social media reels.</p>
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

      {/* ── 5. REAL PRODUCTS & SYSTEMS ── */}
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
                <div><span>Core Value</span><strong>Fast Lead Capture</strong></div>
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

      {/* ── 6. CLIENT FIT & PARTNERSHIPS ── */}
      <section className={styles.teamSection}>
        <div className="container">
          <div className={styles.fitContainer}>
            <div className={styles.sectionHeaderCentered}>
              <span className="tag">CLIENT FIT & PARTNERSHIPS</span>
              <h2 className={styles.sectionTitle}>Built for Businesses Ready to Move Forward.</h2>
              <p className={styles.sectionSub}>
                We partner with ambitious teams to engineer digital infrastructure, eliminate operational friction, and build dependable systems.
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

            {/* Global Reach Banner (Corrected honest location statement) */}
            <div className={styles.locationBanner}>
              <div className={styles.locationIcon}>
                <FaMapMarkerAlt size={15} />
              </div>
              <div className={styles.locationText}>
                <strong>Based in Pune, India</strong>
                <span>Available for projects worldwide.</span>
              </div>
              <Link to="/contact" className={styles.locationLink}>
                <span>Check Availability</span>
                <FaArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA ── */}
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
                  <span className={styles.channelBadgeWa}>Direct WhatsApp</span>
                </div>
                <h3>Direct WhatsApp Channel</h3>
                <p>Connect with our technical team to discuss project requirements, scope details, and pragmatic next steps.</p>
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

            {/* Trust Guarantee Strip (Grounded, realistic promises) */}
            <div className={styles.ctaTrustStrip}>
              <div className={styles.trustItem}>
                <FaShieldAlt size={12} className={styles.trustIcon} />
                <span>Strict NDA & Data Confidentiality</span>
              </div>
              <span className={styles.trustDivider}>•</span>
              <div className={styles.trustItem}>
                <FaBolt size={12} className={styles.trustIcon} />
                <span>Structured Scope & Timeline Planning</span>
              </div>
              <span className={styles.trustDivider}>•</span>
              <div className={styles.trustItem}>
                <FaCheck size={12} className={styles.trustIcon} />
                <span>Direct Technical Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
