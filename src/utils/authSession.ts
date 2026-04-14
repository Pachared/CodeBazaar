import type { AuthSessionUser } from '@/types/auth'
import { createDefaultProfileFields } from '@/utils/authProfileDefaults'

const AUTH_SESSION_STORAGE_KEY = 'codebazaar_auth_session'

export const normalizeAuthSession = (session: Partial<AuthSessionUser> | null) => {
  if (!session?.id || !session.name || !session.email || !session.role) {
    return null
  }

  return {
    ...createDefaultProfileFields(session.role),
    provider: 'google',
    isMock: true,
    ...session,
  } as AuthSessionUser
}

export const readStoredAuthSession = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const rawValue = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY)

  if (!rawValue) {
    return null
  }

  try {
    return normalizeAuthSession(JSON.parse(rawValue) as Partial<AuthSessionUser>)
  } catch {
    return null
  }
}

export const saveAuthSession = (session: AuthSessionUser) => {
  if (typeof window === 'undefined') {
    return
  }

  const normalizedSession = normalizeAuthSession(session)

  if (!normalizedSession) {
    return
  }

  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(normalizedSession))
}

export const clearAuthSession = () => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
}
