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

apiClient.interceptors.request.use((config) => {
  const session = readStoredAuthSession()
  const sessionKey = getClientSessionKey()
  const headers = AxiosHeaders.from(config.headers)

  headers.set('X-Session-Key', sessionKey)

  if (session?.id) {
    headers.set('X-User-ID', session.id)
  }

  if (session?.email) {
    headers.set('X-User-Email', session.email)
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
