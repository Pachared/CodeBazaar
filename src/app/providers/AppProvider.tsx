import { CssBaseline, ThemeProvider } from '@mui/material'
import type { PropsWithChildren } from 'react'
import { AuthProvider } from '@/app/providers/AuthProvider'
import { CookieConsentProvider } from '@/app/providers/CookieConsentProvider'
import { MarketplaceProvider } from '@/app/providers/MarketplaceProvider'
import { NotificationProvider } from '@/app/providers/NotificationProvider'
import { appTheme } from '@/theme/theme'

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <CookieConsentProvider>
        <NotificationProvider>
          <AuthProvider>
            <MarketplaceProvider>{children}</MarketplaceProvider>
          </AuthProvider>
        </NotificationProvider>
      </CookieConsentProvider>
    </ThemeProvider>
  )
}
