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
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = 'clamp(148px, 22vw, 260px)',
  gap = 0.05,
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

  const [selected, setSelected] = useState(0)

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
    });
  }, [count, depth, fade, falloff, gap, loop, rotate])

  const settle = useCallback(
    (target) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      targetRef.current = target
      setSelected(indexAt(target))

      const step = () => {
        const remaining = target - posRef.current
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target
          paint()
          rafRef.current = null
          return
        }
        posRef.current += remaining * 0.16
        paint()
        rafRef.current = requestAnimationFrame(step)
      }
      rafRef.current = requestAnimationFrame(step)
    },
    [indexAt, paint]
  )

  const clamp = useCallback(
    (pos) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop]
  )

  const goTo = useCallback(
    (index) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index
      settle(clamp(target))
    },
    [clamp, count, loop, settle]
  )

  const nudge = useCallback(
    (by) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle]
  )

  const onPointerDown = (event) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    targetRef.current = posRef.current
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    }
  }

  const onPointerMove = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return

    const pitch = widthRef.current * (1 + gap)
    if (!pitch) return

    const now = performance.now()
    const previous = posRef.current
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch)
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000
    drag.t = now

    const index = indexAt(posRef.current)
    if (index !== selected) setSelected(index)
    paint()
  }

  const endDrag = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    dragRef.current = null
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18))
    settle(clamp(Math.round(posRef.current + carried)))
  }

  useIsoLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const measure = () => {
      const card = cardRefs.current[0]
      if (!card) return
      widthRef.current = card.offsetWidth
      paint()
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [paint])

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    },
    []
  )

  const [isHovered, setIsHovered] = useState(false)

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      nudge(1)
    }, 3200)
    return () => clearInterval(interval)
  }, [nudge, isHovered])

  const active = slides[selected]

  return (
    <div
      className={styles.carouselRoot}
      style={{ ['--cf-card']: cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
              nudge(-1)
            } else if (event.key === 'ArrowRight') {
              event.preventDefault()
              nudge(1)
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
              height: 'calc(var(--cf-card) * 4 / 3)',
              transformStyle: 'preserve-3d',
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className={`${styles.card} ${index === selected ? styles.cardActive : ''}`}
                style={{ width: 'var(--cf-card)' }}
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
              onClick={() => nudge(-1)}
              className={`${styles.arrowBtn} ${styles.prevBtn}`}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => nudge(1)}
              className={`${styles.arrowBtn} ${styles.nextBtn}`}
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {(showCaption || showPagination) && (
        <div className={styles.infoWrapper}>
          
          <div className={styles.detailsRow}>
            {/* LEFT: DEFINITION TEXT */}
            {active?.title && (
              <div className={styles.textCol}>
                <div key={selected} className={styles.caption}>
                  <h3 className={styles.captionTitle}>
                    {active.title}
                  </h3>
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

            {/* RIGHT: SPECS CARD */}
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
                  onClick={() => goTo(index)}
                  className={`${styles.dot} ${index === selected ? styles.activeDot : ''}`}
                />
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
