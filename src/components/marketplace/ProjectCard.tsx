import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useMarketplace } from '@/app/providers/useMarketplace'
import { CartIcon } from '@/components/cart/CartIcon'
import {
  accentGradientDark,
  accentPalette,
  softAccentBackgroundMuted,
  uiRadius,
} from '@/theme/uiTokens'
import type { Product } from '@/types/marketplace'
import { formatCurrency } from '@/utils/formatCurrency'
import { ProjectPreview } from './ProjectPreview'

interface ProjectCardProps {
  product: Product
}

export const ProjectCard = ({ product }: ProjectCardProps) => {
  const { addToCart, buyNow, isInCart } = useMarketplace()
  const alreadyInCart = isInCart(product.id)

  return (
    <Card
      sx={{
        height: '100%',
        overflow: 'hidden',
        border: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.48)',
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2.5}>
            <Stack spacing={2.25} sx={{ flex: 1 }}>
              {product.verified ? (
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  <Chip
                    icon={<VerifiedRoundedIcon />}
                    label="ผู้ขายยืนยันแล้ว"
                    sx={{
                      background: accentGradientDark,
                      color: 'common.white',
                      border: `1px solid ${accentPalette.border}`,
                    }}
                  />
                </Stack>
              ) : null}

              <ProjectPreview product={product} />

              <Box>
                <Typography variant="h4" sx={{ mb: 1, lineHeight: 1.2 }}>
                  {product.title}
                </Typography>
                <Typography color="text.secondary">{product.summary}</Typography>
              </Box>

              <Stack spacing={1}>
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  {product.stack.map((stack) => (
                    <Chip key={stack} label={stack} />
                  ))}
                </Stack>
              </Stack>
            </Stack>

            <Paper
              sx={{
                minWidth: { lg: 270 },
                width: { xs: '100%', lg: 270 },
                p: 2.25,
                borderRadius: uiRadius.lg,
                display: 'flex',
                flexDirection: 'column',
                background: softAccentBackgroundMuted,
                border: `1px solid ${accentPalette.border}`,
                boxShadow: 'none',
              }}
            >
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    ราคาเริ่มต้น
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 0.5 }}>
                    {formatCurrency(product.price)}
                  </Typography>
                </Box>

                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      หมวดหมู่
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {product.category}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      ผู้ขาย
                    </Typography>
                    <Typography
                      component={RouterLink}
                      to={`/sellers/${product.authorSlug}`}
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                          color: accentPalette.text,
                        },
                      }}
                    >
                      {product.authorName}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      คะแนนรีวิว
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {product.rating.toFixed(1)}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      ยอดขาย
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {product.sales} รายการ
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      การจัดส่ง
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {product.delivery}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      ไลเซนส์
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {product.license}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Stack spacing={1.25} sx={{ mt: 'auto', pt: 2.5 }}>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={`/products/${product.id}`}
                  endIcon={<ArrowOutwardRoundedIcon />}
                >
                  ดูรายละเอียด
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CartIcon />}
                  onClick={() => addToCart(product)}
                  disabled={alreadyInCart}
                >
                  {alreadyInCart ? 'อยู่ในตะกร้าแล้ว' : 'ใส่ตะกร้า'}
                </Button>
                <Button
                  variant="contained"
                  endIcon={<BoltRoundedIcon />}
                  onClick={() => buyNow(product)}
                >
                  ซื้อเลย
                </Button>
              </Stack>
            </Paper>
          </Stack>

          <Divider />

          <Stack spacing={1.5}>
            <Typography variant="body2" color="text.secondary">
              โดย{' '}
              <Box
                component={RouterLink}
                to={`/sellers/${product.authorSlug}`}
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                    color: accentPalette.text,
                  },
                }}
              >
                {product.authorName}
              </Box>
              {' '}• {product.updatedAt}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
