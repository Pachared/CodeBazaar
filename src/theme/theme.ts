import { alpha, createTheme } from '@mui/material/styles'
import { glassSurfaceSx, uiRadius } from '@/theme/uiTokens'

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
    background: {
      default: '#f5f5f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#111111',
      secondary: '#6e6e73',
    },
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
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: uiRadius.xl,
          ...glassSurfaceSx,
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: uiRadius.sm,
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          ...glassSurfaceSx,
          backgroundImage: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: uiRadius.md,
          backgroundColor: 'rgba(255, 255, 255, 0.62)',
          backdropFilter: 'blur(18px)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '::selection': {
          backgroundColor: alpha('#111111', 0.16),
        },
      },
    },
  },
})
