# Project Tech Stack & Architecture Rules — Personal Portfolio (Phạm Phú Quang)

## 1. Tech Stack Cụ Thể
- **Runtime & Build Tool**: Vite 6.x + Node.js
- **Frontend Framework**: React 19.x + TypeScript 5.x
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`), cấu hình CSS-first trong `src/styles/theme.css` (không sử dụng `tailwind.config.js`).
- **Fonts**: `Plus Jakarta Sans` (Sans-serif chính) & `JetBrains Mono` (Monospace cho thông số kỹ thuật/tags), chỉ import tại `src/styles/fonts.css`.
- **Icons**: `lucide-react` (chỉ named-import những icon cần dùng).

## 2. Cấu Trúc Thư Mục Thực Tế
```text
/
├── .agents/
│   └── rules/
│       └── project-tech-stack.md
├── public/
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── ui/
│   │   │   │   ├── BentoCard.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── SectionHeader.tsx
│   │   │   │   └── ErrorBoundary.tsx
│   │   │   └── features/
│   │   │       ├── HeroBento.tsx
│   │   │       ├── SkillsGrid.tsx
│   │   │       ├── ProjectsShowcase.tsx
│   │   │       ├── ExperienceTimeline.tsx
│   │   │       ├── EducationHardwareSection.tsx
│   │   │       └── ContactSection.tsx
│   │   ├── context/
│   │   │   └── PortfolioContext.tsx
│   │   ├── utils/
│   │   │   └── portfolio-data.ts
│   │   └── types/
│   │       └── portfolio.ts
│   └── styles/
│       ├── fonts.css
│       ├── theme.css
│       └── index.css
├── vercel.json
└── firebase.json
```

## 3. Chiến Lược Quản Lý State (State Management Strategy)
- **Context (`PortfolioContext`)**:
  - `theme`: `'light' | 'dark'` (Mặc định `'light'` theo phong cách sáng sủa, trẻ trung, lưu vào `localStorage`).
  - `roleMode`: `'all' | 'ai-engineer' | 'it-system'` — Cho phép nhà tuyển dụng xem tổng thể hồ sơ hoặc chuyển đổi trọng tâm giữa **AI-Driven Software Engineer / Creative Technologist** và **IT Helpdesk & System Support Specialist**.
- **Local UI State (`useState`)**:
  - Quản lý bộ lọc dự án, modal xem chi tiết kỹ thuật dự án, menu di động, trạng thái copy thông tin liên hệ và form liên hệ.

## 4. Cấu Hình Deploy & Backend
- **Kiến trúc**: Pure Frontend (Static SPA), không cần database backend phức tạp để tối ưu tốc độ tải (<1.5s) và miễn phí 100% hosting.
- **Deploy Settings**:
  - **Vercel**: Cấu hình SPA rewrites và Cache-Control headers cho static assets trong `vercel.json`.
  - **Firebase Hosting**: Cấu hình thư mục `dist` và SPA rewrite trong `firebase.json`.

## 5. Quy Ước Riêng Của Dự Án (Project-Specific Conventions)
- Toàn bộ nội dung CV của Phạm Phú Quang (cả mảng AI-Driven Software Engineer và IT Helpdesk & System Support) được chuẩn hóa trong `src/app/utils/portfolio-data.ts` để dễ dàng cập nhật.
- Toàn bộ comment trong code viết bằng tiếng Việt, tên biến/hàm/component viết bằng tiếng Anh chuẩn.
