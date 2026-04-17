import axios, { AxiosHeaders } from 'axios'
import { env } from '@/config/env'
import { readStoredAuthSession } from '@/utils/authSession'
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

const shouldAttachCurrentUserHeaders = (path: string) =>
  path.startsWith('/me/') || path === '/checkout/orders' || path.startsWith('/seller/')

apiClient.interceptors.request.use((config) => {
  const session = readStoredAuthSession()
  const headers = AxiosHeaders.from(config.headers)
  const requestPath = resolveRequestPath(config.url, config.baseURL)

  headers.delete('X-Session-Key')
  headers.delete('X-User-ID')
  headers.delete('X-User-Email')

  if (requestPath === '/cookie-consent' || requestPath === '/me/cookie-consent') {
    headers.set('X-Session-Key', getClientSessionKey())
  }

  if (shouldAttachCurrentUserHeaders(requestPath)) {
    if (session?.id) {
      headers.set('X-User-ID', session.id)
    }

    if (session?.email) {
      headers.set('X-User-Email', session.email)
    }
  }

  config.headers = headers

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
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
