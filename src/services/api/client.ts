import axios, { AxiosHeaders } from 'axios'
import { env } from '@/config/env'
import { clearAuthSession, readStoredAuthSession } from '@/utils/authSession'
import { getClientSessionKey } from '@/utils/clientSession'

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl || undefined,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const normalizeRequestPath = (rawPath: string) => rawPath.replace(/^\/api\/v1/, '')

const resolveRequestPath = (url?: string, baseURL?: string) => {
  if (!url) {
    return ''
  }

  try {
    const resolvedUrl = new URL(url, baseURL || env.apiBaseUrl || window.location.origin)
    return normalizeRequestPath(resolvedUrl.pathname)
  } catch {
    return normalizeRequestPath(url)
  }
}

apiClient.interceptors.request.use((config) => {
  const session = readStoredAuthSession()
  const headers = AxiosHeaders.from(config.headers)
  const requestPath = resolveRequestPath(config.url, config.baseURL)

  headers.delete('Authorization')
  headers.delete('X-Session-Key')

  if (requestPath === '/cookie-consent' || requestPath === '/me/cookie-consent') {
    headers.set('X-Session-Key', getClientSessionKey())
  }

  if (session?.sessionToken) {
    headers.set('Authorization', `Bearer ${session.sessionToken}`)
  }

  config.headers = headers

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        clearAuthSession()
      }

      const apiMessage =
        typeof error.response?.data === 'object' && error.response?.data !== null
          ? Reflect.get(error.response.data, 'message')
          : null

      if (typeof apiMessage === 'string' && apiMessage.trim().length > 0) {
        return Promise.reject(new Error(apiMessage))
      }

      if (error.code === 'ECONNABORTED') {
        return Promise.reject(new Error('การเชื่อมต่อ API ใช้เวลานานเกินไป'))
      }
    }

    return Promise.reject(error instanceof Error ? error : new Error('เกิดข้อผิดพลาดจาก API'))
  },
)
