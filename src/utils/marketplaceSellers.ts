import type { MarketplaceSeller, Product } from '@/types/marketplace'

const buildSellerSummary = (sellerProducts: Product[]) => {
  const categories = Array.from(new Set(sellerProducts.map((product) => product.category)))

  if (categories.length === 0) {
    return 'รวมรายการซอร์สโค้ดและเทมเพลตที่พร้อมนำไปต่อยอดในระบบจริง'
  }

  if (categories.length === 1) {
    return `รวมผลงานในหมวด ${categories[0]} ที่พร้อมให้ดูรายละเอียดและกดซื้อได้จากหน้าร้านของผู้ขายรายนี้`
  }

  return `รวมผลงานในหมวด ${categories.slice(0, 2).join(' และ ')} พร้อมรายการซอร์สโค้ดและเทมเพลตที่นำไปต่อยอดได้ทันที`
}

export const getMarketplaceSellers = (products: Product[]): MarketplaceSeller[] => {
  const groupedProducts = new Map<string, Product[]>()

  products.forEach((product) => {
    const currentProducts = groupedProducts.get(product.authorSlug) ?? []
    groupedProducts.set(product.authorSlug, [...currentProducts, product])
  })

  return Array.from(groupedProducts.entries())
    .map(([slug, sellerProducts]) => {
      const firstProduct = sellerProducts[0]

      return {
        slug,
        name: firstProduct.authorName,
        summary: buildSellerSummary(sellerProducts),
        productCount: sellerProducts.length,
        totalSales: sellerProducts.reduce((sum, product) => sum + product.sales, 0),
        startingPrice: Math.min(...sellerProducts.map((product) => product.price)),
        verifiedCount: sellerProducts.filter((product) => product.verified).length,
        categories: Array.from(new Set(sellerProducts.map((product) => product.category))),
        stacks: Array.from(new Set(sellerProducts.flatMap((product) => product.stack))).slice(0, 5),
        latestUpdateDaysAgo: Math.min(...sellerProducts.map((product) => product.updatedDaysAgo)),
      }
    })
    .sort((left, right) => {
      if (left.verifiedCount !== right.verifiedCount) {
        return right.verifiedCount - left.verifiedCount
      }

      return right.totalSales - left.totalSales
    })
}

export const getMarketplaceSellerBySlug = (products: Product[], sellerSlug: string) =>
  getMarketplaceSellers(products).find((seller) => seller.slug === sellerSlug) ?? null

export const getProductsBySellerSlug = (products: Product[], sellerSlug: string) =>
  products.filter((product) => product.authorSlug === sellerSlug)
