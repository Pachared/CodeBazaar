import type { AuthProfileFields, AuthUserRole } from '@/types/auth'

export const createDefaultProfileFields = (role: AuthUserRole): AuthProfileFields => {
  if (role === 'seller') {
    return {
      phoneNumber: '',
      storeName: 'ร้านผู้ขายทดลอง',
      headline: 'ขายซอร์สโค้ดและเทมเพลตพร้อมใช้งาน',
      bio: 'โปรไฟล์นี้ใช้สำหรับทดสอบหน้าจัดการบัญชีและข้อมูลร้านค้าบน CodeBazaar',
      website: '',
      location: 'กรุงเทพมหานคร',
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
    headline: 'นักพัฒนาที่กำลังเลือกซื้อ source code และ template สำหรับต่อยอดงาน',
    bio: 'บัญชีนี้ใช้สำหรับทดสอบการซื้อสินค้าและหน้าตั้งค่าโปรไฟล์บน CodeBazaar',
    website: '',
    location: 'กรุงเทพมหานคร',
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
