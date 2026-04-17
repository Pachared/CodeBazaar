import { hasRemoteApi } from '@/config/env'
import type { CookieConsentStatus, CookiePreferences, StoredCookieConsent } from '@/types/cookie'
import { apiClient } from './client'

interface CookieConsentResponse {
  status: CookieConsentStatus
  preferences: CookiePreferences
  updatedAt: string
}

export const cookieService = {
  async getConsent(signal?: AbortSignal): Promise<StoredCookieConsent | null> {
    if (!hasRemoteApi) {
      return null
    }

    const { data } = await apiClient.get<CookieConsentResponse | null>('/cookie-consent', { signal })
    return data
  },

  async saveConsent(
    status: CookieConsentStatus,
    preferences: CookiePreferences,
  ): Promise<StoredCookieConsent | null> {
    if (!hasRemoteApi) {
      return null
    }

    const { data } = await apiClient.put<CookieConsentResponse>('/cookie-consent', {
      status,
      preferences,
    })

    return data
  },
}
