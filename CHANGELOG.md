# Changelog

Mọi thay đổi đáng chú ý của portfolio Phạm Phúc Quang (`cv_quang`) được ghi tại đây.
Định dạng theo [Keep a Changelog](https://keepachangelog.com/vi/1.1.0/), phiên bản theo [Semantic Versioning](https://semver.org/lang/vi/).

## [1.2.0] - 2026-10-25

### Thêm
- Hero: bộ chọn "Xem hồ sơ theo vị trí" (Tất cả / AI Engineer / IT Support) thay cho các icon trên navbar.
- Navbar làm nổi mục đang xem khi cuộn trang (`aria-current`).
- Thẻ dự án và nhóm kỹ năng có nút "Xem chi tiết" / "Thu gọn". Bản in PDF vẫn hiện đủ nội dung.
- CSS riêng cho bản in / "Lưu hồ sơ PDF". Trang tự chuyển sang giao diện sáng khi in.
- Phần Dự án hiện thông báo kèm nút "Xem tất cả" khi bộ lọc không có kết quả.

### Thay đổi
- Bộ lọc vai trò áp dụng nhất quán: chế độ AI ẩn dự án IT, thẻ số liệu Hero lọc theo vai trò.
- Thẻ số liệu Hero xếp 2 cột trên mobile. Chức danh tách thành 2 dòng. Thẻ bên phải đổi thành "Liên hệ nhanh".
- Rút ngắn tiêu đề các phần Kỹ năng, Dự án, Kinh nghiệm, Học vấn, Liên hệ.
- Nút gửi form đổi thành "Soạn Email", kèm giải thích rằng nút này mở ứng dụng email trên máy.
- Thẻ kỹ năng của nhóm không chọn bớt mờ (tăng tương phản). Nhóm đang chọn có viền. Bỏ nhãn "Core".
- Khu Liên hệ chỉ hiện địa chỉ rút gọn.
- Firebase Hosting: chỉ cache `immutable` cho `/assets/**`. Logo cache 1 ngày, `version.json` không cache.

### Sửa lỗi
- Email không còn bị cắt ở Hero và Liên hệ.
- Navbar không còn tràn ngang trên màn hình 360px.
- Bấm logo đối tác ở Hero luôn cuộn tới đúng dự án, kể cả khi đang lọc.
- Tiêu đề phần không còn bị navbar che khi nhảy tới anchor. Tôn trọng `prefers-reduced-motion`.
- Trang không còn sập khi trình duyệt chặn `localStorage`. Không còn chớp sáng khi tải ở chế độ tối.
- Sao chép số điện thoại/email báo lỗi rõ ràng khi trình duyệt không cho phép.
- Sơ đồ kiến trúc dự án không còn bị cắt chữ.
- Chuẩn hoá tên "Phạm Phúc Quang" trong README và tài liệu.

### Trợ năng
- Thêm `aria-pressed`, `aria-expanded`, `aria-controls`, `aria-live`, `role="alert"`/`role="status"`, `aria-invalid` cho các nút và form.
- Viền focus khi điều hướng bằng bàn phím. Logo có nhãn chữ không bị đọc tên lặp lại.

### Nội bộ
- Pipeline điều phối Claude (reviewer) ↔ Antigravity (agent) tại `.agents/pipeline/`.

## [1.1.0] - 2026-10-22

### Thêm
- Logo chính thức của các thương hiệu, đối tác và trường học.
- Tích hợp bộ chuẩn `urah-agent-standards`.

### Thay đổi
- Tối giản navbar và Hero.
- Thống nhất họ tên "Phạm Phúc Quang".
