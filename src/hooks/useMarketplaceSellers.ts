import { useEffect, useState } from 'react'
import { catalogService } from '@/services/api/catalog.service'
import type { MarketplaceSeller } from '@/types/marketplace'

interface UseMarketplaceSellersState {
  sellers: MarketplaceSeller[]
  isLoading: boolean
  error: string | null
}

export const useMarketplaceSellers = (): UseMarketplaceSellersState => {
  const [sellers, setSellers] = useState<MarketplaceSeller[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadSellers = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await catalogService.getSellers(controller.signal)
        setSellers(response)
      } catch (caughtError) {
        if (controller.signal.aborted) {
          return
        }

        const message =
          caughtError instanceof Error ? caughtError.message : 'ไม่สามารถโหลดรายชื่อผู้ขายได้ในขณะนี้'
        setSellers([])
        setError(message)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadSellers()

    return () => controller.abort()
  }, [])

  return { sellers, isLoading, error }
}
