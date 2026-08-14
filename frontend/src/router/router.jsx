import { createBrowserRouter, redirect } from 'react-router-dom'
import { checkSession } from '../api/api.js'

// ── Layouts
import RootLayout from '../layouts/App.jsx'

// ── Pages
import Home from '../pages/Home/Home.jsx'
import About from '../pages/About/About.jsx'
import Product from '../pages/Product/Product.jsx'
import Contact from '../pages/Contact/Contact.jsx'
import Demo from '../pages/Demo/Demo.jsx'
import Plan from '../pages/Plan/Plan.jsx'
import SignIn from '../pages/auth/Signin.jsx'
import SignUp from '../pages/auth/Signup.jsx'
import RootError from '../pages/errors/RootError.jsx'
import TermsOfService from '../pages/TermsOfService/TermsOfService.jsx'
import NotFound from '../pages/errors/NotFound.jsx'
import WhatsFlow from '../pages/WhatsFlow/WhatsFlow.jsx'
import Services from '../pages/Services/Services.jsx'
import Docket14 from '../pages/Docket14/Docket14.jsx'
import KinProperty from '../pages/KinProperty/KinProperty.jsx'
import ProtectedPageWrapper from '../components/Protect/ProtectedPageWrapper.jsx'

// ─────────────────────────────────────────────────────────────────
// LOADERS
export async function rootLoader() {
  try {
    const user = await checkSession()
    return { user }
  } catch {
    return { user: null }
  }
}

export async function protectedLoader({ request }) {
  try {
    const user = await checkSession()
    if (!user) {
      const url = new URL(request.url)
      throw redirect(`/signin?from=${encodeURIComponent(url.pathname)}`)
    }
    return { user }
  } catch (err) {
    if (err instanceof Response) throw err  // redirect pass through — zaroor chahiye
    // Network error / timeout = user ko redirect mat karo, null return karo
    return { user: null }
  }
}

// Redirect already-authed users away from signin/signup
export async function guestLoader() {
  return null
}

// ─────────────────────────────────────────────────────────────────
// ROUTER
// ─────────────────────────────────────────────────────────────────
export const router = createBrowserRouter([
  {
    id: 'root',                      // ← required for useRouteLoaderData('root')
    path: '/',
    element: <RootLayout />,
    loader: rootLoader,
    errorElement: <RootError />,
    children: [
      // ── Public pages
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'contact', element: <Contact /> },
      { path: 'terms', element: <TermsOfService /> },
      { path: 'privacy', element: <TermsOfService /> },

      // ── Auth pages (redirect if already logged in)
      {
        path: 'signin',
        loader: guestLoader,
        element: <SignIn />,
      },
      {
        path: 'login',
        loader: guestLoader,
        element: <SignIn />,
      },
      {
        path: 'signup',
        loader: guestLoader,
        element: <SignUp />,
      },

      // ── Protected pages
      {
        path: 'products',
        element: <ProtectedPageWrapper><Product /></ProtectedPageWrapper>,
      },
      {
        path: 'products/whatsflow',
        element: <ProtectedPageWrapper><WhatsFlow /></ProtectedPageWrapper>,
      },
      {
        path: 'products/docket14',
        element: <ProtectedPageWrapper><Docket14 /></ProtectedPageWrapper>,
      },
      {
        path: 'products/kin-property',
        element: <ProtectedPageWrapper><KinProperty /></ProtectedPageWrapper>,
      },
      {
        path: 'demo',
        loader: protectedLoader,
        element: <Demo />,
      },
      {
        path: 'plan',
        loader: protectedLoader,
        element: <Plan />,
      },

      // ── 404
      { path: '*', element: <NotFound /> },
    ],
  },
])
