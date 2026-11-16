import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowUpRight } from 'react-icons/bs'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './CaseStudies.module.css'

const FILTER_TABS = [
  {
    id: 'all',
    label: 'All Projects',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'web',
    label: 'Web Platforms',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: 'automation',
    label: 'Automation & AI',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: 'software',
    label: 'Custom Software',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'product',
    label: 'Product Design',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
]

const PROJECTS = [
  {
    id: 'kin-property',
    title: 'KIN Property',
    desc: 'A modern property management platform with seamless lead capture.',
    category: 'Web Platform',
    categoryIcon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    filterTags: ['all', 'web', 'product'],
    image: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958347/kin-study_tl8ukk.png',
    link: '/kin-property',
    actionText: 'View Case Study',
    isLive: true,
  },
  {
    id: 'whatsflow',
    title: 'WhatsFlow',
    desc: 'Enterprise WhatsApp marketing, broadcast campaigns & automation OS.',
    category: 'Automation & AI',
    categoryIcon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    filterTags: ['all', 'automation', 'product'],
    image: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958348/whatsflow-study_lilmil.png',
    link: '/whatsflow',
    actionText: 'Explore WhatsFlow',
    isLive: true,
  },
  {
    id: 'docket14',
    title: 'Docket14',
    desc: 'Bespoke legal practice management, client docketing & compliance CRM.',
    category: 'Custom Software',
    categoryIcon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    filterTags: ['all', 'software', 'product'],
    image: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1793958347/docket-study_rcpqcm.png',
    link: '/docket14',
    actionText: 'Explore Docket14',
    isLive: true,
  },
]

function DraggableSparkle({ size = 22, style, rotate = 0 }) {
  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragElastic={0.8}
      dragTransition={{ bounceStiffness: 450, bounceDamping: 22 }}
      whileHover={{ scale: 1.35, rotate: rotate + 25, cursor: 'grab' }}
      whileDrag={{ scale: 1.6, cursor: 'grabbing' }}
      className={styles.draggableStar}
      style={{ ...style, transform: `rotate(${rotate}deg)` }}
      title="Drag me!"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={styles.starSvg}
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    </motion.div>
  )
}

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return PROJECTS
    return PROJECTS.filter((p) => p.filterTags.includes(activeFilter))
  }, [activeFilter])

  return (
    <div className={styles.page}>
      {/* Soft Ambient Glow in Top-Right */}
      <div className={styles.ambientGlow} />

      <div className="container">
        {/* ── 1. HERO SECTION ── */}
        <section className={styles.heroSection}>
          <div className={styles.heroLeft}>
            <div className={styles.eyebrowBadge}>
              <span className={styles.eyebrowDot} />
              <span>Our Work</span>
            </div>

            <h1 className={styles.title}>
              Case <span className={styles.goldText}>Studies.</span>
            </h1>

            <p className={styles.subText}>
              Real projects. Real impact. Explore how we&apos;ve helped brands grow, innovate, and create meaningful digital experiences.
            </p>
          </div>

          <div className={styles.heroRight}>
            {/* Interactive Draggable Golden Stars (Springs Back on Release) */}
            <DraggableSparkle size={26} rotate={12} style={{ top: -20, right: 16 }} />
            <DraggableSparkle size={18} rotate={-18} style={{ top: -28, left: -14 }} />
            <DraggableSparkle size={22} rotate={25} style={{ bottom: -20, left: 32 }} />
            <DraggableSparkle size={16} rotate={-10} style={{ top: '48%', right: -24 }} />

            {/* Floating Glass Impact Badge */}
            <div className={styles.floatingImpactCard}>
              <div className={styles.impactArrowCircle}>
                <BsArrowUpRight size={13} />
              </div>
              <p className={styles.impactText}>
                Turning ideas<br />
                into measurable results.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. FILTER TABS ROW ── */}
        <section className={styles.filterSection}>
          <div className={styles.tabList}>
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                >
                  <span className={styles.tabIcon}>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {isActive && <span className={styles.activeDot}>•</span>}
                </button>
              )
            })}
          </div>
        </section>

        {/* ── 3. 3-COLUMN PROJECT GRID ── */}
        <section className={styles.gridSection}>
          <AnimatePresence mode="popLayout">
            <motion.div layout className={styles.projectGrid}>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 16 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.card}
                >
                  {/* Visual Image Header */}
                  <Link to={project.link} className={styles.cardImageWrap}>
                    <img
                      src={project.image}
                      alt={`${project.title} Preview`}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    <div className={styles.cardArrowCircle} aria-hidden="true">
                      <BsArrowUpRight size={13} />
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className={styles.cardBody}>
                    <Link to={project.link} className={styles.cardTitleLink}>
                      <h2 className={styles.cardTitle}>{project.title}</h2>
                    </Link>
                    <p className={styles.cardDesc}>{project.desc}</p>

                    {/* Card Meta / Action */}
                    <div className={styles.cardFooter}>
                      <div className={styles.categoryWrap}>
                        <span className={styles.categoryIcon}>{project.categoryIcon}</span>
                        <span className={styles.categoryText}>{project.category}</span>
                      </div>

                      <Link to={project.link} className={styles.viewCaseLink}>
                        <span>{project.actionText}</span>
                        <span className={styles.linkArrow}>→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ── 4. BOTTOM ACTION ROW ── */}
        <section className={styles.bottomSection}>
          <div className={styles.bottomActionWrap}>
            <Link to="/contact" className={styles.bottomPillBtn}>
              <span>Explore More Projects</span>
              <span className={styles.bottomBtnArrow}>→</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
