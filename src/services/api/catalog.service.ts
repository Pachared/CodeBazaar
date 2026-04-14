import { hasRemoteApi } from '@/config/env'
import { mockFeaturedProducts } from '@/data/mockProducts'
import type { Product } from '@/types/marketplace'
import { mockDelay } from './mockDelay'
import { apiClient } from './client'

export const catalogService = {
  async getFeaturedProducts(signal?: AbortSignal): Promise<Product[]> {
    if (!hasRemoteApi) {
      await mockDelay(350, signal)
      return mockFeaturedProducts
    }

    const { data } = await apiClient.get<Product[]>('/products/featured', { signal })
    return data
  },
}
