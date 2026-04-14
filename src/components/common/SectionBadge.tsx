import { Chip } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { glassSurfaceMutedSx, uiRadius } from '@/theme/uiTokens'

interface SectionBadgeProps {
  label: string
  sx?: SxProps<Theme>
}

export const SectionBadge = ({ label, sx }: SectionBadgeProps) => {
  return (
    <Chip
      label={label}
      sx={{
        ...glassSurfaceMutedSx,
        width: 'fit-content',
        alignSelf: 'flex-start',
        borderRadius: uiRadius.sm,
        color: 'text.primary',
        ...sx,
      }}
    />
  )
}
