import GoogleIcon from '@mui/icons-material/Google'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { authService } from '@/services/api/auth.service'
import { sellerService } from '@/services/api/seller.service'
import { darkGlassSurfaceSx, uiRadius } from '@/theme/uiTokens'
import type { AuthActionResponse, AuthDialogMode } from '@/types/auth'

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
    description: string
    actionLabel: string
    detail: string
    points: string[]
  }
> = {
  'buyer-login': {
    badge: 'เข้าสู่ระบบด้วย Google',
    title: 'เข้าสู่ระบบด้วย Google เท่านั้น',
    description:
      'หน้าทางเข้าใช้งานถูกออกแบบให้เรียบที่สุดตามโจทย์ โดยตัด social login อื่นออกและเหลือเฉพาะ Google',
    actionLabel: 'เข้าสู่ระบบด้วย Google',
    detail: 'เหมาะกับผู้ซื้อที่ต้องการเข้าถึงรายการโปรเจกต์และประวัติการสั่งซื้ออย่างรวดเร็ว',
    points: ['ไม่ต้องจำรหัสผ่าน', 'พร้อมต่อ OAuth จริง', 'ลดขั้นตอนหน้า login'],
  },
  'buyer-register': {
    badge: 'สมัครสมาชิกด้วย Google',
    title: 'สมัครสมาชิกใหม่ด้วย Google',
    description:
      'สำหรับผู้ใช้ใหม่ที่ต้องการสร้างบัญชีเพื่อซื้อโปรเจกต์ ติดตามอัปเดต และจัดการคำสั่งซื้อ',
    actionLabel: 'สมัครสมาชิกด้วย Google',
    detail: 'โครงสร้างนี้พร้อมต่อ backend เพื่อบันทึกโปรไฟล์ผู้ใช้และประวัติการใช้งานในอนาคต',
    points: ['สมัครสมาชิกได้ในปุ่มเดียว', 'รองรับโปรไฟล์ลูกค้า', 'พร้อมต่อฐานข้อมูลผู้ใช้'],
  },
  'seller-register': {
    badge: 'เปิดบัญชีผู้ขาย',
    title: 'เปิดบัญชีผู้ขายด้วย Google',
    description:
      'ผู้ที่ต้องการขายซอร์สโค้ดหรือเทมเพลตสามารถเริ่มจากบัญชี Google แล้วต่อยอดไปยังขั้นตอนสมัครผู้ขายได้ทันที',
    actionLabel: 'เปิดบัญชีผู้ขาย',
    detail: 'เหมาะกับหน้าสมัครผู้ขาย กรอกข้อมูลร้านค้า และเริ่มลง source code หรือ template เพื่อขาย',
    points: ['เปิดร้านได้ทันที', 'เพิ่มข้อมูลร้านค้าได้ต่อ', 'พร้อมเชื่อม seller API'],
  },
}

export const AuthDialog = ({ open, mode, onClose }: AuthDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState<AuthActionResponse | null>(null)

  useEffect(() => {
    setIsSubmitting(false)
    setResponse(null)
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

      setResponse(nextResponse)

      if (nextResponse.redirectUrl) {
        window.location.assign(nextResponse.redirectUrl)
      }
    } catch (caughtError) {
      setResponse({
        title: 'ดำเนินการไม่สำเร็จ',
        description:
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
            borderRadius: uiRadius.xl,
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.76)',
          },
        },
      }}
    >
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
        <Stack spacing={1.5}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.08em' }}
          >
            {copy.badge}
          </Typography>
          <Typography variant="h4">{copy.title}</Typography>
          <Typography color="text.secondary">{copy.description}</Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3 }}>
        <Stack spacing={2.5}>
          <Box
            sx={{
              p: 2.5,
              borderRadius: uiRadius.md,
              ...darkGlassSurfaceSx,
              boxShadow: 'none',
            }}
          >
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
                <StorefrontRoundedIcon />
                <Typography variant="h6">รองรับ Google เท่านั้น</Typography>
              </Stack>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.74)' }}>{copy.detail}</Typography>
            </Stack>
          </Box>

          <Stack spacing={1.25}>
            {copy.points.map((point) => (
              <Stack key={point} direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
                <InfoOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography color="text.secondary">{point}</Typography>
              </Stack>
            ))}
          </Stack>

          {response ? (
            <Alert severity="info">
              <strong>{response.title}</strong> {response.description}
            </Alert>
          ) : null}

          <Divider />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              disabled={isSubmitting}
              onClick={handleContinue}
            >
              {isSubmitting ? 'กำลังเตรียมการเชื่อมต่อ...' : copy.actionLabel}
            </Button>
            <Button variant="outlined" onClick={onClose}>
              ปิดหน้าต่าง
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
