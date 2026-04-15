import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import GoogleIcon from '@mui/icons-material/Google'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { Link as RouterLink, useOutletContext } from 'react-router-dom'
import { useAuth } from '@/app/providers/useAuth'
import { useNotification } from '@/app/providers/useNotification'
import { IOSSwitch } from '@/components/common/IOSSwitch'
import { ProfileAvatar } from '@/components/common/ProfileAvatar'
import { SectionBadge } from '@/components/common/SectionBadge'
import type { MainLayoutOutletContext } from '@/layouts/MainLayout'
import { glassSurfaceMutedSx, uiRadius } from '@/theme/uiTokens'
import type { AuthProfileUpdate, AuthSessionUser } from '@/types/auth'

type ProfileFormState = Pick<
  AuthSessionUser,
  | 'name'
  | 'phoneNumber'
  | 'storeName'
  | 'bankName'
  | 'bankAccountNumber'
  | 'bankBookImageName'
  | 'bankBookImageUrl'
  | 'identityCardImageName'
  | 'identityCardImageUrl'
  | 'notifyOrders'
  | 'notifyMarketplace'
>

const sellerBankOptions = [
  'ธนาคารกรุงเทพ',
  'ธนาคารกสิกรไทย',
  'ธนาคารกรุงไทย',
  'ธนาคารไทยพาณิชย์',
  'ธนาคารกรุงศรีอยุธยา',
  'ธนาคารทหารไทยธนชาต',
  'ธนาคารออมสิน',
  'ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร',
  'ธนาคารซีไอเอ็มบี ไทย',
  'ธนาคารยูโอบี',
] as const

const createProfileFormState = (user: AuthSessionUser): ProfileFormState => ({
  name: user.name,
  phoneNumber: user.phoneNumber,
  storeName: user.storeName,
  bankName: user.bankName,
  bankAccountNumber: user.bankAccountNumber,
  bankBookImageName: user.bankBookImageName,
  bankBookImageUrl: user.bankBookImageUrl,
  identityCardImageName: user.identityCardImageName,
  identityCardImageUrl: user.identityCardImageUrl,
  notifyOrders: user.notifyOrders,
  notifyMarketplace: user.notifyMarketplace,
})

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
        return
      }

      reject(new Error('ไม่สามารถอ่านไฟล์รูปภาพได้'))
    }

    reader.onerror = () => reject(new Error('ไม่สามารถอ่านไฟล์รูปภาพได้'))
    reader.readAsDataURL(file)
  })

const formatProfileFileMeta = (file: File) => {
  const sizeInKb = file.size / 1024

  if (sizeInKb < 1024) {
    return `${file.name} · ${Math.max(1, Math.round(sizeInKb))} KB`
  }

  return `${file.name} · ${(sizeInKb / 1024).toFixed(1)} MB`
}

const AccountMetaRow = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700, textAlign: 'right' }}>{value}</Typography>
  </Stack>
)

interface SellerDocumentUploadCardProps {
  title: string
  description: string
  fileName: string
  imageUrl: string
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void
}

const SellerDocumentUploadCard = ({
  title,
  description,
  fileName,
  imageUrl,
  onSelect,
}: SellerDocumentUploadCardProps) => (
  <Paper sx={{ ...glassSurfaceMutedSx, p: 2.25, borderRadius: uiRadius.lg, height: '100%' }}>
    <Stack spacing={1.5}>
      <Box
        sx={{
          width: '100%',
          height: 168,
          overflow: 'hidden',
          display: 'grid',
          placeItems: 'center',
          borderRadius: uiRadius.lg,
          backgroundColor: 'rgba(17, 17, 17, 0.04)',
          border: '1px solid rgba(17, 17, 17, 0.08)',
        }}
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <ImageRoundedIcon sx={{ fontSize: 38, color: 'rgba(17, 17, 17, 0.34)' }} />
        )}
      </Box>

      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography color="text.secondary">{description}</Typography>
      </Box>

      <Stack spacing={1}>
        <Box
          sx={{ minHeight: 42, display: 'flex', alignItems: 'center' }}
        >
          <Typography
            color={fileName ? 'text.primary' : 'text.secondary'}
            sx={{ wordBreak: 'break-all' }}
          >
            {fileName || 'ยังไม่ได้เลือกไฟล์'}
          </Typography>
        </Box>

        <Button component="label" variant="outlined" sx={{ alignSelf: 'flex-start' }}>
          อัปโหลดไฟล์
          <input hidden type="file" accept="image/*" onChange={onSelect} />
        </Button>
      </Stack>
    </Stack>
  </Paper>
)

interface AuthenticatedProfileContentProps {
  user: AuthSessionUser
  onSave: (profile: AuthProfileUpdate) => void
  onSignOut: () => void
}

const AuthenticatedProfileContent = ({
  user,
  onSave,
  onSignOut,
}: AuthenticatedProfileContentProps) => {
  const [form, setForm] = useState(() => createProfileFormState(user))
  const { notify } = useNotification()

  const accountTypeLabel = user.role === 'seller' ? 'บัญชีผู้ขาย' : 'บัญชีผู้ซื้อ'
  const isSeller = user.role === 'seller'
  const isDirty =
    form.name !== user.name ||
    form.phoneNumber !== user.phoneNumber ||
    form.storeName !== user.storeName ||
    form.bankName !== user.bankName ||
    form.bankAccountNumber !== user.bankAccountNumber ||
    form.bankBookImageName !== user.bankBookImageName ||
    form.bankBookImageUrl !== user.bankBookImageUrl ||
    form.identityCardImageName !== user.identityCardImageName ||
    form.identityCardImageUrl !== user.identityCardImageUrl ||
    form.notifyOrders !== user.notifyOrders ||
    form.notifyMarketplace !== user.notifyMarketplace

  const handleFieldChange = <Key extends keyof ProfileFormState>(
    key: Key,
    value: ProfileFormState[Key],
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }))
  }

  const handleReset = () => {
    setForm(createProfileFormState(user))
  }

  const handleSellerFileSelect =
    (
      field: 'bankBookImageName' | 'identityCardImageName',
      imageField: 'bankBookImageUrl' | 'identityCardImageUrl',
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (!file) {
        return
      }

      event.target.value = ''

      void readFileAsDataUrl(file)
        .then((dataUrl) => {
          setForm((currentForm) => ({
            ...currentForm,
            [field]: formatProfileFileMeta(file),
            [imageField]: dataUrl,
          }))
        })
        .catch((error) => {
          notify({
            severity: 'error',
            title: 'อัปโหลดรูปไม่สำเร็จ',
            message: error instanceof Error ? error.message : 'ลองเลือกไฟล์รูปใหม่อีกครั้ง',
          })
        })
    }

  const handleSave = () => {
    const nextProfile: AuthProfileUpdate = {
      name: form.name.trim() || user.name,
      phoneNumber: form.phoneNumber.trim(),
      storeName: form.storeName.trim(),
      bankName: form.bankName.trim(),
      bankAccountNumber: form.bankAccountNumber.trim(),
      bankBookImageName: form.bankBookImageName.trim(),
      bankBookImageUrl: form.bankBookImageUrl.trim(),
      identityCardImageName: form.identityCardImageName.trim(),
      identityCardImageUrl: form.identityCardImageUrl.trim(),
      notifyOrders: form.notifyOrders,
      notifyMarketplace: form.notifyMarketplace,
    }

    onSave(nextProfile)
    setForm((currentForm) => ({
      ...currentForm,
      ...nextProfile,
      name: nextProfile.name ?? currentForm.name,
    }))
    notify({
      severity: 'success',
      title: 'บันทึกโปรไฟล์แล้ว',
      message: 'ข้อมูลโปรไฟล์และการตั้งค่าถูกอัปเดตในเครื่องเรียบร้อยแล้ว',
    })
  }

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: { md: 104 }, alignSelf: 'flex-start' }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: uiRadius.xl,
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(245, 245, 248, 0.78) 100%)',
            }}
          >
            <Stack spacing={2.5}>
              <ProfileAvatar name={form.name} size={78} />

              <Stack spacing={0.8}>
                <Typography variant="h4" sx={{ lineHeight: 1.05 }}>
                  {form.name}
                </Typography>
                <Typography color="text.secondary">{user.email}</Typography>
              </Stack>

              <Divider />

              <Stack spacing={1.2}>
                <AccountMetaRow label="สิทธิ์การใช้งาน" value={accountTypeLabel} />
                <AccountMetaRow label="ผู้ให้บริการ" value="Google" />
                <AccountMetaRow label="สถานะข้อมูล" value="บันทึกในเครื่อง" />
                <AccountMetaRow label="อีเมลบัญชี" value={user.email} />
                <AccountMetaRow label="เบอร์โทร" value={form.phoneNumber || 'ยังไม่ระบุ'} />
                {isSeller ? (
                  <>
                    <AccountMetaRow
                      label="ธนาคารรับเงิน"
                      value={form.bankName || 'ยังไม่ระบุ'}
                    />
                    <AccountMetaRow
                      label="เอกสารผู้ขาย"
                      value={
                        form.bankBookImageName && form.identityCardImageName
                          ? 'แนบครบแล้ว'
                          : 'รออัปโหลด'
                      }
                    />
                  </>
                ) : null}
              </Stack>

              <Stack spacing={1.25}>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/downloads"
                  startIcon={<DownloadRoundedIcon />}
                >
                  คลังดาวน์โหลด
                </Button>
                {user.role === 'seller' ? (
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to="/seller/orders"
                    startIcon={<ReceiptLongRoundedIcon />}
                  >
                    คำสั่งซื้อของร้าน
                  </Button>
                ) : null}
                <Button variant="outlined" startIcon={<LogoutRoundedIcon />} onClick={onSignOut}>
                  ออกจากระบบ
                </Button>
              </Stack>
            </Stack>
          </Paper>

        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <Stack spacing={3}>
          <Paper
            sx={{
              p: { xs: 3, md: 3.5 },
              borderRadius: uiRadius.xl,
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(245, 245, 248, 0.78) 100%)',
            }}
          >
            <Stack spacing={2.5}>
              <Box>
                <SectionBadge label="ข้อมูลโปรไฟล์" />
                <Typography variant="h4" sx={{ mt: 1.25 }}>
                  ปรับข้อมูลที่จะแสดงบนบัญชีและหน้าร้านของคุณ
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="ชื่อที่แสดง"
                    value={form.name}
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="ชื่อร้านหรือชื่อทีม"
                    value={form.storeName}
                    onChange={(event) => handleFieldChange('storeName', event.target.value)}
                    placeholder="ใส่เมื่อคุณต้องการขายผลงาน"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="เบอร์โทรติดต่อ"
                    value={form.phoneNumber}
                    onChange={(event) => handleFieldChange('phoneNumber', event.target.value)}
                    placeholder="08X-XXX-XXXX"
                  />
                </Grid>
              </Grid>

            </Stack>
          </Paper>

          {isSeller ? (
            <Paper
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: uiRadius.xl,
                backgroundColor: 'rgba(255, 255, 255, 0.72)',
              }}
            >
              <Stack spacing={2.5}>
                <Box>
                  <SectionBadge label="ข้อมูลรับเงิน" />
                  <Typography variant="h4" sx={{ mt: 1.25 }}>
                    จัดการข้อมูลธนาคารและเอกสารสำหรับบัญชีผู้ขาย
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    ใช้สำหรับเตรียมข้อมูลรับเงินและยืนยันตัวตนก่อนเชื่อมระบบผู้ขายจริงในภายหลัง
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      select
                      label="ชื่อธนาคาร"
                      value={form.bankName}
                      onChange={(event) => handleFieldChange('bankName', event.target.value)}
                    >
                      <MenuItem value="">เลือกธนาคาร</MenuItem>
                      {sellerBankOptions.map((bankName) => (
                        <MenuItem key={bankName} value={bankName}>
                          {bankName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="เลขบัญชีธนาคาร"
                      value={form.bankAccountNumber}
                      onChange={(event) =>
                        handleFieldChange('bankAccountNumber', event.target.value)
                      }
                      placeholder="เช่น 123-4-56789-0"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <SellerDocumentUploadCard
                      title="รูปหน้าสมุดธนาคาร"
                      description="ใช้ยืนยันข้อมูลบัญชีรับเงินของผู้ขาย"
                      fileName={form.bankBookImageName}
                      imageUrl={form.bankBookImageUrl}
                      onSelect={handleSellerFileSelect('bankBookImageName', 'bankBookImageUrl')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <SellerDocumentUploadCard
                      title="รูปบัตรประชาชน"
                      description="ใช้สำหรับยืนยันตัวตนของเจ้าของบัญชีผู้ขาย"
                      fileName={form.identityCardImageName}
                      imageUrl={form.identityCardImageUrl}
                      onSelect={handleSellerFileSelect(
                        'identityCardImageName',
                        'identityCardImageUrl',
                      )}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
          ) : null}

          <Paper
            sx={{
              p: { xs: 3, md: 3.5 },
              borderRadius: uiRadius.xl,
              backgroundColor: 'rgba(255, 255, 255, 0.72)',
            }}
          >
            <Stack spacing={2.5}>
              <Box>
                <SectionBadge label="การแจ้งเตือน" />
                <Typography variant="h4" sx={{ mt: 1.25 }}>
                  เลือกรูปแบบการแจ้งเตือนที่ต้องการรับ
                </Typography>
              </Box>

              <Paper sx={{ ...glassSurfaceMutedSx, p: 2.2, borderRadius: uiRadius.lg }}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box>
                    <Typography variant="h6">การแจ้งเตือนคำสั่งซื้อ</Typography>
                    <Typography color="text.secondary">
                      แจ้งเมื่อมีคำสั่งซื้อใหม่หรือสถานะรายการที่คุณซื้อมีการเปลี่ยนแปลง
                    </Typography>
                  </Box>
                  <IOSSwitch
                    checked={form.notifyOrders}
                    onChange={(event) => handleFieldChange('notifyOrders', event.target.checked)}
                  />
                </Stack>
              </Paper>

              <Paper sx={{ ...glassSurfaceMutedSx, p: 2.2, borderRadius: uiRadius.lg }}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box>
                    <Typography variant="h6">ข่าวสารและอัปเดตแพลตฟอร์ม</Typography>
                    <Typography color="text.secondary">
                      รับข่าวหมวดใหม่ โปรโมชัน และอัปเดตเกี่ยวกับ marketplace
                    </Typography>
                  </Box>
                  <IOSSwitch
                    checked={form.notifyMarketplace}
                    onChange={(event) =>
                      handleFieldChange('notifyMarketplace', event.target.checked)
                    }
                  />
                </Stack>
              </Paper>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.25}
                sx={{
                  justifyContent: { sm: 'flex-end' },
                  alignItems: { xs: 'stretch', sm: 'center' },
                  pt: 0.5,
                }}
              >
                <Button variant="contained" disabled={!isDirty} onClick={handleSave}>
                  บันทึกการเปลี่ยนแปลง
                </Button>
                <Button variant="outlined" disabled={!isDirty} onClick={handleReset}>
                  รีเซ็ตข้อมูล
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  )
}

export const ProfilePage = () => {
  const { user, isAuthenticated, signOut, updateProfile } = useAuth()
  const { notify } = useNotification()
  const { openAuthDialog } = useOutletContext<MainLayoutOutletContext>()

  const handleSignOut = () => {
    signOut()
    notify({
      severity: 'info',
      title: 'ออกจากระบบแล้ว',
      message: 'บัญชีปัจจุบันถูกออกจากระบบเรียบร้อยแล้ว',
    })
  }

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
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(245, 245, 248, 0.78) 100%)',
        }}
      >
        <Stack spacing={2.25}>
          <SectionBadge label="ตั้งค่าโปรไฟล์" />
          <Typography variant="h2" sx={{ maxWidth: 760 }}>
            จัดการข้อมูลบัญชี ข้อมูลร้าน และรูปแบบการแจ้งเตือนในหน้าเดียว
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760, fontWeight: 500 }}>
            ใช้หน้านี้สำหรับอัปเดตชื่อโปรไฟล์ เบอร์โทร ข้อมูลร้าน เอกสารผู้ขาย
            และการแจ้งเตือนของบัญชีที่คุณกำลังใช้งานอยู่บน CodeBazaar
          </Typography>
        </Stack>
      </Paper>

      {isAuthenticated && user ? (
        <AuthenticatedProfileContent
          key={`${user.id}-${user.role}`}
          user={user}
          onSave={updateProfile}
          onSignOut={handleSignOut}
        />
      ) : (
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: uiRadius.xl,
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.84) 0%, rgba(245, 245, 248, 0.76) 100%)',
          }}
        >
          <Stack spacing={2.5} sx={{ maxWidth: 720 }}>
            <SectionBadge label="ยังไม่มีบัญชีที่กำลังใช้งานอยู่" />
            <Typography variant="h4">เข้าสู่ระบบก่อนเพื่อแก้ไขข้อมูลโปรไฟล์และตั้งค่าบัญชี</Typography>
            <Typography color="text.secondary">
              เข้าสู่ระบบด้วยบัญชี Google เพื่อเริ่มตั้งค่าชื่อผู้ใช้ ข้อมูลร้าน เบอร์โทร
              และรายละเอียดบัญชีอื่น ๆ ที่จะถูกนำไปใช้ต่อในขั้นตอนซื้อขายของระบบ
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
              <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                onClick={() => openAuthDialog('buyer-login')}
              >
                เข้าสู่ระบบด้วย Google
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/"
                endIcon={<ArrowOutwardRoundedIcon />}
              >
                กลับไปดูสินค้าทั้งหมด
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Container>
  )
}
