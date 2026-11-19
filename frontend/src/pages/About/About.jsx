import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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

// ── TASTE-SKILL: Interactive 3D Perspective Tilt Card with Cursor Spotlight ──
function TiltCard({ children, className = '', maxRotate = 7, glareOpacity = 0.14, ...props }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, active: false })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -maxRotate
    const rotateY = ((x - centerX) / centerX) * maxRotate
    setTilt({
      x: rotateX,
      y: rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      active: true,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, active: false })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${tilt.active ? 1.02 : 1}, ${tilt.active ? 1.02 : 1}, 1)`,
        transition: tilt.active ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {tilt.active && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(223, 168, 64, ${glareOpacity}) 0%, transparent 65%)`,
            zIndex: 10,
          }}
        />
      )}
      {children}
    </div>
  )
}

// ── Interactive Draggable Golden Stars (Springs Back on Release) ──
function DraggableSparkle({ size = 22, style, rotate = 0 }) {
  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragElastic={0.8}
      dragTransition={{ bounceStiffness: 450, bounceDamping: 22 }}
      whileHover={{ scale: 1.35, rotate: rotate + 25, cursor: 'grab' }}
      whileDrag={{ scale: 1.6, cursor: 'grabbing' }}
      className={styles.draggableStar}
      style={{ ...style, transform: `rotate(${rotate}deg)` }}
      title="Drag me!"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={styles.starSvg}
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    </motion.div>
  )
}

const PHILOSOPHY_STEPS = [
  {
    step: '01',
    title: 'Diagnose the Bottlenecks',
    desc: 'We study your business bottlenecks, customer touchpoints, and operational workflow first. Deep investigation ensures we solve core friction before writing any new code.',
    tag: 'Root-Cause Audit',
    icon: FaSearch,
  },
  {
    step: '02',
    title: 'Build Only What Is Needed',
    desc: 'We build custom web applications, internal tools, and automations tailored to your exact scope. Every system is engineered with purpose, zero bloat, and zero templates.',
    tag: 'Purpose-Built Engine',
    icon: FaCogs,
  },
  {
    step: '03',
    title: 'Connect Daily Operations',
    desc: 'We connect each customer touchpoint into one unified workflow. Search inquiries, social discovery, WhatsApp qualifiers, and CRM systems work together as a single engine.',
    tag: 'Unified Workflows',
    icon: FaDatabase,
  },
  {
    step: '04',
    title: 'Validate Through Evidence',
    desc: 'We validate technical performance through real user feedback, stress testing, and live data. Every operational upgrade is supported by solid and verifiable evidence.',
    tag: 'Evidence & Telemetry',
    icon: FaChartLine,
  },
]

const PRACTICAL_PRODUCTS = [
  {
    id: 'whatsflow',
    title: 'WhatsFlow',
    badge: 'WhatsApp CRM OS',
    status: 'Live System',
    domain: 'app.whatsflow.io',
    icon: FaWhatsapp,
    problem:
      'Businesses running Meta ads were bleeding 40%+ of high-intent leads because inquiries sat unassigned on personal phones and never synced to CRM.',
    solutions: [
      {
        label: 'Direct Cloud Gateway',
        text: 'Sub-120ms webhook router capturing incoming chats with zero dropped requests.',
      },
      {
        label: '24/7 Smart Qualification',
        text: 'Automated interactive flows pre-qualifying lead intent before staff notification.',
      },
      {
        label: 'Shared Multi-Agent Inbox',
        text: 'Centralized web dashboard routing chats across reps with zero phone hopping.',
      },
      {
        label: 'Live 2-Way CRM Sync',
        text: 'Instant webhook pipeline auto-logging contacts and chat transcripts into CRM & Sheets.',
      },
    ],
    link: '/whatsflow',
  },
  {
    id: 'docket14',
    title: 'Docket14',
    badge: 'Legal Practice OS',
    status: 'Internal Platform',
    domain: 'docket14.legal',
    icon: FaBriefcase,
    problem:
      'Litigation advocates spent hours scouring 200+ page PDF causelists across High Court benches late at night, risking missed dates and lost case files.',
    solutions: [
      {
        label: 'Automated Causelist Sync',
        text: 'Daily scrapers index court listings and match case dockets directly to advocate calendars.',
      },
      {
        label: 'Proactive Hearing Alerts',
        text: 'Automated multi-channel notifications (WhatsApp/SMS) sent 24h prior to court call.',
      },
      {
        label: 'Encrypted Digital Vault',
        text: 'Client-isolated cloud storage for confidential petitions and case notes with zero paper clutter.',
      },
      {
        label: 'Hearing Lifecycle Tracker',
        text: 'Centralized case stage tracking, interim court orders, and advocate fee ledgers.',
      },
    ],
    link: '/docket14',
  },
  {
    id: 'kin-property',
    title: 'KIN Property',
    badge: 'PropTech Platform',
    status: 'Live Platform',
    domain: 'kinproperty.in',
    icon: FaBuilding,
    problem:
      'Property developers were losing high-intent buyers to slow, bloated aggregator portals with fake listings, where 70%+ of leads dropped before inquiry.',
    solutions: [
      {
        label: 'Sub-Second Mobile UI',
        text: 'Ultra-fast portal architecture built strictly for mobile buyers with sub-800ms load times.',
      },
      {
        label: 'Verified Inventory Search',
        text: 'Precision filters for verified carpet areas, high-res floor plans, and RERA data.',
      },
      {
        label: '1-Click WhatsApp Booking',
        text: 'Direct triggers scheduling physical site visits directly with verified sales agents.',
      },
      {
        label: 'Valuation & EMI Engine',
        text: 'Interactive calculators converting casual browsers into qualified, purchase-ready leads.',
      },
    ],
    link: '/kin-property',
  },
]

// ── TASTE-SKILL: Magnetic Button with Cursor Attraction Physics ──
function MagneticButton({ children }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = (e.clientX - centerX) * 0.28
    const distanceY = (e.clientY - centerY) * 0.28
    setPos({ x: distanceX, y: distanceY })
  }

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 22, mass: 0.5 }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const kinVideoRef = useRef(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [kinTab, setKinTab] = useState('portal') // 'portal' | 'crm'

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
        kinVideoRef.current.play().catch(() => { })
        setIsVideoPlaying(true)
      }
    }
  }

  const handleTabSwitch = (tab) => {
    setKinTab(tab)
    setIsVideoPlaying(true)
    if (kinVideoRef.current) {
      kinVideoRef.current.load()
      kinVideoRef.current.play().catch(() => { })
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
      {/* 2026 Luxury Noise Grain Overlay */}
      <div className={styles.noiseOverlay} aria-hidden="true" />

      {/* ── 1. HERO SECTION (MATCHING LUXURY DESIGN MOCKUP) ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.ambientBlobLeft} />
          <div className={styles.ambientBlobRight} />
          <div className={styles.gridOverlay} />
        </div>

        <div className="container">
          <div className={styles.heroGrid}>
            {/* Left Content */}
            <div className={styles.heroContent}>
              <div className={styles.eyebrowBadge}>
                <span className={styles.eyebrowDot} />
                <span>ABOUT US · VELTAZ</span>
              </div>

              <h1 className={styles.heroTitle}>
                Turning Ideas<br />
                Into <span className={styles.goldText}>Impact.</span>
              </h1>

              <p className={styles.heroDesc}>
                At Veltaz, we're a team of passionate thinkers, designers and developers, dedicated to turning bold ideas into scalable digital solutions.
              </p>

              {/* Value Pillars Row */}
              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <div className={styles.pillarTitle}>Custom Code</div>
                  <div className={styles.pillarDesc}>Bespoke Web & Software</div>
                </div>

                <div className={styles.statDivider} />

                <div className={styles.statItem}>
                  <div className={styles.pillarTitle}>WhatsFlow</div>
                  <div className={styles.pillarDesc}>WhatsApp & CRM Workflows</div>
                </div>

                <div className={styles.statDivider} />

                <div className={styles.statItem}>
                  <div className={styles.pillarTitle}>Direct Access</div>
                  <div className={styles.pillarDesc}>Work With Builders</div>
                </div>
              </div>

              {/* Action Buttons with Taste-Skill Magnetic Attraction */}
              <div className={styles.heroActions}>
                <MagneticButton>
                  <Link
                    to="/case-studies"
                    className={styles.btnJourney}
                  >
                    <span>Explore Our Work</span>
                    <FaArrowRight size={12} />
                  </Link>
                </MagneticButton>

                <MagneticButton>
                  <Link
                    to="/contact"
                    className={styles.btnWatch}
                  >
                    <span>Start a Project</span>
                    <FaArrowRight size={12} />
                  </Link>
                </MagneticButton>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className={styles.heroVisualWrap}>
              <div className={styles.heroGlowBackdrop} />
              <div className={styles.heroVisualInner}>
                <img
                  src="https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1794644576/VELTAZ_original_4K_zwclzg.png"
                  alt="VeltaZ 3D Logo"
                  className={styles.hero3dImg}
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. BRAND PHILOSOPHY (3D PERSPECTIVE & INTERACTIVE ARCHITECTURE) ── */}
      <section id="philosophy" className={styles.philosophySection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            {/* Playful Interactive Draggable Golden Stars (Spring Back Physics) */}
            <DraggableSparkle size={26} rotate={14} style={{ top: -16, right: '6%' }} />
            <DraggableSparkle size={18} rotate={-22} style={{ bottom: -8, left: '6%' }} />

            <div className={styles.sectionEyebrowWrap}>
              <span className={styles.sectionEyebrowLine} />
              <div className={styles.sectionEyebrowPill}>OUR PHILOSOPHY</div>
              <span className={styles.sectionEyebrowLine} />
            </div>
            <h2 className={styles.sectionTitle}>Understand First. Build with Purpose.</h2>
            <p className={styles.sectionSub}>
              A website alone isn’t enough. Neither is isolated marketing or disconnected software.
              Real momentum happens when your digital footprint connects directly with real-world business operations.
            </p>
          </div>

          <div className={styles.thinkingGrid}>
            {PHILOSOPHY_STEPS.map((step, idx) => {
              const Icon = step.icon
              return (
                <TiltCard
                  key={step.step}
                  maxRotate={9}
                  className={styles.thinkingCard3D}
                >
                  {/* Holographic Parallax 3D Watermark Number */}
                  <div className={styles.watermarkNumber} aria-hidden="true">
                    {step.step}
                  </div>

                  {/* Top 3D Header: Icon Capsule + Step + Corner Arrow (Image 1 style) */}
                  <div className={styles.thinkingHead3D}>
                    <div className={styles.headLeft3D}>
                      <div className={styles.iconCapsule3D}>
                        <Icon size={16} />
                      </div>
                      <span className={styles.stepBadge3D}>PHASE {step.step}</span>
                    </div>

                    <div className={styles.cornerArrowBtn} title="Explore Phase">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </div>

                  {/* 3D Title */}
                  <h4 className={styles.thinkingTitle3D}>{step.title}</h4>

                  {/* 3D Body */}
                  <p className={styles.thinkingDesc3D}>{step.desc}</p>

                  {/* Bottom 3D Foot Tag */}
                  <div className={styles.thinkingFoot3D}>
                    <span className={styles.footTagPill}>
                      <span className={styles.footDot} /> {step.tag}
                    </span>
                    <span className={styles.stepProgressInd}>{idx + 1}/4</span>
                  </div>
                </TiltCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. FOUR CONNECTED CAPABILITIES (EDITORIAL BENTO GRID) ── */}
      <section className={styles.capabilitiesSection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <div className={styles.sectionEyebrowWrap}>
              <span className={styles.sectionEyebrowLine} />
              <div className={styles.sectionEyebrowPill}>FOUR CORE CAPABILITIES</div>
              <span className={styles.sectionEyebrowLine} />
            </div>
            <h2 className={styles.sectionTitle}>
              Research. Build. Grow. Automate.
            </h2>
            <p className={styles.sectionSub}>
              Not every business needs every discipline. We recommend the exact combination that fits your operational challenges and resources.
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {/* Bento Card 1: Research & Strategy (Top-Left 5-col) */}
            <TiltCard className={`${styles.bentoCard} ${styles.bentoCardResearch}`}>
              <div className={styles.bentoHeader}>
                <div className={styles.capHead}>
                  <div className={styles.capIcon}><FaCompass size={18} /></div>
                  <span className={styles.bentoTag}>RESEARCH · STRATEGY</span>
                </div>
                <span className={styles.statusLivePill}>Discovery &amp; Blueprint</span>
              </div>

              <h3 className={styles.bentoTitle}>Research &amp; Scoping</h3>
              <p className={styles.bentoDesc}>
                We study your business bottlenecks first. Clear scope, zero wasted code, and realistic delivery before building.
              </p>

              {/* Minimalist 3-Step Audit Widget */}
              <div className={styles.bentoAuditWidget}>
                <div className={styles.auditRow}>
                  <div className={styles.auditLeft}>
                    <span className={styles.auditNum}>01</span>
                    <span className={styles.auditLabel}>Identify Bottlenecks</span>
                  </div>
                  <span className={styles.auditTag}>Audit</span>
                </div>

                <div className={styles.auditRow}>
                  <div className={styles.auditLeft}>
                    <span className={styles.auditNum}>02</span>
                    <span className={styles.auditLabel}>Purpose-Built Spec</span>
                  </div>
                  <span className={styles.auditTagGold}>Zero Bloat</span>
                </div>

                <div className={styles.auditRow}>
                  <div className={styles.auditLeft}>
                    <span className={styles.auditNum}>03</span>
                    <span className={styles.auditLabel}>Milestones &amp; Timeline</span>
                  </div>
                  <span className={styles.auditTagGreen}>Guaranteed</span>
                </div>
              </div>

              <div className={styles.bentoFooter}>
                <div className={styles.capChips}>
                  <span>Bottleneck Audit</span>
                  <span>Scope Lock</span>
                </div>
                <Link to="/contact" className={styles.capLink}>
                  <span>Discuss Project Scope</span>
                  <FaArrowRight size={11} />
                </Link>
              </div>
            </TiltCard>

            {/* Bento Card 2: Build (Top-Right Featured 7-col) */}
            <TiltCard className={`${styles.bentoCard} ${styles.bentoCardBuild}`}>
              <div className={styles.bentoHeader}>
                <div className={styles.capHead}>
                  <div className={styles.capIcon}><FaLaptopCode size={18} /></div>
                  <span className={styles.bentoTag}>CORE PILLAR · BUILD</span>
                </div>
                <div className={styles.livePulseBadge}>
                  <span className={styles.pulseDot} />
                  <span>Sub-second TTFB</span>
                </div>
              </div>

              <h3 className={styles.bentoTitle}>High-Performance Web &amp; Custom Platforms</h3>
              <p className={styles.bentoDesc}>
                Modern responsive business websites, web applications, client portals, and custom operational software engineered around real requirements.
              </p>

              {/* Interactive Live Architecture Snippet Widget */}
              <div className={styles.bentoTerminalWidget}>
                <div className={styles.terminalBar}>
                  <div className={styles.termDots}>
                    <span className={styles.termDot} style={{ background: '#ff5f56' }} />
                    <span className={styles.termDot} style={{ background: '#ffbd2e' }} />
                    <span className={styles.termDot} style={{ background: '#27c93f' }} />
                  </div>
                  <span className={styles.terminalTitle}>veltaz-architecture.ts</span>
                </div>
                <div className={styles.terminalCode}>
                  <code>
                    <span className={styles.codeDim}>// Clean modular stack</span><br />
                    <span className={styles.codeKey}>const</span> <span className={styles.codeVar}>system</span> = <span className={styles.codeKey}>await</span> veltaz.<span className={styles.codeFn}>deploy</span>({'{'}<br />
                    &nbsp;&nbsp;frontend: <span className={styles.codeStr}>'React 18 · Vite'</span>,<br />
                    &nbsp;&nbsp;backend: <span className={styles.codeStr}>'Node.js REST API'</span>,<br />
                    &nbsp;&nbsp;uptime: <span className={styles.codeGold}>'99.9%'</span><br />
                    {'}'})
                  </code>
                </div>
              </div>

              <div className={styles.bentoFooter}>
                <div className={styles.capChips}>
                  <span>Web Platforms</span>
                  <span>Custom CRM</span>
                  <span>Zero Bloat</span>
                </div>
                <Link to="/website-development" className={styles.capLink}>
                  <span>Explore Development</span>
                  <FaArrowRight size={11} />
                </Link>
              </div>
            </TiltCard>

            {/* Bento Card 3: Grow & SEO (Bottom-Left 7-col) */}
            <TiltCard className={`${styles.bentoCard} ${styles.bentoCardGrow}`}>
              <div className={styles.bentoHeader}>
                <div className={styles.capHead}>
                  <div className={styles.capIcon}><FaChartLine size={18} /></div>
                  <span className={styles.bentoTag}>VISIBILITY · GROWTH</span>
                </div>
                <div className={styles.ratingBadge}>
                  <span className={styles.ratingStars}>★★★★★</span>
                  <span className={styles.ratingScore}>4.9/5</span>
                </div>
              </div>

              <h3 className={styles.bentoTitle}>Targeted SEO &amp; Organic Discovery</h3>
              <p className={styles.bentoDesc}>
                Targeted Google SEO, Google Business Profiles, editorial content architecture, and qualified organic customer acquisition.
              </p>

              {/* Interactive Google Search Snippet Widget */}
              <div className={styles.bentoSearchWidget}>
                <div className={styles.searchHead}>
                  <FaSearch size={11} color="#dfa840" />
                  <span className={styles.searchUrl}>veltalabs.net › custom-software</span>
                </div>
                <div className={styles.searchTitle}>VeltaZ — Bespoke Web Platforms &amp; Automations</div>
                <div className={styles.searchSnippetText}>#1 Ranking keyword visibility · 3.2× verified organic enquiry growth.</div>
              </div>

              <div className={styles.bentoFooter}>
                <div className={styles.capChips}>
                  <span>Google SEO</span>
                  <span>Content Strategy</span>
                  <span>High Authority</span>
                </div>
                <Link to="/seo-blogging-google-business-profile" className={styles.capLink}>
                  <span>Explore SEO &amp; Content</span>
                  <FaArrowRight size={11} />
                </Link>
              </div>
            </TiltCard>

            {/* Bento Card 4: Automate (WhatsFlow - Bottom-Right 5-col) */}
            <TiltCard className={`${styles.bentoCard} ${styles.bentoCardAuto}`}>
              <div className={styles.bentoHeader}>
                <div className={styles.capHead}>
                  <div className={styles.capIcon}><FaCogs size={18} /></div>
                  <span className={styles.bentoTag}>WHATSFLOW · AUTOMATE</span>
                </div>
                <span className={styles.statusLivePill}>Active Webhooks</span>
              </div>

              <h3 className={styles.bentoTitle}>WhatsFlow &amp; Workflow Engines</h3>
              <p className={styles.bentoDesc}>
                Practical lead-management setups, n8n webhook automations, WhatsApp qualifiers, and zero manual data re-entry.
              </p>

              {/* Interactive WhatsApp Router Widget */}
              <div className={styles.bentoWhatsappWidget}>
                <div className={styles.waHeader}>
                  <FaWhatsapp size={15} color="#25D366" />
                  <span>Meta Cloud API · 120ms ping</span>
                </div>
                <div className={styles.waChatBubble}>
                  <p className={styles.waChatText}>🔔 <strong>New Client Lead Captured:</strong></p>
                  <p className={styles.waChatSub}>Auto-synced into CRM pipeline &amp; assigned to builder.</p>
                </div>
              </div>

              <div className={styles.bentoFooter}>
                <div className={styles.capChips}>
                  <span>WhatsApp CRM</span>
                  <span>Webhook Sync</span>
                </div>
                <Link to="/automation-systems" className={styles.capLink}>
                  <span>Explore Automation</span>
                  <FaArrowRight size={11} />
                </Link>
              </div>
            </TiltCard>
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
                  <motion.div
                    whileHover={{ y: -3, scale: 1.015 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={styles.scopeCard}
                  >
                    <div className={styles.scopeIconWrap}><FaLaptopCode size={14} /></div>
                    <div>
                      <strong>Property Search Portal</strong>
                      <p>Custom search filters, property listings, and responsive mobile layout.</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3, scale: 1.015 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={styles.scopeCard}
                  >
                    <div className={styles.scopeIconWrap}><FaWhatsapp size={14} /></div>
                    <div>
                      <strong>WhatsFlow Lead Routing</strong>
                      <p>Inbound lead capture, team member assignment, and fast WhatsApp response times.</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3, scale: 1.015 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={styles.scopeCard}
                  >
                    <div className={styles.scopeIconWrap}><FaSearch size={14} /></div>
                    <div>
                      <strong>GBP & Local SEO</strong>
                      <p>Targeted Pune keywords, listing structured data, and verified business profile.</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3, scale: 1.015 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={styles.scopeCard}
                  >
                    <div className={styles.scopeIconWrap}><FaPenNib size={14} /></div>
                    <div>
                      <strong>Brand & Content Studio</strong>
                      <p>Clean visual identity, property photography, and social media reels.</p>
                    </div>
                  </motion.div>
                </div>

                <div className={styles.caseStudyActions}>
                  <Link to="/kin-property" className="btn btn-primary">
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

      {/* ── 5. REAL PRODUCTS & SYSTEMS (INTERACTIVE APP SHOWCASE) ── */}
      <section className={styles.productsSection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            {/* Draggable Star for Interactive Flair */}
            <DraggableSparkle size={24} rotate={20} style={{ top: -14, right: '8%' }} />

            <div className={styles.sectionEyebrowWrap}>
              <span className={styles.sectionEyebrowLine} />
              <div className={styles.sectionEyebrowPill}>REAL PROBLEMS · ENGINEERED SOLUTIONS</div>
              <span className={styles.sectionEyebrowLine} />
            </div>
            <h2 className={styles.sectionTitle}>Real Operational Problems We Solved.</h2>
            <p className={styles.sectionSub}>Software shouldn't be abstract. Here is how VeltaZ diagnosed real business bottlenecks and built production systems to eliminate them.</p>
          </div>

          <div className={styles.productsGrid}>
            {PRACTICAL_PRODUCTS.map((product) => {
              const Icon = product.icon
              return (
                <div
                  key={product.id}
                  className={styles.productInfoCard}
                >
                  {/* Glowing Top Accent Bar */}
                  <div className={styles.cardAccentLine} aria-hidden="true" />

                  {/* Top Bar with Icon & Status */}
                  <div className={styles.infoCardTopBar}>
                    <div className={styles.infoBrandWrap}>
                      <div className={styles.infoIconPod}>
                        <Icon size={20} />
                      </div>
                      <div className={styles.infoTitleBlock}>
                        <h3 className={styles.infoTitle}>{product.title}</h3>
                        <span className={styles.infoBadgePill}>{product.badge}</span>
                      </div>
                    </div>
                    <span className={styles.infoStatusDot}>
                      <span className={styles.statusPulseDot} /> {product.status}
                    </span>
                  </div>

                  {/* 1. The Bottleneck Faced */}
                  <div className={styles.problemCardBlock}>
                    <div className={styles.blockEyebrowRow}>
                      <span className={styles.problemBadge}>
                        <span className={styles.problemDot} /> THE BOTTLENECK FACED
                      </span>
                    </div>
                    <p className={styles.problemBodyText}>{product.problem}</p>
                  </div>

                  {/* 2. How VeltaZ Solved It */}
                  <div className={styles.solutionCardBlock}>
                    <div className={styles.blockEyebrowRow}>
                      <span className={styles.solutionBadge}>
                        <span className={styles.solutionDot} /> HOW VELTAZ SOLVED IT
                      </span>
                    </div>
                    <div className={styles.solutionList}>
                      {product.solutions.map((item, idx) => (
                        <div key={idx} className={styles.solutionItem}>
                          <div className={styles.solutionIconPod}>
                            <FaCheck size={8.5} />
                          </div>
                          <div className={styles.solutionItemText}>
                            <strong className={styles.solutionItemLabel}>{item.label}:</strong>{' '}
                            <span className={styles.solutionItemDesc}>{item.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Action Link Footer */}
                  <Link to={product.link} className={styles.infoActionFooter}>
                    <span className={styles.actionBtnText}>Explore Architecture</span>
                    <div className={styles.actionArrowCircle}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CLIENT FIT & PARTNERSHIPS ── */}
      <section className={styles.teamSection}>
        <div className="container">
          <div className={styles.fitContainer}>
            <div className={styles.sectionHeaderCentered}>
              <div className={styles.sectionEyebrowWrap}>
                <span className={styles.sectionEyebrowLine} />
                <div className={styles.sectionEyebrowPill}>CLIENT FIT &amp; PARTNERSHIPS</div>
                <span className={styles.sectionEyebrowLine} />
              </div>
              <h2 className={styles.sectionTitle}>Built for Businesses Ready to Move Forward.</h2>
              <p className={styles.sectionSub}>
                We partner with ambitious teams to engineer digital infrastructure, eliminate operational friction, and build dependable systems.
              </p>
            </div>

            <div className={styles.fitCardsGrid}>
              {/* Card 1: Founders */}
              <TiltCard className={styles.fitCard}>
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
              </TiltCard>

              {/* Card 2: Growing Companies */}
              <TiltCard className={styles.fitCard}>
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
              </TiltCard>

              {/* Card 3: Service Practices */}
              <TiltCard className={styles.fitCard}>
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
              </TiltCard>
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

            <div className={styles.sectionEyebrowWrap}>
              <span className={styles.sectionEyebrowLine} />
              <div className={styles.sectionEyebrowPill}>START A CONVERSATION</div>
              <span className={styles.sectionEyebrowLine} />
            </div>
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
              <motion.a
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
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
              </motion.a>

              {/* Channel 2: Services & Audit */}
              <motion.div
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                style={{ display: 'flex' }}
              >
                <Link to="/services" className={styles.channelCard} style={{ width: '100%' }}>
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
              </motion.div>
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
