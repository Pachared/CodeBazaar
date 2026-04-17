import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link as RouterLink, useOutletContext } from 'react-router-dom'
import { useAuth } from '@/app/providers/useAuth'
import { SectionBadge } from '@/components/common/SectionBadge'
import { codeBazaarApiCompatibility } from '@/config/backendCompatibility'
import {
  sellerDeliveryMethodOptions,
  sellerCatalogTypes,
  sellerFeatures,
  sellerPlatformPolicyStatements,
  sellerSteps,
  sellerStoragePolicyHighlights,
  sellerUploadChecklist,
} from '@/constants/marketplace'
import type { MainLayoutOutletContext } from '@/layouts/MainLayout'
import {
  accentGradientDark,
  glassSurfaceMutedSx,
  softAccentBackground,
  softAccentBackgroundMuted,
  uiRadius,
} from '@/theme/uiTokens'

const sellerOnboardingSections = [
  'เริ่มต้นก่อนลงขาย',
  'เตรียมก่อนเข้า Studio',
  'รูปแบบการส่งมอบและการเก็บไฟล์',
  'เลือกประเภทสินค้าที่จะขาย',
  'สิ่งที่ระบบช่วยผู้ขาย',
] as const

const sellerPrimaryActionSx = {
  px: 3.25,
  minHeight: 54,
  borderRadius: uiRadius.md,
  background: accentGradientDark,
  boxShadow: '0 18px 34px rgba(17, 17, 17, 0.16)',
  fontWeight: 700,
  '&:hover': {
    background: 'linear-gradient(145deg, #151722 0%, #304286 52%, #a17bff 100%)',
    boxShadow: '0 24px 40px rgba(17, 17, 17, 0.22)',
  },
} as const

const sellerSectionPaperSx = {
  p: { xs: 3, md: 3.5 },
  borderRadius: uiRadius.md,
  background: softAccentBackgroundMuted,
} as const

const sellerRectCardSx = {
  p: 2.25,
  borderRadius: uiRadius.md,
  backgroundColor: 'rgba(255,255,255,0.72)',
} as const

const sellerGlassRectCardSx = {
  ...glassSurfaceMutedSx,
  p: 2.25,
  borderRadius: uiRadius.md,
} as const

interface GuidedSellerSectionProps {
  active: boolean
  completed: boolean
  disabled: boolean
  progressLabel: string
  acceptLabel: string
  onAccept: () => void
  sectionRef: (node: HTMLDivElement | null) => void
  children: ReactNode
}

const GuidedSellerSection = ({
  active,
  completed,
  disabled,
  progressLabel,
  acceptLabel,
  onAccept,
  sectionRef,
  children,
}: GuidedSellerSectionProps) => (
  <Box
    ref={sectionRef}
    sx={{
      position: 'relative',
      zIndex: active ? 12 : completed ? 2 : 1,
      p: active ? { xs: 1.25, sm: 1.75, md: 2 } : 0,
      opacity: disabled ? 0.54 : 1,
      transition: 'padding 180ms ease, opacity 180ms ease, transform 180ms ease',
      transform: active ? 'translateY(-2px)' : 'none',
      pointerEvents: disabled ? 'none' : 'auto',
    }}
  >
    <Box
      sx={{
        position: 'relative',
        overflow: 'visible',
        borderRadius: uiRadius.lg,
        border: active
          ? '1px solid rgba(17, 17, 17, 0.88)'
          : completed
            ? '1px solid rgba(17, 17, 17, 0.24)'
            : undefined,
        boxShadow: active
          ? '0 0 0 9999px rgba(8, 10, 16, 0.58), 0 30px 90px rgba(17, 17, 17, 0.24)'
          : undefined,
        transition: 'box-shadow 180ms ease, border-color 180ms ease, transform 180ms ease',
      }}
    >
      {completed ? (
        <Box
          sx={{
            position: 'absolute',
            top: 14,
            right: 14,
            zIndex: 2,
          }}
        >
          <SectionBadge label="ยอมรับแล้ว" />
        </Box>
      ) : null}

      <Stack spacing={2.5}>
        {children}

        {active ? (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.25}
            sx={{
              alignItems: { sm: 'center' },
              justifyContent: 'space-between',
            }}
          >
            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
              {progressLabel}
            </Typography>
            <Button
              variant="contained"
              startIcon={<CheckRoundedIcon />}
              onClick={onAccept}
              sx={{ alignSelf: { xs: 'stretch', sm: 'center' } }}
            >
              {acceptLabel}
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </Box>
  </Box>
)

export const SellerPage = () => {
  const { user } = useAuth()
  const { openAuthDialog } = useOutletContext<MainLayoutOutletContext>()
  const isSeller = user?.role === 'seller'
  const heroActionRef = useRef<HTMLDivElement | null>(null)
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([])
  const [acceptedSectionCount, setAcceptedSectionCount] = useState(0)
  const totalSectionCount = sellerOnboardingSections.length
  const allSectionsAccepted = isSeller || acceptedSectionCount >= totalSectionCount
  const activeSectionIndex = isSeller || allSectionsAccepted ? -1 : acceptedSectionCount
  const canOpenSellerAccount =
    allSectionsAccepted && codeBazaarApiCompatibility.realSellerOnboarding

  useEffect(() => {
    if (activeSectionIndex < 0) {
      return
    }

    const nextSection = sectionRefs.current[activeSectionIndex]
    nextSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [activeSectionIndex])

  const handleAcceptSection = () => {
    setAcceptedSectionCount((currentCount) => {
      const nextCount = Math.min(currentCount + 1, totalSectionCount)

      if (nextCount >= totalSectionCount) {
        window.setTimeout(() => {
          heroActionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }, 80)
      }

      return nextCount
    })
  }

  const getSectionRef = (index: number) => (node: HTMLDivElement | null) => {
    sectionRefs.current[index] = node
  }

  const getSectionProps = (index: number) => ({
    active: activeSectionIndex === index,
    completed: acceptedSectionCount > index || isSeller,
    disabled: !isSeller && activeSectionIndex !== index && acceptedSectionCount <= index,
    progressLabel:
      index === totalSectionCount - 1
        ? `กล่องสุดท้าย ${index + 1}/${totalSectionCount}`
        : `อ่านรายละเอียดแล้วไปต่อ ${index + 1}/${totalSectionCount}`,
    acceptLabel:
      index === totalSectionCount - 1 ? 'ยอมรับครบทั้งหมด' : 'ยอมรับและไปกล่องถัดไป',
    onAccept: handleAcceptSection,
    sectionRef: getSectionRef(index),
  })

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
          borderRadius: uiRadius.md,
          background: softAccentBackground,
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={2}>
            <SectionBadge label="ศูนย์ผู้ขายซอร์สโค้ดและเทมเพลต" />
            <Typography variant="h2" sx={{ maxWidth: 760 }}>
              เปิดร้านเพื่อขายโปรเจกต์ เทมเพลต และชุดไฟล์สำหรับนักพัฒนาในหน้าที่จัดการง่ายและพร้อมต่อยอด
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760, fontWeight: 500 }}>
              หากต้องการเพิ่มสินค้าใหม่หรือเริ่มลงรายการขายในระบบ ให้เปิดสิทธิ์ผู้ขายให้บัญชีนี้ก่อน
              จากนั้นจึงกดปุ่ม
              {' '}
              ลงขายสินค้า
              {' '}
              ด้านล่างนี้ได้ทันที
            </Typography>
          </Stack>

          <Stack
            ref={heroActionRef}
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.25}
          >
            {isSeller ? (
              <Button
                variant="contained"
                startIcon={<StorefrontRoundedIcon />}
                component={RouterLink}
                to="/seller/studio"
                sx={sellerPrimaryActionSx}
              >
                ลงขายสินค้า
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<StorefrontRoundedIcon />}
                disabled={!canOpenSellerAccount}
                onClick={() => openAuthDialog('seller-register')}
                sx={sellerPrimaryActionSx}
              >
                เปิดบัญชีผู้ขาย
              </Button>
            )}
            <Button
              variant="outlined"
              component={RouterLink}
              to="/catalog"
              endIcon={<ArrowOutwardRoundedIcon />}
            >
              ไปหน้ารวมซอร์สโค้ดและเทมเพลต
            </Button>
          </Stack>

          {!isSeller ? (
            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
              {allSectionsAccepted
                ? codeBazaarApiCompatibility.realSellerOnboarding
                  ? 'อ่านและยอมรับครบทุกกล่องแล้ว ตอนนี้คุณสามารถเปิดบัญชีผู้ขายได้'
                  : 'อ่านและยอมรับครบทุกกล่องแล้ว แต่สภาพแวดล้อมนี้ยังไม่เปิด onboarding ผู้ขาย'
                : `กรุณาอ่านรายละเอียดและกดยอมรับทีละกล่องให้ครบก่อนเปิดบัญชีผู้ขาย (${acceptedSectionCount}/${totalSectionCount})`}
            </Typography>
          ) : null}

        </Stack>
      </Paper>

      <GuidedSellerSection {...getSectionProps(0)}>
        <Paper sx={sellerSectionPaperSx}>
          <Stack spacing={2.5}>
            <Box>
              <SectionBadge label="เริ่มต้นก่อนลงขาย" />
              <Typography variant="h4" sx={{ mt: 1.25 }}>
                ดูลำดับการทำงานของผู้ขายก่อน เพื่อรู้ว่าควรเริ่มจากอะไร
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                กล่องนี้สรุป flow จริงของระบบตั้งแต่เปิดบัญชีผู้ขาย ตั้งค่าโปรไฟล์ เตรียมข้อมูลสินค้า
                ไปจนถึงเข้า Seller Studio เพื่อส่งรายการขาย
              </Typography>
            </Box>

            <Stack spacing={1.5}>
              {sellerSteps.map((step, index) => (
                <Paper key={step.title} sx={sellerRectCardSx}>
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    sx={{ alignItems: { md: 'flex-start' } }}
                  >
                    <Box sx={{ minWidth: { md: 120 } }}>
                      <Typography variant="body2" color="text.secondary">
                        ขั้นตอน {index + 1}
                      </Typography>
                    </Box>
                    <Stack spacing={0.7}>
                      <Typography variant="h6">{step.title}</Typography>
                      <Typography color="text.secondary">{step.description}</Typography>
                    </Stack>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </GuidedSellerSection>

      <GuidedSellerSection {...getSectionProps(1)}>
        <Paper sx={sellerSectionPaperSx}>
          <Stack spacing={2.25}>
            <Box>
              <SectionBadge label="เตรียมก่อนเข้า Studio" />
              <Typography variant="h4" sx={{ mt: 1.25 }}>
                สิ่งที่ควรมีในแพ็กเกจก่อนกดลงขายสินค้า
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                รายการด้านล่างคือข้อมูลหลักที่ควรเตรียมไว้ล่วงหน้า เพื่อให้ตอนเข้าหน้าสตูดิโอสามารถกรอกได้ครบ
                และทำให้หน้ารายละเอียดสินค้าของคุณดูชัดเจนตั้งแต่ครั้งแรก
              </Typography>
            </Box>

            <Stack spacing={1.25}>
              {sellerUploadChecklist.map((item) => (
                <Paper key={item} sx={sellerGlassRectCardSx}>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {item}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </GuidedSellerSection>

      <GuidedSellerSection {...getSectionProps(2)}>
        <Paper sx={sellerSectionPaperSx}>
          <Stack spacing={2.5}>
            <Box>
              <SectionBadge label="รูปแบบการส่งมอบและการเก็บไฟล์" />
              <Typography variant="h4" sx={{ mt: 1.25 }}>
                ระบบนี้ออกแบบให้ผู้ขายเลือกวิธีส่งมอบงานได้ชัด และเก็บไฟล์แบบ private เป็นค่าเริ่มต้น
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                ส่วนนี้สรุปทั้ง 3 วิธีส่งมอบหลักและหลักการเก็บไฟล์ที่ช่วยให้ผู้ขายเชื่อใจระบบได้มากขึ้นก่อนกดเข้า Seller Studio
              </Typography>
            </Box>

            <Stack spacing={1.5}>
              {sellerDeliveryMethodOptions.map((option) => (
                <Paper key={option.value} sx={sellerGlassRectCardSx}>
                  <Stack spacing={1}>
                    <Typography variant="h6">{option.label}</Typography>
                    <Typography color="text.secondary">{option.description}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                      {option.helperText}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Stack>

            <Stack spacing={1.5}>
              {sellerStoragePolicyHighlights.map((item) => (
                <Paper key={item.title} sx={sellerRectCardSx}>
                  <Stack spacing={0.85}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography color="text.secondary">{item.description}</Typography>
                  </Stack>
                </Paper>
              ))}
            </Stack>

            <Paper sx={{ ...sellerGlassRectCardSx, p: 2.5 }}>
              <Stack spacing={1.1}>
                <SectionBadge label="แนวทางของแพลตฟอร์ม" />
                {sellerPlatformPolicyStatements.map((statement) => (
                  <Typography key={statement} color="text.secondary" sx={{ lineHeight: 1.85 }}>
                    • {statement}
                  </Typography>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Paper>
      </GuidedSellerSection>

      <GuidedSellerSection {...getSectionProps(3)}>
        <Paper sx={sellerSectionPaperSx}>
          <Stack spacing={2.5}>
            <Box>
              <SectionBadge label="เลือกประเภทสินค้าที่จะขาย" />
              <Typography variant="h4" sx={{ mt: 1.25 }}>
                ดูก่อนว่าระบบนี้รองรับสินค้ารูปแบบไหนบ้าง
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                หลังจากเตรียมข้อมูลครบแล้ว ให้เลือกแนวสินค้าที่ใกล้กับสิ่งที่คุณจะลงขายที่สุด
                เพื่อกำหนดวิธีอธิบายแพ็กเกจและตั้งความคาดหวังของผู้ซื้อให้ตรงกัน
              </Typography>
            </Box>

            <Stack spacing={1.5}>
              {sellerCatalogTypes.map((catalogType) => (
                <Paper key={catalogType.title} sx={sellerRectCardSx}>
                  <Stack spacing={1.25}>
                    <Typography variant="h6">{catalogType.title}</Typography>
                    <Typography color="text.secondary">{catalogType.description}</Typography>
                    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                      {catalogType.tags.map((tag) => (
                        <SectionBadge key={tag} label={tag} />
                      ))}
                    </Stack>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </GuidedSellerSection>

      <GuidedSellerSection {...getSectionProps(4)}>
        <Paper sx={sellerSectionPaperSx}>
          <Stack spacing={2.5}>
            <Box>
              <SectionBadge label="สิ่งที่ระบบช่วยผู้ขาย" />
              <Typography variant="h4" sx={{ mt: 1.25 }}>
                ปิดท้ายด้วยภาพรวมว่าระบบนี้ช่วยให้คุณเริ่มขายง่ายขึ้นอย่างไร
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                ส่วนนี้อธิบายจากฟีเจอร์ที่มีอยู่จริงในระบบตอนนี้ ว่าจะช่วยให้ผู้ขายจัดการข้อมูล
                และเชื่อมไปยังหน้าที่ผู้ซื้อเห็นได้อย่างไร
              </Typography>
            </Box>

            <Stack spacing={1.5}>
              {sellerFeatures.map((feature) => (
                <Paper key={feature.title} sx={sellerRectCardSx}>
                  <Stack spacing={0.75}>
                    <Typography variant="h6">{feature.title}</Typography>
                    <Typography color="text.secondary">{feature.description}</Typography>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </GuidedSellerSection>
    </Container>
  )
}
