import { useContext } from 'react'
import { CookieConsentContext } from '@/app/providers/cookie-consent-context'

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext)

  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider')
  }

  return context
}
