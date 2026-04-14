import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { IconButton } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import { uiRadius } from '@/theme/uiTokens'

interface CloseActionButtonProps {
  ariaLabel: string
  onClick: () => void
  sx?: SxProps<Theme>
}

export const CloseActionButton = ({
  ariaLabel,
  onClick,
  sx,
}: CloseActionButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      aria-label={ariaLabel}
      sx={[
        {
          width: 44,
          height: 44,
          borderRadius: uiRadius.pill,
          color: 'text.secondary',
          backgroundColor: 'transparent',
          transition: 'background-color 180ms ease, color 180ms ease, box-shadow 180ms ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.72)',
            color: 'text.primary',
            boxShadow: '0 6px 18px rgba(15, 15, 16, 0.05)',
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <CloseRoundedIcon sx={{ fontSize: 28 }} />
    </IconButton>
  )
}
