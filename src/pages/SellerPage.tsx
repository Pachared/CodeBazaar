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
  sellerSteps,
  sellerUploadChecklist,
} from '@/constants/marketplace'
import type { MainLayoutOutletContext } from '@/layouts/MainLayout'
import { glassSurfaceMutedSx, uiRadius } from '@/theme/uiTokens'

const sellerPrimaryActionSx = {
  px: 3.25,
  minHeight: 54,
  borderRadius: uiRadius.md,
  background: 'linear-gradient(180deg, #111111 0%, #2f2f34 100%)',
  boxShadow: '0 18px 34px rgba(17, 17, 17, 0.16)',
  fontWeight: 700,
  '&:hover': {
    background: 'linear-gradient(180deg, #111111 0%, #26262b 100%)',
    boxShadow: '0 24px 40px rgba(17, 17, 17, 0.22)',
  },
} as const

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
              หากต้องการเพิ่มสินค้าใหม่หรือเริ่มลงรายการขายในระบบ ให้กดปุ่ม
              {' '}
              ลงขายสินค้า
              {' '}
              ด้านล่างนี้ได้ทันที
            </Typography>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
            {isSeller ? (
              <Button
                variant="contained"
                startIcon={<StorefrontRoundedIcon />}
                component={RouterLink}
                to="/seller/studio"
                sx={sellerPrimaryActionSx}
              >
                ลงขายสินค้า
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<StorefrontRoundedIcon />}
                onClick={() => openAuthDialog('seller-register')}
                sx={sellerPrimaryActionSx}
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

        </Stack>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: uiRadius.xl }}>
        <Stack spacing={2.5}>
          <Box>
            <SectionBadge label="เริ่มต้นก่อนลงขาย" />
            <Typography variant="h4" sx={{ mt: 1.25 }}>
              ดูลำดับการทำงานของผู้ขายก่อน เพื่อรู้ว่าควรเริ่มจากอะไร
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              กล่องนี้สรุป flow จริงของระบบตั้งแต่เปิดบัญชีผู้ขาย ตั้งค่าโปรไฟล์ เตรียมข้อมูลสินค้า
              ไปจนถึงเข้า Seller Studio เพื่อส่งรายการขาย
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

      <Paper
        sx={{
          p: { xs: 3, md: 3.5 },
          borderRadius: uiRadius.xl,
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.84) 0%, rgba(245, 245, 248, 0.76) 100%)',
        }}
      >
        <Stack spacing={2.25}>
          <Box>
            <SectionBadge label="เตรียมก่อนเข้า Studio" />
            <Typography variant="h4" sx={{ mt: 1.25 }}>
              สิ่งที่ควรมีในแพ็กเกจก่อนกดลงขายสินค้า
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              รายการด้านล่างคือข้อมูลหลักที่ควรเตรียมไว้ล่วงหน้า เพื่อให้ตอนเข้าหน้าสตูดิโอสามารถกรอกได้ครบ
              และทำให้หน้ารายละเอียดสินค้าของคุณดูชัดเจนตั้งแต่ครั้งแรก
            </Typography>
          </Box>

          <Grid container spacing={1.5}>
            {sellerUploadChecklist.map((item) => (
              <Grid key={item} size={{ xs: 12, md: 6, lg: 4 }}>
                <Paper
                  sx={{
                    ...glassSurfaceMutedSx,
                    p: 2,
                    borderRadius: uiRadius.lg,
                    height: '100%',
                  }}
                >
                  <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {item}
                  </Typography>
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
                <SectionBadge label="เลือกประเภทสินค้าที่จะขาย" />
                <Typography variant="h4" sx={{ mt: 1.25 }}>
                  ดูก่อนว่าระบบนี้รองรับสินค้ารูปแบบไหนบ้าง
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  หลังจากเตรียมข้อมูลครบแล้ว ให้เลือกแนวสินค้าที่ใกล้กับสิ่งที่คุณจะลงขายที่สุด
                  เพื่อกำหนดวิธีอธิบายแพ็กเกจและตั้งความคาดหวังของผู้ซื้อให้ตรงกัน
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
                <SectionBadge label="สิ่งที่ระบบช่วยผู้ขาย" />
                <Typography variant="h4" sx={{ mt: 1.25 }}>
                  ปิดท้ายด้วยภาพรวมว่าระบบนี้ช่วยให้คุณเริ่มขายง่ายขึ้นอย่างไร
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  ส่วนนี้อธิบายจากฟีเจอร์ที่มีอยู่จริงในระบบตอนนี้ ว่าจะช่วยให้ผู้ขายจัดการข้อมูล
                  และเชื่อมไปยังหน้าที่ผู้ซื้อเห็นได้อย่างไร
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
      </Grid>
    </Container>
  )
}
