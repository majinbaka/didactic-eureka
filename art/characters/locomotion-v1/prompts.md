# Spritesheet đi bộ / chạy v1

Nguồn: ImageGen tích hợp, ngày 2026-10-07. Mỗi PNG nguồn tham chiếu atlas 16 pose của chính nhân vật trong `public/assets/characters/<id>/`. Không dùng asset bên ngoài.

Mỗi sheet gồm 4 cột × 2 hàng: bốn frame đi bộ, bốn frame chạy. Các frame là nhân vật liền thân được vẽ riêng; không dùng mesh, rig, xoay chân hoặc biến dạng ảnh bằng code. Packer chỉ tách silhouette, thu nhỏ nearest-neighbor cùng một tỷ lệ cho cả sheet và căn đế chân về y=115 trong ô 128px.

## Prompt chung

Use case: identity-preserve. Asset: pixel game locomotion atlas. Reference image is the EXISTING CHARACTER whose identity, age, body size/proportions, face, hair, headgear, outfit, palette and footwear must be preserved. Create a NEW sheet with exactly 8 complete full body sprites, 4 equal columns by 2 equal rows. All face RIGHT. Genuine transparent background, no text, shadows, ground or effects. Row 1 WALK loop left-to-right: near leg forward wide contact; near leg planted under hip and far knee passing forward (narrow stride); far leg forward wide contact; far leg planted under hip and near knee passing forward (narrow stride). Row 2 RUN loop: near leg forward landing far foot kicked back; near leg under hip far knee lifted forward; far leg forward landing near foot kicked back; far leg under hip near knee lifted forward. Arms counter-swing with alternating legs. CRITICAL contact and passing frames must have visibly different foot silhouettes, complete natural stride with knees bending forward, no static spread legs in every frame. Far leg is darker. Keep same character size and consistent pelvis position per cell, full silhouette and generous transparent gutters. Match crisp low resolution pixel art from reference, no smooth illustration. Preserve short/tall/fat/thin/elder/child character traits. Render a complete clothed character in every cell.

Vô Danh (`jade-v2`) dùng cùng bố cục và chu kỳ; prompt bổ sung mô tả tóc đen búi, áo xanh ngọc, đai ngà, quần tối và giày nâu để khóa diện mạo.

## Đóng gói

`npm run assets:character-locomotion`

Output: `public/assets/characters/<id>/locomotion-v1.png` và `locomotion-v1.json`. Các atlas 16 pose vẫn dùng cho đứng, nhảy, bay và các động tác khác. `roster-all.json` phục vụ trang xem đủ 26 nhân vật.
