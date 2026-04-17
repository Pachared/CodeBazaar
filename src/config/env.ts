export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL?.trim() ?? '',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() ?? '',
}

export const hasRemoteApi = Boolean(env.apiBaseUrl)

export const requireRemoteApi = (featureLabel = 'ฟีเจอร์นี้') => {
  if (!hasRemoteApi) {
    throw new Error(`ยังไม่ได้ตั้งค่า VITE_API_BASE_URL สำหรับใช้งาน${featureLabel}แบบจริง`)
  }

  return env.apiBaseUrl
}
