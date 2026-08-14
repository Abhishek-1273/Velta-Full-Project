import React, { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./CircularTeam.module.css"

// Custom inline SVG icons for navigation
const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
)

function calculateGap(width) {
  const minWidth = 1024
  const maxWidth = 1456
  const minGap = 65
  const maxGap = 90
  if (width <= minWidth) return minGap
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06 * (width - maxWidth))
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
}

export function CircularTeam({ members, autoplay = true }) {
  // State
  const [activeIndex, setActiveIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(1200)

  const imageContainerRef = useRef(null)
  const autoplayIntervalRef = useRef(null)

  const membersLength = useMemo(() => members.length, [members])
  const activeMember = useMemo(() => members[activeIndex], [activeIndex, members])

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % membersLength)
      }, 5000)
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
    }
  }, [autoplay, membersLength])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [activeIndex, membersLength])

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % membersLength)
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
  }, [membersLength])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + membersLength) % membersLength)
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
  }, [membersLength])

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index) {
    const gap = calculateGap(containerWidth)
    const maxStickUp = gap * 0.7
    const offset = (index - activeIndex + membersLength) % membersLength
    const isActive = index === activeIndex
    const isLeft = (activeIndex - 1 + membersLength) % membersLength === index
    const isRight = (activeIndex + 1) % membersLength === index
    
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      }
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.5,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      }
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.5,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      }
    }
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `scale(0.5)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    }
  }

  // Framer Motion variants for text content
  const contentVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Images */}
        <div className={styles.imageCol} ref={imageContainerRef}>
          {members.map((member, index) => (
            <img
              key={member.name}
              src={member.src}
              alt={member.name}
              className={styles.teamImage}
              style={getImageStyle(index)}
            />
          ))}
        </div>
        
        {/* Content */}
        <div className={styles.contentCol}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <h3 className={styles.name}>
                {activeMember.name}
              </h3>
              <p className={styles.designation}>
                {activeMember.designation}
              </p>
              
              <motion.p className={styles.quote}>
                {activeMember.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(6px)", opacity: 0, y: 4 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * i,
                    }}
                    className={styles.word}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          
          <div className={styles.navigation}>
            <button
              className={styles.navButton}
              onClick={handlePrev}
              aria-label="Previous member"
            >
              <ArrowLeftIcon />
            </button>
            <button
              className={styles.navButton}
              onClick={handleNext}
              aria-label="Next member"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
