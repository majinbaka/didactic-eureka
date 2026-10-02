# Hướng dẫn AI trong repo

## Ngữ cảnh

Đọc `README.md`, `design.md` khi sửa UI, `game-design.md` khi sửa gameplay, `docs/architecture.md` khi sửa lưu dữ liệu. React + JavaScript + HTML/CSS, Vite, PWA; Vercel frontend và Firebase dữ liệu. Giao diện tiếng Việt, pixel Nhật Bản, chủ đề tu tiên hư cấu.

## Quy ước

- Logic gameplay thuần ở `src/game`; React render và xử lý input, không chứa công thức kinh tế phân tán.
- I/O Firebase trong `src/services`; không gọi SDK trực tiếp từ nhiều component. Thiếu config vẫn chạy local.
- Dữ liệu save có `version`; thay schema cần migration rõ ràng, giữ bản lưu người chơi.
- Không thay JavaScript bằng TypeScript hay thêm game engine nếu task không yêu cầu.
- Không hardcode secrets; mọi `VITE_*` là public. Rules phải giới hạn theo UID.
- Giữ PWA offline shell, icon maskable và cập nhật do người chơi chọn; không cache phản hồi Auth/Firestore bằng service worker.
- Không biến tính năng dự kiến thành tính năng đã hoàn thành trong tài liệu.
- Không tự deploy production từ một yêu cầu sửa code.

## Kiểm tra

Chạy `npm run lint`, `npm test`, `npm run build` khi thay logic/config. UI cần kiểm tra mobile/desktop, keyboard và thông báo lỗi. Firebase thay đổi cần kiểm tra rules bằng Emulator trước release; nếu chưa thực hiện, ghi rõ giới hạn.

## Skill riêng

- `.agents/skills/pixel-ui/SKILL.md`: sửa giao diện/pixel asset.
- `.agents/skills/cultivation-game/SKILL.md`: gameplay, cân bằng, save migration.
- `.agents/skills/firebase-sync/SKILL.md`: cloud save, Auth và rules.

Skills đặt trong repo để đi cùng source, không cài skill toàn cục.
