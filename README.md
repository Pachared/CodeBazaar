# โค้ดบาซาร์

โปรเจกต์ตั้งต้นสำหรับทำ marketplace ขายซอร์สโค้ด เทมเพลต และ starter kit โดยใช้ React, TypeScript, Vite และ MUI

## เทคโนโลยีหลัก

- React 19
- TypeScript
- Vite
- MUI
- React Router
- Axios

## คำสั่งที่ใช้

```bash
npm install
npm run dev
npm run build
npm run lint
```

## การตั้งค่า API

สร้างไฟล์ `.env` จาก `.env.example` แล้วกำหนดค่า:

```bash
VITE_API_BASE_URL=https://api.example.com
```

ถ้ายังไม่ได้ตั้งค่า `VITE_API_BASE_URL` หน้า marketplace จะใช้ข้อมูลตัวอย่างในเครื่องก่อน ทำให้พัฒนา UI ต่อได้ทันที

## โครงสร้างโฟลเดอร์

```text
src/
  app/           จุดเริ่มต้นของแอปและ provider
  components/    คอมโพเนนต์ที่ใช้ซ้ำและส่วนประกอบของหน้า marketplace
  config/        ตัวช่วยด้าน environment
  constants/     ค่าคงที่และตัวเลือกสำหรับ UI
  data/          ข้อมูลตัวอย่างสำหรับพัฒนาในเครื่อง
  hooks/         custom hooks
  layouts/       layout หลักของแต่ละหน้า
  pages/         หน้า route
  routes/        การตั้งค่า router
  services/      api client และ service files
  styles/        global styles
  theme/         การตั้งค่า MUI theme
  types/         TypeScript types กลาง
  utils/         utility helpers
```

## สิ่งที่มีให้แล้ว

- UI ภาษาไทยในโทนขาวดำแนว glass/minimal
- Navbar พร้อม Google login, สมัครสมาชิก, และเปิดบัญชีผู้ขาย
- หน้า Home แบบซ้ายค้นหา ขวากริดโปรเจกต์
- service layer สำหรับสินค้า, auth, และ seller onboarding ที่พร้อมต่อ API จริง
