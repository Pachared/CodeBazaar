import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import GradeRoundedIcon from '@mui/icons-material/GradeRounded'
import SellRoundedIcon from '@mui/icons-material/SellRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useMarketplace } from '@/app/providers/useMarketplace'
import { uiRadius } from '@/theme/uiTokens'
import type { Product } from '@/types/marketplace'
import { formatCurrency } from '@/utils/formatCurrency'
import { ProjectPreview } from './ProjectPreview'
import { ProjectStatItem } from './ProjectStatItem'

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
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2.5}>
            <Stack spacing={2.25} sx={{ flex: 1 }}>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}
              >
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  <Chip label={product.category} />
                  {product.verified ? (
                    <Chip
                      icon={<VerifiedRoundedIcon />}
                      label="ผู้ขายยืนยันแล้ว"
                      sx={{ backgroundColor: '#111111', color: 'common.white' }}
                    />
                  ) : null}
                </Stack>
              </Stack>

              <ProjectPreview product={product} />

              <Box>
                <Typography variant="h4" sx={{ mb: 1, lineHeight: 1.2 }}>
                  {product.title}
                </Typography>
                <Typography color="text.secondary">{product.summary}</Typography>
              </Box>

              <Grid container spacing={1.5}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <ProjectStatItem
                    icon={<GradeRoundedIcon fontSize="small" />}
                    label="คะแนนรีวิว"
                    value={product.rating.toFixed(1)}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <ProjectStatItem
                    icon={<SellRoundedIcon fontSize="small" />}
                    label="ยอดขาย"
                    value={`${product.sales} รายการ`}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <ProjectStatItem
                    icon={<DownloadRoundedIcon fontSize="small" />}
                    label="การจัดส่ง"
                    value={product.delivery}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <ProjectStatItem label="ไลเซนส์" value={product.license} />
                </Grid>
              </Grid>

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
                justifyContent: 'space-between',
                backgroundColor: 'rgba(255, 255, 255, 0.78)',
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
                      ไลเซนส์
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {product.license}
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
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {product.authorName}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Stack spacing={1.25} sx={{ mt: 2.5 }}>
                <Button
                  variant="outlined"
                  startIcon={<ShoppingCartRoundedIcon />}
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

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={1.5}
            sx={{ justifyContent: 'space-between', alignItems: { md: 'center' } }}
          >
            <Typography variant="body2" color="text.secondary">
              โดย {product.authorName} • {product.updatedAt}
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              {product.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
