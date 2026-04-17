import { Avatar } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { accentGradientDark, accentPalette, uiRadius } from '@/theme/uiTokens'

interface ProfileAvatarProps {
  name: string
  size?: number
  sx?: SxProps<Theme>
}

const getInitials = (name: string) => {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) {
    return 'CB'
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2)
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`
}

export const ProfileAvatar = ({ name, size = 42, sx }: ProfileAvatarProps) => {
  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        borderRadius: uiRadius.md,
        background: accentGradientDark,
        color: '#ffffff',
        fontWeight: 800,
        fontSize: `${Math.max(size * 0.3, 13)}px`,
        letterSpacing: '-0.03em',
        boxShadow: '0 16px 34px rgba(17, 17, 17, 0.16)',
        border: `1px solid ${accentPalette.border}`,
        ...sx,
      }}
    >
      {getInitials(name)}
    </Avatar>
  )
}
