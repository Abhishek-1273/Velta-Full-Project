import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Product.module.css'

const products = [
  {
    id: 'whatsflow',
    image: '/images/whatsapp-automation.png',
    icon: '💬',
    color: '#00e5ff',
    tag: 'Automation',
    name: 'WhatsApp Automation',
    tagline: 'Never miss a lead again',
    desc: 'Every customer who messages your WhatsApp number is instantly captured as a lead, assigned to the right executive, and tracked — fully automatic, zero manual work.',
    points: [
      'Instant lead capture on first message',
      'Auto-reply to keep customer engaged',
      'Smart lead assignment to executives',
      'Duplicate number detection',
      'Follow-up scheduling & drip sequences',
      'Bulk messaging to 1000+ contacts',
    ]
  },
  {
    id: 'crm',
    image: '/images/whatsapp-automation.png',
    icon: '💬',
    color: '#06ffa5',
    tag: 'System',
    name: 'Smart CRM',
    tagline: 'Manage leads like a pro',
    desc: 'Track, assign, and manage all your leads from a centralized intelligent dashboard — with real-time updates, team coordination, and complete visibility into your sales pipeline.',
    points: [
      'Instant lead capture on first message',
      'Auto-reply to keep customer engaged',
      'Smart lead assignment to executives',
      'Duplicate number detection',
      'Follow-up scheduling & drip sequences',
      'Bulk messaging to 1000+ contacts',
    ]
  },
  {
    id: 'ai',
    image: '/images/whatsapp-automation.png',
    icon: '💬',
    color: '#f59e0b',
    tag: 'AI Powered',
    name: 'AI Chatbot',
    tagline: '24/7 automated conversations',
    desc: 'An intelligent AI assistant that engages with your customers, answers queries instantly, and automatically qualifies leads — ensuring faster responses and better conversions.',
    points: [
      'Instant lead capture on first message',
      'Auto-reply to keep customer engaged',
      'Smart lead assignment to executives',
      'Duplicate number detection',
      'Follow-up scheduling & drip sequences',
      'Bulk messaging to 1000+ contacts',
    ]
  },
]

const steps = [
  {
    num: '01',
    color: '#00e5ff',
    title: 'Capture Leads',
    desc: 'Customers reach you through WhatsApp, website, or other channels — every interaction is instantly captured as a lead.'
  },
  {
    num: '02',
    color: '#06ffa5',
    title: 'Automate Conversations',
    desc: 'AI and automation instantly respond to customers, answer queries, and keep them engaged without any manual effort.'
  },
  {
    num: '03',
    color: '#f59e0b',
    title: 'Manage & Track',
    desc: 'All leads are organized, assigned, and tracked in a centralized system — giving full visibility to your team.'
  },
  {
    num: '04',
    color: '#7c3aed',
    title: 'Convert & Scale',
    desc: 'Close more deals with smart follow-ups and insights — while your system scales your business automatically.'
  },
]
const faqs = [
  { q: 'Do I need a separate WhatsApp number?', a: 'Yes, we recommend a dedicated WhatsApp Business number. We handle the full setup — from number registration to configuration.' },
  { q: 'How does the AI score my leads?', a: 'The AI analyzes reply speed, message intent, keywords and engagement patterns to automatically tag each lead as Hot, Warm or Cold — and suggests the right next action.' },
  { q: 'Is bulk messaging safe from spam bans?', a: 'Yes — messages go through the official WhatsApp Business API, which is fully compliant. Opt-outs are handled automatically.' },
  { q: 'How long does the setup take?', a: 'Most businesses are live within 3–7 business days after requirements are finalized. Onboarding and team training are included.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`} onClick={() => setOpen(o => !o)}>
      <div className={styles.faqQ}>
        <span>{q}</span>
        <span className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ''}`}>+</span>
      </div>
      {open && <div className={styles.faqA}>{a}</div>}
    </div>
  )
}

export default function Product() {
  const [active, setActive] = useState(null)

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.bg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.grid} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className="tag">The Product</div>
            <h1 className={styles.heroTitle}>
              One Platform.<br />
              <span className="gradient-text">Complete WhatsApp Automation.</span>
            </h1>
            <p className={styles.heroSub}>
              WhatsFlow is a full AI-powered WhatsApp business system —
              it captures leads, follows up automatically, and shows you
              live performance data. All in one place.
            </p>
            <div className={styles.heroBtns}>
              <Link to="/contact" className="btn btn-primary">Talk to us →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 Product Cards ── */}
      <section className={styles.productsSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="tag">What's Inside WhatsFlow</div>
            <h2 className={styles.h2}>
              Three Powerful Modules.<br />
              <span className="gradient-text">One Unified System.</span>
            </h2>
            <p className={styles.sectionSub}>
              Each module solves a real problem. Together they automate your entire lead pipeline.
            </p>
          </div>

          <div className={styles.cardsGrid}>
            {products.map((p, i) => (
              <div
                key={p.id}
                className={`${styles.card} ${active === i ? styles.cardActive : ''}`}
                onClick={() => setActive(active === i ? null : i)}
                style={active === i ? { borderColor: p.color, boxShadow: `0 0 48px ${p.color}22` } : {}}
              >
                {/* Top accent */}
                <div className={styles.cardLine} style={{ background: p.color }} />

                {/* Tag */}
                <div
                  className={styles.cardTag}
                  style={{ background: p.color + '18', color: p.color, border: `1px solid ${p.color}30` }}
                >
                  {p.tag}
                </div>

                {/* Icon */}
                <div className={styles.cardIcon}>{p.icon}</div>

                {/* Name + tagline */}
                <h3 className={styles.cardName}>{p.name}</h3>
                <p className={styles.cardTagline} style={{ color: p.color }}>{p.tagline}</p>

                {/* Description */}
                <p className={styles.cardDesc}>{p.desc}</p>

                {/* Divider */}
                <div className={styles.cardDivider} />

                {/* Features */}
                <ul className={styles.cardPoints}>
                  {p.points.map(pt => (
                    <li key={pt}>
                      <span className={styles.tick} style={{ color: p.color }}>✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className={styles.howSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="tag">How It Works</div>
            <h2 className={styles.h2}>
              From First Message<br />
              <span className="gradient-text">To Closed Deal</span>
            </h2>
          </div>

          <div className={styles.stepsGrid}>
            {steps.map((s, i) => (
              <div key={s.num} className={styles.step}>
                <div className={styles.stepNum} style={{ color: s.color }}>{s.num}</div>
                <h4 className={styles.stepTitle}>{s.title}</h4>
                <p className={styles.stepDesc}>{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className={styles.stepArrow} style={{ color: s.color }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="tag">FAQ</div>
            <h2 className={styles.h2}>Common Questions</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaOrb} />
            <div className="tag">Get Started</div>
            <h2 className={styles.ctaTitle}>
              See WhatsFlow Running<br />
              <span className="gradient-text">For Your Business</span>
            </h2>
            <p className={styles.ctaSub}>
              Book a free 30-minute demo — live system, real data, your business type.
            </p>
            <div className={styles.ctaBtns}>
              <Link to="/contact" className="btn btn-primary">Book Free Demo →</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}