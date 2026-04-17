import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { ProfileAvatar } from '@/components/common/ProfileAvatar'
import { SectionBadge } from '@/components/common/SectionBadge'
import { ProjectsGrid } from '@/components/marketplace/ProjectsGrid'
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts'
import { glassSurfaceMutedSx, metricSurfaceSx, uiRadius } from '@/theme/uiTokens'
import { formatCurrency } from '@/utils/formatCurrency'
import { getMarketplaceSellerBySlug, getProductsBySellerSlug } from '@/utils/marketplaceSellers'

const SellerMetricCard = ({ label, value }: { label: string; value: string }) => (
  <Paper sx={{ ...metricSurfaceSx, height: '100%' }}>
    <Stack spacing={0.75}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
        {value}
      </Typography>
    </Stack>
  </Paper>
)

const LoadingState = () => (
  <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
    <Stack spacing={3}>
      <Paper sx={{ p: { xs: 3, md: 4.5 }, borderRadius: uiRadius.xl }}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={180} height={32} />
          <Skeleton variant="text" width="68%" height={70} />
          <Skeleton variant="text" width="54%" height={34} />
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: { xs: 3, md: 3.5 }, borderRadius: uiRadius.xl }}>
            <Stack spacing={2}>
              <Skeleton variant="circular" width={78} height={78} />
              <Skeleton variant="text" width="56%" height={42} />
              <Skeleton variant="text" width="74%" height={24} />
            </Stack>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, borderRadius: uiRadius.lg }}>
            <Stack spacing={2}>
              <Skeleton variant="rounded" height={220} />
              <Skeleton variant="text" height={34} />
              <Skeleton variant="text" height={22} width="84%" />
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
          <SectionBadge label="ไม่พบร้านผู้ขายนี้" />
          <Typography variant="h3" sx={{ mt: 1.5 }}>
            ไม่สามารถเปิดหน้ารวมผลงานของผู้ขายได้
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1.2 }}>
            {message}
          </Typography>
        </Box>
        <Button
          variant="contained"
          component={RouterLink}
          to="/sellers"
          startIcon={<ArrowBackRoundedIcon />}
        >
          กลับไปดูผู้ขายทั้งหมด
        </Button>
      </Stack>
    </Paper>
  </Container>
)

export const SellerStorePage = () => {
  const { sellerSlug } = useParams()
  const { products, isLoading, error } = useFeaturedProducts()

  if (isLoading) {
    return <LoadingState />
  }

  if (!sellerSlug || error) {
    return <ErrorState message={error ?? 'ไม่พบร้านผู้ขายที่คุณต้องการดู'} />
  }

  const seller = getMarketplaceSellerBySlug(products, sellerSlug)
  const sellerProducts = getProductsBySellerSlug(products, sellerSlug).sort((left, right) => {
    if (left.verified !== right.verified) {
      return Number(right.verified) - Number(left.verified)
    }

    return right.sales - left.sales
  })

  if (!seller) {
    return <ErrorState message="ไม่พบผู้ขายรายนี้ในรายการซอร์สโค้ดและเทมเพลตของระบบ" />
  }

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
          <SectionBadge label="หน้ารวมผลงานของผู้ขาย" />
          <Typography variant="h2" sx={{ maxWidth: 860 }}>
            ดูซอร์สโค้ดและเทมเพลตทั้งหมดจาก {seller.name} ได้ในหน้าเดียว
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 780, fontWeight: 500 }}>
            หน้านี้ใช้สำหรับรวมรายการขายของผู้ขายรายนี้โดยเฉพาะ เพื่อให้คุณดูรายละเอียดสินค้า
            เปรียบเทียบราคา และกดต่อไปยังหน้าสินค้าแต่ละรายการได้สะดวกขึ้น
          </Typography>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: { md: 104 }, alignSelf: 'flex-start' }}>
            <Paper
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: uiRadius.xl,
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(245, 245, 248, 0.78) 100%)',
                }}
            >
              <Stack spacing={2.5}>
                <ProfileAvatar name={seller.name} size={78} />

                <Stack spacing={0.9}>
                  <Typography variant="h4" sx={{ lineHeight: 1.05 }}>
                    {seller.name}
                  </Typography>
                  <Typography color="text.secondary">{seller.summary}</Typography>
                </Stack>

                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                    <SellerMetricCard label="รายการขาย" value={`${seller.productCount} รายการ`} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                    <SellerMetricCard label="ยอดขายรวม" value={`${seller.totalSales} รายการ`} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                    <SellerMetricCard label="ราคาเริ่มต้น" value={formatCurrency(seller.startingPrice)} />
                  </Grid>
                </Grid>

                <Stack spacing={1.25}>
                  <Typography color="text.secondary">
                    หมวดหลัก: {seller.categories.join(', ')}
                  </Typography>
                  <Typography color="text.secondary">
                    เทคโนโลยีที่ใช้บ่อย: {seller.stacks.join(', ')}
                  </Typography>
                  <Typography color="text.secondary">
                    อัปเดตล่าสุดประมาณ {seller.latestUpdateDaysAgo} วันที่แล้ว
                  </Typography>
                </Stack>

                <Stack spacing={1.25}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/catalog"
                    endIcon={<ArrowOutwardRoundedIcon />}
                  >
                    ไปหน้ารวมซอร์สโค้ดและเทมเพลต
                  </Button>
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to="/sellers"
                    startIcon={<ArrowBackRoundedIcon />}
                  >
                    กลับไปดูผู้ขายทั้งหมด
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <ProjectsGrid
            products={sellerProducts}
            isLoading={false}
            error={null}
            showIntro={false}
            emptyTitle="ผู้ขายรายนี้ยังไม่มีรายการขายที่เปิดอยู่"
            emptyDescription="เมื่อผู้ขายรายนี้ลงซอร์สโค้ดหรือเทมเพลตเพิ่ม รายการทั้งหมดจะมาแสดงในหน้านี้"
          />
        </Grid>
      </Grid>
    </Container>
  )
}
