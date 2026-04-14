import { Box, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { metricSurfaceSx } from '@/theme/uiTokens'

interface ProjectStatItemProps {
  icon?: ReactNode
  label: string
  value: string
}

export const ProjectStatItem = ({ icon, label, value }: ProjectStatItemProps) => {
  return (
    <Box sx={metricSurfaceSx}>
      {icon ? (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          {icon}
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      )}
      <Typography variant="body2" sx={{ mt: 0.75, fontWeight: 700 }}>
        {value}
      </Typography>
    </Box>
  )
}
