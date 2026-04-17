import { requireRemoteApi } from '@/config/env'
import type { AuthActionResponse } from '@/types/auth'
import type {
  SellerListingInput,
  SellerListingMode,
  SellerListingResponse,
  SellerOrder,
} from '@/types/seller'
import { apiClient } from './client'

interface SellerListingApiPayload {
  assetType: SellerListingInput['assetType']
  title: string
  categoryId: string
  licenseId: string
  price: number
  summary: string
  description: string
  highlights: string[]
  idealFor: string[]
  supportInfo: string
  stack: string[]
  version: string
  demoUrl: string
  supportUrl: string
  includedFiles: string[]
  packageFileName: string
  coverFileName: string
  docsFileName: string
  instantDelivery: boolean
  sourceIncluded: boolean
  documentationIncluded: boolean
  mode: SellerListingMode
}

export const sellerService = {
  async openSellerAccount(): Promise<AuthActionResponse> {
    requireRemoteApi('บัญชีผู้ขาย ')

    const { data } = await apiClient.post<AuthActionResponse>('/seller/onboarding/github')

    if (data.session?.isMock) {
      throw new Error('backend ฝั่งผู้ขายยังไม่เปิดใช้งานแบบจริง จึงยังไม่สามารถเปิดบัญชีผู้ขายได้ในตอนนี้')
    }

    if (!data.session) {
      return data
    }

    return {
      ...data,
      session: {
        ...data.session,
        role: 'seller',
        provider: 'github',
      },
    }
  },

  async submitListing(
    input: SellerListingInput,
    mode: SellerListingMode,
  ): Promise<SellerListingResponse> {
    requireRemoteApi('การลงขายสินค้า ')

    const payload: SellerListingApiPayload = {
      assetType: input.assetType,
      title: input.title,
      categoryId: input.categoryId,
      licenseId: input.licenseId,
      price: input.price,
      summary: input.summary,
      description: input.description,
      highlights: input.highlights,
      idealFor: input.idealFor,
      supportInfo: input.supportInfo,
      stack: input.stack,
      version: input.version,
      demoUrl: input.demoUrl,
      supportUrl: input.supportUrl,
      includedFiles: input.includedFiles,
      packageFileName: input.packageFileName,
      coverFileName: input.coverFileName,
      docsFileName: input.docsFileName,
      instantDelivery: input.deliveryMethod !== 'github-private-repo',
      sourceIncluded: input.deliveryMethod === 'source-package-upload',
      documentationIncluded: input.docsFileName.trim().length > 0,
      mode,
    }

    const { data } = await apiClient.post<SellerListingResponse>('/seller/listings', payload)

    return data
  },

  async getSellerOrders(signal?: AbortSignal): Promise<SellerOrder[]> {
    requireRemoteApi('คำสั่งซื้อของร้าน ')

    const { data } = await apiClient.get<SellerOrder[]>('/seller/orders', { signal })
    return data
  },
}
