import type { CartItem } from '@/types/cart'
import type { CheckoutPaymentMethod } from '@/types/checkout'

export interface DownloadLibraryItem extends CartItem {
  libraryItemId: string
  orderId: string
  purchasedAt: string
  paymentMethod: CheckoutPaymentMethod
  status: 'ready'
  versionLabel: string
  fileName: string
  fileSizeLabel: string
  downloadsCount: number
  lastDownloadedAt: string | null
}

export interface CompletedDownloadOrderInput {
  orderId: string
  paymentMethod: CheckoutPaymentMethod
  items: CartItem[]
  purchasedAt?: string
}

