import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import {
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { IOSSwitch } from '@/components/common/IOSSwitch'
import { SectionBadge } from '@/components/common/SectionBadge'
import {
  licenseOptions,
  priceOptions,
  projectCategoryOptions,
  sortOptions,
  stackOptions,
} from '@/constants/marketplace'
import { uiRadius } from '@/theme/uiTokens'
import type { MarketplaceFilters } from '@/types/marketplace'

interface SearchSidebarProps {
  filters: MarketplaceFilters
  resultCount: number
  onQueryChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onLicenseChange: (value: string) => void
  onPriceChange: (value: string) => void
  onSortChange: (value: string) => void
  onToggleVerified: (value: boolean) => void
  onToggleStack: (stack: string) => void
  onResetFilters: () => void
}

export const SearchSidebar = ({
  filters,
  resultCount,
  onQueryChange,
  onCategoryChange,
  onLicenseChange,
  onPriceChange,
  onSortChange,
  onToggleVerified,
  onToggleStack,
  onResetFilters,
}: SearchSidebarProps) => {
  return (
    <Stack spacing={2.5} sx={{ position: { lg: 'sticky' }, top: { lg: 106 } }}>
      <Paper id="search-panel" sx={{ p: 3, borderRadius: uiRadius.lg }}>
        <Stack spacing={2.5}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <SectionBadge label="ค้นหาและกรอง" />
              <Typography variant="h4" sx={{ mt: 1.5 }}>
                เลือกโปรเจกต์ที่เหมาะกับงานของคุณ
              </Typography>
            </Box>
            <Button
              variant="text"
              size="small"
              startIcon={<RestartAltRoundedIcon />}
              onClick={onResetFilters}
            >
              รีเซ็ต
            </Button>
          </Stack>

          <TextField
            label="ค้นหาชื่อโปรเจกต์, หมวดหมู่, ผู้ขาย"
            value={filters.query}
            onChange={(event) => onQueryChange(event.target.value)}
            fullWidth
          />

          <FormControl fullWidth>
            <Select
              displayEmpty
              value={filters.category}
              onChange={(event) => onCategoryChange(event.target.value)}
            >
              {projectCategoryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Select
              displayEmpty
              value={filters.license}
              onChange={(event) => onLicenseChange(event.target.value)}
            >
              {licenseOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Select
              displayEmpty
              value={filters.price}
              onChange={(event) => onPriceChange(event.target.value)}
            >
              {priceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Select
              displayEmpty
              value={filters.sort}
              onChange={(event) => onSortChange(event.target.value)}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.25 }}>
              เทคโนโลยีที่สนใจ
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              {stackOptions.map((stack) => {
                const isActive = filters.stacks.includes(stack)

                return (
                  <Chip
                    key={stack}
                    label={stack}
                    variant={isActive ? 'filled' : 'outlined'}
                    onClick={() => onToggleStack(stack)}
                    sx={{
                      backgroundColor: isActive ? '#111111' : 'rgba(255,255,255,0.5)',
                      color: isActive ? 'common.white' : 'text.primary',
                    }}
                  />
                )
              })}
            </Stack>
          </Box>

          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                เฉพาะผู้ขายที่ยืนยันตัวตนแล้ว
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ช่วยคัดเฉพาะผลงานจาก seller ที่พร้อมขายจริง
              </Typography>
            </Box>
            <IOSSwitch
              checked={filters.verifiedOnly}
              onChange={(event) => onToggleVerified(event.target.checked)}
            />
          </Stack>

          <Box
            sx={{
              p: 2.5,
              borderRadius: uiRadius.md,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(240,240,244,0.72) 100%)',
              border: '1px solid rgba(255,255,255,0.92)',
            }}
          >
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                ผลลัพธ์ที่ค้นเจอ
              </Typography>
              <Typography variant="h3">{resultCount}</Typography>
              <Typography color="text.secondary">
                รายการที่ตรงกับเงื่อนไขปัจจุบัน
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  )
}
