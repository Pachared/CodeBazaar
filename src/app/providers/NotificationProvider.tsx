import {
  Alert,
  Box,
  Slide,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material'
import type { SlideProps } from '@mui/material'
import { useCallback, useRef, useState } from 'react'
import type { PropsWithChildren, SyntheticEvent } from 'react'
import { NotificationContext } from '@/app/providers/notification-context'
import { accentPalette, softAccentBackground, uiRadius } from '@/theme/uiTokens'
import type { NotificationInput, NotificationSeverity, QueuedNotification } from '@/types/notification'

const SlideDownTransition = (props: SlideProps) => <Slide {...props} direction="down" />

const severityBackgrounds: Record<NotificationSeverity, string> = {
  success: 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(242, 250, 248, 0.94) 100%)',
  info: softAccentBackground,
  warning: 'linear-gradient(180deg, rgba(255, 250, 244, 0.96) 0%, rgba(252, 246, 236, 0.94) 100%)',
  error: 'linear-gradient(180deg, rgba(255, 247, 247, 0.96) 0%, rgba(252, 240, 240, 0.94) 100%)',
}

let notificationId = 0

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const queueRef = useRef<QueuedNotification[]>([])
  const [open, setOpen] = useState(false)
  const [messageInfo, setMessageInfo] = useState<QueuedNotification | null>(null)

  const processQueue = useCallback(() => {
    const nextNotification = queueRef.current.shift()

    if (!nextNotification) {
      return
    }

    setMessageInfo(nextNotification)
    setOpen(true)
  }, [])

  const notify = useCallback((notification: NotificationInput) => {
    notificationId += 1

    queueRef.current.push({
      id: notificationId,
      severity: 'info',
      duration: 3200,
      ...notification,
    })

    if (open) {
      setOpen(false)
      return
    }

    if (!messageInfo) {
      processQueue()
    }
  }, [messageInfo, open, processQueue])

  const handleClose = (_event?: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(null)
    processQueue()
  }

  const severity = messageInfo?.severity ?? 'info'

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        key={messageInfo?.id}
        open={open}
        autoHideDuration={messageInfo?.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        slots={{ transition: SlideDownTransition }}
        slotProps={{ transition: { onExited: handleExited } }}
        sx={{
          top: { xs: 12, sm: 16 },
          left: { xs: 12, sm: '50%' },
          right: { xs: 12, sm: 'auto' },
        }}
      >
        {messageInfo ? (
          <Alert
            elevation={0}
            severity={severity}
            variant="standard"
            onClose={handleClose}
            sx={{
              minWidth: { xs: 'calc(100vw - 24px)', sm: 420 },
              maxWidth: 520,
              borderRadius: uiRadius.lg,
              border: `1px solid ${accentPalette.border}`,
              background: severityBackgrounds[severity],
              backdropFilter: 'blur(20px)',
              boxShadow: '0 18px 46px rgba(15, 15, 16, 0.1)',
              color: 'text.primary',
              alignItems: 'flex-start',
              '& .MuiAlert-icon': {
                mt: 0.25,
              },
              '& .MuiAlert-action': {
                pt: 0.25,
              },
            }}
          >
            <Stack spacing={0.25}>
              {messageInfo.title ? (
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {messageInfo.title}
                </Typography>
              ) : null}
              <Box>{messageInfo.message}</Box>
            </Stack>
          </Alert>
        ) : undefined}
      </Snackbar>
    </NotificationContext.Provider>
  )
}
