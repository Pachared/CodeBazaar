import type { CartItem } from '@/types/cart'

export type CheckoutPaymentMethod = 'promptpay' | 'card' | 'bank-transfer'

export type CheckoutLineItem = CartItem

export interface CheckoutSubmitInput {
  customerName: string
  customerEmail: string
  customerPhone: string
  companyName: string
  taxId: string
  note: string
  paymentMethod: CheckoutPaymentMethod
  receivePurchaseUpdates: boolean
  requireInvoice: boolean
  subtotal: number
  total: number
  items: CheckoutLineItem[]
}

export interface CheckoutSubmitResponse {
  title: string
  description: string
  orderId: string
  paymentMethod: CheckoutPaymentMethod
  total: number
  status: 'paid' | 'pending'
}
