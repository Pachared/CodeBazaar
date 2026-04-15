import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded'
import LayersRoundedIcon from '@mui/icons-material/LayersRounded'
import SellRoundedIcon from '@mui/icons-material/SellRounded'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type { ChangeEvent, ReactNode } from 'react'
import { useState } from 'react'
import { Link as RouterLink, useOutletContext } from 'react-router-dom'
import { useAuth } from '@/app/providers/useAuth'
import { useNotification } from '@/app/providers/useNotification'
import { IOSSwitch } from '@/components/common/IOSSwitch'
import { SectionBadge } from '@/components/common/SectionBadge'
import { ProjectPreview } from '@/components/marketplace/ProjectPreview'
import {
  sellerAssetTypeOptions,
  sellerUploadCategoryOptions,
  sellerUploadLicenseOptions,
} from '@/constants/marketplace'
import type { MainLayoutOutletContext } from '@/layouts/MainLayout'
import { sellerService } from '@/services/api/seller.service'
import { glassSurfaceMutedSx, metricSurfaceSx, uiRadius } from '@/theme/uiTokens'
import type { Product } from '@/types/marketplace'
import type { SellerAssetType, SellerListingInput, SellerListingMode } from '@/types/seller'
import { formatCurrency } from '@/utils/formatCurrency'

interface SellerStudioFormState {
  assetType: SellerAssetType
  title: string
  categoryId: string
  licenseId: string
  price: string
  summary: string
  description: string
  highlights: string
  idealFor: string
  supportInfo: string
  stackInput: string
  version: string
  demoUrl: string
  supportUrl: string
  includedFiles: string
  packageFileName: string
  coverFileName: string
  docsFileName: string
  instantDelivery: boolean
  sourceIncluded: boolean
  documentationIncluded: boolean
}

const defaultSellerStudioForm: SellerStudioFormState = {
  assetType: 'source-code',
  title: '',
  categoryId: 'marketplace',
  licenseId: 'commercial',
  price: '',
  summary: '',
  description: '',
  highlights: '',
  idealFor: '',
  supportInfo: '',
  stackInput: 'React, TypeScript, MUI',
  version: '1.0.0',
  demoUrl: '',
  supportUrl: '',
  includedFiles: 'source/\ndocs/\nREADME.md',
  packageFileName: '',
  coverFileName: '',
  docsFileName: '',
  instantDelivery: true,
  sourceIncluded: true,
  documentationIncluded: true,
}

const findLabel = (options: { label: string; value: string }[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value

const splitByComma = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

const splitByLine = (value: string) =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)

const formatFileMeta = (file: File) => {
  const sizeInKb = file.size / 1024

  if (sizeInKb < 1024) {
    return `${file.name} · ${Math.max(1, Math.round(sizeInKb))} KB`
  }

  return `${file.name} · ${(sizeInKb / 1024).toFixed(1)} MB`
}

interface UploadFieldCardProps {
  title: string
  description: string
  accept: string
  icon: ReactNode
  fileName: string
  buttonLabel: string
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void
}

const UploadFieldCard = ({
  title,
  description,
  accept,
  icon,
  fileName,
  buttonLabel,
  onSelect,
}: UploadFieldCardProps) => {
  return (
    <Paper sx={{ ...glassSurfaceMutedSx, p: 2.25, borderRadius: uiRadius.lg }}>
      <Stack spacing={1.5}>
        <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              display: 'grid',
              placeItems: 'center',
              borderRadius: uiRadius.md,
              backgroundColor: 'rgba(17, 17, 17, 0.06)',
              color: 'text.primary',
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="h6">{title}</Typography>
            <Typography color="text.secondary">{description}</Typography>
          </Box>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.25}
          sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}
        >
          <Typography color={fileName ? 'text.primary' : 'text.secondary'} sx={{ wordBreak: 'break-all' }}>
            {fileName || 'ยังไม่ได้เลือกไฟล์'}
          </Typography>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadRoundedIcon />}
            sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
          >
            {buttonLabel}
            <input hidden type="file" accept={accept} onChange={onSelect} />
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

const ReviewRow = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700, textAlign: 'right' }}>{value}</Typography>
  </Stack>
)

const DeliveryOptionCard = ({
  title,
  description,
  checked,
  onChange,
}: {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) => (
  <Paper sx={{ ...metricSurfaceSx, height: '100%' }}>
    <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
      <IOSSwitch checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </Stack>
  </Paper>
)

const PreviewMetaRow = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700, textAlign: 'right' }}>{value}</Typography>
  </Stack>
)

const PreviewListSection = ({
  badge,
  title,
  icon,
  items,
  emptyMessage,
}: {
  badge: string
  title: string
  icon: ReactNode
  items: string[]
  emptyMessage: string
}) => (
  <Paper sx={{ ...metricSurfaceSx }}>
    <Stack spacing={1.35}>
      <Box>
        <SectionBadge label={badge} />
        <Typography variant="h6" sx={{ mt: 1 }}>
          {title}
        </Typography>
      </Box>

      {items.length > 0 ? (
        <Stack spacing={1}>
          {items.map((item) => (
            <Stack key={item} direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
              <Box sx={{ mt: 0.15, color: '#111111' }}>{icon}</Box>
              <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                {item}
              </Typography>
            </Stack>
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary">{emptyMessage}</Typography>
      )}
    </Stack>
  </Paper>
)

export const SellerStudioPage = () => {
  const { user } = useAuth()
  const { notify } = useNotification()
  const { openAuthDialog } = useOutletContext<MainLayoutOutletContext>()
  const [form, setForm] = useState<SellerStudioFormState>(defaultSellerStudioForm)
  const [submitMode, setSubmitMode] = useState<SellerListingMode | null>(null)

  const isAuthenticated = Boolean(user)
  const isSeller = user?.role === 'seller'
  const parsedPrice = Number(form.price)
  const highlightValues = splitByLine(form.highlights)
  const idealForValues = splitByLine(form.idealFor)
  const stackValues = splitByComma(form.stackInput)
  const includedFileValues = splitByLine(form.includedFiles)
  const categoryLabel = findLabel(sellerUploadCategoryOptions, form.categoryId)
  const licenseLabel = findLabel(sellerUploadLicenseOptions, form.licenseId)
  const deliveryLabel = form.instantDelivery
    ? 'ดาวน์โหลดได้ทันที'
    : form.sourceIncluded
      ? 'รวมไฟล์ต้นฉบับ'
      : form.documentationIncluded
        ? 'รวมเอกสารประกอบ'
        : 'จัดส่งหลังตรวจสอบ'
  const fileFormatLabel = [
    form.packageFileName ? 'ไฟล์หลัก' : null,
    form.coverFileName ? 'ภาพพรีวิว' : null,
    form.docsFileName ? 'เอกสาร' : null,
  ]
    .filter(Boolean)
    .join(' + ') || 'ยังไม่ได้แนบไฟล์'
  const previewProduct: Product = {
    id: 'seller-studio-preview',
    categoryId: form.categoryId,
    title: form.title.trim() || 'ชื่อรายการขายของคุณ',
    summary: form.summary.trim() || 'คำอธิบายสั้นของแพ็กเกจจะแสดงตรงส่วนนี้',
    fullDescription:
      form.description.trim() || 'รายละเอียดสินค้าแบบเต็มจะไปแสดงในหน้ารายละเอียดรายการขาย',
    category: categoryLabel,
    price: Number.isFinite(parsedPrice) && parsedPrice > 0 ? parsedPrice : 0,
    rating: 4.9,
    sales: 0,
    tags: highlightValues.slice(0, 2).length > 0 ? highlightValues.slice(0, 2) : ['พร้อมใช้', 'รอตั้งค่า'],
    stack: stackValues.length > 0 ? stackValues : ['React', 'TypeScript', 'MUI'],
    featureHighlights: highlightValues,
    includedItems: includedFileValues,
    idealFor: idealForValues,
    supportInfo: form.supportInfo.trim() || 'ข้อมูลเพิ่มเติมหรือเงื่อนไขการใช้งานจะไปแสดงในส่วนนี้',
    versionLabel: form.version.trim() || '1.0.0',
    fileFormatLabel,
    authorName: user?.storeName?.trim() || user?.name || 'บัญชีผู้ขาย',
    updatedAt: 'ตัวอย่างก่อนส่งขาย',
    updatedDaysAgo: 0,
    delivery: deliveryLabel,
    license: licenseLabel,
    licenseId: form.licenseId,
    verified: true,
  }
  const isFormValid =
    form.title.trim().length > 0 &&
    form.summary.trim().length > 0 &&
    form.description.trim().length > 0 &&
    Number.isFinite(parsedPrice) &&
    parsedPrice > 0 &&
    form.packageFileName.length > 0

  const handleFieldChange = <Key extends keyof SellerStudioFormState>(
    key: Key,
    value: SellerStudioFormState[Key],
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }))
  }

  const handleFileSelect =
    (field: 'packageFileName' | 'coverFileName' | 'docsFileName') =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (!file) {
        return
      }

      handleFieldChange(field, formatFileMeta(file))
      event.target.value = ''
    }

  const handleReset = () => {
    setForm(defaultSellerStudioForm)
  }

  const handleSubmit = async (mode: SellerListingMode) => {
    if (!isFormValid) {
      notify({
        severity: 'warning',
        title: 'ข้อมูลยังไม่ครบ',
        message: 'กรอกชื่อรายการ ราคา คำอธิบาย และแนบไฟล์แพ็กเกจหลักก่อนบันทึกหรือส่งขาย',
      })
      return
    }

    setSubmitMode(mode)

    const payload: SellerListingInput = {
      assetType: form.assetType,
      title: form.title.trim(),
      categoryId: form.categoryId,
      licenseId: form.licenseId,
      price: parsedPrice,
      summary: form.summary.trim(),
      description: form.description.trim(),
      highlights: highlightValues,
      idealFor: idealForValues,
      supportInfo: form.supportInfo.trim(),
      stack: stackValues,
      version: form.version.trim(),
      demoUrl: form.demoUrl.trim(),
      supportUrl: form.supportUrl.trim(),
      includedFiles: includedFileValues,
      packageFileName: form.packageFileName,
      coverFileName: form.coverFileName,
      docsFileName: form.docsFileName,
      instantDelivery: form.instantDelivery,
      sourceIncluded: form.sourceIncluded,
      documentationIncluded: form.documentationIncluded,
    }

    try {
      const response = await sellerService.submitListing(payload, mode)

      notify({
        severity: mode === 'publish' ? 'success' : 'info',
        title: response.title,
        message: response.description,
      })
    } catch (caughtError) {
      notify({
        severity: 'error',
        title: 'ส่งรายการไม่สำเร็จ',
        message:
          caughtError instanceof Error
            ? caughtError.message
            : 'ไม่สามารถบันทึกรายการขายได้ในขณะนี้',
      })
    } finally {
      setSubmitMode(null)
    }
  }

  if (!isAuthenticated) {
    return (
      <Container
        maxWidth="lg"
        sx={{ display: 'grid', gap: { xs: 3, md: 4 }, py: { xs: 5, md: 7 } }}
      >
        <Paper
          sx={{
            p: { xs: 3, md: 4.5 },
            borderRadius: uiRadius.xl,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(245,245,248,0.78) 100%)',
          }}
        >
          <Stack spacing={2.25} sx={{ maxWidth: 760 }}>
            <SectionBadge label="สตูดิโออัปโหลดสำหรับผู้ขาย" />
            <Typography variant="h2">
              เข้าสู่ระบบก่อนเพื่ออัปโหลดซอร์สโค้ด เทมเพลต และชุดคอมโพเนนต์สำหรับขาย
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
              ระบบนี้รองรับการบันทึกร่างรายการขาย แนบไฟล์ และเตรียมข้อมูลสำหรับต่อ API จริงในภายหลัง
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
              <Button variant="contained" onClick={() => openAuthDialog('seller-register')}>
                เปิดบัญชีผู้ขาย
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/seller"
                endIcon={<ArrowOutwardRoundedIcon />}
              >
                กลับไปศูนย์ผู้ขาย
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    )
  }

  if (!isSeller) {
    return (
      <Container
        maxWidth="lg"
        sx={{ display: 'grid', gap: { xs: 3, md: 4 }, py: { xs: 5, md: 7 } }}
      >
        <Paper
          sx={{
            p: { xs: 3, md: 4.5 },
            borderRadius: uiRadius.xl,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(245,245,248,0.78) 100%)',
          }}
        >
          <Stack spacing={2.25} sx={{ maxWidth: 760 }}>
            <SectionBadge label="บัญชีนี้ยังไม่ใช่ผู้ขาย" />
            <Typography variant="h2">
              อัปเกรดบัญชีเป็นผู้ขายก่อน เพื่อเริ่มอัปโหลดไฟล์และเปิดขายบน CodeBazaar
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
              เมื่อเปิดบัญชีผู้ขายแล้ว คุณจะสามารถอัปโหลดไฟล์แพ็กเกจ ตั้งราคา กำหนดไลเซนส์ และส่งรายการขายได้จากหน้านี้
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
              <Button variant="contained" onClick={() => openAuthDialog('seller-register')}>
                เปิดบัญชีผู้ขาย
              </Button>
              <Button variant="outlined" component={RouterLink} to="/profile">
                ไปหน้าตั้งค่าโปรไฟล์
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    )
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ display: 'grid', gap: { xs: 3, md: 4 }, py: { xs: 5, md: 7 } }}
    >
      <Paper
        sx={{
          p: { xs: 3, md: 4.5 },
          borderRadius: uiRadius.xl,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(245,245,248,0.78) 100%)',
        }}
      >
        <Stack spacing={2.5}>
          <Stack spacing={2}>
            <SectionBadge label="สตูดิโอสำหรับอัปโหลดรายการขาย" />
            <Typography variant="h2" sx={{ maxWidth: 820 }}>
              อัปโหลดซอร์สโค้ด เทมเพลต และชุดคอมโพเนนต์ เพื่อเตรียมลงขายและจัดการข้อมูลรายการได้จากหน้าจอเดียว
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 780, fontWeight: 500 }}>
              หน้านี้ใช้สำหรับกรอกข้อมูลสินค้า อัปโหลดไฟล์ที่เกี่ยวข้อง และเตรียมรายละเอียดให้พร้อมก่อนส่งขึ้นขายบน CodeBazaar
            </Typography>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/seller"
              endIcon={<ArrowOutwardRoundedIcon />}
            >
              กลับไปศูนย์ผู้ขาย
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Grid
        container
        spacing={3}
        sx={{ flexDirection: { xs: 'column', lg: 'row-reverse' } }}
      >
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            <Paper sx={{ p: { xs: 3, md: 3.5 }, borderRadius: uiRadius.xl }}>
              <Stack spacing={2.5}>
                <Box>
                  <SectionBadge label="ข้อมูลรายการขาย" />
                  <Typography variant="h4" sx={{ mt: 1.25 }}>
                    ตั้งค่ารายละเอียดหลักของซอร์สโค้ดหรือเทมเพลตที่ต้องการลงขาย
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    ข้อมูลในส่วนนี้จะถูกนำไปใช้ทั้งบนการ์ดรายการขายและหน้ารายละเอียดสินค้า
                    เพื่อให้ผู้ซื้อเห็นเนื้อหาตรงกับที่คุณกรอกไว้
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      select
                      fullWidth
                      label="ประเภทสินค้า"
                      value={form.assetType}
                      onChange={(event) =>
                        handleFieldChange('assetType', event.target.value as SellerAssetType)
                      }
                    >
                      {sellerAssetTypeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      select
                      fullWidth
                      label="หมวดหมู่"
                      value={form.categoryId}
                      onChange={(event) => handleFieldChange('categoryId', event.target.value)}
                    >
                      {sellerUploadCategoryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      select
                      fullWidth
                      label="ไลเซนส์"
                      value={form.licenseId}
                      onChange={(event) => handleFieldChange('licenseId', event.target.value)}
                    >
                      {sellerUploadLicenseOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, md: 8 }}>
                    <TextField
                      fullWidth
                      label="ชื่อรายการขาย"
                      value={form.title}
                      onChange={(event) => handleFieldChange('title', event.target.value)}
                      placeholder="เช่น Boilerplate มาร์เก็ตเพลส React + TypeScript"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      fullWidth
                      type="number"
                      label="ราคา (บาท)"
                      value={form.price}
                      onChange={(event) => handleFieldChange('price', event.target.value)}
                      slotProps={{ htmlInput: { min: 0, step: 10 } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="คำอธิบายสั้น"
                      value={form.summary}
                      onChange={(event) => handleFieldChange('summary', event.target.value)}
                      placeholder="สรุปสิ่งที่ลูกค้าจะได้จากแพ็กเกจนี้ใน 1-2 ประโยค"
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      label="รายละเอียดสินค้า"
                      value={form.description}
                      onChange={(event) => handleFieldChange('description', event.target.value)}
                      placeholder="อธิบายโครงสร้างโปรเจกต์ จุดเด่น วิธีใช้งาน และสิ่งที่รวมอยู่ในแพ็กเกจ"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="จุดเด่นของสินค้า"
                      value={form.highlights}
                      onChange={(event) => handleFieldChange('highlights', event.target.value)}
                      placeholder={'Responsive\nAPI Ready\nมีระบบผู้ขายและตะกร้า'}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="เหมาะกับใคร"
                      value={form.idealFor}
                      onChange={(event) => handleFieldChange('idealFor', event.target.value)}
                      placeholder={'ทีมที่ต้องการเริ่มระบบขายไฟล์ดิจิทัล\nฟรีแลนซ์ที่ต้องการ base project พร้อมต่อยอด\nเจ้าของแพลตฟอร์มที่อยากเปิด MVP ได้เร็ว'}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="รายการไฟล์ที่รวมอยู่"
                      value={form.includedFiles}
                      onChange={(event) => handleFieldChange('includedFiles', event.target.value)}
                      placeholder={'src/\npublic/\nREADME.md'}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="ข้อมูลเพิ่มเติมสำหรับหน้ารายละเอียด"
                      value={form.supportInfo}
                      onChange={(event) => handleFieldChange('supportInfo', event.target.value)}
                      placeholder="บอกขอบเขตการใช้งาน การต่อยอด หรือข้อสังเกตเพิ่มเติมที่ผู้ซื้อควรรู้ก่อนตัดสินใจ"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="เทคโนโลยีหลัก"
                      value={form.stackInput}
                      onChange={(event) => handleFieldChange('stackInput', event.target.value)}
                      placeholder="React, TypeScript, MUI"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <TextField
                      fullWidth
                      label="เวอร์ชัน"
                      value={form.version}
                      onChange={(event) => handleFieldChange('version', event.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <TextField
                      fullWidth
                      label="ลิงก์เดโม"
                      value={form.demoUrl}
                      onChange={(event) => handleFieldChange('demoUrl', event.target.value)}
                      placeholder="https://"
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="ลิงก์ support หรือคู่มือ"
                      value={form.supportUrl}
                      onChange={(event) => handleFieldChange('supportUrl', event.target.value)}
                      placeholder="เช่น Notion, Docs หรือหน้า support"
                    />
                  </Grid>
                </Grid>

                <Divider />

                <Box>
                  <Typography variant="h6">ตัวเลือกการส่งมอบและสิ่งที่รวมในแพ็กเกจ</Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.6 }}>
                    ตั้งค่าว่ารายการนี้จะดาวน์โหลดได้ทันที มีซอร์สโค้ดต้นฉบับ และมีเอกสารประกอบหรือไม่
                  </Typography>
                </Box>

                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12 }}>
                    <DeliveryOptionCard
                      title="ดาวน์โหลดได้ทันที"
                      description="เปิดส่งมอบแบบดิจิทัลอัตโนมัติ"
                      checked={form.instantDelivery}
                      onChange={(checked) => handleFieldChange('instantDelivery', checked)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <DeliveryOptionCard
                      title="รวมซอร์สโค้ด"
                      description="แนบไฟล์ต้นฉบับสำหรับผู้ซื้อ"
                      checked={form.sourceIncluded}
                      onChange={(checked) => handleFieldChange('sourceIncluded', checked)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <DeliveryOptionCard
                      title="รวมเอกสารประกอบ"
                      description="แนบ docs หรือคู่มือการติดตั้ง"
                      checked={form.documentationIncluded}
                      onChange={(checked) => handleFieldChange('documentationIncluded', checked)}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Paper>

            <Paper sx={{ p: { xs: 3, md: 3.5 }, borderRadius: uiRadius.xl }}>
              <Stack spacing={2.5}>
                <Box>
                  <SectionBadge label="ไฟล์ที่อัปโหลด" />
                  <Typography variant="h4" sx={{ mt: 1.25 }}>
                    แนบไฟล์แพ็กเกจหลัก ภาพพรีวิว และเอกสารประกอบให้พร้อมก่อนส่งขาย
                  </Typography>
                </Box>

                <Stack spacing={1.5}>
                  <UploadFieldCard
                    title="ไฟล์แพ็กเกจหลัก"
                    description="ใช้สำหรับไฟล์ .zip หรือแพ็กเกจบีบอัดที่ลูกค้าจะดาวน์โหลด"
                    accept=".zip,.rar,.7z,.tar,.gz"
                    icon={<FolderZipRoundedIcon />}
                    fileName={form.packageFileName}
                    buttonLabel="เลือกไฟล์หลัก"
                    onSelect={handleFileSelect('packageFileName')}
                  />
                  <UploadFieldCard
                    title="ภาพปกหรือพรีวิว"
                    description="แนบภาพปกเพื่อใช้แสดงบนรายการขายหรือหน้ารายละเอียดสินค้า"
                    accept="image/*"
                    icon={<ImageRoundedIcon />}
                    fileName={form.coverFileName}
                    buttonLabel="เลือกภาพ"
                    onSelect={handleFileSelect('coverFileName')}
                  />
                  <UploadFieldCard
                    title="เอกสารประกอบ"
                    description="แนบคู่มือ install, changelog หรือเอกสารการใช้งานเพิ่มเติม"
                    accept=".pdf,.md,.txt,.zip"
                    icon={<DescriptionRoundedIcon />}
                    fileName={form.docsFileName}
                    buttonLabel="เลือกเอกสาร"
                    onSelect={handleFileSelect('docsFileName')}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<SellRoundedIcon />}
                    onClick={() => handleSubmit('publish')}
                    disabled={submitMode !== null}
                  >
                    ส่งขึ้นรายการขาย
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<LayersRoundedIcon />}
                    onClick={() => handleSubmit('draft')}
                    disabled={submitMode !== null}
                  >
                    บันทึกร่าง
                  </Button>
                  <Button variant="outlined" fullWidth onClick={handleReset}>
                    รีเซ็ตฟอร์ม
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack
            spacing={3}
            sx={{
              position: { lg: 'sticky' },
              top: { lg: 104 },
              alignSelf: { lg: 'flex-start' },
              maxHeight: { lg: 'calc(100vh - 124px)' },
            }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: uiRadius.xl,
                overflowY: { lg: 'auto' },
              }}
            >
              <Stack spacing={2.5}>
                <Box>
                  <SectionBadge label="ตัวอย่างหน้ารายละเอียด" />
                  <Typography variant="h5" sx={{ mt: 1.25 }}>
                    ข้อมูลที่กรอกจะถูกจัดวางประมาณนี้ในหน้าที่ผู้ซื้อเข้ามาดูรายละเอียด
                  </Typography>
                </Box>

                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    <Chip
                      icon={<VerifiedRoundedIcon />}
                      label="ผู้ขายยืนยันแล้ว"
                      sx={{ backgroundColor: '#111111', color: 'common.white' }}
                    />
                    <SectionBadge label={categoryLabel} />
                    <SectionBadge label={deliveryLabel} />
                  </Stack>

                  <ProjectPreview product={previewProduct} />

                  <Box>
                    <Typography variant="h4" sx={{ lineHeight: 1.15 }}>
                      {previewProduct.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {previewProduct.summary}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    {previewProduct.stack.map((stack) => (
                      <Chip key={stack} label={stack} />
                    ))}
                  </Stack>
                </Stack>

                <Paper sx={{ ...metricSurfaceSx }}>
                  <Stack spacing={1.1}>
                    <PreviewMetaRow
                      label="ประเภทสินค้า"
                      value={findLabel(sellerAssetTypeOptions, form.assetType)}
                    />
                    <PreviewMetaRow label="หมวดหมู่" value={categoryLabel} />
                    <PreviewMetaRow label="ไลเซนส์" value={licenseLabel} />
                    <PreviewMetaRow
                      label="ราคา"
                      value={previewProduct.price > 0 ? formatCurrency(previewProduct.price) : '-'}
                    />
                    <PreviewMetaRow label="เวอร์ชัน" value={previewProduct.versionLabel} />
                    <PreviewMetaRow label="รูปแบบไฟล์" value={previewProduct.fileFormatLabel} />
                  </Stack>
                </Paper>

                <PreviewListSection
                  badge="จุดเด่นของแพ็กเกจ"
                  title="สิ่งที่รายการนี้ช่วยผู้ซื้อได้"
                  icon={<CheckCircleRoundedIcon sx={{ fontSize: 18 }} />}
                  items={highlightValues}
                  emptyMessage="เพิ่มจุดเด่นของสินค้าเพื่อให้หน้ารายละเอียดดูน่าเชื่อถือและตัดสินใจซื้อง่ายขึ้น"
                />

                <PreviewListSection
                  badge="สิ่งที่รวมมาให้"
                  title="รายการไฟล์และองค์ประกอบในแพ็กเกจ"
                  icon={<DownloadRoundedIcon sx={{ fontSize: 18 }} />}
                  items={includedFileValues}
                  emptyMessage="เพิ่มรายการไฟล์หรือองค์ประกอบที่รวมมาให้ เพื่อบอกขอบเขตของแพ็กเกจ"
                />

                <PreviewListSection
                  badge="เหมาะกับใคร"
                  title="ผู้ซื้อกลุ่มไหนควรเลือกแพ็กเกจนี้"
                  icon={<CheckCircleRoundedIcon sx={{ fontSize: 18 }} />}
                  items={idealForValues}
                  emptyMessage="กรอกกลุ่มเป้าหมายหรือประเภทงานที่เหมาะกับสินค้า เพื่อให้หน้ารายละเอียดชัดขึ้น"
                />

                <Paper sx={{ ...metricSurfaceSx }}>
                  <Stack spacing={1.35}>
                    <Box>
                      <SectionBadge label="ข้อมูลเพิ่มเติม" />
                      <Typography variant="h6" sx={{ mt: 1 }}>
                        ข้อความส่วนท้ายของหน้ารายละเอียด
                      </Typography>
                    </Box>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {previewProduct.supportInfo}
                    </Typography>

                    {form.demoUrl.trim() || form.supportUrl.trim() ? (
                      <>
                        <Divider />
                        <Stack spacing={0.9}>
                          {form.demoUrl.trim() ? (
                            <ReviewRow label="ลิงก์เดโม" value="มีข้อมูลพร้อมแสดง" />
                          ) : null}
                          {form.supportUrl.trim() ? (
                            <ReviewRow label="ลิงก์ support" value="มีข้อมูลพร้อมแสดง" />
                          ) : null}
                        </Stack>
                      </>
                    ) : null}
                  </Stack>
                </Paper>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}
