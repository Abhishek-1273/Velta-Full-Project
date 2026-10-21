import { useEffect } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import PageTransition from '../components/Animation/PageTransition.jsx'
import VeltaChat from '../components/VeltaChat/VeltaChat.jsx'

export default function RootLayout() {
  useEffect(() => {
    const preloader = document.getElementById('preloader-overlay')
    if (preloader) {
      let removeTimer
      // Allow entrance animation to show, then add fade-out and slide-up curtain
      const triggerTimer = setTimeout(() => {
        preloader.classList.add('fade-out')
        removeTimer = setTimeout(() => {
          if (preloader.parentNode) {
            preloader.remove()
          }
        }, 650)
      }, 500)
      return () => {
        clearTimeout(triggerTimer)
        if (removeTimer) clearTimeout(removeTimer)
      }
    }
  }, [])

  return (
    <ThemeProvider>
      <ScrollRestoration />
      <Navbar />
      <PageTransition>
        <Outlet />
      </PageTransition>
      <Footer />
      <VeltaChat />
    </ThemeProvider>
  )
}
