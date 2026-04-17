import { requireRemoteApi } from '@/config/env'
import type { DownloadLibraryItem } from '@/types/downloads'
import { apiClient } from './client'

interface MessageResponse {
  title: string
  description: string
}

export const downloadsService = {
  async getDownloads(signal?: AbortSignal): Promise<DownloadLibraryItem[]> {
    requireRemoteApi('คลังดาวน์โหลด ')

    const { data } = await apiClient.get<DownloadLibraryItem[]>('/me/downloads', { signal })
    return data
  },

  async markDownloaded(libraryItemId: string): Promise<MessageResponse | null> {
    requireRemoteApi('คลังดาวน์โหลด ')

    const { data } = await apiClient.post<MessageResponse>(
      `/me/downloads/${libraryItemId}/download`,
    )
    return data
  },
}
