import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
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
import { Link as RouterLink, useOutletContext } from 'react-router-dom'
import { useAuth } from '@/app/providers/useAuth'
import { ProfileAvatar } from '@/components/common/ProfileAvatar'
import { SectionBadge } from '@/components/common/SectionBadge'
import { useSellerOrders } from '@/hooks/useSellerOrders'
import type { MainLayoutOutletContext } from '@/layouts/MainLayout'
import {
  accentGradientDark,
  glassSurfaceMutedSx,
  metricSurfaceSx,
  softAccentBackground,
  softAccentBackgroundMuted,
  uiRadius,
} from '@/theme/uiTokens'
import type { SellerOrder } from '@/types/seller'
import { formatCurrency } from '@/utils/formatCurrency'

const thaiDateFormatter = new Intl.DateTimeFormat('th-TH', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const SellerOrderMetricCard = ({ label, value }: { label: string; value: string }) => (
  <Paper sx={{ ...metricSurfaceSx, height: '100%' }}>
    <Stack spacing={0.75}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
        {value}
      </Typography>
    </Stack>
  </Paper>
)

const SellerOrderMetaRow = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700, textAlign: 'right' }}>{value}</Typography>
  </Stack>
)

const getPreviewLabel = (title: string) => title.slice(0, 2)

const SellerOrderCard = ({ order }: { order: SellerOrder }) => (
  <Paper
    sx={{
      ...glassSurfaceMutedSx,
      p: { xs: 2.5, md: 3 },
      borderRadius: uiRadius.xl,
    }}
  >
    <Stack spacing={2.25}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: { md: 'flex-start' } }}
      >
        <Stack direction="row" spacing={1.6} sx={{ minWidth: 0, flex: 1 }}>
          <Box
            sx={{
              width: 78,
              height: 78,
              flexShrink: 0,
              display: 'grid',
              placeItems: 'center',
              borderRadius: uiRadius.lg,
              background: accentGradientDark,
              color: 'common.white',
              boxShadow: '0 18px 34px rgba(17, 17, 17, 0.16)',
            }}
          >
            <Stack spacing={0.2} sx={{ alignItems: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 800, lineHeight: 1 }}>
                {getPreviewLabel(order.productTitle)}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1 }}
              >
                ORDER
              </Typography>
            </Stack>
          </Box>

          <Stack spacing={0.55} sx={{ minWidth: 0, flex: 1 }}>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              <SectionBadge label={order.productCategory} />
              <SectionBadge label={order.statusLabel} />
            </Stack>
            <Typography variant="h4" sx={{ lineHeight: 1.08 }}>
              {order.productTitle}
            </Typography>
            <Typography color="text.secondary">
              ผู้ซื้อ {order.buyerName} · {order.buyerEmail}
            </Typography>
            <Typography color="text.secondary">
              สั่งซื้อเมื่อ {thaiDateFormatter.format(new Date(order.purchasedAt))}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={0.4} sx={{ minWidth: { md: 176 }, alignItems: { md: 'flex-end' } }}>
          <Typography color="text.secondary">ยอดคำสั่งซื้อ</Typography>
          <Typography variant="h5">{formatCurrency(order.amount)}</Typography>
        </Stack>
      </Stack>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SellerOrderMetricCard label="หมายเลขคำสั่งซื้อ" value={order.orderId} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SellerOrderMetricCard label="วิธีชำระเงิน" value={order.paymentMethodLabel} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SellerOrderMetricCard label="ไลเซนส์ที่ซื้อ" value={order.licenseLabel} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SellerOrderMetricCard label="การจัดส่ง" value={order.deliveryLabel} />
        </Grid>
      </Grid>
    </Stack>
  </Paper>
)

const SellerOrderSummarySkeleton = () => (
  <Paper
    sx={{
      p: 3,
      borderRadius: uiRadius.xl,
      background: softAccentBackground,
    }}
  >
    <Stack spacing={2.5}>
      <Skeleton variant="rounded" width={78} height={78} sx={{ borderRadius: uiRadius.md }} />

      <Stack spacing={0.8}>
        <Skeleton variant="text" width="58%" height={42} />
        <Skeleton variant="text" width="74%" height={22} />
      </Stack>

      <DividerLight />

      <Stack spacing={1.2}>
        {Array.from({ length: 4 }, (_, index) => (
          <Stack
            key={`seller-order-summary-skeleton-${index}`}
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Skeleton variant="text" width="42%" height={22} />
            <Skeleton variant="text" width="28%" height={22} />
          </Stack>
        ))}
      </Stack>

      <Stack spacing={1.25}>
        <Skeleton variant="rounded" height={46} sx={{ borderRadius: uiRadius.md }} />
        <Skeleton variant="rounded" height={46} sx={{ borderRadius: uiRadius.md }} />
      </Stack>
    </Stack>
  </Paper>
)

const SellerOrderCardSkeleton = () => (
  <Paper
    sx={{
      ...glassSurfaceMutedSx,
      p: { xs: 2.5, md: 3 },
      borderRadius: uiRadius.xl,
    }}
  >
    <Stack spacing={2.25}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: { md: 'flex-start' } }}
      >
        <Stack direction="row" spacing={1.6} sx={{ minWidth: 0, flex: 1 }}>
          <Skeleton variant="rounded" width={78} height={78} sx={{ borderRadius: uiRadius.lg }} />

          <Stack spacing={0.55} sx={{ minWidth: 0, flex: 1 }}>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              <Skeleton variant="rounded" width={90} height={30} sx={{ borderRadius: uiRadius.sm }} />
              <Skeleton variant="rounded" width={120} height={30} sx={{ borderRadius: uiRadius.sm }} />
            </Stack>
            <Skeleton variant="text" width="66%" height={42} />
            <Skeleton variant="text" height={22} />
            <Skeleton variant="text" width="76%" height={22} />
          </Stack>
        </Stack>

        <Stack spacing={0.4} sx={{ minWidth: { md: 176 }, alignItems: { md: 'flex-end' } }}>
          <Skeleton variant="text" width={84} height={22} />
          <Skeleton variant="text" width={110} height={36} />
        </Stack>
      </Stack>

      <Grid container spacing={1.5}>
        {Array.from({ length: 4 }, (_, index) => (
          <Grid key={`seller-order-metric-skeleton-${index}`} size={{ xs: 12, sm: 6 }}>
            <Skeleton variant="rounded" height={88} sx={{ borderRadius: uiRadius.md }} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  </Paper>
)

export const SellerOrdersPage = () => {
  const { user, isAuthenticated } = useAuth()
  const { openAuthDialog } = useOutletContext<MainLayoutOutletContext>()
  const isSeller = user?.role === 'seller'
  const { orders, isLoading, error } = useSellerOrders(isAuthenticated && isSeller)

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0)
  const uniqueBuyerCount = new Set(orders.map((order) => order.buyerEmail)).size
  const latestOrderDate = orders[0]?.purchasedAt
    ? thaiDateFormatter.format(new Date(orders[0].purchasedAt))
    : 'ยังไม่มีรายการ'

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
          background: softAccentBackground,
        }}
      >
        <Stack spacing={2.25}>
          <SectionBadge label="คำสั่งซื้อของร้าน" />
          <Typography variant="h2" sx={{ maxWidth: 860 }}>
            ดูรายการที่ลูกค้าซื้อจากร้านของคุณ พร้อมยอดขายและข้อมูลผู้ซื้อในหน้าเดียว
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 780, fontWeight: 500 }}>
            ใช้หน้านี้เพื่อตรวจสอบว่าแต่ละสินค้าถูกซื้อเมื่อไร ใครเป็นผู้ซื้อ ใช้วิธีชำระเงินแบบไหน
            และมียอดรวมของร้านเท่าไรในตอนนี้
          </Typography>
        </Stack>
      </Paper>

      {!isAuthenticated || !user ? (
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: uiRadius.xl,
            background: softAccentBackgroundMuted,
          }}
        >
          <Stack spacing={2.5} sx={{ maxWidth: 720 }}>
            <SectionBadge label="ยังไม่เข้าสู่ระบบ" />
            <Typography variant="h4">เข้าสู่ระบบก่อนเพื่อดูคำสั่งซื้อของร้าน</Typography>
            <Typography color="text.secondary">
              ใช้บัญชี GitHub ของผู้ขายเพื่อเปิดดูรายการคำสั่งซื้อ ยอดขาย และข้อมูลลูกค้าที่ซื้อผลงานของคุณ
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
              <Button
                variant="contained"
                startIcon={<GitHubIcon />}
                onClick={() => openAuthDialog('seller-register')}
              >
                เปิดบัญชีผู้ขายด้วย GitHub
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/seller"
                endIcon={<ArrowOutwardRoundedIcon />}
              >
                ไปหน้าศูนย์ผู้ขาย
              </Button>
            </Stack>
          </Stack>
        </Paper>
      ) : null}

      {isAuthenticated && user && !isSeller ? (
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: uiRadius.xl,
            background: softAccentBackgroundMuted,
          }}
        >
          <Stack spacing={2.5} sx={{ maxWidth: 760 }}>
            <SectionBadge label="สำหรับผู้ขายเท่านั้น" />
            <Typography variant="h4">เปิดบัญชีผู้ขายก่อนเพื่อดูรายการที่ลูกค้าซื้อจากร้านของคุณ</Typography>
            <Typography color="text.secondary">
              หลังจากเชื่อม GitHub เพื่อเปิดบัญชีผู้ขายแล้ว คุณจะสามารถดูคำสั่งซื้อ ยอดรวมของร้าน และรายการสินค้าที่ถูกซื้อได้จากหน้านี้ทันที
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
              <Button
                variant="contained"
                startIcon={<GitHubIcon />}
                onClick={() => openAuthDialog('seller-register')}
              >
                เปิดบัญชีผู้ขายด้วย GitHub
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/seller"
                endIcon={<ArrowOutwardRoundedIcon />}
              >
                ดูรายละเอียดศูนย์ผู้ขาย
              </Button>
            </Stack>
          </Stack>
        </Paper>
      ) : null}

      {isAuthenticated && user && isSeller ? (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: { md: 104 }, alignSelf: 'flex-start' }}>
              {isLoading ? (
                <SellerOrderSummarySkeleton />
              ) : (
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: uiRadius.xl,
                    background: softAccentBackground,
                  }}
                >
                  <Stack spacing={2.5}>
                    <ProfileAvatar name={user.name} size={78} />

                    <Stack spacing={0.8}>
                      <Typography variant="h4" sx={{ lineHeight: 1.05 }}>
                        {user.name}
                      </Typography>
                      <Typography color="text.secondary">{user.email}</Typography>
                    </Stack>

                    <DividerLight />

                    <Stack spacing={1.2}>
                      <SellerOrderMetaRow label="คำสั่งซื้อทั้งหมด" value={`${orders.length} รายการ`} />
                      <SellerOrderMetaRow label="ผู้ซื้อที่ไม่ซ้ำกัน" value={`${uniqueBuyerCount} คน`} />
                      <SellerOrderMetaRow label="ยอดรวมของร้าน" value={formatCurrency(totalRevenue)} />
                      <SellerOrderMetaRow label="รายการล่าสุด" value={latestOrderDate} />
                    </Stack>

                    <Stack spacing={1.25}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/seller/studio"
                        startIcon={<StorefrontRoundedIcon />}
                      >
                        ลงขายสินค้า
                      </Button>
                      <Button
                        variant="outlined"
                        component={RouterLink}
                        to="/seller"
                        endIcon={<ArrowOutwardRoundedIcon />}
                      >
                        กลับไปศูนย์ผู้ขาย
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              )}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            {isLoading ? (
              <Stack spacing={2}>
                {Array.from({ length: 3 }, (_, index) => (
                  <SellerOrderCardSkeleton key={`seller-order-card-skeleton-${index}`} />
                ))}
              </Stack>
            ) : null}

            {!isLoading && error ? (
              <Paper
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: uiRadius.xl,
                  background: softAccentBackgroundMuted,
                }}
              >
                <Stack spacing={1}>
                  <SectionBadge label="โหลดข้อมูลไม่สำเร็จ" />
                  <Typography variant="h4">ยังไม่สามารถเปิดรายการคำสั่งซื้อของร้านได้</Typography>
                  <Typography color="text.secondary">{error}</Typography>
                </Stack>
              </Paper>
            ) : null}

            {!isLoading && !error && orders.length === 0 ? (
              <Paper
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: uiRadius.xl,
                  background: softAccentBackgroundMuted,
                }}
              >
                <Stack spacing={2.25}>
                  <SectionBadge label="ยังไม่มีคำสั่งซื้อ" />
                  <Typography variant="h4">ยังไม่มีลูกค้าสั่งซื้อสินค้าจากร้านของคุณ</Typography>
                  <Typography color="text.secondary">
                    เมื่อมีการสั่งซื้อเกิดขึ้น รายการทั้งหมดจะมาแสดงที่หน้านี้ พร้อมผู้ซื้อ ยอดขาย
                    และวิธีชำระเงินของแต่ละรายการ
                  </Typography>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/seller/studio"
                    startIcon={<StorefrontRoundedIcon />}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    ลงขายสินค้า
                  </Button>
                </Stack>
              </Paper>
            ) : null}

            {!isLoading && !error && orders.length > 0 ? (
              <Stack spacing={2}>
                {orders.map((order) => (
                  <SellerOrderCard key={order.id} order={order} />
                ))}
              </Stack>
            ) : null}
          </Grid>
        </Grid>
      ) : null}
    </Container>
  )
}

const DividerLight = () => <Box sx={{ height: 1, backgroundColor: 'rgba(17, 17, 17, 0.08)' }} />
