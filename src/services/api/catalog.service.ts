import { requireRemoteApi } from '@/config/env'
import type { MarketplaceFilters, MarketplaceSeller, Product } from '@/types/marketplace'
import { apiClient } from './client'

export const catalogService = {
  async getFeaturedProducts(signal?: AbortSignal): Promise<Product[]> {
    requireRemoteApi('แคตตาล็อกสินค้า ')

    const { data } = await apiClient.get<Product[]>('/products/featured', { signal })
    return data
  },

  async getProductById(productId: string, signal?: AbortSignal): Promise<Product> {
    requireRemoteApi('รายละเอียดสินค้า ')

    const { data } = await apiClient.get<Product>(`/products/${productId}`, { signal })
    return data
  },

  async getProducts(filters: MarketplaceFilters, signal?: AbortSignal): Promise<Product[]> {
    requireRemoteApi('แคตตาล็อกสินค้า ')

    const params = new URLSearchParams()

    if (filters.query.trim()) {
      params.set('query', filters.query.trim())
    }

    params.set('category', filters.category)
    params.set('license', filters.license)
    params.set('price', filters.price)
    params.set('sort', filters.sort)
    params.set('verifiedOnly', String(filters.verifiedOnly))
    filters.stacks.forEach((stack) => params.append('stack', stack))

    const { data } = await apiClient.get<Product[]>(`/products?${params.toString()}`, { signal })
    return data
  },

  async getSellers(signal?: AbortSignal): Promise<MarketplaceSeller[]> {
    requireRemoteApi('รายชื่อผู้ขาย ')

    const { data } = await apiClient.get<MarketplaceSeller[]>('/sellers', { signal })
    return data
  },

  async getSellerBySlug(sellerSlug: string, signal?: AbortSignal): Promise<MarketplaceSeller> {
    requireRemoteApi('หน้าร้านผู้ขาย ')

    const { data } = await apiClient.get<MarketplaceSeller>(`/sellers/${sellerSlug}`, { signal })
    return data
  },

  async getSellerProducts(sellerSlug: string, signal?: AbortSignal): Promise<Product[]> {
    requireRemoteApi('หน้าร้านผู้ขาย ')

    const { data } = await apiClient.get<Product[]>(`/sellers/${sellerSlug}/products`, { signal })
    return data
  },
}
