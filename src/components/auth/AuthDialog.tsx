import GoogleIcon from '@mui/icons-material/Google'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuth } from '@/app/providers/useAuth'
import { useNotification } from '@/app/providers/useNotification'
import { CloseActionButton } from '@/components/common/CloseActionButton'
import { authService } from '@/services/api/auth.service'
import { sellerService } from '@/services/api/seller.service'
import {
  accentGradientDark,
  accentPalette,
  softAccentBackground,
  softAccentBackgroundMuted,
  uiRadius,
} from '@/theme/uiTokens'
import type { AuthDialogMode } from '@/types/auth'
import { getGoogleClientId, saveGoogleClientId } from '@/utils/googleClientId'

interface AuthDialogProps {
  open: boolean
  mode: AuthDialogMode | null
  onClose: () => void
}

const dialogCopy: Record<
  AuthDialogMode,
  {
    badge: string
    title: string
    helperText: string
    actionLabel: string
    loadingLabel: string
  }
> = {
  'buyer-login': {
    badge: 'เข้าสู่ระบบด้วย Google',
    title: 'เข้าสู่ระบบ',
    helperText: 'ใช้บัญชี Google เพื่อเข้าใช้งานบัญชีของคุณ',
    actionLabel: 'เข้าสู่ระบบด้วย Google',
    loadingLabel: 'กำลังเข้าสู่ระบบ...',
  },
  'buyer-register': {
    badge: 'สมัครสมาชิกด้วย Google',
    title: 'สมัครสมาชิก',
    helperText: 'ใช้บัญชี Google เพื่อสร้างบัญชีผู้ใช้งานใหม่',
    actionLabel: 'สมัครสมาชิกด้วย Google',
    loadingLabel: 'กำลังเตรียมการสมัคร...',
  },
  'seller-register': {
    badge: 'เปิดใช้งานบัญชีผู้ขาย',
    title: 'สมัครผู้ขาย',
    helperText:
      'ยืนยันตัวตนด้วย Google แล้วอัปเกรดบัญชีนี้เป็นผู้ขาย เพื่อเปิดร้านและเริ่มลงขายสินค้าได้ทันที',
    actionLabel: 'ยืนยันและเปิดบัญชีผู้ขาย',
    loadingLabel: 'กำลังเปิดบัญชีผู้ขาย...',
  },
}

export const AuthDialog = ({ open, mode, onClose }: AuthDialogProps) => {
  const { signIn, user } = useAuth()
  const { notify } = useNotification()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [googleClientId, setGoogleClientId] = useState(() => getGoogleClientId())

  useEffect(() => {
    setIsSubmitting(false)
    setGoogleClientId(getGoogleClientId())
  }, [mode, open])

  if (!mode) {
    return null
  }

  const copy = dialogCopy[mode]
  const actionIcon = mode === 'seller-register' ? <StorefrontRoundedIcon /> : <GoogleIcon />
  const requiresGoogleClientId = mode !== 'seller-register' || !user
  const isGoogleAuthReady = !requiresGoogleClientId || Boolean(googleClientId)
  const { actionLabel, loadingLabel } = copy

  const handleSetGoogleClientId = () => {
    const nextValue = window.prompt('วาง Google Client ID สำหรับโปรเจกต์นี้', googleClientId)

    if (!nextValue) {
      return
    }

    saveGoogleClientId(nextValue)
    const resolvedValue = getGoogleClientId()
    setGoogleClientId(resolvedValue)

    notify({
      severity: 'success',
      title: 'บันทึก Google Client ID แล้ว',
      message: 'ตอนนี้คุณสามารถกดเข้าสู่ระบบหรือสมัครสมาชิกด้วย Google ต่อได้ทันที',
    })
  }

  const handleContinue = async () => {
    setIsSubmitting(true)

    try {
      if (mode === 'seller-register') {
        if (!user) {
          const authResponse = await authService.startGoogleAuth('register')

          if (!authResponse.session || !authResponse.sessionToken || !authResponse.sessionExpiresAt) {
            throw new Error('ไม่พบ session จาก Google login')
          }

          signIn(authResponse.session, authResponse.sessionToken, authResponse.sessionExpiresAt)
        }

        const sellerResponse = await sellerService.openSellerAccount()

        if (sellerResponse.session) {
          signIn(sellerResponse.session)
        }

        notify({
          severity: 'success',
          title: sellerResponse.title,
          message: sellerResponse.description,
        })
        onClose()
        return
      }

      const nextResponse = await authService.startGoogleAuth(
        mode === 'buyer-login' ? 'login' : 'register',
      )

      if (nextResponse.session && nextResponse.sessionToken && nextResponse.sessionExpiresAt) {
        signIn(nextResponse.session, nextResponse.sessionToken, nextResponse.sessionExpiresAt)
        notify({
          severity: 'success',
          title: nextResponse.title,
          message: nextResponse.description,
        })
        onClose()
        return
      }

      if (nextResponse.redirectUrl) {
        window.location.assign(nextResponse.redirectUrl)
        return
      }

      notify({
        severity: 'info',
        title: nextResponse.title,
        message: nextResponse.description,
      })
    } catch (caughtError) {
      notify({
        severity: 'error',
        title: 'ดำเนินการไม่สำเร็จ',
        message:
          caughtError instanceof Error
            ? caughtError.message
            : 'ไม่สามารถเชื่อมต่อระบบยืนยันตัวตนได้',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            position: 'relative',
            borderRadius: uiRadius.xl,
            overflow: 'hidden',
            border: `1px solid ${accentPalette.border}`,
            background: softAccentBackground,
            boxShadow: '0 28px 70px rgba(15, 15, 16, 0.14)',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at top left, rgba(255,255,255,0.88), transparent 34%), radial-gradient(circle at bottom right, rgba(111,124,255,0.12), transparent 32%)',
              pointerEvents: 'none',
            },
          },
        },
      }}
    >
      <DialogTitle sx={{ position: 'relative', px: 3, pt: 3, pb: 2.25 }}>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.04em' }}
            >
              {copy.badge}
            </Typography>
            <CloseActionButton ariaLabel="ปิดหน้าต่าง" onClick={onClose} />
          </Stack>

          <Box
            sx={{
              px: { xs: 0.5, sm: 0.75 },
              pt: 0.5,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'left' }}
            >
              <Box
                sx={{
                  width: 88,
                  height: 88,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: uiRadius.lg,
                  background: accentGradientDark,
                  color: 'common.white',
                  boxShadow: '0 18px 48px rgba(17, 17, 17, 0.18)',
                  flexShrink: 0,
                }}
              >
                <StorefrontRoundedIcon sx={{ fontSize: 40 }} />
              </Box>
              <Stack spacing={0.35}>
                <Typography variant="h3" sx={{ lineHeight: 1.05 }}>
                  โค้ดบาซาร์
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                  ตลาดขายซอร์สโค้ดและเทมเพลต
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ position: 'relative', px: 3, pb: 3 }}>
        <Stack spacing={2.25}>
          <Box
            sx={{
              p: { xs: 2, sm: 2.4 },
              borderRadius: uiRadius.xl,
              border: `1px solid ${accentPalette.border}`,
              background: softAccentBackgroundMuted,
              backdropFilter: 'blur(18px)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.86)',
            }}
          >
            <Stack spacing={2.25} sx={{ alignItems: 'center', textAlign: 'center' }}>
              <Stack spacing={0.6}>
                <Typography variant="h4">{copy.title}</Typography>
                <Typography color="text.secondary">{copy.helperText}</Typography>
                {!isGoogleAuthReady ? (
                  <Stack spacing={1.1} sx={{ alignItems: 'center' }}>
                    <Typography color="text.secondary" sx={{ fontSize: '0.95rem' }}>
                      ตอนนี้ runtime ของโปรเจกต์นี้ยังไม่พบค่า
                      {' '}
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        VITE_GOOGLE_CLIENT_ID
                      </Box>
                      {' '}
                      คุณสามารถเพิ่มใน
                      {' '}
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        .env.local
                      </Box>
                      {' '}
                      แล้วรีสตาร์ต dev server หรือกดตั้งค่าที่นี่ชั่วคราวได้เลย
                    </Typography>
                    <Button variant="outlined" onClick={handleSetGoogleClientId}>
                      ตั้งค่า Google Client ID
                    </Button>
                  </Stack>
                ) : null}
              </Stack>

              <Button
                variant="contained"
                fullWidth
                startIcon={actionIcon}
                disabled={isSubmitting || !isGoogleAuthReady}
                onClick={handleContinue}
                sx={{
                  minHeight: 56,
                  borderRadius: uiRadius.lg,
                  boxShadow: '0 18px 30px rgba(17, 17, 17, 0.16)',
                }}
              >
                {isSubmitting ? loadingLabel : actionLabel}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
