import { createContext } from 'react'
import type { CompletedDownloadOrderInput, DownloadLibraryItem } from '@/types/downloads'

export interface DownloadLibraryContextValue {
  items: DownloadLibraryItem[]
  totalSpent: number
  hasLoaded: boolean
  addCompletedOrderToLibrary: (order: CompletedDownloadOrderInput) => void
  downloadItem: (libraryItemId: string) => void
}

export const DownloadLibraryContext = createContext<DownloadLibraryContextValue | null>(null)
