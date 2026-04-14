import { useState } from 'react'
import type { PropsWithChildren } from 'react'
import { CookieConsentContext } from '@/app/providers/cookie-consent-context'
import type { CookieConsentStatus, CookiePreferences, StoredCookieConsent } from '@/types/cookie'
import {
  createAllCookiesConsent,
  createNecessaryOnlyConsent,
  readStoredCookieConsent,
  saveStoredCookieConsent,
} from '@/utils/cookieConsent'

const resolveConsentStatus = (preferences: CookiePreferences): CookieConsentStatus => {
  if (preferences.preferences && preferences.analytics && preferences.marketing) {
    return 'all'
  }

  if (!preferences.preferences && !preferences.analytics && !preferences.marketing) {
    return 'necessary'
  }

  return 'customized'
}

export const CookieConsentProvider = ({ children }: PropsWithChildren) => {
  const [consent, setConsent] = useState<StoredCookieConsent | null>(() => readStoredCookieConsent())
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const hasLoaded = true
  const isBannerVisible = !consent && !isSettingsOpen

  const openSettings = () => {
    setIsSettingsOpen(true)
  }

  const closeSettings = () => {
    setIsSettingsOpen(false)
  }

  const acceptNecessaryCookies = () => {
    const nextConsent = createNecessaryOnlyConsent()
    setConsent(nextConsent)
    setIsSettingsOpen(false)
  }

  const acceptAllCookies = () => {
    const nextConsent = createAllCookiesConsent()
    setConsent(nextConsent)
    setIsSettingsOpen(false)
  }

  const saveCustomPreferences = (preferences: CookiePreferences) => {
    const nextConsent = saveStoredCookieConsent(resolveConsentStatus(preferences), {
      ...preferences,
      necessary: true,
    })

    setConsent(nextConsent)
    setIsSettingsOpen(false)
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasLoaded,
        isBannerVisible,
        isSettingsOpen,
        openSettings,
        closeSettings,
        acceptNecessaryCookies,
        acceptAllCookies,
        saveCustomPreferences,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}
