import { RouterProvider } from 'react-router-dom'
import { AppProvider } from '@/app/providers/AppProvider'
import { router } from '@/routes/router'

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App
