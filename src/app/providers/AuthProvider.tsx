import { useCallback, useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { AuthContext } from '@/app/providers/auth-context'
import { hasRemoteApi } from '@/config/env'
import { profileService } from '@/services/api/profile.service'
import type { AuthProfileUpdate, AuthSessionUser } from '@/types/auth'
import {
  clearAuthSession,
  normalizeAuthSession,
  readStoredAuthSession,
  saveAuthSession,
} from '@/utils/authSession'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthSessionUser | null>(() => readStoredAuthSession())

  const commitSession = useCallback((session: AuthSessionUser | null) => {
    setUser(session)

    if (session) {
      saveAuthSession(session)
      return
    }

    clearAuthSession()
  }, [])

  const signIn = (session: AuthSessionUser) => {
    const normalizedSession = normalizeAuthSession(session)

    if (!normalizedSession) {
      return
    }

    commitSession(normalizedSession)
  }

  useEffect(() => {
    if (!hasRemoteApi || !user?.id) {
      return
    }

    const controller = new AbortController()

    void profileService
      .getProfile(controller.signal)
      .then((remoteUser) => {
        if (controller.signal.aborted || !remoteUser) {
          return
        }

        const normalizedSession = normalizeAuthSession(remoteUser)
        if (!normalizedSession) {
          return
        }

        commitSession(normalizedSession)
      })
      .catch(() => {
        // Keep the locally stored session if the profile sync request fails.
      })

    return () => controller.abort()
  }, [commitSession, user?.id])

  const updateProfile = async (profile: AuthProfileUpdate) => {
    if (!user) {
      return null
    }

    if (!hasRemoteApi) {
      const nextUser = normalizeAuthSession({
        ...user,
        ...profile,
      })

      if (!nextUser) {
        return null
      }

      commitSession(nextUser)
      return nextUser
    }

    const nextUser = await profileService.updateProfile(profile)
    const normalizedSession = normalizeAuthSession(nextUser)

    if (!normalizedSession) {
      return null
    }

    commitSession(normalizedSession)
    return normalizedSession
  }

  const signOut = () => {
    commitSession(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        signIn,
        updateProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
