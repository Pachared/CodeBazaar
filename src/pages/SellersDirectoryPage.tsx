import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
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
import { Link as RouterLink } from 'react-router-dom'
import { ProfileAvatar } from '@/components/common/ProfileAvatar'
import { SectionBadge } from '@/components/common/SectionBadge'
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts'
import { glassSurfaceMutedSx, metricSurfaceSx, uiRadius } from '@/theme/uiTokens'
import type { MarketplaceSeller } from '@/types/marketplace'
import { formatCurrency } from '@/utils/formatCurrency'
import { getMarketplaceSellers } from '@/utils/marketplaceSellers'

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

const LoadingCard = () => (
  <Paper sx={{ p: 3, borderRadius: uiRadius.lg }}>
    <Stack spacing={2}>
      <Skeleton variant="rounded" width={170} height={30} />
      <Skeleton variant="text" height={48} width="52%" />
      <Skeleton variant="text" height={24} />
      <Skeleton variant="text" height={24} width="84%" />
      <Grid container spacing={1.5}>
        {Array.from({ length: 3 }, (_, index) => (
          <Grid key={`seller-loading-metric-${index}`} size={{ xs: 12, sm: 4 }}>
            <Skeleton variant="rounded" height={88} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  </Paper>
)

const SellerDirectoryCard = ({ seller }: { seller: MarketplaceSeller }) => (
  <Paper
    sx={{
      ...glassSurfaceMutedSx,
      p: { xs: 2.5, md: 3 },
      borderRadius: uiRadius.xl,
      height: '100%',
    }}
  >
    <Stack spacing={2.5} sx={{ height: '100%' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75} sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', minWidth: 0 }}>
          <ProfileAvatar name={seller.name} size={62} />
          <Box sx={{ minWidth: 0 }}>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 0.75 }}>
              <SectionBadge label="ร้านผู้ขาย" />
              {seller.verifiedCount > 0 ? (
                <SectionBadge
                  label={`มีรายการยืนยันแล้ว ${seller.verifiedCount}`}
                  icon={<VerifiedRoundedIcon />}
                />
              ) : null}
            </Stack>
            <Typography variant="h4" sx={{ lineHeight: 1.1 }}>
              {seller.name}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.8 }}>
              {seller.summary}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SellerMetricCard label="รายการขาย" value={`${seller.productCount} รายการ`} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SellerMetricCard label="ยอดขายรวม" value={`${seller.totalSales} รายการ`} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SellerMetricCard label="ราคาเริ่มต้น" value={formatCurrency(seller.startingPrice)} />
        </Grid>
      </Grid>

      <Stack spacing={1.25}>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {seller.categories.map((category) => (
            <SectionBadge key={category} label={category} />
          ))}
        </Stack>
        <Typography color="text.secondary">
          เทคโนโลยีหลัก: {seller.stacks.join(', ')}
        </Typography>
        <Typography color="text.secondary">
          อัปเดตล่าสุดประมาณ {seller.latestUpdateDaysAgo} วันที่แล้ว
        </Typography>
      </Stack>

      <Button
        variant="contained"
        component={RouterLink}
        to={`/sellers/${seller.slug}`}
        endIcon={<ArrowOutwardRoundedIcon />}
        sx={{ mt: 'auto', alignSelf: 'flex-start' }}
      >
        ดูซอร์สโค้ดและเทมเพลตของผู้ขายนี้
      </Button>
    </Stack>
  </Paper>
)

export const SellersDirectoryPage = () => {
  const { products, isLoading, error } = useFeaturedProducts()
  const sellers = getMarketplaceSellers(products)

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
          <SectionBadge label="รวมผู้ขายซอร์สโค้ดและเทมเพลตทั้งหมด" />
          <Typography variant="h2" sx={{ maxWidth: 860 }}>
            ดูรายชื่อผู้ขายทั้งหมดในระบบ แล้วกดเข้าไปดูซอร์สโค้ดและเทมเพลตของแต่ละร้านได้ทันที
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 780, fontWeight: 500 }}>
            หน้านี้ใช้สำหรับรวมผู้ขายที่เปิดลงผลงานไว้ในระบบ เพื่อให้คุณเลือกดูร้าน
            เปรียบเทียบจำนวนรายการ ยอดขาย และกดต่อเข้าไปดูสินค้าของเจ้าของแต่ละคนได้สะดวกขึ้น
          </Typography>
        </Stack>
      </Paper>

      {isLoading ? (
        <Grid container spacing={3}>
          {Array.from({ length: 4 }, (_, index) => (
            <Grid key={`seller-card-loading-${index}`} size={{ xs: 12, md: 6 }}>
              <LoadingCard />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Paper sx={{ p: 4, borderRadius: uiRadius.lg }}>
          <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Inventory2OutlinedIcon sx={{ fontSize: 42, color: 'text.secondary' }} />
            <Typography variant="h5">ยังไม่สามารถโหลดรายชื่อผู้ขายได้</Typography>
            <Typography color="text.secondary">{error}</Typography>
          </Stack>
        </Paper>
      ) : sellers.length === 0 ? (
        <Paper sx={{ p: 4, borderRadius: uiRadius.lg }}>
          <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Inventory2OutlinedIcon sx={{ fontSize: 42, color: 'text.secondary' }} />
            <Typography variant="h5">ยังไม่มีผู้ขายที่เปิดรายการไว้ในระบบ</Typography>
            <Typography color="text.secondary">
              เมื่อมีร้านที่ลงขายซอร์สโค้ดหรือเทมเพลต รายชื่อทั้งหมดจะมาแสดงในหน้านี้ทันที
            </Typography>
          </Stack>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {sellers.map((seller) => (
            <Grid key={seller.slug} size={{ xs: 12, md: 6 }}>
              <SellerDirectoryCard seller={seller} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
