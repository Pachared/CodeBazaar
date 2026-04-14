import { hasRemoteApi } from '@/config/env'
import type { AuthActionResponse } from '@/types/auth'
import type { SellerListingInput, SellerListingMode, SellerListingResponse } from '@/types/seller'
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

  async submitListing(
    input: SellerListingInput,
    mode: SellerListingMode,
  ): Promise<SellerListingResponse> {
    if (!hasRemoteApi) {
      await mockDelay(360)

      return {
        title: mode === 'publish' ? 'ส่งขึ้นรายการขายแล้ว' : 'บันทึกร่างรายการแล้ว',
        description:
          mode === 'publish'
            ? `${input.title} ถูกส่งขึ้นพื้นที่ขายเรียบร้อยแล้ว และพร้อมต่อระบบอนุมัติรายการจริง`
            : `${input.title} ถูกบันทึกเป็นฉบับร่างเรียบร้อยแล้ว สามารถกลับมาแก้ไขต่อได้ทุกเมื่อ`,
        listingId: `mock-${mode}-${Date.now()}`,
        status: mode,
      }
    }

    const { data } = await apiClient.post<SellerListingResponse>('/seller/listings', {
      ...input,
      mode,
    })

    return data
  },
}
