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
    if (err instanceof Response) throw err   // let redirect pass through
    throw redirect('/signin')
  }
}

// Redirect already-authed users away from signin/signup
export async function guestLoader({ request }) {
  try {
    const user = await checkSession()
    if (user) {
      const url = new URL(request.url)
      const from = url.searchParams.get('from') || '/'
      throw redirect(from)
    }
    return null
  } catch (err) {
    if (err instanceof Response) throw err
    return null
  }
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
      { path: 'product', element: <Product /> },
      { path: 'contact', element: <Contact /> },
      { path: 'terms', element: <TermsOfService /> },

      // ── Auth pages (redirect if already logged in)
      {
        path: 'signin',
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
