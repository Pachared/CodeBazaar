import { requireRemoteApi } from '@/config/env'
import type { AuthProfileUpdate, AuthSessionUser } from '@/types/auth'
import { apiClient } from './client'

export const profileService = {
  async getProfile(signal?: AbortSignal): Promise<AuthSessionUser | null> {
    requireRemoteApi('โปรไฟล์บัญชี ')

    const { data } = await apiClient.get<AuthSessionUser>('/me/profile', { signal })
    return data
  },

  async updateProfile(profile: AuthProfileUpdate): Promise<AuthSessionUser | null> {
    requireRemoteApi('โปรไฟล์บัญชี ')

    const { data } = await apiClient.put<AuthSessionUser>('/me/profile', profile)
    return data
  },
}
