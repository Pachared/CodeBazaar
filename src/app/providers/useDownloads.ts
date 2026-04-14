import { useContext } from 'react'
import { DownloadLibraryContext } from '@/app/providers/download-library-context'

export const useDownloads = () => {
  const context = useContext(DownloadLibraryContext)

  if (!context) {
    throw new Error('useDownloads must be used within DownloadsProvider')
  }

  return context
}

