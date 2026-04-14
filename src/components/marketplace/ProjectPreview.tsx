import { Box, Chip, Stack } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { uiRadius } from '@/theme/uiTokens'
import type { Product } from '@/types/marketplace'

interface ProjectPreviewProps {
  product: Product
}

const previewPaletteByCategory = {
  marketplace: {
    background: 'linear-gradient(135deg, #0f0f11 0%, #3b3b41 45%, #ececef 100%)',
    surface: 'rgba(255, 255, 255, 0.88)',
    surfaceMuted: 'rgba(255, 255, 255, 0.42)',
    accent: 'rgba(17, 17, 17, 0.92)',
  },
  dashboard: {
    background: 'linear-gradient(135deg, #121214 0%, #2b2d31 45%, #d7d8dc 100%)',
    surface: 'rgba(255, 255, 255, 0.9)',
    surfaceMuted: 'rgba(255, 255, 255, 0.36)',
    accent: 'rgba(255, 255, 255, 0.22)',
  },
  'landing-page': {
    background: 'linear-gradient(135deg, #f5f5f7 0%, #d7d7db 45%, #101011 100%)',
    surface: 'rgba(255, 255, 255, 0.86)',
    surfaceMuted: 'rgba(17, 17, 17, 0.12)',
    accent: 'rgba(255, 255, 255, 0.28)',
  },
  saas: {
    background: 'linear-gradient(135deg, #111214 0%, #4a4b50 40%, #ededf0 100%)',
    surface: 'rgba(255, 255, 255, 0.9)',
    surfaceMuted: 'rgba(255, 255, 255, 0.3)',
    accent: 'rgba(255, 255, 255, 0.22)',
  },
  'design-system': {
    background: 'linear-gradient(135deg, #0f0f10 0%, #2a2b2e 35%, #f0f0f2 100%)',
    surface: 'rgba(255, 255, 255, 0.88)',
    surfaceMuted: 'rgba(255, 255, 255, 0.32)',
    accent: 'rgba(17, 17, 17, 0.9)',
  },
} as const

const Line = ({
  width,
  color,
  height = 10,
}: {
  width: string | number
  color: string
  height?: number
}) => (
  <Box
    sx={{
      width,
      height,
      borderRadius: uiRadius.pill,
      backgroundColor: color,
    }}
  />
)

export const ProjectPreview = ({ product }: ProjectPreviewProps) => {
  const palette =
    previewPaletteByCategory[product.categoryId as keyof typeof previewPaletteByCategory] ??
    previewPaletteByCategory.marketplace

  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        borderRadius: uiRadius.lg,
        background: palette.background,
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.24)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at top right, rgba(255,255,255,0.32), transparent 35%), radial-gradient(circle at bottom left, rgba(255,255,255,0.18), transparent 30%)',
        }}
      />

      <Stack spacing={1.25} sx={{ position: 'relative', zIndex: 1, p: 1.5, height: '100%' }}>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: alpha('#ffffff', 0.78),
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: alpha('#ffffff', 0.55),
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: alpha('#ffffff', 0.36),
            }}
          />
        </Stack>

        <Stack direction="row" spacing={1.25} sx={{ flex: 1, minHeight: 0 }}>
          <Stack spacing={1.25} sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: uiRadius.md,
                backgroundColor: palette.surface,
                boxShadow: '0 18px 38px rgba(17, 17, 17, 0.08)',
              }}
            >
              <Stack spacing={1.1}>
                <Line width="34%" color={alpha('#111111', 0.18)} height={8} />
                <Line width="72%" color={alpha('#111111', 0.82)} height={14} />
                <Line width="58%" color={alpha('#111111', 0.5)} />
                <Stack direction="row" spacing={0.75}>
                  {product.stack.slice(0, 3).map((stack) => (
                    <Chip
                      key={stack}
                      label={stack}
                      size="small"
                      sx={{
                        height: 22,
                        backgroundColor: alpha('#111111', 0.06),
                        '.MuiChip-label': { px: 1.1, fontWeight: 700 },
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Box>

            <Stack direction="row" spacing={1}>
              {product.tags.slice(0, 2).map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    px: 1.2,
                    py: 1,
                    borderRadius: uiRadius.md,
                    backgroundColor: palette.surface,
                    color: '#111111',
                    fontSize: 11,
                    fontWeight: 800,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack spacing={1} sx={{ width: '31%', minWidth: 104 }}>
            <Box
              sx={{
                flex: 1.1,
                borderRadius: uiRadius.md,
                backgroundColor: palette.accent,
                p: 1.2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Line width="68%" color={alpha('#ffffff', 0.4)} height={8} />
              <Line width="82%" color={alpha('#ffffff', 0.92)} height={18} />
              <Line width="54%" color={alpha('#ffffff', 0.52)} height={9} />
            </Box>
            <Box
              sx={{
                flex: 0.9,
                borderRadius: uiRadius.md,
                backgroundColor: palette.surfaceMuted,
                p: 1,
              }}
            >
              <Stack spacing={0.8}>
                <Line width="72%" color={alpha('#ffffff', 0.66)} height={7} />
                <Line width="100%" color={alpha('#ffffff', 0.34)} height={32} />
                <Line width="82%" color={alpha('#ffffff', 0.5)} height={7} />
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
