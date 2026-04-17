import { hasRemoteApi } from '@/config/env'
import { mockFeaturedProducts } from '@/data/mockProducts'
import type { MarketplaceFilters, MarketplaceSeller, Product } from '@/types/marketplace'
import {
  getMarketplaceSellerBySlug,
  getMarketplaceSellers,
  getProductsBySellerSlug,
} from '@/utils/marketplaceSellers'
import { mockDelay } from './mockDelay'
import { apiClient } from './client'

const matchesPriceRange = (price: number, range: string) => {
  if (range === 'under-1500') {
    return price < 1500
  }

  if (range === '1500-2500') {
    return price >= 1500 && price <= 2500
  }

  if (range === 'over-2500') {
    return price > 2500
  }

  return true
}

const sortProducts = (items: Product[], sort: string) => {
  if (sort === 'latest') {
    return [...items].sort((left, right) => left.updatedDaysAgo - right.updatedDaysAgo)
  }

  if (sort === 'price-asc') {
    return [...items].sort((left, right) => left.price - right.price)
  }

  if (sort === 'price-desc') {
    return [...items].sort((left, right) => right.price - left.price)
  }

  return [...items].sort((left, right) => {
    if (left.verified !== right.verified) {
      return Number(right.verified) - Number(left.verified)
    }

    return right.sales - left.sales
  })
}

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

  async getProducts(filters: MarketplaceFilters, signal?: AbortSignal): Promise<Product[]> {
    if (!hasRemoteApi) {
      await mockDelay(300, signal)

      const normalizedQuery = filters.query.trim().toLowerCase()

      return sortProducts(
        mockFeaturedProducts.filter((product) => {
          const matchesQuery =
            normalizedQuery.length === 0 ||
            [product.title, product.summary, product.category, product.authorName, ...product.stack]
              .join(' ')
              .toLowerCase()
              .includes(normalizedQuery)

          const matchesCategory =
            filters.category === 'all' || product.categoryId === filters.category

          const matchesLicense =
            filters.license === 'all' || product.licenseId === filters.license

          const matchesVerified = !filters.verifiedOnly || product.verified

          const matchesStacks =
            filters.stacks.length === 0 ||
            filters.stacks.every((selectedStack) => product.stack.includes(selectedStack))

          return (
            matchesQuery &&
            matchesCategory &&
            matchesLicense &&
            matchesVerified &&
            matchesStacks &&
            matchesPriceRange(product.price, filters.price)
          )
        }),
        filters.sort,
      )
    }

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
    if (!hasRemoteApi) {
      await mockDelay(300, signal)
      return getMarketplaceSellers(mockFeaturedProducts)
    }

    const { data } = await apiClient.get<MarketplaceSeller[]>('/sellers', { signal })
    return data
  },

  async getSellerBySlug(sellerSlug: string, signal?: AbortSignal): Promise<MarketplaceSeller> {
    if (!hasRemoteApi) {
      await mockDelay(260, signal)

      const seller = getMarketplaceSellerBySlug(mockFeaturedProducts, sellerSlug)
      if (!seller) {
        throw new Error('ไม่พบผู้ขายรายนี้ในระบบ')
      }

      return seller
    }

    const { data } = await apiClient.get<MarketplaceSeller>(`/sellers/${sellerSlug}`, { signal })
    return data
  },

  async getSellerProducts(sellerSlug: string, signal?: AbortSignal): Promise<Product[]> {
    if (!hasRemoteApi) {
      await mockDelay(260, signal)
      return getProductsBySellerSlug(mockFeaturedProducts, sellerSlug)
    }

    const { data } = await apiClient.get<Product[]>(`/sellers/${sellerSlug}/products`, { signal })
    return data
  },
}
