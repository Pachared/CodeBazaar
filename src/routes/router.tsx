import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { ProfilePage } from '@/pages/ProfilePage'
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
