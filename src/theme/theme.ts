import { alpha, createTheme } from '@mui/material/styles'
import {
  accentGradientDark,
  accentPalette,
  glassSurfaceSx,
  softAccentBackground,
  uiRadius,
} from '@/theme/uiTokens'

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#111111',
      light: '#38383d',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6e6e73',
      light: '#8f8f95',
      dark: '#48484d',
    },
    info: {
      main: accentPalette.primary,
      light: '#9ea6ff',
      dark: '#5866e9',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#111111',
      secondary: '#6e6e73',
    },
    divider: alpha('#111111', 0.12),
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Noto Sans Thai", sans-serif',
    h1: {
      fontSize: 'clamp(2.7rem, 5vw, 4.8rem)',
      lineHeight: 1,
      letterSpacing: '-0.05em',
      fontWeight: 800,
    },
    h2: {
      fontSize: 'clamp(1.8rem, 3vw, 3rem)',
      lineHeight: 1.08,
      letterSpacing: '-0.04em',
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    body1: {
      lineHeight: 1.75,
    },
    body2: {
      lineHeight: 1.65,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: uiRadius.md,
          paddingInline: 18,
          minHeight: 46,
          boxShadow: 'none',
          transition:
            'background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease',
        },
        contained: {
          background: accentGradientDark,
          border: `1px solid ${alpha('#111111', 0.28)}`,
          boxShadow: 'none',
          '&:hover': {
            background: 'linear-gradient(145deg, #151722 0%, #304286 52%, #a17bff 100%)',
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: alpha('#111111', 0.18),
          backgroundColor: 'rgba(255, 255, 255, 0.38)',
          backdropFilter: 'blur(18px) saturate(132%)',
          '&:hover': {
            borderColor: alpha('#111111', 0.3),
            backgroundColor: 'rgba(255, 255, 255, 0.48)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.28)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: uiRadius.xl,
          ...glassSurfaceSx,
          backgroundImage: softAccentBackground,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: uiRadius.sm,
          fontWeight: 600,
          border: `1px solid ${alpha('#111111', 0.14)}`,
          backgroundColor: 'rgba(255, 255, 255, 0.36)',
          backdropFilter: 'blur(16px) saturate(130%)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.34)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          ...glassSurfaceSx,
          backgroundImage: softAccentBackground,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: uiRadius.md,
          backgroundColor: 'rgba(255, 255, 255, 0.46)',
          backdropFilter: 'blur(22px) saturate(138%)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha('#111111', 0.18),
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha('#111111', 0.32),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha('#111111', 0.42),
            boxShadow: `0 0 0 3px ${alpha(accentPalette.primary, 0.08)}`,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(accentPalette.primary, 0.12),
        },
        bar: {
          backgroundImage: accentGradientDark,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '::selection': {
          backgroundColor: alpha(accentPalette.primary, 0.24),
        },
      },
    },
  },
})
