import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import GoogleIcon from '@mui/icons-material/Google'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink, useOutletContext } from 'react-router-dom'
import { useAuth } from '@/app/providers/useAuth'
import { useNotification } from '@/app/providers/useNotification'
import { IOSSwitch } from '@/components/common/IOSSwitch'
import { ProfileAvatar } from '@/components/common/ProfileAvatar'
import { SectionBadge } from '@/components/common/SectionBadge'
import type { MainLayoutOutletContext } from '@/layouts/MainLayout'
import { glassSurfaceMutedSx, metricSurfaceSx, uiRadius } from '@/theme/uiTokens'
import type { AuthProfileUpdate, AuthSessionUser } from '@/types/auth'

type ProfileFormState = Pick<
  AuthSessionUser,
  'name' | 'storeName' | 'headline' | 'bio' | 'website' | 'location' | 'notifyOrders' | 'notifyMarketplace'
>

const createProfileFormState = (user: AuthSessionUser): ProfileFormState => ({
  name: user.name,
  storeName: user.storeName,
  headline: user.headline,
  bio: user.bio,
  website: user.website,
  location: user.location,
  notifyOrders: user.notifyOrders,
  notifyMarketplace: user.notifyMarketplace,
})

const AccountMetaRow = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700, textAlign: 'right' }}>{value}</Typography>
  </Stack>
)

interface AuthenticatedProfileContentProps {
  user: AuthSessionUser
  onSave: (profile: AuthProfileUpdate) => void
  onOpenSellerAuth: () => void
  onSignOut: () => void
}

const AuthenticatedProfileContent = ({
  user,
  onSave,
  onOpenSellerAuth,
  onSignOut,
}: AuthenticatedProfileContentProps) => {
  const [form, setForm] = useState(() => createProfileFormState(user))
  const { notify } = useNotification()

  const accountTypeLabel = user.role === 'seller' ? 'บัญชีผู้ขาย' : 'บัญชีผู้ซื้อ'
  const isDirty =
    form.name !== user.name ||
    form.storeName !== user.storeName ||
    form.headline !== user.headline ||
    form.bio !== user.bio ||
    form.website !== user.website ||
    form.location !== user.location ||
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

  const handleSave = () => {
    const nextProfile: AuthProfileUpdate = {
      name: form.name.trim() || user.name,
      storeName: form.storeName.trim(),
      headline: form.headline.trim(),
      bio: form.bio.trim(),
      website: form.website.trim(),
      location: form.location.trim(),
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
        <Stack spacing={3}>
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

              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                <SectionBadge label={accountTypeLabel} />
                <SectionBadge label="Google" />
                {user.isMock ? <SectionBadge label="บัญชีทดลอง" /> : null}
              </Stack>

              <Divider />

              <Stack spacing={1.2}>
                <AccountMetaRow label="สิทธิ์การใช้งาน" value={accountTypeLabel} />
                <AccountMetaRow label="ผู้ให้บริการ" value="Google" />
                <AccountMetaRow label="สถานะข้อมูล" value="บันทึกในเครื่อง" />
                <AccountMetaRow label="อีเมลบัญชี" value={user.email} />
              </Stack>

              <Stack spacing={1.25}>
                {user.role === 'seller' ? (
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to="/seller"
                    endIcon={<ArrowOutwardRoundedIcon />}
                  >
                    ไปที่ศูนย์ผู้ขาย
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<StorefrontRoundedIcon />}
                    onClick={onOpenSellerAuth}
                  >
                    เปิดบัญชีผู้ขาย
                  </Button>
                )}
                <Button variant="outlined" startIcon={<LogoutRoundedIcon />} onClick={onSignOut}>
                  ออกจากระบบ
                </Button>
              </Stack>
            </Stack>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: uiRadius.xl,
              backgroundColor: 'rgba(255, 255, 255, 0.74)',
            }}
          >
            <Stack spacing={1.4}>
              <SectionBadge label="การเข้าสู่ระบบ" />
              <Typography variant="h6">เชื่อมต่อด้วย Google เท่านั้น</Typography>
              <Typography color="text.secondary">
                ข้อมูลอีเมลและสถานะบัญชีในหน้านี้ผูกกับระบบล็อกอินแบบสมมุติที่ใช้งานอยู่ในเครื่องนี้
              </Typography>
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
                    label="เว็บไซต์หรือพอร์ตโฟลิโอ"
                    value={form.website}
                    onChange={(event) => handleFieldChange('website', event.target.value)}
                    placeholder="https://"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="เมืองหรือที่อยู่"
                    value={form.location}
                    onChange={(event) => handleFieldChange('location', event.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="ข้อความสั้นใต้ชื่อ"
                    value={form.headline}
                    onChange={(event) => handleFieldChange('headline', event.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    label="เกี่ยวกับคุณหรือเกี่ยวกับร้าน"
                    value={form.bio}
                    onChange={(event) => handleFieldChange('bio', event.target.value)}
                  />
                </Grid>
              </Grid>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
                <Button variant="contained" disabled={!isDirty} onClick={handleSave}>
                  บันทึกการเปลี่ยนแปลง
                </Button>
                <Button variant="outlined" disabled={!isDirty} onClick={handleReset}>
                  รีเซ็ตข้อมูล
                </Button>
              </Stack>
            </Stack>
          </Paper>

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
            หน้านี้ออกแบบไว้สำหรับจัดการข้อมูลบัญชีที่ใช้งานอยู่บน CodeBazaar
            ทั้งฝั่งผู้ซื้อและผู้ขาย โดยข้อมูลจะถูกเก็บไว้ในเครื่องเพื่อใช้ทดสอบ flow ก่อนเชื่อม API จริง
          </Typography>
        </Stack>
      </Paper>

      {isAuthenticated && user ? (
        <AuthenticatedProfileContent
          key={`${user.id}-${user.role}`}
          user={user}
          onSave={updateProfile}
          onOpenSellerAuth={() => openAuthDialog('seller-register')}
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
            <Box sx={{ ...metricSurfaceSx, maxWidth: 420 }}>
              <Typography variant="body2" color="text.secondary">
                ยังไม่มีบัญชีที่กำลังใช้งานอยู่
              </Typography>
            </Box>
            <Typography variant="h4">เข้าสู่ระบบก่อนเพื่อแก้ไขข้อมูลโปรไฟล์และตั้งค่าบัญชี</Typography>
            <Typography color="text.secondary">
              คุณสามารถเข้าสู่ระบบแบบสมมุติด้วย Google ก่อน แล้วค่อยกลับมาแก้ไขชื่อ ข้อมูลร้าน
              และการแจ้งเตือนในหน้านี้ได้ทันที
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
