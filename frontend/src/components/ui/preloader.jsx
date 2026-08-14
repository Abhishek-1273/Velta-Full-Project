import { useEffect, useState } from 'react'
import styles from './preloader.module.css'

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    // Start fading out after 800ms
    const fadeTimer = setTimeout(() => setFade(true), 800)
    // Completely unmount after fade transition completes (300ms)
    const removeTimer = setTimeout(() => setVisible(false), 1100)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`${styles.overlay} ${fade ? styles.fadeOut : ''}`}>
      <div className={styles.logoContainer}>
        <img src="/logo/logo-gold.png" alt="VeltaZ Logo" className={styles.logo} />
        <div className={styles.ring} />
      </div>
    </div>
  )
}
