import type { AuthSessionUser, StoredAuthSession } from '@/types/auth'
import { createDefaultProfileFields } from '@/utils/authProfileDefaults'

const AUTH_SESSION_STORAGE_KEY = 'codebazaar_auth_session'

const normalizeSessionExpiry = (value: string | undefined) => {
  if (!value?.trim()) {
    return null
  }

  const expiresAt = new Date(value)

  if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() <= Date.now()) {
    return null
  }

  return expiresAt.toISOString()
}

export const normalizeAuthSessionUser = (session: Partial<AuthSessionUser> | null) => {
  if (!session?.id || !session.name || !session.email || !session.role) {
    return null
  }

  return {
    ...createDefaultProfileFields(session.role),
    provider: session.provider ?? 'google',
    ...session,
  } as AuthSessionUser
}

export const normalizeStoredAuthSession = (session: Partial<StoredAuthSession> | null) => {
  const user = normalizeAuthSessionUser(session?.user ?? null)
  const sessionToken = session?.sessionToken?.trim()
  const sessionExpiresAt = normalizeSessionExpiry(session?.sessionExpiresAt)

  if (!user || !sessionToken || !sessionExpiresAt) {
    return null
  }

  return {
    user,
    sessionToken,
    sessionExpiresAt,
  } satisfies StoredAuthSession
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
    const normalizedSession = normalizeStoredAuthSession(
      JSON.parse(rawValue) as Partial<StoredAuthSession>,
    )

    if (!normalizedSession) {
      clearAuthSession()
    }

    return normalizedSession
  } catch {
    clearAuthSession()
    return null
  }
}

export const saveAuthSession = (session: StoredAuthSession) => {
  if (typeof window === 'undefined') {
    return
  }

  const normalizedSession = normalizeStoredAuthSession(session)

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
