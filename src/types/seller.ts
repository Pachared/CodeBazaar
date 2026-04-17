export type SellerAssetType = 'source-code' | 'template' | 'component-kit'
export type SellerListingMode = 'draft' | 'publish'
export type SellerDeliveryMethod = 'release-binary' | 'source-package-upload'

export interface SellerListingInput {
  assetType: SellerAssetType
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
  deliveryMethod: SellerDeliveryMethod
  packageFileName: string
  coverFileName: string
  docsFileName: string
}

export interface SellerListingResponse {
  title: string
  description: string
  listingId: string
  status: SellerListingMode
}

export interface SellerOrder {
  id: string
  orderId: string
  productId: string
  productTitle: string
  productCategory: string
  buyerName: string
  buyerEmail: string
  purchasedAt: string
  amount: number
  paymentMethodLabel: string
  licenseLabel: string
  deliveryLabel: string
  statusLabel: string
}
