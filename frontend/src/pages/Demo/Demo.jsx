import { useState, useEffect } from 'react'
import styles from './Demo.module.css'

// ─── Lock body scroll when any modal is open ───────────────────────
function useBodyScrollLock(active) {
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [active])
}


// ─── Your 4 actual videos ───────────────────────────────────────────
const videos = [
  {
    id: 1,
    file: '/videos/admin.mp4',
    thumb: '/svg/admin.svg',
    tag: 'Admin View',
    title: 'Admin Dashboard Walkthrough',
    desc: 'Full admin panel tour — manage all leads, team members, visit bookings and analytics from one central dashboard.',
    duration: '26 sec',
    color: '#0091a1',
  },
  {
    id: 2,
    file: '/videos/employee.mp4',
    thumb: '/svg/employee.svg',
    tag: 'Employee View',
    title: 'Employee App in Action',
    desc: 'See how your field executives receive leads, update statuses and manage their daily follow-ups — all from their phone.',
    duration: '51 sec',
    color: '#009d63',
  },
  {
    id: 3,
    file: '/videos/lead.mp4',
    thumb: '/svg/lead.svg',
    tag: 'Lead Management',
    title: 'How to Add & Track a Lead',
    desc: 'Step-by-step: capturing a new lead, marking it as successful, booked for visit, or not interested — with instant team notifications.',
    duration: '50 sec',
    color: '#7c3aed',
  },
  {
    id: 4,
    file: '/videos/dashboard.mp4',
    thumb: '/svg/dashboard.svg',
    tag: 'Analytics Dashboard',
    title: 'CRM Dashboard & Team Performance',
    desc: 'Live charts and graphs showing total leads, conversion rates, and exactly how much work each employee has done — spot who\'s performing and who needs a nudge.',
    duration: '3 min',
    color: '#f97316',
  },
]

// ─── Your 5 actual screenshots ──────────────────────────────────────
const screenshots = [
  {
    file: '/image/lead-over.jpeg',
    title: 'Leads Overview',
    desc: 'All incoming leads in one clean view — status, source, assigned executive and follow-up date at a glance.',
    badge: 'Live Data',
    badgeColor: '#0091a1',
  },
  {
    file: '/image/active-mem.jpeg',
    title: 'Active Team Members',
    desc: 'See which employees are online, their current lead load and performance stats in real time.',
    badge: 'Team View',
    badgeColor: '#009d63',
  },
  {
    file: '/image/lead-cap.jpeg',
    title: 'Lead Capture Info',
    desc: 'Detailed lead profile — status, location, car preference and all captured data from the WhatsApp conversation.',
    badge: 'Lead Detail',
    badgeColor: '#f59e0b',
  },
  {
    file: '/image/lead-book.jpeg',
    title: 'Deal Booked – Visit Scheduled',
    desc: "Customer's visit confirmed for tomorrow. All booking details, time slot and executive assignment shown clearly.",
    badge: 'Booked',
    badgeColor: '#7c3aed',
  },
  {
    file: '/image/dashboard.png',
    title: 'Analytics Dashboard — Desktop & Mobile',
    desc: 'The full CRM dashboard adapts beautifully across devices. Track charts, graphs and employee performance whether you\'re at your desk or on the go.',
    badge: 'Responsive',
    badgeColor: '#f97316',
    wide: true,
  },
]

const features = [
  { icon: <img src='/icons/lead.png' alt='lead' width="45" />, title: 'Lead Management', items: ['Capture all leads automatically', 'Clean organized database', 'No duplicates or data loss'] },
  { icon: <img src='/icons/lead-dist.png' alt='lead-distribution' width="45" />, title: 'Lead Distribution', items: ['Auto assignment to team', 'Round-robin system', 'No lead clashes'] },
  { icon: <img src='/icons/visit.png' alt='visting' width="45" />, title: 'Booking & Visit System', items: ['Schedule visits easily', 'Track appointments', 'Manage customer flow'] },
  { icon: <img src='/icons/busi-app.png' alt='business-app' width="45" />, title: 'Business App', items: ['Admin and employee dashboard', 'Lead tracking', 'Status updates'] },
  { icon: <img src='/icons/dashboard.png' alt='dashboard' width="50" />, title: 'Analytics Dashboard', items: ['Lead insights', 'Conversion tracking', 'Business performance'] },
  { icon: <img src='/icons/bulk.png' alt='bulk-msg' width="50" />, title: 'Bulk Messaging', items: ['Send offers and updates', 'Notify customers instantly', 'One-click broadcast'] },
]

// ─── Video Modal ─────────────────────────────────────────────────────
function VideoModal({ video, onClose }) {
  useBodyScrollLock(!!video)
  if (!video) return null
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className={styles.modalHeader}>
          <span className={styles.modalTag} style={{ background: video.color + '20', color: video.color }}>{video.tag}</span>
          <h3>{video.title}</h3>
          <p>{video.desc}</p>
        </div>
        <div className={styles.modalVideo}>
          <video
            src={video.file}
            controls
            autoPlay
            className={styles.videoEl}
            poster={video.thumb}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Screenshot lightbox ─────────────────────────────────────────────
function ImageModal({ img, onClose }) {
  useBodyScrollLock(!!img)
  if (!img) return null
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.imgModalInner} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <img src={img.file} alt={img.title} className={styles.imgFull} />
        <div className={styles.imgCaption}>
          <strong>{img.title}</strong>
          <span>{img.desc}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────




export default function Demo() {
  const [activeVideo, setActiveVideo] = useState(null)
  const [activeImg, setActiveImg] = useState(null)

  return (
    <div className={styles.page}>

      {/* Modals */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      <ImageModal img={activeImg} onClose={() => setActiveImg(null)} />

      {/* ── Hero ── */}

      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.bg}>
            <div className={styles.orb1} /><div className={styles.orb2} />
            <div className={styles.grid} />
          </div>
          <div className="container">
            <div className={styles.heroContent}>
              <div className="tag">Our Product</div>
              <h1 className={styles.title}>WhatsFlow<br /><span className="gradient-text">Smart WhatsApp Automation Engine</span></h1>
              <p className={styles.sub}>The complete system that manages leads, automates replies, and increases conversions — all from WhatsApp.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div className="tag">Features</div>
              <h2 className={styles.h2} style={{ marginTop: 16 }}>Everything Your Business Needs<br /><span className="gradient-text">In One System</span></h2>
            </div>
            <div className={styles.featuresGrid}>
              {features.map(f => (
                <div key={f.title} className={styles.featureCard}>
                  <div className={styles.fi}>{f.icon}</div>
                  <h3>{f.title}</h3>
                  <ul>
                    {f.items.map(i => <li key={i}><span className={styles.dot} />  {i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.flowSection}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div className="tag">How It Works</div>
              <h2 className={styles.h2} style={{ marginTop: 16 }}>Lead to Customer in<br /><span className="gradient-text">4 Automated Steps</span></h2>
            </div>
            <div className={styles.flow}>
              {[
                { n: '01', title: 'Lead Arrives', desc: 'Customer sends a WhatsApp message from your ad or link.' },
                { n: '02', title: 'AI Responds', desc: 'WhatsFlow instantly replies with smart, business-specific messages.' },
                { n: '03', title: 'Visit Booked', desc: 'System schedules a site visit and assigns an executive automatically.' },
                { n: '04', title: 'Deal Closed', desc: 'Your team shows up to warm leads that are already interested.' },
              ].map((s, i) => (
                <div key={s.n} className={styles.step}>
                  <div className={styles.stepNum}>{s.n}</div>
                  {i < 3 && <div className={styles.stepLine} />}
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>



      {/* ── Video Section ── */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="tag">Screen Recordings</div>
            <h2 className={styles.h2}>
              Watch the System<br />
              <span className="gradient-text">Work Live</span>
            </h2>
            <p className={styles.sectionSub}>4 real recordings showing how WhatsFlow works from every angle.</p>
          </div>

          <div className={styles.videosGrid}>
            {videos.map((v) => (
              <div key={v.id} className={styles.videoCard} onClick={() => setActiveVideo(v)}>
                {/* Thumbnail */}
                <div className={styles.videoThumb}>
                  <img
                    src={v.thumb}
                    alt={v.title}
                    className={styles.thumbImg}
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <div className={styles.thumbOverlay} />
                  {/* Big centre play button */}
                  <div className={styles.playCircle} style={{ boxShadow: `0 0 32px ${v.color}50` }}>
                    <svg width="28" height="28" fill={v.color} viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  {/* Top tags */}
                  <div className={styles.videoTagBadge} style={{ background: "#ffffff", color: v.color, border: `2px solid ${v.color}80` }}>
                    {v.tag}
                  </div>
                  <div className={styles.durationBadge}>{v.duration}</div>
                </div>
                {/* Info */}
                <div className={styles.videoInfo}>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                  <button className={styles.watchBtn} style={{ color: v.color }}>
                    <svg width="14" height="14" fill={v.color} viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    Watch Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Screenshots Section ── */}
      <section className={styles.screenshotsSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="tag">App Screenshots</div>
            <h2 className={styles.h2}>
              Real Screens,<br />
              <span className="gradient-text">Real Data</span>
            </h2>
            <p className={styles.sectionSub}>Actual screenshots from the WhatsFlow system — click to enlarge.</p>
          </div>

          {/* First 4 screenshots in the normal grid */}
          <div className={styles.screenshotsGrid}>
            {screenshots.filter(s => !s.wide).map((s, i) => (
              <div key={i} className={styles.screenshotCard} onClick={() => setActiveImg(s)}>
                <div className={styles.ssImgWrap}>
                  <img
                    src={s.file}
                    alt={s.title}
                    className={styles.ssImg}
                    onError={e => {
                      e.target.parentElement.style.background = 'var(--surface2)'
                    }}
                  />
                  <div className={styles.ssOverlay}>
                    <div className={styles.ssZoom}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className={styles.ssBadge} style={{ background: '#ffffff', color: s.badgeColor, border: `2px solid ${s.badgeColor}44` }}>
                  {s.badge}
                </div>
                <div className={styles.ssInfo}>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard wide card — full width below the grid */}
          {screenshots.filter(s => s.wide).map((s, i) => (
            <div
              key={`wide-${i}`}
              className={`${styles.screenshotCard} ${styles.screenshotCardWide}`}
              onClick={() => setActiveImg(s)}
              style={{ marginTop: '2rem' }}
            >
              <div className={styles.ssImgWrapRes}>
                <img
                  src={s.file}
                  alt={s.title}
                  className={styles.ssImg}
                  onError={e => {
                    e.target.parentElement.style.background = 'var(--surface2)'
                  }}
                />
                <div className={styles.ssOverlay}>
                  <div className={styles.ssZoom}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={styles.ssBadge} style={{ background: '#ffffff', color: s.badgeColor, border: `2px solid ${s.badgeColor}44` }}>
                {s.badge}
              </div>
              <div className={styles.ssInfo}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </section>

    </div>
  )
}