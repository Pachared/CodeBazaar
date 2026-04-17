import { useEffect, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { DownloadLibraryContext } from '@/app/providers/download-library-context'
import { useAuth } from '@/app/providers/useAuth'
import { useNotification } from '@/app/providers/useNotification'
import { hasRemoteApi } from '@/config/env'
import { downloadsService } from '@/services/api/downloads.service'
import type { CompletedDownloadOrderInput, DownloadLibraryItem } from '@/types/downloads'

export const DownloadsProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth()
  const { notify } = useNotification()
  const [remoteItems, setRemoteItems] = useState<DownloadLibraryItem[]>([])
  const [loadedUserKey, setLoadedUserKey] = useState<string | null>(null)

  const userKey = user?.id ?? null
  const shouldUseRemoteLibrary = hasRemoteApi && Boolean(userKey)
  const items = useMemo(
    () =>
      userKey && loadedUserKey === userKey
        ? [...remoteItems].sort(
            (left, right) =>
              new Date(right.purchasedAt).getTime() - new Date(left.purchasedAt).getTime(),
          )
        : [],
    [loadedUserKey, remoteItems, userKey],
  )
  const hasLoaded = !shouldUseRemoteLibrary || !userKey || loadedUserKey === userKey
  const totalSpent = items.reduce((total, item) => total + item.price, 0)

  const addCompletedOrderToLibrary = (order: CompletedDownloadOrderInput) => {
    if (!userKey || order.items.length === 0 || !shouldUseRemoteLibrary) {
      return
    }

    void downloadsService
      .getDownloads()
      .then((nextItems) => {
        setRemoteItems(nextItems)
        setLoadedUserKey(userKey)
      })
      .catch(() => {
        setLoadedUserKey(userKey)
      })
  }

  const downloadItem = (libraryItemId: string) => {
    if (!userKey) {
      return
    }

    const targetItem = items.find((item) => item.libraryItemId === libraryItemId)

    if (!targetItem) {
      notify({
        severity: 'error',
        title: 'ไม่พบไฟล์ดาวน์โหลด',
        message: 'ลองรีเฟรชหน้าแล้วกดยืนยันสิทธิ์ดาวน์โหลดอีกครั้ง',
      })
      return
    }

    if (!shouldUseRemoteLibrary) {
      notify({
        severity: 'error',
        title: 'ยังไม่พร้อมดาวน์โหลด',
        message: 'ระบบนี้ต้องเชื่อมต่อ API จริงก่อนจึงจะตรวจสิทธิ์ดาวน์โหลดได้',
      })
      return
    }

    void downloadsService
      .markDownloaded(libraryItemId)
      .then((message) =>
        downloadsService.getDownloads().then((nextItems) => {
          setRemoteItems(nextItems)
          setLoadedUserKey(userKey)
          notify({
            severity: 'success',
            title: message?.title || 'ยืนยันสิทธิ์ดาวน์โหลดแล้ว',
            message:
              message?.description ||
              `${targetItem.title} ถูกบันทึกสิทธิ์ดาวน์โหลดไว้เรียบร้อยแล้ว`,
          })
        }),
      )
      .catch((error) => {
        notify({
          severity: 'error',
          title: 'ยืนยันสิทธิ์ดาวน์โหลดไม่สำเร็จ',
          message:
            error instanceof Error ? error.message : 'ลองดาวน์โหลดใหม่อีกครั้งในภายหลัง',
        })
      })
  }

  useEffect(() => {
    if (!shouldUseRemoteLibrary || !userKey || loadedUserKey === userKey) {
      return
    }

    const controller = new AbortController()

    void downloadsService
      .getDownloads(controller.signal)
      .then((nextItems) => {
        if (!controller.signal.aborted) {
          setRemoteItems(nextItems)
          setLoadedUserKey(userKey)
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setRemoteItems([])
          setLoadedUserKey(userKey)
        }
      })

    return () => controller.abort()
  }, [loadedUserKey, shouldUseRemoteLibrary, userKey])

  return (
    <DownloadLibraryContext.Provider
      value={{
        items,
        totalSpent,
        hasLoaded,
        addCompletedOrderToLibrary,
        downloadItem,
      }}
    >
      {children}
    </DownloadLibraryContext.Provider>
  )
}
