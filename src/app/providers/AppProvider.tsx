import { CssBaseline, ThemeProvider } from '@mui/material'
import type { PropsWithChildren } from 'react'
import { AuthProvider } from '@/app/providers/AuthProvider'
import { CookieConsentProvider } from '@/app/providers/CookieConsentProvider'
import { DownloadsProvider } from '@/app/providers/DownloadsProvider'
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
            <DownloadsProvider>
              <MarketplaceProvider>{children}</MarketplaceProvider>
            </DownloadsProvider>
          </AuthProvider>
        </NotificationProvider>
      </CookieConsentProvider>
    </ThemeProvider>
  )
}
