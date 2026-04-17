export type BuyerAuthIntent = 'login' | 'register'

export type AuthDialogMode = 'buyer-login' | 'buyer-register' | 'seller-register'

export type AuthUserRole = 'buyer' | 'seller'
export type AuthProvider = 'google' | 'github'

export interface AuthProfileFields {
  phoneNumber: string
  storeName: string
  savedCardHolderName: string
  savedCardNumber: string
  savedCardExpiry: string
  bankName: string
  bankAccountNumber: string
  bankBookImageName: string
  bankBookImageUrl: string
  identityCardImageName: string
  identityCardImageUrl: string
  notifyOrders: boolean
  notifyMarketplace: boolean
}

export interface AuthSessionUser extends AuthProfileFields {
  id: string
  name: string
  email: string
  role: AuthUserRole
  provider: AuthProvider
  isMock: boolean
}

export type AuthProfileUpdate = Partial<Pick<AuthSessionUser, 'name'> & AuthProfileFields>

export interface AuthActionResponse {
  title: string
  description: string
  redirectUrl?: string
  session?: AuthSessionUser
}
