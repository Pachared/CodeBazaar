import type { ReactElement } from 'react'
import { Chip } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { accentPalette, glassSurfaceMutedSx, uiRadius } from '@/theme/uiTokens'

interface SectionBadgeProps {
  label: string
  icon?: ReactElement
  onClick?: () => void
  sx?: SxProps<Theme>
}

export const SectionBadge = ({ label, icon, onClick, sx }: SectionBadgeProps) => {
  return (
    <Chip
      label={label}
      icon={icon}
      onClick={onClick}
      clickable={Boolean(onClick)}
      sx={{
        ...glassSurfaceMutedSx,
        width: 'fit-content',
        alignSelf: 'flex-start',
        height: 32,
        borderRadius: uiRadius.sm,
        color: accentPalette.text,
        fontWeight: 600,
        '& .MuiChip-icon': {
          color: 'inherit',
          fontSize: 18,
          ml: 0.25,
        },
        '& .MuiChip-label': {
          px: 1.5,
        },
        ...sx,
      }}
    />
  )
}
