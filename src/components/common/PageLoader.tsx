import { Backdrop, Box, LinearProgress } from '@mui/material'
import { accentGradient, accentPalette, uiRadius } from '@/theme/uiTokens'

interface PageLoaderProps {
  open: boolean
}

export const PageLoader = ({ open }: PageLoaderProps) => {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 200,
        backgroundColor: 'rgba(244, 245, 252, 0.8)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <Box sx={{ width: 'min(320px, calc(100% - 48px))' }}>
        <LinearProgress
          sx={{
            height: 4,
            borderRadius: uiRadius.pill,
            backgroundColor: accentPalette.softStrong,
            '& .MuiLinearProgress-bar': {
              borderRadius: uiRadius.pill,
              backgroundImage: accentGradient,
            },
          }}
        />
      </Box>
    </Backdrop>
  )
}
