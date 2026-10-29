import { createBrowserRouter, redirect } from 'react-router-dom'

// ── Layouts
import RootLayout from '../layouts/App.jsx'

// ── Pages
import Home from '../pages/Home/Home.jsx'
import About from '../pages/About/About.jsx'
import Contact from '../pages/Contact/Contact.jsx'
import RootError from '../pages/errors/RootError.jsx'
import NotFound from '../pages/errors/NotFound.jsx'
import WhatsFlow from '../pages/WhatsFlow/WhatsFlow.jsx'
import Services from '../pages/Services/Services.jsx'
import Docket14 from '../pages/Docket14/Docket14.jsx'
import KinProperty from '../pages/KinProperty/KinProperty.jsx'
import ContentStudio from '../pages/ContentStudio/ContentStudio.jsx'
import WebsiteDevelopment from '../pages/WebsiteDevelopment/WebsiteDevelopment.jsx'
import SeoBloggingGbp from '../pages/SeoBloggingGbp/SeoBloggingGbp.jsx'
import MobileAppDevelopment from '../pages/MobileAppDevelopment/MobileAppDevelopment.jsx'
import PerformanceMarketing from '../pages/PerformanceMarketing/PerformanceMarketing.jsx'
import AutomationSystems from '../pages/AutomationSystems/AutomationSystems.jsx'
import CaseStudies from '../pages/CaseStudies/CaseStudies.jsx'


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
      // ── Public pages
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'case-studies', element: <CaseStudies /> },
      { path: 'case-study', loader: () => redirect('/case-studies') },
      { path: 'case-studies/kin-property', element: <KinProperty /> },
      { path: 'case-studies/kin-property-management', element: <KinProperty /> },
      { path: 'case-studies/whatsflow', element: <WhatsFlow /> },
      { path: 'case-studies/docket14', element: <Docket14 /> },
      { path: 'case-studies/content-studio', element: <ContentStudio /> },

      { path: 'services', element: <Services /> },

      // ── Clean top-level service URLs (like /content)
      { path: 'website-development', element: <WebsiteDevelopment /> },
      { path: 'web-development', loader: () => redirect('/website-development') },
      { path: 'software-development', loader: () => redirect('/website-development') },

      { path: 'mobile-app-development', element: <MobileAppDevelopment /> },
      { path: 'cross-platform-apps', loader: () => redirect('/mobile-app-development') },

      { path: 'seo-blogging-google-business-profile', element: <SeoBloggingGbp /> },
      { path: 'seo-blogging-gbp', loader: () => redirect('/seo-blogging-google-business-profile') },

      { path: 'automation-systems', element: <AutomationSystems /> },
      { path: 'automations', loader: () => redirect('/automation-systems') },

      { path: 'performance-marketing', element: <PerformanceMarketing /> },
      { path: 'paid-campaigns', loader: () => redirect('/performance-marketing') },
      { path: 'digital-marketing', loader: () => redirect('/performance-marketing') },

      // ── Backward-compatibility: redirect legacy /services/* to clean top-level routes
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

      { path: 'content', element: <ContentStudio /> },
      { path: 'contact', element: <Contact /> },
      { path: 'terms', loader: () => redirect('/') },
      { path: 'privacy', loader: () => redirect('/') },

      // ── Products & Demos (Public)
      { path: 'products', loader: () => redirect('/case-studies') },
      { path: 'products/whatsflow', element: <WhatsFlow /> },
      { path: 'products/docket14', element: <Docket14 /> },
      { path: 'products/kin-property', element: <KinProperty /> },
      { path: 'plan', loader: () => redirect('/') },

      // ── Auth redirects (safe redirects to home)
      { path: 'signin', loader: () => redirect('/') },
      { path: 'login', loader: () => redirect('/') },
      { path: 'signup', loader: () => redirect('/') },

      // ── 404
      { path: '*', element: <NotFound /> },
    ],
  },
])
