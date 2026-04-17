export interface Product {
  id: string
  categoryId: string
  title: string
  summary: string
  fullDescription: string
  category: string
  price: number
  rating: number
  sales: number
  tags: string[]
  stack: string[]
  featureHighlights: string[]
  includedItems: string[]
  idealFor: string[]
  supportInfo: string
  versionLabel: string
  fileFormatLabel: string
  authorName: string
  authorSlug: string
  updatedAt: string
  updatedDaysAgo: number
  delivery: string
  license: string
  licenseId: string
  verified: boolean
}

export interface FilterOption {
  label: string
  value: string
}

export interface MarketplaceFilters {
  query: string
  category: string
  license: string
  price: string
  sort: string
  verifiedOnly: boolean
  stacks: string[]
}

export interface SellerFeature {
  title: string
  description: string
}

export interface SellerStat {
  label: string
  value: string
  description: string
}

export interface SellerCatalogType {
  title: string
  description: string
  tags: string[]
}

export interface SellerStep {
  title: string
  description: string
}

export interface MarketplaceSeller {
  slug: string
  name: string
  summary: string
  productCount: number
  totalSales: number
  startingPrice: number
  verifiedCount: number
  categories: string[]
  stacks: string[]
  latestUpdateDaysAgo: number
}
