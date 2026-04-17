export type SellerAssetType = 'source-code' | 'template' | 'component-kit'
export type SellerListingMode = 'draft' | 'publish'
export type SellerDeliveryMethod =
  | 'release-binary'
  | 'github-private-repo'
  | 'source-package-upload'

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
  githubRepoUrl: string
  githubReleaseTag: string
  githubAccessNote: string
  storageProvider: 'cloudflare-r2'
  storageVisibility: 'private'
  downloadAccess: 'signed-url'
  signedUrlTtlMinutes: number
  auditLoggingEnabled: boolean
  sha256Enabled: boolean
  opaqueStorageKeyEnabled: boolean
  sellerPolicyAccepted: boolean
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
