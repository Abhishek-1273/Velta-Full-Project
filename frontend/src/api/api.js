import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  // 60s timeout accommodates potential free-tier cloud container cold starts (15-45s)
  timeout: 60000,
})

// ── Response interceptor — normalize errors ─────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.code === 'ECONNABORTED') {
      err.userMessage = 'Request timed out. The server is warming up — please try again in a moment.'
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

export default api
