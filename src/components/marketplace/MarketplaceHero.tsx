import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { SectionBadge } from '@/components/common/SectionBadge'
import { heroInsights } from '@/constants/marketplace'
import { uiRadius } from '@/theme/uiTokens'

interface MarketplaceHeroProps {
  projectCount: number
}

export const MarketplaceHero = ({ projectCount }: MarketplaceHeroProps) => {
  return (
    <Box component="section" sx={{ pt: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: { xs: 3, md: 4.5 },
            borderRadius: uiRadius.xl,
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.86) 0%, rgba(245, 245, 248, 0.74) 100%)',
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
                  หน้านี้ออกแบบมาเพื่อเป็น marketplace สำหรับขาย source code และ template โดยตรง
                  ให้ผู้ใช้ค้นหา กรอง เปรียบเทียบราคา และดูรายละเอียดโปรเจกต์ได้จากหน้าหลักทันที
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {heroInsights.map((insight) => (
              <Grid key={insight.label} size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2.5, borderRadius: uiRadius.md, height: '100%' }}>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      {insight.label}
                    </Typography>
                    <Typography variant="h4">
                      {insight.label === 'โปรเจกต์พร้อมขาย'
                        ? `${projectCount || 120}+`
                        : insight.value}
                    </Typography>
                    <Typography color="text.secondary">{insight.description}</Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}
