import type {
  FilterOption,
  SellerCatalogType,
  SellerFeature,
  SellerStat,
  SellerStep,
} from '@/types/marketplace'

export const projectCategoryOptions: FilterOption[] = [
  { label: 'ทุกหมวด', value: 'all' },
  { label: 'มาร์เก็ตเพลส', value: 'marketplace' },
  { label: 'แดชบอร์ด', value: 'dashboard' },
  { label: 'หน้าเปิดตัว', value: 'landing-page' },
  { label: 'SaaS เริ่มต้น', value: 'saas' },
  { label: 'ระบบดีไซน์', value: 'design-system' },
]

export const licenseOptions: FilterOption[] = [
  { label: 'ทุกไลเซนส์', value: 'all' },
  { label: 'ใช้งานส่วนตัว', value: 'personal' },
  { label: 'ใช้งานเชิงพาณิชย์', value: 'commercial' },
  { label: 'ขายต่อได้', value: 'resale' },
]

export const priceOptions: FilterOption[] = [
  { label: 'ทุกช่วงราคา', value: 'all' },
  { label: 'ต่ำกว่า 1,500 บาท', value: 'under-1500' },
  { label: '1,500 - 2,500 บาท', value: '1500-2500' },
  { label: 'มากกว่า 2,500 บาท', value: 'over-2500' },
]

export const sortOptions: FilterOption[] = [
  { label: 'แนะนำก่อน', value: 'featured' },
  { label: 'อัปเดตล่าสุด', value: 'latest' },
  { label: 'ราคาต่ำไปสูง', value: 'price-asc' },
  { label: 'ราคาสูงไปต่ำ', value: 'price-desc' },
]

export const stackOptions = ['React', 'TypeScript', 'MUI', 'API Ready', 'Responsive', 'Seller']

export const sellerFeatures: SellerFeature[] = [
  {
    title: 'เปิดสิทธิ์ผู้ขายจากบัญชีปัจจุบันก่อนลงขาย',
    description: 'ผู้ใช้ที่เข้าสู่ระบบแล้วสามารถอัปเกรดบัญชีเป็นผู้ขายเพื่อเริ่มจัดการร้าน รายการขาย และคำสั่งซื้อได้จาก flow เดียวกัน',
  },
  {
    title: 'Seller Studio รองรับทั้งบันทึกร่างและส่งขึ้นขาย',
    description: 'ผู้ขายสามารถกรอกข้อมูลสินค้า อัปโหลดไฟล์หลัก ภาพปก และเอกสารประกอบก่อนเลือกว่าจะบันทึกร่างหรือส่งขึ้นรายการขายจริง',
  },
  {
    title: 'ติดตามคำสั่งซื้อและดูรายการดาวน์โหลดต่อจากข้อมูลจริง',
    description: 'หลังมีคำสั่งซื้อ ผู้ขายสามารถกลับมาดูรายการที่เกี่ยวข้องใน Seller Orders ส่วนผู้ซื้อจะเห็นรายการที่ซื้อแล้วในคลังดาวน์โหลดของตัวเอง',
  },
]

export const sellerStats: SellerStat[] = [
  {
    label: 'เริ่มต้นผู้ขาย',
    value: 'บัญชีเดียว',
    description: 'ใช้บัญชีผู้ใช้เดิมแล้วเปิดสิทธิ์ผู้ขายเพิ่มได้ทันที โดยไม่ต้องสร้างบัญชีใหม่แยกอีกชุด',
  },
  {
    label: 'สถานะรายการ',
    value: 'Draft / Publish',
    description: 'เตรียมข้อมูลเป็นฉบับร่างก่อน หรือส่งขึ้นขายจริงทันทีเมื่อข้อมูลครบแล้ว',
  },
  {
    label: 'การติดตามหลังขาย',
    value: 'Orders + Downloads',
    description: 'หน้าร้าน ผู้ซื้อ และคำสั่งซื้อจะใช้ข้อมูลชุดเดียวกันจาก API จริง เพื่อให้ข้อมูลหลังบ้านและหน้าบ้านตรงกัน',
  },
]

export const sellerCatalogTypes: SellerCatalogType[] = [
  {
    title: 'ซอร์สโค้ดพร้อมต่อยอด',
    description: 'เหมาะกับงานที่มีโครงสร้างหน้าและ component ค่อนข้างครบแล้ว ผู้ซื้อสามารถนำไปพัฒนาต่อหรือปรับใช้กับโปรเจกต์จริงได้เร็ว',
    tags: ['Boilerplate', 'Dashboard', 'SaaS Starter'],
  },
  {
    title: 'เทมเพลตและหน้า UI สำหรับปรับแบรนด์ต่อ',
    description: 'เหมาะกับหน้าเปิดตัว หน้าขายสินค้า หรือชุดเลย์เอาต์ที่ผู้ซื้ออยากนำไปปรับข้อความ สี และภาพลักษณ์ของตัวเองต่อ',
    tags: ['Landing Page', 'UI Kit', 'Theme'],
  },
  {
    title: 'ชุดคอมโพเนนต์หรือโมดูลเฉพาะทาง',
    description: 'เหมาะกับ asset ที่แยกเป็นส่วนย่อย เช่น component set, dashboard module หรือเครื่องมือที่ช่วยให้ทีมพัฒนาเริ่มงานเร็วขึ้น',
    tags: ['MUI', 'Admin Module', 'Automation'],
  },
]

export const sellerSteps: SellerStep[] = [
  {
    title: 'เข้าสู่ระบบด้วย Google',
    description: 'เริ่มจากยืนยันตัวตนด้วย Google เพื่อให้ระบบผูกบัญชีผู้ใช้จริงก่อนเข้าสู่ flow ผู้ขาย',
  },
  {
    title: 'เปิดสิทธิ์ผู้ขายจากบัญชีที่ใช้อยู่',
    description: 'เมื่อเข้าสู่ระบบแล้ว คุณสามารถเปิดใช้งานบทบาทผู้ขายให้บัญชีเดิมได้ทันทีจากหน้า seller flow',
  },
  {
    title: 'ตั้งค่าโปรไฟล์ร้านและข้อมูลรับเงิน',
    description: 'กรอกชื่อร้าน เบอร์โทร ข้อมูลรับเงิน และเอกสารประกอบในหน้าโปรไฟล์ให้พร้อมก่อนเริ่มลงรายการจริง',
  },
  {
    title: 'เข้า Seller Studio แล้วส่งขึ้นขาย',
    description: 'กรอกข้อมูลสินค้า แนบไฟล์หลัก ภาพพรีวิว และเอกสารให้ครบ จากนั้นเลือกบันทึกร่างหรือส่งขึ้นขายตามความพร้อม',
  },
]

export const sellerAssetTypeOptions: FilterOption[] = [
  { label: 'ซอร์สโค้ด', value: 'source-code' },
  { label: 'เทมเพลต', value: 'template' },
  { label: 'ชุดคอมโพเนนต์', value: 'component-kit' },
]

export const sellerUploadCategoryOptions: FilterOption[] = [
  { label: 'มาร์เก็ตเพลส', value: 'marketplace' },
  { label: 'แดชบอร์ด', value: 'dashboard' },
  { label: 'หน้าเปิดตัว', value: 'landing-page' },
  { label: 'SaaS เริ่มต้น', value: 'saas' },
  { label: 'ระบบดีไซน์', value: 'design-system' },
]

export const sellerUploadLicenseOptions: FilterOption[] = [
  { label: 'ใช้งานส่วนตัว', value: 'personal' },
  { label: 'ใช้งานเชิงพาณิชย์', value: 'commercial' },
  { label: 'ขายต่อได้', value: 'resale' },
]

export const sellerDeliveryMethodOptions = [
  {
    label: 'Release / Binary only',
    value: 'release-binary',
    description: 'เหมาะกับไฟล์ build หรือ release พร้อมใช้งาน เช่น .zip, .exe, .dmg, .jar',
    helperText: 'ใช้เมื่อคุณต้องการส่งมอบไฟล์สำเร็จรูปให้ผู้ซื้อหลังคำสั่งซื้อเสร็จสมบูรณ์',
  },
  {
    label: 'Source package upload',
    value: 'source-package-upload',
    description: 'เหมาะกับผู้ขายที่ยอมอัปโหลด source package ให้ผู้ซื้อโดยตรงในรูปแบบไฟล์บีบอัด',
    helperText: 'ใช้เมื่อคุณต้องการแนบ source code เป็นแพ็กเกจเพื่อให้ผู้ซื้อดาวน์โหลดและนำไปต่อยอดเอง',
  },
] as const

export const sellerUploadChecklist = [
  'เข้าสู่ระบบและเปิดสิทธิ์ผู้ขายให้บัญชีของคุณก่อนเริ่มลงขาย',
  'ตั้งค่าชื่อร้าน ข้อมูลติดต่อ และข้อมูลรับเงินในโปรไฟล์ให้เรียบร้อยก่อน',
  'เลือกให้ชัดว่าจะส่งมอบแบบ Release/Binary หรือ Source package upload',
  'เตรียมชื่อรายการ คำอธิบาย จุดเด่น สิ่งที่รวมมาให้ ไลเซนส์ ราคา และเทคโนโลยีหลักให้ครบ',
  'เตรียมไฟล์หลัก ภาพพรีวิว เอกสารประกอบ และข้อมูลเวอร์ชันให้พร้อมก่อนกดส่ง',
  'ตรวจ preview ของรายการอีกครั้งก่อนกดบันทึกร่างหรือส่งขึ้นรายการขาย',
]

export const sellerStoragePolicyHighlights = [
  {
    title: 'ระบุไฟล์หลักของแพ็กเกจให้ชัดเจน',
    description: 'ชื่อไฟล์หลักควรสื่อได้ว่าผู้ซื้อจะได้รับอะไร เพื่อให้ทั้งหน้ารายละเอียดสินค้าและคำสั่งซื้ออ่านเข้าใจตรงกัน',
  },
  {
    title: 'เพิ่มภาพปกและเอกสารประกอบเมื่อจำเป็น',
    description: 'ภาพพรีวิวและเอกสารช่วยให้ผู้ซื้อเห็นขอบเขตของสินค้าได้ชัดขึ้น และลดคำถามซ้ำก่อนตัดสินใจซื้อ',
  },
  {
    title: 'เลือกวิธีส่งมอบให้ตรงกับประเภทสินค้า',
    description: 'ถ้าเป็น release สำเร็จรูปให้เลือก Release/Binary แต่ถ้าเป็น source code ที่พร้อมต่อยอดให้เลือก Source package upload',
  },
] as const

export const sellerPlatformPolicyStatements = [
  'ตรวจสอบชื่อ ราคา รายละเอียด และไฟล์ประกอบให้ครบก่อนบันทึกร่างหรือส่งขึ้นขาย',
  'หากข้อมูลร้านหรือข้อมูลรับเงินยังไม่ครบ ควรกลับไปอัปเดตในหน้าโปรไฟล์ก่อนเริ่มรับคำสั่งซื้อ',
  'หลังมีคำสั่งซื้อแล้ว ให้ติดตามรายการจากหน้า Seller Orders และตรวจสอบความครบถ้วนของข้อมูลส่งมอบทุกครั้ง',
] as const
