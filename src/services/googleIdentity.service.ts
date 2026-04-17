import { env } from '@/config/env'
import type { AuthActionResponse, AuthSessionUser, BuyerAuthIntent } from '@/types/auth'
import { createDefaultProfileFields } from '@/utils/authProfileDefaults'

const GOOGLE_GSI_SCRIPT_SRC = 'https://accounts.google.com/gsi/client'
const GOOGLE_AUTH_SCOPE = 'openid email profile'
const GOOGLE_USERINFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v3/userinfo'

let googleScriptPromise: Promise<void> | null = null

interface GoogleUserInfoResponse {
  sub: string
  name?: string
  email?: string
  email_verified?: boolean | string
}

interface GoogleVerifiedUserInfo {
  sub: string
  name?: string
  email: string
}

const createGoogleAuthErrorMessage = (type?: string) => {
  switch (type) {
    case 'popup_closed':
      return 'คุณปิดหน้าต่างเข้าสู่ระบบ Google ก่อนดำเนินการเสร็จ'
    case 'popup_failed_to_open':
      return 'ไม่สามารถเปิดหน้าต่างเข้าสู่ระบบ Google ได้ กรุณาตรวจสอบการบล็อก popup'
    default:
      return 'ไม่สามารถเริ่มต้นการเข้าสู่ระบบด้วย Google ได้'
  }
}

const loadGoogleScript = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Sign-In ใช้งานได้เฉพาะบนเบราว์เซอร์'))
  }

  if (window.google?.accounts?.oauth2) {
    return Promise.resolve()
  }

  if (googleScriptPromise) {
    return googleScriptPromise
  }

  googleScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${GOOGLE_GSI_SCRIPT_SRC}"]`,
    )

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener(
        'error',
        () => reject(new Error('โหลด Google Identity Services ไม่สำเร็จ')),
        { once: true },
      )
      return
    }

    const script = document.createElement('script')
    script.src = GOOGLE_GSI_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('โหลด Google Identity Services ไม่สำเร็จ'))
    document.head.appendChild(script)
  })

  return googleScriptPromise
}

const requestGoogleAccessToken = async (intent: BuyerAuthIntent) => {
  if (!env.googleClientId) {
    throw new Error('ยังไม่ได้ตั้งค่า VITE_GOOGLE_CLIENT_ID สำหรับ Google Sign-In จริง')
  }

  await loadGoogleScript()

  return new Promise<string>((resolve, reject) => {
    const googleAccounts = window.google?.accounts
    if (!googleAccounts?.oauth2) {
      reject(new Error('Google Identity Services ยังไม่พร้อมใช้งาน'))
      return
    }

    const tokenClient = googleAccounts.oauth2.initTokenClient({
      client_id: env.googleClientId,
      scope: GOOGLE_AUTH_SCOPE,
      prompt: intent === 'register' ? 'consent select_account' : 'select_account',
      callback: (response) => {
        if (response.error) {
          reject(new Error(response.error_description || 'การยืนยันตัวตนกับ Google ไม่สำเร็จ'))
          return
        }

        if (!response.access_token) {
          reject(new Error('Google ไม่ได้ส่ง access token กลับมา'))
          return
        }

        resolve(response.access_token)
      },
      error_callback: (error) => {
        reject(new Error(createGoogleAuthErrorMessage(error.type)))
      },
    })

    tokenClient.requestAccessToken()
  })
}

const fetchGoogleUserInfo = async (accessToken: string): Promise<GoogleVerifiedUserInfo> => {
  const response = await fetch(GOOGLE_USERINFO_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('ไม่สามารถดึงข้อมูลบัญชี Google ได้')
  }

  const userInfo = (await response.json()) as GoogleUserInfoResponse

  if (!userInfo.sub || !userInfo.email) {
    throw new Error('ข้อมูลบัญชี Google ที่ได้รับไม่ครบถ้วน')
  }

  if (!(userInfo.email_verified === true || userInfo.email_verified === 'true')) {
    throw new Error('บัญชี Google นี้ยังไม่ได้ยืนยันอีเมล')
  }

  return {
    sub: userInfo.sub,
    name: userInfo.name,
    email: userInfo.email,
  }
}

const createBuyerSessionFromGoogle = (userInfo: GoogleVerifiedUserInfo): AuthSessionUser => ({
  ...createDefaultProfileFields('buyer'),
  id: `google-${userInfo.sub}`,
  name: userInfo.name?.trim() || 'ผู้ใช้ Google',
  email: userInfo.email.trim().toLowerCase(),
  role: 'buyer',
  provider: 'google',
  isMock: false,
})

export const googleIdentityService = {
  async authenticateBuyer(intent: BuyerAuthIntent): Promise<AuthActionResponse> {
    const accessToken = await requestGoogleAccessToken(intent)
    const userInfo = await fetchGoogleUserInfo(accessToken)
    const session = createBuyerSessionFromGoogle(userInfo)

    return {
      title: intent === 'login' ? 'เข้าสู่ระบบสำเร็จ' : 'สมัครสมาชิกสำเร็จ',
      description:
        intent === 'login'
          ? 'บัญชี Google ของคุณถูกเชื่อมเข้ากับ CodeBazaar เรียบร้อยแล้ว'
          : 'สร้างบัญชีผู้ใช้จาก Google เรียบร้อยแล้ว สามารถใช้งานต่อได้ทันที',
      session,
    }
  },
}
