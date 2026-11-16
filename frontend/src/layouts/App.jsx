import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import PageTransition from '../components/Animation/PageTransition.jsx'
import VeltaChat from '../components/VeltaChat/VeltaChat.jsx'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop.jsx'

// Route-Level SEO & Metadata Registry (Enterprise Standard)
const ROUTE_META = {
  '/': {
    title: 'VeltaZ – Custom Software & Intelligent Automations',
    description: 'Engineering high-performance web platforms, custom mobile applications, SEO, and intelligent automation systems for modern businesses.',
  },
  '/services': {
    title: 'Services | Custom Software, Web, Mobile & AI Automations | VeltaZ',
    description: 'Explore VeltaZ engineering services: full-stack web platforms, mobile apps, marketing automation, SEO, and AI solutions.',
  },
  '/case-studies': {
    title: 'Case Studies & Client Work | VeltaZ',
    description: 'Discover how VeltaZ engineers high-impact software, mobile products, and workflow automation systems for modern companies.',
  },
  '/contact': {
    title: 'Contact VeltaZ | Discuss Your Project & Get In Touch',
    description: 'Get in touch with VeltaZ engineers to discuss software development, web applications, or custom automation systems.',
  },
  '/about': {
    title: 'About VeltaZ | Business Growth & Digital Systems',
    description: 'Learn about VeltaZ — an engineering studio dedicated to crafting high-performance digital systems, web apps, and business automations.',
  },
  '/kin-property': {
    title: 'Kin Property Management Platform | Case Study | VeltaZ',
    description: 'End-to-end multi-tenant property management platform engineered by VeltaZ for frictionless tenant communications.',
  },
  '/whatsflow': {
    title: 'WhatsFlow CRM & Automation Platform | Case Study | VeltaZ',
    description: 'Enterprise WhatsApp marketing and lead automation suite engineered for high conversion rates by VeltaZ.',
  },
  '/docket14': {
    title: 'Docket14 Legal Management Suite | Case Study | VeltaZ',
    description: 'Cloud case management and compliance platform engineered for legal practitioners by VeltaZ.',
  },
  '/website-development': {
    title: 'Website Development Services | VeltaZ',
    description: 'High-speed, custom-engineered web platforms built with React, modern animation, and Core Web Vitals optimization.',
  },
  '/mobile-app-development': {
    title: 'Cross-Platform Mobile App Development | VeltaZ',
    description: 'Native-feel iOS and Android mobile apps engineered with modern frameworks, instant sync, and cloud backends.',
  },
  '/seo-blogging-google-business-profile': {
    title: 'SEO, Blogging & Google Business Profile Management | VeltaZ',
    description: 'Data-driven technical SEO, authority content, and Google Business Profile optimization for local & global search dominance.',
  },
  '/automation-systems': {
    title: 'Business Automation Systems | WhatsApp, Lead & Email Workflows | VeltaZ',
    description: 'Custom automation systems that eliminate manual data entry, streamline customer pipelines, and scale business operations.',
  },
  '/performance-marketing': {
    title: 'Performance Marketing Services | Meta, Google & LinkedIn Ads | VeltaZ',
    description: 'ROI-driven paid campaign architecture, conversion rate optimization, and multi-channel performance marketing.',
  },
  '/content': {
    title: 'VeltaZ Content Studio | Video Editing & Visual Storytelling',
    description: 'High-retention social content, reels, and video production engineered to scale brand engagement.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | VeltaZ — Digital Systems & Software',
    description: 'VeltaZ privacy policy regarding client confidentiality, data protection, and digital system security.',
  },
  '/terms': {
    title: 'Terms of Service | VeltaZ — Digital Systems & Software',
    description: 'Terms of service and intellectual property frameworks governing VeltaZ engineering deliverables and software.',
  },
}

export default function RootLayout() {
  const location = useLocation()

  useEffect(() => {
    // Dynamic Canonical Link, Title & OpenGraph Metadata Management
    const baseUrl = 'https://www.veltalabs.net'
    const canonicalPath = location.pathname === '/' ? '' : location.pathname
    const canonicalUrl = `${baseUrl}${canonicalPath}`

    // 1. Canonical Link
    let canonicalEl = document.querySelector('link[rel="canonical"]')
    if (!canonicalEl) {
      canonicalEl = document.createElement('link')
      canonicalEl.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalEl)
    }
    canonicalEl.setAttribute('href', canonicalUrl)

    // 2. OpenGraph URL
    let ogUrlEl = document.querySelector('meta[property="og:url"]')
    if (!ogUrlEl) {
      ogUrlEl = document.createElement('meta')
      ogUrlEl.setAttribute('property', 'og:url')
      document.head.appendChild(ogUrlEl)
    }
    ogUrlEl.setAttribute('content', canonicalUrl)

    // 3. Dynamic Title & Descriptions
    const meta = ROUTE_META[location.pathname] || {
      title: 'VeltaZ – Custom Software & Intelligent Automations',
      description: 'Engineering high-performance web platforms, custom mobile applications, SEO, and intelligent automation systems for modern businesses.',
    }
    document.title = meta.title

    let metaDescEl = document.querySelector('meta[name="description"]')
    if (!metaDescEl) {
      metaDescEl = document.createElement('meta')
      metaDescEl.setAttribute('name', 'description')
      document.head.appendChild(metaDescEl)
    }
    metaDescEl.setAttribute('content', meta.description)

    let ogDescEl = document.querySelector('meta[property="og:description"]')
    if (ogDescEl) ogDescEl.setAttribute('content', meta.description)

    let ogTitleEl = document.querySelector('meta[property="og:title"]')
    if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title)
  }, [location.pathname])

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
      <ScrollToTop />
      <VeltaChat />
    </ThemeProvider>
  )
}
