const thaiBahtFormatter = new Intl.NumberFormat('th-TH', {
  maximumFractionDigits: 0,
})

export const formatCurrency = (value: number) => `${thaiBahtFormatter.format(value)} บาท`
