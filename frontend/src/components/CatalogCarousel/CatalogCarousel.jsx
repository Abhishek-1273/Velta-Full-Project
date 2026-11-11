import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styles from './CatalogCarousel.module.css'

export default function CatalogCarousel({ services, activeCategory, onServiceChange }) {
  const [activeIndex, setActiveIndex] = useState(2) // Default center (Custom Software)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const resumeTimerRef = useRef(null)
  const startXRef = useRef(0)
  const dragOffsetRef = useRef(0)
  const didDragRef = useRef(false)

  const isFiltered = activeCategory && activeCategory !== 'all'

  // Filter services based on activeCategory
  const displayedServices = useMemo(() => {
    if (!isFiltered) {
      return services
    }
    return services.filter((s) => s.category === activeCategory)
  }, [services, activeCategory, isFiltered])

  const count = displayedServices.length

  // When activeCategory changes:
  // Reset activeIndex (index 2 for 'all', 0 for filtered)
  useEffect(() => {
    if (activeCategory === 'all') {
      setActiveIndex(2)
    } else {
      setActiveIndex(0)
    }
    setDragOffset(0)
  }, [activeCategory])

  // Quick 4-second pause so autoplay resumes promptly after user stops interacting
  const pauseAutoPlay = useCallback((durationMs = 4000) => {
    setIsPaused(true)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, durationMs)
  }, [])

  const goTo = useCallback((idx, pauseMs = 4000) => {
    pauseAutoPlay(pauseMs)
    if (count <= 0) return
    const normalized = ((idx % count) + count) % count
    setActiveIndex(normalized)
    onServiceChange?.(normalized)
  }, [count, onServiceChange, pauseAutoPlay])

  const next = useCallback(() => {
    if (count > 1) goTo(activeIndex + 1)
  }, [activeIndex, count, goTo])

  const prev = useCallback(() => {
    if (count > 1) goTo(activeIndex - 1)
  }, [activeIndex, count, goTo])

  // Continuous Autoplay - ONLY ACTIVE ON 'All Services'
  useEffect(() => {
    if (isFiltered || isPaused || isDragging || count <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((curr) => (curr + 1) % count)
    }, 4200)

    return () => clearInterval(interval)
  }, [count, isPaused, isDragging, isFiltered])

  // Mobile Touch Gestures with Live Drag Follow
  const handleTouchStart = (e) => {
    if (count <= 1) return
    pauseAutoPlay(5000)
    startXRef.current = e.touches[0].clientX
    dragOffsetRef.current = 0
    didDragRef.current = false
    setIsDragging(true)
  }

  const handleTouchMove = (e) => {
    if (count <= 1) return
    const delta = e.touches[0].clientX - startXRef.current
    dragOffsetRef.current = delta
    if (Math.abs(delta) > 8) {
      didDragRef.current = true
    }
    setDragOffset(delta * 0.75)
  }

  const handleTouchEnd = () => {
    if (count <= 1) return
    const delta = dragOffsetRef.current
    setIsDragging(false)
    setDragOffset(0)

    if (Math.abs(delta) > 35) {
      if (delta < 0) next()
      else prev()
    }

    setTimeout(() => {
      didDragRef.current = false
    }, 100)
  }

  // Desktop Mouse Drag with Live Drag Follow
  const handleMouseDown = (e) => {
    if (count <= 1 || e.button !== 0) return
    pauseAutoPlay(5000)
    startXRef.current = e.clientX
    dragOffsetRef.current = 0
    didDragRef.current = false
    setIsDragging(true)

    const handleMouseMove = (moveEvent) => {
      const delta = moveEvent.clientX - startXRef.current
      dragOffsetRef.current = delta
      if (Math.abs(delta) > 8) {
        didDragRef.current = true
      }
      setDragOffset(delta * 0.75)
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)

      const delta = dragOffsetRef.current
      setIsDragging(false)
      setDragOffset(0)

      if (Math.abs(delta) > 35) {
        if (delta < 0) next()
        else prev()
      }

      setTimeout(() => {
        didDragRef.current = false
      }, 100)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className={styles.catalogWrapper}>
      {isFiltered ? (
        /* Filtered View: Centered Cards in Middle (1 or 2 cards seamlessly centered) */
        <div className={styles.filteredGrid}>
          {displayedServices.map((service, index) => {
            const isSelected = index === activeIndex || displayedServices.length === 1
            return (
              <div
                key={service.id || index}
                className={`${styles.filteredCard} ${isSelected ? styles.filteredCardActive : ''}`}
                onClick={() => setActiveIndex(index)}
                role="group"
                aria-label={service.title}
              >
                <div className={styles.cardImageContainer}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className={styles.cardImage}
                    draggable={false}
                  />
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.desc}</p>
                  <Link
                    to={service.link || '/contact'}
                    className={styles.cardExplore}
                  >
                    <span>Explore</span>
                    <span className={styles.exploreArrow}>→</span>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* All Services View: 5-Card Centered Carousel with Live Drag & Auto-Rotation */
        <>
          <div 
            className={styles.carouselContainer}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            <div 
              className={styles.cardsTrack}
              style={{
                transform: `translateX(${dragOffset}px)`,
                transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.35, 1)',
              }}
            >
              {displayedServices.map((service, index) => {
                let offset = index - activeIndex
                if (count > 2) {
                  if (offset > count / 2) offset -= count
                  if (offset < -count / 2) offset += count
                }

                const isCenter = offset === 0
                const isNearLeft = offset === -1
                const isNearRight = offset === 1
                const isFarLeft = offset === -2
                const isFarRight = offset === 2

                let cardStateClass = styles.cardHidden
                if (isCenter) cardStateClass = styles.cardCenter
                else if (isNearLeft) cardStateClass = styles.cardNearLeft
                else if (isNearRight) cardStateClass = styles.cardNearRight
                else if (isFarLeft) cardStateClass = styles.cardFarLeft
                else if (isFarRight) cardStateClass = styles.cardFarRight

                return (
                  <div
                    key={service.id || index}
                    className={`${styles.card} ${cardStateClass}`}
                    onClick={(e) => {
                      if (didDragRef.current) {
                        e.preventDefault()
                        e.stopPropagation()
                        return
                      }
                      goTo(index)
                    }}
                    role="group"
                    aria-label={service.title}
                  >
                    <div className={styles.cardImageContainer}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className={styles.cardImage}
                        draggable={false}
                      />
                    </div>

                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{service.title}</h3>
                      <p className={styles.cardDesc}>{service.desc}</p>
                      <Link
                        to={service.link || '/contact'}
                        className={styles.cardExplore}
                        onClick={(e) => {
                          if (didDragRef.current || !isCenter) {
                            e.preventDefault()
                            if (!didDragRef.current) goTo(index)
                          }
                        }}
                      >
                        <span>Explore</span>
                        <span className={styles.exploreArrow}>→</span>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pagination Dots (Only for All Services) */}
          <div className={styles.pagination}>
            {services.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to service ${index + 1}`}
                className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
