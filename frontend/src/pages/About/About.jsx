import React from 'react'
import { Link } from 'react-router-dom'
import { CircularTeam } from '../../components/CircularTeam/CircularTeam'
import { TestimonialMarquee } from '../../components/TestimonialMarquee/TestimonialMarquee'
import styles from './About.module.css'
const teamMembers = [
  {
    name: 'Abhishek Kayat',
    designation: 'Founder & Chief Architect',
    quote: 'We built VeltaZ to solve a fundamental problem: scaling business operations through bespoke software engineering, securing operations, and creating clean high-performance software.',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Dev',
    designation: 'Co-Founder & Technical Lead',
    quote: 'Designing scalable backends and secure private systems. Our focus is to deliver lightning-fast responses and bulletproof integrations that work quietly 24/7.',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Sneha Sharma',
    designation: 'Lead Product Designer',
    quote: 'Ensuring VeltaZ\'s products are not just fast, but beautiful, responsive, and intuitive. We create human-centric interfaces that make complex data clear and accessible.',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80'
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
