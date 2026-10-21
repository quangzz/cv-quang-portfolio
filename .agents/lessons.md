# Lessons Learned — Dự Án Portfolio Phạm Phúc Quang

## 2026-10-22: Chuẩn hóa Họ tên và Bổ sung Hệ thống Logo Dự án / Thương hiệu
- **Vấn đề**: Bản đầu tiên để tên chính là "Phạm Phú Quang" (do dòng đầu CV ghi QUANG PHẠM PHÚ, trong khi bảng thông tin chính xác ghi **PHẠM PHÚC QUANG**) và các thẻ dự án chưa có logo nhận diện thương hiệu trực quan.
- **Khắc phục**:
  1. Thống nhất sử dụng tên chính thức **Phạm Phúc Quang** trên toàn bộ tiêu đề trang (`index.html`), `Navbar`, `HeroBento`, `ContactSection`, `Footer` và `portfolio-data.ts`.
  2. Thiết kế và tích hợp bộ **Logo nhận diện thương hiệu / dự án (SVG chuẩn màu sắc thương hiệu)** cho từng dự án thực chiến: **GE Vernova**, **Abbott Ensure Gold**, **Nutifood**, **AI for Good 2026**, **Triển lãm Quốc gia 80 Năm**, **URAH Network & TriAn Corp**, và **Đại học Thủy Lợi (TLU)**.
  3. Bổ sung dải **Client & Brand Logos Showcase** ngay dưới phần Hero và thêm **Visual Architecture Preview + Logo** vào từng thẻ dự án theo chuẩn các website Portfolio hiện đại trên thế giới.

## 2026-10-22: Tối giản hóa Header (`Navbar.tsx`) và phần Mở đầu (`HeroBento.tsx`)
- **Vấn đề**: Phần Header (`Navbar.tsx` và `HeroBento.tsx`) chứa quá nhiều chữ (phụ đề chức danh dài dưới tên logo, nhãn phụ, 6 link điều hướng dài, và 2 đoạn văn mục tiêu nghề nghiệp dài hiển thị cùng lúc) gây rối mắt.
- **Khắc phục**:
  1. `Navbar.tsx`: Chỉ giữ Logo `Q` + tên **Phạm Phúc Quang**, rút gọn nhãn menu (`Giới thiệu`, `Kỹ năng`, `Dự án`, `Kinh nghiệm`, `Liên hệ`), thu gọn nút chuyển chế độ (`Tất cả | AI | IT`) và chuyển nút In PDF thành icon button tinh gọn.
  2. `HeroBento.tsx`: Cô đọng phần giới thiệu thành một đoạn tóm tắt ngắn gọn (2–3 câu súc tích) kết hợp 3 thẻ tag điểm mạnh thay vì hiển thị 2 khối văn bản dài.
