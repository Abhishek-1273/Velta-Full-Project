import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import CatalogCarousel from '../../components/CatalogCarousel/CatalogCarousel'
import styles from './Services.module.css'

const catalogServices = [
  {
    id: 'automation',
    title: 'Automation',
    category: 'automation',
    desc: 'Automate repetitive workflows and scale faster.',
    image: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1794676558/automation_wi9icv.png',
    link: '/automation-systems'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'marketing',
    desc: 'Grow your online presence with data-driven strategies.',
    image: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1794676557/digital-marketting_dkil0g.png',
    link: '/performance-marketing'
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    category: 'software',
    desc: 'Bespoke enterprise software tailored to your workflows.',
    image: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1794676563/custom-software_ijwkon.png',
    link: '/contact'
  },
  {
    id: 'app-development',
    title: 'App Development',
    category: 'software',
    desc: 'Build scalable iOS and Android mobile solutions.',
    image: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1794676558/mobile_x1tbwo.png',
    link: '/mobile-app-development'
  },
  {
    id: 'website-development',
    title: 'Website Development',
    category: 'web',
    desc: 'Modern, fast and conversion-focused websites.',
    image: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1794676557/web-dev_x7ctoi.png',
    link: '/website-development'
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    category: 'content',
    desc: 'Compelling content that builds your brand.',
    image: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1794676563/social-media_nozexc.png',
    link: '/content'
  },
  {
    id: 'seo-ranking',
    title: 'SEO & Ranking',
    category: 'seo',
    desc: 'Targeted keyword ranking & Google visibility.',
    image: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1794676557/seo_lqhq3j.png',
    link: '/seo-blogging-google-business-profile'
  }
]

const FILTER_TABS = [
  { 
    id: 'all', 
    label: 'All Services', 
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    )
  },
  { 
    id: 'software', 
    label: 'Software', 
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  },
  { 
    id: 'web', 
    label: 'Web', 
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  },
  { 
    id: 'automation', 
    label: 'Automation', 
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  },
  { 
    id: 'marketing', 
    label: 'Marketing', 
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    )
  },
  { 
    id: 'content', 
    label: 'Content', 
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    )
  },
  { 
    id: 'seo', 
    label: 'SEO', 
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    )
  }
]

const socialImages = [
  {
    title: 'LinkedIn Company Page (iPad View)',
    desc: 'VeltaZ LinkedIn corporate authority presence',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786862364/LinkedIn_bxqjpj.jpg'
  },
  {
    title: 'Instagram Creative Grid (Laptop View)',
    desc: 'Curated grid aesthetic and post handling',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786873647/Instagram_Page_Handling_odzgs1.png'
  },
  {
    title: 'Instagram Insights (Views)',
    desc: 'Reel views and engagement analytics',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786862364/Instagram_Views_gjeylm.jpg'
  },
  {
    title: 'Instagram Analytics (Graph)',
    desc: 'Account reach impressions growth metrics',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786862364/Instagram_Insights_x8jsae.jpg'
  },
  {
    title: 'Organic Follower Scaling',
    desc: 'Follower gain and growth velocity over 30 days',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786862364/Instagram_Followers_gnkqhb.jpg'
  }
]

export default function Services() {
  const [activeTab, setActiveTab] = useState('all')
  const [activeLightboxImg, setActiveLightboxImg] = useState(null)

  const handleTabClick = (tab) => {
    setActiveTab(tab.id)
  }

  React.useEffect(() => {
    if (activeLightboxImg) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeLightboxImg])

  return (
    <div className={styles.page}>
      
      {/* MINIMAL & SIMPLE SERVICE CATALOG HERO */}
      <section className={styles.hero}>
        <div className={styles.bg}>
          <div className={styles.ambientBlobLeft} />
          <div className={styles.ambientBlobRight} />
          <div className={styles.grid} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.eyebrowBadge}>
              <span className={styles.eyebrowDot} />
              <span>Service Catalog</span>
            </div>
            <h1 className={styles.title}>
              Engineering Quality<br />
              <span className={styles.goldText}>Operational Services</span>
            </h1>
            <p className={styles.sub}>
              Swipe or explore the complete catalog of custom development, automation pipelines, and marketing services we engineer at VeltaZ.
            </p>

            {/* MINIMAL CAPSULE FILTER BAR */}
            <div className={styles.filterBarWrapper}>
              <div className={styles.filterBar}>
                {FILTER_TABS.map((tab) => {
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      className={`${styles.filterTab} ${isActive ? styles.filterTabActive : ''}`}
                      onClick={() => handleTabClick(tab)}
                    >
                      <span className={styles.filterIcon}>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG CAROUSEL MATCHING IMAGE 2 */}
      <section className={styles.servicesSection}>
        <div className="container" style={{ overflow: 'visible' }}>
          <CatalogCarousel 
            services={catalogServices}
            activeCategory={activeTab}
          />
        </div>
      </section>

      {/* WEBSITE DEVELOPMENT SHOWCASE SECTION */}
      <section className={styles.demoShowcaseSection}>
        <div className="container">
          <div className={styles.showcaseWrapper}>
            <div className={styles.showcaseHead}>
                <span className="tag" style={{ marginBottom: 6 }}>Web Engineering</span>
              <h2>Modern Websites & Web Portals</h2>
              </div>

              <div className={styles.showcaseBody}>
                <p className={styles.showcaseDesc}>
                  We engineer high-speed business websites and dynamic client portals that present your brand with authority, build customer trust, and generate direct enquiries.
                </p>
                <div className={styles.showcaseGrid}>
                <div className={styles.showcaseItem}>
                  <h5>React & Modern SPAs</h5>
                  <p>Lighthouse 98%+, sub-second loading, and fluid animations.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Dynamic Portals & CMS</h5>
                  <p>Database-driven property listings, catalogues, and admin portals.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Direct Enquiry Funnels</h5>
                  <p>Integrated contact forms and instant WhatsApp enquiry hooks.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>SEO & Mobile Ready</h5>
                  <p>Structured search meta, XML sitemaps, and full responsiveness.</p>
                </div>
              </div>

              {/* Direct Link to Website Development Portal */}
              <div style={{ marginTop: '14px' }}>
                <Link 
                  to="/website-development" 
                  className="btn btn-primary" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '8px 20px', 
                    borderRadius: '9999px', 
                    fontWeight: 700, 
                    fontSize: '13px',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' 
                  }}
                >
                  <span>Explore Website Development Services</span>
                  <span style={{ fontSize: '20px', alignContent: "center" }}>→</span>
                </Link>
              </div>
            </div>

            <div className={styles.showcaseRight}>
              <div className={styles.deviceMockupDuo}>
                {/* 1. LAPTOP WEBSITE DISPLAY */}
                <div 
                  className={styles.laptopMockupWrapper}
                  onClick={() => setActiveLightboxImg("https://res.cloudinary.com/dqc1awrnc/image/upload/v1792408084/website-mockup_qnmqqk.png")}
                  title="Click to view full screen"
                >
                  <img 
                    src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792408084/website-mockup_qnmqqk.png" 
                    alt="Kin Property Website Display" 
                    className={styles.laptopImg}
                  />
                </div>

                {/* 2. MOBILE WEBSITE DISPLAY */}
                <div 
                  className={styles.mobileMockupWrapper}
                  onClick={() => setActiveLightboxImg("https://res.cloudinary.com/dqc1awrnc/image/upload/v1792408082/mobile-mockup_sbevrw.png")}
                  title="Click to view mobile screen"
                >
                  <img 
                    src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792408082/mobile-mockup_sbevrw.png" 
                    alt="Kin Property Mobile Display" 
                    className={styles.mobileImg}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCK SHOWCASE SECTION (MOBILE APPS) */}
      <section className={styles.demoShowcaseSection} style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={`${styles.showcaseWrapper} ${styles.showcaseWrapperReverse}`}>
            <div className={styles.showcaseHead}>
                <span className="tag">Native App Suites</span>
              <h2>Cross-Platform Mobile Applications</h2>
              </div>

              <div className={styles.showcaseBody}>
                <p className={styles.showcaseDesc}>
                  We build dedicated native client/admin panels and employee management systems optimized to run fluidly on low-end as well as flagship smartphones.
                </p>
                <div className={styles.showcaseGrid}>
                <div className={styles.showcaseItem}>
                  <h5>WhatsFlow App</h5>
                  <p>Lead management and customer qualification workflows.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Docket14 App</h5>
                  <p>Hearing schedules, status logs, and task notifications.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Offline-First Architecture</h5>
                  <p>Local SQLite caching, auto-sync and instant responsive UI.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Cloud Sync & Push Alerts</h5>
                  <p>Smooth background synchronization and real-time push alerts.</p>
                </div>
              </div>
              {/* Direct Link to Mobile App Development Portal */}
              <div style={{ marginTop: "14px" }}>
                <Link 
                  to="/mobile-app-development" 
                  className="btn btn-primary" 
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "8px", 
                    padding: "8px 20px", 
                    borderRadius: "9999px", 
                    fontWeight: 700, 
                    fontSize: "13px",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)" 
                  }}
                >
                  <span>Explore Mobile App Suites</span>
                  <span style={{ fontSize: '20px', alignContent: "center" }}>→</span>
                </Link>
              </div>
            </div>

            <div className={styles.showcaseRight}>
              <div className={styles.phoneDeck}>
                <div className={`${styles.miniPhone} ${styles.phone1}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786538519/Screenshot_20260812_180225_Docket_14.jpg_nxm7zh.jpg" alt="Docket14 App screen" />
                </div>
                <div className={`${styles.miniPhone} ${styles.phone2}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792917399/admin_whatsFlow.jpg_pcyu3j.jpg" alt="WhatsFlow App screen" />
                </div>
                <div className={`${styles.miniPhone} ${styles.phone3}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786538759/IMG-20260726-WA0025.jpg_1_uq78d1.jpg" alt="Mobile App UI screen" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA SHOWCASE SECTION */}
      <section className={styles.demoShowcaseSection} style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.showcaseWrapper}>
            <div className={styles.showcaseHead}>
                <span className="tag">Organic Curation</span>
              <h2>Social Media & LinkedIn Handling</h2>
              </div>

              <div className={styles.showcaseBody}>
                <p className={styles.showcaseDesc}>
                  We curate high-authority brand aesthetics, LinkedIn B2B posts, and creative Reels content calendars that generate organic client traction.
                </p>
                <div className={styles.showcaseGrid}>
                <div className={styles.showcaseItem}>
                  <h5>LinkedIn Scaling</h5>
                  <p>Professional profiles, B2B updates, and lead outreach copies.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Instagram Grid</h5>
                  <p>Clean, unified brand styling blocks and carousel sliders.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Reels & Trimming</h5>
                  <p>Dynamic video edits, custom text captions, and short clipping.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Automated Flows</h5>
                  <p>Weekly content plans mapped and queued with zero post-day effort.</p>
                </div>
              </div>

              {/* Direct Link to Content Studio Portal */}
              <div style={{ marginTop: '14px' }}>
                <Link
                  to="/content"
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 20px',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    fontSize: '13px',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
                  }}
                >
                  <span>Explore Content Studio & Portfolio</span>
                  <span style={{ fontSize: '20px', alignContent: "center" }}>→</span>
                </Link>
              </div>
            </div>

            <div className={styles.showcaseRight}>
              <div className={styles.socialTrioContainer}>
                {/* 1. LEFT MOBILE - SAMSUNG GALAXY S25 ULTRA (SEAMLESS TITANIUM - NO BUTTONS) */}
                <div 
                  className={`${styles.s25UltraDevice} ${styles.trioPhoneLeft}`}
                  onClick={() => setActiveLightboxImg("https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053120/Instagram-insights1_gy83b8.jpg")}
                  title="Click to view Instagram Discovery Insights"
                >
                  {/* S25 Sharp Titanium Armor Frame */}
                  <div className={styles.s25TitaniumBody}>
                    <div className={styles.s25TopSpeaker} />
                    <div className={styles.s25DisplayScreen}>
                                            <img 
                        src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053120/Instagram-insights1_gy83b8.jpg" 
                        alt="Instagram Discovery Analytics on Samsung S25 Ultra" 
                        className={styles.s25ScreenImage}
                        draggable="false"
                      />
                      <div className={styles.s25GestureBar} />
                    </div>
                  </div>
                </div>

                {/* 2. CENTER - APPLE IPAD PRO (LANDSCAPE WIDESCREEN - FACEBOOK META SUITE) */}
                <div 
                  className={styles.ipadMockup}
                  onClick={() => setActiveLightboxImg("https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053120/facebook-insights1_kwwcak.jpg")}
                  title="Click to view Meta Business Suite Analytics"
                >
                  {/* Top Landscape FaceTime Camera */}
                  <div className={styles.ipadCamera} />

                  {/* iPad Liquid Retina Screen */}
                  <div className={styles.ipadScreen}>
                    {/* iPad Safari Browser Bar */}
                    <div className={styles.ipadHeaderBar}>
                      <div className={styles.proLaptopDots}>
                        <span className={styles.proDotRed} />
                        <span className={styles.proDotYellow} />
                        <span className={styles.proDotGreen} />
                      </div>
                      <div className={styles.ipadUrlBadge}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span>business.facebook.com/insights</span>
                      </div>
                    </div>
                    {/* Widescreen Meta Insights Report */}
                    <img 
                      src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053120/facebook-insights1_kwwcak.jpg" 
                      alt="Facebook Meta Business Suite Performance Report on iPad Pro" 
                      className={styles.ipadScreenImg}
                      draggable="false"
                    />
                    {/* iPad Home Indicator */}
                    <div className={styles.ipadHomeBar} />
                  </div>
                </div>

                {/* 3. RIGHT MOBILE - SAMSUNG GALAXY S25 ULTRA (SEAMLESS TITANIUM - NO BUTTONS) */}
                <div 
                  className={`${styles.s25UltraDevice} ${styles.trioPhoneRight}`}
                  onClick={() => setActiveLightboxImg("https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053121/Instagram-insights2_ggooey.jpg")}
                  title="Click to view Instagram Growth Insights"
                >
                  {/* S25 Sharp Titanium Armor Frame */}
                  <div className={styles.s25TitaniumBody}>
                    <div className={styles.s25TopSpeaker} />
                    <div className={styles.s25DisplayScreen}>
                                            <img 
                        src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792053121/Instagram-insights2_ggooey.jpg" 
                        alt="Instagram Growth Analytics on Samsung S25 Ultra" 
                        className={styles.s25ScreenImage}
                        draggable="false"
                      />
                      <div className={styles.s25GestureBar} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></div>
      </section>

      {/* SEARCH ENGINE OPTIMIZATION (SEO) SHOWCASE SECTION */}
      <section className={styles.demoShowcaseSection} style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={`${styles.showcaseWrapper} ${styles.showcaseWrapperReverse}`}>
            <div className={styles.showcaseHead}>
                <span className="tag">Search Dominance</span>
              <h2>Search Engine Optimization & Google Ranking</h2>
              </div>

              <div className={styles.showcaseBody}>
                <p className={styles.showcaseDesc}>
                  We architect end-to-end technical SEO, local Google Map pack domination, and high-velocity keyword strategies that drive high-intent organic leads without paying for every click.
                </p>
                <div className={styles.showcaseGrid}>
                <div className={styles.showcaseItem}>
                  <h5>Technical SEO Audits</h5>
                  <p>Zero crawl errors, clean canonicals, XML sitemaps, and Core Web Vitals compliance.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Local SEO & GMB</h5>
                  <p>Rank in top 3 Google Map Packs for local high-conversion queries in Pune and target markets.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Keyword Strategy</h5>
                  <p>Target buyer-intent search queries with structured landing page siloing and high CTR copy.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>On-Page & Schema</h5>
                  <p>Structured JSON-LD microdata for rich snippets, FAQ cards, and fast Google crawling.</p>
                </div>
              </div>

              {/* Direct Link to SEO, Blogging & GBP Portal */}
              <div style={{ marginTop: '14px' }}>
                <Link 
                  to="/seo-blogging-google-business-profile" 
                  className="btn btn-primary" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '8px 20px', 
                    borderRadius: '9999px', 
                    fontWeight: 700, 
                    fontSize: '13px',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' 
                  }}
                >
                  <span>Explore SEO & Google Ranking Services</span>
                  <span style={{ fontSize: '20px', alignContent: "center" }}>→</span>
                </Link>
              </div>
            </div>

            <div className={styles.showcaseRight}>
              <div className={styles.phoneDeck}>
                <div 
                  className={`${styles.miniPhone} ${styles.phone1}`}
                  onClick={() => setActiveLightboxImg("https://res.cloudinary.com/dqc1awrnc/image/upload/v1792410812/seo-image1_ccxbbl.png")}
                  title="Click to view full screen"
                  style={{ cursor: 'pointer' }}
                >
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792410812/seo-image1_ccxbbl.png" alt="Google Search Rank #1 Mobile Mockup" />
                </div>
                <div 
                  className={`${styles.miniPhone} ${styles.phone2}`}
                  onClick={() => setActiveLightboxImg("https://res.cloudinary.com/dqc1awrnc/image/upload/v1792411000/seo-image2_yxbqpd.png")}
                  title="Click to view full screen"
                  style={{ cursor: 'pointer' }}
                >
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792411000/seo-image2_yxbqpd.png" alt="Google Search Console Organic Traffic" />
                </div>
                <div 
                  className={`${styles.miniPhone} ${styles.phone3}`}
                  onClick={() => setActiveLightboxImg("https://res.cloudinary.com/dqc1awrnc/image/upload/v1792410811/seo-image3_zsbdwa.png")}
                  title="Click to view full screen"
                  style={{ cursor: 'pointer' }}
                >
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792410811/seo-image3_zsbdwa.png" alt="Core Web Vitals & SEO Score Dashboard" />
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* CTA */}

<section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Connect with an Architect</h2>
            <p>We work with custom design proposals and operational maps. Schedule a consultation call to align your project goals.</p>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '14px 32px' }}>
              Schedule Call
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxImg && createPortal(
        <div 
          className={styles.lightboxOverlay} 
          onClick={() => setActiveLightboxImg(null)}
        >
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.lightboxClose} 
              onClick={() => setActiveLightboxImg(null)}
            >
              &times;
            </button>
            <img src={activeLightboxImg} alt="Enlarged View" />
          </div>
        </div>,
        document.body
      )}

    </div>
  )
}
