import { useEffect, useState } from 'react'
import { sellerService } from '@/services/api/seller.service'
import type { SellerOrder } from '@/types/seller'

interface UseSellerOrdersState {
  orders: SellerOrder[]
  isLoading: boolean
  error: string | null
}

export const useSellerOrders = (enabled = true): UseSellerOrdersState => {
  const [orders, setOrders] = useState<SellerOrder[]>([])
  const [isLoading, setIsLoading] = useState(enabled)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      setOrders([])
      setError(null)
      setIsLoading(false)
      return
    }

    const controller = new AbortController()

    const loadOrders = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await sellerService.getSellerOrders(controller.signal)
        setOrders(response)
      } catch (caughtError) {
        if (controller.signal.aborted) {
          return
        }

        const message =
          caughtError instanceof Error
            ? caughtError.message
            : 'ไม่สามารถโหลดรายการคำสั่งซื้อของร้านได้ในขณะนี้'

        setOrders([])
        setError(message)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadOrders()

    return () => controller.abort()
  }, [enabled])

  return { orders, isLoading, error }
}
