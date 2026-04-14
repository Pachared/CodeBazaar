export interface CookiePreferences {
  necessary: boolean
  preferences: boolean
  analytics: boolean
  marketing: boolean
}

export type CookieConsentStatus = 'necessary' | 'all' | 'customized'

export interface StoredCookieConsent {
  status: CookieConsentStatus
  preferences: CookiePreferences
  updatedAt: string
}
