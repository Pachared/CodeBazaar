export const uiRadius = {
  xs: '8px',
  sm: '10px',
  md: '12px',
  lg: '14px',
  xl: '16px',
  pill: '999px',
} as const

export const glassSurfaceSx = {
  backgroundColor: 'rgba(255, 255, 255, 0.68)',
  border: '1px solid rgba(255, 255, 255, 0.76)',
  backdropFilter: 'blur(24px)',
  boxShadow: '0 18px 48px rgba(15, 15, 16, 0.08)',
} as const

export const glassSurfaceMutedSx = {
  backgroundColor: 'rgba(255, 255, 255, 0.58)',
  border: '1px solid rgba(255, 255, 255, 0.72)',
  backdropFilter: 'blur(20px)',
} as const

export const darkGlassSurfaceSx = {
  background: 'linear-gradient(180deg, rgba(16, 16, 18, 0.96) 0%, rgba(55, 55, 60, 0.9) 100%)',
  color: '#ffffff',
  boxShadow: '0 28px 70px rgba(17, 17, 17, 0.18)',
} as const

export const metricSurfaceSx = {
  padding: 1.75,
  borderRadius: uiRadius.md,
  border: '1px solid rgba(17, 17, 17, 0.08)',
  backgroundColor: 'rgba(255, 255, 255, 0.58)',
} as const
