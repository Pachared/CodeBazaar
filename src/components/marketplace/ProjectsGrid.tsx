import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import {
  Alert,
  Box,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { SectionBadge } from '@/components/common/SectionBadge'
import { uiRadius } from '@/theme/uiTokens'
import type { Product } from '@/types/marketplace'
import { ProjectCard } from './ProjectCard'

interface ProjectsGridProps {
  products: Product[]
  isLoading: boolean
  error: string | null
  sourceLabel: string
  resultCount: number
}

const LoadingCard = () => {
  return (
    <Paper sx={{ p: 3, borderRadius: uiRadius.lg }}>
      <Stack spacing={2}>
        <Skeleton variant="rounded" height={30} width={170} />
        <Skeleton variant="rounded" height={220} />
        <Skeleton variant="text" height={36} />
        <Skeleton variant="text" height={22} />
        <Skeleton variant="text" height={22} width="80%" />
      </Stack>
    </Paper>
  )
}

export const ProjectsGrid = ({
  products,
  isLoading,
  error,
  sourceLabel,
  resultCount,
}: ProjectsGridProps) => {
  return (
    <Box component="section" id="projects">
      <Stack spacing={2.5}>
        <Paper sx={{ p: 3, borderRadius: uiRadius.lg }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={1.25}>
                <SectionBadge label="กริดโปรเจกต์" />
                <Typography variant="h3">รายการขายที่พร้อมดูรายละเอียดและกดซื้อได้ทันที</Typography>
                <Typography color="text.secondary">
                  แต่ละการ์ดถูกจัดใหม่ให้เห็นข้อมูลสำคัญครบในบล็อกเดียว ทั้งราคา ไลเซนส์ ผู้ขาย
                  คะแนนรีวิว และปุ่มสั่งซื้อ
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 6, md: 12 }}>
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: uiRadius.md,
                      backgroundColor: 'rgba(255,255,255,0.72)',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      รายการที่แสดง
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 0.5 }}>
                      {isLoading ? 'กำลังโหลด...' : `${resultCount} รายการ`}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6, md: 12 }}>
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: uiRadius.md,
                      backgroundColor: 'rgba(255,255,255,0.72)',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      แหล่งข้อมูล
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 0.5 }}>
                      {sourceLabel}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {error ? <Alert severity="warning">{error}</Alert> : null}

        {isLoading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 6 }, (_, index) => (
              <Grid key={`loading-card-${index}`} size={{ xs: 12 }}>
                <LoadingCard />
              </Grid>
            ))}
          </Grid>
        ) : products.length === 0 ? (
          <Paper sx={{ p: 4, borderRadius: uiRadius.lg }}>
            <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
              <Inventory2OutlinedIcon sx={{ fontSize: 42, color: 'text.secondary' }} />
              <Typography variant="h5">ยังไม่พบโปรเจกต์ที่ตรงกับเงื่อนไขนี้</Typography>
              <Typography color="text.secondary">
                ลองเปลี่ยนคำค้นหา หมวดหมู่ หรือรีเซ็ตตัวกรองทางซ้ายเพื่อดูรายการทั้งหมด
              </Typography>
            </Stack>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid key={product.id} size={{ xs: 12 }}>
                <ProjectCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Box>
  )
}
