import { useEffect, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { DownloadLibraryContext } from '@/app/providers/download-library-context'
import { hasRemoteApi } from '@/config/env'
import { downloadsService } from '@/services/api/downloads.service'
import { useAuth } from '@/app/providers/useAuth'
import { useNotification } from '@/app/providers/useNotification'
import type { CompletedDownloadOrderInput, DownloadLibraryItem } from '@/types/downloads'
import {
  createMockDownloadFile,
  readStoredDownloadLibrary,
  saveStoredDownloadLibrary,
} from '@/utils/downloadLibrary'

const createLibraryItem = (
  order: CompletedDownloadOrderInput,
  item: CompletedDownloadOrderInput['items'][number],
): DownloadLibraryItem => {
  const purchasedAt = order.purchasedAt ?? new Date().toISOString()
  const normalizedFileStem = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return {
    ...item,
    libraryItemId: `${order.orderId}-${item.id}`,
    orderId: order.orderId,
    purchasedAt,
    paymentMethod: order.paymentMethod,
    status: 'ready',
    versionLabel: 'เวอร์ชันล่าสุด',
    fileName: `${normalizedFileStem || `codebazaar-${item.id}`}-package.txt`,
    fileSizeLabel: `${Math.max(6, Math.round(item.price / 170))} MB`,
    downloadsCount: 0,
    lastDownloadedAt: null,
  }
}

export const DownloadsProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth()
  const { notify } = useNotification()
  const [libraryByUser, setLibraryByUser] = useState(() => readStoredDownloadLibrary())
  const [remoteItems, setRemoteItems] = useState<DownloadLibraryItem[]>([])
  const [loadedUserKey, setLoadedUserKey] = useState<string | null>(null)

  const userKey = user?.id ?? null
  const localItems = useMemo(
    () =>
      userKey
        ? [...(libraryByUser[userKey] ?? [])].sort(
            (left, right) =>
              new Date(right.purchasedAt).getTime() - new Date(left.purchasedAt).getTime(),
          )
        : [],
    [libraryByUser, userKey],
  )
  const items = hasRemoteApi ? (userKey && loadedUserKey === userKey ? remoteItems : []) : localItems
  const hasLoaded = !hasRemoteApi || !userKey || loadedUserKey === userKey
  const totalSpent = items.reduce((total, item) => total + item.price, 0)

  const commitLibrary = (
    createNextState: (currentState: Record<string, DownloadLibraryItem[]>) => Record<
      string,
      DownloadLibraryItem[]
    >,
  ) => {
    setLibraryByUser((currentState) => {
      const nextState = createNextState(currentState)
      saveStoredDownloadLibrary(nextState)
      return nextState
    })
  }

  const addCompletedOrderToLibrary = (order: CompletedDownloadOrderInput) => {
    if (!userKey || order.items.length === 0) {
      return
    }

    if (hasRemoteApi) {
      void downloadsService
        .getDownloads()
        .then((nextItems) => {
          setRemoteItems(nextItems)
          setLoadedUserKey(userKey)
        })
        .catch(() => {
          setLoadedUserKey(userKey)
        })
      return
    }

    commitLibrary((currentState) => {
      const currentItems = currentState[userKey] ?? []
      const nextItems = [...currentItems]

      order.items.forEach((item) => {
        const nextItem = createLibraryItem(order, item)
        const existingIndex = nextItems.findIndex((libraryItem) => libraryItem.id === item.id)

        if (existingIndex >= 0) {
          nextItems[existingIndex] = {
            ...nextItems[existingIndex],
            ...nextItem,
            downloadsCount: nextItems[existingIndex].downloadsCount,
            lastDownloadedAt: nextItems[existingIndex].lastDownloadedAt,
          }
          return
        }

        nextItems.push(nextItem)
      })

      return {
        ...currentState,
        [userKey]: nextItems,
      }
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
        message: 'ลองรีเฟรชหน้าแล้วกดดาวน์โหลดอีกครั้ง',
      })
      return
    }

    createMockDownloadFile(targetItem)

    const downloadedAt = new Date().toISOString()

    if (hasRemoteApi) {
      void downloadsService
        .markDownloaded(libraryItemId)
        .then(() => downloadsService.getDownloads())
        .then((nextItems) => {
          setRemoteItems(nextItems)
          setLoadedUserKey(userKey)
        })
        .catch((error) => {
          notify({
            severity: 'error',
            title: 'อัปเดตสถานะดาวน์โหลดไม่สำเร็จ',
            message:
              error instanceof Error ? error.message : 'ลองดาวน์โหลดใหม่อีกครั้งในภายหลัง',
          })
        })
    }

    if (!hasRemoteApi) {
      commitLibrary((currentState) => ({
        ...currentState,
        [userKey]: (currentState[userKey] ?? []).map((item) =>
          item.libraryItemId === libraryItemId
            ? {
                ...item,
                downloadsCount: item.downloadsCount + 1,
                lastDownloadedAt: downloadedAt,
              }
            : item,
        ),
      }))
    }

    notify({
      severity: 'success',
      title: 'เริ่มดาวน์โหลดแล้ว',
      message: `${targetItem.title} ถูกส่งออกเป็นไฟล์ทดลองในเครื่องเรียบร้อยแล้ว`,
    })
  }

  useEffect(() => {
    if (!hasRemoteApi || !userKey || loadedUserKey === userKey) {
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
  }, [loadedUserKey, userKey])

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
