import { useState } from 'react'
import type { PropsWithChildren } from 'react'
import { MarketplaceContext } from '@/app/providers/marketplace-context'
import type { Product } from '@/types/marketplace'
import type { CartItem } from '@/types/cart'

const toCartItem = (product: Product): CartItem => ({
  id: product.id,
  title: product.title,
  category: product.category,
  authorName: product.authorName,
  price: product.price,
  license: product.license,
})

const appendUniqueCartItem = (items: CartItem[], item: CartItem) => {
  if (items.some((currentItem) => currentItem.id === item.id)) {
    return items
  }

  return [...items, item]
}

export const MarketplaceProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = () => {
    setIsCartOpen(true)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  const addToCart = (product: Product) => {
    setCartItems((currentItems) => appendUniqueCartItem(currentItems, toCartItem(product)))
  }

  const removeFromCart = (productId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((currentItem) => currentItem.id !== productId),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const buyNow = (product: Product) => {
    setCartItems((currentItems) => appendUniqueCartItem(currentItems, toCartItem(product)))
    setIsCartOpen(true)
  }

  const isInCart = (productId: string) =>
    cartItems.some((currentItem) => currentItem.id === productId)

  const cartCount = cartItems.length
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0)

  return (
    <MarketplaceContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        clearCart,
        buyNow,
        isInCart,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  )
}
