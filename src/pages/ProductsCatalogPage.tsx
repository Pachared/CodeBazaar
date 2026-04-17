import { startTransition, useDeferredValue, useMemo, useState } from 'react'
import { Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { ProjectsGrid } from '@/components/marketplace/ProjectsGrid'
import { SearchSidebar } from '@/components/marketplace/SearchSidebar'
import { SectionBadge } from '@/components/common/SectionBadge'
import { useProductsCatalog } from '@/hooks/useProductsCatalog'
import { softAccentBackground, uiRadius } from '@/theme/uiTokens'
import type { MarketplaceFilters } from '@/types/marketplace'

const defaultFilters: MarketplaceFilters = {
  query: '',
  category: 'all',
  license: 'all',
  price: 'all',
  sort: 'featured',
  verifiedOnly: false,
  stacks: [],
}

export const ProductsCatalogPage = () => {
  const [filters, setFilters] = useState<MarketplaceFilters>(defaultFilters)
  const deferredQuery = useDeferredValue(filters.query)
  const requestFilters = useMemo(
    () => ({
      ...filters,
      query: deferredQuery,
    }),
    [deferredQuery, filters],
  )
  const { products, isLoading, error } = useProductsCatalog(requestFilters)

  const handleFilterChange = <Key extends keyof MarketplaceFilters>(
    key: Key,
    value: MarketplaceFilters[Key],
  ) => {
    startTransition(() => {
      setFilters((currentFilters) => ({
        ...currentFilters,
        [key]: value,
      }))
    })
  }

  const handleToggleStack = (stack: string) => {
    startTransition(() => {
      setFilters((currentFilters) => ({
        ...currentFilters,
        stacks: currentFilters.stacks.includes(stack)
          ? currentFilters.stacks.filter((currentStack) => currentStack !== stack)
          : [...currentFilters.stacks, stack],
      }))
    })
  }

  const handleResetFilters = () => {
    startTransition(() => {
      setFilters(defaultFilters)
    })
  }

  const resultCount = isLoading ? 6 : products.length

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'grid',
        gap: { xs: 3, md: 4 },
        py: { xs: 5, md: 7 },
      }}
    >
      <Paper
        sx={{
          p: { xs: 3, md: 4.5 },
          borderRadius: uiRadius.xl,
          background: softAccentBackground,
        }}
      >
        <Stack spacing={2.25}>
          <SectionBadge label="รวมซอร์สโค้ดและเทมเพลตทั้งหมด" />
          <Typography variant="h2" sx={{ maxWidth: 840 }}>
            ดูรายการขายทั้งหมดในหน้าเดียว พร้อมค้นหา กรอง เปรียบเทียบราคา และเปิดหน้ารายละเอียดได้ทันที
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 780, fontWeight: 500 }}>
            หน้านี้ใช้สำหรับรวมรายการซอร์สโค้ด เทมเพลต และชุดคอมโพเนนต์ทั้งหมดของระบบ
            เพื่อให้คุณเลือกดูผลงานตามหมวดหมู่ ไลเซนส์ ราคา และผู้ขายได้สะดวกขึ้น
          </Typography>
        </Stack>
      </Paper>

      <Grid container spacing={3.5}>
        <Grid size={{ xs: 12, lg: 4 }} sx={{ minWidth: 0 }}>
          <SearchSidebar
            filters={filters}
            resultCount={resultCount}
            onQueryChange={(value) => handleFilterChange('query', value)}
            onCategoryChange={(value) => handleFilterChange('category', value)}
            onLicenseChange={(value) => handleFilterChange('license', value)}
            onPriceChange={(value) => handleFilterChange('price', value)}
            onSortChange={(value) => handleFilterChange('sort', value)}
            onToggleVerified={(value) => handleFilterChange('verifiedOnly', value)}
            onToggleStack={handleToggleStack}
            onResetFilters={handleResetFilters}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }} sx={{ minWidth: 0 }}>
          <ProjectsGrid
            products={products}
            isLoading={isLoading}
            error={error}
            title="รายการซอร์สโค้ดและเทมเพลตทั้งหมด"
            description="แต่ละการ์ดมีทั้งปุ่มดูรายละเอียด ใส่ตะกร้า และซื้อทันที พร้อมสรุปข้อมูลสำคัญอย่างราคา ไลเซนส์ ผู้ขาย และคะแนนรีวิวให้เห็นในบล็อกเดียว"
            emptyTitle="ยังไม่พบรายการที่ตรงกับเงื่อนไขนี้"
            emptyDescription="ลองเปลี่ยนคำค้นหา หมวดหมู่ หรือรีเซ็ตตัวกรองทางซ้ายเพื่อดูรายการทั้งหมด"
          />
        </Grid>
      </Grid>
    </Container>
  )
}
