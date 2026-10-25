import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './CoverflowCarousel.module.css'

const useIsoLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export function CoverflowCarousel({
  slides,
  rotate = 40,
  depth = 0.5,
  perspective = 3.5,
  falloff = 0.6,
  fade = 0.12,
  cardWidth = 'clamp(150px, 22vw, 240px)',
  gap = 0.08,
  loop = true,
  showCaption = true,
  showPagination = true,
  showNavigation = true,
  label = 'Cover carousel',
}) {
  const count = slides.length

  const frameRef = useRef(null)
  const cardRefs = useRef([])
  const posRef = useRef(0)
  const targetRef = useRef(0)
  const widthRef = useRef(0)
  const rafRef = useRef(null)
  const dragRef = useRef(null)
  const resumeTimerRef = useRef(null)

  const [selected, setSelected] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Pause autoplay for 1 minute (60,000 ms) whenever user interacts
  const pauseAutoPlay = useCallback((durationMs = 60000) => {
    setIsPaused(true)
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current)
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, durationMs)
  }, [])

  const indexAt = useCallback(
    (pos) => ((Math.round(pos) % count) + count) % count,
    [count]
  )

  const paint = useCallback(() => {
    const width = widthRef.current
    if (!width) return
    const pitch = width * (1 + gap)
    const pos = posRef.current

    cardRefs.current.forEach((card, index) => {
      if (!card) return

      let offset = index - pos
      if (loop) {
        offset = ((offset % count) + count) % count
        if (offset > count / 2) offset -= count
      }

      const distance = Math.abs(offset)
      const ramp = Math.pow(distance, falloff)
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset)

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`

      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge)
      card.style.zIndex = String(100 - Math.round(distance))
    })
  }, [count, depth, fade, falloff, gap, loop, rotate])

  const settle = useCallback(
    (target) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      targetRef.current = target
      setSelected(indexAt(target))

      const step = () => {
        const diff = targetRef.current - posRef.current
        if (Math.abs(diff) < 0.002) {
          posRef.current = targetRef.current
          paint()
          rafRef.current = null
          return
        }
        posRef.current += diff * 0.15
        paint()
        rafRef.current = requestAnimationFrame(step)
      }
      rafRef.current = requestAnimationFrame(step)
    },
    [indexAt, paint]
  )

  const nudge = useCallback(
    (delta, pauseMs = 60000) => {
      pauseAutoPlay(pauseMs)
      settle(Math.round(posRef.current) + delta)
    },
    [pauseAutoPlay, settle]
  )

  const goTo = useCallback(
    (index, pauseMs = 60000) => {
      pauseAutoPlay(pauseMs)
      let offset = index - indexAt(posRef.current)
      if (loop) {
        if (offset > count / 2) offset -= count
        else if (offset < -count / 2) offset += count
      }
      settle(posRef.current + offset)
    },
    [count, indexAt, loop, pauseAutoPlay, settle]
  )

  const onPointerDown = (e) => {
    pauseAutoPlay(60000)
    dragRef.current = {
      startX: e.clientX,
      startPos: posRef.current,
      pointerId: e.pointerId,
    }
    if (frameRef.current) {
      frameRef.current.setPointerCapture(e.pointerId)
    }
  }

  const onPointerMove = (e) => {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return
    const width = widthRef.current || 200
    const deltaX = e.clientX - dragRef.current.startX
    posRef.current = dragRef.current.startPos - (deltaX / width) * 0.8
    paint()
  }

  const endDrag = (e) => {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return
    if (frameRef.current && frameRef.current.hasPointerCapture(e.pointerId)) {
      frameRef.current.releasePointerCapture(e.pointerId)
    }
    dragRef.current = null
    settle(Math.round(posRef.current))
  }

  useIsoLayoutEffect(() => {
    const updateWidth = () => {
      if (cardRefs.current[0]) {
        widthRef.current = cardRefs.current[0].offsetWidth
        paint()
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [paint])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      nudge(1, 0)
    }, 4500)
    return () => clearInterval(interval)
  }, [isPaused, nudge])

  const active = slides[selected]

  return (
    <div
      className={styles.carouselRoot}
      style={{ ['--cf-card']: cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {/* CENTERED CAROUSEL DECK */}
      <div className={styles.carouselContainer}>
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              nudge(-1, 60000)
            } else if (event.key === 'ArrowRight') {
              event.preventDefault()
              nudge(1, 60000)
            }
          }}
          className={styles.grabFrame}
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
          }}
        >
          <div
            className={styles.cardContainer}
            style={{
              height: 'var(--cf-card)',
              transformStyle: 'preserve-3d',
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                data-index={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className={`${styles.card} ${index === selected ? styles.cardActive : ''}`}
                style={{ width: 'var(--cf-card)', cursor: 'pointer' }}
                onClick={() => goTo(index, 60000)}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  className={styles.cardImg}
                />
              </div>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => nudge(-1, 60000)}
              className={`${styles.arrowBtn} ${styles.prevBtn}`}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => nudge(1, 60000)}
              className={`${styles.arrowBtn} ${styles.nextBtn}`}
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {(showCaption || showPagination) && (
        <div
          className={styles.infoWrapper}
          onClick={() => pauseAutoPlay(60000)}
          onMouseEnter={() => pauseAutoPlay(60000)}
        >
          <div className={styles.detailsRow}>
            {/* LEFT: TITLE, SUBTITLE & FEATURE TAGS */}
            {active && (
              <div className={styles.textCol}>
                <div key={selected} className={styles.caption}>
                  {active.title && (
                    <h3 className={styles.captionTitle}>
                      {active.title}
                    </h3>
                  )}
                  {active.subtitle && (
                    <p className={styles.captionSubtitle}>
                      {active.subtitle}
                    </p>
                  )}
                  {active.features && active.features.length > 0 && (
                    <div className={styles.tagList}>
                      {active.features.map((feature, i) => (
                        <span key={i} className={styles.featureTag}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* RIGHT: SPECS / METADATA CARD */}
            {active?.meta && active.meta.length > 0 && (
              <div className={styles.cardCol}>
                <dl className={styles.metaList}>
                  {active.meta.map((row) => (
                    <div key={row.label} className={styles.metaRow}>
                      <dt className={styles.metaLabel}>{row.label}</dt>
                      <dd className={styles.metaValue}>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {showPagination && (
            <div className={styles.pagination}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === selected}
                  onClick={() => goTo(index, 60000)}
                  className={`${styles.dot} ${index === selected ? styles.activeDot : ''}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
