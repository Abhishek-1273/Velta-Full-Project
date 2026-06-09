import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,  // send httpOnly cookie automatically
  timeout: 30000,
})

// ── Response interceptor — normalize errors ─────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.code === 'ECONNABORTED') {
      err.userMessage = 'Request timed out. Please check your connection.'
    } else if (!err.response) {
      err.userMessage = 'Cannot reach the server. Please check your connection.'
    } else {
      err.userMessage =
        err.response.data?.message ||
        err.response.data?.error ||
        `Something went wrong (${err.response.status}). Please try again.`
    }
    return Promise.reject(err)
  }
)

// ── Helpers used by route loaders ───────────────────────────────

/**
 * Called by the root loader on every navigation.
 * Returns the user object or null — never throws to the router.
 */
export async function checkSession() {
  try {
    const { data } = await api.get('/auth/me')
    return data.user ?? null
  } catch {
    return null
  }
}

export default api
