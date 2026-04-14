import { CssBaseline, ThemeProvider } from '@mui/material'
import type { PropsWithChildren } from 'react'
import { MarketplaceProvider } from '@/app/providers/MarketplaceProvider'
import { appTheme } from '@/theme/theme'

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <MarketplaceProvider>{children}</MarketplaceProvider>
    </ThemeProvider>
  )
}
