import { googleIdentityService } from '@/services/googleIdentity.service'
import type { AuthActionResponse, BuyerAuthIntent } from '@/types/auth'

export const authService = {
  async startGoogleAuth(intent: BuyerAuthIntent): Promise<AuthActionResponse> {
    return googleIdentityService.authenticateBuyer(intent)
  },
}
