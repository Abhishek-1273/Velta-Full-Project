import { createContext, useContext, useState, useCallback } from 'react'
import { useRouteLoaderData, useNavigate, useRevalidator } from 'react-router-dom'
import api from '../api/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const loaderData = useRouteLoaderData('root')        // from rootLoader
  const { revalidate } = useRevalidator()              // re-runs all loaders
  const navigate = useNavigate()

  // Local override so UI updates instantly before revalidation finishes
  const [userOverride, setUserOverride] = useState(undefined)
  const user = userOverride !== undefined ? userOverride : (loaderData?.user ?? null)

  const login = useCallback(async (credentials) => {
    const { data } = await api.post('/auth/signin', credentials)
    setUserOverride(data.user)
    revalidate()                       // refresh loader so protected routes open
    return data
  }, [revalidate])

  const signup = useCallback(async (payload) => {
    const { data } = await api.post('/auth/signup', payload)
    setUserOverride(data.user)
    revalidate()
    return data
  }, [revalidate])

  const logout = useCallback(async () => {
    await api.post('/auth/signout')
    setUserOverride(null)
    revalidate()
    navigate('/', { replace: true })
  }, [revalidate, navigate])

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
