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

  async getProductById(productId: string, signal?: AbortSignal): Promise<Product> {
    if (!hasRemoteApi) {
      await mockDelay(260, signal)

      const product = mockFeaturedProducts.find((item) => item.id === productId)

      if (!product) {
        throw new Error('ไม่พบรายการสินค้าที่คุณต้องการดูรายละเอียด')
      }

      return product
    }

    const { data } = await apiClient.get<Product>(`/products/${productId}`, { signal })
    return data
  },
}
