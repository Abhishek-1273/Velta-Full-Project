import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('velta-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('velta-theme', theme)
  }, [theme])

  const toggle = (event) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    // Check if View Transitions API is supported and motion is not reduced
    const isAppearanceTransition =
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isAppearanceTransition) {
      setTheme(nextTheme)
      return
    }

    // Origin coordinates for the expanding circular ripple (click or button center)
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    if (event?.clientX !== undefined && event?.clientY !== undefined && (event.clientX !== 0 || event.clientY !== 0)) {
      x = event.clientX
      y = event.clientY
    } else if (event?.currentTarget && typeof event.currentTarget.getBoundingClientRect === 'function') {
      const rect = event.currentTarget.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme)
      document.documentElement.setAttribute('data-theme', nextTheme)
      localStorage.setItem('velta-theme', nextTheme)
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ]

      document.documentElement.animate(
        {
          clipPath: clipPath
        },
        {
          duration: 550,
          easing: 'cubic-bezier(0.2, 0, 0, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      )
    }).catch(() => {
      setTheme(nextTheme)
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
