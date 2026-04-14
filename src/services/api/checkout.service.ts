import { hasRemoteApi } from '@/config/env'
import type { CheckoutSubmitInput, CheckoutSubmitResponse } from '@/types/checkout'
import { mockDelay } from './mockDelay'
import { apiClient } from './client'

const createMockOrderId = () => `CB-${String(Date.now()).slice(-8)}`

export const checkoutService = {
  async submitOrder(input: CheckoutSubmitInput): Promise<CheckoutSubmitResponse> {
    if (!hasRemoteApi) {
      await mockDelay(420)

      return {
        title: 'ชำระเงินสำเร็จ',
        description: `${input.items.length} รายการถูกยืนยันแล้ว และพร้อมดาวน์โหลดได้ทันทีในระบบทดลอง`,
        orderId: createMockOrderId(),
        paymentMethod: input.paymentMethod,
        total: input.total,
        status: 'paid',
      }
    }

    const { data } = await apiClient.post<CheckoutSubmitResponse>('/checkout/orders', input)
    return data
  },
}
