import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useOutletContext } from 'react-router-dom'
import { useAuth } from '@/app/providers/useAuth'
import { SectionBadge } from '@/components/common/SectionBadge'
import {
  sellerCatalogTypes,
  sellerFeatures,
  sellerStats,
  sellerSteps,
} from '@/constants/marketplace'
import type { MainLayoutOutletContext } from '@/layouts/MainLayout'
import { uiRadius } from '@/theme/uiTokens'

export const SellerPage = () => {
  const { user } = useAuth()
  const { openAuthDialog } = useOutletContext<MainLayoutOutletContext>()
  const isSeller = user?.role === 'seller'

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
            'linear-gradient(180deg, rgba(255, 255, 255, 0.86) 0%, rgba(245, 245, 248, 0.78) 100%)',
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={2}>
            <SectionBadge label="ศูนย์ผู้ขายซอร์สโค้ดและเทมเพลต" />
            <Typography variant="h2" sx={{ maxWidth: 760 }}>
              เปิดร้านเพื่อขายโปรเจกต์ เทมเพลต และชุดไฟล์สำหรับนักพัฒนาในหน้าที่จัดการง่ายและพร้อมต่อยอด
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760, fontWeight: 500 }}>
              หน้านี้ออกแบบมาสำหรับผู้ขายที่ต้องการลงสินค้า จัดหมวดหมู่ ตั้งราคา
              และเตรียมขั้นตอนเปิดร้านให้พร้อมต่อระบบจริงในอนาคต
            </Typography>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
            {isSeller ? (
              <Button
                variant="contained"
                startIcon={<StorefrontRoundedIcon />}
                component={RouterLink}
                to="/seller/studio"
              >
                ไปหน้าลงสินค้า
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<StorefrontRoundedIcon />}
                onClick={() => openAuthDialog('seller-register')}
              >
                เปิดบัญชีผู้ขาย
              </Button>
            )}
            <Button
              variant="outlined"
              component={RouterLink}
              to="/"
              endIcon={<ArrowOutwardRoundedIcon />}
            >
              กลับไปดูสินค้าทั้งหมด
            </Button>
          </Stack>

          <Grid container spacing={2}>
            {sellerStats.map((stat) => (
              <Grid key={stat.label} size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2.5, borderRadius: uiRadius.lg, height: '100%' }}>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="h4">{stat.value}</Typography>
                    <Typography color="text.secondary">{stat.description}</Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3, borderRadius: uiRadius.xl, height: '100%' }}>
            <Stack spacing={2.5}>
              <Box>
                <SectionBadge label="สินค้าที่ลงขายได้" />
                <Typography variant="h4" sx={{ mt: 1.25 }}>
                  รองรับทั้งซอร์สโค้ด เทมเพลต และชุดคอมโพเนนต์สำหรับต่อยอดงานจริง
                </Typography>
              </Box>

              <Stack spacing={2}>
                {sellerCatalogTypes.map((catalogType) => (
                  <Paper
                    key={catalogType.title}
                    sx={{ p: 2.25, borderRadius: uiRadius.lg, backgroundColor: 'rgba(255,255,255,0.72)' }}
                  >
                    <Stack spacing={1.25}>
                      <Typography variant="h6">{catalogType.title}</Typography>
                      <Typography color="text.secondary">{catalogType.description}</Typography>
                      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                        {catalogType.tags.map((tag) => (
                          <SectionBadge key={tag} label={tag} />
                        ))}
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3, borderRadius: uiRadius.xl, height: '100%' }}>
            <Stack spacing={2.5}>
              <Box>
                <SectionBadge label="ทำไมผู้ขายเลือกแพลตฟอร์มนี้" />
                <Typography variant="h4" sx={{ mt: 1.25 }}>
                  ลดขั้นตอนเริ่มต้น แต่ยังวางโครงไว้พร้อมสำหรับระบบขายจริง
                </Typography>
              </Box>

              <Stack spacing={1.5}>
                {sellerFeatures.map((feature) => (
                  <Paper
                    key={feature.title}
                    sx={{ p: 2.25, borderRadius: uiRadius.lg, backgroundColor: 'rgba(255,255,255,0.72)' }}
                  >
                    <Stack spacing={0.75}>
                      <Typography variant="h6">{feature.title}</Typography>
                      <Typography color="text.secondary">{feature.description}</Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, borderRadius: uiRadius.xl }}>
            <Stack spacing={2.5}>
              <Box>
                <SectionBadge label="ขั้นตอนเริ่มต้นสำหรับผู้ขาย" />
                <Typography variant="h4" sx={{ mt: 1.25 }}>
                  เปิดร้านและเริ่มลงขายได้ตามลำดับขั้นที่ชัดเจน
                </Typography>
              </Box>

              <Grid container spacing={2}>
                {sellerSteps.map((step, index) => (
                  <Grid key={step.title} size={{ xs: 12, md: 6, lg: 3 }}>
                    <Paper
                      sx={{
                        p: 2.5,
                        borderRadius: uiRadius.lg,
                        height: '100%',
                        backgroundColor: 'rgba(255,255,255,0.72)',
                      }}
                    >
                      <Stack spacing={1.25}>
                        <Typography variant="body2" color="text.secondary">
                          ขั้นตอน {index + 1}
                        </Typography>
                        <Typography variant="h6">{step.title}</Typography>
                        <Typography color="text.secondary">{step.description}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
