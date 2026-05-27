import styles from './About.module.css'

const values = [
  { icon: <img src='/icons/results.png' alt='results' width="50"/>, title: 'Results First', desc: 'Every system we build is measured by leads converted, not features shipped.' },
  { icon: <img src='/icons/asset.png' alt='asset' width="50"/>, title: 'Real Business Understanding', desc: 'We have worked with real SMBs and understand their pain points deeply.' },
  { icon: <img src='/icons/value.png' alt='value' width="50"/>, title: 'Speed to Value', desc: 'Go from zero to fully automated in days, not months.' },
  { icon: <img src='/icons/partnership.png' alt='partnership' width="50"/>, title: 'Partnership Model', desc: 'We treat every client as a long-term partner, not a one-time project.' },
]

export default function About() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.bg}>
          <div className={styles.orb} />
          <div className={styles.grid} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className="tag">About Velta</div>
            <h1 className={styles.title}>We Build Systems That<br /><span className="gradient-text">Actually Work</span></h1>
            <p className={styles.sub}>Velta is an AI automation company on a mission to make every Indian business efficient, automated, and ready to scale.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.story}>
            <div className={styles.storyLeft}>
              <div className="tag">Our Story</div>
              <h2 className={styles.h2}>Built from Frustration,<br /><span className="gradient-text">Driven by Purpose</span></h2>
              <p>We saw small businesses losing leads because they couldn't respond fast enough. We watched entrepreneurs work 16-hour days doing tasks that could be automated. We experienced the gap between expensive enterprise tools and zero automation for SMBs.</p>
              <p>So we built Velta — a company dedicated to closing that gap.</p>
              <div className={styles.highlights}>
                <div className={styles.hl}><span>2026</span><p>Velta founded</p></div>
                <div className={styles.hl}><span>2+</span><p>Businesses served</p></div>
                <div className={styles.hl}><span>2+</span><p>Industries covered</p></div>
              </div>
            </div>
            <div className={styles.storyRight}>
              <div className={styles.visionCard}>
                <div className={styles.vcIcon}><img src='/icons/vision.png' alt='vision' width="40"/></div>
                <h3>Our Vision</h3>
                <p>To make every business in India automated and efficient — regardless of size or budget.</p>
              </div>
              <div className={styles.missionCard}>
                <div className={styles.mcIcon}><img src='/icons/mission.png' alt='mission' width="40"/></div>
                <h3>Our Mission</h3>
                <p>Provide affordable, powerful automation tools that help businesses grow smarter, not harder.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:60}}>
            <div className="tag">Our Values</div>
            <h2 className={styles.h2} style={{marginTop:16}}>What Makes Us<br /><span className="gradient-text">Different</span></h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map(v => (
              <div key={v.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.bandInner}>
            <div>
              <h2>Ready to automate your business?</h2>
              <p>Let's build your custom automation system together.</p>
            </div>
            <a href="/contact" className="btn btn-primary" style={{fontSize:16}}>Talk to Us →</a>
          </div>
        </div>
      </section>
    </div>
  )
}
