export type NotificationSeverity = 'success' | 'info' | 'warning' | 'error'

export interface NotificationInput {
  title?: string
  message: string
  severity?: NotificationSeverity
  duration?: number
}

export interface QueuedNotification extends NotificationInput {
  id: number
}
