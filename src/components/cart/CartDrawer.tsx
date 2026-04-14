import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import {
  Box,
  Button,
  Chip,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useMarketplace } from '@/app/providers/useMarketplace'
import { uiRadius } from '@/theme/uiTokens'
import { formatCurrency } from '@/utils/formatCurrency'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  onCheckout: () => void
}

export const CartDrawer = ({ open, onClose, onCheckout }: CartDrawerProps) => {
  const { cartItems, cartTotal, removeFromCart, clearCart } = useMarketplace()
  const hasItems = cartItems.length > 0

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 420 },
            backgroundColor: 'rgba(248, 248, 250, 0.9)',
            backdropFilter: 'blur(28px)',
          },
        },
      }}
    >
      <Stack sx={{ height: '100%' }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            px: 3,
            py: 2.5,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
          }}
        >
          <Box>
            <Typography variant="h5">ตะกร้าของคุณ</Typography>
            <Typography color="text.secondary">
              รวมรายการซอร์สโค้ดและเทมเพลตที่พร้อมสั่งซื้อ
            </Typography>
          </Box>
          <IconButton onClick={onClose} aria-label="ปิดตะกร้า">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 2.5 }}>
          {hasItems ? (
            <Stack spacing={1.5}>
              {cartItems.map((item) => (
                <Paper
                  key={item.id}
                  sx={{
                    p: 2,
                    borderRadius: uiRadius.lg,
                  }}
                >
                  <Stack spacing={1.5}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
                    >
                      <Box>
                        <Typography variant="h6" sx={{ lineHeight: 1.35 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          โดย {item.authorName}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`ลบ ${item.title}`}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </Stack>

                    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                      <Chip label={item.category} />
                      <Chip label={item.license} variant="outlined" />
                    </Stack>

                    <Typography variant="h6">{formatCurrency(item.price)}</Typography>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          ) : (
            <Paper
              sx={{
                p: 3,
                borderRadius: uiRadius.lg,
                textAlign: 'center',
              }}
            >
              <Stack spacing={1.25} sx={{ alignItems: 'center' }}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 38, color: 'text.secondary' }} />
                <Typography variant="h6">ยังไม่มีสินค้าในตะกร้า</Typography>
                <Typography color="text.secondary">
                  กดปุ่มใส่ตะกร้าจากรายการโปรเจกต์เพื่อเก็บไว้เปรียบเทียบหรือสั่งซื้อภายหลัง
                </Typography>
              </Stack>
            </Paper>
          )}
        </Box>

        <Box sx={{ px: 3, py: 2.5, borderTop: '1px solid rgba(17, 17, 17, 0.08)' }}>
          <Stack spacing={1.5}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="text.secondary">รวมทั้งหมด</Typography>
              <Typography variant="h5">{formatCurrency(cartTotal)}</Typography>
            </Stack>

            <Button
              variant="contained"
              fullWidth
              endIcon={<ArrowForwardRoundedIcon />}
              disabled={!hasItems}
              onClick={onCheckout}
            >
              เข้าสู่ระบบเพื่อสั่งซื้อ
            </Button>
            <Button variant="outlined" fullWidth disabled={!hasItems} onClick={clearCart}>
              ล้างตะกร้า
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Drawer>
  )
}
