import { Link } from 'react-router-dom'
import styles from './Product.module.css'

const products = [
  {
    id: 'whatsflow',
    tag: 'Live',
    tagColor: '#00e5ff',
    icon: <img src='/logo/whatsflow-icon.svg' alt='whatsflow-icon' width="60" />,
    name: 'WhatsFlow',
    tagline: 'Smart WhatsApp Automation Engine',
    desc: 'Convert leads into customers automatically. WhatsFlow captures every WhatsApp lead, replies with AI 24/7, assigns to your team and tracks conversions — all without any manual work.',
    features: [
      'Automatic lead capture from WhatsApp ads',
      'AI-powered instant replies 24/7',
      'Auto lead assignment to team (round-robin)',
      'Visit booking & appointment tracking',
      'Admin + Employee mobile app',
      'Live analytics dashboard',
      'Bulk messaging & broadcast',
    ],
    stats: [
      { val: '3x', label: 'Lead Conversion' },
      { val: '10x', label: 'Faster Response' },
      { val: '24/7', label: 'AI Active' },
    ],
    cta: 'See Demo',
    ctaLink: '/demo',
    color: '#00e5ff',
    gradient: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(0,229,255,0.02))',
    border: 'rgba(0,229,255,0.2)',
  },
  {
    id: 'bizanalyzer',
    tag: 'Live',
    tagColor: '#f59e0b',
    icon: <img src='/logo/bizAnalyzer-icon.svg' alt='bizanalyzer-icon' width="60" />,
    name: 'BizAnalyzer',
    tagline: 'AI Business Intelligence & ROI Engine',
    desc: 'Upload your company\'s CSV data and let our AI analyze your business like a Shark Tank investor. Get instant ROI analysis, revenue insights, cost optimization suggestions and growth projections.',
    features: [
      'CSV data upload & parsing',
      'AI-powered ROI calculation',
      'Revenue & expense trend analysis',
      'Shark Tank style business scoring',
      'Growth opportunity identification',
      'Competitor benchmark insights',
      'Automated PDF reports',
    ],
    stats: [
      { val: 'AI', label: 'Powered Analysis' },
      { val: '360°', label: 'Business View' },
      { val: 'Auto', label: 'PDF Reports' },
    ],
    cta: 'Visit Website',
    ctaLink: 'https://biz-analyzer-eta.vercel.app',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.02))',
    border: 'rgba(245,158,11,0.2)',
  },
  {
    id: 'complianceai',
    tag: 'Live',
    tagColor: '#8451f0',
    icon: <img src='/logo/complysis-icon.svg' alt='compliance-icon' width="60" />,
    name: 'ComplianceAI',
    tagline: 'AI Product Compliance & Regulatory Engine',
    desc: 'Analyze your products against global compliance frameworks like ISO, GDPR, FDA and more. Get real-time compliance scores, identify gaps, manage regulatory approvals and stay audit-ready.',
    features: [
      'Multi-framework compliance analysis (ISO, GDPR, FDA)',
      'Real-time compliance score tracking',
      'Product regulatory mapping',
      'Risk level assessment (Low/Medium/High/Critical)',
      'Gap identification & remediation',
      'Approval & certification tracking',
      'Organization-level compliance dashboard',
    ],
    stats: [
      { val: '50+', label: 'Frameworks' },
      { val: 'Real-time', label: 'Score Updates' },
      { val: 'Global', label: 'Standards' },
    ],
    cta: 'Visit Website',
    ctaLink: 'https://compliance-analysis.vercel.app',
    color: '#8451f0',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.08), rgba(167,139,250,0.02))',
    border: 'rgba(167,139,250,0.2)',
  },
]

export default function Product() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.bg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.grid} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className="tag">🚀 Our Products</div>
            <h1 className={styles.title}>
              AI-Powered Tools for<br />
              <span className="gradient-text">Modern Businesses</span>
            </h1>
            <p className={styles.sub}>
              Velta builds intelligent automation systems that eliminate manual work, surface business insights and ensure compliance — all powered by AI.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <div className="container">
          <div className={styles.productsWrap}>
            {products.map((p, i) => (
              <div
                key={p.id}
                className={`${styles.productCard} ${i % 2 === 1 ? styles.productCardReverse : ''}`}
                style={{ '--card-border': p.border, '--card-grad': p.gradient }}
              >
                {/* Left — Info */}
                <div className={styles.productInfo}>
                  <div className={styles.productMeta}>
                    <span className={styles.productIcon}>{p.icon}</span>
                    <span
                      className={styles.productTag}
                      style={{ background: p.tagColor + '20', color: p.tagColor, border: `1px solid ${p.tagColor}40` }}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <h2 className={styles.productName}>{p.name}</h2>
                  <p className={styles.productTagline} style={{ color: p.color }}>{p.tagline}</p>
                  <p className={styles.productDesc}>{p.desc}</p>

                  {/* Stats */}
                  <div className={styles.statsRow}>
                    {p.stats.map(s => (
                      <div key={s.label} className={styles.stat}>
                        <span className={styles.statVal} style={{ color: p.color }}>{s.val}</span>
                        <span className={styles.statLabel}>{s.label}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={p.ctaLink}
                    className="btn btn-primary"
                    style={{
                      background: p.tag === 'Live' ? p.color : 'transparent',
                      color: p.tag === 'Live' ? '#000' : p.color,
                      border: `1px solid ${p.color}`,
                      boxShadow: p.tag === 'Live' ? `0 0 20px ${p.color}40` : 'none',
                    }}
                  >
                    {p.cta} →
                  </Link>
                </div>

                {/* Right — Features */}
                <div className={styles.productFeatures} style={{ background: p.gradient, borderColor: p.border }}>
                  <div className={styles.featuresHeader}>
                    <span style={{ color: p.color, fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13 }}>
                      KEY FEATURES
                    </span>
                  </div>
                  <ul className={styles.featuresList}>
                    {p.features.map(f => (
                      <li key={f}>
                        <span className={styles.featCheck} style={{ color: p.color }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to automate your business?</h2>
            <p>Start with WhatsFlow today — or join the waitlist for our upcoming products.</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
                Get Started →
              </Link>
              <Link to="/plan" className="btn btn-outline" style={{ fontSize: 16, padding: '14px 32px' }}>
                Build Your Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
