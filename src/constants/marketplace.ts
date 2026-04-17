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
    title: 'ผู้ขายต้องเปิดบัญชีผ่าน GitHub ก่อนลงขาย',
    description: 'แยก flow ของผู้ขายให้ชัดเจนตั้งแต่ต้น เพื่อใช้ GitHub เป็นตัวกลางสำหรับงานที่เกี่ยวกับซอร์สโค้ด repo และ release ของผู้ขาย',
  },
  {
    title: 'เลือกรูปแบบการส่งมอบได้ 3 แบบจากหน้า Seller Studio',
    description: 'รองรับทั้ง Release/Binary only, GitHub private repo integration และ Source package upload เพื่อให้ตรงกับระดับการเปิดเผยไฟล์ของผู้ขายแต่ละคน',
  },
  {
    title: 'ไฟล์ทุกชิ้นถูกออกแบบให้เก็บแบบ private บน Cloudflare R2',
    description: 'ระบบจะเน้น private bucket, signed URL แบบหมดอายุเร็ว, audit log, file hash และการตรวจสิทธิ์ตาม order ก่อนปล่อยดาวน์โหลดทุกครั้ง',
  },
]

export const sellerStats: SellerStat[] = [
  {
    label: 'เริ่มต้นได้ทันที',
    value: 'GitHub เท่านั้น',
    description: 'บัญชีผู้ขายจะเริ่มจากการเชื่อม GitHub ก่อน เพื่อรองรับงานที่เกี่ยวข้องกับ source code และ repo',
  },
  {
    label: 'รูปแบบการส่งมอบ',
    value: '3 แบบ',
    description: 'ขายได้ทั้ง binary/release, GitHub private repo integration และ source package upload',
  },
  {
    label: 'การเก็บไฟล์',
    value: 'R2 Private',
    description: 'ออกแบบให้ไฟล์เก็บ private และส่งมอบผ่าน signed URL ที่ตรวจสิทธิ์ตามคำสั่งซื้อ',
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
    title: 'เปิดบัญชีผู้ขายด้วย GitHub',
    description: 'เริ่มจากเชื่อม GitHub เพื่อให้บัญชีนี้กลายเป็น seller account และพร้อมใช้งาน flow ที่เกี่ยวกับ source code หรือ private repo',
  },
  {
    title: 'ตั้งค่าโปรไฟล์ร้านและข้อมูลรับเงิน',
    description: 'กรอกชื่อร้าน เบอร์โทร ข้อมูลรับเงิน และเอกสารผู้ขายในหน้าโปรไฟล์ให้พร้อมก่อนเริ่มลงรายการจริง',
  },
  {
    title: 'เลือกรูปแบบการส่งมอบและเตรียม artifact',
    description: 'ตัดสินใจก่อนว่าจะขายเป็น Release/Binary, GitHub private repo integration หรือ Source package upload แล้วเตรียมไฟล์หรือข้อมูล repo ให้ตรงกับรูปแบบนั้น',
  },
  {
    title: 'เข้า Seller Studio แล้วส่งขึ้นขาย',
    description: 'กรอกข้อมูลสินค้า อัปโหลด artifact ที่เกี่ยวข้อง ตรวจ preview และยืนยันว่ารายการนี้จะถูกเก็บแบบ private พร้อมส่งมอบตาม order ที่ซื้อแล้วเท่านั้น',
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
    helperText: 'ผู้ซื้อจะได้รับ artifact สำเร็จรูปผ่าน signed URL หลังตรวจสิทธิ์จากคำสั่งซื้อ',
  },
  {
    label: 'GitHub private repo integration',
    value: 'github-private-repo',
    description: 'เหมาะกับผู้ขายที่ต้องการส่งมอบผ่าน private repo หรือ release ภายใน GitHub เท่านั้น',
    helperText: 'ระบบจะเก็บ metadata สำหรับเชื่อมสิทธิ์ repo และใช้ order เป็นตัวควบคุมการส่งมอบ',
  },
  {
    label: 'Source package upload',
    value: 'source-package-upload',
    description: 'เหมาะกับผู้ขายที่ยอมอัปโหลด source package ให้ผู้ซื้อโดยตรงในรูปแบบไฟล์บีบอัด',
    helperText: 'ไฟล์ source จะถูกเก็บแบบ private บน Cloudflare R2 และปล่อยผ่าน signed URL แบบหมดอายุเร็ว',
  },
] as const

export const sellerUploadChecklist = [
  'เปิดบัญชีผู้ขายด้วย GitHub และตั้งค่าชื่อร้าน/ข้อมูลรับเงินในโปรไฟล์ให้เรียบร้อยก่อน',
  'เลือกให้ชัดว่าจะส่งมอบแบบ Release/Binary, GitHub private repo หรือ Source package upload',
  'เตรียมชื่อรายการ คำอธิบาย จุดเด่น สิ่งที่รวมมาให้ ไลเซนส์ ราคา และเทคโนโลยีหลักให้ครบ',
  'ถ้าอัปโหลดไฟล์เอง ให้เตรียม artifact, ภาพพรีวิว, เอกสารประกอบ และข้อมูลเวอร์ชันให้พร้อม',
  'ตรวจ preview และอ่านนโยบายการเก็บไฟล์อีกครั้งก่อนกดบันทึกหรือส่งขึ้นรายการขาย',
]

export const sellerStoragePolicyHighlights = [
  {
    title: 'เก็บไฟล์แบบ private บน Cloudflare R2 เสมอ',
    description: 'ไฟล์ที่ผู้ขายอัปโหลดจะไม่ถูกเปิดเป็นลิงก์สาธารณะ และ admin/staff ไม่ควรเปิดดาวน์โหลดไฟล์ดิบได้ตรง ๆ',
  },
  {
    title: 'ปล่อยดาวน์โหลดผ่าน signed URL ที่หมดอายุเร็ว',
    description: 'ลูกค้าจะได้รับลิงก์ชั่วคราวหลังผ่านการตรวจสิทธิ์จาก order ที่ซื้อแล้วเท่านั้น ลดความเสี่ยงจากการแชร์ลิงก์ต่อ',
  },
  {
    title: 'เก็บ audit log ทุกการเข้าถึงไฟล์',
    description: 'บันทึกว่าใคร generate ลิงก์ ดาวน์โหลดไฟล์ เวลาไหน และผูกกับคำสั่งซื้อใด เพื่อใช้ตรวจสอบย้อนหลังได้',
  },
  {
    title: 'สร้าง SHA-256 และใช้ storage key ที่เดายาก',
    description: 'ทุกไฟล์ควรถูกสร้าง hash และเก็บด้วย key แบบสุ่มหลายชั้น เพื่อพิสูจน์ไฟล์ต้นฉบับและลดการเดา path ได้',
  },
] as const

export const sellerPlatformPolicyStatements = [
  'platform ใช้ไฟล์เพื่อเก็บและส่งมอบตามคำสั่งซื้อเท่านั้น ไม่ควรนำไฟล์ของผู้ขายไปใช้เอง',
  'seller ควรลบไฟล์หรือปิดขายรายการของตัวเองได้เมื่อไม่ต้องการเปิดขายต่อ',
  'การสร้างลิงก์ดาวน์โหลดและการเปิดไฟล์ทุกครั้งควรถูกผูกกับ order และผู้ใช้งานที่มีสิทธิ์เท่านั้น',
] as const
