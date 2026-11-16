import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'

// ── Layouts & Core (Eager)
import RootLayout from '../layouts/App.jsx'
import RootError from '../pages/errors/RootError.jsx'
import NotFound from '../pages/errors/NotFound.jsx'
import Home from '../pages/Home/Home.jsx'

// ── Lazy-Loaded Pages (Code-Split on Demand)
const About = lazy(() => import('../pages/About/About.jsx'))
const Contact = lazy(() => import('../pages/Contact/Contact.jsx'))
const CaseStudies = lazy(() => import('../pages/CaseStudies/CaseStudies.jsx'))
const WhatsFlow = lazy(() => import('../pages/WhatsFlow/WhatsFlow.jsx'))
const Docket14 = lazy(() => import('../pages/Docket14/Docket14.jsx'))
const KinProperty = lazy(() => import('../pages/KinProperty/KinProperty.jsx'))
const Services = lazy(() => import('../pages/Services/Services.jsx'))
const WebsiteDevelopment = lazy(() => import('../pages/WebsiteDevelopment/WebsiteDevelopment.jsx'))
const MobileAppDevelopment = lazy(() => import('../pages/MobileAppDevelopment/MobileAppDevelopment.jsx'))
const SeoBloggingGbp = lazy(() => import('../pages/SeoBloggingGbp/SeoBloggingGbp.jsx'))
const AutomationSystems = lazy(() => import('../pages/AutomationSystems/AutomationSystems.jsx'))
const PerformanceMarketing = lazy(() => import('../pages/PerformanceMarketing/PerformanceMarketing.jsx'))
const ContentStudio = lazy(() => import('../pages/ContentStudio/ContentStudio.jsx'))
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy/PrivacyPolicy.jsx'))
const Terms = lazy(() => import('../pages/Terms/Terms.jsx'))

// Minimal, smooth loading state preventing layout shifts
const PageLoader = () => (
  <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div
      style={{
        width: '32px',
        height: '32px',
        border: '3px solid rgba(212, 175, 55, 0.2)',
        borderTopColor: 'var(--accent, #D4AF37)',
        borderRadius: '50%',
        animation: 'spinLoader 0.75s linear infinite',
      }}
    />
    <style>{`@keyframes spinLoader { to { transform: rotate(360deg); } }`}</style>
  </div>
)

const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

// ─────────────────────────────────────────────────────────────────
// ROUTER
// ─────────────────────────────────────────────────────────────────
export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      // ── Core Pages
      { index: true, element: <Home /> },
      { path: 'about', element: withSuspense(About) },
      { path: 'contact', element: withSuspense(Contact) },

      // ── Work & Case Studies
      { path: 'case-studies', element: withSuspense(CaseStudies) },
      { path: 'case-study', loader: () => redirect('/case-studies') },
      { path: 'products', loader: () => redirect('/case-studies') },

      // ── Clean Top-Level Tools & Platforms
      { path: 'whatsflow', element: withSuspense(WhatsFlow) },
      { path: 'docket14', element: withSuspense(Docket14) },
      { path: 'kin-property', element: withSuspense(KinProperty) },

      // Legacy / alternate route aliases (seamless redirects)
      { path: 'products/whatsflow', loader: () => redirect('/whatsflow') },
      { path: 'products/docket14', loader: () => redirect('/docket14') },
      { path: 'products/kin-property', loader: () => redirect('/kin-property') },
      { path: 'case-studies/whatsflow', loader: () => redirect('/whatsflow') },
      { path: 'case-studies/docket14', loader: () => redirect('/docket14') },
      { path: 'case-studies/kin-property', loader: () => redirect('/kin-property') },
      { path: 'case-studies/kin-property-management', loader: () => redirect('/kin-property') },
      { path: 'case-studies/content-studio', loader: () => redirect('/content') },

      // ── Services & Offerings (Clean direct routes)
      { path: 'services', element: withSuspense(Services) },
      { path: 'website-development', element: withSuspense(WebsiteDevelopment) },
      { path: 'web-development', loader: () => redirect('/website-development') },
      { path: 'software-development', loader: () => redirect('/website-development') },

      { path: 'mobile-app-development', element: withSuspense(MobileAppDevelopment) },
      { path: 'cross-platform-apps', loader: () => redirect('/mobile-app-development') },

      { path: 'seo-blogging-google-business-profile', element: withSuspense(SeoBloggingGbp) },
      { path: 'seo-blogging-gbp', loader: () => redirect('/seo-blogging-google-business-profile') },

      { path: 'automation-systems', element: withSuspense(AutomationSystems) },
      { path: 'automations', loader: () => redirect('/automation-systems') },

      { path: 'performance-marketing', element: withSuspense(PerformanceMarketing) },
      { path: 'paid-campaigns', loader: () => redirect('/performance-marketing') },
      { path: 'digital-marketing', loader: () => redirect('/performance-marketing') },

      { path: 'content', element: withSuspense(ContentStudio) },

      // Backward-compatibility: redirect legacy /services/* to clean top-level routes
      { path: 'services/website-development', loader: () => redirect('/website-development') },
      { path: 'services/web-development', loader: () => redirect('/website-development') },
      { path: 'services/software-development', loader: () => redirect('/website-development') },
      { path: 'services/seo-blogging-google-business-profile', loader: () => redirect('/seo-blogging-google-business-profile') },
      { path: 'services/seo-blogging-gbp', loader: () => redirect('/seo-blogging-google-business-profile') },
      { path: 'services/mobile-app-development', loader: () => redirect('/mobile-app-development') },
      { path: 'services/cross-platform-apps', loader: () => redirect('/mobile-app-development') },
      { path: 'services/performance-marketing', loader: () => redirect('/performance-marketing') },
      { path: 'services/paid-campaigns', loader: () => redirect('/performance-marketing') },
      { path: 'services/automation-systems', loader: () => redirect('/automation-systems') },
      { path: 'services/automations', loader: () => redirect('/automation-systems') },
      { path: 'services/digital-marketing', loader: () => redirect('/performance-marketing') },

      // ── Legal & Policies
      { path: 'privacy-policy', element: withSuspense(PrivacyPolicy) },
      { path: 'privacy', loader: () => redirect('/privacy-policy') },
      { path: 'terms', element: withSuspense(Terms) },
      { path: 'terms-and-conditions', loader: () => redirect('/terms') },

      // ── 404 Catch-All
      { path: '*', element: <NotFound /> },
    ],
  },
])
