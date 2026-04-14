import { hasRemoteApi } from '@/config/env'
import type { AuthActionResponse, BuyerAuthIntent } from '@/types/auth'
import { createMockAuthResponse, createMockBuyerSession } from '@/utils/mockAuth'
import { mockDelay } from './mockDelay'
import { apiClient } from './client'

export const authService = {
  async startGoogleAuth(intent: BuyerAuthIntent): Promise<AuthActionResponse> {
    if (!hasRemoteApi) {
      await mockDelay(280)

      return createMockAuthResponse(createMockBuyerSession(intent), {
        title: intent === 'login' ? 'เข้าสู่ระบบสำเร็จ' : 'สมัครสมาชิกสำเร็จ',
        description:
          intent === 'login'
            ? 'คุณกำลังใช้งานบัญชีทดลองสำหรับทดสอบหน้าเว็บในโหมด mock'
            : 'สร้างบัญชีทดลองเรียบร้อยแล้ว สามารถใช้งานหน้าเว็บต่อได้ทันที',
      })
    }

    const { data } = await apiClient.post<AuthActionResponse>('/auth/google/start', {
      intent,
    })

    return data
  },
}
