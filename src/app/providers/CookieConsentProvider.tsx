import { useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { CookieConsentContext } from '@/app/providers/cookie-consent-context'
import { hasRemoteApi } from '@/config/env'
import { cookieService } from '@/services/api/cookie.service'
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
  const [hasLoaded, setHasLoaded] = useState(!hasRemoteApi)
  const isBannerVisible = !consent && !isSettingsOpen

  useEffect(() => {
    if (!hasRemoteApi) {
      return
    }

    const controller = new AbortController()

    void cookieService
      .getConsent(controller.signal)
      .then((remoteConsent) => {
        const currentLocalConsent = readStoredCookieConsent()

        if (controller.signal.aborted) {
          return
        }

        if (remoteConsent) {
          setConsent(saveStoredCookieConsent(remoteConsent.status, remoteConsent.preferences))
          setHasLoaded(true)
          return
        }

        if (currentLocalConsent) {
          void cookieService.saveConsent(currentLocalConsent.status, currentLocalConsent.preferences)
        }

        setHasLoaded(true)
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setHasLoaded(true)
        }
      })

    return () => controller.abort()
  }, [])

  const persistConsent = (status: CookieConsentStatus, preferences: CookiePreferences) => {
    const nextConsent = saveStoredCookieConsent(status, {
      ...preferences,
      necessary: true,
    })

    setConsent(nextConsent)
    setIsSettingsOpen(false)

    if (hasRemoteApi) {
      void cookieService.saveConsent(nextConsent.status, nextConsent.preferences)
    }

    return nextConsent
  }

  const openSettings = () => {
    setIsSettingsOpen(true)
  }

  const closeSettings = () => {
    setIsSettingsOpen(false)
  }

  const acceptNecessaryCookies = () => {
    persistConsent('necessary', createNecessaryOnlyConsent().preferences)
  }

  const acceptAllCookies = () => {
    persistConsent('all', createAllCookiesConsent().preferences)
  }

  const saveCustomPreferences = (preferences: CookiePreferences) => {
    persistConsent(resolveConsentStatus(preferences), preferences)
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
