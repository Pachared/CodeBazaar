import GoogleIcon from '@mui/icons-material/Google'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom'
import { useMarketplace } from '@/app/providers/useMarketplace'
import { AuthDialog } from '@/components/auth/AuthDialog'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { uiRadius } from '@/theme/uiTokens'
import type { AuthDialogMode } from '@/types/auth'

export interface MainLayoutOutletContext {
  openAuthDialog: (mode: AuthDialogMode) => void
}

export const MainLayout = () => {
  const location = useLocation()
  const { cartCount, isCartOpen, openCart, closeCart } = useMarketplace()
  const [authDialogMode, setAuthDialogMode] = useState<AuthDialogMode | null>(null)

  const handleOpenAuthDialog = (mode: AuthDialogMode) => {
    setAuthDialogMode(mode)
  }

  const handleCloseAuthDialog = () => {
    setAuthDialogMode(null)
  }

  const handleCheckout = () => {
    closeCart()
    handleOpenAuthDialog('buyer-login')
  }

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
                  position: 'relative',
                }}
              >
                <LocalMallOutlinedIcon sx={{ fontSize: 27 }} />
                {cartCount > 0 ? (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 7,
                      right: 7,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#111111',
                    }}
                  />
                ) : null}
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
          borderTop: '1px solid rgba(255, 255, 255, 0.72)',
          py: 4,
          mt: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.52)',
          backdropFilter: 'blur(22px)',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              มาร์เก็ตเพลสภาษาไทยสำหรับซื้อขายซอร์สโค้ดและเทมเพลตในโทนขาวดำแบบ glass minimal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              รองรับทั้งฝั่งผู้ซื้อที่ต้องการเลือกโปรเจกต์ และฝั่งผู้ขายที่ต้องการเปิดร้านลงสินค้า
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
          <Typography variant="body2" color="text.secondary">
            แยกโครงสร้างหน้า คอมโพเนนต์ และ service layer ไว้พร้อมสำหรับเชื่อม API เพิ่มระบบขาย และต่อยอด checkout จริง
          </Typography>
        </Container>
      </Box>

      <CartDrawer open={isCartOpen} onClose={closeCart} onCheckout={handleCheckout} />
      <AuthDialog open={Boolean(authDialogMode)} mode={authDialogMode} onClose={handleCloseAuthDialog} />
    </Box>
  )
}
