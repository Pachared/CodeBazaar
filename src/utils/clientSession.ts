const CLIENT_SESSION_STORAGE_KEY = 'codebazaar_client_session_key'

const createSessionKey = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `cbz-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export const getClientSessionKey = () => {
  if (typeof window === 'undefined') {
    return 'codebazaar-ssr-session'
  }

  const currentKey = window.localStorage.getItem(CLIENT_SESSION_STORAGE_KEY)
  if (currentKey) {
    return currentKey
  }

  const nextKey = createSessionKey()
  window.localStorage.setItem(CLIENT_SESSION_STORAGE_KEY, nextKey)
  return nextKey
}
