import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaWhatsapp, 
  FaCheck, 
  FaArrowRight, 
  FaSearch, 
  FaPenNib, 
  FaMapMarkerAlt, 
  FaChartLine, 
  FaExclamationTriangle, 
  FaExternalLinkAlt, 
  FaFileAlt, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaInfoCircle, 
  FaSyncAlt, 
  FaGlobeAmericas, 
  FaRupeeSign, 
  FaDollarSign,
  FaPlus,
  FaMinus,
  FaShieldAlt,
  FaEye,
  FaLaptopCode
} from 'react-icons/fa'
import styles from './SeoBloggingGbp.module.css'

const WHATSAPP_NUMBER = '919960240648'
const WHATSAPP_MSG = encodeURIComponent("Hi VeltaZ, I'm interested in SEO and blogging services. I'd like to discuss my website and Google visibility goals.")
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

// FAQ Items as specified
const faqItems = [
  {
    q: "Do you guarantee first-page rankings?",
    a: "No. We focus on useful content, appropriate optimisation and transparent reporting. Search rankings depend on multiple factors including search engine algorithms, competitor actions, market demand and domain history. Any agency promising guaranteed #1 rankings violates Google's official SEO guidelines."
  },
  {
    q: "How long does SEO take to work?",
    a: "Timelines vary depending on existing website health, niche competition and crawl schedules. SEO is an ongoing compounding process rather than an overnight switch. We review available data over time and recommend an initial evaluation period of 3 months to observe meaningful trends."
  },
  {
    q: "Is blogging included in the package?",
    a: "Yes. The Google Visibility Starter package includes one researched, high-quality article of approximately 600–800 words each month, complete with targeted headings, search-intent mapping, meta tags, and internal link suggestions."
  },
  {
    q: "Is Google Business Profile free?",
    a: "Google provides the Business Profile listing platform for free. VeltaZ charges exclusively for the research, setup, routine optimization, weekly photo publishing, 2 monthly posts, and ongoing management work."
  },
  {
    q: "Can online-only businesses use this package?",
    a: "Yes, for website SEO and blogging. However, Google's strict eligibility guidelines mandate that online-only eCommerce stores, virtual offices, and vacant rental properties without physical customer interaction are not eligible for a Google Business Profile. For ineligible businesses, the package scope focuses on expanded SEO and blogging deliverables agreed upon prior to payment."
  },
  {
    q: "Do you include website development?",
    a: "The package includes SEO-specific on-page optimizations (titles, headers, meta, schema markup, and internal links) within your existing website structure. A brand new website build, redesign, or substantial backend code architecture is quoted separately under our Website Development service."
  },
  {
    q: "Can you guarantee more leads?",
    a: "No. We improve search visibility, indexing health, and content quality, and report observed performance transparently. Actual customer inquiries and sales depend on pricing, product market fit, customer reviews, sales responsiveness, and seasonal demand."
  }
]

export default function SeoBloggingGbp() {
  const [currency, setCurrency] = useState('INR') // 'INR' | 'USD'
  const [activeFaq, setActiveFaq] = useState(null)
  const [activeTab, setActiveTab] = useState('seo') // 'seo' | 'blog' | 'gbp'
  const [activeProofImg, setActiveProofImg] = useState('https://res.cloudinary.com/dqc1awrnc/image/upload/v1792411000/seo-image2_yxbqpd.png')

  useEffect(() => {
    document.title = "SEO, Blogging & Google Business Profile Management | VeltaZ"
    
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = "description"
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = "VeltaZ helps businesses improve Google Search visibility through website SEO, helpful blog content and Google Business Profile management for eligible local businesses."

    window.scrollTo(0, 0)
  }, [])

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx)
  }

  return (
    <div className={styles.pageContainer}>
      
      {/* ── 1. HERO SECTION ── */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                <span>SEO · BLOGGING · GOOGLE BUSINESS PROFILE</span>
              </div>
              
              <h1 className={styles.heroTitle}>
                Get Found on Google. <br />
                <span className={styles.heroTitleHighlight}>Build Visibility.</span> <br />
                Reach the Right Customers.
              </h1>
              
              <p className={styles.heroSubtitle}>
                We help businesses strengthen their Google Search presence through practical website SEO, useful blog content and Google Business Profile management for eligible local businesses.
              </p>
              
              <p className={styles.heroNote}>
                From improving important website pages to publishing helpful content, we focus on building a stronger search foundation for your business.
              </p>

              <div className={styles.heroBtnRow}>
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`btn btn-primary ${styles.heroWhatsappBtn}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '13px 26px', fontSize: '15px' }}
                >
                  <FaWhatsapp size={19} />
                  <span>Improve My Google Visibility</span>
                </a>
                
                <a 
                  href="#featured-work" 
                  className="btn btn-outline"
                  style={{ padding: '13px 22px', fontSize: '14.5px' }}
                >
                  <span>See Our Work</span>
                  <FaArrowRight size={13} style={{ marginLeft: 6 }} />
                </a>
              </div>

              <div className={styles.trustBadges}>
                <div className={styles.trustItem}>
                  <FaCheckCircle className={styles.trustIcon} />
                  <span>Transparent Search Console Data</span>
                </div>
                <div className={styles.trustItem}>
                  <FaCheckCircle className={styles.trustIcon} />
                  <span>No Fake Ranking Promises</span>
                </div>
                <div className={styles.trustItem}>
                  <FaCheckCircle className={styles.trustIcon} />
                  <span>Original Helpful Content</span>
                </div>
              </div>
            </div>

            {/* Right Visual Dashboard Mockup */}
            <div className={styles.heroRight}>
              <div className={styles.heroCardDeck}>
                <div className={styles.windowChrome}>
                  <div className={styles.chromeDots}>
                    <span className={styles.dotR} />
                    <span className={styles.dotY} />
                    <span className={styles.dotG} />
                  </div>
                  <div className={styles.chromeAddress}>search.google.com/search-console/performance</div>
                </div>

                <div className={styles.heroMetricBanner}>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>145K+</span>
                    <span className={styles.metricLbl}>Total Impressions</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>2.4K</span>
                    <span className={styles.metricLbl}>Organic Clicks</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>6.8%</span>
                    <span className={styles.metricLbl}>Average CTR</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>#1</span>
                    <span className={styles.metricLbl}>Local Map Pack</span>
                  </div>
                </div>

                <div className={styles.heroVisualPreview}>
                  <img 
                    src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792411000/seo-image2_yxbqpd.png" 
                    alt="Google Search Console Organic Traffic Growth" 
                    className={styles.heroImg}
                  />
                  <div className={styles.heroImgOverlay}>
                    <span className="tag" style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                      Verified Client Performance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THE PROBLEMS WE SOLVE ── */}
      <section className={styles.problemsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Strategic Assessment</span>
            <h2>Being Online Is Not the Same as Being Easy to Find.</h2>
            <p>
              Having a live website does not automatically bring relevant search visitors. Most businesses struggle with one or more of these core visibility hurdles.
            </p>
          </div>

          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <div className={styles.problemIconWrap}>
                <FaSearch size={22} />
              </div>
              <h3>Website Search Visibility</h3>
              <p>
                Important pages may need better structure, relevant content, clearer titles or technical improvements so Google can crawl and index them properly.
              </p>
            </div>

            <div className={styles.problemCard}>
              <div className={styles.problemIconWrap}>
                <FaPenNib size={22} />
              </div>
              <h3>Missing Helpful Content</h3>
              <p>
                Customers have real questions about your services or products that your current pages do not answer clearly, leading them directly to competitors.
              </p>
            </div>

            <div className={styles.problemCard}>
              <div className={styles.problemIconWrap}>
                <FaMapMarkerAlt size={22} />
              </div>
              <h3>Incomplete Google Business Presence</h3>
              <p>
                Eligible local businesses may have outdated hours, missing category tags, zero photos or an unorganised profile that suppresses local Google Maps rank.
              </p>
            </div>
          </div>

          <div className={styles.problemFooterNotice}>
            <FaInfoCircle size={18} color="#10b981" />
            <span>
              <strong>Our Approach:</strong> We review your existing situation, identify practical opportunities and prioritise work according to your business's genuine commercial needs.
            </span>
          </div>
        </div>
      </section>

      {/* ── 3. THREE CONNECTED CAPABILITIES ── */}
      <section className={styles.capabilitiesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Full-Stack Execution</span>
            <h2>Three Connected Search Capabilities</h2>
            <p>
              Search engines reward clarity, authority and consistency. We connect website technicals, content creation and local profile management into one coherent workflow.
            </p>
          </div>

          {/* Capabilities Nav Switcher */}
          <div className={styles.tabNavRow}>
            <button 
              type="button" 
              onClick={() => setActiveTab('seo')} 
              className={`${styles.tabBtn} ${activeTab === 'seo' ? styles.tabBtnActive : ''}`}
            >
              <FaSearch />
              <span>A. Google Search SEO</span>
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('blog')} 
              className={`${styles.tabBtn} ${activeTab === 'blog' ? styles.tabBtnActive : ''}`}
            >
              <FaPenNib />
              <span>B. Blogging & Content</span>
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('gbp')} 
              className={`${styles.tabBtn} ${activeTab === 'gbp' ? styles.tabBtnActive : ''}`}
            >
              <FaMapMarkerAlt />
              <span>C. Google Business Profile</span>
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className={styles.tabContentBox}>
            {activeTab === 'seo' && (
              <div className={styles.capabilityPane}>
                <div className={styles.capabilityLeft}>
                  <span className="tag" style={{ marginBottom: 10 }}>Technical & On-Page Foundation</span>
                  <h3>Google Search SEO</h3>
                  <p className={styles.paneLead}>
                    Help search engines understand your website and help visitors find the exact information they are actively searching for.
                  </p>
                  
                  <div className={styles.deliverablesList}>
                    {[
                      "Initial website SEO technical assessment.",
                      "Keyword and search-intent research for buyer queries.",
                      "Page title and meta description improvements.",
                      "Relevant heading structure (H1, H2, H3 hierarchy).",
                      "Internal-link structure and anchor-text recommendations.",
                      "Basic technical SEO checks (canonical tags, 404s, redirects).",
                      "Sitemap and indexing-readiness verification in Google Search Console.",
                      "Optimization of agreed priority landing pages."
                    ].map((item, idx) => (
                      <div key={idx} className={styles.deliverableItem}>
                        <FaCheck className={styles.checkIcon} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.capabilityRight}>
                  <div className={styles.sampleSnippetBox}>
                    <div className={styles.snippetTitle}>Google SERP Preview Sample</div>
                    <div className={styles.serpUrl}>https://yourwebsite.com › services › commercial</div>
                    <div className={styles.serpHeading}>Commercial Property Consultancy & Lease Services | Pune</div>
                    <div className={styles.serpSnippet}>
                      Explore verified commercial office spaces and retail properties. Comprehensive lease advisory, legal vetting, and personalized site inspections.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className={styles.capabilityPane}>
                <div className={styles.capabilityLeft}>
                  <span className="tag" style={{ marginBottom: 10 }}>Authority & Organic Reach</span>
                  <h3>Blogging & Content Creation</h3>
                  <p className={styles.paneLead}>
                    Publish useful, original articles relevant to your business and its customers that answer questions and attract high-intent organic visitors.
                  </p>
                  
                  <div className={styles.deliverablesList}>
                    {[
                      "Blog topic research focused on actual customer pain points.",
                      "Search-intent analysis to align with informational queries.",
                      "Article outlines and professional writing (600–800 words per post).",
                      "Relevant headings, titles, excerpt, and meta descriptions.",
                      "Contextual internal links to service and enquiry pages.",
                      "Fact-checking, editorial review, and quality validation.",
                      "Publishing directly through your existing CMS (WordPress, Webflow, Custom React)."
                    ].map((item, idx) => (
                      <div key={idx} className={styles.deliverableItem}>
                        <FaCheck className={styles.checkIcon} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.editorialNote}>
                    <FaShieldAlt size={16} />
                    <span>
                      <strong>Editorial Integrity:</strong> We do not produce generic AI articles solely to inflate publishing volume. Every article serves a genuine reader need and builds commercial trust.
                    </span>
                  </div>
                </div>

                <div className={styles.capabilityRight}>
                  <div className={styles.articleMockupCard}>
                    <span className="tag">Published Article Outline</span>
                    <h4>"Top 7 Commercial Lease Pitfalls in India & How to Avoid Them"</h4>
                    <p>800 Words · Search Intent: High Consideration · Formatted for Quick Reading</p>
                    <div className={styles.articleStructure}>
                      <div>✓ H1 & Targeted Meta Tags</div>
                      <div>✓ Direct Answers for Featured Snippets</div>
                      <div>✓ Internal Callout to Consultation Form</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gbp' && (
              <div className={styles.capabilityPane}>
                <div className={styles.capabilityLeft}>
                  <span className="tag" style={{ marginBottom: 10 }}>Local Maps & Discovery</span>
                  <h3>Google Business Profile Management</h3>
                  <p className={styles.paneLead}>
                    For businesses that meet Google's eligibility requirements, this service maintains an active, professional presence on Google Search and Maps.
                  </p>
                  
                  <div className={styles.deliverablesList}>
                    {[
                      "Profile information review and agreed accurate updates.",
                      "Primary and secondary business categories and opening-hours checks.",
                      "Publishing approved office, storefront, or project photos.",
                      "Two Google Business Profile update posts per month.",
                      "Routine profile health checks and spam monitoring.",
                      "Monthly review of available search insights (calls, direction requests, views)."
                    ].map((item, idx) => (
                      <div key={idx} className={styles.deliverableItem}>
                        <FaCheck className={styles.checkIcon} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.gbpOwnershipNote}>
                    <strong>Ownership & Pricing Transparency:</strong> You retain 100% legal ownership of your profile and provide VeltaZ with manager access. Google Business Profile is completely free to use; VeltaZ charges strictly for research, copywriting, asset updates, and ongoing management.
                  </div>
                </div>

                <div className={styles.capabilityRight}>
                  <div className={styles.eligibilityWarningBox}>
                    <div className={styles.warningHead}>
                      <FaExclamationTriangle color="#f59e0b" size={18} />
                      <span>Google Eligibility Guidance</span>
                    </div>
                    <p>
                      Google requires eligible businesses to make in-person contact with customers during stated business hours. 
                      <strong> Online-only businesses, vacant apartments, and residential rental properties are NOT eligible</strong> for standalone Google Business Profiles under Google policies.
                    </p>
                    <a 
                      href="https://support.google.com/business/answer/13763036" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.officialLink}
                    >
                      <span>Official Google Guidelines</span>
                      <FaExternalLinkAlt size={11} />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. MAIN STARTER PACKAGE ── */}
      <section id="pricing" className={styles.pricingSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Transparent Pricing</span>
            <h2>One Focused Starter Package.<br />No Confusing Tiers.</h2>
            <p>
              We avoid convoluted plans with hidden add-ons. Here is our complete monthly scope for businesses ready to build sustainable Google visibility.
            </p>


          </div>

          <div className={styles.singlePackageWrapper}>
            <div className={styles.packageCard}>
              <div className={styles.packageHeader}>
                <div className={styles.packageBadgeRow}>
                  <span className="tag">All-In-One Scope</span>
                  <span className={styles.introTag}>Introductory Pricing</span>
                </div>
                
                <h3 className={styles.packageName}>Google Visibility Starter</h3>
                <p className={styles.packageDesc}>
                  Designed for small businesses, consulting firms, and local service providers seeking systematic on-page optimization, original blogging, and Google Business Profile management.
                </p>

                <div className={styles.priceRow}>
                  <span className={styles.priceAmount}>
                    ₹5,999
                  </span>
                  <span className={styles.pricePeriod}>/ month</span>
                </div>
                <div className={styles.priceNotice}>
                  Billed monthly · Recommended initial evaluation period: 3 months under agreed terms.
                </div>
              </div>

              <div className={styles.packageBodyGrid}>
                {/* WHAT'S INCLUDED */}
                <div className={styles.includedCol}>
                  <h4>
                    <FaCheckCircle color="#10b981" />
                    <span>What's Included Every Month</span>
                  </h4>
                  <ul className={styles.featureList}>
                    <li>Initial SEO assessment for one website.</li>
                    <li>Basic keyword and content-opportunity research.</li>
                    <li>Optimization of up to 2 priority pages during onboarding.</li>
                    <li><strong>One researched blog article per month</strong> (approx. 600–800 words).</li>
                    <li>Article title, heading structure, metadata and internal-link suggestions.</li>
                    <li>Publishing to client's existing CMS (where access is provided).</li>
                    <li><strong>Google Business Profile management</strong> for one eligible business location.</li>
                    <li>Two Google Business Profile posts per month.</li>
                    <li>Routine business information, hours, and photo checks.</li>
                    <li>One concise monthly report of available website and profile performance data.</li>
                    <li>Clear list of completed work and next recommended actions.</li>
                  </ul>
                </div>

                {/* SCOPE & EXCLUSIONS */}
                <div className={styles.excludedCol}>
                  <h4>
                    <FaInfoCircle color="var(--text3)" />
                    <span>Scope & Exclusions (Clear Boundaries)</span>
                  </h4>
                  <ul className={styles.exclusionList}>
                    <li>Applies to one website and one eligible business location.</li>
                    <li>Major website development or code rewrites are quoted separately.</li>
                    <li>Additional blog articles or multiple locations require a revised scope.</li>
                    <li>Paid SEO tools, hosting, and third-party domain costs are not included.</li>
                    <li>Spammy backlink buying, PR blasts, and suspension appeals are not included.</li>
                    <li>Paid Google Ads budgets are not included.</li>
                    <li><strong>No ranking or lead volume guarantees:</strong> Results depend on industry competition, market demand, and website domain authority.</li>
                  </ul>

                  <div className={styles.packageIneligibleNote}>
                    <strong>For Non-Eligible Businesses:</strong> If your business is online-only and not eligible for a Google Business Profile under Google's policies, the scope automatically redirects to expanded on-page SEO analysis and an additional content deliverable agreed upon before payment.
                  </div>
                </div>
              </div>

              <div className={styles.packageCtaRow}>
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 32px', fontSize: '15.5px', fontWeight: 700 }}
                >
                  <FaWhatsapp size={20} />
                  <span>Discuss My SEO Requirements</span>
                </a>
                <span className={styles.prefillNotice}>
                  Prefills: "Hi VeltaZ, I'm interested in SEO and blogging services. I'd like to discuss my website and Google visibility goals."
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. OUR WORKING PROCESS ── */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Methodical Execution</span>
            <h2>Research. Improve. Publish. Measure.</h2>
            <p>
              We do not rely on shortcuts or automated black-hat tactics. We execute a disciplined four-step operational cycle.
            </p>
          </div>

          <div className={styles.stepGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <h3>Understand</h3>
              <p>Review the business model, website health, target buyer persona, and current search visibility baselines.</p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <h3>Prioritise</h3>
              <p>Identify the most valuable service pages, high-intent blog topics, and eligible Google profile enhancements.</p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <h3>Execute</h3>
              <p>Complete the agreed technical SEO improvements, publish useful blog content, and maintain local business details.</p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>04</div>
              <h3>Review</h3>
              <p>Share completed deliverables, examine verified Search Console and profile data, and outline next practical actions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FEATURED PROJECT — KIN PROPERTY MANAGEMENT ── */}
      <section id="featured-work" className={styles.featuredSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Portfolio Evidence</span>
            <h2>Practical SEO Work in a Real Business</h2>
            <p>
              Explore verified examples of our search optimization and performance tracking executed for KIN Property Management in Pune.
            </p>
          </div>

          <div className={styles.portfolioWrapper}>
            {/* Nav switcher */}
            <div className={styles.proofSwitcher}>
              <button 
                type="button" 
                onClick={() => setActiveProofImg('https://res.cloudinary.com/dqc1awrnc/image/upload/v1792411000/seo-image2_yxbqpd.png')}
                className={`${styles.proofBtn} ${activeProofImg === 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792411000/seo-image2_yxbqpd.png' ? styles.proofBtnActive : ''}`}
              >
                <span>Google Search Console Data</span>
              </button>
              <button 
                type="button" 
                onClick={() => setActiveProofImg('https://res.cloudinary.com/dqc1awrnc/image/upload/v1792410811/seo-image3_zsbdwa.png')}
                className={`${styles.proofBtn} ${activeProofImg === 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1792410811/seo-image3_zsbdwa.png' ? styles.proofBtnActive : ''}`}
              >
                <span>Core Web Vitals & Audits</span>
              </button>
            </div>

            <div className={styles.proofContentRow}>
              <div className={styles.proofImageFrame}>
                <img 
                  src={activeProofImg} 
                  alt="Verified SEO work for KIN Property Management" 
                  className={styles.proofImg} 
                />
              </div>

              <div className={styles.proofExplanation}>
                <span className="tag">KIN Property Management</span>
                <h3>Real Implementation. Verified Data.</h3>
                <p>
                  For KIN, we structured localized property listing pages, resolved indexing crawl anomalies, established keyword clusters around Pune real estate leasing, and structured the Google Business Profile for consistent discoverability.
                </p>

                <div className={styles.proofHighlights}>
                  <div className={styles.proofItem}>
                    <strong>Direct Impressions Growth:</strong> Search impressions scaled consistently as Google indexed tailored property landing pages.
                  </div>
                  <div className={styles.proofItem}>
                    <strong>Clean Core Web Vitals:</strong> Page speed and Lighthouse scores maintained at 95%+ for low mobile bounce rates.
                  </div>
                  <div className={styles.proofItem}>
                    <strong>Transparent Disclaimer:</strong> Rankings fluctuate with search algorithm updates. We report genuine Search Console clicks rather than arbitrary projections.
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <a href="https://kinpropertymanagement.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '13.5px' }}>
                      <span>Visit KIN Live Website</span>
                      <FaArrowRight size={12} style={{ marginLeft: 6 }} />
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. TRANSPARENT MONTHLY REPORTING ── */}
      <section className={styles.reportingSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Accountability</span>
            <h2>Know What Was Done and What Changed.</h2>
            <p>
              We do not hide behind automated jargon or invent metrics. Every month, you receive a concise, actionable report breaking down the data that matters.
            </p>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <h4>1. Google Search Clicks & Impressions</h4>
              <p>How many times your website appeared in search results and how many prospective buyers clicked through.</p>
            </div>
            <div className={styles.metricCard}>
              <h4>2. Important Page Performance</h4>
              <p>Which key service pages and landing pages are driving organic traffic and where users are spending time.</p>
            </div>
            <div className={styles.metricCard}>
              <h4>3. Relevant Search Queries</h4>
              <p>The exact keywords and search phrases customers used on Google before landing on your website.</p>
            </div>
            <div className={styles.metricCard}>
              <h4>4. Published Blog Performance</h4>
              <p>Reader engagement, indexing status, and organic discovery metrics for newly published articles.</p>
            </div>
            <div className={styles.metricCard}>
              <h4>5. Google Business Profile Insights</h4>
              <p>Direct phone calls, map direction requests, and photo views recorded on your verified local profile.</p>
            </div>
            <div className={styles.metricCard}>
              <h4>6. Work Log & Recommended Actions</h4>
              <p>A transparent bulleted summary of everything completed during the month and prioritized next steps.</p>
            </div>
          </div>

          <div className={styles.funnelNotice}>
            <strong>Measurement Note:</strong> Search impressions, organic clicks, search rankings, enquiries, and bottom-line sales represent different stages in your business funnel. We clarify these distinctions so you always understand where your marketing stands.
          </div>
        </div>
      </section>

      {/* ── 8. FREQUENTLY ASKED QUESTIONS ── */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Got Questions?</span>
            <h2>Frequently Asked Questions</h2>
            <p>Direct, transparent answers regarding deliverables, guarantees, timelines, and scope.</p>
          </div>

          <div className={styles.faqList}>
            {faqItems.map((item, idx) => (
              <div 
                key={idx} 
                className={`${styles.faqItem} ${activeFaq === idx ? styles.faqActive : ''}`}
              >
                <button 
                  type="button" 
                  onClick={() => toggleFaq(idx)} 
                  className={styles.faqQuestion}
                >
                  <span>{item.q}</span>
                  <span className={styles.faqIcon}>
                    {activeFaq === idx ? <FaMinus size={13} /> : <FaPlus size={13} />}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className={styles.faqAnswer}>
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ── */}
      <section className={styles.finalCtaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <span className="tag" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
              Get Started
            </span>
            <h2>Let's Make Your Business Easier to Find.</h2>
            <p>
              Tell us about your website, your target customers and the search challenges you want to address. We'll help define a practical starting point and confirm the scope before work begins.
            </p>

            <div style={{ marginTop: '24px' }}>
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 34px', fontSize: '16px', fontWeight: 700 }}
              >
                <FaWhatsapp size={20} />
                <span>Discuss My SEO Requirements</span>
              </a>
            </div>

            <div className={styles.ctaNote}>
              Introductory pricing from ₹5,999 per month · No lock-in contracts · Clear deliverables
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
