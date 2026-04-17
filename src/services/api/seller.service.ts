import { hasRemoteApi } from '@/config/env'
import { mockSellerOrders } from '@/data/mockSellerOrders'
import type { AuthActionResponse } from '@/types/auth'
import type {
  SellerListingInput,
  SellerListingMode,
  SellerListingResponse,
  SellerOrder,
} from '@/types/seller'
import { createMockAuthResponse, createMockSellerSession } from '@/utils/mockAuth'
import { mockDelay } from './mockDelay'
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
    if (!hasRemoteApi) {
      await mockDelay(320)

      return createMockAuthResponse(createMockSellerSession(), {
        title: 'เปิดบัญชีผู้ขายสำเร็จ',
        description: 'เชื่อมบัญชีผู้ขายทดลองด้วย GitHub เรียบร้อยแล้ว',
      })
    }

    const { data } = await apiClient.post<AuthActionResponse>('/seller/onboarding/github')

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
    if (!hasRemoteApi) {
      await mockDelay(360)

      return {
        title: mode === 'publish' ? 'ส่งขึ้นรายการขายแล้ว' : 'บันทึกร่างรายการแล้ว',
        description:
          mode === 'publish'
            ? `${input.title} ถูกส่งขึ้นพื้นที่ขายเรียบร้อยแล้ว และพร้อมต่อระบบอนุมัติรายการจริง`
            : `${input.title} ถูกบันทึกเป็นฉบับร่างเรียบร้อยแล้ว สามารถกลับมาแก้ไขต่อได้ทุกเมื่อ`,
        listingId: `mock-${mode}-${Date.now()}`,
        status: mode,
      }
    }

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
    if (!hasRemoteApi) {
      await mockDelay(300, signal)
      return mockSellerOrders
    }

    const { data } = await apiClient.get<SellerOrder[]>('/seller/orders', { signal })
    return data
  },
}
