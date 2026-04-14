import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import GoogleIcon from '@mui/icons-material/Google'
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded'
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Link as RouterLink, useOutletContext } from 'react-router-dom'
import { useAuth } from '@/app/providers/useAuth'
import { useMarketplace } from '@/app/providers/useMarketplace'
import { useNotification } from '@/app/providers/useNotification'
import { CartIcon } from '@/components/cart/CartIcon'
import { IOSSwitch } from '@/components/common/IOSSwitch'
import { SectionBadge } from '@/components/common/SectionBadge'
import type { MainLayoutOutletContext } from '@/layouts/MainLayout'
import { checkoutService } from '@/services/api/checkout.service'
import { glassSurfaceMutedSx, metricSurfaceSx, uiRadius } from '@/theme/uiTokens'
import type {
  CheckoutPaymentMethod,
  CheckoutSubmitInput,
  CheckoutSubmitResponse,
} from '@/types/checkout'
import type { CartItem } from '@/types/cart'
import type { AuthSessionUser } from '@/types/auth'
import { formatCurrency } from '@/utils/formatCurrency'

interface CheckoutFormState {
  customerName: string
  customerEmail: string
  customerPhone: string
  companyName: string
  taxId: string
  note: string
  paymentMethod: CheckoutPaymentMethod
  receivePurchaseUpdates: boolean
  requireInvoice: boolean
}

interface CompletedOrderState {
  response: CheckoutSubmitResponse
  items: CartItem[]
  customerName: string
  customerEmail: string
}

interface PaymentMethodOption {
  value: CheckoutPaymentMethod
  label: string
  description: string
  icon: ReactNode
}

const paymentMethodOptions: PaymentMethodOption[] = [
  {
    value: 'promptpay',
    label: 'พร้อมเพย์ QR',
    description: 'เหมาะกับการซื้อไฟล์ดิจิทัลและยืนยันรายการได้รวดเร็ว',
    icon: <QrCode2RoundedIcon />,
  },
  {
    value: 'card',
    label: 'บัตรเครดิต / เดบิต',
    description: 'ใช้สำหรับ flow checkout มาตรฐานเมื่อเชื่อม payment gateway จริง',
    icon: <CreditCardRoundedIcon />,
  },
  {
    value: 'bank-transfer',
    label: 'โอนผ่านบัญชีธนาคาร',
    description: 'รองรับกรณีทีมงานต้องตรวจสอบสลิปหรือออกเอกสารเพิ่มเติม',
    icon: <AccountBalanceRoundedIcon />,
  },
]

const paymentMethodLabelMap: Record<CheckoutPaymentMethod, string> = paymentMethodOptions.reduce(
  (labels, option) => ({
    ...labels,
    [option.value]: option.label,
  }),
  {} as Record<CheckoutPaymentMethod, string>,
)

const createCheckoutFormState = (user: AuthSessionUser | null): CheckoutFormState => ({
  customerName: user?.name ?? '',
  customerEmail: user?.email ?? '',
  customerPhone: '',
  companyName: user?.storeName ?? '',
  taxId: '',
  note: '',
  paymentMethod: 'promptpay',
  receivePurchaseUpdates: true,
  requireInvoice: false,
})

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700, textAlign: 'right' }}>{value}</Typography>
  </Stack>
)

const CheckoutMetricCard = ({
  title,
  value,
  icon,
}: {
  title: string
  value: string
  icon: ReactNode
}) => (
  <Paper sx={{ ...metricSurfaceSx, height: '100%' }}>
    <Stack spacing={1.1}>
      <Box
        sx={{
          width: 38,
          height: 38,
          display: 'grid',
          placeItems: 'center',
          borderRadius: uiRadius.md,
          backgroundColor: 'rgba(17, 17, 17, 0.06)',
          color: 'text.primary',
        }}
      >
        {icon}
      </Box>
      <Typography color="text.secondary">{title}</Typography>
      <Typography variant="h6" sx={{ lineHeight: 1.25 }}>
        {value}
      </Typography>
    </Stack>
  </Paper>
)

const CheckoutLineItemCard = ({ item }: { item: CartItem }) => {
  const previewLabel = item.category.slice(0, 2)

  return (
    <Paper sx={{ ...glassSurfaceMutedSx, p: 1.75, borderRadius: uiRadius.lg }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <Box
          sx={{
            width: 66,
            height: 66,
            flexShrink: 0,
            borderRadius: uiRadius.lg,
            background: 'linear-gradient(180deg, #111111 0%, #37373c 100%)',
            color: 'common.white',
            display: 'grid',
            placeItems: 'center',
            boxShadow: '0 18px 34px rgba(17, 17, 17, 0.16)',
          }}
        >
          <Stack spacing={0.25} sx={{ alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1 }}>
              {previewLabel}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1 }}
            >
              CODE
            </Typography>
          </Stack>
        </Box>

        <Stack spacing={0.4} sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="h6" sx={{ lineHeight: 1.3 }}>
            {item.title}
          </Typography>
          <Typography color="text.secondary">โดย {item.authorName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {item.category} · {item.license}
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ flexShrink: 0 }}>
          {formatCurrency(item.price)}
        </Typography>
      </Stack>
    </Paper>
  )
}

const CheckoutSuccessView = ({ order }: { order: CompletedOrderState }) => {
  const paymentMethodLabel = paymentMethodLabelMap[order.response.paymentMethod]

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper
        sx={{
          ...glassSurfaceMutedSx,
          p: { xs: 3, md: 4 },
          borderRadius: uiRadius.xl,
        }}
      >
        <Stack spacing={3}>
          <Box>
            <SectionBadge label="ชำระเงินสำเร็จ" />
            <Typography variant="h2" sx={{ mt: 1.5, maxWidth: 720 }}>
              คำสั่งซื้อของคุณพร้อมใช้งานแล้ว
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1.25, maxWidth: 620 }}>
              {order.response.description}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CheckoutMetricCard
                title="หมายเลขคำสั่งซื้อ"
                value={order.response.orderId}
                icon={<ReceiptLongRoundedIcon />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CheckoutMetricCard
                title="วิธีชำระเงิน"
                value={paymentMethodLabel}
                icon={<CheckCircleRoundedIcon />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CheckoutMetricCard
                title="อีเมลยืนยัน"
                value={order.customerEmail}
                icon={<EmailRoundedIcon />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CheckoutMetricCard
                title="ยอดที่ชำระ"
                value={formatCurrency(order.response.total)}
                icon={<ShieldRoundedIcon />}
              />
            </Grid>
          </Grid>

          <Stack spacing={1.5}>
            <Typography variant="h5">รายการที่พร้อมดาวน์โหลด</Typography>
            {order.items.map((item) => (
              <CheckoutLineItemCard key={item.id} item={item} />
            ))}
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
            <Button variant="contained" component={RouterLink} to="/">
              กลับไปเลือกซื้อ
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/profile"
              endIcon={<ArrowOutwardRoundedIcon />}
            >
              ไปหน้าตั้งค่าโปรไฟล์
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}

export const CheckoutPage = () => {
  const { user, isAuthenticated } = useAuth()
  const { cartItems, cartTotal, clearCart, openCart } = useMarketplace()
  const { notify } = useNotification()
  const { openAuthDialog } = useOutletContext<MainLayoutOutletContext>()
  const [form, setForm] = useState<CheckoutFormState>(() => createCheckoutFormState(user))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedOrder, setCompletedOrder] = useState<CompletedOrderState | null>(null)

  useEffect(() => {
    setForm(createCheckoutFormState(user))
  }, [user])

  const hasItems = cartItems.length > 0
  const isFormValid =
    form.customerName.trim().length > 0 &&
    form.customerEmail.trim().length > 0 &&
    form.customerPhone.trim().length > 0 &&
    (!form.requireInvoice ||
      (form.companyName.trim().length > 0 && form.taxId.trim().length > 0))

  const handleFieldChange = <Key extends keyof CheckoutFormState>(
    key: Key,
    value: CheckoutFormState[Key],
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!isAuthenticated || !user) {
      openAuthDialog('buyer-login')
      return
    }

    if (!hasItems) {
      notify({
        severity: 'info',
        title: 'ยังไม่มีรายการสำหรับชำระเงิน',
        message: 'เลือกสินค้าที่ต้องการก่อนแล้วค่อยกลับมายืนยันคำสั่งซื้อ',
      })
      return
    }

    if (!isFormValid) {
      notify({
        severity: 'warning',
        title: 'ข้อมูลการชำระเงินยังไม่ครบ',
        message: 'กรอกชื่อผู้ซื้อ อีเมล เบอร์โทร และข้อมูลใบกำกับให้ครบก่อนยืนยันคำสั่งซื้อ',
      })
      return
    }

    setIsSubmitting(true)

    const payload: CheckoutSubmitInput = {
      customerName: form.customerName.trim(),
      customerEmail: form.customerEmail.trim(),
      customerPhone: form.customerPhone.trim(),
      companyName: form.requireInvoice ? form.companyName.trim() : '',
      taxId: form.requireInvoice ? form.taxId.trim() : '',
      note: form.note.trim(),
      paymentMethod: form.paymentMethod,
      receivePurchaseUpdates: form.receivePurchaseUpdates,
      requireInvoice: form.requireInvoice,
      subtotal: cartTotal,
      total: cartTotal,
      items: cartItems,
    }

    try {
      const response = await checkoutService.submitOrder(payload)

      setCompletedOrder({
        response,
        items: [...cartItems],
        customerName: payload.customerName,
        customerEmail: payload.customerEmail,
      })
      clearCart({ silent: true })

      notify({
        severity: 'success',
        title: response.title,
        message: response.description,
      })
    } catch (error) {
      notify({
        severity: 'error',
        title: 'ไม่สามารถสร้างคำสั่งซื้อได้',
        message:
          error instanceof Error ? error.message : 'ลองใหม่อีกครั้งหรือเช็กการเชื่อมต่อ API ของคุณ',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated || !user) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
        <Paper
          sx={{
            ...glassSurfaceMutedSx,
            p: { xs: 3, md: 4 },
            borderRadius: uiRadius.xl,
          }}
        >
          <Stack spacing={2.5}>
            <Box>
              <SectionBadge label="ชำระเงิน" />
              <Typography variant="h3" sx={{ mt: 1.5 }}>
                เข้าสู่ระบบก่อนเพื่อดำเนินการสั่งซื้อ
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1.2 }}>
                ใช้บัญชี Google ของคุณเพื่อยืนยันการซื้อ source code, template และชุดคอมโพเนนต์
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={() => openAuthDialog('buyer-login')}
            >
              เข้าสู่ระบบด้วย Google
            </Button>
            <Button variant="outlined" component={RouterLink} to="/">
              กลับไปเลือกซื้อ
            </Button>
          </Stack>
        </Paper>
      </Container>
    )
  }

  if (completedOrder) {
    return <CheckoutSuccessView order={completedOrder} />
  }

  if (!hasItems) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Paper
          sx={{
            ...glassSurfaceMutedSx,
            p: { xs: 3, md: 4 },
            borderRadius: uiRadius.xl,
          }}
        >
          <Stack spacing={2.5} sx={{ alignItems: 'flex-start' }}>
            <CartIcon sx={{ fontSize: 38, color: 'text.secondary' }} />
            <Box>
              <SectionBadge label="ตะกร้าว่าง" />
              <Typography variant="h3" sx={{ mt: 1.5 }}>
                ยังไม่มีรายการสำหรับชำระเงิน
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1.2 }}>
                เลือกสินค้าที่ต้องการจากหน้า marketplace แล้วค่อยกลับมายืนยันการซื้ออีกครั้ง
              </Typography>
            </Box>
            <Button variant="contained" component={RouterLink} to="/">
              กลับไปเลือกซื้อ
            </Button>
          </Stack>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper
        sx={{
          mb: 4,
          p: { xs: 3, md: 4.5 },
          borderRadius: uiRadius.xl,
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(245, 245, 248, 0.78) 100%)',
        }}
      >
        <Stack spacing={2.25}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <SectionBadge label="ชำระเงิน" />
          </Box>
          <Typography variant="h2" sx={{ maxWidth: 760 }}>
            ยืนยันรายการสั่งซื้อของคุณก่อนชำระเงิน
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 700 }}>
            ตรวจสอบข้อมูลผู้ซื้อ เลือกวิธีชำระเงิน และสรุปรายการซอร์สโค้ดหรือเทมเพลตที่พร้อมดาวน์โหลดทันที
          </Typography>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={3}>
            <Paper
              sx={{
                ...glassSurfaceMutedSx,
                p: { xs: 3, md: 3.5 },
                borderRadius: uiRadius.xl,
              }}
            >
              <Stack spacing={2.5}>
                <Box>
                  <SectionBadge label="ข้อมูลผู้ซื้อ" />
                  <Typography variant="h4" sx={{ mt: 1.25 }}>
                    ใช้ข้อมูลนี้สำหรับอีเมลยืนยันและเอกสารการสั่งซื้อ
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="ชื่อผู้ซื้อ"
                      value={form.customerName}
                      onChange={(event) => handleFieldChange('customerName', event.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      type="email"
                      label="อีเมลสำหรับรับคำสั่งซื้อ"
                      value={form.customerEmail}
                      onChange={(event) => handleFieldChange('customerEmail', event.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="เบอร์โทรติดต่อ"
                      value={form.customerPhone}
                      onChange={(event) => handleFieldChange('customerPhone', event.target.value)}
                      placeholder="08X-XXX-XXXX"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="ยืนยันผ่านบัญชี Google"
                      value={user.email}
                      sx={{
                        '& .MuiInputLabel-root': {
                          color: 'text.secondary',
                        },
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(17, 17, 17, 0.04)',
                        },
                        '& .MuiOutlinedInput-input': {
                          color: 'text.secondary',
                          WebkitTextFillColor: 'rgba(106, 106, 112, 1)',
                        },
                      }}
                      slotProps={{
                        htmlInput: {
                          readOnly: true,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="หมายเหตุถึงผู้ขายหรือทีมดูแล"
                      value={form.note}
                      onChange={(event) => handleFieldChange('note', event.target.value)}
                      placeholder="เช่น ต้องการเอกสารประกอบเพิ่ม หรือต้องการให้ระบุข้อมูลบนใบเสร็จ"
                    />
                  </Grid>
                </Grid>

                <Divider />

                <Stack spacing={1.8}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6">ส่งอีเมลแจ้งอัปเดตคำสั่งซื้อ</Typography>
                      <Typography color="text.secondary">
                        รับสถานะคำสั่งซื้อและรายละเอียดการดาวน์โหลดทางอีเมล
                      </Typography>
                    </Box>
                    <IOSSwitch
                      checked={form.receivePurchaseUpdates}
                      onChange={(event) =>
                        handleFieldChange('receivePurchaseUpdates', event.target.checked)
                      }
                    />
                  </Stack>

                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6">ขอใบกำกับในนามบริษัท</Typography>
                      <Typography color="text.secondary">
                        เปิดเมื่อคุณต้องการกรอกชื่อบริษัทและเลขประจำตัวผู้เสียภาษี
                      </Typography>
                    </Box>
                    <IOSSwitch
                      checked={form.requireInvoice}
                      onChange={(event) => handleFieldChange('requireInvoice', event.target.checked)}
                    />
                  </Stack>
                </Stack>

                {form.requireInvoice ? (
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="ชื่อบริษัทหรือองค์กร"
                        value={form.companyName}
                        onChange={(event) => handleFieldChange('companyName', event.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="เลขประจำตัวผู้เสียภาษี"
                        value={form.taxId}
                        onChange={(event) => handleFieldChange('taxId', event.target.value)}
                      />
                    </Grid>
                  </Grid>
                ) : null}
              </Stack>
            </Paper>

            <Paper
              sx={{
                ...glassSurfaceMutedSx,
                p: { xs: 3, md: 3.5 },
                borderRadius: uiRadius.xl,
              }}
            >
              <Stack spacing={2.5}>
                <Box>
                  <SectionBadge label="วิธีชำระเงิน" />
                  <Typography variant="h4" sx={{ mt: 1.25 }}>
                    เลือกช่องทางที่เหมาะกับคำสั่งซื้อของคุณ
                  </Typography>
                </Box>

                <Stack spacing={1.5}>
                  {paymentMethodOptions.map((option) => {
                    const isSelected = form.paymentMethod === option.value

                    return (
                      <ButtonBase
                        key={option.value}
                        onClick={() => handleFieldChange('paymentMethod', option.value)}
                        sx={{
                          width: '100%',
                          borderRadius: uiRadius.lg,
                          textAlign: 'left',
                        }}
                      >
                        <Paper
                          sx={{
                            ...metricSurfaceSx,
                            width: '100%',
                            p: 2,
                            borderColor: isSelected
                              ? 'rgba(17, 17, 17, 0.72)'
                              : 'rgba(17, 17, 17, 0.08)',
                            backgroundColor: isSelected
                              ? 'rgba(255, 255, 255, 0.82)'
                              : 'rgba(255, 255, 255, 0.58)',
                            boxShadow: isSelected
                              ? '0 16px 34px rgba(17, 17, 17, 0.08)'
                              : 'none',
                          }}
                        >
                          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                            <Box
                              sx={{
                                width: 42,
                                height: 42,
                                display: 'grid',
                                placeItems: 'center',
                                borderRadius: uiRadius.md,
                                backgroundColor: isSelected
                                  ? 'rgba(17, 17, 17, 0.08)'
                                  : 'rgba(17, 17, 17, 0.05)',
                              }}
                            >
                              {option.icon}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6">{option.label}</Typography>
                              <Typography color="text.secondary">{option.description}</Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      </ButtonBase>
                    )
                  })}
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: { md: 104 } }}>
            <Paper
              sx={{
                ...glassSurfaceMutedSx,
                p: { xs: 3, md: 3.5 },
                borderRadius: uiRadius.xl,
              }}
            >
              <Stack spacing={2.25}>
                <Box>
                  <SectionBadge label="สรุปรายการ" />
                  <Typography variant="h4" sx={{ mt: 1.25 }}>
                    {cartItems.length} รายการในคำสั่งซื้อ
                  </Typography>
                </Box>

                <Stack spacing={1.25}>
                  {cartItems.map((item) => (
                    <CheckoutLineItemCard key={item.id} item={item} />
                  ))}
                </Stack>

                <Divider />

                <Stack spacing={1.25}>
                  <SummaryRow label="ยอดรวมสินค้า" value={formatCurrency(cartTotal)} />
                  <SummaryRow label="การจัดส่งไฟล์" value="ดาวน์โหลดได้ทันที" />
                  <SummaryRow
                    label="ช่องทางชำระเงิน"
                    value={paymentMethodLabelMap[form.paymentMethod]}
                  />
                </Stack>

                <Divider />

                <SummaryRow label="ยอดที่ต้องชำระ" value={formatCurrency(cartTotal)} />

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'กำลังสร้างคำสั่งซื้อ...' : 'ยืนยันการชำระเงิน'}
                </Button>
                <Button variant="outlined" fullWidth onClick={openCart}>
                  กลับไปแก้ไขตะกร้า
                </Button>
              </Stack>
            </Paper>

            <Paper
              sx={{
                ...glassSurfaceMutedSx,
                p: 2.5,
                borderRadius: uiRadius.xl,
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
                  <DownloadRoundedIcon />
                  <Typography variant="h6">ไฟล์พร้อมใช้งานทันทีหลังยืนยัน</Typography>
                </Stack>
                <Typography color="text.secondary">
                  หน้า checkout นี้รองรับการต่อ API จริงในภายหลัง โดยตอนนี้เป็น mock flow
                  สำหรับทดสอบการสร้างคำสั่งซื้อก่อนเชื่อม payment gateway
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}
