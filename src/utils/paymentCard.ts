export const formatCardNumberInput = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.match(/.{1,4}/g)?.join(' ') ?? ''
}

export const formatCardExpiryInput = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4)

  if (digits.length <= 2) {
    return digits
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export const formatCardCvcInput = (value: string) => value.replace(/\D/g, '').slice(0, 4)

export const maskCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return '•••• •••• •••• ••••'
  }

  const lastFourDigits = digits.slice(-4)
  return `•••• •••• •••• ${lastFourDigits.padStart(4, '•')}`
}

export const hasSavedCard = (cardHolderName: string, cardNumber: string, cardExpiry: string) =>
  cardHolderName.trim().length > 0 &&
  cardNumber.replace(/\D/g, '').length >= 15 &&
  /^\d{2}\/\d{2}$/.test(cardExpiry)
