import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { DownloadsPage } from '@/pages/DownloadsPage'
import { HomePage } from '@/pages/HomePage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { ProductsCatalogPage } from '@/pages/ProductsCatalogPage'
import { SellerPage } from '@/pages/SellerPage'
import { SellerStorePage } from '@/pages/SellerStorePage'
import { SellerOrdersPage } from '@/pages/SellerOrdersPage'
import { SellersDirectoryPage } from '@/pages/SellersDirectoryPage'
import { SellerStudioPage } from '@/pages/SellerStudioPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'downloads',
        element: <DownloadsPage />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetailPage />,
      },
      {
        path: 'catalog',
        element: <ProductsCatalogPage />,
      },
      {
        path: 'sellers',
        element: <SellersDirectoryPage />,
      },
      {
        path: 'sellers/:sellerSlug',
        element: <SellerStorePage />,
      },
      {
        path: 'seller',
        element: <SellerPage />,
      },
      {
        path: 'seller/studio',
        element: <SellerStudioPage />,
      },
      {
        path: 'seller/orders',
        element: <SellerOrdersPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
])
