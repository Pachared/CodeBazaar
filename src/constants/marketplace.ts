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
    label: 'ไฟล์พร้อมใช้งาน',
    value: 'จัดครบ',
    description: 'แต่ละรายการมีแพ็กเกจดาวน์โหลด รายละเอียดไลเซนส์ และข้อมูลสำคัญให้ดูก่อนตัดสินใจซื้อ',
  },
]

export const sellerFeatures: SellerFeature[] = [
  {
    title: 'ใช้บัญชีเดียวจัดการทั้งผู้ซื้อและผู้ขาย',
    description: 'เปิดบัญชีผู้ขายจาก Google account เดิมได้ทันที แล้วกลับมาแก้โปรไฟล์หรือข้อมูลร้านจากหน้าเดียวกัน',
  },
  {
    title: 'มี Seller Studio สำหรับกรอกข้อมูลและดูตัวอย่างก่อนส่งขาย',
    description: 'กรอกชื่อสินค้า ราคา ไลเซนส์ จุดเด่น สิ่งที่รวมมาให้ และดู preview ของหน้ารายละเอียดสินค้าได้ในจุดเดียว',
  },
  {
    title: 'มี flow หน้าร้าน ผู้ซื้อ และหน้ารายละเอียดสินค้ารองรับไว้แล้ว',
    description: 'สิ่งที่ผู้ขายกรอกจะสัมพันธ์กับการ์ดรายการขาย หน้ารายละเอียดสินค้า ตะกร้า และ flow ของผู้ซื้อที่เตรียมไว้ในระบบ',
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
    title: 'เปิดบัญชีผู้ขายด้วย Google',
    description: 'เริ่มจากอัปเกรดบัญชีปัจจุบันให้เป็นผู้ขายก่อน เพื่อให้เข้าถึง Seller Studio และพื้นที่ลงขายสินค้าได้',
  },
  {
    title: 'ตั้งค่าโปรไฟล์ร้านและข้อมูลรับเงิน',
    description: 'กรอกชื่อร้าน ข้อมูลแนะนำผู้ขาย ธนาคารรับเงิน และเอกสารที่จำเป็นในหน้าตั้งค่าโปรไฟล์ให้เรียบร้อย',
  },
  {
    title: 'เตรียมข้อมูลของรายการขายให้ครบ',
    description: 'วางชื่อสินค้า คำอธิบาย จุดเด่น สิ่งที่รวมมาให้ กลุ่มเป้าหมาย ราคา หมวดหมู่ และไลเซนส์ให้พร้อมก่อนเข้า Studio',
  },
  {
    title: 'เข้า Seller Studio แล้วส่งขึ้นขาย',
    description: 'แนบไฟล์แพ็กเกจ ภาพพรีวิว และเอกสารประกอบ จากนั้นตรวจ preview ของหน้ารายละเอียดสินค้าแล้วค่อยบันทึกหรือส่งขาย',
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

export const sellerUploadChecklist = [
  'ตั้งชื่อรายการ คำอธิบายสั้น และรายละเอียดแบบเต็มให้ชัดเจนก่อน',
  'เตรียมจุดเด่นของแพ็กเกจ สิ่งที่รวมมาให้ และเหมาะกับใครไว้ให้ครบ',
  'เลือกหมวดหมู่ ไลเซนส์ ราคา เวอร์ชัน และเทคโนโลยีหลักให้ตรงกับสินค้าที่จะขาย',
  'แนบไฟล์แพ็กเกจหลัก ภาพพรีวิว และเอกสารประกอบให้พร้อมก่อนส่งขาย',
  'ตรวจ preview ของหน้ารายละเอียดสินค้าอีกครั้งก่อนกดบันทึกหรือส่งขึ้นรายการขาย',
]

export const sellerUploadHighlights = [
  'รองรับแพ็กเกจ .zip หรือไฟล์บีบอัดพร้อมใช้งาน',
  'แยกข้อมูลสำคัญของรายการขายไว้ครบสำหรับต่อ backend จริง',
  'เหมาะกับทั้ง source code, template และ component bundle',
]
