import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import axios from 'axios'
import { useAuth } from './composables/useAuth.js'

// ── Axios interceptor: retry once with refreshed token on 401 ────────────────
let isRefreshing = false
let failedQueue = []

function processQueue(error, token = null) {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue requests that come in while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`
          return axios(originalRequest)
        }).catch(err => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      const auth = useAuth()
      const newToken = await auth.refreshAccessToken()

      isRefreshing = false

      if (newToken) {
        processQueue(null, newToken)
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        return axios(originalRequest)
      } else {
        processQueue(new Error('refresh_failed'))
        auth.clearSession()
        router.push('/')
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

// ── App bootstrap ─────────────────────────────────────────────────────────────
const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
