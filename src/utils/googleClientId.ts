import { env } from '@/config/env'

const GOOGLE_CLIENT_ID_STORAGE_KEY = 'codebazaar_google_client_id'

export const getGoogleClientId = () => {
  const envValue = env.googleClientId.trim()
  if (envValue) {
    return envValue
  }

  if (typeof window === 'undefined') {
    return ''
  }

  return window.localStorage.getItem(GOOGLE_CLIENT_ID_STORAGE_KEY)?.trim() ?? ''
}

export const saveGoogleClientId = (clientId: string) => {
  if (typeof window === 'undefined') {
    return
  }

  const normalizedValue = clientId.trim()
  if (!normalizedValue) {
    return
  }

  window.localStorage.setItem(GOOGLE_CLIENT_ID_STORAGE_KEY, normalizedValue)
}
