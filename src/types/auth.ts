export type BuyerAuthIntent = 'login' | 'register'

export type AuthDialogMode = 'buyer-login' | 'buyer-register' | 'seller-register'

export interface AuthActionResponse {
  title: string
  description: string
  redirectUrl?: string
}
