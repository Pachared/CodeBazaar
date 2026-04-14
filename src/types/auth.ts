export type BuyerAuthIntent = 'login' | 'register'

export type AuthDialogMode = 'buyer-login' | 'buyer-register' | 'seller-register'

export type AuthUserRole = 'buyer' | 'seller'

export interface AuthProfileFields {
  storeName: string
  headline: string
  bio: string
  website: string
  location: string
  notifyOrders: boolean
  notifyMarketplace: boolean
}

export interface AuthSessionUser extends AuthProfileFields {
  id: string
  name: string
  email: string
  role: AuthUserRole
  provider: 'google'
  isMock: boolean
}

export type AuthProfileUpdate = Partial<Pick<AuthSessionUser, 'name'> & AuthProfileFields>

export interface AuthActionResponse {
  title: string
  description: string
  redirectUrl?: string
  session?: AuthSessionUser
}
