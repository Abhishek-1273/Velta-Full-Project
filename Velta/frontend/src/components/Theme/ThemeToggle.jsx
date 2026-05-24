import { useTheme } from '../../context/ThemeContext'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <div className={`${styles.track} ${isDark ? styles.dark : styles.light}`}>

        <span className={`${styles.icon} ${styles.moon}`}>🌙</span>
        <span className={`${styles.icon} ${styles.sun}`}>☀️</span>

        <div className={styles.thumb} />

      </div>
    </button>
  )
}
