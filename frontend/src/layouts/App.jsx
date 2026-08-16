import { useEffect } from 'react'
import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import PageTransition from '../components/Animation/PageTransition.jsx'
import VeltaChat from '../components/VeltaChat/VeltaChat.jsx'


export default function RootLayout() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signin' || location.pathname === '/signup'

  useEffect(() => {
    const preloader = document.getElementById('preloader-overlay')
    if (preloader) {
      // Allow entrance animation to show, then add fade-out and slide-up curtain
      const triggerTimer = setTimeout(() => {
        preloader.classList.add('fade-out')
        const removeTimer = setTimeout(() => preloader.remove(), 650)
        return () => clearTimeout(removeTimer)
      }, 500)
      return () => clearTimeout(triggerTimer)
    }
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        <ScrollRestoration />
        {!isAuthPage && <Navbar />}
        {isAuthPage ? (
          <Outlet />
        ) : (
          <PageTransition>
            <Outlet />
          </PageTransition>
        )}
        {!isAuthPage && <Footer />}
        {!isAuthPage && <VeltaChat />}
      </AuthProvider>
    </ThemeProvider>
  )
}
