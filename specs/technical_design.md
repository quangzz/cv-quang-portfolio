# Technical Design Specification — Portfolio Phạm Phúc Quang (`cv_quang`)

*Tài liệu Đặc tả Kỹ thuật (Source of Truth) tuân thủ quy tắc Harness & Spec-Driven Development thuộc bộ chuẩn `urah-agent-standards`.*

---

## 1. Mục Đích & Phạm Vi Hệ Thống
- Xây dựng trang Landing Page / Portfolio cá nhân cho kỹ sư **Phạm Phúc Quang** với 2 định hướng chuyên môn:
  1. **AI-Driven Software Engineer / Creative Technologist**
  2. **IT Helpdesk & System Support Specialist**
- Cung cấp trải nghiệm **Energetic Bento Grid** hiện đại, tích hợp bộ **Logo nhận diện thương hiệu (SVG Brand Logos)** và **Sơ đồ luồng kiến trúc (Architecture Pipeline)** cho từng dự án thực chiến.

## 2. Kiến Trúc Component & Luồng Dữ Liệu
- **Dữ liệu trung tâm (`src/app/utils/portfolio-data.ts`)**: Lưu trữ tách biệt dữ liệu cá nhân (`PERSONAL_INFO`), kỹ năng (`SKILL_GROUPS`), dự án (`PROJECTS_DATA`), kinh nghiệm (`EXPERIENCE_DATA`) và học vấn (`EDUCATION_DATA`).
- **Quản lý trạng thái (`src/app/context/PortfolioContext.tsx`)**:
  - `theme`: `'light' | 'dark'`
  - `roleMode`: `'all' | 'ai-engineer' | 'it-system'`
  - Tích hợp cơ chế `mounted` chống Hydration Mismatch (#418) và cơ chế tự động dọn dẹp các khóa nhạy cảm (`token`, `accessToken`, `jwt`, `auth`) trong `localStorage` theo chuẩn `frontend-security-audit` (CWE-522).
- **Hệ thống Logo Dự án (`src/app/components/ui/ProjectBrandLogo.tsx`)**:
  - Cung cấp component `BrandLogoBadge` hiển thị vector SVG chuẩn nhận diện cho: `GE Vernova`, `Ensure Gold (Abbott)`, `AI for Good 2026`, `Nutifood`, `Triển lãm Quốc gia 80 Năm`, `URAH Network`, `TriAn Corp`, và `Đại học Thủy Lợi (TLU)`.

## 3. Tiêu Chuẩn An Ninh Frontend (OWASP ASVS Level 2 & URAH Security Matrix)
- **CWE-522 (No JWT in localStorage)**: Không lưu trữ bất kỳ token xác thực nào trong `localStorage`; tự động xóa các khóa token cũ khi khởi chạy.
- **CWE-79 (No DOM XSS)**: Không sử dụng `dangerouslySetInnerHTML` trên toàn bộ mã nguồn.
- **CWE-1022 (Reverse Tabnabbing Prevention)**: Mọi liên kết mở tab mới (nếu có) bắt buộc có `rel="noopener noreferrer"`.
- **Clickjacking & MIME Sniffing Protection**: Cấu hình HTTP Security Headers (`X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`) trong cả `vercel.json` và `firebase.json`.
