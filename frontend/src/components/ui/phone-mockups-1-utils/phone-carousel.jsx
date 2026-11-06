import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './phone-carousel.module.css'

// ── 9 FEATURE CARDS PER WHEEL (3 APPS × 3 CARDS WITH TITLE & SUBTITLE) ──
const leftIconsByApp = [
  // App 0: WhatsFlow (Lead CRM & WhatsApp Automation)
  [
    {
      id: 'wf-chat',
      title: 'WhatsApp Automation',
      desc: '24/7 instant lead capture',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
      ),
    },
    {
      id: 'wf-stack',
      title: 'Workflow Automation',
      desc: 'Auto-assign & team chats',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      id: 'wf-instant',
      title: 'Instant Lead Bot',
      desc: 'Zero response delays',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      ),
    },
  ],
  // App 1: Docket14 (Legal Tech SaaS Platform - Exact Match to Design!)
  [
    {
      id: 'd14-code',
      title: 'Custom Software',
      desc: 'Built for your business',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      id: 'd14-automation',
      title: 'Automation',
      desc: 'Save time, reduce effort',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      id: 'd14-scale',
      title: 'Scalable Solutions',
      desc: 'From idea to impact',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      ),
    },
  ],
  // App 2: KIN Property (Real Estate & Property Management Platform)
  [
    {
      id: 'kin-showcase',
      title: 'Property Showcase',
      desc: 'High-res listings & tours',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: 'kin-crm',
      title: 'Client Lead CRM',
      desc: 'Direct buyer enquiries',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'kin-booking',
      title: 'Instant Site Booking',
      desc: 'Schedule private visits',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ],
]

const rightIconsByApp = [
  // App 0: WhatsFlow
  [
    {
      id: 'wf-growth',
      title: 'Conversion Funnel',
      desc: 'Turn chats into sales',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: 'wf-meta',
      title: 'Meta Verified API',
      desc: 'Official cloud WhatsApp',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
    },
    {
      id: 'wf-instant',
      title: 'Instant Triggers',
      desc: 'Event-based actions',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
  ],
  // App 1: Docket14 (Exact Match to Design!)
  [
    {
      id: 'd14-growth',
      title: 'Business Growth',
      desc: 'Technology that delivers',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: 'd14-secure',
      title: 'Reliable & Secure',
      desc: 'Built with best practices',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      id: 'd14-support',
      title: 'Long-term Support',
      desc: 'We grow with you',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
  ],
  // App 2: KIN Property
  [
    {
      id: 'kin-conversion',
      title: 'High Buyer Intent',
      desc: 'Qualified property leads',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: 'kin-verified',
      title: 'Verified Portfolios',
      desc: 'Verified luxury real estate',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      id: 'kin-alerts',
      title: 'Automated Alerts',
      desc: 'Real-time property updates',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
  ],
]

// ── FULL 180° TRUE GEOMETRIC SEMI-CIRCLE WITH CARDS ──
const WHEEL_RADIUS = 185
const LEFT_CENTER = { x: 0, y: 220 }
const RIGHT_CENTER = { x: 280, y: 220 }
const CARD_WIDTH = 215
const CARD_HEIGHT = 48

export default function PhoneCarousel({ images }) {
  const [step, setStep] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const autoRef = useRef(null)
  const activeScrollRef = useRef(null)
  const n = images.length

  const activeIndex = ((step % n) + n) % n

  const startAuto = () => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setStep(prev => prev + 1)
    }, 4000)
  }

  // Auto-rotate effect controlled by hover status
  useEffect(() => {
    if (isHovered) {
      clearInterval(autoRef.current)
    } else {
      startAuto()
    }
    return () => clearInterval(autoRef.current)
  }, [isHovered, step])

  const isDraggingRef = useRef(false)
  const startYRef = useRef(0)
  const scrollTopRef = useRef(0)

  // Prevent parent window scroll when scrolling the active mobile screenshot, and reset scroll on slide change
  useEffect(() => {
    const el = activeScrollRef.current
    if (!el) return

    el.scrollTop = 0

    const handleWheel = (e) => {
      el.scrollTop += e.deltaY
      e.preventDefault()
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', handleWheel)
    }
  }, [activeIndex])

  // Fluid mouse drag-to-scroll on desktop
  useEffect(() => {
    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false
        if (activeScrollRef.current) {
          activeScrollRef.current.style.cursor = 'grab'
        }
      }
    }

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current || !activeScrollRef.current) return
      e.preventDefault()
      const deltaY = e.clientY - startYRef.current
      activeScrollRef.current.scrollTop = scrollTopRef.current - deltaY
    }

    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleMouseDown = (e) => {
    if (e.button !== 0 || !activeScrollRef.current) return
    isDraggingRef.current = true
    startYRef.current = e.clientY
    scrollTopRef.current = activeScrollRef.current.scrollTop
    activeScrollRef.current.style.cursor = 'grabbing'
  }

  const goTo = (targetIndex) => {
    setStep(prevStep => {
      const currentActive = ((prevStep % n) + n) % n
      const forwardDiff = (targetIndex - currentActive + n) % n
      return prevStep + forwardDiff
    })
    setIsHovered(false)
  }

  const prev = () => {
    setStep(prevStep => prevStep - 1)
    setIsHovered(false)
  }

  const next = () => {
    setStep(prevStep => prevStep + 1)
    setIsHovered(false)
  }

  const getSlot = (i) => {
    const diff = (i - activeIndex + n) % n
    if (diff === 0) return 'center'
    if (diff === 1) return 'right'
    if (diff === n - 1) return 'left'
    return 'hidden'
  }

  // ── CONTINUOUS MONOTONIC ROTATION (NEVER REVERSES BACKWARDS!) ──
  // User Requirement: Left circle rotates CLOCKWISE, Right circle rotates ANTI-CLOCKWISE
  // Continuous cumulative step ensures seamless forward looping with zero reverse rewinding!
  const leftWheelRotation = step * 120
  const rightWheelRotation = -step * 120

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.stageOrbitLayout}>

        {/* ── LEFT ROTATING WHEEL (50% Full Semi-Circle + Circular Fading Tails) ── */}
        <div className={styles.orbitSideWrapLeft}>
          <svg className={styles.orbitSvg} viewBox="0 0 280 440" fill="none">
            <defs>
              <linearGradient id="fadeLeftTailTop" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#d4af37" stopOpacity="0.65" />
                <stop offset="80%" stopColor="#d4af37" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="fadeLeftTailBottom" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#d4af37" stopOpacity="0.65" />
                <stop offset="80%" stopColor="#d4af37" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Circular Outward Tails: Fading out gradually beyond screen edge */}
            <path
              d="M 0 35 A 185 185 0 0 0 -101 65"
              stroke="url(#fadeLeftTailTop)"
              strokeWidth="2"
            />
            <path
              d="M 0 405 A 185 185 0 0 1 -101 375"
              stroke="url(#fadeLeftTailBottom)"
              strokeWidth="2"
            />

            {/* 50% Full Semi-Circle: 100% Solid & Fully Visible from Top to Bottom */}
            <path
              d="M 0 35 A 185 185 0 0 1 0 405"
              stroke="#d4af37"
              strokeWidth="2"
              opacity="0.95"
            />

            {/* Golden Node Dots at Semicircle Ends */}
            <circle cx="0" cy="35" r="4.5" fill="#d4af37" />
            <circle cx="0" cy="405" r="4.5" fill="#d4af37" />
          </svg>

          {/* Full Rotating 9-Point Wheel (Rotates Clockwise around circle center) */}
          <motion.div
            className={styles.wheelMotionContainer}
            animate={{ rotate: leftWheelRotation }}
            transition={{ type: 'spring', stiffness: 55, damping: 14 }}
            style={{
              transformOrigin: `${LEFT_CENTER.x}px ${LEFT_CENTER.y}px`,
            }}
          >
            {leftIconsByApp.flatMap((appIcons, appIdx) =>
              appIcons.map((item, slotIdx) => {
                // Exact 42° quadrant spacing on 180° semi-circle
                // slotIdx 0 = Top (-42°), 1 = Mid (0°), 2 = Bot (+42°)
                const targetSlotAngle = (slotIdx - 1) * 42
                const initialAngle = targetSlotAngle - appIdx * 120
                const rad = (initialAngle * Math.PI) / 180

                const x = LEFT_CENTER.x + WHEEL_RADIUS * Math.cos(rad) - CARD_WIDTH / 2
                const y = LEFT_CENTER.y + WHEEL_RADIUS * Math.sin(rad) - CARD_HEIGHT / 2

                const isActiveApp = appIdx === activeIndex

                return (
                  <motion.div
                    key={item.id}
                    className={`${styles.featureCard} ${isActiveApp ? styles.badgeActive : styles.badgeInactive}`}
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                    }}
                    animate={{
                      rotate: -leftWheelRotation,
                      scale: isActiveApp ? 1 : 0.82,
                      opacity: isActiveApp ? 1 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 55, damping: 14 }}
                    onClick={() => goTo(appIdx)}
                    title={item.title}
                  >
                    <div className={styles.cardIconWrap}>{item.icon}</div>
                    <div className={styles.cardTextCol}>
                      <span className={styles.cardTitle}>{item.title}</span>
                      <span className={styles.cardDesc}>{item.desc}</span>
                    </div>
                    <span className={styles.cardArrow}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </motion.div>
                )
              })
            )}
          </motion.div>
        </div>

        {/* ── CENTER 3-PHONE CAROUSEL ── */}
        <div className={styles.phonesLayout}>
          {images.map((img, i) => {
            const slot = getSlot(i)
            const isCenter = slot === 'center'
            return (
              <div
                key={i}
                className={`${styles.phoneWrapper} ${styles[slot]}`}
                onMouseEnter={() => isCenter && setIsHovered(true)}
                onMouseLeave={() => isCenter && setIsHovered(false)}
              >
                {/* Samsung S24 Ultra Frame */}
                <div className={styles.s24UltraFrame}>

                  {/* Flat titanium side buttons */}
                  <div className={`${styles.btn} ${styles.volUp}`} />
                  <div className={`${styles.btn} ${styles.volDown}`} />
                  <div className={`${styles.btn} ${styles.power}`} />

                  {/* Screen glass */}
                  <div className={styles.screenGlass}>

                    {/* Punch-hole camera */}
                    <div className={styles.punchHole} />

                    {/* Scrollable screen area */}
                    <div
                      ref={isCenter ? activeScrollRef : null}
                      className={styles.screenScroll}
                      style={{
                        overflowY: isCenter ? 'auto' : 'hidden',
                        cursor: isCenter ? 'grab' : 'default',
                      }}
                      onMouseDown={isCenter ? handleMouseDown : undefined}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className={styles.screenImg}
                        draggable={false}
                        decoding="async"
                        style={{ pointerEvents: 'none' }}
                      />
                    </div>

                  </div>
                </div>

              </div>
            )
          })}

          {/* Dot indicators + arrows */}
          <div className={styles.controls}>
            <button className={styles.arrowBtn} onClick={prev} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className={styles.dotsRow}>
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button className={styles.arrowBtn} onClick={next} aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

        </div>

        {/* ── RIGHT ROTATING WHEEL (50% Full Semi-Circle + Circular Fading Tails) ── */}
        <div className={styles.orbitSideWrapRight}>
          <svg className={styles.orbitSvg} viewBox="0 0 280 440" fill="none">
            <defs>
              <linearGradient id="fadeRightTailTop" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#d4af37" stopOpacity="0.65" />
                <stop offset="80%" stopColor="#d4af37" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="fadeRightTailBottom" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#d4af37" stopOpacity="0.65" />
                <stop offset="80%" stopColor="#d4af37" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Circular Outward Tails: Fading out gradually beyond screen edge */}
            <path
              d="M 280 35 A 185 185 0 0 1 381 65"
              stroke="url(#fadeRightTailTop)"
              strokeWidth="2"
            />
            <path
              d="M 280 405 A 185 185 0 0 0 381 375"
              stroke="url(#fadeRightTailBottom)"
              strokeWidth="2"
            />

            {/* 50% Full Semi-Circle: 100% Solid & Fully Visible from Top to Bottom */}
            <path
              d="M 280 35 A 185 185 0 0 0 280 405"
              stroke="#d4af37"
              strokeWidth="2"
              opacity="0.95"
            />

            {/* Golden Node Dots at Semicircle Ends */}
            <circle cx="280" cy="35" r="4.5" fill="#d4af37" />
            <circle cx="280" cy="405" r="4.5" fill="#d4af37" />
          </svg>

          {/* Full Rotating 9-Point Wheel (Rotates Anti-Clockwise around circle center) */}
          <motion.div
            className={styles.wheelMotionContainer}
            animate={{ rotate: rightWheelRotation }}
            transition={{ type: 'spring', stiffness: 55, damping: 14 }}
            style={{
              transformOrigin: `${RIGHT_CENTER.x}px ${RIGHT_CENTER.y}px`,
            }}
          >
            {rightIconsByApp.flatMap((appIcons, appIdx) =>
              appIcons.map((item, slotIdx) => {
                // Exact 42° quadrant spacing on 180° semi-circle
                // Facing phones on the left: slotIdx 0 = Top (222°), 1 = Mid (180°), 2 = Bot (138°)
                const targetSlotAngle = 180 - (slotIdx - 1) * 42
                const initialAngle = targetSlotAngle + appIdx * 120
                const rad = (initialAngle * Math.PI) / 180

                const x = RIGHT_CENTER.x + WHEEL_RADIUS * Math.cos(rad) - CARD_WIDTH / 2
                const y = RIGHT_CENTER.y + WHEEL_RADIUS * Math.sin(rad) - CARD_HEIGHT / 2

                const isActiveApp = appIdx === activeIndex

                return (
                  <motion.div
                    key={item.id}
                    className={`${styles.featureCard} ${isActiveApp ? styles.badgeActive : styles.badgeInactive}`}
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                    }}
                    animate={{
                      rotate: -rightWheelRotation,
                      scale: isActiveApp ? 1 : 0.82,
                      opacity: isActiveApp ? 1 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 55, damping: 14 }}
                    onClick={() => goTo(appIdx)}
                    title={item.title}
                  >
                    <div className={styles.cardIconWrap}>{item.icon}</div>
                    <div className={styles.cardTextCol}>
                      <span className={styles.cardTitle}>{item.title}</span>
                      <span className={styles.cardDesc}>{item.desc}</span>
                    </div>
                    <span className={styles.cardArrow}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </motion.div>
                )
              })
            )}
          </motion.div>
        </div>

      </div>
    </div>
  )
}

