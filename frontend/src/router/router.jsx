import { createBrowserRouter, redirect } from 'react-router-dom'

// ── Layouts
import RootLayout from '../layouts/App.jsx'

// ── Pages
import Home from '../pages/Home/Home.jsx'
import About from '../pages/About/About.jsx'
import Product from '../pages/Product/Product.jsx'
import Contact from '../pages/Contact/Contact.jsx'
import Demo from '../pages/Demo/Demo.jsx'
import Plan from '../pages/Plan/Plan.jsx'
import RootError from '../pages/errors/RootError.jsx'
import TermsOfService from '../pages/TermsOfService/TermsOfService.jsx'
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
      { path: 'services', element: <Services /> },
      { path: 'services/website-development', element: <WebsiteDevelopment /> },
      { path: 'services/seo-blogging-google-business-profile', element: <SeoBloggingGbp /> },
      { path: 'services/mobile-app-development', element: <MobileAppDevelopment /> },
      { path: 'services/cross-platform-apps', element: <MobileAppDevelopment /> },
      { path: 'services/performance-marketing', element: <PerformanceMarketing /> },
      { path: 'services/automation-systems', element: <AutomationSystems /> },
      { path: 'services/automations', element: <AutomationSystems /> },
      { path: 'services/digital-marketing', element: <PerformanceMarketing /> },

      { path: 'content', element: <ContentStudio /> },
      { path: 'contact', element: <Contact /> },
      { path: 'terms', element: <TermsOfService /> },
      { path: 'privacy', element: <TermsOfService /> },

      // ── Products & Demos (Public)
      { path: 'products', loader: () => redirect('/services/mobile-app-development#apps-showcase') },
      { path: 'products/whatsflow', element: <WhatsFlow /> },
      { path: 'products/docket14', element: <Docket14 /> },
      { path: 'products/kin-property', element: <KinProperty /> },
      { path: 'demo', element: <Demo /> },
      { path: 'plan', element: <Plan /> },

      // ── Auth redirects (safe redirects to home)
      { path: 'signin', loader: () => redirect('/') },
      { path: 'login', loader: () => redirect('/') },
      { path: 'signup', loader: () => redirect('/') },

      // ── 404
      { path: '*', element: <NotFound /> },
    ],
  },
])
