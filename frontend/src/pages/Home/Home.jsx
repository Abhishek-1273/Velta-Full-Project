import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const stats = [
  { value: '2+', label: 'Businesses Automated' },
  { value: '10+', label: 'Products Managed' },
  { value: '2x', label: 'Lead Conversion' },
  { value: '60%', label: 'Faster Response' },
  { value: 'Minimal', label: 'Manual Work' },
]
const features = [
  { icon: <img src='/icons/lead.png' alt='lead' width="45" />, title: 'Lead Capture', desc: 'Automatically capture every lead from WhatsApp ads with zero manual effort.' },
  { icon: <img src='/icons/chatbot.png' alt='chatbot' width="45" />, title: 'AI Replies', desc: 'Instant, smart responses powered by AI — 24/7 without a single agent.' },
  { icon: <img src='/icons/analytics.png' alt='analytics' width="40" />, title: 'Analytics', desc: 'Real-time dashboard showing lead flow, conversions and team performance.' },
  { icon: <img src='/icons/auto.png' alt='automate' width="50" />, title: 'Auto Assign', desc: 'Round-robin lead distribution to your team — no clashes, no missed leads.' },
  { icon: <img src='/icons/booking.png' alt='booking' width="40" />, title: 'Booking System', desc: 'Schedule visits and track appointments automatically from WhatsApp.' },
  { icon: <img src='/icons/bulk.png' alt='bulk-message' width="55" />, title: 'Bulk Messaging', desc: 'Broadcast offers and updates to thousands with a single click.' },
]

const why = [
  { icon: <img src='/icons/autom.png' alt='automate' width="40" />, title: 'Fully Automated', desc: 'End-to-end automation — no babysitting required.' },
  { icon: <img src='/icons/web-dev.png' alt='custom' width="40" />, title: 'Custom Built', desc: 'Every system is tailored specifically to your business.' },
  { icon: <img src='/icons/scalable.png' alt='scalable' width="40" />, title: 'Scalable', desc: 'Grows with your business from 10 to 10,000 leads.' },
  { icon: <img src='/icons/affordable.png' alt='affordable' width="40" />, title: 'Affordable', desc: 'Enterprise-level automation at SMB-friendly pricing.' },
]

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.grid} />
        </div>
        <div className="container">
          <div className={styles.heroLayout}>
            <div className={styles.heroContent}>
              <div className="tag">🚀 WhatsApp Automation Platform</div>
              <h1 className={styles.heroTitle}>The Future of<br /><span className="gradient-text">Business Automation</span></h1>
              <p className={styles.heroSub}>Velta builds smart automation systems that convert leads into customers — automatically. Built for Indian SMBs.</p>
              <div className={styles.heroCta}>
                <Link to="/contact" className="btn btn-primary">Get Started <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
                <Link to="/demo" className="btn btn-outline">See Demo</Link>
              </div>
              <div className={styles.heroStats}>
                {stats.map(s => (
                  <div key={s.label} className={styles.stat}>
                    <span className={styles.statVal}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.phone}>
                <div className={styles.phoneInner}>
                  <div className={styles.phoneHeader}>
                    <div className={styles.phoneAvatar}>V</div>
                    <div><div className={styles.phoneName}>Velta AI</div><div className={styles.phoneOnline}>● Online</div></div>
                  </div>
                  <div className={styles.phoneMessages}>
                    <div className={styles.msgOut}>
                      Hi! I saw your ad, how can WhatsApp automation help my business?
                    </div>

                    <div className={styles.msgIn}>
                      Hello! I'm Velta AI 🤖 What type of business do you run?
                    </div>

                    <div className={styles.msgOut}>
                      <span>I run a real estate agency in Pune 🏠</span>
                      <div className={styles.msgTime}>✓✓ 10:42 AM</div>
                    </div>

                    <div className={styles.msgIn}>
                      Perfect! For real estate, our <strong>Growth Plan</strong> captures every lead from your WhatsApp ads, auto-replies 24/7 and books site visits automatically 🎯
                    </div>

                    <div className={styles.msgOut}>
                      <span>How many leads can it handle?</span>
                      <div className={styles.msgTime}>✓✓ 10:43 AM</div>
                    </div>

                    <div className={styles.msgIn}>
                      Depends on the plan you choose! Every inquiry gets an instant reply in under 2 seconds — even at 3 AM 🤖⚡
                    </div>

                    <div className={styles.msgOut}>
                      <span>Sounds great! What's the pricing?</span>
                      <div className={styles.msgTime}>✓✓ 10:43 AM</div>
                    </div>

                    <div className={styles.msgIn}>
                      Growth Plan starts at just ₹29,999 setup. Want me to book a free demo for you? 📅
                    </div>

                    <div className={styles.typing}><span /><span /><span /></div>
                  </div>
                </div>
              </div>
              <div className={styles.badge1}><span>🎯</span> Lead Captured</div>
              <div className={styles.badge2}><span>⚡</span> AI Reply</div>
              <div className={styles.badge3}><span>📅</span> Visit Booked</div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.marqueeWrap}>
        <div className={styles.marquee}>
          {['Real Estate', 'Education', 'Healthcare', 'E-Commerce', 'Finance', 'Hospitality', 'Retail', 'Manufacturing', 'Real Estate', 'Education', 'Healthcare', 'E-Commerce', 'Finance', 'Hospitality', 'Retail', 'Manufacturing'].map((i, idx) => (
            <span key={idx} className={styles.marqueeItem}><span className={styles.diamond}>◆</span>{i}</span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="tag">What We Do</div>
            <h2 className={styles.sectionTitle}>Replace Manual Work with<br /><span className="gradient-text">Intelligent Systems</span></h2>
            <p className={styles.sectionSub}>End-to-end automation so your team focuses on closing deals, not chasing leads.</p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map(f => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.productSection}>
        <div className={styles.productBg} />
        <div className="container">
          <div className={styles.productInner}>
            <div className={styles.productLeft}>
              <div className="tag">Our Product</div>
              <h2 className={styles.sectionTitle} style={{ marginTop: 16 }}>WhatsFlow <span className="gradient-text">Smart Engine</span></h2>
              <p style={{ color: 'var(--text2)', marginBottom: 32, lineHeight: 1.8 }}>The complete WhatsApp automation system that handles your entire lead lifecycle — from capture to conversion — without any human intervention.</p>
              <ul className={styles.checkList}>
                {['Capture leads automatically', 'Respond instantly with AI', 'Assign leads to team', 'Track visits and conversions', 'Manage from one dashboard'].map(i => (
                  <li key={i}><span className={styles.check}>✓</span>{i}</li>
                ))}
              </ul>
              <Link to="/product" className="btn btn-primary" style={{ marginTop: 32 }}>Explore WhatsFlow →</Link>
            </div>
            <div className={styles.productRight}>
              <div className={styles.dashboard}>
                <div className={styles.dashHeader}><span className={styles.dashTitle}>WhatsFlow Dashboard</span><span className={styles.dashLive}>● Live</span></div>
                <div className={styles.dashStats}>
                  {[{ l: 'Leads Today', v: '142', c: '#00e5ff' }, { l: 'Converted', v: '38', c: '#06ffa5' }, { l: 'In Progress', v: '67', c: '#f59e0b' }, { l: 'Visits Booked', v: '23', c: '#7c3aed' }].map(d => (
                    <div key={d.l} className={styles.dashStat}>
                      <div className={styles.dashStatVal} style={{ color: d.c }}>{d.v}</div>
                      <div className={styles.dashStatLabel}>{d.l}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.dashBar}>
                  <div className={styles.dashBarLabel}><span>Conversion Rate</span><span style={{ color: 'var(--accent3)' }}>26.7%</span></div>
                  <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '26.7%' }} /></div>
                </div>
                <div className={styles.dashBar}>
                  <div className={styles.dashBarLabel}><span>Lead Response</span><span style={{ color: 'var(--accent)' }}>Under 2 sec</span></div>
                  <div className={styles.barTrack}><div className={styles.barFill2} style={{ width: '98%' }} /></div>
                </div>
                <div className={styles.leads}>
                  {[{ name: 'Rahul Sharma', status: 'Hot', time: '2m ago' }, { name: 'Priya Patel', status: 'Warm', time: '5m ago' }, { name: 'Amit Kumar', status: 'New', time: '8m ago' }].map(l => (
                    <div key={l.name} className={styles.leadRow}>
                      <div className={styles.leadAvatar}>{l.name[0]}</div>
                      <div className={styles.leadName}>{l.name}</div>
                      <div className={`${styles.leadStatus} ${styles['status_' + l.status]}`}>{l.status}</div>
                      <div className={styles.leadTime}>{l.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="tag">Why Velta</div>
            <h2 className={styles.sectionTitle}>Built Different.<br /><span className="gradient-text">Built for Results.</span></h2>
          </div>
          <div className={styles.whyGrid}>
            {why.map(w => (
              <div key={w.title} className={styles.whyCard}>
                <div className={styles.whyIcon}>{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Start Automating Your Business Today</h2>
            <p>Join hundreds of Indian businesses already running on Velta.</p>
            <Link to="/contact" className="btn btn-primary" style={{ fontSize: 17, padding: '15px 36px' }}>Get Your Free Demo →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
