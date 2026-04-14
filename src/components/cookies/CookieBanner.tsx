import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useCookieConsent } from '@/app/providers/useCookieConsent'
import { uiRadius } from '@/theme/uiTokens'

export const CookieBanner = () => {
  const {
    hasLoaded,
    isBannerVisible,
    acceptAllCookies,
    acceptNecessaryCookies,
    openSettings,
  } = useCookieConsent()

  if (!hasLoaded || !isBannerVisible) {
    return null
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 24,
        zIndex: 1300,
        px: { xs: 2, sm: 3 },
        pointerEvents: 'none',
      }}
    >
      <Paper
        sx={{
          pointerEvents: 'auto',
          maxWidth: 980,
          mx: 'auto',
          p: { xs: 2, sm: 2.5 },
          borderRadius: uiRadius.xl,
          border: '1px solid rgba(255, 255, 255, 0.84)',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(245,245,248,0.84) 100%)',
          boxShadow: '0 24px 60px rgba(15, 15, 16, 0.14)',
        }}
      >
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={2}
          sx={{ alignItems: { lg: 'center' }, justifyContent: 'space-between' }}
        >
          <Stack spacing={0.6} sx={{ maxWidth: 620 }}>
            <Typography variant="h5">การตั้งค่าคุกกี้</Typography>
            <Typography color="text.secondary">
              เราใช้คุกกี้ที่จำเป็นเพื่อให้เว็บไซต์ทำงานได้ และสามารถเปิดคุกกี้เพิ่มเติมสำหรับการจดจำการใช้งาน วิเคราะห์ข้อมูล และการตลาดได้
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{ flexShrink: 0, width: { xs: '100%', lg: 'auto' } }}
          >
            <Button variant="outlined" onClick={acceptNecessaryCookies}>
              เฉพาะที่จำเป็น
            </Button>
            <Button variant="outlined" onClick={openSettings}>
              ตั้งค่าคุกกี้
            </Button>
            <Button variant="contained" onClick={acceptAllCookies}>
              ยอมรับทั้งหมด
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}
