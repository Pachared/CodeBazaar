import { useEffect, useState } from 'react'
import { catalogService } from '@/services/api/catalog.service'
import type { MarketplaceFilters, Product } from '@/types/marketplace'

interface UseProductsCatalogState {
  products: Product[]
  isLoading: boolean
  error: string | null
}

export const useProductsCatalog = (
  filters: MarketplaceFilters,
): UseProductsCatalogState => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await catalogService.getProducts(filters, controller.signal)
        setProducts(response)
      } catch (caughtError) {
        if (controller.signal.aborted) {
          return
        }

        const message =
          caughtError instanceof Error ? caughtError.message : 'ไม่สามารถโหลดรายการขายได้ในขณะนี้'
        setProducts([])
        setError(message)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadProducts()

    return () => controller.abort()
  }, [filters])

  return { products, isLoading, error }
}
