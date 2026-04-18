export const uiRadius = {
  xs: '8px',
  sm: '10px',
  md: '12px',
  lg: '14px',
  xl: '16px',
  pill: '999px',
} as const

export const accentPalette = {
  primary: '#6f7cff',
  secondary: '#ad7cff',
  highlight: '#89d7ff',
  text: '#5866e9',
  soft: 'rgba(111, 124, 255, 0.08)',
  softStrong: 'rgba(111, 124, 255, 0.14)',
  border: 'rgba(17, 17, 17, 0.38)',
  borderStrong: 'rgba(17, 17, 17, 0.52)',
} as const

export const accentGradient = 'linear-gradient(135deg, #6f7cff 0%, #8c8bff 42%, #ad7cff 100%)'

export const accentGradientDark =
  'linear-gradient(145deg, #111216 0%, #26376a 50%, #9876ff 100%)'

export const softAccentBackground =
  'linear-gradient(180deg, rgba(255, 255, 255, 0.74) 0%, rgba(246, 247, 255, 0.58) 50%, rgba(242, 243, 255, 0.5) 100%)'

export const softAccentBackgroundMuted =
  'linear-gradient(180deg, rgba(255, 255, 255, 0.66) 0%, rgba(246, 247, 255, 0.52) 52%, rgba(242, 243, 255, 0.44) 100%)'

export const glassSurfaceSx = {
  backgroundColor: 'rgba(255, 255, 255, 0.54)',
  border: `1px solid ${accentPalette.border}`,
  backdropFilter: 'blur(28px) saturate(145%)',
  boxShadow: '0 18px 48px rgba(15, 15, 16, 0.08)',
} as const

export const glassSurfaceMutedSx = {
  backgroundColor: 'rgba(255, 255, 255, 0.46)',
  border: `1px solid ${accentPalette.border}`,
  backdropFilter: 'blur(24px) saturate(138%)',
} as const

export const darkGlassSurfaceSx = {
  background: accentGradientDark,
  color: '#ffffff',
  boxShadow: '0 28px 70px rgba(17, 17, 17, 0.18)',
} as const

export const metricSurfaceSx = {
  padding: 1.75,
  borderRadius: uiRadius.md,
  border: `1px solid ${accentPalette.border}`,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(18px) saturate(132%)',
} as const
