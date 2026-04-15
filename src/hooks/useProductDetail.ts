import { useEffect, useState } from 'react'
import { catalogService } from '@/services/api/catalog.service'
import type { Product } from '@/types/marketplace'

interface UseProductDetailState {
  product: Product | null
  isLoading: boolean
  error: string | null
}

export const useProductDetail = (productId: string | undefined): UseProductDetailState => {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!productId) {
      setProduct(null)
      setError('ไม่พบรหัสสินค้าที่ต้องการดูรายละเอียด')
      setIsLoading(false)
      return
    }

    const controller = new AbortController()

    const loadProduct = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await catalogService.getProductById(productId, controller.signal)
        setProduct(response)
      } catch (caughtError) {
        if (controller.signal.aborted) {
          return
        }

        const message =
          caughtError instanceof Error
            ? caughtError.message
            : 'ไม่สามารถโหลดรายละเอียดสินค้าได้ในขณะนี้'

        setProduct(null)
        setError(message)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadProduct()

    return () => controller.abort()
  }, [productId])

  return { product, isLoading, error }
}
