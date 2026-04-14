import type {
  AuthActionResponse,
  AuthProfileFields,
  AuthSessionUser,
  BuyerAuthIntent,
} from '@/types/auth'
import { createDefaultProfileFields } from '@/utils/authProfileDefaults'

const createBaseSession = (
  session: Omit<AuthSessionUser, 'provider' | 'isMock' | keyof AuthProfileFields>,
): AuthSessionUser => ({
  ...createDefaultProfileFields(session.role),
  ...session,
  provider: 'google',
  isMock: true,
})

export const createMockBuyerSession = (intent: BuyerAuthIntent) =>
  createBaseSession({
    id: intent === 'register' ? 'mock-buyer-new' : 'mock-buyer',
    name: intent === 'register' ? 'สมาชิกทดลอง' : 'ผู้ซื้อทดลอง',
    email:
      intent === 'register'
        ? 'new-buyer@codebazaar.local'
        : 'buyer@codebazaar.local',
    role: 'buyer',
  })

export const createMockSellerSession = () =>
  createBaseSession({
    id: 'mock-seller',
    name: 'ผู้ขายทดลอง',
    email: 'seller@codebazaar.local',
    role: 'seller',
  })

export const createMockAuthResponse = (
  session: AuthSessionUser,
  content: Pick<AuthActionResponse, 'title' | 'description'>,
): AuthActionResponse => ({
  ...content,
  session,
})
