import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { DownloadsPage } from '@/pages/DownloadsPage'
import { HomePage } from '@/pages/HomePage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { SellerPage } from '@/pages/SellerPage'
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
        path: 'seller',
        element: <SellerPage />,
      },
      {
        path: 'seller/studio',
        element: <SellerStudioPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
])
