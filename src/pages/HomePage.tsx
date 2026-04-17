import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import {
  Box,
  Container,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { MarketplaceHero } from '@/components/marketplace/MarketplaceHero'
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts'
import {
  accentPalette,
  softAccentBackground,
  uiRadius,
} from '@/theme/uiTokens'
import { getMarketplaceSellers } from '@/utils/marketplaceSellers'

const HomeHubCard = ({
  title,
  primaryMetricLabel,
  primaryMetricValue,
  secondaryMetricLabel,
  secondaryMetricValue,
  to,
  icon,
}: {
  title: string
  primaryMetricLabel: string
  primaryMetricValue: string
  secondaryMetricLabel: string
  secondaryMetricValue: string
  to: string
  icon: ReactNode
}) => (
  <Paper
    component={RouterLink}
    to={to}
    sx={{
      position: 'relative',
      overflow: 'hidden',
      p: { xs: 3, md: 3.5 },
      borderRadius: uiRadius.xl,
      height: '100%',
      background: softAccentBackground,
      border: `1px solid ${accentPalette.border}`,
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
      cursor: 'pointer',
      boxShadow: '0 18px 44px rgba(15, 15, 16, 0.06)',
      transition:
        'transform 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        borderColor: accentPalette.borderStrong,
        boxShadow: '0 24px 52px rgba(15, 15, 16, 0.1)',
      },
      '&:hover .home-hub-icon': {
        opacity: 0.48,
        color: accentPalette.primary,
        transform: 'translateY(-50%) scale(1.05)',
      },
      '&:hover .home-hub-title': {
        opacity: 0.4,
      },
      '&:hover .home-hub-open': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    }}
  >
    <Box
      className="home-hub-icon"
      sx={{
        position: 'absolute',
        right: { xs: -48, md: -68 },
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: { xs: 230, md: 320 },
        lineHeight: 1,
        color: accentPalette.text,
        opacity: 0.12,
        pointerEvents: 'none',
        transition: 'opacity 220ms ease, transform 220ms ease',
        zIndex: 0,
        '& svg': {
          fontSize: 'inherit',
        },
      }}
    >
      {icon}
    </Box>

    <Stack spacing={2.5} sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
      <Stack
        direction="row"
        spacing={1}
        className="home-hub-open"
        sx={{
          alignItems: 'center',
          alignSelf: 'flex-start',
          px: 1.4,
          py: 0.8,
          borderRadius: uiRadius.pill,
          border: `1px solid ${accentPalette.border}`,
          backgroundColor: 'rgba(255, 255, 255, 0.54)',
          color: accentPalette.text,
          opacity: 0.76,
          transform: 'translateY(2px)',
          transition: 'opacity 220ms ease, transform 220ms ease',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1 }}>
          กดเพื่อเปิด
        </Typography>
        <NorthEastRoundedIcon sx={{ fontSize: 16 }} />
      </Stack>

      <Box
        sx={{ minHeight: { xs: 124, md: 162 }, display: 'flex', alignItems: 'flex-start' }}
      >
        <Typography
          className="home-hub-title"
          variant="h3"
          sx={{
            lineHeight: 1.06,
            maxWidth: { xs: '76%', md: '68%' },
            transition: 'opacity 220ms ease',
          }}
        >
          {title}
        </Typography>
      </Box>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper
            sx={{
              p: 2,
              borderRadius: uiRadius.md,
              height: '100%',
              border: `1px solid ${accentPalette.border}`,
            }}
          >
            <Stack spacing={0.65}>
              <Typography color="text.secondary">{primaryMetricLabel}</Typography>
              <Typography variant="h4">{primaryMetricValue}</Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper
            sx={{
              p: 2,
              borderRadius: uiRadius.md,
              height: '100%',
              border: `1px solid ${accentPalette.border}`,
            }}
          >
            <Stack spacing={0.65}>
              <Typography color="text.secondary">{secondaryMetricLabel}</Typography>
              <Typography variant="h4">{secondaryMetricValue}</Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  </Paper>
)

const HomeHubCardSkeleton = () => (
  <Paper
    sx={{
      p: { xs: 3, md: 3.5 },
      borderRadius: uiRadius.xl,
      height: '100%',
      background: softAccentBackground,
      border: `1px solid ${accentPalette.border}`,
      boxShadow: '0 18px 44px rgba(15, 15, 16, 0.06)',
    }}
  >
    <Stack spacing={2.5} sx={{ height: '100%' }}>
      <Skeleton variant="rounded" width={112} height={38} sx={{ borderRadius: uiRadius.pill }} />
      <Box sx={{ minHeight: { xs: 124, md: 162 } }}>
        <Stack spacing={1}>
          <Skeleton variant="text" height={54} width="72%" />
          <Skeleton variant="text" height={54} width="58%" />
        </Stack>
      </Box>

      <Grid container spacing={1.5}>
        {Array.from({ length: 2 }, (_, index) => (
          <Grid key={`home-card-skeleton-metric-${index}`} size={{ xs: 12, sm: 6 }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: uiRadius.md,
                height: '100%',
                border: `1px solid ${accentPalette.border}`,
              }}
            >
              <Stack spacing={0.65}>
                <Skeleton variant="text" width="58%" height={22} />
                <Skeleton variant="text" width="42%" height={42} />
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  </Paper>
)

export const HomePage = () => {
  const { products, isLoading } = useFeaturedProducts()
  const sellers = getMarketplaceSellers(products)
  const verifiedSellerCount = sellers.filter((seller) => seller.verifiedCount > 0).length
  const categoryCount = new Set(products.map((product) => product.categoryId)).size

  return (
    <>
      <MarketplaceHero
        projectCount={products.length}
        sellerCount={sellers.length}
        categoryCount={categoryCount}
        isLoading={isLoading}
      />

      <Container
        id="marketplace-home-sections"
        maxWidth="lg"
        sx={{
          display: 'grid',
          gap: { xs: 3, md: 4 },
          py: { xs: 6, md: 8 },
        }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              {isLoading ? (
                <HomeHubCardSkeleton />
              ) : (
                <HomeHubCard
                  title="ดูผู้ขายทั้งหมด"
                  primaryMetricLabel="ผู้ขายทั้งหมด"
                  primaryMetricValue={`${sellers.length} ร้าน`}
                  secondaryMetricLabel="ร้านที่มีรายการยืนยัน"
                  secondaryMetricValue={`${verifiedSellerCount} ร้าน`}
                  to="/sellers"
                  icon={<StorefrontRoundedIcon />}
                />
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {isLoading ? (
                <HomeHubCardSkeleton />
              ) : (
                <HomeHubCard
                  title="ดูรายการขายทั้งหมด"
                  primaryMetricLabel="รายการขายทั้งหมด"
                  primaryMetricValue={`${products.length} รายการ`}
                  secondaryMetricLabel="หมวดหมู่ที่เปิดขาย"
                  secondaryMetricValue={`${categoryCount} หมวด`}
                  to="/catalog"
                  icon={<Inventory2OutlinedIcon />}
                />
              )}
            </Grid>
          </Grid>
      </Container>
    </>
  )
}
