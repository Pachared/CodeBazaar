import { requireRemoteApi } from '@/config/env'
import type { CheckoutSubmitInput, CheckoutSubmitResponse } from '@/types/checkout'
import { apiClient } from './client'

export const checkoutService = {
  async submitOrder(input: CheckoutSubmitInput): Promise<CheckoutSubmitResponse> {
    requireRemoteApi('การชำระเงิน ')

    const { data } = await apiClient.post<CheckoutSubmitResponse>('/checkout/orders', input)
    return data
  },
}
