import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import type { ReactNode } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { useMarketplace } from '@/app/providers/useMarketplace'
import { CartIcon } from '@/components/cart/CartIcon'
import { SectionBadge } from '@/components/common/SectionBadge'
import { ProjectPreview } from '@/components/marketplace/ProjectPreview'
import { useProductDetail } from '@/hooks/useProductDetail'
import { glassSurfaceMutedSx, metricSurfaceSx, uiRadius } from '@/theme/uiTokens'
import { formatCurrency } from '@/utils/formatCurrency'

const DetailMetaRow = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700, textAlign: 'right' }}>{value}</Typography>
  </Stack>
)

const DetailSection = ({
  badge,
  title,
  children,
}: {
  badge: string
  title: string
  children: ReactNode
}) => (
  <Paper
    sx={{
      ...glassSurfaceMutedSx,
      p: { xs: 3, md: 3.5 },
      borderRadius: uiRadius.xl,
    }}
  >
    <Stack spacing={2.25}>
      <Box>
        <SectionBadge label={badge} />
        <Typography variant="h4" sx={{ mt: 1.25 }}>
          {title}
        </Typography>
      </Box>
      {children}
    </Stack>
  </Paper>
)

const LoadingState = () => (
  <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
    <Stack spacing={3}>
      <Paper sx={{ p: { xs: 3, md: 4.5 }, borderRadius: uiRadius.xl }}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={180} height={32} />
          <Skeleton variant="text" width="74%" height={76} />
          <Skeleton variant="text" width="58%" height={34} />
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <Paper sx={{ p: { xs: 3, md: 3.5 }, borderRadius: uiRadius.xl }}>
              <Stack spacing={2}>
                <Skeleton variant="rounded" height={360} />
                <Skeleton variant="text" width="70%" height={56} />
                <Skeleton variant="text" height={28} />
                <Skeleton variant="text" width="84%" height={28} />
              </Stack>
            </Paper>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: { xs: 3, md: 3.5 }, borderRadius: uiRadius.xl }}>
            <Stack spacing={2}>
              <Skeleton variant="text" width="40%" height={26} />
              <Skeleton variant="text" width="64%" height={58} />
              <Skeleton variant="rounded" height={42} />
              <Skeleton variant="rounded" height={42} />
              <Skeleton variant="rounded" height={48} />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  </Container>
)

const ErrorState = ({ message }: { message: string }) => (
  <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
    <Paper
      sx={{
        ...glassSurfaceMutedSx,
        p: { xs: 3, md: 4 },
        borderRadius: uiRadius.xl,
      }}
    >
      <Stack spacing={2.5} sx={{ alignItems: 'flex-start', maxWidth: 760 }}>
        <Inventory2OutlinedIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
        <Box>
          <SectionBadge label="ไม่พบรายละเอียดรายการนี้" />
          <Typography variant="h3" sx={{ mt: 1.5 }}>
            ไม่สามารถเปิดหน้ารายละเอียดสินค้าได้
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1.2 }}>
            {message}
          </Typography>
        </Box>
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackRoundedIcon />}
        >
          กลับไปดูรายการทั้งหมด
        </Button>
      </Stack>
    </Paper>
  </Container>
)

export const ProductDetailPage = () => {
  const { productId } = useParams()
  const { product, isLoading, error } = useProductDetail(productId)
  const { addToCart, buyNow, isInCart } = useMarketplace()

  if (isLoading) {
    return <LoadingState />
  }

  if (!product || error) {
    return <ErrorState message={error ?? 'ไม่พบรายการสินค้าที่คุณต้องการดู'} />
  }

  const alreadyInCart = isInCart(product.id)

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'grid',
        gap: { xs: 3, md: 4 },
        py: { xs: 5, md: 7 },
      }}
    >
      <Paper
        sx={{
          p: { xs: 3, md: 4.5 },
          borderRadius: uiRadius.xl,
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(245, 245, 248, 0.78) 100%)',
        }}
      >
        <Stack spacing={2.25}>
          <SectionBadge label="รายละเอียดรายการขาย" />
          <Typography variant="h2" sx={{ maxWidth: 820 }}>
            ดูข้อมูลสินค้า จุดเด่นของแพ็กเกจ และตัดสินใจซื้อได้จากหน้านี้
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760, fontWeight: 500 }}>
            หน้านี้รวบรวมข้อมูลสำคัญของแต่ละรายการไว้ครบ ทั้งภาพรวมสินค้า รายละเอียดแพ็กเกจ
            ไลเซนส์ ราคา และข้อมูลที่ช่วยให้เปรียบเทียบก่อนกดซื้อได้ง่ายขึ้น
          </Typography>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <Paper
              sx={{
                ...glassSurfaceMutedSx,
                p: { xs: 3, md: 3.5 },
                borderRadius: uiRadius.xl,
              }}
            >
              <Stack spacing={2.5}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  {product.verified ? (
                    <Chip
                      icon={<VerifiedRoundedIcon />}
                      label="ผู้ขายยืนยันแล้ว"
                      sx={{ backgroundColor: '#111111', color: 'common.white' }}
                    />
                  ) : null}
                  <SectionBadge label={product.category} />
                  <SectionBadge label={product.delivery} />
                </Stack>

                <ProjectPreview product={product} />

                <Box>
                  <Typography variant="h2" sx={{ lineHeight: 1.1 }}>
                    {product.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mt: 1.5, fontWeight: 500 }}>
                    {product.summary}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  {product.stack.map((stack) => (
                    <Chip key={stack} label={stack} />
                  ))}
                </Stack>
              </Stack>
            </Paper>

            <DetailSection badge="ภาพรวมของรายการ" title="คำอธิบายเพิ่มเติมก่อนตัดสินใจซื้อ">
              <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
                {product.fullDescription}
              </Typography>
            </DetailSection>

            <DetailSection badge="จุดเด่นของแพ็กเกจ" title="สิ่งที่รายการนี้ออกแบบมาให้ช่วยคุณได้">
              <Grid container spacing={1.5}>
                {product.featureHighlights.map((feature) => (
                  <Grid key={feature} size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ ...metricSurfaceSx, height: '100%' }}>
                      <Stack spacing={1}>
                        <CheckCircleRoundedIcon sx={{ color: '#111111' }} />
                        <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                          {feature}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </DetailSection>

            <DetailSection badge="สิ่งที่รวมมาให้" title="รายการไฟล์และองค์ประกอบในแพ็กเกจนี้">
              <Stack spacing={1.1}>
                {product.includedItems.map((item) => (
                  <Paper key={item} sx={{ ...metricSurfaceSx }}>
                    <Stack direction="row" spacing={1.1} sx={{ alignItems: 'center' }}>
                      <DownloadRoundedIcon sx={{ color: '#111111', fontSize: 20 }} />
                      <Typography color="text.secondary">{item}</Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </DetailSection>

            <DetailSection badge="เหมาะกับใคร" title="รายการนี้เหมาะกับงานลักษณะไหน">
              <Grid container spacing={1.5}>
                {product.idealFor.map((item) => (
                  <Grid key={item} size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ ...metricSurfaceSx, height: '100%' }}>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        {item}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </DetailSection>

            <DetailSection badge="ข้อมูลเพิ่มเติม" title="การใช้งานและการต่อยอดของแพ็กเกจนี้">
              <Stack spacing={1.5}>
                <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
                  {product.supportInfo}
                </Typography>
                <Divider />
                <Typography color="text.secondary">
                  โดย {product.authorName} • {product.updatedAt}
                </Typography>
              </Stack>
            </DetailSection>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: { md: 104 } }}>
            <Paper
              sx={{
                ...glassSurfaceMutedSx,
                p: { xs: 3, md: 3.5 },
                borderRadius: uiRadius.xl,
              }}
            >
              <Stack spacing={2.25}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    ราคาเริ่มต้น
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 0.5 }}>
                    {formatCurrency(product.price)}
                  </Typography>
                </Box>

                <Stack spacing={1.1}>
                  <DetailMetaRow label="หมวดหมู่" value={product.category} />
                  <DetailMetaRow label="ผู้ขาย" value={product.authorName} />
                  <DetailMetaRow label="คะแนนรีวิว" value={product.rating.toFixed(1)} />
                  <DetailMetaRow label="ยอดขาย" value={`${product.sales} รายการ`} />
                  <DetailMetaRow label="การจัดส่ง" value={product.delivery} />
                  <DetailMetaRow label="ไลเซนส์" value={product.license} />
                  <DetailMetaRow label="เวอร์ชัน" value={product.versionLabel} />
                  <DetailMetaRow label="รูปแบบไฟล์" value={product.fileFormatLabel} />
                </Stack>

                <Stack spacing={1.25} sx={{ pt: 1 }}>
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to="/"
                    startIcon={<ArrowBackRoundedIcon />}
                  >
                    กลับไปดูรายการทั้งหมด
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
              </Stack>
            </Paper>

            <Paper
              sx={{
                ...glassSurfaceMutedSx,
                p: 2.5,
                borderRadius: uiRadius.xl,
              }}
            >
              <Stack spacing={1.5}>
                <Typography variant="h6">สรุปสั้น ๆ ก่อนซื้อ</Typography>
                <Typography color="text.secondary">
                  รายการนี้เหมาะสำหรับคนที่ต้องการไฟล์พร้อมใช้งานและอยากเห็นข้อมูลสำคัญครบก่อนตัดสินใจซื้อ
                  ทั้งราคา เวอร์ชัน ไลเซนส์ และรายละเอียดของแพ็กเกจในหน้าเดียว
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}
