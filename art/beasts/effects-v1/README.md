# Hiệu ứng yêu thú độc lập v1

Bổ sung ảnh mechanic cho 30 yêu thú. Mỗi bộ là VFX thuần, nền alpha thật, không có thân quái; hiệu ứng đánh gần và chiêu xa không bị khóa vào pose thi triển. Nguồn ImageGen tích hợp, prompt chính xác và provenance ở `forest/`, `mystic/`, `ancient/`. Các atlas thân quái v1 vẫn là bộ pose cũ có hiệu ứng gắn trong ảnh; khi ghép mới, dùng layer FX độc lập và tránh vẽ hai lần cùng hiệu ứng.

## Bộ PNG

`public/assets/beasts/effects-v1/<beastId>/` chứa:

| PNG | Frame | Công dụng |
| --- | --- | --- |
| `melee.png` | 0–3 trong sheet | Vệt đòn thường gần thân / điểm tiếp xúc |
| `charge.png` | 4–7 | Tụ lực tại điểm phát chiêu |
| `travel.png` | 8–11 | Đạn / đoạn tia / sóng đất / vật thể xoay hoặc rơi, vẽ độc lập |
| `impact.png` | 12–15 | Va chạm ở vị trí đích |
| `field.png` | 16–19 | Dấu vết, vùng ảnh hưởng hoặc dư âm sau chiêu |
| `sheet.png` | 0–19 | Toàn bộ clip, 4 cột × 5 hàng |

Mỗi dải PNG 512×128 gồm bốn ô 128×128; sheet 512×640. `atlas.json` có image, crop nguồn, frames, stripFrames, fps, loop và anchor từng clip. Chiêu di chuyển và hiệu ứng lưu lại lặp, ba clip còn lại dừng tại frame cuối; caller tự quyết định thời điểm xóa hiệu ứng. Không dùng frame đứng của quái làm đạn bay.

Đóng gói bằng `npm run assets:beast-effects`. Script tìm gutter theo alpha, giữ hạt rời trong từng ô và resize nearest-neighbor. Bốn frame trong mỗi clip dùng cùng tỷ lệ, nên vụ nổ có thể lớn dần. Các clip độc lập có thể có tỷ lệ khác nhau. Điểm neo giữa `(64,64)`; `travel` và `field` loại `ground`, cùng `field` loại `falling`, neo mặt đất `(64,112)`. Đoạn tia `travel` loại `beam` neo đầu trái `(8,64)` để nối từ origin về phía mục tiêu.

## Metadata để ghép sau

Danh mục chung: `public/assets/beasts/effects-v1/roster.json`; bản cho module: `src/game/beastEffectRoster.json`. Dùng `beastId` nối với bộ yêu thú hiện có. `src/game/beastEffects.js` cung cấp lookup và chọn frame; module này chưa được gọi trong màn chạy.

- `skillMotion`: `linear` (di chuyển theo hướng), `ground` (sát mặt đất), `beam` (tia/luồng có thể nối hoặc kéo dài), `orbit` (quay quanh một tâm), `falling` (rơi từ trên).
- `travelSpeed`: gợi ý px/s; bằng 0 cho tia/vòng quay không tịnh tiến. Không phải chỉ số cân bằng đã áp dụng.
- `origin`: điểm phát chiêu trong ô thân quái 128px, tọa độ từ góc trên trái khi quái hướng phải.
- `attackOffset`: điểm đặt tâm vệt đòn thường trong ô thân quái 128px, đo từ góc trên trái như origin (tên trường giữ chữ Offset). Không phải độ lệch từ neo chân.
- `notes`: hướng dẫn ghép riêng theo từng chiêu. Mọi offset là gợi ý; cần chỉnh theo tỷ lệ quái và renderer thực tế.
- `facing`: ảnh mặc định hướng phải. Khi quay trái, flip quanh điểm neo; origin x trong ô thân thành `128 - origin.x`, attackOffset x trong ô thân thành `128 - attackOffset.x`. Nếu renderer dùng tọa độ neo chân, trừ `(64,116)` khỏi điểm này rồi mới cộng vào vị trí quái.

Metadata mô tả cách vẽ. Chưa định nghĩa hitbox, sát thương, homing, số đạn, collision, thời gian sống hoặc spawn AI. Chiêu gốc như Ảnh Miêu vẫn cần phần nhân bản quái do gameplay tạo; bộ FX chỉ có ảnh u ảnh độc lập.

## Ví dụ vẽ một đạn bay bằng sheet

```js
import { getBeastEffect, beastEffectFrame } from './src/game/beastEffects.js'

const effect = getBeastEffect('hoa-thiem')
const image = new Image()
image.src = effect.image
await image.decode()
// Caller quản lý x/y, va chạm, hướng và lifetime của từng entity hiệu ứng.
const frame = beastEffectFrame(effect, 'travel', elapsedSeconds)
const anchor = effect.animations.travel.anchor
context.save()
context.translate(projectileX, projectileY)
context.scale(facing, 1) // 1 hoặc -1
context.imageSmoothingEnabled = false
context.drawImage(image,
  frame % 4 * 128, Math.floor(frame / 4) * 128, 128, 128,
  -anchor.x, -anchor.y, 128, 128)
context.restore()
```

Nếu dùng `travel.png`, lấy `frame % 4 * 128` cho source x và `0` cho source y. `beastEffectFrame` trả `null` khi không có clip. Khi có va chạm, tạo một entity khác dùng `impact` ở tọa độ va chạm, thay vì giữ hiệu ứng gắn vào quái.

## Xem và kiểm tra

`/beast-effects.html` phát từng pha, đảo hướng, tìm không dấu, tạm dừng/phát lại và minh họa chuyển động độc lập của năm nhóm mechanic. Reduced motion mặc định dừng. Di chuyển/tốc độ/quỹ đạo trên trang là minh họa, không phải logic game đã tích hợp. Mỗi card có link PNG riêng và manifest; ảnh tổng hợp là `preview.png`.

Chạy `npm run lint`, `npm test`, `npm run build` sau khi đóng gói. Test kiểm tra đủ 30 bộ / 600 frame, alpha, frame khác nhau, dải PNG khớp sheet và metadata khớp hai bản danh mục.
