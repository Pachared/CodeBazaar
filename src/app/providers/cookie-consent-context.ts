import { createContext } from 'react'
import type { CookiePreferences, StoredCookieConsent } from '@/types/cookie'

export interface CookieConsentContextValue {
  consent: StoredCookieConsent | null
  hasLoaded: boolean
  isBannerVisible: boolean
  isSettingsOpen: boolean
  openSettings: () => void
  closeSettings: () => void
  acceptNecessaryCookies: () => void
  acceptAllCookies: () => void
  saveCustomPreferences: (preferences: CookiePreferences) => void
}

export const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)
