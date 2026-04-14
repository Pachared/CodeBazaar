import GoogleIcon from '@mui/icons-material/Google'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/app/providers/useAuth'
import { useMarketplace } from '@/app/providers/useMarketplace'
import { useNotification } from '@/app/providers/useNotification'
import { AuthDialog } from '@/components/auth/AuthDialog'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { CartIcon } from '@/components/cart/CartIcon'
import { ProfileAvatar } from '@/components/common/ProfileAvatar'
import { CookieBanner } from '@/components/cookies/CookieBanner'
import { CookieSettingsDialog } from '@/components/cookies/CookieSettingsDialog'
import { useCookieConsent } from '@/app/providers/useCookieConsent'
import { uiRadius } from '@/theme/uiTokens'
import type { AuthDialogMode } from '@/types/auth'

export interface MainLayoutOutletContext {
  openAuthDialog: (mode: AuthDialogMode) => void
}

export const MainLayout = () => {
  const location = useLocation()
  const { cartCount, isCartOpen, openCart, closeCart } = useMarketplace()
  const { user, isAuthenticated } = useAuth()
  const { notify } = useNotification()
  const { openSettings } = useCookieConsent()
  const [authDialogMode, setAuthDialogMode] = useState<AuthDialogMode | null>(null)

  const handleOpenAuthDialog = (mode: AuthDialogMode) => {
    setAuthDialogMode(mode)
  }

  const handleCloseAuthDialog = () => {
    setAuthDialogMode(null)
  }

  const handleCheckout = () => {
    closeCart()

    if (!isAuthenticated) {
      handleOpenAuthDialog('buyer-login')
      notify({
        severity: 'info',
        title: 'กรุณาเข้าสู่ระบบก่อนสั่งซื้อ',
        message: 'เข้าสู่ระบบด้วย Google ก่อนเพื่อดำเนินการสั่งซื้อและจัดการคำสั่งซื้อของคุณ',
      })
    }
  }

  const currentYear = new Date().getFullYear()
  const accountLabel = user?.role === 'seller' ? 'บัญชีผู้ขายทดลอง' : 'บัญชีผู้ใช้ทดลอง'
  const isProfileRoute = location.pathname === '/profile'

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: 'blur(28px)',
          backgroundColor: 'rgba(250, 250, 252, 0.7)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.74)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2, py: 1.5 }}>
            <Stack
              component={RouterLink}
              to="/"
              direction="row"
              spacing={1.5}
              sx={{
                flexGrow: 1,
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: uiRadius.sm,
                  background: 'linear-gradient(180deg, #111111 0%, #3b3b40 100%)',
                  boxShadow: '0 24px 44px rgba(17, 17, 17, 0.18)',
                }}
              >
                <StorefrontRoundedIcon sx={{ color: 'common.white' }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ lineHeight: 1 }}>
                  โค้ดบาซาร์
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ตลาดขายซอร์สโค้ดและเทมเพลต
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}
            >
              {isAuthenticated && user ? (
                <Button
                  component={RouterLink}
                  to="/profile"
                  variant={isProfileRoute ? 'contained' : 'outlined'}
                  endIcon={<SettingsRoundedIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    px: 2.25,
                    py: 0,
                    minWidth: 0,
                    width: 'fit-content',
                    height: 46,
                    minHeight: 46,
                    maxHeight: 46,
                    gap: 1,
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    textDecoration: 'none',
                  }}
                >
                  <ProfileAvatar
                    name={user.name}
                    size={28}
                    sx={{ flexShrink: 0 }}
                  />
                  <Stack
                    spacing={0}
                    sx={{ alignItems: 'flex-end', lineHeight: 1 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, fontSize: '0.84rem', lineHeight: 1 }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ fontSize: '0.66rem', lineHeight: 1 }}
                      color={isProfileRoute ? 'rgba(255, 255, 255, 0.78)' : 'text.secondary'}
                    >
                      {accountLabel}
                    </Typography>
                  </Stack>
                </Button>
              ) : (
                <>
                  <Button
                    variant="text"
                    startIcon={<GoogleIcon />}
                    sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                    onClick={() => handleOpenAuthDialog('buyer-login')}
                  >
                    เข้าสู่ระบบ
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                    onClick={() => handleOpenAuthDialog('buyer-register')}
                  >
                    สมัครสมาชิก
                  </Button>
                </>
              )}
              <Button
                variant={location.pathname === '/seller' ? 'contained' : 'outlined'}
                startIcon={<StorefrontRoundedIcon />}
                component={RouterLink}
                to="/seller"
              >
                ศูนย์ผู้ขาย
              </Button>
              <IconButton
                onClick={openCart}
                aria-label="เปิดตะกร้า"
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: uiRadius.sm,
                  color: '#4a4a4d',
                  backgroundColor: 'transparent',
                }}
              >
                <Badge
                  badgeContent={cartCount}
                  color="primary"
                  max={99}
                  sx={{
                    '& .MuiBadge-badge': {
                      minWidth: 18,
                      height: 18,
                      px: 0.5,
                      borderRadius: uiRadius.pill,
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      top: 6,
                      right: 4,
                    },
                  }}
                >
                  <CartIcon sx={{ fontSize: 27 }} />
                </Badge>
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flex: 1 }}>
        <Outlet context={{ openAuthDialog: handleOpenAuthDialog }} />
      </Box>

      <Box
        component="footer"
        sx={{
          mt: 8,
          pb: { xs: 4, md: 5 },
        }}
      >
        <Container maxWidth="lg">
          <Paper
            sx={{
              p: { xs: 3, md: 3.5 },
              borderRadius: uiRadius.xl,
              border: '1px solid rgba(255, 255, 255, 0.84)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(245,245,248,0.78) 100%)',
              boxShadow: '0 18px 44px rgba(15, 15, 16, 0.06)',
            }}
          >
            <Stack spacing={2.5}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: uiRadius.md,
                    background: 'linear-gradient(180deg, #111111 0%, #3b3b40 100%)',
                    boxShadow: '0 20px 40px rgba(17, 17, 17, 0.14)',
                  }}
                >
                  <StorefrontRoundedIcon sx={{ color: 'common.white' }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ lineHeight: 1.05 }}>
                    โค้ดบาซาร์
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    ตลาดขายซอร์สโค้ดและเทมเพลต
                  </Typography>
                </Box>
              </Stack>

              <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
                CodeBazaar คือระบบ marketplace สำหรับรวม source code, template และโครงงานพร้อมใช้
                ไว้ในที่เดียว โดยออกแบบให้ผู้ซื้อค้นหา เปรียบเทียบ และเลือกซื้อโปรเจกต์ได้ง่าย
                ขณะเดียวกันก็รองรับผู้ขายที่ต้องการเปิดร้าน จัดหมวดหมู่ ตั้งราคา และต่อยอดไปสู่ระบบขายจริงในอนาคต
              </Typography>

              <Divider />

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.25}
                sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}
              >
                <Typography variant="body2" color="text.secondary">
                  © {currentYear} CodeBazaar. ระบบซื้อขายซอร์สโค้ด เทมเพลต และไฟล์ดิจิทัล
                </Typography>
                <Button
                  variant="outlined"
                  onClick={openSettings}
                  sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
                >
                  ตั้งค่าคุกกี้
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Container>
      </Box>

      <CartDrawer open={isCartOpen} onClose={closeCart} onCheckout={handleCheckout} />
      <CookieBanner />
      <CookieSettingsDialog />
      <AuthDialog
        open={Boolean(authDialogMode)}
        mode={authDialogMode}
        onClose={handleCloseAuthDialog}
      />
    </Box>
  )
}
