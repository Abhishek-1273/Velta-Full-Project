import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { CoverflowCarousel } from '../../components/CoverflowCarousel/CoverflowCarousel'
import styles from './Services.module.css'

const servicesSlides = [
  {
    title: 'Website Development',
    subtitle: 'We design and build high-performance web systems tailored to your business operations. Optimized for loading speed, device responsiveness, and top SEO ranking.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792408083/web_development_4k_fyoa97.jpg',
    alt: 'Website Development Services',
    features: ['React/Next.js SPAs', 'Custom Admin Portals', 'Lighthouse Score 98%+', 'Kin CRM Integrations', 'On-Page SEO Systems', 'SSL Data Isolation'],
    meta: [
      { label: 'Featured CRM', value: 'Kin Property Web Portal' },
      { label: 'Speed Score', value: '98%+ Lighthouse Rating' },
      { label: 'Tech Stack', value: 'React / Node / Vite SPA' },
      { label: 'Security', value: 'SSL & Data Isolation' }
    ]
  },
  {
    title: 'Mobile Applications',
    subtitle: 'Custom hybrid iOS and Android applications engineered with fluid 60fps micro-animations, push notifications, and reliable offline-first database synchronization.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792408082/mobile_app_development_4k_xzvwcd.jpg',
    alt: 'Mobile Applications Services',
    features: ['Hybrid iOS & Android', 'Offline Synchronization', '60 FPS Transitions', 'Push Notification APIs', 'Native Hardware Access', 'WhatsFlow Suite Ready'],
    meta: [
      { label: 'Suites Built', value: 'WhatsFlow, Docket14, Me & Mine' },
      { label: 'Framework', value: 'React Native / Flutter' },
      { label: 'Native Features', value: 'Push Notification Sync' },
      { label: 'Target OS', value: 'iOS, Android & Tablets' }
    ]
  },
  {
    title: 'Automation Systems',
    subtitle: 'Connect your inbound lead channels, CRM platforms, and message triggers in a single operational loop to automatically route prospects and save manual entry hours.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792408086/automation_system_4k_i2rc1i.jpg',
    alt: 'Automation Systems Services',
    features: ['CRM Pipeline Automation', 'Lead Routing Systems', 'WhatsFlow Lead Engine', 'Google Sheets Integration', 'Invoice & PDF Automation', 'SMTP Email Drips'],
    meta: [
      { label: 'Lead Routing', value: 'WhatsFlow Round-Robin' },
      { label: 'Integrations', value: 'Salesforce, Zoho, Google Sheets' },
      { label: 'Auto Tasks', value: 'Invoicing & PDF generation' },
      { label: 'Email System', value: 'SMTP Automated drips' }
    ]
  },
  {
    title: 'Performance Marketing',
    subtitle: 'High-ROI paid advertising campaigns engineered across Meta Campaign Ads, Insta Boost Ads, Google Ads, ChatGPT Ads, and LinkedIn Ads to capture qualified inbound leads.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792408082/digital_marketing_4k_hwpovn.jpg',
    alt: 'Performance Marketing Services',
    features: [
      'Meta Campaign Ads',
      'Insta Boost Ads',
      'Google Ads',
      'ChatGPT Ads',
      'LinkedIn Ads'
    ],
    meta: [
      { label: 'Social Ads', value: 'Meta Campaign Ads & Insta Boost' },
      { label: 'Search & AI', value: 'Google Ads & ChatGPT Ads' },
      { label: 'B2B Network', value: 'LinkedIn Ads' },
      { label: 'Lead Funnel', value: 'Direct CRM routing & high ROI' }
    ]
  },
  {
    title: 'Social Media Handling',
    subtitle: 'Establish a high-authority digital presence on Instagram and LinkedIn with consistent branding guides, professional copywriting, and creative Reels content curation.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792408083/social_media_linkedin_handling_4k_jbzz4r.jpg',
    alt: 'Social Media Handling Services',
    features: ['Instagram Profile Scale', 'LinkedIn Page Scaling', 'Reels & Video Curation', 'Organic Post Curation', 'Weekly Content Calendar', 'Targeted Lead Pipelines'],
    meta: [
      { label: 'Channels Curation', value: 'Instagram & LinkedIn' },
      { label: 'Deliverables', value: 'Posters, Reels Editing, Copy' },
      { label: 'Engagement', value: 'Organic growth & leads' },
      { label: '3D Content', value: 'Abstract video generation' }
    ]
  },
  {
    title: 'Search Engine Optimization (SEO)',
    subtitle: 'Data-driven technical SEO audits, keyword ranking strategies, speed optimizations (98+ Lighthouse), and on-page schema architecture to dominate Google search results.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792408089/seo_google_ranking_4k_wrf7wj.jpg',
    alt: 'Search Engine Optimization (SEO) Services',
    features: ['Technical SEO Audits', 'Local SEO & GMB Domination', 'High-Intent Keyword Research', 'Schema & Rich Snippets', '98+ Lighthouse Speed', 'Competitor Gap Analysis'],
    meta: [
      { label: 'Organic Search', value: 'Google SERP Ranking' },
      { label: 'Audit Score', value: '98%+ Core Web Vitals' },
      { label: 'Architecture', value: 'JSON-LD Schema Markup' },
      { label: 'Local Visibility', value: 'Google Business Profile' }
    ]
  }
]

const socialImages = [
  {
    title: 'LinkedIn Company Page (iPad View)',
    desc: 'Velta LinkedIn corporate authority presence',
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
  const [activeIdx, setActiveIdx] = useState(0)
  const [activeLightboxImg, setActiveLightboxImg] = useState(null)

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
      
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.bg}>
          <div className={styles.grid} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="tag">Service Catalog</span>
            <h1 className={styles.title}>
              Engineering Quality<br />
              <span className="gradient-text">Operational Services</span>
            </h1>
            <p className={styles.sub}>
              Swipe or drag to explore the complete catalog of custom development, automation pipelines, and marketing services we engineer at VeltaZ.
            </p>
          </div>
        </div>
      </section>

      {/* DYNAMIC COVERFLOW CAROUSEL */}
      <section className={styles.servicesSection}>
        <div className="container" style={{ overflow: 'visible' }}>
          <CoverflowCarousel 
            slides={servicesSlides} 
            cardWidth="clamp(160px, 22vw, 220px)"
            rotate={35}
            depth={0.45}
            perspective={4}
            loop={true}
            showCaption={true}
            showPagination={true}
            showNavigation={false}
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
                  to="/services/website-development" 
                  className="btn btn-primary" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '8px 18px', 
                    borderRadius: '8px', 
                    fontWeight: 700, 
                    fontSize: '13px',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' 
                  }}
                >
                  <span>Explore Website Packages & Pricing</span>
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
                  <h5>Me & Mine (Prototype)</h5>
                  <p>Interactive concept: matchmaking UI, location filters & chat flows.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Offline Sync</h5>
                  <p>Guaranteed sync logic for low network coverage zones.</p>
                </div>
              </div>
              {/* Direct Link to Mobile App Development Portal */}
              <div style={{ marginTop: "14px" }}>
                <Link 
                  to="/services/mobile-app-development" 
                  className="btn btn-primary" 
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "8px", 
                    padding: "8px 18px", 
                    borderRadius: "8px", 
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
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792475226/whatsflow_cbybon.jpg" alt="WhatsFlow App screen" />
                </div>
                <div className={`${styles.miniPhone} ${styles.phone3}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786538759/IMG-20260726-WA0025.jpg_1_uq78d1.jpg" alt="Me & Mine App screen" />
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

              {/* DIRECT CONTENT STUDIO CTA BUTTON */}
              <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <Link
                  to="/content"
                  className="btn btn-primary"
                  style={{
                    padding: '12px 28px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '14.5px',
                    fontWeight: 700,
                    boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)'
                  }}
                >
                  <span>Explore Content Studio & Portfolio</span>
                  <span style={{ fontSize: '20px', alignContent: "center" }}>→</span>
                </Link>
                <Link
                  to="/services/performance-marketing"
                  className="btn btn-outline"
                  style={{
                    padding: '12px 22px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13.5px',
                    fontWeight: 600
                  }}
                >
                  <span>Explore Performance Marketing (5 Ads)</span>
                  <span style={{ fontSize: '18px' }}>→</span>
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
                  to="/services/seo-blogging-google-business-profile" 
                  className="btn btn-primary" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '8px 18px', 
                    borderRadius: '8px', 
                    fontWeight: 700, 
                    fontSize: '13px',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' 
                  }}
                >
                  <span>Explore SEO, Blogging & GBP Packages</span>
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
