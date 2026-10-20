import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaWhatsapp, 
  FaCheck, 
  FaArrowRight, 
  FaBolt, 
  FaFileInvoice, 
  FaPlus, 
  FaMinus,
  FaFileExcel,
  FaEnvelope,
  FaCalendarCheck,
  FaUserCheck,
  FaClock,
  FaRobot,
  FaExchangeAlt
} from 'react-icons/fa'
import { SiGooglesheets, SiGooglecalendar } from 'react-icons/si'
import styles from './AutomationSystems.module.css'

const WHATSAPP_NUMBER = '919960240648'
const WHATSAPP_MSG = encodeURIComponent("Hi VeltaZ, I'm interested in business automation systems. I'd like to discuss our workflows and get an estimate.")
const WHATSAPP_STARTER_MSG = encodeURIComponent("Hi VeltaZ, I'm interested in Workflow Starter Automation. I'd like to discuss onboarding.")
const WHATSAPP_FULL_MSG = encodeURIComponent("Hi VeltaZ, I'm interested in Full Pipeline Automation. I'd like to discuss our operational architecture.")

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`
const WHATSAPP_STARTER_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_STARTER_MSG}`
const WHATSAPP_FULL_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_FULL_MSG}`

// FAQ Items
const faqItems = [
  {
    q: "How does WhatsApp Query Automation work?",
    a: "We integrate official WhatsApp Cloud APIs or automated webhooks that listen to incoming customer messages. It can answer FAQs, send PDF brochures or price lists, verify customer intent, and immediately notify an assigned team member for complex conversations."
  },
  {
    q: "Can Excel and Google Sheets automations update existing data without breaking formulas?",
    a: "Yes. Our automations append clean, validated rows and mirror data between platforms without disturbing your established formulas, conditional formatting, or existing pivot tables."
  },
  {
    q: "How does the Appointment Booking Automation prevent client no-shows?",
    a: "Prospects choose an open slot on your team's live calendar. The system automatically creates a Google Meet / Zoom link, adds it to both calendars, and sends timed WhatsApp and SMS reminders 2 hours and 15 minutes prior to the call."
  },
  {
    q: "How does Smart Follow-Up Automation stop when a client replies?",
    a: "Our follow-up sequences have active condition listeners. As soon as a customer responds, replies to an email, or books a meeting, all automated follow-up sequences are instantly halted to ensure your human conversations remain natural."
  },
  {
    q: "Do we have to pay monthly subscription fees for Zapier or Make?",
    a: "Whenever possible, we build on cost-effective or self-hosted platforms (like n8n or direct webhook scripts) to keep recurring costs near zero. If you prefer cloud platforms like Zapier or Make, you maintain 100% ownership of your own accounts."
  }
]

// The 6 Core Automations requested
const coreAutomations = [
  {
    id: 'whatsapp',
    title: 'WhatsApp Query Automation',
    tag: '24/7 Instant Response',
    icon: <FaWhatsapp />,
    color: '#25D366',
    desc: 'Instant automated answers to incoming customer queries, product catalog distribution, pricing info, and live sales rep handoff.',
    points: [
      'Instant replies to common customer FAQs',
      'Automated PDF brochure & price list dispatch',
      'Smart keyword routing & human agent escalation',
      'Zero missed leads outside standard business hours'
    ],
    metric: '< 5s Response Time'
  },
  {
    id: 'excel',
    title: 'Excel & Google Sheets Automation',
    tag: 'Data Sync & Reports',
    icon: <FaFileExcel />,
    color: '#107C41',
    desc: 'Eliminate manual data entry. Automatically capture every lead, order, or expense into structured sheets with real-time formula computation.',
    points: [
      'Auto-logging of leads from ads and website forms',
      'Data cleaning, formatting & duplicate removal',
      'Two-way sync between CRM and Google Sheets',
      'Automated daily/weekly summary reports'
    ],
    metric: '10+ Hours Saved / Week'
  },
  {
    id: 'email',
    title: 'Email Automation',
    tag: 'Drip & Transactional',
    icon: <FaEnvelope />,
    color: '#06b6d4',
    desc: 'Trigger personalized email sequences, automated onboarding drips, instant booking confirmations, and dynamic invoice delivery.',
    points: [
      'Multi-step email nurturing sequences',
      'Dynamic branded PDF invoice generation & delivery',
      'Instant confirmation & receipt emails',
      'High deliverability SMTP setup & spam filtering'
    ],
    metric: '3x Higher Open Rates'
  },
  {
    id: 'appointment',
    title: 'Appointment & Booking Automation',
    tag: 'Zero No-Shows',
    icon: <FaCalendarCheck />,
    color: '#8b5cf6',
    desc: 'Self-serve scheduling synced with Google Calendar. Automatically generates meeting links and sends timed WhatsApp reminders.',
    points: [
      'Live calendar availability & instant booking',
      'Auto-generated Google Meet & Zoom links',
      'Timed WhatsApp & SMS reminders before calls',
      'Self-service rescheduling without back-and-forth'
    ],
    metric: '75% Lower No-Shows'
  },
  {
    id: 'lead',
    title: 'Lead Intake & Routing Automation',
    tag: 'Instant Distribution',
    icon: <FaUserCheck />,
    color: '#3b82f6',
    desc: 'Capture leads across Meta Ads, Website forms, and WhatsApp, filter by budget and location, and route directly to active sales reps.',
    points: [
      'Sub-10 second routing to assigned sales executives',
      'Round-robin or rule-based agent assignment',
      'Auto-enrichment with source & campaign tags',
      'Direct WhatsApp click-to-chat links for reps'
    ],
    metric: '< 10s Lead Delivery'
  },
  {
    id: 'followup',
    title: 'Smart Follow-Up Automation',
    tag: 'Deal Recovery',
    icon: <FaClock />,
    color: '#f59e0b',
    desc: 'Automated multi-touch follow-ups across WhatsApp and Email if a prospect goes quiet after receiving a quote or proposal.',
    points: [
      'Automated check-ins at 24h, 48h, and 5 days',
      'Immediate pause as soon as prospect responds',
      'Context-aware messaging with offer nudges',
      'Revives dormant and cold pipeline inquiries'
    ],
    metric: '35%+ Deal Recovery'
  }
]

export default function AutomationSystems() {
  const [activeFaq, setActiveFaq] = useState(0)
  const [selectedAuto, setSelectedAuto] = useState('whatsapp')

  useEffect(() => {
    document.title = "Business Automation Systems | WhatsApp, Excel, Lead & Email Automation | VeltaZ"
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = "description"
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute("content", "Scale operations with custom business automations: WhatsApp query automation, Excel & Google Sheets sync, email drips, appointment booking, lead routing, and follow-up sequences by VeltaZ.")
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles.pageContainer}>
      
      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <div className={styles.heroGrid} />
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              AUTOMATION SYSTEMS · VELTAZ
            </span>

            <h1 className={styles.heroTitle}>
              Connect Your Tools. <br />
              <span className={styles.heroTitleHighlight}>Automate Your Business.</span>
            </h1>

            <p className={styles.heroSub}>
              We build custom automations for <strong>WhatsApp Queries, Excel & Google Sheets, Lead Routing, Email Drips, Appointment Booking</strong>, and <strong>Smart Follow-Ups</strong>. Stop manual copy-pasting and let intelligent pipelines run your operations.
            </p>

            {/* Quick Pills Row for the 6 core automations */}
            <div className={styles.autoPillList}>
              <span className={styles.autoPill}><FaWhatsapp /> WhatsApp Query</span>
              <span className={styles.autoPill}><FaFileExcel /> Excel / Sheets</span>
              <span className={styles.autoPill}><FaEnvelope /> Email Drips</span>
              <span className={styles.autoPill}><FaCalendarCheck /> Appointment Booking</span>
              <span className={styles.autoPill}><FaUserCheck /> Lead Routing</span>
              <span className={styles.autoPill}><FaClock /> Follow-Up Sequences</span>
            </div>

            <div className={styles.heroBtnRow}>
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.heroWhatsappBtn}
              >
                <FaWhatsapp size={19} />
                <span>Discuss Your Workflow</span>
              </a>
              <a href="#automations-list" className={styles.heroSecondaryBtn}>
                <span>Explore The 6 Automations</span>
                <FaArrowRight size={13} />
              </a>
            </div>

            {/* Hero Visual Mockup */}
            <div className={styles.heroMockupWrapper}>
              <div className={styles.mockupChassis}>
                <div className={styles.mockupHeader}>
                  <div className={styles.dotGroup}>
                    <span className={styles.dotClose} />
                    <span className={styles.dotMin} />
                    <span className={styles.dotMax} />
                  </div>
                  <div className={styles.mockupUrl}>
                    <FaBolt className={styles.boltIcon} />
                    <span className={styles.urlDesktopText}>pipeline.veltaz.internal/live-telemetry</span>
            <span className={styles.urlMobileText}>pipeline.veltaz.internal</span>
                  </div>
                  <span className={styles.livePulseBadge}>
                    <span className={styles.liveDot} /> Active 99.98%
                  </span>
                </div>

                <div className={styles.mockupBody}>
                  <img 
                    src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792436396/automation_b0h9bp.png" 
                    alt="VeltaZ Automation Workflow Dashboard" 
                    className={styles.mockupImg}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE 6 CORE BUSINESS AUTOMATIONS (REQUESTED BY USER) */}
      <section id="automations-list" className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Full Automation Capabilities</span>
            <h2>Six High-Impact Automations We Build</h2>
            <p>
              Engineered around your actual business tools. We connect your inquiries, spreadsheets, calendar, and sales team into one synchronized workflow.
            </p>
          </div>

          <div className={styles.coreGrid}>
            {coreAutomations.map((item) => (
              <div 
                key={item.id} 
                className={`${styles.coreCard} ${selectedAuto === item.id ? styles.coreCardSelected : ''}`}
                onClick={() => setSelectedAuto(item.id)}
              >
                <div className={styles.cardHeaderRow}>
                  <div className={styles.cardIconBox} style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <span className={styles.cardTagBadge}>{item.tag}</span>
                </div>

                <h3 className={styles.coreCardTitle}>{item.title}</h3>
                <p className={styles.coreCardDesc}>{item.desc}</p>

                <ul className={styles.coreCardPoints}>
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx}>
                      <FaCheck className={styles.checkIconSmall} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.coreCardMetric}>
                  <FaBolt size={11} />
                  <span>{item.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW THEY WORK TOGETHER (END-TO-END PIPELINE SCENARIO) */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Unified Operations</span>
            <h2>How These Automations Run Together</h2>
            <p>See how an inquiry moves effortlessly from discovery to completed booking without any staff copy-pasting.</p>
          </div>

          <div className={styles.scenarioPipeline}>
            <div className={styles.scenarioStep}>
              <div className={styles.stepNumberBadge}>1</div>
              <h4>Lead Capture</h4>
              <p>Customer submits details on Meta Ads or Website.</p>
              <span className={styles.stepEngineTag}>Lead Automation</span>
            </div>

            <div className={styles.scenarioArrow}>→</div>

            <div className={styles.scenarioStep}>
              <div className={styles.stepNumberBadge}>2</div>
              <h4>Excel / Sheets Sync</h4>
              <p>Details logged instantly in your master tracker spreadsheet.</p>
              <span className={styles.stepEngineTag}>Excel Automation</span>
            </div>

            <div className={styles.scenarioArrow}>→</div>

            <div className={styles.scenarioStep}>
              <div className={styles.stepNumberBadge}>3</div>
              <h4>WhatsApp Greeting</h4>
              <p>Customer gets instant greeting, catalog & calendar link.</p>
              <span className={styles.stepEngineTag}>WhatsApp Query Auto</span>
            </div>

            <div className={styles.scenarioArrow}>→</div>

            <div className={styles.scenarioStep}>
              <div className={styles.stepNumberBadge}>4</div>
              <h4>Appointment Booking</h4>
              <p>Slot booked on Google Calendar with Meet link generated.</p>
              <span className={styles.stepEngineTag}>Appointment Auto</span>
            </div>

            <div className={styles.scenarioArrow}>→</div>

            <div className={styles.scenarioStep}>
              <div className={styles.stepNumberBadge}>5</div>
              <h4>Smart Follow-Up</h4>
              <p>Timed WhatsApp/Email reminders sent automatically.</p>
              <span className={styles.stepEngineTag}>Follow-Up & Email Auto</span>
            </div>
          </div>

          <div className={styles.architectureNote}>
            <strong>Zero Copy-Pasting:</strong> Your sales executives receive instant qualified alerts with direct WhatsApp links. Manual data duplication across tools drops to 0%.
          </div>
        </div>
      </section>

      {/* 4. DISCUSS YOUR WORKFLOW (CTA) */}
      <section className={styles.finalCtaSection} style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.finalCtaBox}>
            <span className="tag" style={{ marginBottom: 14 }}>Eliminate Manual Operations</span>
            <h2>Let's Engineer Your Custom Business Automation.</h2>
            <p>
              Tell us where your team spends manual hours every day. We'll design a customized, automated pipeline blueprint for WhatsApp, Excel, and Leads within 24 hours.
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
                <span>Discuss Your Workflow</span>
              </a>
              <Link 
                to="/contact" 
                className={styles.heroSecondaryBtn}
                style={{ padding: '15px 28px', fontSize: '15px' }}
              >
                <span>Send Specification</span>
                <FaArrowRight size={13} />
              </Link>
            </div>

            <div className={styles.ctaReassurance}>
              <span className={styles.reassuranceItem}>
                <FaCheck /> 100% Client Workflow Ownership
              </span>
              <span className={styles.reassuranceItem}>
                <FaCheck /> Zero Per-Lead Royalty Fees
              </span>
              <span className={styles.reassuranceItem}>
                <FaCheck /> Direct Technical Architect Consultation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Questions & Answers</span>
            <h2>Frequently Asked Questions</h2>
            <p>Clear, direct answers regarding automation architecture, software compatibility, and maintenance.</p>
          </div>

          <div className={styles.faqWrapper}>
            {faqItems.map((item, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div key={idx} className={styles.faqItem}>
                  <button 
                    type="button" 
                    className={styles.faqQuestion}
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
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

    </div>
  )
}
