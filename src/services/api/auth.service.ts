import { hasRemoteApi } from '@/config/env'
import { googleIdentityService } from '@/services/googleIdentity.service'
import type { AuthActionResponse, BuyerAuthIntent } from '@/types/auth'
import { apiClient } from './client'

export const authService = {
  async startGoogleAuth(intent: BuyerAuthIntent): Promise<AuthActionResponse> {
    const accessToken = await googleIdentityService.requestBuyerAccessToken(intent)

    if (!hasRemoteApi) {
      return googleIdentityService.authenticateBuyerLocallyWithAccessToken(accessToken, intent)
    }

    const { data } = await apiClient.post<AuthActionResponse>('/auth/google/session', {
      accessToken,
      intent,
    })

    return data
  },
}
