import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Home.module.css'
import PhoneMockupBasic from '../../components/ui/phone-mockups-1'

// SEO (homepage only; previous values are restored on leave)
const SEO_TITLE = 'VeltaZ | Business Growth Through Strategy, Technology & Automation'
const SEO_DESC = 'VeltaZ helps businesses build digital solutions, strengthen their online presence and streamline operations through business strategy, technology, creative execution and automation.'

// Four core capabilities (links only to routes that exist in router.jsx)
const capabilities = [
  { num: '01', title: 'Research', desc: 'Understand markets, competitors, customers and opportunities before committing time and resources.', to: '/services' },
  { num: '02', title: 'Build', desc: 'Websites, mobile applications, web platforms and custom business systems built around real requirements.', to: '/website-development' },
  { num: '03', title: 'Grow', desc: 'Strengthen how your business presents itself, publish content and reach potential customers through digital channels.', to: '/seo-blogging-google-business-profile' },
  { num: '04', title: 'Automate', desc: 'Connect tools, streamline workflows and reduce repetitive operational tasks through appropriate automation.', to: '/automation-systems' },
]

// What we offer — short service details (routes verified in router.jsx)
// What we offer — short service details (routes verified in router.jsx)
const offers = [
  {
    key: 'web', tab: 'Website Development', to: '/website-development',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792436389/web_zbmt6u.png',
    desc: 'Business websites and web platforms designed around your goals and built to work well on every device.',
    points: ['Business and company websites', 'Custom admin portals', 'Responsive on mobile and desktop', 'On-page SEO setup', 'SSL-secured hosting setup'],
  },
  {
    key: 'app', tab: 'Mobile Applications', to: '/mobile-app-development',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792436389/app_speudl.jpg',
    desc: 'iOS and Android applications built around how your team and customers actually work.',
    points: ['Hybrid iOS and Android apps', 'Offline data synchronisation', 'Push notifications', 'Admin and user dashboards'],
  },
  {
    key: 'auto', tab: 'Automation Systems', to: '/automation-systems',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792436396/automation_b0h9bp.png',
    desc: 'Connect lead channels, CRMs and messaging so routing and routine follow-ups need less manual entry.',
    points: ['Lead routing', 'CRM pipeline automation', 'Google Sheets integration', 'Invoice and PDF generation', 'Automated email follow-ups'],
  },
  {
    key: 'seo', tab: 'SEO & Google Profile', to: '/seo-blogging-google-business-profile',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792436396/seo_np0wtz.png',
    desc: 'Improve how your business is found on Google through technical fixes, keyword research and local listings.',
    points: ['Technical SEO audits', 'Keyword research', 'Google Business Profile setup', 'Schema markup', 'SEO blogging'],
  },
  {
    key: 'social', tab: 'Social Media & Content', to: '/content',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792436392/social_handling_jxunsx.png',
    desc: 'Consistent branding and content for the channels your customers already use.',
    points: ['Instagram and LinkedIn management', 'Reels and video content', 'Posters and creatives', 'Weekly content calendar', 'Copywriting'],
  },
  {
    key: 'ads', tab: 'Performance Marketing', to: '/performance-marketing',
    img: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792436389/performance_s8jzdg.png',
    desc: 'High-ROI paid advertising campaigns engineered across search, social, and AI channels to generate qualified business enquiries.',
    points: [
      'Meta Campaign Ads',
      'Insta Boost Ads',
      'Google Ads',
      'ChatGPT Ads',
      'LinkedIn Ads'
    ],
  },
]

// How VeltaZ works
const steps = [
  {
    num: '01',
    phase: 'Immersion',
    title: 'Discover & Understand',
    desc: 'Deep-dive into business workflows, audience pain-points, and market opportunities to define clear requirements.',
    deliverable: 'Discovery & Strategic Brief'
  },
  {
    num: '02',
    phase: 'Architecture',
    title: 'Scope & Plan',
    desc: 'Map out the technical architecture, design wireframes, and agree on practical milestone timelines before coding.',
    deliverable: 'UI Blueprint & System Scope'
  },
  {
    num: '03',
    phase: 'Production',
    title: 'Engineer & Deploy',
    desc: 'Develop the agreed web, app, content, or automation systems with clean modular code, rigorous testing, and QA.',
    deliverable: 'Production Release & QA'
  },
  {
    num: '04',
    phase: 'Optimization',
    title: 'Scale & Improve',
    desc: 'Analyze live performance data, gather client insights, and deploy continuous enhancements to scale results.',
    deliverable: 'Ongoing Scaling & Support'
  },
]

// KIN case study — only what VeltaZ can state accurately.
const kinScope = [
  { title: 'Real-estate website', desc: 'A website for presenting the business and its properties online.' },
  { title: 'Digital presence', desc: 'Work on how the business shows up to potential customers online.' },
  { title: 'Content', desc: 'Content created to support the website and the brand.' },
  { title: 'Lead-management workflows', desc: 'Workflows for handling and following up on enquiries.' },
]

export default function Home() {
  const [kinImgOk, setKinImgOk] = useState(true)
  const [offerIdx, setOfferIdx] = useState(0)
  const offer = offers[offerIdx]

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
      
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.gridOverlay} />
          <div className={styles.ambientGlow1} />
          <div className={styles.ambientGlow2} />
        </div>
        <div className="container">
          <div className={styles.heroLayout}>
            <div className={styles.heroLeft}>
              <motion.h1
                className={styles.heroTitle}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                We Build the Systems Behind <span className={styles.heroAccent}>Business Growth.</span>
              </motion.h1>
              <motion.p
                className={styles.heroSub}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              >
                We help businesses understand their challenges, build their digital foundation, reach customers and simplify operations through strategy, technology, creative execution and automation.
              </motion.p>
              
              <motion.ul
                className={styles.heroPills}
                aria-label="What we do"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26 }}
              >
                {['Research', 'Build', 'Grow', 'Automate'].map((w, i) => (
                  <motion.li
                    key={w}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {w}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className={styles.heroCta}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.36 }}
              >
                <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/contact" className="btn btn-primary">
                    Discuss Your Business
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                  <button type="button" onClick={scrollToWork} className="btn btn-outline">
                    Explore Our Work
                  </button>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className={styles.heroRight}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PhoneMockupBasic />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

                  {/* WHAT WE OFFER */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.offerTabs} role="tablist" aria-label="Services">
            {offers.map((o, i) => (
              <button
                key={o.key}
                type="button"
                role="tab"
                aria-selected={offerIdx === i}
                className={`${styles.offerTab} ${offerIdx === i ? styles.offerTabActive : ''}`}
                onClick={() => setOfferIdx(i)}
              >
                {o.tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={offer.key}
              className={styles.offerPanel}
              role="tabpanel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.offerMedia}>
                <img src={offer.img} alt={offer.tab} loading="lazy" />
              </div>
              <div className={styles.offerBody}>
                <h3>{offer.tab}</h3>
                <p>{offer.desc}</p>
                <ul className={styles.offerList}>
                  {offer.points.map(p => (
                    <li key={p}>
                      <svg className={styles.bulletCheck} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link to={offer.to} className={styles.capLink}>Read more →</Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FOUR CAPABILITIES */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tag">What We Do</span>
            <h2>One Partner.<br />Connected Capabilities.</h2>
            <p>Strategy, technology, content and automation working together, depending on what your business needs.</p>
          </motion.div>

          <div className={styles.capabilitiesGrid}>
            {capabilities.map((c, i) => (
              <div key={c.num} className={styles.capCol}>
                <motion.div
                  className={styles.processCard}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <div className={styles.processHeader}>
                    <span className={styles.processNum}>{c.num}</span>
                  </div>
                  <h3 className={styles.capTitle}>{c.title}</h3>
                  <p>{c.desc}</p>
                </motion.div>

                {i < capabilities.length - 1 && (
                  <div className={styles.colArrow} aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SUITE SECTION */}
      <section id="work" className={styles.suiteSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tag">Projects &amp; Products</span>
            <h2>Built Around Real Business Needs.</h2>
            <p>A selection of websites, applications and systems developed or supported through VeltaZ.</p>
          </motion.div>

          <div className={styles.suiteGrid}>
            {[
              {
                name: 'WhatsFlow',
                tag: 'Lead Management',
                desc: 'A private lead-management application for capturing, qualifying and following up on business enquiries.',
                color: '#10b981',
                link: '/products/whatsflow',
                status: '',
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    <path d="M8 10h.01M12 10h.01M16 10h.01"/>
                  </svg>
                )
              },
              {
                name: 'Docket14',
                tag: 'Legal Practice',
                desc: 'A legal practice management application for cases, tasks and hearing schedules.',
                color: '#4F8EF7',
                link: '/products/docket14',
                status: '',
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                )
              },

              {
                name: 'Me & Mine',
                tag: 'Interactive Prototype',
                desc: 'Social & dating app prototype engineered with smart matching and real-time conversation flows.',
                color: '#FF6B9D',
                link: '/mobile-app-development#apps-showcase',
                status: 'Prototype',
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                )
              },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{ height: '100%' }}
              >
                <Link to={p.link} className={styles.suiteCard} style={{ height: '100%' }}>
                  <div className={styles.suiteIconWrap} style={{ background: `${p.color}15`, border: `1.5px solid ${p.color}35`, color: p.color }}>
                    {p.svg}
                  </div>
                  <div className={styles.suiteBody}>
                    <div className={styles.suiteTop}>
                      <span className={styles.suiteName}>{p.name}</span>
                      {p.status && <span className={styles.suiteStatus} style={{
                        color: p.status === 'Live' ? '#22c55e' : '#f59e0b',
                        background: p.status === 'Live' ? '#22c55e15' : '#f59e0b15'
                      }}>{p.status}</span>}
                    </div>
                    <span className={styles.suiteTag}>{p.tag}</span>
                    <p className={styles.suiteDesc}>{p.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KIN FLAGSHIP CASE STUDY */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.productSplit}>
            <motion.div
              className={styles.productLeft}
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="tag">Flagship Case Study</span>
              <h2>KIN Property Management</h2>
              <span className={styles.productSub}>Real-estate website, content &amp; lead workflows</span>
              <p>
                Real-estate website, digital presence, content and lead-management workflows, developed and supported through VeltaZ.
              </p>
              <ul className={styles.featureBullets} style={{ marginBottom: '8px' }}>
                {kinScope.map(k => (
                  <li key={k.title}>
                    <svg className={styles.bulletCheck} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {k.title}
                  </li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <Link to="/products/kin-property" className="btn btn-primary" style={{ marginTop: '24px' }}>
                  View Kin Property
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              className={styles.productRight}
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {kinImgOk ? (
                <img
                  src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792408016/kin-property_cai78v.jpg"
                  alt="KIN Property Management"
                  className={styles.kinPhoto}
                  loading="lazy"
                  onError={() => setKinImgOk(false)}
                />
              ) : (
                <div className={styles.kinPlate} aria-hidden="true"><span>KIN</span></div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW VELTAZ WORKS (METHODOLOGY TIMELINE) */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tag">Our Methodology</span>
            <h2>Think Clearly.<br />Build Practically.<br />Scale Continuously.</h2>
            <p>A structured 4-stage engineering lifecycle designed for speed, transparency and long-term business impact.</p>
          </motion.div>

          <div className={styles.timelineWrapper}>
            {/* Horizontal progress track on desktop */}
            <div className={styles.timelineTrackLine} aria-hidden="true" />

            <div className={styles.timelineSteps}>
              {steps.map((p, i) => (
                <motion.div
                  key={p.num}
                  className={styles.timelineNodeCard}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <div className={styles.timelineNodeHeader}>
                    <div className={styles.timelineOrb}>
                      <span className={styles.timelineOrbNum}>{p.num}</span>
                    </div>
                    <span className={styles.timelinePhaseBadge}>{p.phase}</span>
                  </div>

                  <h3 className={styles.timelineStepTitle}>{p.title}</h3>
                  <p className={styles.timelineStepDesc}>{p.desc}</p>

                  <div className={styles.timelineDeliverablePill}>
                    <span className={styles.deliverableDot} />
                    <span>{p.deliverable}</span>
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
