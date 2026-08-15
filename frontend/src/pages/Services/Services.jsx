import React from 'react'
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

export default function Services() {
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

    </div>
  )
}
