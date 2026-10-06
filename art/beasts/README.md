# Bách thú Loạn Giới v1

30 yêu thú pixel nội bộ tạo bằng công cụ ImageGen tích hợp, chia ba agent phụ trách nhóm rừng, linh thú và cổ thú. Không lấy asset từ thư viện bên ngoài. Ảnh nguồn cùng prompt chính xác lưu ở `forest-v1/`, `mystic-v1/`, `ancient-v1/`.

Mỗi nguồn có 20 pose vẽ riêng, bốn cột × năm hàng. Đóng gói bằng `npm run assets:beast-roster`: tìm gutter qua alpha, crop và scale nearest-neighbor với một tỷ lệ chung cho từng yêu thú, giữ alpha. Không tạo frame bằng lật hoặc xoay ảnh. Atlas runtime 512×640, ô 128×128, neo mặt đất (64,116); pose nhảy trên không nâng thêm 12px.

| Frame | Động tác |
| --- | --- |
| 0–1 | Đứng / thở |
| 2–5 | Chu kỳ di chuyển bốn pose |
| 6–8 | Lấy đà / trên không / đáp |
| 9–12 | Đánh thường: báo đòn / đánh / theo đà / hồi |
| 13–16 | Chiêu: tụ lực / phóng / lan / hồi |
| 17 | Bị thương |
| 18–19 | Gục / nằm |

Hai động tác đầu lặp. Các động tác còn lại dừng ở frame cuối; nút Xem lại phát lại từ đầu. Reduced motion mặc định dừng. Nét và thời lượng là thư viện hoạt ảnh ngắn, chưa phải animation chiến đấu hoàn chỉnh có nội suy hay hitbox khớp từng frame.

Mỗi yêu thú có đòn thường và chiêu riêng (tên, pattern, tín hiệu báo đòn, tầm px, hồi chiêu ms). Các trị số là thiết kế để tích hợp sau, chưa áp sát thương, AI, điểm rơi hay phần thưởng vào chương nhập môn; không thay save.

- Runtime: `public/assets/beasts/<id>/{sheet.png,preview.png,atlas.json}`.
- Danh mục công khai: `public/assets/beasts/roster-v1.json`.
- Danh mục React: `src/game/beastRoster.json` (được sinh cùng lệnh).
- Ảnh tổng hợp: `roster-v1-preview.png`.
- Trang xem: `/beasts.html`; trong game: Hồ sơ → Bộ sưu tập → Danh mục → Yêu thú.

`sourceCuts` trong manifest ghi crop của từng pose để kiểm tra lại. Khi thay nguồn, chạy lại bộ đóng gói và `npm run lint`, `npm test`, `npm run build`.

## FX tách khỏi thân quái

Bộ bổ sung [effects-v1](effects-v1/README.md) cung cấp riêng vệt đánh gần, tụ lực, chiêu di chuyển, va chạm và hiệu ứng lưu lại cho 30 yêu thú. Xem `/beast-effects.html`; chạy `npm run assets:beast-effects` để tái đóng gói. Thân quái và các pose v1 vẫn giữ nguyên; việc ghép gameplay thực hiện sau.
