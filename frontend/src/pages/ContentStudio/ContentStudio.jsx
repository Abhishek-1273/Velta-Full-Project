import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import styles from './ContentStudio.module.css'

const WHATSAPP_NUMBER = '919960240648'
const WHATSAPP_STARTER_MSG = encodeURIComponent("Hi VeltaZ! I'm interested in your ₹1,499 Reel Starter Pack. I'd like to discuss my business requirements.")
const WHATSAPP_MULTI_MSG = encodeURIComponent("Hi VeltaZ! I want to manage my Instagram, Facebook and LinkedIn business profiles in one package. Can we connect and discuss?")
const WHATSAPP_GENERAL_MSG = encodeURIComponent("Hi VeltaZ! I want to discuss Instagram content and video editing for my business.")

const WHATSAPP_STARTER_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_STARTER_MSG}`
const WHATSAPP_MULTI_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MULTI_MSG}`
const WHATSAPP_GENERAL_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_GENERAL_MSG}`

const phoneCards = [
  {
    id: 0,
    title: 'Featured Reel Hit',
    type: 'Viral Instagram Reel',
    views: '193K Views',
    badgeText: '',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053111/reel-193k_zbtf8g.png',
    reelUrl: 'https://www.instagram.com/reel/Ddbdzy_MIyU/',
  },
  {
    id: 1,
    title: 'Featured Reel Hit',
    type: 'Viral Instagram Reel',
    views: '60K+ Views',
    badgeText: '',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053107/reel-60k_kmvnyt.png',
    reelUrl: 'https://www.instagram.com/reel/DeTJiVUMKhc/?mdxt=OHF2ZzgxMzJmNzJz',
  },
  {
    id: 2,
    title: 'Featured Reel Hit',
    type: 'Viral Instagram Reel',
    views: '15K Views',
    badgeText: '',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053107/reel-15k_slj6qe.png',
    reelUrl: 'https://www.instagram.com/reel/DcWPWoqqp0d/?cplk=azVkaTlnOGFyOGVx',
  },
]

// 4 PC / Desktop Widescreen Insights Cards (2 Instagram + 2 Facebook)
// Instagram Performance Reports in Samsung Galaxy S25 Ultra Frames
const instaPhoneInsights = [
  // ── ROW 1 - LEFT: INSTAGRAM PERFORMANCE / VIEWS
  {
    id: 'insta-1',
    platform: 'Instagram Mobile',
    tag: 'INSTAGRAM • ALGORITHMIC REACH',
    title: 'High-Retention Hooks & Explore Push',
    metricBadge: 'Explore Distribution • Non-Follower Spike',
    desc: 'Scroll-stopping first 3-second hooks and dynamic kinetic editing designed to trigger the Reels algorithm, driving organic reach directly to fresh potential buyers.',
    bullets: [
      '3-Second Hook Retention Formula',
      'Explosive Non-Follower Discovery',
      'High End-to-End Watch Time Completion',
    ],
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053120/Instagram-insights1_gy83b8.jpg',
  },
  // ── ROW 1 - RIGHT: INSTAGRAM AUDIENCE & ORGANIC LEADS
  {
    id: 'insta-2',
    platform: 'Instagram Mobile',
    tag: 'INSTAGRAM • AUDIENCE & INBOUND',
    title: 'Audience Growth & Inbound Enquiries',
    metricBadge: 'Zero Ad Spend • Inbound Enquiries',
    desc: 'Turning organic Reel reach into an engaged local audience that sends direct WhatsApp and DM enquiries for your services — all achieved without paid ads.',
    bullets: [
      'Direct WhatsApp & DM Enquiries',
      'High-Intent Local Pune Demographic',
      '100% Organic • Zero Paid Ad Spend',
    ],
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053121/Instagram-insights2_ggooey.jpg',
  },
]

// Facebook Meta Business Suite Reports (1600x850 Widescreen PC Frames)
const fbPcInsights = [
  // ── ROW 2 - LEFT: FACEBOOK PERFORMANCE / VIEWS
  {
    id: 'fb-views',
    platform: 'Meta Suite',
    displayUrl: 'facebook.com/views',
    tag: 'FACEBOOK • VIRAL DISTRIBUTION',
    title: 'Meta Algorithm Push & Video Discovery',
    metricBadge: 'Organic Discovery • Recommended Feed',
    desc: 'Unlocking Meta’s organic video recommendation feed, distributing short-form content widely across local feeds completely through organic algorithmic momentum.',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053120/facebook-insights1_kwwcak.jpg',
  },
  // ── ROW 2 - RIGHT: FACEBOOK AUDIENCE & LEADS
  {
    id: 'fb-audience',
    platform: 'Meta Suite',
    displayUrl: 'facebook.com/audience',
    tag: 'FACEBOOK • AUDIENCE & PAGE VISITS',
    title: 'Page Visits & Community Growth',
    metricBadge: 'Organic Growth • Active Following',
    desc: 'Transforming video discovery into targeted profile visits, active page followers, and direct customer enquiries that build local brand authority.',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053120/facebook-insights2_y5rrin.jpg',
  },
]
const servicesList = [
  {
    iconType: 'film',
    title: 'Reels & Video Editing',
    desc: 'Dynamic pacing, scroll-stopping first-3-second hooks, kinetic subtitles, color correction, and trending sound design tailored for Instagram and YouTube Shorts.',
  },
  {
    iconType: 'target',
    title: 'Content Strategy & Hooks',
    desc: 'We research your Pune local niche, competitors, and target demographics to script viral hooks and offer positioning that speak directly to paying buyers.',
  },
  {
    iconType: 'layout',
    title: 'Carousels & Story Design',
    desc: 'High-retention multi-slide educational carousels and daily interactive Instagram story templates that convert casual profile visitors into warm leads.',
  },
  {
    iconType: 'sliders',
    title: 'Profile & Bio Optimization',
    desc: 'Complete audit of your username, bio copy, link-in-bio routing, highlights aesthetics, and hashtag strategy so your account converts profile visits.',
  },
]

const platformsList = [
  {
    name: 'Instagram',
    note: 'Reels, Stories & Carousels',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    note: 'Business Page & Reels',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    note: 'Company Page & Thought Leadership',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

const steps = [
  {
    num: '01',
    title: 'Send Raw Footage',
    desc: 'Shoot on your smartphone and upload clips via WhatsApp or Google Drive along with quick notes on your offer.',
  },
  {
    num: '02',
    title: 'We Hook & Edit',
    desc: 'We structure the hook, cut dead air, design kinetic subtitles, sync music, and format vertical 9:16 reels.',
  },
  {
    num: '03',
    title: 'Review & Refine',
    desc: 'Preview the draft. You get 1 dedicated revision round per reel to ensure the cut matches your exact expectations.',
  },
  {
    num: '04',
    title: 'Post & Scale',
    desc: 'Receive publish-ready high-definition MP4 files with pre-written captions, hashtags, and CTA suggestions.',
  },
]

export default function ContentStudio() {
  const [pricingRegion, setPricingRegion] = useState('IN') // 'IN' | 'INTL'
  const [activeLightboxData, setActiveLightboxData] = useState(null)
  const [activePhoneIndex, setActivePhoneIndex] = useState(1)
  const [isHovered, setIsHovered] = useState(false)

  // Set SEO document title
  useEffect(() => {
    document.title = 'VeltaZ Content Studio | Instagram Reels & Video Editing Pune'
    window.scrollTo(0, 0)
  }, [])

  // Auto-swipe phone mockups smoothly every 3.2 seconds
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setActivePhoneIndex((prev) => (prev + 1) % 3)
    }, 3200)
    return () => clearInterval(timer)
  }, [isHovered])

  // Lock body scroll and handle Escape key when Lightbox is open
  useEffect(() => {
    if (activeLightboxData) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setActiveLightboxData(null)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [activeLightboxData])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Calculate relative slot for Samsung S25 Ultra cards: 'left' | 'center' | 'right'
  const getSlotClass = (cardIndex) => {
    const diff = (cardIndex - activePhoneIndex + 3) % 3
    if (diff === 0) return styles.slotCenter
    if (diff === 1) return styles.slotRight
    return styles.slotLeft
  }

  return (
    <div className={styles.page}>

      {/* ── HERO SECTION ── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <div className={styles.pillTag}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>VELTAZ CONTENT STUDIO</span>
              </div>
              <h1 className={styles.heroTitle}>
                Instagram Reels That Help Your Business{' '}
                <span className={styles.blueHighlight}>Get Noticed</span>
              </h1>
              <p className={styles.heroSub}>
                Short-form video editing and high-converting social media content for gyms, salons, cafes, real estate, and local service businesses in Pune.
              </p>

              <div className={styles.heroBtnGroup}>
                <a
                  href="#starter-offer"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('starter-offer')
                  }}
                  className={styles.primaryBtn}
                >
                  Start with ₹1,499 Trial →
                </a>
                <a
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('work')
                  }}
                  className={styles.secondaryBtn}
                >
                  View Our Work
                </a>
              </div>

              <div className={styles.heroTrustBadge}>
                <span className={styles.trustItem}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Pune Local Business Focus
                </span>
                <span>•</span>
                <span className={styles.trustItem}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Direct WhatsApp Support
                </span>
                <span>•</span>
                <span className={styles.trustItem}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  No Long-Term Lock-in
                </span>
              </div>
            </div>

            {/* Visual: Samsung Galaxy S25 Ultra Auto-Swiping Interactive Carousel */}
            <div
              className={styles.phoneDeckWrapper}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className={styles.s25Deck}>
                {phoneCards.map((card) => {
                  const slotClass = getSlotClass(card.id)
                  const isCenter = slotClass === styles.slotCenter

                  return (
                    <div
                      key={card.id}
                      className={`${styles.s25Phone} ${slotClass}`}
                      onClick={() => {
                        if (isCenter) {
                          if (card.reelUrl) {
                            window.open(card.reelUrl, '_blank', 'noopener,noreferrer')
                          }
                        } else {
                          setActivePhoneIndex(card.id)
                        }
                      }}
                      title={isCenter ? 'Watch Reel on Instagram' : 'Click to bring to front'}
                    >
                      {/* Samsung S25 Ultra Titanium Frame Accents */}
                                            <div className={styles.s25CameraPunch} />

                      {/* Screen Content */}
                      <div className={styles.s25Screen}>
                        <img
                          src={card.img}
                          alt={card.title}
                          className={styles.s25ScreenImg}
                        />

                        {/* Floating Center Play Button */}
                        <div
                          className={styles.s25PlayBtn}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (card.reelUrl) {
                              window.open(card.reelUrl, '_blank', 'noopener,noreferrer')
                            } else if (isCenter) {
                              setActiveLightboxData({ img: card.img })
                            }
                          }}
                          title="Watch original Reel on Instagram"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>

                        {/* Professional S25 Floating Badge */}
                        {card.badgeText && (
                          <div className={styles.s25Badge}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <span>{card.badgeText}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Pagination Dots (Clickable) */}
              <div className={styles.deckIndicators}>
                {phoneCards.map((c) => (
                  <button
                    key={c.id}
                    className={`${styles.indicatorDot} ${activePhoneIndex === c.id ? styles.indicatorActive : ''}`}
                    onClick={() => setActivePhoneIndex(c.id)}
                    aria-label={`Show phone mockup ${c.id + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS & SOCIAL PROOF STRIP (3 Clean Cards without 3x lift) ── */}
      <section className={styles.metricsSection} id="results">
        <div className="container">
          <div className={styles.metricsHeader}>
            <div className={styles.sectionTag}>PROVEN TRACK RECORD</div>
            <div className={styles.metricsClientBadge}>
              Featured Case Study: KIN Property Management
            </div>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricIconWrap}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className={styles.metricValue}>700K+</div>
              <div className={styles.metricLabel}>Organic Video Views</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIconWrap}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>
              </div>
              <div className={styles.metricValue}>1K+</div>
              <div className={styles.metricLabel}>New Targeted Instagram Followers</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIconWrap}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className={styles.metricValue}>1,000+</div>
              <div className={styles.metricLabel}>Facebook Community Followers</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO / WORK SECTION (2 INSTAGRAM + 2 FACEBOOK PC INSIGHTS) ── */}
      <section className={styles.workSection} id="work">
        <div className="container">
          <div className={styles.sectionHeaderRow}>
            <div>
              <span className={styles.sectionTag}>PROVEN TRACK RECORD</span>
              <h2 className={styles.sectionTitle}>Organic Reach, Audience Growth & Enquiries</h2>
              <p className={styles.sectionSub}>
                Verified Meta Business Suite insights — showing how strategic short-form content drives consistent organic reach, follower growth, and inbound enquiries without paid ad spend.
              </p>
            </div>
            <Link to="/products/kin-property" className={styles.viewAllLink}>
              View Kin Case Study →
            </Link>
          </div>

          {/* SECTION 1: INSTAGRAM IN SAMSUNG S25 ULTRA MOCKUPS */}
          <div className={styles.platformSubHeading}>
            <div className={styles.platformSubTitleRow}>
              <span className={styles.platformIconBadge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
              </span>
              <h3 className={styles.platformTitleText}>Instagram Mobile Analytics</h3>
            </div>
          </div>

          <div className={styles.instaGrid}>
            {instaPhoneInsights.map((item) => (
              <div
                key={item.id}
                className={styles.instaCard}
                onClick={() => setActiveLightboxData({ img: item.img })}
                title="Click to view full resolution report"
              >
                <div className={styles.instaPhoneCol}>
                  <div className={styles.insightS25Phone}>
                    {/* Samsung S25 Ultra Titanium Frame */}
                                        <div className={styles.insightS25Punch} />
                    <div className={styles.insightS25Screen}>
                      <img src={item.img} alt={item.title} className={styles.insightS25Img} />
                    </div>
                  </div>
                </div>

                <div className={styles.instaInfoCol}>
                  <span className={styles.instaCardTag}>{item.tag}</span>
                  <h4 className={styles.instaCardTitle}>{item.title}</h4>
                  <div className={styles.instaMetricBadge}>{item.metricBadge}</div>
                  <p className={styles.instaCardDesc}>{item.desc}</p>
                  
                  <div className={styles.instaBullets}>
                    {item.bullets.map((b, i) => (
                      <div key={i} className={styles.instaBulletItem}>
                        <span className={styles.bulletCheck}>✓</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.instaClickHint}>
                    <span>View Full Resolution Report</span>
                    <span className={styles.hintArrow}>↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SECTION 2: FACEBOOK IN DESKTOP PC WIDESCREEN MOCKUPS */}
          <div className={styles.platformSubHeading} style={{ marginTop: 56 }}>
            <div className={styles.platformSubTitleRow}>
              <span className={styles.platformIconBadge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="3" rx="2" />
                  <line x1="8" x2="16" y1="21" y2="21" />
                  <line x1="12" x2="12" y1="17" y2="21" />
                </svg>
              </span>
              <h3 className={styles.platformTitleText}>Facebook Meta Business Suite Reports</h3>
            </div>
          </div>

          <div className={styles.workGrid}>
            {fbPcInsights.map((item) => (
              <div
                key={item.id}
                className={styles.pcMockupCard}
                onClick={() => setActiveLightboxData({ img: item.img })}
                title="Click to view full resolution report"
              >
                {/* Desktop / PC Window Header */}
                <div className={styles.pcTitleBar}>
                  <div className={styles.pcDots}>
                    <span className={`${styles.pcDot} ${styles.pcDotRed}`} />
                    <span className={`${styles.pcDot} ${styles.pcDotYellow}`} />
                    <span className={`${styles.pcDot} ${styles.pcDotGreen}`} />
                  </div>
                  <div className={styles.pcUrlPill}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>{item.displayUrl || 'facebook.com/insights'}</span>
                  </div>
                  <div className={styles.pcPlatformBadge}>{item.platform}</div>
                </div>

                {/* PC Widescreen Window Frame */}
                <div className={styles.pcScreenWrap}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className={styles.pcScreenImg}
                  />
                  <div className={styles.pcZoomOverlay}>
                    <span className={styles.pcZoomText}>Click to Enlarge Report</span>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className={styles.workCardBody}>
                  <div className={styles.workCardTop}>
                    <span className={styles.workCardTag}>{item.tag}</span>
                    <div className={styles.metricBadgePill}>{item.metricBadge}</div>
                  </div>
                  <div className={styles.workCardTitleRow}>
                    <h3 className={styles.workCardTitle}>{item.title}</h3>
                  </div>
                  <p className={styles.workCardDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section className={styles.servicesSection} id="services">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
            <span className={styles.sectionTag}>WHAT WE DO</span>
            <h2 className={styles.sectionTitle}>Full-Stack Content Creation</h2>
            <p className={styles.sectionSub}>
              Everything your local brand needs to consistently attract new customers across Instagram, Facebook and LinkedIn.
            </p>
          </div>

          {/* Multi-platform, single-package highlight */}
          <div className={styles.platformStrip}>
            <div className={styles.platformStripText}>
              <div className={styles.platformStripTitle}>One Package. All Your Business Profiles.</div>
              <p className={styles.platformStripDesc}>
                We can handle your <strong>Instagram, Facebook and LinkedIn business profiles</strong> together in a single package — one team, one consistent brand voice, content planned and tailored for every platform.
              </p>
            </div>
            <div className={styles.platformChips}>
              {platformsList.map((pf) => (
                <div key={pf.name} className={styles.platformChip}>
                  <span className={styles.platformChipIcon}>{pf.icon}</span>
                  <span className={styles.platformChipName}>{pf.name}</span>
                  <span className={styles.platformChipNote}>{pf.note}</span>
                </div>
              ))}
            </div>

            <div className={styles.platformCtaWrap}>
              <a
                href={WHATSAPP_MULTI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.platformCtaBtn}
              >
                <span>Connect With Us on WhatsApp</span>
                <span className={styles.btnArrow}>→</span>
              </a>
              <span className={styles.platformCtaNote}>
                Tell us your business &amp; platforms — we'll suggest a custom package • Fast response
              </span>
            </div>
          </div>

          <div className={styles.servicesGrid}>
            {servicesList.map((srv, idx) => (
              <div key={idx} className={styles.serviceCard}>
                <div className={styles.serviceIconBox}>
                  {srv.iconType === 'film' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect width="14" height="14" x="1" y="5" rx="2" ry="2" />
                    </svg>
                  )}
                  {srv.iconType === 'target' && (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  )}
                  {srv.iconType === 'layout' && (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <line x1="3" x2="21" y1="9" />
                      <line x1="9" x2="9" y1="21" />
                    </svg>
                  )}
                  {srv.iconType === 'sliders' && (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 21v-7" />
                      <path d="M4 10V3" />
                      <path d="M12 21v-9" />
                      <path d="M12 8V3" />
                      <path d="M20 21v-5" />
                      <path d="M20 12V3" />
                      <circle cx="4" cy="14" r="2" />
                      <circle cx="12" cy="10" r="2" />
                      <circle cx="20" cy="14" r="2" />
                    </svg>
                  )}
                </div>
                <h3 className={styles.serviceCardTitle}>{srv.title}</h3>
                <p className={styles.serviceCardDesc}>{srv.desc}</p>
              </div>
            ))}
          </div>

          {/* Secondary Tech Strip */}
          <div className={styles.secondaryTechStrip}>
            <div className={styles.secondaryTechText}>
              Need a modern website or WhatsApp automation CRM to handle all incoming leads?
            </div>
            <div className={styles.secondaryTechLinks}>
              <Link to="/services" className={styles.secondaryTechLink}>
                Web Development →
              </Link>
              <Link to="/products/whatsflow" className={styles.secondaryTechLink}>
                WhatsFlow Automation →
              </Link>
              <Link to="/products/docket14" className={styles.secondaryTechLink}>
                Docket14 Portal →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STARTER TRIAL OFFER SECTION (INDIA & INTERNATIONAL) ── */}
      <section className={styles.offerSection} id="starter-offer">
        <div className="container">
          <div className={styles.offerCard}>
            <div className={styles.offerTopRow}>
              <div>
                <span className={styles.offerTag}>STARTER TRIAL</span>
                <h2 className={styles.offerHeading}>Reel Starter Pack</h2>
              </div>
              <div className={styles.offerSubNote}>
                One-time payment • No recurring contracts
              </div>
            </div>

            {/* REGION / CURRENCY TOGGLE */}
            <div className={styles.regionRow}>
              <span className={styles.regionLabel}>Select Region:</span>
              
            </div>

            <div className={styles.offerMainRow}>
              {/* Left Column: Pricing + Tagline + High-Conversion CTA */}
              <div className={styles.offerLeftCol}>
                <div className={styles.offerPriceTag}>
                  ₹1,499
                </div>
                <div className={styles.offerPricePeriod}>One-time payment</div>
                <p className={styles.offerPriceSub}>
                  Your first step towards better social media content. Experience our editing speed and storytelling quality before committing to any monthly package.
                </p>

                <div className={styles.offerActionBox}>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_STARTER_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.offerBtn}
                  >
                    <span>
                      Start with ₹1,499 Trial on WhatsApp
                    </span>
                    <span className={styles.btnArrow}>→</span>
                  </a>
                  <div className={styles.offerSubNote} style={{ marginTop: 10 }}>
                    Opens WhatsApp with prefilled message • Fast response
                  </div>
                </div>
              </div>

              {/* Right Column: What's Included Checklist */}
              <div className={styles.offerRightCol}>
                <div className={styles.checklistHeading}>What's Included:</div>
                <div className={styles.offerChecklist}>
                  <div className={styles.offerCheckItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>3 Edited Reels</strong>, up to 30–45 seconds each</span>
                  </div>
                  <div className={styles.offerCheckItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>Hooks and on-screen subtitles</strong> with kinetic typography</span>
                  </div>
                  <div className={styles.offerCheckItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>Captions and CTA suggestions</strong> ready for direct posting</span>
                  </div>
                  <div className={styles.offerCheckItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>1 revision round per Reel</strong> for adjustments</span>
                  </div>
                  <div className={styles.offerCheckItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>Client-provided footage</strong> / raw smartphone clips</span>
                  </div>
                </div>

                {/* Scope Clarity Note */}
                <div className={styles.offerScopeNotice}>
                  <span className={styles.scopeNoticeIcon}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="16" y2="12" />
                      <line x1="12" x2="12.01" y1="8" y2="8" />
                    </svg>
                  </span>
                  <span>
                    <strong>Scope & Delivery:</strong> Suggested delivery: 3–5 business days after receiving all required footage and instructions. Shooting, posting management, and paid ads are not included. This is an introductory trial price.
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.offerDisclaimers}>
              <div className={styles.offerDisclaimersTitle}>Important Details:</div>
              <div className={styles.disclaimerList}>
                <div className={styles.disclaimerItem}>
                  <span className={styles.disclaimerDot}>•</span>
                  <span>Client provides raw video footage / smartphone recordings.</span>
                </div>
                <div className={styles.disclaimerItem}>
                  <span className={styles.disclaimerDot}>•</span>
                  <span>Each Reel up to 30–45 seconds in duration.</span>
                </div>
                <div className={styles.disclaimerItem}>
                  <span className={styles.disclaimerDot}>•</span>
                  <span>Delivered within 3–5 business days of receiving all footage and instructions.</span>
                </div>
                <div className={styles.disclaimerItem}>
                  <span className={styles.disclaimerDot}>•</span>
                  <span>Shooting, account posting management, and paid ads are not included.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4-STEP PROCESS SECTION ── */}
      <section className={styles.processSection} id="how-it-works">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
            <span className={styles.sectionTag}>HOW IT WORKS</span>
            <h2 className={styles.sectionTitle}>Simple, Transparent Process</h2>
            <p className={styles.sectionSub}>
              From raw phone clips to polished viral-ready Reels in 4 easy steps.
            </p>
          </div>

          <div className={styles.processGrid}>
            {steps.map((st) => (
              <div key={st.num} className={styles.processCard}>
                <div className={styles.processStepNum}>{st.num}</div>
                <h3 className={styles.processCardTitle}>{st.title}</h3>
                <p className={styles.processCardDesc}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section className={styles.finalCtaSection}>
        <div className="container">
                    <div className={styles.finalCtaBox}>
            <div className={styles.finalCtaLeft}>
              <span className={styles.finalCtaTag}>READY TO GROW?</span>
              <h2 className={styles.finalCtaTitle}>
                Take Your Business's Instagram to the Next Level
              </h2>
              <p className={styles.finalCtaSub}>
                Start with our ₹1,499 Reel Starter Pack. No contracts, zero long-term commitments. Just high-impact edits that help your business get noticed and generate enquiries.
              </p>

              <div className={styles.finalCtaBtnGroup}>
                <a
                  href={WHATSAPP_STARTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.finalChatBtn}
                >
                  <span>Chat on WhatsApp</span>
                  <span className={styles.btnArrow}>→</span>
                </a>
                <Link to="/contact" className={styles.contactOutlineBtn}>
                  Schedule a Consultation
                </Link>
              </div>
            </div>

            <div className={styles.finalCtaRight}>
              {/* WhatsApp Chat Simulation Card */}
              <a
                href={WHATSAPP_STARTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.chatSimCard}
              >
                <div className={styles.chatSimHeader}>
                  <div className={styles.chatSimAvatarWrap}>
                    <div className={styles.chatSimAvatar}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <span className={styles.chatOnlinePulse} />
                  </div>
                  <div className={styles.chatSimHeaderInfo}>
                    <div className={styles.chatSimNameRow}>
                      <span className={styles.chatSimName}>VeltaZ Content Desk</span>
                    </div>
                    <div className={styles.chatSimStatus}>
                      <span className={styles.statusDot} />
                      <span>Online • Quick WhatsApp Response</span>
                    </div>
                  </div>
                </div>

                <div className={styles.chatSimBody}>
                  {/* Client inquiry */}
                  <div className={styles.chatBubbleClient}>
                    <span className={styles.chatSenderLabel}>Pune Business Client</span>
                    <p className={styles.chatBubbleText}>
                      Hi VeltaZ! We need 3 short-form Reels edited for our business this week. How do we start?
                    </p>
                    <div className={styles.chatTimeRow}>
                      <span className={styles.chatTime}>11:42 AM</span>
                    </div>
                  </div>

                  {/* VeltaZ reply */}
                  <div className={styles.chatBubbleAgency}>
                    <span className={styles.chatSenderLabelAgency}>VeltaZ Studio</span>
                    <p className={styles.chatBubbleText}>
                      Hello! You can start directly with our ₹1,499 Starter Pack. Just share your raw phone clips and we'll handle the hook, subtitles, and pacing.
                    </p>
                    <div className={styles.chatTimeRow}>
                      <span className={styles.chatTime}>11:43 AM</span>
                      <span className={styles.chatReadTicks}>✓✓</span>
                    </div>
                  </div>
                </div>

                <div className={styles.chatSimFooter}>
                  <span className={styles.chatFooterPrompt}>Tap to send message on WhatsApp</span>
                  <span className={styles.chatFooterArrow}>→</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX MODAL ── */}
      {activeLightboxData && createPortal(
        <div
          className={styles.lightboxOverlay}
          onClick={() => setActiveLightboxData(null)}
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.lightboxClose}
              onClick={() => setActiveLightboxData(null)}
              aria-label="Close Lightbox"
            >
              &times;
            </button>
            <img src={activeLightboxData.img} alt="Enlarged Media Preview" />
            {activeLightboxData.reelUrl && (
              <div style={{ textAlign: 'center', marginTop: 14 }}>
                <a
                  href={activeLightboxData.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.lightboxReelBtn}
                >
                  <span>Watch Original Reel on Instagram</span>
                  <span>↗</span>
                </a>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

    </div>
  )
}
