import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { Box, Container, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { SectionBadge } from '@/components/common/SectionBadge'
import { accentPalette, softAccentBackground, uiRadius } from '@/theme/uiTokens'

interface MarketplaceHeroProps {
  projectCount: number
  sellerCount?: number
  categoryCount?: number
  isLoading?: boolean
}

export const MarketplaceHero = ({
  projectCount,
  sellerCount = 0,
  categoryCount = 0,
  isLoading = false,
}: MarketplaceHeroProps) => {
  const handleScrollDown = () => {
    const target = document.getElementById('marketplace-home-sections')

    if (!target) {
      return
    }

    const rect = target.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const sectionHeight = rect.height
    const minTopOffset = 88
    const centeredOffset = Math.max((viewportHeight - sectionHeight) / 2, minTopOffset)

    window.scrollTo({
      top: window.scrollY + rect.top - centeredOffset,
      behavior: 'smooth',
    })
  }

  const heroInsights = [
    {
      label: 'ผู้ขายทั้งหมด',
      value: `${sellerCount}+`,
      description: 'รวมรายชื่อผู้ขายที่เปิดร้านไว้ในระบบและพร้อมให้กดเข้าไปดูผลงานต่อได้',
    },
    {
      label: 'รายการขายทั้งหมด',
      value: `${projectCount}+`,
      description: 'รวมซอร์สโค้ด เทมเพลต และชุดคอมโพเนนต์ที่เปิดดูรายละเอียดและกดซื้อได้',
    },
    {
      label: 'หมวดที่เปิดขาย',
      value: `${categoryCount || 5} หมวด`,
      description: 'แยกดูผลงานตามร้านของผู้ขายหรือเข้าไปดูรายการขายแบบรวมได้จากหน้าแรก',
    },
  ]

  const HeroInsightSkeletonCard = () => (
    <Paper sx={{ p: 2.5, borderRadius: uiRadius.md, height: '100%' }}>
      <Stack spacing={1}>
        <Skeleton variant="text" width="38%" height={22} />
        <Skeleton variant="text" width="28%" height={42} />
        <Skeleton variant="text" height={22} />
        <Skeleton variant="text" width="82%" height={22} />
      </Stack>
    </Paper>
  )

  return (
    <Box component="section" sx={{ pt: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Paper
          sx={{
            px: { xs: 3, md: 4.5 },
            pt: { xs: 3, md: 4.5 },
            pb: { xs: 4.25, md: 5.25 },
            borderRadius: uiRadius.xl,
            background: softAccentBackground,
            border: `1px solid ${accentPalette.border}`,
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Stack spacing={2.5}>
                <SectionBadge label="Marketplace สำหรับ source code และ template" />
                <Typography variant="h1" sx={{ maxWidth: 760 }}>
                  ค้นหาโปรเจกต์ ซอร์สโค้ด และเทมเพลตที่พร้อมนำไปใช้งานหรือนำไปขายต่อได้
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ maxWidth: 760, fontWeight: 500 }}
                >
                  เลือกเริ่มต้นได้จากหน้ารวมผู้ขาย หรือหน้ารวมรายการขาย เพื่อเข้าไปดูร้านของแต่ละผู้ขาย
                  เปรียบเทียบผลงานที่เปิดขาย และเปิดหน้ารายละเอียดของซอร์สโค้ดหรือเทมเพลตที่สนใจได้ทันที
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {isLoading
              ? Array.from({ length: 3 }, (_, index) => (
                <Grid key={`hero-insight-skeleton-${index}`} size={{ xs: 12, md: 4 }}>
                  <HeroInsightSkeletonCard />
                </Grid>
              ))
              : heroInsights.map((insight) => (
                <Grid key={insight.label} size={{ xs: 12, md: 4 }}>
                  <Paper sx={{ p: 2.5, borderRadius: uiRadius.md, height: '100%' }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        {insight.label}
                      </Typography>
                      <Typography variant="h4">{insight.value}</Typography>
                      <Typography color="text.secondary">{insight.description}</Typography>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
          </Grid>

          <Box
            component="button"
            type="button"
            onClick={handleScrollDown}
            sx={{
              mt: { xs: 2.25, md: 2.75 },
              mx: 'auto',
              px: 2,
              py: 1.2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.2,
              border: 'none',
              borderRadius: uiRadius.pill,
              backgroundColor: 'transparent',
              color: accentPalette.text,
              cursor: 'pointer',
              '@keyframes heroScrollCue': {
                '0%': {
                  transform: 'translateY(0)',
                  opacity: 0.58,
                },
                '50%': {
                  transform: 'translateY(6px)',
                  opacity: 1,
                },
                '100%': {
                  transform: 'translateY(0)',
                  opacity: 0.58,
                },
              },
              '&:hover .hero-scroll-icon': {
                opacity: 1,
              },
              '&:hover .hero-scroll-text': {
                color: 'text.primary',
              },
            }}
          >
            <Typography
              className="hero-scroll-text"
              variant="body2"
              sx={{
                fontWeight: 800,
                color: 'text.secondary',
                transition: 'color 180ms ease',
              }}
            >
              เลื่อนลงเพื่อดูรายการขาย
            </Typography>
            <KeyboardArrowDownRoundedIcon
              className="hero-scroll-icon"
              sx={{
                fontSize: 34,
                opacity: 0.72,
                animation: 'heroScrollCue 1.4s ease-in-out infinite',
              }}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
