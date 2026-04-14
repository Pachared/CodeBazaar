import { createContext } from 'react'
import type { AuthProfileUpdate, AuthSessionUser } from '@/types/auth'

export interface AuthContextValue {
  user: AuthSessionUser | null
  isAuthenticated: boolean
  signIn: (session: AuthSessionUser) => void
  updateProfile: (profile: AuthProfileUpdate) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
