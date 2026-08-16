import React from 'react'
import { Link } from 'react-router-dom'
import { CircularTeam } from '../../components/CircularTeam/CircularTeam'
import { TestimonialMarquee } from '../../components/TestimonialMarquee/TestimonialMarquee'
import styles from './About.module.css'
const teamMembers = [
  {
    name: 'Dhruv',
    designation: 'Co-Founder & CEO',
    quote: 'VeltaZ was born to make operations seamless. I lead our business growth, marketing, and client communications, ensuring that the custom software ecosystems we build align perfectly with our clients\' real-world scaling goals.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786874509/Dhruv_wcdpti.png'
  },
  {
    name: 'Arman',
    designation: 'Co-Founder & CTO',
    quote: 'We architect bulletproof technology. My focus is engineering ultra-secure backend infrastructures, custom APIs, and high-performance databases that handle heavy operational loads silently and reliably.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786874508/Arman_b46q6r.png'
  },
  {
    name: 'Abhishek',
    designation: 'Co-Founder & CPO',
    quote: 'I am obsessed with product perfection. From high-fidelity user flows to custom product design, I bridge backend functionality with premium UX, ensuring every system we build looks stunning and works flawlessly.',
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786874508/Abhishek_rpscb3.png'
  }
]

export default function About() {
  return (
    <div className={styles.page}>
      
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.bg}>
          <div className={styles.grid} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="tag">About VeltaZ</span>
            <h1 className={styles.title}>
              Building the Infrastructure<br />
              Behind Smarter Businesses.
            </h1>
            <p className={styles.sub}>
              We believe technology should power proprietary operational ecosystems, letting teams focus their energy on high-value scaling.
            </p>
          </div>
        </div>
      </section>
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          {/* Header */}
          <div className={styles.aboutGridHeader}>
            <h2>Who We Are? <br /> Why We Exist?</h2>
            <p>
              VeltaZ is a bespoke technology agency. We engineer custom private software applications and proprietary systems that run your business operations securely and efficiently.
            </p>
          </div>
          {/* Grid Showcase */}
          <div className={styles.aboutShowcase}>
            <div className={styles.mainShowcaseWrapper}>
              <img
                src="/logo/logo-black.png"
                alt="VeltaZ Emblem"
                className={styles.mainShowcaseImage}
              />
            </div>
            
            <div className={styles.sideShowcaseCol}>
              <div className={styles.breakoutCard}>
                <img
                  src="/logo/logo-white.png"
                  alt="VeltaZ Logo White"
                  className={styles.breakoutIcon}
                />
                <div style={{ marginBottom: '16px' }}>
                  <h3 className={styles.breakoutTitle}>Custom Software Engineering</h3>
                  <p className={styles.breakoutDesc}>
                    Providing organizations with proprietary, custom-built application ecosystems that secure data, optimize operations, and scale seamlessly.
                  </p>
                </div>
                <Link to="/products" className={styles.breakoutButton}>
                  Explore Products
                </Link>
              </div>
              <div className={styles.secondaryImageWrapper}>
                <img
                  src="/logo/logo-black.png"
                  alt="VeltaZ Emblem"
                  className={styles.secondaryShowcaseImage}
                />
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* CORE TEAM SHOWCASE */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="tag">Team Members</span>
            <h2 className={styles.sectionTitle}>The Minds Behind VeltaZ</h2>
            <p className={styles.sectionSub}>Meet the founders and architects building next-generation operational systems.</p>
          </div>
          <CircularTeam members={teamMembers} />
        </div>
      </section>
      {/* TESTIMONIALS */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', overflow: 'hidden' }}>
        <div className="container">
          <div className={styles.sectionHeader} style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="tag">Client Reviews</span>
            <h2>Loved by Modern Businesses</h2>
            <p>See how companies are streamlining operations, saving hours, and scaling workflows with VeltaZ.</p>
          </div>
        </div>
        <TestimonialMarquee />
      </section>

      {/* CORE PHILOSOPHY VISION */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div className={styles.visionBox}>
            <span className="tag">Company Vision</span>
            <h2>Businesses shouldn't spend their time managing repetitive work.</h2>
            
            <div className={styles.philosophyList}>
              <div className={styles.phiItem}>
                <span className={styles.phiHeader}>Technology should remove friction</span>
                <p>Systems must solve practical problems without adding layers of technical debt or confusing configuration steps.</p>
              </div>
              <div className={styles.phiItem}>
                <span className={styles.phiHeader}>Automation should be accessible</span>
                <p>High-end workflow automation should not be restricted to large corporations with multi-million budgets.</p>
              </div>
              <div className={styles.phiItem}>
                <span className={styles.phiHeader}>AI should solve real business problems</span>
                <p>We build context-aware systems focused on quantifiable outcomes, not speculative hype or buzzwords.</p>
              </div>
              <div className={styles.phiItem}>
                <span className={styles.phiHeader}>Software should work quietly in the background</span>
                <p>The best tools operate silently, ensuring data flows correctly and events trigger without manual intervention.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
