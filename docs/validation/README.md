# Kiểm tra rules Đạo pháp

`cultivation-rules.mjs` là bài kiểm tra tích hợp đã chạy trên Firebase Emulator. Cần `@firebase/rules-unit-testing` và Firebase CLI trong môi trường QA (không thuộc dependency runtime game). Khởi động Firestore Emulator bằng project demo, rồi chạy script với `FIRESTORE_EMULATOR_HOST=127.0.0.1:<port>`. Script tự nạp `firestore.rules` của repo; không truy cập production. Bộ kiểm tra bao gồm quyền sở hữu, UID khác, chưa đăng nhập, timestamp, version và giới hạn/trạng thái cultivation.
