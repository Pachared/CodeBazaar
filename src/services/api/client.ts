import axios from 'axios'
import { env } from '@/config/env'

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl || undefined,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
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
