import { useCallback, useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { AuthContext } from '@/app/providers/auth-context'
import { codeBazaarApiCompatibility } from '@/config/backendCompatibility'
import { hasRemoteApi } from '@/config/env'
import { profileService } from '@/services/api/profile.service'
import type { AuthProfileUpdate, AuthSessionUser, StoredAuthSession } from '@/types/auth'
import {
  clearAuthSession,
  normalizeAuthSessionUser,
  normalizeStoredAuthSession,
  readStoredAuthSession,
  saveAuthSession,
} from '@/utils/authSession'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const canUseRemoteProfileSync =
    hasRemoteApi && codeBazaarApiCompatibility.realUserProfileSync
  const [storedSession, setStoredSession] = useState<StoredAuthSession | null>(() =>
    {
      const nextSession = readStoredAuthSession()

      if (!nextSession) {
        return null
      }

      if (nextSession.user.role === 'seller' && !codeBazaarApiCompatibility.realSellerOnboarding) {
        clearAuthSession()
        return null
      }

      return nextSession
    },
  )

  const user = storedSession?.user ?? null

  const commitSession = useCallback((session: StoredAuthSession | null) => {
    setStoredSession(session)

    if (session) {
      saveAuthSession(session)
      return
    }

    clearAuthSession()
  }, [])

  const signIn = (
    session: AuthSessionUser,
    sessionToken?: string,
    sessionExpiresAt?: string,
  ) => {
    const currentStoredSession = storedSession ?? readStoredAuthSession()
    const normalizedUser = normalizeAuthSessionUser(session)

    if (
      !normalizedUser ||
      (normalizedUser.role === 'seller' && !codeBazaarApiCompatibility.realSellerOnboarding)
    ) {
      return
    }

    const normalizedSession = normalizeStoredAuthSession({
      user: normalizedUser,
      sessionToken: sessionToken ?? currentStoredSession?.sessionToken,
      sessionExpiresAt: sessionExpiresAt ?? currentStoredSession?.sessionExpiresAt,
    })

    if (!normalizedSession) {
      return
    }

    commitSession(normalizedSession)
  }

  useEffect(() => {
    if (!canUseRemoteProfileSync || !storedSession?.sessionToken || !storedSession.user.id) {
      return
    }

    const controller = new AbortController()
    const currentSessionToken = storedSession.sessionToken
    const currentSessionExpiresAt = storedSession.sessionExpiresAt

    void profileService
      .getProfile(controller.signal)
      .then((remoteUser) => {
        if (controller.signal.aborted || !remoteUser) {
          return
        }

        const normalizedUser = normalizeAuthSessionUser(remoteUser)
        if (!normalizedUser) {
          return
        }

        commitSession({
          sessionToken: currentSessionToken,
          sessionExpiresAt: currentSessionExpiresAt,
          user: normalizedUser,
        })
      })
      .catch(() => {
        // Keep the locally stored session if the profile sync request fails.
      })

    return () => controller.abort()
  }, [
    canUseRemoteProfileSync,
    commitSession,
    storedSession?.sessionExpiresAt,
    storedSession?.sessionToken,
    storedSession?.user.id,
  ])

  const updateProfile = async (profile: AuthProfileUpdate) => {
    if (!user) {
      return null
    }

    if (!canUseRemoteProfileSync) {
      const nextUser = normalizeAuthSessionUser({
        ...user,
        ...profile,
      })

      if (!nextUser) {
        return null
      }

      signIn(nextUser)
      return nextUser
    }

    const nextUser = await profileService.updateProfile(profile)
    const normalizedSession = normalizeAuthSessionUser(nextUser)

    if (!normalizedSession) {
      return null
    }

    signIn(normalizedSession)
    return normalizedSession
  }

  const signOut = () => {
    commitSession(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(storedSession?.sessionToken && user),
        signIn,
        updateProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
