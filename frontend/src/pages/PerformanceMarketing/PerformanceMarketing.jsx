import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaWhatsapp, 
  FaCheck, 
  FaArrowRight, 
  FaBullhorn, 
  FaChartLine, 
  FaGoogle, 
  FaLinkedin, 
  FaShieldAlt, 
  FaSyncAlt, 
  FaPlus, 
  FaMinus,
  FaRupeeSign,
  FaCheckCircle,
  FaBolt,
  FaFilter,
  FaLayerGroup,
  FaFunnelDollar,
  FaRocket
} from 'react-icons/fa'
import { SiMeta, SiInstagram } from 'react-icons/si'
import styles from './PerformanceMarketing.module.css'

const WHATSAPP_NUMBER = '919960240648'
const WHATSAPP_MSG = encodeURIComponent("Hi VeltaZ, I'm interested in Performance Marketing services. I'd like to discuss ad campaigns across Meta, Google, LinkedIn & AI channels.")
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

const ChatGptIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 9.462a4.484 4.484 0 0 1 2.366-1.973v5.685a.763.763 0 0 0 .388.676l5.86 3.38-2.02 1.168a.088.088 0 0 1-.073.008l-4.846-2.8a4.496 4.496 0 0 1-1.675-6.144zm16.597 3.855l-5.833-3.387L15.119 8.76a.088.088 0 0 1 .073-.008l4.846 2.8a4.496 4.496 0 0 1 1.675 6.145 4.484 4.484 0 0 1-2.366 1.973v-5.685a.763.763 0 0 0-.388-.676zm2.01-4.552l-.142-.085-4.773-2.78a.776.776 0 0 0-.785 0L9.409 9.27V6.937a.08.08 0 0 1 .033-.062L14.28 4.05a4.5 4.5 0 0 1 6.667 4.715zM8.306 15.72l-2.02-1.168a.08.08 0 0 1-.038-.052V8.917a4.504 4.504 0 0 1 7.37-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.392.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.612-1.5z"/>
  </svg>
)

const adChannelsData = {
  meta: {
    id: 'meta',
    title: 'Meta Campaign Ads',
    subtitle: 'Facebook & Instagram Feed, Stories, and Reels Conversion Funnels',
    badge: 'High-Volume Lead Engine',
    desc: 'Targeted demographic, interest, and custom audience advertising engineered to capture prospects directly on Facebook and Instagram. Fully integrated with CRM webhooks for instant sales team notification.',
    icon: <SiMeta size={24} />,
    color: '#0081FB',
    capabilities: [
      'High-converting Lead Form funnels & instant CRM dispatch',
      'Advanced Meta Pixel & Conversions API (CAPI) server tracking',
      'Lookalike audience modeling based on existing paying clients',
      'Dynamic creative testing (5+ headlines, 5+ creatives, 3+ CTAs)',
      'Omnichannel retargeting for website visitors & engaged accounts'
    ],
    bestFor: 'Real estate, coaching & clinics, e-commerce, and high-velocity B2C inquiries',
    metric: '3.4x Average Return On Ad Spend (ROAS)'
  },
  insta: {
    id: 'insta',
    title: 'Insta Boost Ads',
    subtitle: 'Viral Reels Scaling, Profile Traffic Surges, and DM Inbound Hooks',
    badge: 'Direct Message & Profile Growth',
    desc: 'Turn high-performing Instagram Reels, carousel posts, and stories into automated direct message (DM) machines. Drives profile visits, follower growth, and instant inquiry conversations.',
    icon: <SiInstagram size={24} />,
    color: '#E1306C',
    capabilities: [
      'Profile visit & direct message (Click-to-WhatsApp/IG DM) setup',
      'High-velocity Reel amplification targeting local pin-codes',
      'Story swipe-up and poll engagement interaction funnels',
      'Automated DM responder integration for instant reply hooks',
      'Micro-budget boost testing for top 10% organic content'
    ],
    bestFor: 'Lifestyle brands, interior designers, salons & wellness, local stores, and personal brands',
    metric: '45% Lower Cost-Per-Conversation vs generic broad campaigns'
  },
  google: {
    id: 'google',
    title: 'Google Ads',
    subtitle: 'High-Intent Search Ads, PPC, Quality Score & Map Pack Leads',
    badge: 'Immediate Buyer Intent',
    desc: 'Capture prospects at the exact millisecond they search on Google for your services. We eliminate budget waste through negative keyword siloing, high Quality Score landing pages, and bid automation.',
    icon: <FaGoogle size={22} />,
    color: '#EA4335',
    capabilities: [
      'High-intent exact match search queries with negative keyword lists',
      'Landing page Quality Score optimization (9/10+ targets)',
      'Call-only mobile ads with direct phone connection hooks',
      'Local Service Ads & Google Map extension integration',
      'Full conversion tracking for form fills, phone calls, and WhatsApp clicks'
    ],
    bestFor: 'High-ticket B2B services, emergency services, legal & tax consultancies, and commercial contractors',
    metric: '68% Increase in Lead-to-Sale Conversion Rate'
  },
  chatgpt: {
    id: 'chatgpt',
    title: 'ChatGPT Ads',
    subtitle: 'Conversational AI Search Placements & Prompt Intent Targeting',
    badge: 'Next-Gen AI First Placements',
    desc: 'Be present where modern decision-makers now search. We architect brand positioning within conversational AI prompts, structured answer citations, and high-trust AI recommendation slots.',
    icon: <ChatGptIcon size={22} />,
    color: '#10A37F',
    capabilities: [
      'Conversational search intent mapping and brand solution seeding',
      'AI prompt context targeting for tech, finance, and enterprise tools',
      'Early-adopter low CPC advantage on next-gen AI search ecosystems',
      'Direct semantic citation architecture for high-authority query answers',
      'AI-assisted lead inquiry routing directly to WhatsApp CRM'
    ],
    bestFor: 'SaaS products, modern consultancies, tech startups, and digital innovation leaders',
    metric: 'First-Mover Authority in AI Search Answers'
  },
  linkedin: {
    id: 'linkedin',
    title: 'LinkedIn Ads',
    subtitle: 'B2B Account-Based Marketing (ABM) & Corporate Decision Maker Reach',
    badge: 'Enterprise & C-Suite Access',
    desc: 'Target verified corporate executives by Job Title, Company Size, Industry, and Seniority. Zero wasted impressions on irrelevant users—reach CXOs, Founders, and VP-level decision makers.',
    icon: <FaLinkedin size={24} />,
    color: '#0A66C2',
    capabilities: [
      'Account-Based Marketing (ABM) matching specific named company lists',
      'Job Title, Seniority (VP/Director/CXO), and Company revenue filters',
      'Native LinkedIn Lead Gen Forms with auto-filled corporate profiles',
      'Sponsored Message & Thought Leader ad formats with personal touch',
      'Full B2B pipeline attribution and CRM lead verification'
    ],
    bestFor: 'Enterprise software, corporate training, high-ticket agency services, and B2B vendor deals',
    metric: '82% Decision-Maker Verification on every lead'
  }
}

const faqItems = [
  {
    q: "How are ad spends paid? Do I pay VeltaZ or the ad platforms directly?",
    a: "Your ad budget is paid directly to Meta, Google, or LinkedIn using your own business credit card or billing account. VeltaZ charges a transparent monthly management retainer for strategy, campaign build, creative testing, tracking, and daily optimization. You maintain 100% ownership and access to your ad accounts."
  },
  {
    q: "What is the recommended minimum ad spend to get meaningful results?",
    a: "For single-channel testing (e.g. Meta or Google Ads), we recommend an initial ad spend of ₹25,000 to ₹40,000 per month so the ad algorithms have enough conversion data to optimize. For omnichannel scaling across multiple platforms, ₹50,000+ per month is ideal."
  },
  {
    q: "How soon do we start receiving qualified leads?",
    a: "Once pixel tracking and lead forms are verified (typically within 48 to 72 hours of onboarding), live campaigns start delivering inquiries within the first 2 to 4 days. During weeks 2 through 4, we weed out low-converting keywords and creatives to drive down your Cost Per Acquisition (CPA)."
  },
  {
    q: "Can the ad leads connect directly to WhatsApp and our CRM?",
    a: "Yes. All lead forms (Meta Instant Forms, Google Call extensions, and LinkedIn Forms) are connected via instant webhooks directly to your WhatsApp and internal CRM. Your sales team can call or message the lead within 60 seconds of submission."
  },
  {
    q: "What is ChatGPT advertising and how does VeltaZ leverage it?",
    a: "As users increasingly use conversational AI instead of traditional search bars to research solutions, we structure intent-based sponsored placements and citation optimization so your business is suggested as the trusted answer for relevant niche queries."
  }
]

export default function PerformanceMarketing() {
  const [activeTab, setActiveTab] = useState('meta')
  const [activeFaq, setActiveFaq] = useState(null)

  useEffect(() => {
    document.title = "Performance Marketing Services | Meta, Google, LinkedIn & AI Ads | VeltaZ"
    
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = "description"
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = "VeltaZ engineers high-ROI performance marketing across Meta Campaign Ads, Insta Boost, Google Search Ads, ChatGPT Ads, and LinkedIn B2B funnels with direct CRM integrations."

    window.scrollTo(0, 0)
  }, [])

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx)
  }

  const currentChannel = adChannelsData[activeTab]

  return (
    <div className={styles.pageContainer}>
      
      {/* ── 1. HERO SECTION ── */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                <span>PERFORMANCE MARKETING · 5 HIGH-ROI AD NETWORKS</span>
              </div>
              
              <h1 className={styles.heroTitle}>
                Data-Driven <br />
                <span className={styles.heroTitleHighlight}>Performance Marketing</span> <br />
                Engineered for Maximum ROI.
              </h1>
              
              <p className={styles.heroSubtitle}>
                We manage and optimize targeted advertising campaigns across Meta, Google, LinkedIn, and next-gen AI search channels to consistently generate qualified business inquiries.
              </p>
              
              <p className={styles.heroNote}>
                ⚡ Zero Wasted Budget • Direct WhatsApp CRM Hooks • Real-Time Conversion Attribution
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
                  <span>Discuss Your Ad Budget</span>
                </a>
                
                <a 
                  href="#ad-channels" 
                  className="btn btn-outline"
                  style={{ padding: '13px 22px', fontSize: '14.5px' }}
                >
                  <span>Explore The 5 Channels</span>
                  <FaArrowRight size={13} style={{ marginLeft: 6 }} />
                </a>
              </div>

              {/* 5 Quick Platform Badges */}
              <div className={styles.platformBadges}>
                <div className={styles.platformItem}><SiMeta size={16} /><span>Meta Campaign Ads</span></div>
                <div className={styles.platformItem}><SiInstagram size={16} /><span>Insta Boost Ads</span></div>
                <div className={styles.platformItem}><FaGoogle size={15} /><span>Google Ads</span></div>
                <div className={styles.platformItem}><ChatGptIcon size={15} /><span>ChatGPT Ads</span></div>
                <div className={styles.platformItem}><FaLinkedin size={16} /><span>LinkedIn Ads</span></div>
              </div>
            </div>

            {/* Hero Visual: High-Impact Performance Metrics Card */}
            <div className={styles.heroRight}>
              <div className={styles.metricsCardBox}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardHeaderLeft}>
                    <span className={styles.headerDot} />
                    <span className={styles.headerTitle}>Live Campaign Dashboard</span>
                  </div>
                  <span className={styles.headerStatus}>Active 24/7</span>
                </div>

                <div className={styles.statsPreviewGrid}>
                  <div className={styles.statMiniCard}>
                    <span className={styles.statMiniLabel}>ROAS Metric</span>
                    <span className={styles.statMiniVal}>3.42x</span>
                    <span className={styles.statMiniSub}>Audited Portfolio Avg</span>
                  </div>
                  <div className={styles.statMiniCard}>
                    <span className={styles.statMiniLabel}>Cost Per Lead</span>
                    <span className={styles.statMiniVal}>-42%</span>
                    <span className={styles.statMiniSub}>Post 30-Day Testing</span>
                  </div>
                </div>

                <div className={styles.networkList}>
                  <div className={styles.networkRow}>
                    <div className={styles.networkInfo}>
                      <span className={styles.networkIcon} style={{ color: '#0081FB' }}><SiMeta /></span>
                      <span className={styles.networkName}>Meta Campaign Ads</span>
                    </div>
                    <span className={styles.networkBadge}>Live Funnel</span>
                  </div>
                  <div className={styles.networkRow}>
                    <div className={styles.networkInfo}>
                      <span className={styles.networkIcon} style={{ color: '#E1306C' }}><SiInstagram /></span>
                      <span className={styles.networkName}>Insta Boost Ads</span>
                    </div>
                    <span className={styles.networkBadge}>Viral Growth</span>
                  </div>
                  <div className={styles.networkRow}>
                    <div className={styles.networkInfo}>
                      <span className={styles.networkIcon} style={{ color: '#EA4335' }}><FaGoogle /></span>
                      <span className={styles.networkName}>Google Search Ads</span>
                    </div>
                    <span className={styles.networkBadge}>Buyer Intent</span>
                  </div>
                  <div className={styles.networkRow}>
                    <div className={styles.networkInfo}>
                      <span className={styles.networkIcon} style={{ color: '#10A37F' }}><ChatGptIcon size={15} /></span>
                      <span className={styles.networkName}>ChatGPT AI Placements</span>
                    </div>
                    <span className={styles.networkBadge}>Next-Gen</span>
                  </div>
                  <div className={styles.networkRow}>
                    <div className={styles.networkInfo}>
                      <span className={styles.networkIcon} style={{ color: '#0A66C2' }}><FaLinkedin /></span>
                      <span className={styles.networkName}>LinkedIn B2B Ads</span>
                    </div>
                    <span className={styles.networkBadge}>Executive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THE 5 CORE AD CHANNELS SHOWCASE ── */}
      <section id="ad-channels" className={styles.channelsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Dedicated Multi-Channel Arsenal</span>
            <h2>The 5 Core Performance Ad Networks</h2>
            <p>
              We don't rely on random vanity metrics. We deploy specialized campaign architecture tailored to each platform's unique conversion dynamics.
            </p>
          </div>

          {/* Interactive Channel Tabs */}
          <div className={styles.channelTabsRow}>
            <button
              type="button"
              onClick={() => setActiveTab('meta')}
              className={`${styles.channelTabBtn} ${activeTab === 'meta' ? styles.channelTabBtnActive : ''}`}
            >
              <SiMeta size={17} />
              <span>Meta Campaign Ads</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('insta')}
              className={`${styles.channelTabBtn} ${activeTab === 'insta' ? styles.channelTabBtnActive : ''}`}
            >
              <SiInstagram size={17} />
              <span>Insta Boost Ads</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('google')}
              className={`${styles.channelTabBtn} ${activeTab === 'google' ? styles.channelTabBtnActive : ''}`}
            >
              <FaGoogle size={15} />
              <span>Google Ads</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('chatgpt')}
              className={`${styles.channelTabBtn} ${activeTab === 'chatgpt' ? styles.channelTabBtnActive : ''}`}
            >
              <ChatGptIcon size={16} />
              <span>ChatGPT Ads</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('linkedin')}
              className={`${styles.channelTabBtn} ${activeTab === 'linkedin' ? styles.channelTabBtnActive : ''}`}
            >
              <FaLinkedin size={16} />
              <span>LinkedIn Ads</span>
            </button>
          </div>

          {/* Active Channel Detail Showcase */}
          <div className={styles.channelDetailCard}>
            <div className={styles.channelDetailGrid}>
              <div className={styles.channelDetailLeft}>
                <div className={styles.channelHeaderRow}>
                  <div className={styles.channelIconBadge} style={{ color: currentChannel.color }}>
                    {currentChannel.icon}
                  </div>
                  <div>
                    <span className={styles.channelBadgeText}>{currentChannel.badge}</span>
                    <h3 className={styles.channelTitleText}>{currentChannel.title}</h3>
                  </div>
                </div>

                <p className={styles.channelSubText}>{currentChannel.subtitle}</p>
                <p className={styles.channelDescText}>{currentChannel.desc}</p>

                <div className={styles.bestForBox}>
                  <strong>Best Suited For:</strong> {currentChannel.bestFor}
                </div>

                <div style={{ marginTop: '24px' }}>
                  <a 
                    href={WHATSAPP_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    style={{ padding: '10px 22px', fontSize: '13.5px' }}
                  >
                    <span>Request Campaign Audit for {currentChannel.title}</span>
                  </a>
                </div>
              </div>

              <div className={styles.channelDetailRight}>
                <div className={styles.capabilitiesBox}>
                  <h4 className={styles.capHeader}>
                    <FaBolt size={14} style={{ color: 'var(--accent)' }} />
                    <span>Technical Architecture & Inclusions</span>
                  </h4>
                  <ul className={styles.capList}>
                    {currentChannel.capabilities.map((cap, i) => (
                      <li key={i} className={styles.capItem}>
                        <FaCheckCircle className={styles.capCheck} />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.metricBanner}>
                    <span className={styles.metricLabel}>Benchmark Performance</span>
                    <span className={styles.metricValue}>{currentChannel.metric}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. METHODOLOGY LOOP ── */}
      <section className={styles.methodologySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Strategic Execution</span>
            <h2>Our 4-Stage Performance Framework</h2>
            <p>From initial market diagnosis to continuous CPA compression, every rupee spent is backed by structured experimentation.</p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>01</span>
              <h4>Audience & Competitor Audit</h4>
              <p>We dissect top-performing ads in your sector, reverse-engineer buyer pain points, and configure custom tracking pixels with Conversions API.</p>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>02</span>
              <h4>High-CTR Copy & Creative Hooks</h4>
              <p>We curate thumb-stopping ad copies, dynamic image layouts, and short-form video hooks designed to trigger immediate engagement.</p>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>03</span>
              <h4>Direct CRM & WhatsApp Routing</h4>
              <p>No waiting in email inboxes. Inbound lead forms automatically ping your WhatsApp and CRM within seconds of user submission.</p>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>04</span>
              <h4>Algorithmic A/B Scaling</h4>
              <p>We eliminate underperforming ad sets, redistribute budget to winning audiences, and scale profitable campaigns with predictable ROI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. TRANSPARENT PRICING & SCOPE (PURE INR) ── */}
      <section className={styles.pricingSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Campaign Management Scope</span>
            <h2>Transparent Retainer Pricing</h2>
            <p>Predictable monthly management retainers. Ad spends are billed directly to your platforms with zero hidden markups.</p>
          </div>

          <div className={styles.pricingCardsGrid}>
            {/* Starter Plan */}
            <div className={styles.priceCard}>
              <div className={styles.cardTop}>
                <span className={styles.planName}>Single / Dual Network Starter</span>
                <p className={styles.planDesc}>Ideal for businesses focused on dominating Meta (Facebook + Insta) OR Google Search leads.</p>
                <div className={styles.priceRow}>
                  <span className={styles.currencySymbol}>₹</span>
                  <span className={styles.priceNumber}>18,000</span>
                  <span className={styles.pricePeriod}>/ month</span>
                </div>
                <span className={styles.adSpendLimit}>Ad budget up to ₹1,00,000/mo</span>
              </div>

              <ul className={styles.planFeatures}>
                <li><FaCheck className={styles.checkIcon} /> Up to 2 Ad Networks (Meta / Google)</li>
                <li><FaCheck className={styles.checkIcon} /> Full Pixel & Conversions API setup</li>
                <li><FaCheck className={styles.checkIcon} /> 4 Creative variations & copy hooks</li>
                <li><FaCheck className={styles.checkIcon} /> Direct WhatsApp / CRM lead webhook</li>
                <li><FaCheck className={styles.checkIcon} /> Weekly bid & negative keyword weeds</li>
                <li><FaCheck className={styles.checkIcon} /> Bi-weekly performance overview</li>
              </ul>

              <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi VeltaZ, I'm interested in the Starter Performance Marketing package (₹18,000/mo). Let's discuss.")}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline" 
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Choose Starter Retainer
                </a>
              </div>
            </div>

            {/* Omnichannel Scaling Plan (Featured) */}
            <div className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
              <div className={styles.featuredTag}>Most Popular Choice</div>
              <div className={styles.cardTop}>
                <span className={styles.planName}>Omnichannel Scaling Suite</span>
                <p className={styles.planDesc}>Comprehensive multi-channel ad architecture across Meta, Google, LinkedIn & AI search.</p>
                <div className={styles.priceRow}>
                  <span className={styles.currencySymbol}>₹</span>
                  <span className={styles.priceNumber}>32,000</span>
                  <span className={styles.pricePeriod}>/ month</span>
                </div>
                <span className={styles.adSpendLimit}>Ad budget up to ₹3,50,000/mo</span>
              </div>

              <ul className={styles.planFeatures}>
                <li><FaCheck className={styles.checkIcon} /> <strong>All 5 Ad Channels eligible</strong></li>
                <li><FaCheck className={styles.checkIcon} /> Meta Campaign Ads & Insta Boost</li>
                <li><FaCheck className={styles.checkIcon} /> Google PPC & Local Service Ads</li>
                <li><FaCheck className={styles.checkIcon} /> ChatGPT AI Search & LinkedIn ABM</li>
                <li><FaCheck className={styles.checkIcon} /> 10+ Creative A/B tests & dynamic formats</li>
                <li><FaCheck className={styles.checkIcon} /> Live Looker Studio Analytics Dashboard</li>
                <li><FaCheck className={styles.checkIcon} /> Dedicated Media Buyer & Priority Slack/WA</li>
              </ul>

              <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi VeltaZ, I'm interested in the Omnichannel Performance Scaling package (₹32,000/mo). Let's discuss.")}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Start Omnichannel Scaling
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FAQS ACCORDION ── */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Clarity & Confidence</span>
            <h2>Frequently Asked Questions</h2>
            <p>Common questions business owners ask before launching paid ad campaigns with VeltaZ.</p>
          </div>

          <div className={styles.faqList}>
            {faqItems.map((item, idx) => (
              <div 
                key={idx} 
                className={`${styles.faqCard} ${activeFaq === idx ? styles.faqCardOpen : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className={styles.faqQuestion}>
                  <span>{item.q}</span>
                  <div className={styles.faqToggleIcon}>
                    {activeFaq === idx ? <FaMinus size={12} /> : <FaPlus size={12} />}
                  </div>
                </div>
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

      {/* ── 6. BOTTOM CTA ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to Scale Your Inbound Pipeline?</h2>
            <p>
              Schedule a 15-minute ad audit with our performance marketing engineers to diagnose current bottlenecks and project realistic acquisition numbers.
            </p>
            <div style={{ marginTop: '28px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ padding: '13px 28px', fontSize: '15px' }}
              >
                <FaWhatsapp size={19} style={{ marginRight: 8 }} />
                <span>Book Free Campaign Audit</span>
              </a>
              <Link to="/contact" className="btn btn-outline" style={{ padding: '13px 28px', fontSize: '15px' }}>
                <span>Send Brief via Form</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
