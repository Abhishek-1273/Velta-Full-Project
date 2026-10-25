import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowUpRight } from 'react-icons/bs'
import styles from './CaseStudies.module.css'

export default function CaseStudies() {
  return (
    <div className={styles.page}>
      <div className="container">

        {/* ── 1. HEADER (Matches Reference Screenshot) ── */}
        <div className={styles.headerTopRow}>
          <div>
            <div className={styles.eyebrow}>SELECTED WORK / 2024 — 2026</div>
            <h1 className={styles.title}>
              Work That <br />
              <span className={styles.greenAccent}>Speaks.</span>
            </h1>
            <p className={styles.subText}>
              Ideas, products, and digital experiences built to make an impact.
            </p>
          </div>

          <div className={styles.headerRightPill}>
            <span className={styles.greenPulse} />
            <span>REAL PROJECTS. REAL IMPACT.</span>
          </div>
        </div>

        {/* ── 2. FILTER & COUNTER ROW ── */}
        <div className={styles.filterRow}>
          <div className={styles.metaCount}>
            <span className={styles.countNum}>01</span>
            <span className={styles.countLabel}>SELECTED PROJECTS</span>
          </div>

          <div className={styles.tabList}>
            <button type="button" className={`${styles.tabItem} ${styles.tabItemActive}`}>
              All Projects
            </button>
            <button type="button" className={styles.tabItem}>
              Web & Digital
            </button>
          </div>
        </div>

        {/* ── 3. PROJECT GRID: KIN PROPERTY BOX ── */}
        <div className={styles.grid}>
          <Link
            to="/products/kin-property"
            className={styles.card}
            aria-label="View KIN Property case study"
          >
            {/* Visual Mockup Container */}
            <div className={styles.mockupContainer}>
              <img
                src="https://res.cloudinary.com/dqc1awrnc/image/upload/v1792408084/website-mockup_qnmqqk.png"
                alt="KIN Property Desktop Website Mockup"
                className={styles.mockupImage}
              />
            </div>

            {/* Card Body Info */}
            <div className={styles.cardBody}>
              <div className={styles.cardTitleRow}>
                <div className={styles.titleWithIndex}>
                  <span className={styles.cardIndex}>01</span>
                  <h2 className={styles.cardTitle}>KIN Property</h2>
                </div>
                <div className={styles.arrowCircle}>
                  <BsArrowUpRight size={14} />
                </div>
              </div>

              <p className={styles.cardDesc}>
                A bespoke property management and interactive lead capture portal engineered for modern real estate operations.
              </p>

              <div className={styles.tagsRow}>
                <span className={styles.tagPill}>Web Platform</span>
                <span className={styles.tagPill}>Real Estate</span>
                <span className={styles.tagPill}>Lead Engine</span>
              </div>
            </div>
          </Link>
        </div>

        {/* ── 4. WHAT'S NEXT SECTION (Matches Reference Screenshot) ── */}
        <div className={styles.whatsNextBanner}>
          <div className={styles.whatsNextLeft}>
            <span className={styles.whatsNextEyebrow}>WHAT'S NEXT</span>
            <h3 className={styles.whatsNextTitle}>
              More projects coming <span className={styles.whatsNextGreen}>soon.</span>
              <BsArrowUpRight size={16} style={{ color: '#22c55e', marginLeft: '4px' }} />
            </h3>
          </div>

          <div className={styles.whatsNextRight}>
            NEW IDEAS.<br />
            BIGGER IMPACT.<br />
            STAY TUNED.
          </div>
        </div>

      </div>
    </div>
  )
}
