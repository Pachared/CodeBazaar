import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useNotification } from '@/app/providers/useNotification'
import { uiRadius } from '@/theme/uiTokens'
import type { Product } from '@/types/marketplace'
import { ProjectCard } from './ProjectCard'

interface ProjectsGridProps {
  products: Product[]
  isLoading: boolean
  error: string | null
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
}: ProjectsGridProps) => {
  const { notify } = useNotification()

  useEffect(() => {
    if (!error) {
      return
    }

    notify({
      severity: 'warning',
      title: 'โหลดรายการไม่สำเร็จ',
      message: error,
      duration: 3600,
    })
  }, [error, notify])

  return (
    <Box component="section" id="projects">
      <Stack spacing={2.5}>
        <Paper sx={{ p: 3, borderRadius: uiRadius.lg }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1.25}>
                <Typography variant="h3">รายการขายที่พร้อมดูรายละเอียดและกดซื้อได้ทันที</Typography>
                <Typography color="text.secondary">
                  แต่ละการ์ดถูกจัดใหม่ให้เห็นข้อมูลสำคัญครบในบล็อกเดียว ทั้งราคา ไลเซนส์ ผู้ขาย
                  คะแนนรีวิว และปุ่มสั่งซื้อ
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

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
