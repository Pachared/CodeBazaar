import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import GoogleIcon from '@mui/icons-material/Google'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
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
import { useDownloads } from '@/app/providers/useDownloads'
import { ProfileAvatar } from '@/components/common/ProfileAvatar'
import { SectionBadge } from '@/components/common/SectionBadge'
import { codeBazaarApiCompatibility } from '@/config/backendCompatibility'
import type { MainLayoutOutletContext } from '@/layouts/MainLayout'
import {
  accentGradientDark,
  glassSurfaceMutedSx,
  metricSurfaceSx,
  softAccentBackground,
  softAccentBackgroundMuted,
  uiRadius,
} from '@/theme/uiTokens'
import type { DownloadLibraryItem } from '@/types/downloads'
import { formatCurrency } from '@/utils/formatCurrency'

const thaiDateFormatter = new Intl.DateTimeFormat('th-TH', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const LibraryMetricCard = ({
  label,
  value,
}: {
  label: string
  value: string
}) => (
  <Paper sx={{ ...metricSurfaceSx, height: '100%' }}>
    <Stack spacing={0.75}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography variant="h6" sx={{ lineHeight: 1.25 }}>
        {value}
      </Typography>
    </Stack>
  </Paper>
)

const LibraryMetaRow = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700, textAlign: 'right' }}>{value}</Typography>
  </Stack>
)

const getPreviewLabel = (category: string) => category.slice(0, 2)

const DownloadLibraryCard = ({
  item,
  onDownload,
}: {
  item: DownloadLibraryItem
  onDownload: (libraryItemId: string) => void
}) => (
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
                {getPreviewLabel(item.category)}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1 }}
              >
                FILE
              </Typography>
            </Stack>
          </Box>

          <Stack spacing={0.55} sx={{ minWidth: 0, flex: 1 }}>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              <SectionBadge label="พร้อมดาวน์โหลด" />
              <SectionBadge label={item.category} />
            </Stack>
            <Typography variant="h4" sx={{ lineHeight: 1.08 }}>
              {item.title}
            </Typography>
            <Typography color="text.secondary">โดย {item.authorName}</Typography>
            <Typography color="text.secondary">
              ซื้อเมื่อ {thaiDateFormatter.format(new Date(item.purchasedAt))}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={0.4} sx={{ minWidth: { md: 160 }, alignItems: { md: 'flex-end' } }}>
          <Typography color="text.secondary">ราคาที่ซื้อ</Typography>
          <Typography variant="h5">{formatCurrency(item.price)}</Typography>
        </Stack>
      </Stack>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <LibraryMetricCard label="ไลเซนส์" value={item.license} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <LibraryMetricCard label="ไฟล์แพ็กเกจ" value={item.fileSizeLabel} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <LibraryMetricCard label="เวอร์ชัน" value={item.versionLabel} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <LibraryMetricCard
            label="ดาวน์โหลดแล้ว"
            value={`${item.downloadsCount} ครั้ง`}
          />
        </Grid>
      </Grid>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={1.25}
        sx={{ justifyContent: 'space-between', alignItems: { md: 'center' } }}
      >
        <Stack spacing={0.5}>
          <Typography color="text.secondary">
            ไฟล์: {item.fileName}
          </Typography>
          <Typography color="text.secondary">
            คำสั่งซื้อ: {item.orderId}
          </Typography>
          <Typography color="text.secondary">
            {item.lastDownloadedAt
              ? `ตรวจสิทธิ์ล่าสุด ${thaiDateFormatter.format(new Date(item.lastDownloadedAt))}`
              : 'ยังไม่เคยตรวจสิทธิ์ดาวน์โหลดจากคลังนี้'}
          </Typography>
          <Typography color="text.secondary">
            ระบบจะตรวจสิทธิ์จากคำสั่งซื้อของรายการนี้ก่อนบันทึกการดาวน์โหลดทุกครั้ง
          </Typography>
        </Stack>

        <Button
          variant="contained"
          startIcon={<DownloadRoundedIcon />}
          onClick={() => onDownload(item.libraryItemId)}
        >
          ยืนยันสิทธิ์ดาวน์โหลด
        </Button>
      </Stack>
    </Stack>
  </Paper>
)

export const DownloadsPage = () => {
  const { user, isAuthenticated } = useAuth()
  const { items, totalSpent, hasLoaded, downloadItem } = useDownloads()
  const { openAuthDialog } = useOutletContext<MainLayoutOutletContext>()
  const downloadsAvailable = codeBazaarApiCompatibility.realDownloadLibrary

  const latestPurchaseDate = items[0]?.purchasedAt
    ? thaiDateFormatter.format(new Date(items[0].purchasedAt))
    : 'ยังไม่มีรายการ'
  const uniqueOrderCount = new Set(items.map((item) => item.orderId)).size

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
          <SectionBadge label="คลังดาวน์โหลด" />
          <Typography variant="h2" sx={{ maxWidth: 860 }}>
            {downloadsAvailable
              ? 'รวมไฟล์สินค้าที่ซื้อแล้วไว้ในหน้าเดียว พร้อมดาวน์โหลดเมื่อไรก็ได้'
              : 'ดูสถานะการส่งมอบไฟล์ดาวน์โหลดของรายการที่ซื้อไว้ในหน้าเดียว'}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760, fontWeight: 500 }}>
            {downloadsAvailable
              ? 'หน้านี้ใช้สำหรับผู้ซื้อที่ต้องการกลับมาโหลด source code, template และไฟล์แพ็กเกจที่ซื้อไว้ โดยจะผูกกับคำสั่งซื้อของบัญชีนี้และตรวจสิทธิ์จากรายการที่ซื้อก่อนทุกครั้ง'
              : 'หน้านี้ใช้สำหรับตรวจสอบความพร้อมของระบบส่งมอบไฟล์หลังสั่งซื้อ และจะแสดงไฟล์ดาวน์โหลดเมื่อ CodeBazaarApi รองรับการตรวจสิทธิ์และ signed URL สำหรับบัญชีจริง'}
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
            <SectionBadge label="ยังไม่มีบัญชีที่กำลังใช้งานอยู่" />
            <Typography variant="h4">เข้าสู่ระบบก่อนเพื่อเข้าคลังดาวน์โหลดของคุณ</Typography>
            <Typography color="text.secondary">
              ใช้บัญชี Google เดิมที่ซื้อสินค้าไว้ เพื่อเปิดดูรายการดาวน์โหลดและกลับมาโหลดไฟล์ได้ตลอด
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
              <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                onClick={() => openAuthDialog('buyer-login')}
              >
                เข้าสู่ระบบด้วย Google
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/catalog"
                endIcon={<ArrowOutwardRoundedIcon />}
              >
                ไปหน้ารวมซอร์สโค้ดและเทมเพลต
              </Button>
            </Stack>
          </Stack>
        </Paper>
      ) : !downloadsAvailable ? (
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: uiRadius.xl,
            background: softAccentBackgroundMuted,
          }}
        >
          <Stack spacing={2.5} sx={{ alignItems: 'flex-start', maxWidth: 760 }}>
            <DownloadRoundedIcon sx={{ fontSize: 38, color: 'text.secondary' }} />
            <Box>
              <SectionBadge label="คลังดาวโหลดยังไม่เปิดใช้งาน" />
              <Typography variant="h3" sx={{ mt: 1.5 }}>
                คลิกดาวน์โหลดสำหรับสภาพแวดล้อมนี้ยังไม่เปิดใช้งาน
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1.2 }}>
                หาก backend ยังไม่ได้เปิดคลังดาวน์โหลดสำหรับบัญชีผู้ใช้ในสภาพแวดล้อมนี้
                ระบบจะซ่อนส่วนนี้ไว้ก่อนเพื่อไม่ให้แสดงข้อมูลที่คลาดเคลื่อน
              </Typography>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
              <Button variant="contained" component={RouterLink} to="/catalog">
                ไปหน้ารวมซอร์สโค้ดและเทมเพลต
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/profile"
                endIcon={<ArrowOutwardRoundedIcon />}
              >
                ไปหน้าตั้งค่าโปรไฟล์
              </Button>
            </Stack>
          </Stack>
        </Paper>
      ) : !hasLoaded ? (
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: uiRadius.xl,
            background: softAccentBackgroundMuted,
          }}
        >
          <Stack spacing={2.5} sx={{ alignItems: 'flex-start', maxWidth: 720 }}>
            <SectionBadge label="กำลังโหลดคลังดาวน์โหลด" />
            <Typography variant="h4">กำลังดึงรายการไฟล์ที่ซื้อไว้จากระบบ</Typography>
            <Typography color="text.secondary">
              รอสักครู่ เรากำลังเตรียมรายการดาวน์โหลดล่าสุดของบัญชีนี้ให้พร้อมใช้งาน
            </Typography>
          </Stack>
        </Paper>
      ) : items.length === 0 ? (
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: uiRadius.xl,
            background: softAccentBackgroundMuted,
          }}
        >
          <Stack spacing={2.5} sx={{ alignItems: 'flex-start', maxWidth: 760 }}>
            <DownloadRoundedIcon sx={{ fontSize: 38, color: 'text.secondary' }} />
            <Box>
              <SectionBadge label="ยังไม่มีไฟล์ในคลัง" />
              <Typography variant="h3" sx={{ mt: 1.5 }}>
                ยังไม่มีรายการที่พร้อมดาวน์โหลด
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1.2 }}>
                เมื่อคุณซื้อสินค้าเสร็จ รายการจะถูกส่งเข้ามาในคลังนี้ทันที เพื่อให้กลับมาโหลดได้อีกเมื่อไรก็ได้
              </Typography>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
              <Button variant="contained" component={RouterLink} to="/catalog">
                ไปหน้ารวมซอร์สโค้ดและเทมเพลต
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/profile"
                endIcon={<ArrowOutwardRoundedIcon />}
              >
                ไปหน้าตั้งค่าโปรไฟล์
              </Button>
            </Stack>
          </Stack>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              spacing={3}
              sx={{ position: { md: 'sticky' }, top: { md: 104 }, alignSelf: 'flex-start' }}
            >
              <Paper
                sx={{
                  p: { xs: 3, md: 3.5 },
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

                  <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    <SectionBadge label="ผู้ซื้อ" />
                    <SectionBadge label="พร้อมดาวน์โหลด" />
                  </Stack>

                  <Stack spacing={1.2}>
                    <LibraryMetaRow label="ไฟล์ในคลัง" value={`${items.length} รายการ`} />
                    <LibraryMetaRow label="คำสั่งซื้อทั้งหมด" value={`${uniqueOrderCount} รายการ`} />
                    <LibraryMetaRow label="ซื้อครั้งล่าสุด" value={latestPurchaseDate} />
                    <LibraryMetaRow label="มูลค่ารวม" value={formatCurrency(totalSpent)} />
                  </Stack>

                  <Stack spacing={1.25}>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to="/catalog"
                      startIcon={<Inventory2RoundedIcon />}
                    >
                      ไปหน้ารวมซอร์สโค้ดและเทมเพลต
                    </Button>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to="/profile"
                      endIcon={<ArrowOutwardRoundedIcon />}
                    >
                      ไปหน้าตั้งค่าโปรไฟล์
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={2.5}>
              <Paper
                sx={{
                  ...glassSurfaceMutedSx,
                  p: { xs: 2.5, md: 3 },
                  borderRadius: uiRadius.xl,
                }}
              >
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={2}
                  sx={{ justifyContent: 'space-between', alignItems: { md: 'center' } }}
                >
                  <Box>
                    <SectionBadge label="รายการพร้อมดาวน์โหลด" />
                    <Typography variant="h4" sx={{ mt: 1.25 }}>
                      เลือกรายการที่ต้องการโหลดได้จากด้านล่าง
                    </Typography>
                  </Box>

                  <Stack spacing={0.55} sx={{ minWidth: { md: 180 }, alignItems: { md: 'flex-end' } }}>
                    <Stack direction="row" spacing={0.9} sx={{ alignItems: 'center' }}>
                      <ScheduleRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      <Typography color="text.secondary">อัปเดตล่าสุด</Typography>
                    </Stack>
                    <Typography sx={{ fontWeight: 700 }}>{latestPurchaseDate}</Typography>
                  </Stack>
                </Stack>
              </Paper>

              {items.map((item) => (
                <DownloadLibraryCard
                  key={item.libraryItemId}
                  item={item}
                  onDownload={downloadItem}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}
