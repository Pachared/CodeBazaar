import { useState } from 'react'
import type { PropsWithChildren } from 'react'
import { MarketplaceContext } from '@/app/providers/marketplace-context'
import { useNotification } from '@/app/providers/useNotification'
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
  const { notify } = useNotification()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = () => {
    setIsCartOpen(true)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  const addToCart = (product: Product) => {
    const item = toCartItem(product)
    const alreadyInCart = cartItems.some((currentItem) => currentItem.id === item.id)

    if (alreadyInCart) {
      notify({
        severity: 'info',
        title: 'มีสินค้าในตะกร้าแล้ว',
        message: `${product.title} อยู่ในตะกร้าของคุณอยู่แล้ว`,
      })
      return
    }

    setCartItems((currentItems) => appendUniqueCartItem(currentItems, toCartItem(product)))
    notify({
      severity: 'success',
      title: 'เพิ่มลงตะกร้าแล้ว',
      message: `${product.title} ถูกเพิ่มลงในตะกร้าเรียบร้อยแล้ว`,
    })
  }

  const removeFromCart = (productId: string) => {
    const removedItem = cartItems.find((currentItem) => currentItem.id === productId)
    setCartItems((currentItems) =>
      currentItems.filter((currentItem) => currentItem.id !== productId),
    )

    if (removedItem) {
      notify({
        severity: 'info',
        title: 'ลบออกจากตะกร้าแล้ว',
        message: `${removedItem.title} ถูกนำออกจากตะกร้าเรียบร้อยแล้ว`,
      })
    }
  }

  const clearCart = () => {
    if (cartItems.length === 0) {
      return
    }

    setCartItems([])
    notify({
      severity: 'info',
      title: 'ล้างตะกร้าแล้ว',
      message: 'รายการสินค้าทั้งหมดถูกนำออกจากตะกร้าเรียบร้อยแล้ว',
    })
  }

  const buyNow = (product: Product) => {
    const item = toCartItem(product)
    const alreadyInCart = cartItems.some((currentItem) => currentItem.id === item.id)

    setCartItems((currentItems) => appendUniqueCartItem(currentItems, item))
    setIsCartOpen(true)

    notify({
      severity: 'success',
      title: alreadyInCart ? 'เปิดตะกร้าแล้ว' : 'เตรียมสั่งซื้อแล้ว',
      message: alreadyInCart
        ? `${product.title} อยู่ในตะกร้าแล้วและพร้อมดูรายละเอียดต่อ`
        : `${product.title} ถูกเพิ่มลงตะกร้าและเปิดหน้าสั่งซื้อให้แล้ว`,
    })
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
