import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Home.module.css'
import PhoneMockupBasic from '../../components/ui/phone-mockups-1'
import {
  HiOutlineCodeBracket,
  HiOutlineDevicePhoneMobile,
  HiOutlineCpuChip,
  HiOutlineArrowTrendingUp,
  HiOutlineFilm,
  HiOutlineRocketLaunch,
  HiOutlineSparkles,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineHome,
  HiOutlineSquare3Stack3D,
  HiOutlineBolt,
  HiPlay
} from 'react-icons/hi2'

// SEO (homepage only; previous values are restored on leave)
const SEO_TITLE = 'VeltaZ | Business Growth Through Strategy, Technology & Automation'
const SEO_DESC = 'VeltaZ helps businesses build digital solutions, strengthen their online presence and streamline operations through business strategy, technology, creative execution and automation.'

// Four core capabilities (tactile tag cards flow)
const capabilities = [
  {
    num: '01',
    title: 'Research',
    desc: 'Understand markets, competitors, customers and opportunities before committing time and resources.',
    to: '/services',
    rotate: 8,
    side: 'right',
  },
  {
    num: '02',
    title: 'Build',
    desc: 'Websites, mobile applications, web platforms and custom business systems built around real requirements.',
    to: '/website-development',
    rotate: -8,
    side: 'left',
  },
  {
    num: '03',
    title: 'Grow',
    desc: 'Strengthen how your business presents itself, publish content and reach potential customers through digital channels.',
    to: '/seo-blogging-google-business-profile',
    rotate: 6,
    side: 'right',
  },
  {
    num: '04',
    title: 'Automate',
    desc: 'Connect tools, streamline workflows and reduce repetitive operational tasks through appropriate automation.',
    to: '/automation-systems',
    rotate: -8,
    side: 'left',
  },
]

// What we offer — short service details (routes verified in router.jsx)
const offers = [
  {
    key: 'web', tab: 'Website Development', to: '/website-development',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958348/web_hzc7vw.png',
    badgeText: 'Full-Stack Web',
    badgeIcon: <HiOutlineCodeBracket />,
    tag: 'Web & Custom Admin Portals',
    desc: 'Business websites and web platforms designed around your goals.',
  },
  {
    key: 'app', tab: 'Mobile Applications', to: '/mobile-app-development',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958345/app_o6tanx.png',
    badgeText: 'iOS & Android',
    badgeIcon: <HiOutlineDevicePhoneMobile />,
    tag: 'iOS & Android Hybrid Apps',
    desc: 'iOS and Android applications built for high performance.',
  },
  {
    key: 'auto', tab: 'Automation Systems', to: '/automation-systems',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958345/automation_f7aea4.png',
    badgeText: '24/7 AI Auto',
    badgeIcon: <HiOutlineCpuChip />,
    tag: 'WhatsFlow & CRM Routing',
    desc: 'Connect lead channels and automate customer interactions.',
  },
  {
    key: 'seo', tab: 'SEO & Google Profile', to: '/seo-blogging-google-business-profile',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958346/seo_cqdvgi.png',
    badgeText: 'Organic Growth',
    badgeIcon: <HiOutlineArrowTrendingUp />,
    tag: 'Google Business Profile & SEO',
    desc: 'Improve how your business is discovered on Google.',
  },
  {
    key: 'social', tab: 'Social Media & Content', to: '/content',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958347/social_ztpaeg.png',
    badgeText: 'Studio Pro',
    badgeIcon: <HiOutlineFilm />,
    tag: 'Video, Reels & Brand Copy',
    desc: 'Consistent branding and content for Instagram & LinkedIn.',
  },
  {
    key: 'ads', tab: 'Performance Marketing', to: '/performance-marketing',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958347/performance_bwimbw.png',
    badgeText: 'Scalable ROI',
    badgeIcon: <HiOutlineRocketLaunch />,
    tag: 'Meta, Google & LinkedIn Ads',
    desc: 'High-ROI paid advertising campaigns engineered to scale revenue.',
  },
]

// How VeltaZ works (4-stage methodology with architectural visuals)
const steps = [
  {
    num: '01',
    phase: 'IMMERSION',
    title: 'Discover & Understand',
    desc: 'Deep-dive into business workflows, audience pain-points, and market opportunities to define clear requirements.',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958346/discover_oems3q.png'
  },
  {
    num: '02',
    phase: 'ARCHITECTURE',
    title: 'Scope & Plan',
    desc: 'Map out the technical architecture, design wireframes, and agree on practical milestone timelines before coding.',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958348/plan_mkxbts.png'
  },
  {
    num: '03',
    phase: 'PRODUCTION',
    title: 'Engineer & Deploy',
    desc: 'Develop the agreed web, app, content, or automation systems with clean modular code, rigorous testing, and QA.',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958346/deploy_jbe2mq.png'
  },
  {
    num: '04',
    phase: 'OPTIMIZATION',
    title: 'Scale & Improve',
    desc: 'Analyze live performance data, gather client insights, and deploy continuous enhancements to scale results.',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958345/scale_jpxtan.png'
  },
]

// KIN case study — only what VeltaZ can state accurately.
const kinScope = [
  { title: 'Real-estate website', desc: 'A website for presenting the business and its properties online.' },
  { title: 'Digital presence', desc: 'Work on how the business shows up to potential customers online.' },
  { title: 'Content', desc: 'Content created to support the website and the brand.' },
  { title: 'Lead-management workflows', desc: 'Workflows for handling and following up on enquiries.' },
]

// Featured Builds & Systems (Exact match to reference design: WhatsFlow, Docket14, Me & Mine)
const featuredBuilds = [
  {
    id: 'whatsflow',
    brand: 'WhatsFlow',
    badge: 'LEAD AUTOMATION',
    headlineLead: 'Every conversation.',
    headlineSub: 'A smarter next step.',
    desc: 'An automated lead capture & CRM system that turns WhatsApp conversations into organized, actionable leads.',
    link: '/whatsflow',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958348/whatsflow_che1la.png',
    specs: [
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.178-8-12.356-8-5.096 0-5.096 8 0 8 5.178 0 7.261-8 12.356-8Z" />
          </svg>
        ),
        label: 'Meta Cloud API'
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
          </svg>
        ),
        label: 'Instant Webhooks'
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 2 10 5.5-10 5.5L2 7.5 12 2Z" />
            <path d="m2 12 10 5.5 10-5.5" />
            <path d="m2 16.5 10 5.5 10-5.5" />
          </svg>
        ),
        label: 'Automated\nLead Routing'
      }
    ]
  },
  {
    id: 'docket14',
    brand: 'Docket14',
    badge: 'LEGAL SAAS',
    headlineLead: 'Case management built',
    headlineSub: 'for modern litigation.',
    desc: 'A unified platform for legal advocates to track court dates, manage client document vaults, and streamline daily practice.',
    link: '/docket14',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958347/docket14_kt5kfl.png',
    specs: [
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="M7 21h10" />
            <path d="M12 3v18" />
            <path d="M3 7h18" />
          </svg>
        ),
        label: 'Court\nHearing Sync'
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          </svg>
        ),
        label: 'Client\nDocument Vault'
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="12" x="3" y="4" rx="2" />
            <line x1="2" x2="22" y1="20" y2="20" />
          </svg>
        ),
        label: 'Web &\nMobile Ready'
      }
    ]
  },
  {
    id: 'kin-property',
    brand: 'KIN Property',
    badge: 'REAL ESTATE PLATFORM',
    headlineLead: 'Property management,',
    headlineSub: 'streamlined.',
    desc: 'A dedicated platform engineered to showcase premium properties, capture buyer enquiries, and streamline operations.',
    link: '/kin-property',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958347/kin_igcfcn.png',
    specs: [
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        ),
        label: 'Property\nListings'
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ),
        label: 'High-Intent\nDiscovery'
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
          </svg>
        ),
        label: 'Lead\nManagement'
      }
    ]
  }
]

export default function Home() {
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)
  const [isGrowthActive, setIsGrowthActive] = useState(false)
  const prevBuild = () => setActiveBuildIdx((i) => (i - 1 + featuredBuilds.length) % featuredBuilds.length)
  const nextBuild = () => setActiveBuildIdx((i) => (i + 1) % featuredBuilds.length)

  const carouselRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)
  const isPausedRef = useRef(false)
  const animFrameRef = useRef(null)

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollStartRef = useRef(0)
  const [didDrag, setDidDrag] = useState(false)
  const resumeTimerRef = useRef(null)

  const handleMouseDown = (e) => {
    const el = carouselRef.current
    if (!el) return
    isDraggingRef.current = true
    setDidDrag(false)
    setIsPaused(true)
    startXRef.current = e.pageX - el.offsetLeft
    scrollStartRef.current = el.scrollLeft
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return
    const el = carouselRef.current
    if (!el) return
    e.preventDefault()
    const x = e.pageX - el.offsetLeft
    const walk = (x - startXRef.current) * 1.3
    if (Math.abs(walk) > 4) {
      setDidDrag(true)
    }
    el.scrollLeft = scrollStartRef.current - walk

    // Wrap around for infinite loop
    const cards = el.querySelectorAll(`.${styles.serviceCard}`)
    if (cards.length >= offers.length * 2) {
      const oneSetWidth = cards[offers.length].offsetLeft - cards[0].offsetLeft
      if (oneSetWidth > 0) {
        if (el.scrollLeft >= oneSetWidth * 2) {
          el.scrollLeft -= oneSetWidth
          scrollStartRef.current -= oneSetWidth
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += oneSetWidth
          scrollStartRef.current += oneSetWidth
        }
      }
    }
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false)
      setDidDrag(false)
    }, 1200)
  }

  const handleWheel = () => {
    setIsPaused(true)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 1200)
  }

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  // Continuous infinite gliding train (seamless circle loop)
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return

    let lastTime = performance.now()
    const speed = 36 // continuous smooth gliding speed (pixels per second)
    let cachedSetWidth = 0

    const updateSetWidth = () => {
      if (!el) return
      const cards = el.querySelectorAll(`.${styles.serviceCard}`)
      if (cards.length >= offers.length * 2) {
        cachedSetWidth = cards[offers.length].offsetLeft - cards[0].offsetLeft
      }
    }

    // Measure initially and on window resize
    updateSetWidth()
    window.addEventListener('resize', updateSetWidth)

    const tick = (now) => {
      const delta = (now - lastTime) / 1000
      lastTime = now

      if (!isPausedRef.current && el && cachedSetWidth > 0) {
        el.scrollLeft += speed * delta
        if (el.scrollLeft >= cachedSetWidth) {
          el.scrollLeft -= cachedSetWidth
        }
      }
      animFrameRef.current = requestAnimationFrame(tick)
    }

    animFrameRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', updateSetWidth)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  useEffect(() => {
    const prevTitle = document.title
    let meta = document.querySelector('meta[name="description"]')
    const created = !meta
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta) }
    const prevDesc = meta.getAttribute('content')
    document.title = SEO_TITLE
    meta.setAttribute('content', SEO_DESC)
    return () => {
      document.title = prevTitle
      if (created) meta.remove(); else meta.setAttribute('content', prevDesc ?? '')
    }
  }, [])

  const scrollToWork = (e) => {
    const el = document.getElementById('work')
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={styles.page}>

      {/* MODERN TYPOGRAPHY HERO (INSPIRED BY REFERENCE) */}
      <section className={styles.hero}>
        {/* Optional Background Image Layer */}
        <div className={styles.heroBackdropWrap}>
          <img
            src="https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958357/hero-landscape_vsrmmk.png"
            alt=""
            decoding="async"
            className={styles.heroBackdropImg}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className={styles.heroBackdropOverlay} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div className={styles.heroContent}>
            {/* Minimalist Uppercase Eyebrow */}
            <motion.div
              className={styles.heroEyebrow}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              STRATEGY, TECHNOLOGY &amp; AUTOMATION
            </motion.div>

            {/* Typography Masterpiece Headline */}
            <div className={styles.heroTitleGroup}>
              {/* Line 1: We build systems for ↗ */}
              <motion.div
                className={styles.titleLineOne}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
              >
                <span>We build systems for</span>
                <span className={styles.heroArrowPill}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </motion.div>

              {/* Line 2: gr [TOGGLE] wth */}
              <motion.div
                className={styles.titleLineTwo}
                initial={{ opacity: 0, scale: 0.95, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
              >
                <div className={styles.growthWord}>
                  <span className={styles.growthText}>gr</span>
                  {/* Interactive 3D Toggle Pill for "o" */}
                  <button
                    type="button"
                    className={`${styles.growthToggle} ${isGrowthActive ? styles.growthToggleActive : ''}`}
                    onClick={() => setIsGrowthActive(!isGrowthActive)}
                    style={{ justifyContent: isGrowthActive ? 'flex-end' : 'flex-start' }}
                    aria-label="Toggle Growth Mode"
                    title="Click to toggle growth mode"
                  >
                    <motion.span
                      layout
                      className={styles.toggleThumb}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                  <span className={styles.growthText}>wth</span>
                </div>
              </motion.div>

              {/* Line 3: ↖ of your business */}
              <motion.div
                className={styles.titleLineThree}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24 }}
              >
                <svg className={styles.cursorIcon} width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 2l12 11.5-5.2.7 3.2 6.8-2.6 1.2-3.2-6.8L4 18.5V2z" />
                </svg>
                <span>of your business</span>
              </motion.div>
            </div>

            {/* Subtitle */}
            <motion.p
              className={styles.heroSub}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              We turn ambitious ideas into high-performance software, custom platforms and automated workflows engineered to scale.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className={styles.heroCta}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
            >
              <Link to="/contact" className={styles.btnEstimate}>
                Discuss Your Business
              </Link>
              <Link to="/about" className={styles.linkMoreAbout}>
                More about us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DEDICATED MOCKUP SECTION DIRECTLY BELOW HERO */}
      <section className={styles.mockupSection} style={{ overflow: 'hidden', width: '100%' }}>
        <div style={{ position: 'relative', zIndex: 10, width: '100%', margin: 0, padding: 0 }}>
          <motion.div
            className={styles.heroMockupStage}
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%' }}
          >
            <div className={styles.mockupGlow} />
            <div className={styles.mockupInner} style={{ width: '100%' }}>
              <div style={{ width: '100%' }}>
                <PhoneMockupBasic />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE SERVICES CAROUSEL (EXACT MATCH TO REFERENCE) */}
      <section className={styles.servicesCarouselSection}>
        <div className="container">
          <div className={styles.carouselHeader}>
            <div className={styles.carouselHeaderLeft}>
              <h2 className={styles.carouselTitle}>Core Capabilities</h2>
              <p className={styles.carouselSub}>
                High-performance digital solutions engineered to scale your business
              </p>
            </div>
          </div>

          <div
            ref={carouselRef}
            className={styles.carouselTrack}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              if (!isDraggingRef.current) setIsPaused(false)
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => {
              if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
              resumeTimerRef.current = setTimeout(() => setIsPaused(false), 1200)
            }}
            onWheel={handleWheel}
          >
            {[...offers, ...offers, ...offers].map((s, idx) => (
              <Link
                key={`${s.key}-${idx}`}
                to={s.to}
                className={styles.serviceCard}
                onClick={(e) => {
                  if (didDrag) e.preventDefault()
                }}
              >
                <div className={styles.serviceCardImgWrap}>
                  <img
                    src={s.img}
                    alt={s.tab}
                    className={styles.serviceCardImg}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>

                <div className={styles.serviceCardBody}>
                  <div className={styles.serviceCardHeader}>
                    <h3 className={styles.serviceCardTitle}>{s.tab}</h3>
                    <span className={styles.serviceCardBadge}>
                      <span className={styles.badgeIconWrap}>{s.badgeIcon}</span>
                      <span>{s.badgeText}</span>
                    </span>
                  </div>

                  <p className={styles.serviceCardTag}>
                    <HiOutlineSparkles className={styles.serviceCardTagIcon} />
                    <span>{s.tag}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TACTILE RESULTS / CAPABILITIES FLOW (EXACT MATCH TO REFERENCE) */}
      <section className={styles.resultsSection}>
        <div className="container">
          <div className={styles.resultsHeader}>
            <span className="tag">What We Do</span>
            <h2 className={styles.resultsTitle}>
              One Partner.<br />
              <span className={styles.resultsConnectedLine}>Connected Capabilities.</span>
            </h2>
            <p className={styles.resultsSub}>
              Strategy, technology, content and automation working together, depending on what your business needs.
            </p>
          </div>

          <div className={styles.tagFlowContainer}>
            {/* Dashed Connecting S-Curve Line */}
            <svg className={styles.tagDashedSvg} viewBox="0 0 600 750" preserveAspectRatio="none">
              <path
                d="M 430,70 C 250,140 180,210 170,270 C 160,350 420,390 430,470 C 440,550 180,590 170,660"
                className={styles.tagDashedPath}
              />
            </svg>

            {capabilities.map((c) => (
              <div
                key={c.num}
                className={`${styles.tagCardItem} ${c.side === 'right' ? styles.tagItemRight : styles.tagItemLeft}`}
              >
                <motion.div
                  className={styles.tactileTagCard}
                  initial={{ opacity: 0, y: 30, rotate: c.rotate }}
                  whileInView={{ opacity: 1, y: 0, rotate: c.rotate }}
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ scale: 1.05, rotate: 0, y: -6 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={styles.tagEyelet} />
                  <div className={styles.tagInnerDisplay}>
                    <span className={styles.tagNum}>{c.num}</span>
                    <h3 className={styles.tagTitle}>{c.title}</h3>
                    <p className={styles.tagDesc}>{c.desc}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BUILDS & SYSTEMS (EXACT MATCH TO REFERENCE DESIGN) */}
      <section id="work" className={styles.buildsSection}>
        <div className="container">
          {/* Header */}
          <motion.div
            className={styles.buildsHeader}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.buildsEyebrow}>
              <span className={styles.buildsEyebrowLine} />
              <span>FEATURED BUILDS & SYSTEMS</span>
              <span className={styles.buildsEyebrowLine} />
            </div>

            <h2 className={styles.buildsTitle}>
              Built to move business <em>forward.</em>
            </h2>

            <p className={styles.buildsSubtitle}>
              Custom software, automation systems, and digital platforms that solve real business problems.
            </p>
          </motion.div>

          {/* Quick Switcher Tabs: WhatsFlow | Docket14 | Me & Mine */}
          <div className={styles.buildsTabsRow}>
            {featuredBuilds.map((b, idx) => (
              <button
                key={b.id}
                type="button"
                className={`${styles.buildsTabBtn} ${idx === activeBuildIdx ? styles.buildsTabBtnActive : ''}`}
                onClick={() => setActiveBuildIdx(idx)}
              >
                <span className={styles.buildsTabNum}>0{idx + 1}</span>
                <span className={styles.buildsTabName}>{b.brand}</span>
              </button>
            ))}
          </div>

          {/* Interactive Card Stage with Shifted Backing Plate */}
          <div className={styles.buildsStage}>
            {/* Shifted Warm Cream Backing Plate */}
            <div className={styles.buildsBackingPlate} />

            {/* Prev Arrow Button */}
            <button
              type="button"
              className={`${styles.buildsNavArrow} ${styles.buildsNavPrev}`}
              onClick={prevBuild}
              aria-label="Previous Build"
            >
              <HiChevronLeft className={styles.buildsNavArrowIcon} />
            </button>

            {/* Active Build Card */}
            {(() => {
              const build = featuredBuilds[activeBuildIdx]
              return (
                <div key={build.id} className={styles.buildsCard}>
                  {/* Left Column: Visual Mockup */}
                  <div className={styles.buildsVisualWrap}>
                    <img
                      src={build.img}
                      alt={build.brand}
                      className={styles.buildsVisualImg}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Right Column: Information & Specs */}
                  <div className={styles.buildsInfo}>
                    <div className={styles.buildsBrandRow}>
                      <span className={styles.buildsBrandName}>{build.brand}</span>
                      <span className={styles.buildsBrandDivider}>|</span>
                      <span className={styles.buildsBrandBadge}>{build.badge}</span>
                    </div>

                    <h3 className={styles.buildsHeadline}>
                      <span>{build.headlineLead}</span>
                      <br />
                      <span>{build.headlineSub}</span>
                    </h3>

                    <p className={styles.buildsDesc}>{build.desc}</p>

                    {/* 3 Specs with Gold Icons & Vertical Dividers */}
                    <div className={styles.buildsSpecsRow}>
                      {build.specs.map((spec, sIdx) => (
                        <div key={sIdx} className={styles.buildSpecItem}>
                          <div className={styles.buildSpecIcon}>{spec.icon}</div>
                          <div className={styles.buildSpecLabel}>{spec.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Underlined Action Link */}
                    <div className={styles.buildsActionWrap}>
                      <Link to={build.link} className={styles.buildsActionLink}>
                        Explore the system <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Next Arrow Button */}
            <button
              type="button"
              className={`${styles.buildsNavArrow} ${styles.buildsNavNext}`}
              onClick={nextBuild}
              aria-label="Next Build"
            >
              <HiChevronRight className={styles.buildsNavArrowIcon} />
            </button>
          </div>

          {/* Pagination Dots (Gold Pill Active) */}
          <div className={styles.buildsPagination}>
            {featuredBuilds.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`${styles.buildsDot} ${dotIdx === activeBuildIdx ? styles.buildsDotActive : ''}`}
                onClick={() => setActiveBuildIdx(dotIdx)}
                aria-label={`Go to build ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK / CASE STUDIES (EXACT MATCH TO REFERENCE) */}
      <section id="case-studies" className={styles.selectedWorkSection}>
        <div className="container">
          {/* Section Header */}
          <motion.div
            className={styles.selectedWorkHeader}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.selectedWorkEyebrow}>
              <span className={styles.eyebrowLine} />
              <span>CLIENT CASE STUDIES</span>
              <span className={styles.eyebrowLine} />
            </div>

            <h2 className={styles.selectedWorkTitle}>
              Client Case Studies &amp; Real Growth.
            </h2>

            <p className={styles.selectedWorkSubtitle}>
              Detailed case studies on how our engineered systems solve complex business challenges and drive measurable growth.
            </p>
          </motion.div>

          {/* Top Featured Card: KIN Property Management */}
          <motion.div
            className={styles.featuredCaseCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.featuredCaseImgWrap}>
              <img
                src="https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958347/kin-study_tl8ukk.png"
                alt="KIN Property Management Case Study"
                className={styles.featuredCaseImg}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className={styles.featuredCaseContent}>
              <span className={styles.caseCategoryTag}>REAL ESTATE • DIGITAL EXPERIENCE</span>
              <h3 className={styles.featuredCaseTitle}>KIN Property Management</h3>
              <p className={styles.featuredCaseDesc}>
                A modern property management platform to handle listings, enquiries, and client operations — all in one place.
              </p>

              <div className={styles.featuredCaseMetrics}>
                <div className={styles.featuredMetricItem}>
                  <div className={styles.featuredMetricVal}>3.2×</div>
                  <div className={styles.featuredMetricLabel}>qualified enquiries</div>
                </div>
                <div className={styles.featuredMetricDivider} />
                <div className={styles.featuredMetricItem}>
                  <div className={styles.featuredMetricVal}>42%</div>
                  <div className={styles.featuredMetricLabel}>faster lead response</div>
                </div>
              </div>

              <Link to="/kin-property" className={styles.caseStudyLink}>
                Explore case study <span>→</span>
              </Link>
            </div>
          </motion.div>

          {/* Bottom Dual Cards Grid: WhatsFlow & Docket14 */}
          <div className={styles.companionCardsGrid}>
            {/* Card 1: WhatsFlow */}
            <motion.div
              className={styles.companionCard}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.companionImgWrap}>
                <img
                  src="https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958348/whatsflow-study_lilmil.png"
                  alt="WhatsFlow Lead Automation Case Study"
                  className={styles.companionImg}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className={styles.companionContent}>
                <span className={styles.caseCategoryTag}>CONVERSION OPS • LEAD AUTOMATION</span>
                <h4 className={styles.companionTitle}>WhatsFlow Lead Automation</h4>
                <p className={styles.companionDesc}>
                  Automating multi-channel WhatsApp inquiries into structured CRM leads — eliminating response delays and dropped prospects.
                </p>
                <button type="button" disabled className={styles.caseStudyLinkDisabled}>
                  Explore case study <span>→</span>
                </button>
              </div>
            </motion.div>

            {/* Card 2: Docket14 */}
            <motion.div
              className={styles.companionCard}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.companionImgWrap}>
                <img
                  src="https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958347/docket-study_rcpqcm.png"
                  alt="Docket14 Legal Tech Case Study"
                  className={styles.companionImg}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className={styles.companionContent}>
                <span className={styles.caseCategoryTag}>LEGAL OPERATIONS • PRACTICE WORKFLOW</span>
                <h4 className={styles.companionTitle}>Docket14 Litigation Suite</h4>
                <p className={styles.companionDesc}>
                  Transitioning high-volume litigation practices from paper dockets to a synchronized digital calendar and secure vault.
                </p>
                <button type="button" disabled className={styles.caseStudyLinkDisabled}>
                  Explore case study <span>→</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW VELTAZ WORKS (EXACT MATCH METHODOLOGY REPLICA) */}
      <section className={styles.methodologySection} id="methodology">
        <div className="container">
          {/* Header */}
          <motion.div
            className={styles.methodHeader}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.methodEyebrowWrap}>
              <span className={styles.methodEyebrowLine} />
              <div className={styles.methodEyebrowPill}>OUR METHODOLOGY</div>
              <span className={styles.methodEyebrowLine} />
            </div>

            <h2 className={styles.methodTitle}>
              Think Clearly. Build Practically.
              <br />
              Scale <em>Continuously.</em>
            </h2>

            <p className={styles.methodSubtitle}>
              A structured 4-stage engineering lifecycle designed for speed, transparency and long-term business impact.
            </p>
          </motion.div>

          {/* Connected Cards Track */}
          <div className={styles.methodTrackWrapper}>
            {/* Horizontal Connecting Gold Line */}
            <div className={styles.methodConnectorLine} aria-hidden="true" />

            {/* 4 Cards Grid */}
            <div className={styles.methodCardsGrid}>
              {steps.map((p, i) => (
                <motion.div
                  key={p.num}
                  className={styles.methodCard}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <div className={styles.methodCardTop}>
                    <div className={styles.methodNumBadge}>{p.num}</div>
                    <div className={styles.methodPhasePill}>{p.phase}</div>
                  </div>

                  <h3 className={styles.methodCardTitle}>{p.title}</h3>
                  <p className={styles.methodCardDesc}>{p.desc}</p>

                  <div className={styles.methodCardImgWrap}>
                    <img
                      src={p.img}
                      alt={p.title}
                      className={styles.methodCardImg}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL ENQUIRY CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            className={styles.ctaBox}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2>Have a Business Challenge Worth Solving?</h2>
            <p>Tell us what you're working on, what isn't working or what you'd like to build. Let's explore a practical next step.</p>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} style={{ display: 'inline-block' }}>
              <Link to="/contact" className="btn btn-primary" style={{ padding: '14px 34px' }}>
                Let's Contact
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
