export type SellerAssetType = 'source-code' | 'template' | 'component-kit'
export type SellerListingMode = 'draft' | 'publish'

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
  packageFileName: string
  coverFileName: string
  docsFileName: string
  instantDelivery: boolean
  sourceIncluded: boolean
  documentationIncluded: boolean
}

export interface SellerListingResponse {
  title: string
  description: string
  listingId: string
  status: SellerListingMode
}
