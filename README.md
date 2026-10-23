# Portfolio Cá Nhân — Phạm Phúc Quang

Trang Landing Page / Portfolio giới thiệu hồ sơ năng lực của **Phạm Phúc Quang** (*AI-Driven Software Engineer / Creative Technologist* & *IT Helpdesk & System Support Specialist*).

## 1. Công Nghệ Sử Dụng
- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4** (Phong cách Energetic Bento Grid, hỗ trợ Dark / Light mode)
- **Lucide React Icons**
- **Dual-Role Mode Switcher**: Cho phép nhà tuyển dụng chuyển đổi linh hoạt giữa góc nhìn **Toàn diện**, **AI Engineer & Creative Tech** và **IT Helpdesk & System Support**.

## 2. Chạy Dự Án Tại Máy (Local)
```bash
cd E:\cv_quang
npm install
npm run dev
```

## 3. Hướng Dẫn Deploy Lên Vercel (Khuyên dùng - Nhanh nhất)
Dự án đã có sẵn file cấu hình `vercel.json`.
- **Cách 1 (Qua CLI)**:
  ```bash
  npx vercel
  ```
- **Cách 2 (Qua GitHub)**: Đẩy thư mục `E:\cv_quang` lên GitHub, vào [vercel.com](https://vercel.com) chọn **Add New Project** -> Import repository -> bấm **Deploy**.

## 4. Hướng Dẫn Deploy Lên Firebase Hosting
Dự án đã có sẵn file cấu hình `firebase.json` trỏ tới thư mục `dist`.
```bash
npm run build
npx firebase-tools login
npx firebase-tools init hosting
npx firebase-tools deploy --only hosting
```
