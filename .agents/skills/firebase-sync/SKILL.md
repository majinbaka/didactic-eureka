---
name: firebase-sync
description: Phát triển Firebase Auth, Firestore cloud save và rules cho Tu Tiên Loạn Giới; dùng khi sửa đồng bộ dữ liệu hoặc kết nối backend.
---

Đọc `docs/architecture.md`, `src/services/firebase.js` và `firestore.rules`. Giữ game local hoạt động khi thiếu config/mất mạng. Auth anonymous hiện chỉ dùng cho cloud save cùng trình duyệt; liên kết tài khoản trước khi hứa sync đa thiết bị.

Chỉ I/O trong services, ownership theo UID, schema validation cả client và rules. Mọi VITE env là public; không đặt Admin credentials ở frontend. Không ghi Firestore mỗi click. Tải cloud cần quyết định rõ replace/merge; tránh startup pull ghi đè local.

Thay rules cần kiểm tra quyền người chưa đăng nhập, UID khác, schema sai và server timestamp bằng Emulator trước release. Chỉ deploy dịch vụ thật khi task yêu cầu; nếu chưa kiểm tra với Firebase thật, báo rõ. Không tuyên bố client-controlled save đã chống gian lận.
