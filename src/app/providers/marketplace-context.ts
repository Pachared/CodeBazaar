import { createContext } from 'react'
import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/marketplace'

export interface MarketplaceContextValue {
  cartItems: CartItem[]
  cartCount: number
  cartTotal: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  buyNow: (product: Product) => void
  isInCart: (productId: string) => boolean
}

export const MarketplaceContext = createContext<MarketplaceContextValue | null>(null)
