import type { DownloadLibraryItem } from '@/types/downloads'

const DOWNLOAD_LIBRARY_STORAGE_KEY = 'codebazaar_download_library'

type DownloadLibraryStorage = Record<string, DownloadLibraryItem[]>

const formatSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const readStoredDownloadLibrary = (): DownloadLibraryStorage => {
  if (typeof window === 'undefined') {
    return {}
  }

  const rawValue = window.localStorage.getItem(DOWNLOAD_LIBRARY_STORAGE_KEY)

  if (!rawValue) {
    return {}
  }

  try {
    return JSON.parse(rawValue) as DownloadLibraryStorage
  } catch {
    return {}
  }
}

export const saveStoredDownloadLibrary = (value: DownloadLibraryStorage) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(DOWNLOAD_LIBRARY_STORAGE_KEY, JSON.stringify(value))
}

export const createMockDownloadFile = (item: DownloadLibraryItem) => {
  if (typeof window === 'undefined') {
    return
  }

  const fileContent = [
    `CodeBazaar Download Package`,
    `สินค้า: ${item.title}`,
    `ผู้ขาย: ${item.authorName}`,
    `หมวดหมู่: ${item.category}`,
    `ไลเซนส์: ${item.license}`,
    `หมายเลขคำสั่งซื้อ: ${item.orderId}`,
    `เวอร์ชัน: ${item.versionLabel}`,
    ``,
    `นี่คือไฟล์ mock สำหรับทดสอบ flow ดาวน์โหลดในเครื่อง`,
    `เมื่อ backend พร้อม สามารถแทนส่วนนี้ด้วย signed URL หรือ API download จริงได้ทันที`,
  ].join('\n')

  const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' })
  const blobUrl = window.URL.createObjectURL(blob)
  const link = window.document.createElement('a')
  const fallbackFileName = `${formatSlug(item.title) || `codebazaar-${item.id}`}-package.txt`

  link.href = blobUrl
  link.download = item.fileName || fallbackFileName
  window.document.body.appendChild(link)
  link.click()
  window.document.body.removeChild(link)
  window.URL.revokeObjectURL(blobUrl)
}
