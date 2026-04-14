import { hasRemoteApi } from '@/config/env'
import type { AuthActionResponse } from '@/types/auth'
import { mockDelay } from './mockDelay'
import { apiClient } from './client'

export const sellerService = {
  async openSellerAccount(): Promise<AuthActionResponse> {
    if (!hasRemoteApi) {
      await mockDelay(320)

      return {
        title: 'พร้อมเปิดบัญชีผู้ขาย',
        description:
          'หน้า UI นี้เตรียมไว้สำหรับเชื่อมขั้นตอนสมัคร seller ผ่าน Google และ onboarding จริง',
      }
    }

    const { data } = await apiClient.post<AuthActionResponse>('/seller/onboarding/google')
    return data
  },
}
