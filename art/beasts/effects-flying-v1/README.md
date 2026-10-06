# FX độc lập cho 20 yêu thú biết bay

Nguồn ImageGen trong suốt và prompt chính xác nằm trong `small/` (7), `medium/` (7), `large/` (6), mỗi nhóm do một agent phụ trách. `beastId` nối với ba nhóm thân `flying-*-v1/`.

Mỗi nguồn có 4 cột × 5 hàng: vệt đòn thường, tụ lực, chiêu di chuyển, va chạm và dư chấn; mỗi pha bốn frame vẽ riêng. Không chứa thân yêu thú. Đòn thường và chiêu khớp mô tả của danh mục thân.

Chạy `npm run assets:beast-roster` trước, rồi `npm run assets:beast-effects`. Runtime dùng chung `public/assets/beasts/effects-v1/`, mỗi con có atlas 512×640 và năm dải PNG 512×128 cùng manifest. `/beast-effects.html` xem các chiêu độc lập theo hai hướng.

`origin` và `attackOffset` là điểm ghép trong ô thân 128px **sau khi đóng gói theo kích thước riêng**. Nhóm bay nhỏ cần điểm phát gần thân nhỏ, không dùng điểm mỏ/vuốt của nhóm lớn. Khi quay trái dùng `128 - x`. Melee bám attackOffset, charge bám origin; travel được phát thành entity độc lập, impact/field đặt ở đích. Các tọa độ là gợi ý thủ công, cần kiểm tra lại khi tích hợp renderer chiến đấu.

Neo strip travel của beam là (8,64), các chiêu bay khác là (64,64); neo trong manifest quyết định cách đặt PNG độc lập. Chuẩn đóng gói và ví dụ renderer ở [effects-v1](../effects-v1/README.md). Đây là thư viện asset, chưa có AI, hitbox, sát thương, điểm xuất hiện hoặc phần thưởng trong màn chơi; không thay save.
