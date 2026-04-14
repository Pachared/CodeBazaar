import { Chip } from '@mui/material'
import { glassSurfaceMutedSx, uiRadius } from '@/theme/uiTokens'

interface SectionBadgeProps {
  label: string
}

export const SectionBadge = ({ label }: SectionBadgeProps) => {
  return (
    <Chip
      label={label}
      sx={{
        ...glassSurfaceMutedSx,
        borderRadius: uiRadius.sm,
        color: 'text.primary',
      }}
    />
  )
}
