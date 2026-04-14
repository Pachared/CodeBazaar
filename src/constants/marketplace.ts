import type {
  FilterOption,
  ProjectInsight,
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

export const heroInsights: ProjectInsight[] = [
  {
    label: 'โปรเจกต์พร้อมขาย',
    value: '120+',
    description: 'รวมซอร์สโค้ด เทมเพลต และชุดเริ่มต้นที่จัดวางอย่างเป็นระเบียบ',
  },
  {
    label: 'หมวดหมู่หลัก',
    value: '5 หมวด',
    description: 'แยกเป็นมาร์เก็ตเพลส แดชบอร์ด หน้าเปิดตัว ระบบดีไซน์ และ SaaS เริ่มต้น',
  },
  {
    label: 'พร้อมต่อ API',
    value: 'ครบชั้น',
    description: 'มี service, hook, type และข้อมูลตัวอย่างสำหรับเชื่อม backend จริงต่อได้ทันที',
  },
]

export const sellerFeatures: SellerFeature[] = [
  {
    title: 'สมัครด้วย Google ได้ทันที',
    description: 'ลดขั้นตอนเปิดร้านและพร้อมต่อระบบ OAuth จริงในภายหลัง',
  },
  {
    title: 'แยกรายการขายเป็นหมวดชัดเจน',
    description: 'รองรับการตั้งราคา ไลเซนส์ จุดขาย และ stack ของแต่ละโปรเจกต์',
  },
  {
    title: 'ขยายเป็นระบบขายจริงได้ง่าย',
    description: 'มีโครงสร้างหน้า component, services, hooks และ types รองรับการต่อ API',
  },
]

export const sellerStats: SellerStat[] = [
  {
    label: 'เริ่มต้นได้ทันที',
    value: 'Google เท่านั้น',
    description: 'เปิดบัญชีผู้ขายและเริ่มกรอกข้อมูลร้านได้จากขั้นตอนเดียว',
  },
  {
    label: 'ประเภทสินค้าที่รองรับ',
    value: 'ซอร์สโค้ด + เทมเพลต',
    description: 'ขายได้ทั้ง boilerplate, dashboard, landing page, UI kit และระบบสำเร็จรูป',
  },
  {
    label: 'พร้อมต่อระบบจริง',
    value: 'พร้อมต่อ API',
    description: 'ต่อระบบอนุมัติผู้ขาย รายการขาย คำสั่งซื้อ และระบบรับเงินได้ต่อเนื่อง',
  },
]

export const sellerCatalogTypes: SellerCatalogType[] = [
  {
    title: 'Source code พร้อมใช้งาน',
    description: 'เหมาะกับโปรเจกต์ที่มีโครงสร้างครบและพร้อมให้ผู้ซื้อเอาไปต่อยอดได้ทันที',
    tags: ['Boilerplate', 'Dashboard', 'SaaS Starter'],
  },
  {
    title: 'Template สำหรับนำไปแต่งต่อ',
    description: 'เหมาะกับหน้าเปิดตัว ชุด UI หรือธีมที่ผู้ซื้ออยากเอาไปปรับแบรนด์ต่อเอง',
    tags: ['Landing Page', 'UI Kit', 'Theme'],
  },
  {
    title: 'ชุด component และเครื่องมือเฉพาะทาง',
    description: 'ขาย asset ที่ช่วยให้ทีมพัฒนาเริ่มงานไวขึ้น เช่น component set, admin module หรือ script',
    tags: ['MUI', 'Admin Module', 'Automation'],
  },
]

export const sellerSteps: SellerStep[] = [
  {
    title: 'เชื่อมบัญชี Google',
    description: 'ใช้บัญชีเดียวสำหรับล็อกอิน สมัครสมาชิก และยืนยันตัวตนในฝั่งผู้ขาย',
  },
  {
    title: 'ตั้งค่าโปรไฟล์ร้านค้า',
    description: 'กรอกชื่อร้าน รายละเอียดความเชี่ยวชาญ และช่องทางช่วยเหลือหลังการขาย',
  },
  {
    title: 'ลงสินค้าและกำหนดไลเซนส์',
    description: 'เพิ่มชื่อโปรเจกต์ คำอธิบาย ราคา หมวดหมู่ และสิทธิ์การใช้งานให้ชัดเจน',
  },
  {
    title: 'เปิดขายและรับออเดอร์',
    description: 'จัดการรายการขาย อัปเดตเวอร์ชัน และติดตามคำสั่งซื้อจากระบบกลางได้ต่อทันที',
  },
]
