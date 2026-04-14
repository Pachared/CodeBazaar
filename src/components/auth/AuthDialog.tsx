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
import { uiRadius } from '@/theme/uiTokens'
import type { AuthDialogMode } from '@/types/auth'

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
    badge: 'เปิดบัญชีผู้ขาย',
    title: 'สมัครผู้ขาย',
    helperText: 'ใช้บัญชี Google เพื่อเริ่มต้นเปิดบัญชีสำหรับลงขาย',
    actionLabel: 'เปิดบัญชีผู้ขาย',
    loadingLabel: 'กำลังเปิดบัญชีผู้ขาย...',
  },
}

export const AuthDialog = ({ open, mode, onClose }: AuthDialogProps) => {
  const { signIn } = useAuth()
  const { notify } = useNotification()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsSubmitting(false)
  }, [mode, open])

  if (!mode) {
    return null
  }

  const copy = dialogCopy[mode]

  const handleContinue = async () => {
    setIsSubmitting(true)

    try {
      const nextResponse =
        mode === 'seller-register'
          ? await sellerService.openSellerAccount()
          : await authService.startGoogleAuth(mode === 'buyer-login' ? 'login' : 'register')

      if (nextResponse.session) {
        signIn(nextResponse.session)
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
            border: '1px solid rgba(255, 255, 255, 0.82)',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(244, 244, 247, 0.84) 100%)',
            boxShadow: '0 28px 70px rgba(15, 15, 16, 0.14)',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at top left, rgba(255,255,255,0.88), transparent 34%), radial-gradient(circle at bottom right, rgba(17,17,17,0.04), transparent 32%)',
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
                  background: 'linear-gradient(180deg, #111111 0%, #34343a 100%)',
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
              border: '1px solid rgba(255, 255, 255, 0.82)',
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.74) 0%, rgba(250, 250, 252, 0.62) 100%)',
              backdropFilter: 'blur(18px)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.86)',
            }}
          >
            <Stack spacing={2.25} sx={{ alignItems: 'center', textAlign: 'center' }}>
              <Stack spacing={0.6}>
                <Typography variant="h4">{copy.title}</Typography>
                <Typography color="text.secondary">{copy.helperText}</Typography>
              </Stack>

              <Button
                variant="contained"
                fullWidth
                startIcon={<GoogleIcon />}
                disabled={isSubmitting}
                onClick={handleContinue}
                sx={{
                  minHeight: 56,
                  borderRadius: uiRadius.lg,
                  boxShadow: '0 18px 30px rgba(17, 17, 17, 0.16)',
                }}
              >
                {isSubmitting ? copy.loadingLabel : copy.actionLabel}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
