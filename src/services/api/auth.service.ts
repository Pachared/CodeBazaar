import { requireRemoteApi } from '@/config/env'
import { googleIdentityService } from '@/services/googleIdentity.service'
import type { AuthActionResponse, BuyerAuthIntent } from '@/types/auth'
import { apiClient } from './client'

export const authService = {
  async startGoogleAuth(intent: BuyerAuthIntent): Promise<AuthActionResponse> {
    requireRemoteApi('การเข้าสู่ระบบด้วย Google ')

    const accessToken = await googleIdentityService.requestBuyerAccessToken(intent)

    const { data } = await apiClient.post<AuthActionResponse>('/auth/google/session', {
      accessToken,
      intent,
    })

    return data
  },
}
