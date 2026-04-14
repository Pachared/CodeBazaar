import { useEffect, useState } from 'react'
import { catalogService } from '@/services/api/catalog.service'
import type { Product } from '@/types/marketplace'

interface UseFeaturedProductsState {
  products: Product[]
  isLoading: boolean
  error: string | null
}

export const useFeaturedProducts = (): UseFeaturedProductsState => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await catalogService.getFeaturedProducts(controller.signal)
        setProducts(response)
      } catch (caughtError) {
        if (controller.signal.aborted) {
          return
        }

        const message =
          caughtError instanceof Error
            ? caughtError.message
            : 'ไม่สามารถโหลดรายการโปรเจกต์ได้ในขณะนี้'

        setError(message)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadProducts()

    return () => controller.abort()
  }, [])

  return { products, isLoading, error }
}
