import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useCookieConsent } from '@/app/providers/useCookieConsent'
import { CloseActionButton } from '@/components/common/CloseActionButton'
import { IOSSwitch } from '@/components/common/IOSSwitch'
import { accentPalette, uiRadius } from '@/theme/uiTokens'
import type { CookiePreferences, StoredCookieConsent } from '@/types/cookie'
import { defaultCookiePreferences } from '@/utils/cookieConsent'

const cookieOptions: Array<{
  key: keyof CookiePreferences
  title: string
  description: string
  disabled?: boolean
}> = [
  {
    key: 'necessary',
    title: 'คุกกี้ที่จำเป็น',
    description: 'ใช้เพื่อให้เว็บไซต์ทำงานได้ตามปกติ เช่น การจดจำสถานะพื้นฐานและความปลอดภัย',
    disabled: true,
  },
  {
    key: 'preferences',
    title: 'คุกกี้เพื่อการตั้งค่า',
    description: 'ใช้เพื่อจดจำการตั้งค่าบางอย่างของคุณและช่วยให้ประสบการณ์ใช้งานต่อเนื่องขึ้น',
  },
  {
    key: 'analytics',
    title: 'คุกกี้เพื่อการวิเคราะห์',
    description: 'ใช้เพื่อดูพฤติกรรมการใช้งานภาพรวมและช่วยปรับปรุงประสิทธิภาพของเว็บไซต์',
  },
  {
    key: 'marketing',
    title: 'คุกกี้เพื่อการตลาด',
    description: 'ใช้เพื่อปรับเนื้อหาประชาสัมพันธ์หรือการสื่อสารให้สอดคล้องกับความสนใจของคุณ',
  },
]

interface CookieSettingsDialogContentProps {
  consent: StoredCookieConsent | null
  onClose: () => void
  onAcceptAll: () => void
  onSave: (preferences: CookiePreferences) => void
}

const CookieSettingsDialogContent = ({
  consent,
  onClose,
  onAcceptAll,
  onSave,
}: CookieSettingsDialogContentProps) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(
    consent?.preferences ?? defaultCookiePreferences,
  )

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'necessary') {
      return
    }

    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      [key]: !currentPreferences[key],
    }))
  }

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: uiRadius.xl,
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.82)',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(244, 244, 247, 0.88) 100%)',
            boxShadow: '0 28px 70px rgba(15, 15, 16, 0.14)',
          },
        },
      }}
    >
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1.5 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4">ตั้งค่าคุกกี้</Typography>
            <Typography color="text.secondary">
              เลือกประเภทคุกกี้ที่คุณต้องการอนุญาตให้ใช้งาน
            </Typography>
          </Box>
          <CloseActionButton ariaLabel="ปิดหน้าต่าง" onClick={onClose} />
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3 }}>
        <Stack spacing={1.25}>
          {cookieOptions.map((option) => (
            <Box
              key={option.key}
              sx={{
                p: 2,
                borderRadius: uiRadius.lg,
                border: `1px solid ${accentPalette.border}`,
                backgroundColor: 'rgba(255, 255, 255, 0.46)',
                backdropFilter: 'blur(20px) saturate(136%)',
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
              >
                <Box sx={{ maxWidth: 430 }}>
                  <Typography variant="h6">{option.title}</Typography>
                  <Typography color="text.secondary">{option.description}</Typography>
                </Box>
                <FormControlLabel
                  sx={{ m: 0 }}
                  control={
                    <IOSSwitch
                      checked={preferences[option.key]}
                      disabled={option.disabled}
                      onChange={() => handleToggle(option.key)}
                    />
                  }
                  label=""
                />
              </Stack>
            </Box>
          ))}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} sx={{ pt: 1 }}>
            <Button variant="outlined" fullWidth onClick={onAcceptAll}>
              ยอมรับทั้งหมด
            </Button>
            <Button variant="contained" fullWidth onClick={() => onSave(preferences)}>
              บันทึกการตั้งค่า
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export const CookieSettingsDialog = () => {
  const {
    consent,
    isSettingsOpen,
    closeSettings,
    acceptAllCookies,
    saveCustomPreferences,
  } = useCookieConsent()

  if (!isSettingsOpen) {
    return null
  }

  return (
    <CookieSettingsDialogContent
      consent={consent}
      onClose={closeSettings}
      onAcceptAll={acceptAllCookies}
      onSave={saveCustomPreferences}
    />
  )
}
