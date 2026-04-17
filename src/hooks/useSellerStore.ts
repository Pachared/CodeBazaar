import { useEffect, useState } from 'react'
import { catalogService } from '@/services/api/catalog.service'
import type { MarketplaceSeller, Product } from '@/types/marketplace'

interface UseSellerStoreState {
  seller: MarketplaceSeller | null
  products: Product[]
  isLoading: boolean
  error: string | null
}

export const useSellerStore = (sellerSlug: string | undefined): UseSellerStoreState => {
  const [seller, setSeller] = useState<MarketplaceSeller | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sellerSlug) {
      setSeller(null)
      setProducts([])
      setError('ไม่พบร้านผู้ขายที่คุณต้องการดู')
      setIsLoading(false)
      return
    }

    const controller = new AbortController()

    const loadSellerStore = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const [sellerResponse, productsResponse] = await Promise.all([
          catalogService.getSellerBySlug(sellerSlug, controller.signal),
          catalogService.getSellerProducts(sellerSlug, controller.signal),
        ])

        setSeller(sellerResponse)
        setProducts(productsResponse)
      } catch (caughtError) {
        if (controller.signal.aborted) {
          return
        }

        const message =
          caughtError instanceof Error
            ? caughtError.message
            : 'ไม่สามารถเปิดหน้ารวมผลงานของผู้ขายได้ในขณะนี้'

        setSeller(null)
        setProducts([])
        setError(message)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadSellerStore()

    return () => controller.abort()
  }, [sellerSlug])

  return { seller, products, isLoading, error }
}
