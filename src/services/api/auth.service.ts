import { hasRemoteApi } from '@/config/env'
import type { AuthActionResponse, BuyerAuthIntent } from '@/types/auth'
import { mockDelay } from './mockDelay'
import { apiClient } from './client'

export const authService = {
  async startGoogleAuth(intent: BuyerAuthIntent): Promise<AuthActionResponse> {
    if (!hasRemoteApi) {
      await mockDelay(280)

      return {
        title: intent === 'login' ? 'พร้อมเชื่อมการเข้าสู่ระบบด้วย Google' : 'พร้อมเชื่อมการสมัครสมาชิกด้วย Google',
        description:
          intent === 'login'
            ? 'ปุ่มนี้พร้อมเชื่อมต่อ endpoint OAuth จริงเมื่อ backend พร้อมใช้งาน'
            : 'ผู้ใช้ใหม่สามารถสมัครสมาชิกด้วย Google ได้ทันทีเมื่อเชื่อม API จริง',
      }
    }

    const { data } = await apiClient.post<AuthActionResponse>('/auth/google/start', {
      intent,
    })

    return data
  },
}
