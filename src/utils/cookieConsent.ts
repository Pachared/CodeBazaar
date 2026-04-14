import type {
  CookieConsentStatus,
  CookiePreferences,
  StoredCookieConsent,
} from '@/types/cookie'

export const COOKIE_CONSENT_COOKIE_NAME = 'codebazaar_cookie_consent'
const COOKIE_CONSENT_MAX_AGE_DAYS = 180

export const defaultCookiePreferences: CookiePreferences = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
}

const getCookieValue = (name: string) => {
  if (typeof document === 'undefined') {
    return null
  }

  const cookie = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${name}=`))

  if (!cookie) {
    return null
  }

  return decodeURIComponent(cookie.slice(name.length + 1))
}

const setCookieValue = (name: string, value: string) => {
  if (typeof document === 'undefined') {
    return
  }

  const maxAge = COOKIE_CONSENT_MAX_AGE_DAYS * 24 * 60 * 60
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`
}

const isCookiePreferences = (value: unknown): value is CookiePreferences => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const nextValue = value as Record<string, unknown>

  return (
    typeof nextValue.necessary === 'boolean' &&
    typeof nextValue.preferences === 'boolean' &&
    typeof nextValue.analytics === 'boolean' &&
    typeof nextValue.marketing === 'boolean'
  )
}

const isCookieConsentStatus = (value: unknown): value is CookieConsentStatus =>
  value === 'necessary' || value === 'all' || value === 'customized'

export const readStoredCookieConsent = () => {
  const rawValue = getCookieValue(COOKIE_CONSENT_COOKIE_NAME)

  if (!rawValue) {
    return null
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<StoredCookieConsent>

    if (
      !isCookieConsentStatus(parsedValue.status) ||
      !isCookiePreferences(parsedValue.preferences) ||
      typeof parsedValue.updatedAt !== 'string'
    ) {
      return null
    }

    return parsedValue as StoredCookieConsent
  } catch {
    return null
  }
}

export const saveStoredCookieConsent = (
  status: CookieConsentStatus,
  preferences: CookiePreferences,
) => {
  const storedValue: StoredCookieConsent = {
    status,
    preferences,
    updatedAt: new Date().toISOString(),
  }

  setCookieValue(COOKIE_CONSENT_COOKIE_NAME, JSON.stringify(storedValue))

  return storedValue
}

export const createNecessaryOnlyConsent = () =>
  saveStoredCookieConsent('necessary', defaultCookiePreferences)

export const createAllCookiesConsent = () =>
  saveStoredCookieConsent('all', {
    necessary: true,
    preferences: true,
    analytics: true,
    marketing: true,
  })
