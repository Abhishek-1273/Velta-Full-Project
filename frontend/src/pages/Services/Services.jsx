import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { CoverflowCarousel } from '../../components/CoverflowCarousel/CoverflowCarousel'
import styles from './Services.module.css'

const servicesSlides = [
  {
    title: 'Website Development',
    subtitle: 'We design and build bespoke, high-performance web systems tailored to your business operations. Optimized for loading speed, device responsiveness, and top SEO ranking.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786802524/Website_Development_m3kdra.png',
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
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786802524/Mobile_Development_j7nyto.png',
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
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786802524/Automations_Systems_a2xnhc.png',
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
    title: 'Paid Campaigns',
    subtitle: 'Targeted advertising campaigns on Facebook and Instagram directly integrated with WhatsFlow AI qualification funnels to maximize lead generation ROI.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786802524/Paid_Campaigns_ixnhiu.png',
    alt: 'Paid Campaigns Services',
    features: ['Meta Ad Campaigns', 'Instagram Target Ads', 'A/B Budget Testing', 'WhatsFlow Funnel Hooks', 'ROI Conversion Lift', 'Audience Demographics'],
    meta: [
      { label: 'Paid Networks', value: 'Meta / Instagram Ads' },
      { label: 'Form Integration', value: 'Direct CRM qualification hook' },
      { label: 'Performance', value: 'Continuous A/B budget test' },
      { label: 'ROI Scale', value: '3x lead conversion lift' }
    ]
  },
  {
    title: 'Social Media Handling',
    subtitle: 'Establish a high-authority digital presence on Instagram and LinkedIn with consistent branding guides, professional copywriting, and creative Reels content curation.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786802524/SocialMedia_Handling_beghhh.png',
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
    title: 'Graphic & 3D Designing',
    subtitle: 'Premium visual assets including brand logos, style books, high-fidelity Figma UX wireframes, and custom 3D product renders with smooth light animations.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786802524/Graphics_3d_Designing_z4gsnc.png',
    alt: 'Graphic & 3D Designing Services',
    features: ['3D Product Rendering', 'Premium Logo Redesigns', 'High-Fidelity Figma UX', 'Corporate Style Guides', 'Brand Identity Design', 'UI/UX System Audits'],
    meta: [
      { label: 'Visual Assets', value: 'Logos, Vector Posters' },
      { label: '3D Renders', value: 'Product modeling & animation' },
      { label: 'UI/UX Design', value: 'High-fidelity Figma mockups' },
      { label: 'Branding Pack', value: 'Complete style guidelines' }
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
    desc: 'Bespoke grid aesthetic and post handling',
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
            cardWidth="clamp(130px, 20vw, 200px)"
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

      {/* DOCK SHOWCASE SECTION */}
      <section className={styles.demoShowcaseSection}>
        <div className="container">
          <div className={styles.showcaseWrapper}>
            <div className={styles.showcaseLeft}>
              <span className="tag">Native App Suites</span>
              <h2>Cross-Platform Mobile Applications</h2>
              <p>
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
                  <h5>Me & Mine App</h5>
                  <p>Icebreakers, location filters, and real-time messaging.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Offline Sync</h5>
                  <p>Guaranteed sync logic for low network coverage zones.</p>
                </div>
              </div>
            </div>

            <div className={styles.showcaseRight}>
              <div className={styles.phoneDeck}>
                <div className={`${styles.miniPhone} ${styles.phone1}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786538519/Screenshot_20260812_180225_Docket_14.jpg_nxm7zh.jpg" alt="Docket14 App screen" />
                </div>
                <div className={`${styles.miniPhone} ${styles.phone2}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786538474/Screenshot_20260812_174058_WhatsFlow.jpg_kjed9h.jpg" alt="WhatsFlow App screen" />
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
          <div className={`${styles.showcaseWrapper} ${styles.showcaseWrapperReverse}`}>
            <div className={styles.showcaseLeft}>
              <span className="tag">Organic Curation</span>
              <h2>Social Media & LinkedIn Handling</h2>
              <p>
                We curate high-authority brand aesthetics, LinkedIn B2B posts, and creative Reels content calendars that generate organic client traction.
              </p>

              <div className={styles.liveLinksRow}>
                <span className={styles.liveLabel}>Live Reels:</span>
                <a href="https://www.instagram.com/reel/DbxGmIyK1fA/?igsh=NDJvYjVuMTQ1bmpt" target="_blank" rel="noopener noreferrer" className={styles.liveLink}>
                  Campaign Reel #1 ↗
                </a>
                <span className={styles.divider}>•</span>
                <a href="https://www.instagram.com/reel/DbppDy8q-RL/?igsh=MXQ0dWphMDhwcXBlNg==" target="_blank" rel="noopener noreferrer" className={styles.liveLink}>
                  Campaign Reel #2 ↗
                </a>
              </div>
              
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
            </div>

            <div className={styles.showcaseRight}>
              <div className={styles.phoneDeck}>
                <div className={`${styles.miniPhone} ${styles.phone1}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786862364/Instagram_Followers_gnkqhb.jpg" alt="Velta Instagram Follower Growth" />
                </div>
                <div className={`${styles.miniPhone} ${styles.phone2}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786862364/Instagram_Insights_x8jsae.jpg" alt="Velta Instagram Insights Graph" />
                </div>
                <div className={`${styles.miniPhone} ${styles.phone3}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786862364/Instagram_Views_gjeylm.jpg" alt="Velta Instagram Reels Views" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Device Row (iPad on left, Laptop on right) */}
          <div className={styles.bottomDeviceRow}>
            {/* iPad Mockup */}
            <div className={styles.ipadMockup} onClick={() => setActiveLightboxImg("https://res.cloudinary.com/dqc1awrnc/image/upload/v1786862364/LinkedIn_bxqjpj.jpg")} title="Click to view full screen">
              <div className={styles.ipadScreen}>
                <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786862364/LinkedIn_bxqjpj.jpg" alt="Velta LinkedIn Page on Tablet" />
              </div>
            </div>

            {/* Laptop Mockup */}
            <div className={styles.laptopMockup} onClick={() => setActiveLightboxImg("https://res.cloudinary.com/dqc1awrnc/image/upload/v1786873647/Instagram_Page_Handling_odzgs1.png")} title="Click to view full screen">
              <div className={styles.laptopScreen}>
                <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786873647/Instagram_Page_Handling_odzgs1.png" alt="Velta Instagram Profile on Laptop" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRAPHIC DESIGN SHOWCASE SECTION */}
      <section className={styles.demoShowcaseSection} style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.showcaseWrapper}>
            <div className={styles.showcaseLeft}>
              <span className="tag">Brand Identity</span>
              <h2>Graphic & 3D Logo Audits</h2>
              <p>
                We audit flat, outdated vector assets and redesign them into premium matte black corporate marks, style guides, and high-fidelity Figma UX wireframes.
              </p>
              
              <div className={styles.showcaseGrid}>
                <div className={styles.showcaseItem}>
                  <h5>Logo Redesigns</h5>
                  <p>Upgrades from generic color symbols to premium corporate logos.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Figma UI/UX</h5>
                  <p>High-fidelity wireframes and interactive web mockups.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>3D Modeling</h5>
                  <p>Custom product renders with realistic textures and lighting angles.</p>
                </div>
                <div className={styles.showcaseItem}>
                  <h5>Brand Guidelines</h5>
                  <p>Corporate typography scales, typography books, and vector files.</p>
                </div>
              </div>
            </div>

            <div className={styles.showcaseRight}>
              <div className={styles.phoneDeck}>
                <div className={`${styles.miniPhone} ${styles.phone1}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786872697/Veltaz_xw1lgm.png" alt="Velta Logo Design Layout" />
                </div>
                <div className={`${styles.miniPhone} ${styles.phone2}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786878180/KinProperty_bb9c1m.png" alt="Creative Logo Design Workspace" />
                </div>
                <div className={`${styles.miniPhone} ${styles.phone3}`}>
                  <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786872696/Me_and_Mine_sjol5s.png" alt="Velta Tech Assets Mockup" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Comparison Row (2D Blueprint Plan vs 3D Model Visualization) */}
          <div className={styles.bottomComparisonRow}>
            {/* 2D Plan (Before) */}
            <div className={styles.comparisonCardLarge} onClick={() => setActiveLightboxImg("https://res.cloudinary.com/dqc1awrnc/image/upload/v1786875137/2dPlot_uepahq.jpg")} title="Click to view full screen">
              <div className={styles.cardBadge}>2D Draft Plan</div>
              <div className={styles.cardImageContainerLarge} style={{ background: '#ffffff' }}>
                <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786875137/2dPlot_uepahq.jpg" alt="2D Layout Plan Blueprint" />
              </div>
            </div>

            {/* 3D Model (After) */}
            <div className={styles.comparisonCardLarge} onClick={() => setActiveLightboxImg("https://res.cloudinary.com/dqc1awrnc/image/upload/v1786862364/3dPlot_q1mlsy.png")} title="Click to view full screen">
              <div className={styles.cardBadge}>3D Render Concept</div>
              <div className={styles.cardImageContainerLarge} style={{ background: '#0b0f19' }}>
                <img src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1786862364/3dPlot_q1mlsy.png" alt="3D Model Visualization Render" />
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
            <p>We work with custom design proposals and operational maps. Schedule a consultation call to align your project blueprints.</p>
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
