import { useState } from 'react'
import type { PropsWithChildren } from 'react'
import { AuthContext } from '@/app/providers/auth-context'
import type { AuthProfileUpdate, AuthSessionUser } from '@/types/auth'
import {
  clearAuthSession,
  normalizeAuthSession,
  readStoredAuthSession,
  saveAuthSession,
} from '@/utils/authSession'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthSessionUser | null>(() => readStoredAuthSession())

  const signIn = (session: AuthSessionUser) => {
    const normalizedSession = normalizeAuthSession(session)

    if (!normalizedSession) {
      return
    }

    setUser(normalizedSession)
    saveAuthSession(normalizedSession)
  }

  const updateProfile = (profile: AuthProfileUpdate) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser
      }

      const nextUser = normalizeAuthSession({
        ...currentUser,
        ...profile,
      })

      if (!nextUser) {
        return currentUser
      }

      saveAuthSession(nextUser)
      return nextUser
    })
  }

  const signOut = () => {
    setUser(null)
    clearAuthSession()
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
