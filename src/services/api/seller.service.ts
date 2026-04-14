import { hasRemoteApi } from '@/config/env'
import type { AuthActionResponse } from '@/types/auth'
import { createMockAuthResponse, createMockSellerSession } from '@/utils/mockAuth'
import { mockDelay } from './mockDelay'
import { apiClient } from './client'

export const sellerService = {
  async openSellerAccount(): Promise<AuthActionResponse> {
    if (!hasRemoteApi) {
      await mockDelay(320)

      return createMockAuthResponse(createMockSellerSession(), {
        title: 'เปิดบัญชีผู้ขายสำเร็จ',
        description: 'เข้าสู่ระบบด้วยบัญชีผู้ขายทดลองเรียบร้อยแล้ว',
      })
    }

    const { data } = await apiClient.post<AuthActionResponse>('/seller/onboarding/google')
    return data
  },
}
