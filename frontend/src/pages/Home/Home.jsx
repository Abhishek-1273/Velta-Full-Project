import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PendulumHero from '../../components/PendulumHero/PendulumHero.jsx'
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

// Featured Builds & Systems (Exact match to reference design: WhatsFlow, Docket14, KIN Property)
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

// High-Performance Spring Number Ticker Component (Magic UI Pattern)
function NumberTicker({ value, decimals = 0, suffix = '', prefix = '' }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    let observer
    let startTimestamp
    const duration = 1600
    const target = parseFloat(value)

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const current = easedProgress * target
      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setDisplayValue(target)
      }
    }

    if (ref.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            requestAnimationFrame(step)
            observer.disconnect()
          }
        },
        { threshold: 0.25 }
      )
      observer.observe(ref.current)
    }

    return () => observer?.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  )
}

// 4 Distinct Luxury Vector Geometries (Zero Emojis)
const SparkleVectorShape = ({ type }) => {
  switch (type) {
    case 0:
      // 1. Classic 4-Point Concave Diamond Star
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
          <path
            d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z"
            fill="#ffd700"
          />
          <path
            d="M12 4 C12 8 16 12 20 12 C16 12 12 16 12 20 C12 16 8 12 4 12 C8 12 12 8 12 4 Z"
            fill="#ffffff"
            opacity="0.9"
          />
        </svg>
      )
    case 1:
      // 2. 8-Point Cosmic Star (4 Major Beams + 4 Diagonal Rays)
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
          <path
            d="M12 4 L14 10 L20 12 L14 14 L12 20 L10 14 L4 12 L10 10 Z"
            fill="#dfa840"
            opacity="0.7"
            transform="rotate(45 12 12)"
          />
          <path
            d="M12 1 L14.5 9.5 L23 12 L14.5 14.5 L12 23 L9.5 14.5 L1 12 L9.5 9.5 Z"
            fill="#ffd700"
          />
          <circle cx="12" cy="12" r="3.2" fill="#ffffff" />
        </svg>
      )
    case 2:
      // 3. Starlight Flare Cross with Halo
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
          <line x1="12" y1="0" x2="12" y2="24" stroke="#ffd700" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="0" y1="12" x2="24" y2="12" stroke="#ffd700" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="5.5" fill="rgba(255, 215, 0, 0.35)" />
          <circle cx="12" cy="12" r="2.8" fill="#ffffff" />
        </svg>
      )
    default:
      // 4. Shimmering Specular Golden Orb
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
          <circle cx="12" cy="12" r="8" fill="rgba(223, 168, 64, 0.3)" />
          <circle cx="12" cy="12" r="5" fill="#ffd700" />
          <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
        </svg>
      )
  }
}

export default function Home() {
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)
  const [isGrowthActive, setIsGrowthActive] = useState(false)
  const [sparkles, setSparkles] = useState([])

  const triggerProfessionalSparkles = () => {
    const count = 40
    const newSparkles = Array.from({ length: count }, (_, i) => {
      // 360 degree radial spread with subtle natural jitter
      const angle = (i / count) * 2 * Math.PI + (Math.random() - 0.5) * 0.45
      // Massive cinematic distance: 300px to 800px so sparkles glide smoothly far across the screen
      const distance = 300 + Math.random() * 500
      const size = 10 + Math.random() * 8 // Crisp, elegant smaller size (10px to 18px)
      const type = i % 4 // Alternate through the 4 distinct luxury shapes
      return {
        id: Date.now() + i + Math.random(),
        type,
        size,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * (distance * 0.68),
        scale: Math.random() * 0.35 + 0.75, // Subtle, refined scaling
        rotate: (Math.random() - 0.5) * 220, // Gentle, silky drift rotation
      }
    })
    setSparkles(newSparkles)
    setTimeout(() => setSparkles([]), 1950)
  }

  const handleToggleGrowth = () => {
    setIsGrowthActive((prev) => {
      const next = !prev
      // Only fire sparkles when turning ON (never when turning OFF)
      if (next) {
        triggerProfessionalSparkles()
      }
      return next
    })
  }

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

  // ReactBits Spotlight Mouse Coordinates on Service Cards
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
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
    // Eagerly prefetch alternate landscapes so switching themes never pops or stutters
    const imgLight = new Image()
    imgLight.src = 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958357/hero-landscape_vsrmmk.png'
    const imgDark = new Image()
    imgDark.src = 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1794378243/hero-landscape_sqqzzt.png'
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
        {/* Background Image Layer (Day & Real Night Version) */}
        <div className={styles.heroBackdropWrap}>
          <img
            src="https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958357/hero-landscape_vsrmmk.png"
            alt="VeltaZ Scenic Day Landscape"
            decoding="async"
            className={`${styles.heroBackdropImg} ${styles.heroImgLight}`}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <img
            src="https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1794378243/hero-landscape_sqqzzt.png"
            alt="VeltaZ Scenic Night Landscape"
            decoding="async"
            className={`${styles.heroBackdropImg} ${styles.heroImgDark}`}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div className={styles.heroContent}>
            {/* Ambient Breathing Gold Mesh Glow */}
            <div className={styles.heroAmbientGlow} aria-hidden="true" />

            {/* Minimalist Uppercase Eyebrow with Telemetry Pulse Dot */}
            <motion.div
              className={styles.heroEyebrow}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span>STRATEGY, TECHNOLOGY &amp; AUTOMATION</span>
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
                <span className={styles.titleTextMain}>We build systems</span>
                <span className={styles.titleTextForGroup}>
                  <span>for</span>
                  <motion.span
                    className={styles.heroArrowPill}
                    whileHover={{ scale: 1.15, rotate: 45 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </motion.span>
                </span>
              </motion.div>

              {/* Line 2: gr [TOGGLE] wth */}
              <motion.div
                className={styles.titleLineTwo}
                initial={{ opacity: 0, scale: 0.95, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
              >
                <div className={`${styles.growthWord} ${isGrowthActive ? styles.growthWordActive : ''}`}>
                  <span className={styles.growthText}>gr</span>
                  {/* Interactive 3D Toggle Pill for "o" */}
                  <div className={styles.toggleOuterWrap}>
                    <button
                      type="button"
                      className={`${styles.growthToggle} ${isGrowthActive ? styles.growthToggleActive : ''}`}
                      onClick={handleToggleGrowth}
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

                    {/* Professional Luxury Vector Diamond Sparkles (Zero Emojis, 4 Distinct Shapes) */}
                    <AnimatePresence>
                      {sparkles.map((s) => (
                        <motion.span
                          key={s.id}
                          className={styles.sparkleParticle}
                          style={{ width: s.size, height: s.size }}
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0.9, 0], 
                            scale: [0, s.scale * 1.15, s.scale * 0.95, 0], 
                            x: s.x, 
                            y: s.y, 
                            rotate: s.rotate 
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ 
                            duration: 1.85, 
                            ease: [0.22, 1, 0.36, 1],
                            opacity: { duration: 1.85, times: [0, 0.12, 0.72, 1], ease: 'easeInOut' },
                            scale: { duration: 1.85, times: [0, 0.15, 0.75, 1], ease: [0.22, 1, 0.36, 1] },
                          }}
                        >
                          <SparkleVectorShape type={s.type} />
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
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
                <motion.svg
                  className={styles.cursorIcon}
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                >
                  <path d="M4 2l12 11.5-5.2.7 3.2 6.8-2.6 1.2-3.2-6.8L4 18.5V2z" />
                </motion.svg>
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

            {/* CTAs with Magic UI Shimmer & Physics Spring */}
            <motion.div
              className={styles.heroCta}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
            >
              <motion.div 
                whileHover={{ scale: 1.04, y: -2 }} 
                whileTap={{ scale: 0.97 }} 
                transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                style={{ display: 'inline-block' }}
              >
                <Link to="/contact" className={styles.btnEstimate}>
                  <span className={styles.btnShimmerWave} aria-hidden="true" />
                  <span className={styles.btnContentWrap}>
                    <span>Discuss Your Business</span>
                    <span className={styles.btnArrow}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.04, y: -1 }} 
                whileTap={{ scale: 0.97 }} 
                transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                style={{ display: 'inline-block' }}
              >
                <Link to="/about" className={styles.linkMoreAbout}>
                  <span>More about us</span>
                  <span className={styles.linkMoreArrow}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
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
                onMouseMove={handleCardMouseMove}
                onClick={(e) => {
                  if (didDrag) e.preventDefault()
                }}
              >
                {/* ReactBits Spotlight Surface Glow */}
                <div className={styles.serviceCardSpotlight} aria-hidden="true" />

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
            <div className={styles.methodEyebrowWrap}>
              <span className={styles.methodEyebrowLine} />
              <div className={styles.methodEyebrowPill}>WHAT WE DO</div>
              <span className={styles.methodEyebrowLine} />
            </div>
            <h2 className={styles.resultsTitle}>
              One Partner.<br />
              <span className={styles.resultsConnectedLine}>Connected Capabilities.</span>
            </h2>
            <p className={styles.resultsSub}>
              Strategy, technology, content and automation working together, depending on what your business needs.
            </p>
          </div>

          <div className={styles.tagFlowContainer}>
            {/* Elegant Connecting S-Curve with Traveling Continuous Fading Gold Laser */}
            <svg className={styles.tagDashedSvg} viewBox="0 0 600 750" preserveAspectRatio="none">
              <defs>
                {/* Continuous Smooth Fading Mask along Motion Vector */}
                <linearGradient id="laserTailSmoothGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  {/* Farthest tail tip (-95px): completely transparent */}
                  <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                  <stop offset="15%" stopColor="#ffffff" stopOpacity="0.08" />
                  <stop offset="35%" stopColor="#ffffff" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="#ffffff" stopOpacity="0.55" />
                  <stop offset="85%" stopColor="#ffffff" stopOpacity="0.88" />
                  {/* Head (0px): full 100% solid opacity */}
                  <stop offset="94%" stopColor="#ffffff" stopOpacity="1" />
                  {/* Crisp cutoff right in front of head (+4px) */}
                  <stop offset="98%" stopColor="#000000" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>

                <mask id="laserTailMask" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="750">
                  <g>
                    <animateMotion
                      dur="3.8s"
                      repeatCount="indefinite"
                      rotate="auto"
                      path="M 430,70 C 250,140 180,210 170,270 C 160,350 420,390 430,470 C 440,550 180,590 170,660"
                    />
                    <rect
                      x="-95"
                      y="-30"
                      width="105"
                      height="60"
                      fill="url(#laserTailSmoothGrad)"
                    />
                  </g>
                </mask>
              </defs>

              {/* 1. Base Subtle Guide Track (Completely Untouched) */}
              <path
                d="M 430,70 C 250,140 180,210 170,270 C 160,350 420,390 430,470 C 440,550 180,590 170,660"
                className={styles.tagBaseTrack}
              />

              {/* 2. Traveling Gold Line with Continuous Smooth Fading Tail (Clean, No Blurry Glow) */}
              <path
                d="M 430,70 C 250,140 180,210 170,270 C 160,350 420,390 430,470 C 440,550 180,590 170,660"
                mask="url(#laserTailMask)"
                className={styles.smoothLaserBeam}
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
            <div className={styles.methodEyebrowWrap}>
              <span className={styles.methodEyebrowLine} />
              <div className={styles.methodEyebrowPill}>FEATURED BUILDS &amp; SYSTEMS</div>
              <span className={styles.methodEyebrowLine} />
            </div>

            <h2 className={styles.buildsTitle}>
              Built to move business <em>forward.</em>
            </h2>

            <p className={styles.buildsSubtitle}>
              Custom software, automation systems, and digital platforms that solve real business problems.
            </p>
          </motion.div>

          {/* Quick Switcher Tabs: WhatsFlow | Docket14 | KIN Property */}
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

            {/* Active Build Card with Smooth Slide & Fade Transition */}
            <AnimatePresence mode="wait">
              {(() => {
                const build = featuredBuilds[activeBuildIdx]
                return (
                  <motion.div
                    key={build.id}
                    className={styles.buildsCard}
                    initial={{ opacity: 0, x: 20, scale: 0.985 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.985 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    onMouseMove={(e) => {
                      const card = e.currentTarget
                      const rect = card.getBoundingClientRect()
                      const x = (e.clientX - rect.left) / rect.width - 0.5
                      const y = (e.clientY - rect.top) / rect.height - 0.5
                      card.style.setProperty('--card-tilt-x', `${-y * 5}deg`)
                      card.style.setProperty('--card-tilt-y', `${x * 5}deg`)
                    }}
                    onMouseLeave={(e) => {
                      const card = e.currentTarget
                      card.style.setProperty('--card-tilt-x', '0deg')
                      card.style.setProperty('--card-tilt-y', '0deg')
                    }}
                  >
                    {/* Left Column: Visual Mockup with 3D Depth Float */}
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
                        <div className={styles.buildsBrandIdentity}>
                          <span className={styles.buildsBrandName}>{build.brand}</span>
                          <span className={styles.buildsBrandDivider}>|</span>
                          <span className={styles.buildsBrandBadge}>{build.badge}</span>
                        </div>
                        <div className={styles.buildsLiveIndicator}>
                          <span className={styles.livePulseDot} />
                          <span>LIVE SYSTEM</span>
                        </div>
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

                      {/* Underlined Action Link with Bold Geometric Arrow */}
                      <div className={styles.buildsActionWrap}>
                        <Link to={build.link} className={styles.buildsActionLink}>
                          <span>Explore the system</span>
                          <span className={styles.buildsArrow}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )
              })()}
            </AnimatePresence>

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
            <div className={styles.methodEyebrowWrap}>
              <span className={styles.methodEyebrowLine} />
              <div className={styles.methodEyebrowPill}>CLIENT CASE STUDIES</div>
              <span className={styles.methodEyebrowLine} />
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
            whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
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
                  <div className={styles.featuredMetricVal}>
                    <NumberTicker value={3.2} decimals={1} suffix="×" />
                  </div>
                  <div className={styles.featuredMetricLabel}>qualified enquiries</div>
                </div>
                <div className={styles.featuredMetricDivider} />
                <div className={styles.featuredMetricItem}>
                  <div className={styles.featuredMetricVal}>
                    <NumberTicker value={42} decimals={0} suffix="%" />
                  </div>
                  <div className={styles.featuredMetricLabel}>faster lead response</div>
                </div>
              </div>

              <Link to="/kin-property" className={styles.caseStudyLink}>
                <span>Explore case study</span>
                <span className={styles.caseStudyArrow}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
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
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
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
                <Link to="/whatsflow" className={styles.caseStudyLink}>
                  <span>Explore case study</span>
                  <span className={styles.caseStudyArrow}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Docket14 */}
            <motion.div
              className={styles.companionCard}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
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
                <Link to="/docket14" className={styles.caseStudyLink}>
                  <span>Explore case study</span>
                  <span className={styles.caseStudyArrow}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
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
            {/* Horizontal Connecting Gold Line with Scroll Draw Animation */}
            <motion.div
              className={styles.methodConnectorLine}
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left center' }}
            />

            {/* 4 Cards Grid */}
            <div className={styles.methodCardsGrid}>
              {steps.map((p, i) => (
                <motion.div
                  key={p.num}
                  className={styles.methodCard}
                  initial={{ opacity: 0, y: 28, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.22, ease: 'easeOut' } }}
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

      {/* FINAL ENQUIRY CTA WITH SIGNATURE SEAMLESS PENDULUM REVEAL */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          {/* Boxless, Open Pendulum with cord originating right from the GET IN TOUCH pill */}
          <PendulumHero />

          <p className={styles.ctaSub} style={{ maxWidth: '640px', margin: '20px auto 0' }}>
            Tell us what you're working on, what isn't working or what you'd like to build. Let's explore a practical next step.
          </p>

          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }} 
            whileTap={{ scale: 0.97 }} 
            transition={{ type: 'spring', stiffness: 420, damping: 20 }}
            style={{ display: 'inline-block', marginTop: '24px' }}
          >
            <Link to="/contact" className={styles.ctaPrimaryBtn}>
              <span className={styles.btnShimmerWave} aria-hidden="true" />
              <span className={styles.btnContentWrap}>
                <span>Discuss Your Business</span>
                <span className={styles.btnArrow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
