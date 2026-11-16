import React, { useEffect, useRef, useState } from 'react'
import styles from './PendulumHero.module.css'

const DEFAULT_SERVICES = [
  'NEED A<br>WEBSITE?',
  'NEED AN<br>APP?',
  'NEED<br>AUTOMATION?',
  'NEED MORE<br>LEADS?',
  'CUSTOM<br>SOFTWARE?'
]

export default function PendulumHero({ services = DEFAULT_SERVICES }) {
  const stageRef = useRef(null)
  const rigRef = useRef(null)
  const tileRef = useRef(null)
  const revealRef = useRef(null)
  const headlineRef = useRef(null)
  const baseMessageRef = useRef(null)

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const stage = stageRef.current
    const rig = rigRef.current
    const tile = tileRef.current
    const reveal = revealRef.current
    const headline = headlineRef.current
    const baseMessage = baseMessageRef.current

    if (!stage || !rig || !tile || !reveal || !headline || !baseMessage) return

    const SWING_MS = 6200
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let elapsed = 0
    let last = 0
    let width = 0
    let height = 0
    let textWidth = 380
    let textHeight = 90
    let deltaYTop = 95
    let deltaYBottom = 185
    let amplitude = 0.85
    let serviceIndex = 0
    let lastHalf = -1
    let animId = null

    const measure = () => {
      if (!stage || !headline) return
      const stageBounds = stage.getBoundingClientRect()
      const box = headline.getBoundingClientRect()

      width = stageBounds.width || 640
      height = stageBounds.height || 380
      textWidth = box.width || 380
      textHeight = box.height || 90

      // Pivot is positioned directly behind the pill center (28px from stage top)
      const pivotY = 28
      const textTop = box.top - stageBounds.top
      deltaYTop = Math.max(35, textTop - pivotY)
      deltaYBottom = Math.max(70, textTop + textHeight - pivotY)

      const length = deltaYBottom + 36
      stage.style.setProperty('--cord-length', `${length}px`)
      
      const reqAngle = Math.atan((textWidth / 2 + 45) / Math.max(30, deltaYTop))
      const isMobile = window.innerWidth <= 640 || width < 520
      if (isMobile) {
        // Controlled, balanced height for mobile viewports (~38-42 degrees)
        amplitude = Math.max(0.66, Math.min(0.74, reqAngle * 0.82))
      } else {
        // High, majestic swing for desktop (~56-59 degrees)
        amplitude = Math.max(0.96, Math.min(1.06, reqAngle))
      }
    }

    const showNext = () => {
      serviceIndex = (serviceIndex + 1) % services.length
      baseMessage.innerHTML = services[serviceIndex]
      setCurrentIndex(serviceIndex)
    }

    const animate = (now) => {
      if (last && !document.hidden) elapsed += Math.min(now - last, 64)
      last = now

      const phase = (elapsed / SWING_MS) * Math.PI * 2
      const angle = amplitude * Math.cos(phase)
      const degrees = (angle * 180) / Math.PI

      rig.style.transform = `rotate(${degrees}deg)`
      tile.style.transform = `rotateY(${Math.sin(phase) * 13}deg) rotateX(${3 + Math.cos(phase) * 2}deg)`

      const topX = textWidth / 2 - deltaYTop * Math.tan(angle)
      const bottomX = textWidth / 2 - deltaYBottom * Math.tan(angle)
      const a = Math.max(0, Math.min(textWidth, topX))
      const b = Math.max(0, Math.min(textWidth, bottomX))
      reveal.style.clipPath = `polygon(0 0, ${a}px 0, ${b}px 100%, 0 100%)`
      baseMessage.style.clipPath = `polygon(${a}px 0, 100% 0, 100% 100%, ${b}px 100%)`

      const cosPhase = Math.cos(phase)
      if (cosPhase < -0.985 && lastHalf !== 1) {
        lastHalf = 1
        showNext()
      } else if (cosPhase > 0.985 && lastHalf !== 0) {
        lastHalf = 0
      }

      animId = requestAnimationFrame(animate)
    }

    const start = () => {
      measure()
      if (reduced) {
        rig.style.transform = 'rotate(0deg)'
        return
      }
      last = 0
      animId = requestAnimationFrame(animate)
    }

    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    if (document.fonts) {
      document.fonts.ready.then(measure).catch(() => { })
    }
    start()

    return () => {
      if (animId) cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [services])

  return (
    <div className={styles.wrapper}>
      <main className={styles.stage} ref={stageRef} aria-label="Interactive Pendulum Showcase">
        {/* Pill Container (Solid luxury pill, cord suspended underneath) */}
        <div className={styles.pillContainer}>
          <div className={styles.eyebrowPill}>
            <span>GET IN TOUCH</span>
          </div>

          {/* Swinging Pendulum Rig (Suspended behind pill) */}
          <div className={styles.pendulumRig} ref={rigRef} aria-hidden="true">
            <div className={styles.cord} />
            <div className={styles.bob}>
              <div className={styles.tile} ref={tileRef}>
                <img
                  src="/logo/logo-gold.png"
                  alt="VeltaZ Emblem"
                  className={styles.tileImg}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Headline with Steacode Reveal Architecture */}
        <div className={styles.headline} ref={headlineRef}>
          <div
            className={styles.message}
            ref={baseMessageRef}
            dangerouslySetInnerHTML={{ __html: services[0] }}
          />
          <div className={styles.messageReveal} ref={revealRef} aria-hidden="true">
            <div
              className={`${styles.message} ${styles.messageTalk}`}
              dangerouslySetInnerHTML={{ __html: "LET'S<br>TALK!" }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
