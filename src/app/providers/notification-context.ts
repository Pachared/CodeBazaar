import { createContext } from 'react'
import type { NotificationInput } from '@/types/notification'

export interface NotificationContextValue {
  notify: (notification: NotificationInput) => void
}

export const NotificationContext = createContext<NotificationContextValue | null>(null)
