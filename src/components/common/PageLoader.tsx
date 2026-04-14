import { Backdrop, Box, LinearProgress } from '@mui/material'
import { uiRadius } from '@/theme/uiTokens'

interface PageLoaderProps {
  open: boolean
}

export const PageLoader = ({ open }: PageLoaderProps) => {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 200,
        backgroundColor: 'rgba(245, 245, 247, 0.82)',
        backdropFilter: 'blur(14px)',
      }}
      >
      <Box sx={{ width: 'min(320px, calc(100% - 48px))' }}>
        <LinearProgress
          sx={{
            height: 4,
            borderRadius: uiRadius.pill,
            backgroundColor: 'rgba(17, 17, 17, 0.08)',
            '& .MuiLinearProgress-bar': {
              borderRadius: uiRadius.pill,
              backgroundColor: '#111111',
            },
          }}
        />
      </Box>
    </Backdrop>
  )
}
