# Bách thú Loạn Giới v1

70 yêu thú pixel nội bộ tạo bằng công cụ ImageGen tích hợp, gồm nhóm rừng, linh thú, cổ thú và bộ bay mới. Không lấy asset từ thư viện bên ngoài. Ảnh nguồn cùng prompt chính xác lưu ở `forest-v1/`, `mystic-v1/`, `ancient-v1/` và ba nhóm mở rộng `forest-v2/` (7), `mystic-v2/` (7), `ancient-v2/` (6), cùng ba nhóm `flying-*-v1/` (20).

Mỗi nguồn có 20 pose vẽ riêng, bốn cột × năm hàng. Đóng gói bằng `npm run assets:beast-roster`: tìm gutter qua alpha, crop và scale nearest-neighbor với một tỷ lệ chung cho từng yêu thú, giữ alpha. Không tạo frame bằng lật hoặc xoay ảnh. Atlas runtime 512×640, ô 128×128, neo mặt đất (64,116); pose nhảy trên không nâng thêm 12px. Bộ bay v1 có thêm kích thước và neo lơ lửng riêng như mô tả bên dưới.

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

Bộ bổ sung [effects-v1](effects-v1/README.md) cung cấp riêng vệt đánh gần, tụ lực, chiêu di chuyển, va chạm và hiệu ứng lưu lại cho 70 yêu thú. Xem `/beast-effects.html`; chạy `npm run assets:beast-effects` để tái đóng gói. Thân quái và các pose v1 vẫn giữ nguyên; việc ghép gameplay thực hiện sau.

## Bộ mở rộng 20 yêu thú

Ba agent tạo 20 silhouette mới từ động vật và linh thú khác bộ đầu. Mỗi con có ảnh nguồn trong suốt, 20 pose và đòn thường/chiêu riêng; prompt và nguồn lưu trong thư mục nhóm v2. Bộ v2 nâng danh mục từ 30 lên 50 con; bộ bay v1 bổ sung tiếp 20 con. Bộ mở rộng có thêm atlas FX tách lớp cho đòn thường và chiêu tầm xa như bộ đầu; nguồn/prompt trong `effects-v2/`, runtime đóng gói chung tại `public/assets/beasts/effects-v1/`.

## Bộ 20 yêu thú biết bay

Ba agent tạo bộ bay mới: `flying-small-v1/` (7), `flying-medium-v1/` (7), `flying-large-v1/` (6). Mỗi con có nguồn ImageGen trong suốt, prompt chính xác, 20 pose riêng và hai đòn riêng. Bộ FX tách lớp tương ứng nằm ở `effects-flying-v1/`, đóng gói chung với bộ cũ.

Metadata `locomotion: "flying"`, `size` (tiny/small/medium/large/huge), `spriteExtentPx` (40–100) và `flightHeightPx: 12` giữ kích thước khác nhau sau đóng gói. Tỷ lệ đóng gói bằng `spriteExtentPx / 100` nhân giới hạn 120×100px; giữ cùng tỷ lệ cho cả 20 pose. Frame 0–17 neo đáy tại y=104 để lơ lửng; hai frame gục đáp về y=116. `walk` là chu kỳ bay, `jump` là vọt cao/hạ cánh. Không tạo frame bằng lật hay xoay.

Bộ sưu tập và `/beasts.html` có bộ lọc Biết bay và nhãn kích thước. Đây vẫn là thư viện asset và thiết kế chiêu; chưa có AI bay, điểm xuất hiện, hitbox hoặc sát thương trong màn chơi. Không đổi save.
