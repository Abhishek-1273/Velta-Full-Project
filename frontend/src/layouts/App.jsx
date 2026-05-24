import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import PageTransition from '../components/Animation/PageTransition.jsx'
import VeltaChat from '../components/VeltaChat/VeltaChat.jsx'

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ScrollRestoration />
        <Navbar />
        <PageTransition>
          <Outlet />
        </PageTransition>
        <Footer />
        <VeltaChat />
      </AuthProvider>
    </ThemeProvider>
  )
}
