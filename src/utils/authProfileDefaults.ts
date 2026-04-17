import type { AuthProfileFields, AuthUserRole } from '@/types/auth'

export const createDefaultProfileFields = (role: AuthUserRole): AuthProfileFields => {
  if (role === 'seller') {
    return {
      phoneNumber: '',
      storeName: '',
      savedCardHolderName: '',
      savedCardNumber: '',
      savedCardExpiry: '',
      bankName: '',
      bankAccountNumber: '',
      bankBookImageName: '',
      bankBookImageUrl: '',
      identityCardImageName: '',
      identityCardImageUrl: '',
      notifyOrders: true,
      notifyMarketplace: true,
    }
  }

  return {
    phoneNumber: '',
    storeName: '',
    savedCardHolderName: '',
    savedCardNumber: '',
    savedCardExpiry: '',
    bankName: '',
    bankAccountNumber: '',
    bankBookImageName: '',
    bankBookImageUrl: '',
    identityCardImageName: '',
    identityCardImageUrl: '',
    notifyOrders: true,
    notifyMarketplace: false,
  }
}
