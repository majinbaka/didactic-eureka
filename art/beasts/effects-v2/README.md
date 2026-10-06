# Chiêu tầm xa cho 20 yêu thú mở rộng

Ảnh nguồn ImageGen trong suốt, không chứa thân yêu thú. Ba agent phụ trách `forest/` (7 con), `mystic/` (7 con) và `ancient/` (6 con); mỗi nhóm lưu `roster.json` và `prompts.md` ghi prompt chính xác cùng nguồn ảnh.

Mỗi sheet nguồn gồm 4 cột × 5 hàng, theo thứ tự: vệt đánh gần, tụ lực, chiêu di chuyển, va chạm, dư chấn. Mỗi pha có bốn frame riêng. Chiêu tầm xa khớp tên/thiết kế trong danh mục thân quái v2; `beastId` liên kết hai bộ.

Chạy `npm run assets:beast-roster` rồi `npm run assets:beast-effects` để đóng gói cả 50 yêu thú. Runtime dùng chung `public/assets/beasts/effects-v1/` để giữ đường dẫn hiện có; mỗi con mới có sheet 512×640, năm dải PNG 512×128 và manifest riêng. Hai danh mục công khai/module được sinh cùng lệnh.

Xem `/beast-effects.html` để thử chiêu bay theo hai hướng, đổi năm pha và xem PNG riêng. [Chuẩn neo, chuyển động và ví dụ renderer](../effects-v1/README.md) áp dụng cho cả bộ mở rộng. Tốc độ, tầm chiêu và tọa độ phát là dữ liệu thiết kế; chưa có AI, hitbox, sát thương hoặc điểm xuất hiện trong màn chơi.
