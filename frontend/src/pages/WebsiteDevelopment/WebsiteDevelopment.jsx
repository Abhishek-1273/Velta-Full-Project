import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaWhatsapp, 
  FaCheck, 
  FaPlay, 
  FaPause, 
  FaArrowRight, 
  FaLock, 
  FaShieldAlt, 
  FaMobileAlt, 
  FaSearch, 
  FaCode, 
  FaImage, 
  FaSitemap, 
  FaRocket,
  FaPlus,
  FaMinus,
  FaLaptopCode,
  FaDatabase
} from 'react-icons/fa'
import styles from './WebsiteDevelopment.module.css'

const WHATSAPP_NUMBER = '919960240648'
const WHATSAPP_MSG = encodeURIComponent("Hi VeltaZ, I'm interested in website development. I'd like to discuss my requirements and get a project estimate.")
const WHATSAPP_BUSINESS_MSG = encodeURIComponent("Hi VeltaZ, I'm interested in the Business Website package (₹19,999). I'd like to discuss my requirements.")
const WHATSAPP_DYNAMIC_MSG = encodeURIComponent("Hi VeltaZ, I'm interested in the Dynamic Website package (₹24,999). I'd like to discuss my requirements.")

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`
const WHATSAPP_BUSINESS_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_BUSINESS_MSG}`
const WHATSAPP_DYNAMIC_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DYNAMIC_MSG}`

// FAQ items
const faqItems = [
  {
    q: "What is the difference between static and dynamic websites?",
    a: "A business website presents relatively stable information (like company background, services, portfolio, and contact details). A dynamic website can display and manage changing content through a database, CMS, or admin panel (such as real estate listings, blogs, or product catalogues). Both are published live on the web and fully mobile-responsive."
  },
  {
    q: "Does the website package include hosting?",
    a: "Domain registration and annual web hosting charges are separate unless explicitly included in your final quotation. We assist you in setting up hosting under your own account or manage it transparently with zero markup."
  },
  {
    q: "Can you add features later?",
    a: "Yes, absolutely. Because we write clean, modular, modern code (React, Vite, Node), additional pages, API integrations, and new dynamic modules can be scoped and added seamlessly at any point in the future."
  },
  {
    q: "Is SEO included?",
    a: "Basic technical and on-page SEO are included within the agreed scope (clean semantic tags, meta descriptions, sitemap configuration, mobile responsiveness, and speed optimization). Ongoing SEO campaigns, monthly blog creation, and backlink outreach are separate ongoing services."
  },
  {
    q: "How long does it take?",
    a: "A standard Business Website typically takes 7 to 14 business days, while a Dynamic Website takes 2 to 4 weeks depending on the agreed content models and review rounds. A detailed timeline is agreed upon before development begins."
  },
  {
    q: "Can you redesign an existing website?",
    a: "Yes. We can audit your current website, restructure the layout and customer journey, and rebuild it using modern, high-speed technologies under an agreed redesign scope."
  }
]

export default function WebsiteDevelopment() {
  const [currency, setCurrency] = useState('INR')
  const [maintenanceDuration, setMaintenanceDuration] = useState('monthly') // 'monthly' | '3months' | '6months' // 'INR' | 'USD'
  const [projectTab, setProjectTab] = useState('website') // 'website' | 'admin'
  const [openFaq, setOpenFaq] = useState(0) // first FAQ open by default
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(true)
  const [projectVideoPlaying, setProjectVideoPlaying] = useState(true)

  const heroVideoRef = useRef(null)
  const projectVideoRef = useRef(null)

  // SEO Title & Meta tags
  useEffect(() => {
    document.title = "Website Development Services | VeltaZ"
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = "description"
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = "VeltaZ builds professional business websites, responsive landing pages and dynamic web solutions tailored to your business goals."
  }, [])

  // Video play/pause toggle helpers
  const toggleHeroVideo = () => {
    if (heroVideoRef.current) {
      if (heroVideoPlaying) {
        heroVideoRef.current.pause()
        setHeroVideoPlaying(false)
      } else {
        heroVideoRef.current.play().catch(() => {})
        setHeroVideoPlaying(true)
      }
    }
  }

  const toggleProjectVideo = () => {
    if (projectVideoRef.current) {
      if (projectVideoPlaying) {
        projectVideoRef.current.pause()
        setProjectVideoPlaying(false)
      } else {
        projectVideoRef.current.play().catch(() => {})
        setProjectVideoPlaying(true)
      }
    }
  }

  return (
    <div className={styles.page}>
      
      {/* ── 1. HERO SECTION ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroGrid} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              WEBSITE DEVELOPMENT · VELTAZ
            </span>
            <h1 className={styles.heroTitle}>
              Websites Built Around Your <span className={styles.heroTitleHighlight}>Business Goals.</span>
            </h1>
            <p className={styles.heroSub}>
              We build professional business websites and dynamic web solutions that help businesses present their services, improve customer experience and create clear paths for enquiries.
              <span>
                From simple business websites to data-driven listing platforms, we focus on useful functionality, responsive design and a clear project scope.
              </span>
            </p>

            <div className={styles.heroActions}>
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.heroWhatsappBtn}
              >
                <FaWhatsapp size={19} />
                <span>Discuss Your Project</span>
              </a>
              <a href="#featured-work" className={styles.heroSecondaryBtn}>
                <span>Explore Our Work</span>
                <FaArrowRight size={13} />
              </a>
            </div>

            {/* Hero Live Browser Visual (KIN Property Management) */}
            <div className={styles.heroBrowserWrapper}>
              <div className={styles.browserFrame}>
                <div className={styles.browserTopBar}>
                  <div className={styles.browserDots}>
                    <span className={`${styles.browserDot} ${styles.browserDotClose}`} />
                    <span className={`${styles.browserDot} ${styles.browserDotMin}`} />
                    <span className={`${styles.browserDot} ${styles.browserDotMax}`} />
                  </div>
                  <div className={styles.browserUrlBar}>
                      <FaLock className={styles.browserUrlLock} />
                      <span className={styles.urlDesktopText}>https://kinpropertymanagement.com</span>
                      <span className={styles.urlMobileText}>kinpropertymanagement.com</span>
                    </div>
                </div>

                <div 
                  className={styles.browserScreen} 
                  onClick={toggleHeroVideo}
                  title={heroVideoPlaying ? "Click to Pause" : "Click to Play"}
                >
                  <video
                    ref={heroVideoRef}
                    src="https://pub-e1d70b5018194b73862065bede05370e.r2.dev/lv_0_20261019161435.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.browserVideo}
                  />
                  <div className={styles.browserOverlayInfo}>
                    <div className={styles.browserBadge}>
                        <span className={styles.liveGreenDot}>●</span>
                        <span className={styles.badgeFullText}>Live Production · KIN Property Management</span>
                        <span className={styles.badgeShortText}>Live: KIN Property</span>
                      </div>
                    <button 
                      className={styles.browserPlayControl} 
                      onClick={(e) => { e.stopPropagation(); toggleHeroVideo(); }}
                      aria-label={heroVideoPlaying ? "Pause Video" : "Play Video"}
                    >
                      {heroVideoPlaying ? <FaPause size={12} /> : <FaPlay size={12} style={{ marginLeft: 2 }} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2 & 3. WHAT WE BUILD & PRICING PRESENTATION ── */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.sectionHeader} style={{ marginBottom: '26px' }}>
            <span className="tag">Transparent Pricing</span>
            <h2>Two Clear Development Options</h2>
            <p>
              Both static and dynamic solutions priced openly. No artificial discounts, no surprise invoices.
            </p>

            
          </div>

          <div className={styles.pricingGrid}>
            
            {/* OPTION A: Business Website */}
            <div className={styles.pricingCard}>
              <div className={styles.cardTop}>
                <div className={styles.cardTagRow}>
                  <span className={styles.cardTag}>Option A</span>
                  <span style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 600 }}>Fixed Scope</span>
                </div>
                <h3 className={styles.cardTitle}>Business Website</h3>
                <div className={styles.cardSubtitle}>Best for a professional online presence</div>

                <div className={styles.priceWrapper}>
                  <div className={styles.priceHeader}>
                    <span className={styles.priceAmount}>₹19,999</span>
                  </div>
                  <span className={styles.priceCurrency}>All-Inclusive Fixed Investment</span>
                </div>

                <div className={styles.cardObjective}>
                  This option is for websites whose content is primarily fixed and does not require a custom database or admin dashboard.
                </div>
              </div>

              <ul className={styles.deliverablesList}>
                {[
                  "Up to 5 pages: Home, About, Services, Portfolio and Contact.",
                  "Responsive desktop, tablet and mobile design.",
                  "Professional template-based or lightly customised design.",
                  "Basic content structuring using client-provided information.",
                  "Contact form and WhatsApp CTA using an agreed, workable setup.",
                  "Basic technical and on-page SEO.",
                  "Page titles, meta descriptions and logical headings.",
                  "Sitemap configuration and launch-readiness checks.",
                  "Basic testing of links, layouts and contact functionality.",
                  "2 revision rounds.",
                  "14-day post-launch bug-fix support for the agreed scope."
                ].map((item, idx) => (
                  <li key={idx} className={styles.deliverableItem}>
                    <FaCheck className={styles.checkIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={WHATSAPP_BUSINESS_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.cardCtaBtn} ${styles.btnOutline}`}
              >
                <span>Discuss Business Website</span>
                <FaArrowRight size={13} />
              </a>
            </div>

            {/* OPTION B: Dynamic Website */}
            <div className={`${styles.pricingCard} ${styles.featuredCard}`}>
              <div className={styles.cardTop}>
                <div className={styles.cardTagRow}>
                  <span className={`${styles.cardTag} ${styles.popularBadge}`}>Option B · Manageable</span>
                  <span className={styles.cmsBadge}>Database / CMS</span>
                </div>
                <h3 className={styles.cardTitle}>Dynamic Website</h3>
                <div className={styles.cardSubtitle}>Best for businesses that need manageable, changing content</div>

                <div className={styles.priceWrapper}>
                  <div className={styles.priceHeader}>
                    <span className={styles.priceAmount}>₹24,999</span>
                  </div>
                  <span className={styles.priceCurrency}>Custom Database & CMS Scope</span>
                </div>

                <div className={styles.cardObjective}>
                  The starting price applies only to a simple dynamic website with one content type (e.g. property listings or blog articles) and limited functionality.
                </div>
              </div>

              <ul className={styles.deliverablesList}>
                {[
                  "Up to 5 core website pages.",
                  "One agreed dynamic content module, such as property listings or blog content.",
                  "Responsive design across all devices.",
                  "Database or CMS integration appropriate to the agreed implementation.",
                  "A simple administrative interface for managing the agreed content, where included in final scope.",
                  "Ability to add, edit and delete the agreed content.",
                  "Listing or content-detail pages.",
                  "Basic technical and on-page SEO.",
                  "Sitemap configuration and launch-readiness checks.",
                  "Testing of the agreed dynamic functionality.",
                  "2 revision rounds.",
                  "14-day post-launch bug-fix support for the agreed scope."
                ].map((item, idx) => (
                  <li key={idx} className={styles.deliverableItem}>
                    <FaCheck className={styles.checkIcon} style={{ color: '#3b82f6' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* EXPLICIT EXCLUSIONS NOTICE */}
              <div className={styles.exclusionsBox}>
                <div className={styles.exclusionsTitle}>
                  <FaShieldAlt size={12} />
                  <span>Important Scope Boundary</span>
                </div>
                Advanced user roles, complex search and filters, payments, e-commerce, booking engines, multiple integrations and complex custom workflows are excluded from the starting package and quoted separately.
              </div>

              <a 
                href={WHATSAPP_DYNAMIC_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.cardCtaBtn} ${styles.btnPrimary}`}
              >
                <span>Discuss Dynamic Website</span>
                <FaArrowRight size={13} />
              </a>
            </div>

          </div>

          {/* PRICING DISCLAIMER */}
          <div className={styles.pricingDisclaimer}>
            <strong>Transparent Terms:</strong> Domain registration, hosting, paid tools, premium plugins and third-party charges are excluded unless explicitly stated in the quotation. Taxes are charged where applicable. These prices serve as introductory rates for the defined scope. Requirements beyond the package must be scoped and quoted separately.
          </div>
        </div>
      </section>

      {/* ── 4. HOW OUR APPROACH IS DIFFERENT ── */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Strategic Engineering</span>
            <h2>We Build for the Business, Not Just the Browser.</h2>
            <p>
              VeltaZ focuses on making websites useful for the actual business objective rather than adding unnecessary features.
            </p>
          </div>

          <div className={styles.processGrid}>
            {[
              {
                step: "01",
                title: "Understand Objective",
                desc: "We understand the business and the website's purpose first. Who are your clients, and what action do they need to take?"
              },
              {
                step: "02",
                title: "Plan Journey & Scope",
                desc: "Plan the structure, content hierarchy and customer journey with a clear, agreed-upon scope of work."
              },
              {
                step: "03",
                title: "Design & Build",
                desc: "Design and build the agreed solution using high-performance code, fast loading speeds and modern responsive styling."
              },
              {
                step: "04",
                title: "Test, Launch & Handover",
                desc: "Test cross-device functionality, verify contact pathways, launch on production, and hand over the completed work."
              }
            ].map(p => (
              <div key={p.step} className={styles.processCard}>
                <span className={styles.processNum}>{p.step}</span>
                <h4 className={styles.processTitle}>{p.title}</h4>
                <p className={styles.processDesc}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.philosophyNotice}>
            <strong>Honest Partnership:</strong> We focus on practical execution and reliability. We do not guarantee arbitrary sales figures, artificial conversion spikes, or instant search ranking promises.
          </div>
        </div>
      </section>

      {/* ── 5. BASIC SEO INCLUDED ── */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Search Foundations</span>
            <h2>Basic SEO Included in Both Packages</h2>
            <p>
              Both website options include the agreed foundational setup to ensure search crawlers can index and understand your content cleanly.
            </p>
          </div>

          <div className={styles.seoGrid}>
            {[
              {
                icon: <FaMobileAlt />,
                title: "Responsive Layouts",
                desc: "Fluid layouts optimized to pass mobile-friendliness audits on smartphones, tablets, and desktops."
              },
              {
                icon: <FaSearch />,
                title: "Descriptive Page Titles & Meta",
                desc: "Targeted titles and meta descriptions written for every core page to display properly on search engine result pages."
              },
              {
                icon: <FaCode />,
                title: "Logical Semantic Headings",
                desc: "Clean H1 through H4 document outline with crawlable internal navigation links."
              },
              {
                icon: <FaImage />,
                title: "Image Optimisation & Alt Text",
                desc: "Optimized image compression and descriptive alt text attributes for accessibility and visual search."
              },
              {
                icon: <FaSitemap />,
                title: "Sitemap & Indexing Readiness",
                desc: "XML sitemap configuration and indexing-readiness checks to prepare search engines for crawling."
              },
              {
                icon: <FaRocket />,
                title: "Launch Testing & QA",
                desc: "Comprehensive pre-flight checks of page links, form submissions, and loading speed."
              }
            ].map((s, idx) => (
              <div key={idx} className={styles.seoCard}>
                <div className={styles.seoIconWrapper}>
                  {s.icon}
                </div>
                <h4 className={styles.seoCardTitle}>{s.title}</h4>
                <p className={styles.seoCardDesc}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.pricingDisclaimer} style={{ marginTop: 32 }}>
            <strong>Scope Note:</strong> Ongoing SEO campaigns, regular blog writing, backlink outreach and Google Business Profile management are not included in these website packages. A sitemap prepares the site for crawling but does not guarantee indexing or rankings.
          </div>
        </div>
      </section>

      {/* ── 6. FEATURED PROJECT — KIN PROPERTY MANAGEMENT ── */}
      <section id="featured-work" className="section" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', padding: '48px 0' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Live Project Demonstration</span>
            <h2>Real Project Showcase</h2>
            <p>
              See how we engineer full-stack platforms — featuring the KIN Property portal with live listing search and an internal agent CRM.
            </p>
          </div>

          <div className={styles.featuredProjectWrapper}>
            {/* TAB SELECTOR */}
            <div className={styles.projectTabRow}>
              <button
                type="button"
                onClick={() => setProjectTab('website')}
                className={`${styles.projectTabBtn} ${projectTab === 'website' ? styles.projectTabActive : ''}`}
              >
                <FaLaptopCode />
                <span>Client Portal (Property Listings)</span>
              </button>
              <button
                type="button"
                onClick={() => setProjectTab('admin')}
                className={`${styles.projectTabBtn} ${projectTab === 'admin' ? styles.projectTabActive : ''}`}
              >
                <FaDatabase />
                <span>Admin & Agent CRM Interface</span>
              </button>
            </div>

            <div className={styles.projectContentGrid}>
              
              {/* VIDEO DECK */}
              <div 
                className={styles.projectVideoDeck}
                onClick={toggleProjectVideo}
                title={projectVideoPlaying ? "Click to Pause" : "Click to Play"}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.browserHeader}>
                  <div className={styles.browserDots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                  </div>
                  <div className={styles.browserUrl}>
                    {projectTab === 'website' ? 'https://kinpropertymanagement.com' : 'https://admin.kinpropertymanagement.com'}
                  </div>
                </div>
                <div className={styles.projectVideoContainer}>
                  <video
                    ref={projectVideoRef}
                    key={projectTab}
                    src={
                      projectTab === 'website'
                        ? "https://pub-e1d70b5018194b73862065bede05370e.r2.dev/lv_0_20261019161435.mp4"
                        : "https://pub-e1d70b5018194b73862065bede05370e.r2.dev/lv_0_20261019162600.mp4"
                    }
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>

              {/* SPECS & DETAILS */}
              <div className={styles.projectSpecsCol}>
                <div>
                  <span className="tag" style={{ marginBottom: 10 }}>
                    {projectTab === 'website' ? 'Dynamic Listing Platform' : 'Management Workspace'}
                  </span>
                  <h3>
                    {projectTab === 'website' 
                      ? 'KIN Property Website & Listing Search' 
                      : 'KIN Agency Admin Dashboard'}
                  </h3>
                  <p>
                    {projectTab === 'website'
                      ? 'Engineered to showcase residential and commercial properties with verified details, neighborhood mapping, responsive image galleries, and instant WhatsApp inquiry routing.'
                      : 'A dedicated administrative interface allowing staff to add new properties, update rental pricing, verify listings, and track prospective buyer leads without technical friction.'}
                  </p>
                </div>

                <div className={styles.highlightsList}>
                  {(projectTab === 'website' ? [
                    "Structured property catalogue with location filters.",
                    "Detailed property single-page view with high-res galleries.",
                    "Direct phone and WhatsApp inquiry hooks for fast lead response.",
                    "Responsive layout operating smoothly on mobile and desktop."
                  ] : [
                    "Simple CRUD module for adding and managing live listings.",
                    "Verification status controls and pricing updates.",
                    "Lead log monitoring for incoming client inquiries.",
                    "Streamlined back-office workflow designed for non-technical users."
                  ]).map((h, i) => (
                    <div key={i} className={styles.highlightItem}>
                      <span className={styles.highlightDot} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.projectBtnRow}>
                  <a 
                    href="https://kinpropertymanagement.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline" 
                    style={{ padding: '9px 18px', fontSize: 13 }}
                  >
                    <span>Visit Live Website</span>
                    <FaArrowRight size={12} />
                  </a>
                  <a 
                    href={WHATSAPP_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    style={{ padding: '9px 18px', fontSize: 13 }}
                  >
                    <span>Discuss Similar Project</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      
      {/* ── WEBSITE MAINTENANCE & CARE PLANS ── */}
      <section className={styles.maintenanceSection} id="maintenance">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Post-Launch Support</span>
            <h2>Keep Your Website Running Smoothly</h2>
            <p>
              Keep your website maintained after launch with ongoing checks, backups and small updates.
            </p>

            {/* DURATION / PREPAID DISCOUNT TOGGLE */}
            <div className={styles.durationToggleWrapper}>
              <div className={styles.durationToggle}>
                <button
                  type="button"
                  onClick={() => setMaintenanceDuration('monthly')}
                  className={`${styles.durationBtn} ${maintenanceDuration === 'monthly' ? styles.durationActive : ''}`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setMaintenanceDuration('3months')}
                  className={`${styles.durationBtn} ${maintenanceDuration === '3months' ? styles.durationActive : ''}`}
                >
                  <span>3 Months</span>
                  <span className={styles.discountBadge}>10% OFF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMaintenanceDuration('6months')}
                  className={`${styles.durationBtn} ${maintenanceDuration === '6months' ? styles.durationActive : ''}`}
                >
                  <span>6 Months</span>
                  <span className={styles.discountBadge}>20% OFF</span>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.careGrid}>
            
            {/* STATIC CARE */}
            <div className={styles.careCard}>
              <h3 className={styles.careTitle}>Static Website Care</h3>
              <div className={styles.careSub}>For standard business & portfolio sites</div>

              <div className={styles.carePriceRow}>
                <span className={styles.carePriceNum}>
                  {maintenanceDuration === 'monthly' ? '₹2,499' : maintenanceDuration === '3months' ? '₹6,747' : '₹11,995'}
                </span>
                <span className={styles.carePricePeriod}>
                  {maintenanceDuration === 'monthly' ? '/ month' :
                   maintenanceDuration === '3months' ? 'total for 3 mos' : 'total for 6 mos'}
                </span>
              </div>

              <div className={styles.careBillingNote}>
                {maintenanceDuration === 'monthly' && 'Billed monthly • Cancel anytime'}
                {maintenanceDuration === '3months' && '10% Prepaid Savings applied'}
                {maintenanceDuration === '6months' && '20% Prepaid Savings applied'}
              </div>

              <ul className={styles.careList}>
                <li className={styles.careItem}>
                  <FaCheck className={styles.careItemIcon} />
                  <span>Uptime & monthly health status check</span>
                </li>
                <li className={styles.careItem}>
                  <FaCheck className={styles.careItemIcon} />
                  <span>SSL certificate monitoring & security renewal</span>
                </li>
                <li className={styles.careItem}>
                  <FaCheck className={styles.careItemIcon} />
                  <span>Monthly full website cloud backup archives</span>
                </li>
                <li className={styles.careItem}>
                  <FaCheck className={styles.careItemIcon} />
                  <span>Minor text, phone number, image and link updates</span>
                </li>
                <li className={styles.careItem}>
                  <FaCheck className={styles.careItemIcon} />
                  <span>24–48h bug fix and email/WhatsApp support</span>
                </li>
              </ul>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi VeltaZ! I'm interested in the Static Website Care plan (₹1,999/mo). I'd like to discuss onboarding.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.cardCtaBtn} ${styles.btnOutline}`}
              >
                <span>Select Static Care</span>
                <FaArrowRight size={12} />
              </a>
            </div>

            {/* DYNAMIC CARE */}
            <div className={`${styles.careCard} ${styles.careCardFeatured}`}>
              <h3 className={styles.careTitle}>Dynamic Website Care</h3>
              <div className={styles.careSub}>For database-driven portals & CMS platforms</div>

              <div className={styles.carePriceRow}>
                <span className={styles.carePriceNum}>
                  {maintenanceDuration === 'monthly' ? '₹2,499' :
                   maintenanceDuration === '3months' ? '₹6,747' : '₹11,995'}
                </span>
                <span className={styles.carePricePeriod}>
                  {maintenanceDuration === 'monthly' ? '/ month' :
                   maintenanceDuration === '3months' ? 'total for 3 mos' : 'total for 6 mos'}
                </span>
              </div>

              <div className={styles.careBillingNote}>
                {maintenanceDuration === 'monthly' && 'Billed monthly • Cancel anytime'}
                {maintenanceDuration === '3months' && '10% Prepaid Savings applied'}
                {maintenanceDuration === '6months' && '20% Prepaid Savings applied'}
              </div>

              <ul className={styles.careList}>
                <li className={styles.careItem}>
                  <FaCheck className={styles.careItemIcon} />
                  <span>Database optimization & table maintenance</span>
                </li>
                <li className={styles.careItem}>
                  <FaCheck className={styles.careItemIcon} />
                  <span>Weekly automated database & asset cloud backups</span>
                </li>
                <li className={styles.careItem}>
                  <FaCheck className={styles.careItemIcon} />
                  <span>CMS / Admin portal software & security patching</span>
                </li>
                <li className={styles.careItem}>
                  <FaCheck className={styles.careItemIcon} />
                  <span>Minor content module & layout styling adjustments</span>
                </li>
                <li className={styles.careItem}>
                  <FaCheck className={styles.careItemIcon} />
                  <span>Priority technical response & operational troubleshooting</span>
                </li>
              </ul>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi VeltaZ! I'm interested in the Dynamic Website Care plan (₹2,499/mo). I'd like to discuss onboarding.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.cardCtaBtn} ${styles.btnPrimary}`}
              >
                <span>Select Dynamic Care</span>
                <FaArrowRight size={12} />
              </a>
            </div>

          </div>

          {/* ESSENTIAL TECHNICAL RULE NOTICE */}
          <div className={styles.careNoticeBox}>
            <strong>Technical Review Requirement:</strong> Dynamic web apps, e-commerce stores, and complex custom systems require a brief technical assessment before onboarding onto a maintenance plan. Care plans cover regular maintenance, backups, and small updates — unlimited custom feature development is not included and is quoted separately. Prepaid discounts apply to maintenance fees only.
          </div>
        </div>
      </section>

      {/* ── 7. FREQUENTLY ASKED QUESTIONS ── */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Questions & Answers</span>
            <h2>Frequently Asked Questions</h2>
            <p>Clear answers to common questions about our website packages, scopes, and processes.</p>
          </div>

          <div className={styles.faqWrapper}>
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index
              return (
                <div key={index} className={styles.faqItem}>
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`}>
                      {isOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className={styles.faqAnswer}>
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 8. FINAL CALL TO ACTION ── */}
      <section className={styles.finalCtaSection}>
        <div className="container">
          <div className={styles.finalCtaBox}>
            <span className="tag" style={{ marginBottom: 14 }}>Start The Conversation</span>
            <h2>Let's Build the Right Website for Your Business.</h2>
            <p>
              Tell us what your business needs to achieve. We'll help define the right website type, functionality and budget before development begins.
            </p>

            <div className={styles.finalBtnRow}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroWhatsappBtn}
                style={{ padding: '15px 32px', fontSize: '15.5px' }}
              >
                <FaWhatsapp size={20} />
                <span>Discuss Your Project</span>
              </a>
              <Link 
                to="/contact" 
                className={styles.heroSecondaryBtn}
                style={{ padding: '15px 28px', fontSize: '15px' }}
              >
                <span>Send An Enquiry</span>
                <FaArrowRight size={13} />
              </Link>
            </div>

            <div className={styles.ctaReassurance}>
              <span className={styles.reassuranceItem}>
                <FaCheck /> 100% Transparent Scoping
              </span>
              <span className={styles.reassuranceItem}>
                <FaCheck /> Direct Technical Consultation
              </span>
              <span className={styles.reassuranceItem}>
                <FaCheck /> No Unnecessary Vendor Lock-in
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
