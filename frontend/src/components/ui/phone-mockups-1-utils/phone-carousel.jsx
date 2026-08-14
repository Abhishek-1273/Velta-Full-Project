import React, { useState, useEffect, useRef } from 'react'
import styles from './phone-carousel.module.css'

export default function PhoneCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const autoRef = useRef(null)
  const activeScrollRef = useRef(null)
  const n = images.length

  const startAuto = () => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % n)
    }, 3500)
  }

  // Auto-rotate effect controlled by hover status
  useEffect(() => {
    if (isHovered) {
      clearInterval(autoRef.current)
    } else {
      startAuto()
    }
    return () => clearInterval(autoRef.current)
  }, [isHovered, activeIndex])

  // Prevent parent window scroll when scrolling the active mobile screenshot
  useEffect(() => {
    const el = activeScrollRef.current
    if (!el) return

    const handleWheel = (e) => {
      // Scroll the phone image div container manually
      el.scrollTop += e.deltaY
      // Block the parent website window scroll
      e.preventDefault()
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', handleWheel)
    }
  }, [activeIndex])

  const goTo = (i) => {
    setActiveIndex(i)
    setIsHovered(false)
  }

  const prev = () => goTo((activeIndex - 1 + n) % n)
  const next = () => goTo((activeIndex + 1) % n)

  const getSlot = (i) => {
    const diff = (i - activeIndex + n) % n
    if (diff === 0) return 'center'
    if (diff === 1) return 'right'
    if (diff === n - 1) return 'left'
    return 'hidden'
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.phonesLayout}>
        {images.map((img, i) => {
          const slot = getSlot(i)
          const isCenter = slot === 'center'
          return (
            <div 
              key={i} 
              className={`${styles.phoneWrapper} ${styles[slot]}`}
              onMouseEnter={() => isCenter && setIsHovered(true)}
              onMouseLeave={() => isCenter && setIsHovered(false)}
            >
              {/* ── Samsung S24 Ultra Frame ── */}
              <div className={styles.s24UltraFrame}>

                {/* Flat titanium side buttons */}
                <div className={`${styles.btn} ${styles.volUp}`} />
                <div className={`${styles.btn} ${styles.volDown}`} />
                <div className={`${styles.btn} ${styles.power}`} />

                {/* Screen glass */}
                <div className={styles.screenGlass}>

                  {/* Punch-hole camera */}
                  <div className={styles.punchHole} />

                  {/* Scrollable screen area — only scrollable when center */}
                  <div
                    ref={isCenter ? activeScrollRef : null}
                    className={styles.screenScroll}
                    style={{ overflowY: isCenter ? 'auto' : 'hidden' }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={styles.screenImg}
                      draggable={false}
                    />
                  </div>

                  {/* Home gesture bar */}
                  <div className={styles.homeBar} />
                </div>
              </div>

            </div>
          )
        })}

        {/* ── Dot indicators + arrows ── */}
        <div className={styles.controls}>
          <button className={styles.arrowBtn} onClick={prev} aria-label="Previous">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={styles.dotsRow}>
            {images.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button className={styles.arrowBtn} onClick={next} aria-label="Next">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}
