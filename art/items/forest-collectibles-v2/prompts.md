# Linh vật Rừng Trúc U Tinh v2

Tạo bằng công cụ ImageGen tích hợp ngày 2026-10-05. Hai ảnh tham chiếu phong cách là `public/assets/characters/jade-v2/preview-idle.png` và `art/scenery/underworld-bamboo-v1/objects-source.png`.

## Prompt chính

Use case: stylized-concept. Asset type: production collectible sprite source sheet for a side-scrolling pixel-art cultivation RPG. Create exactly eight distinct collectible item sprites in a strict 4 columns by 2 rows contact sheet, ordered left-to-right then top-to-bottom: Thanh Trúc Diệp, Ngưng Sương Thảo, Xích Dương Hoa, U Minh Cô, Bạch Ngọc Sâm, Tử Vân Chi, Thanh Linh Thạch, Tử Tinh Thạch. Use a genuinely transparent background. Match the supplied character and bamboo-forest references with crisp Japanese-inspired xianxia pixel art, hard pixel clusters, dark forest-green/brown outlines, a limited forest/ngà/đồng palette and restrained magical glow. Center one complete, readable object in each equal square cell with transparent padding and consistent scale beside the 128px character after reduction to a 32×32 cell. No text, labels, UI, frames, borders, character, scenery, pots, baskets, ground shadows, watermark or extra objects.

## Đóng gói

`collectibles-source.png` giữ ảnh gốc có alpha. `scripts/build_collectible_atlas.mjs` chia ảnh theo lưới 4×2, trim từng vật phẩm, resize nearest-neighbor vào vùng 28×28, ép alpha cạnh cứng và xuất atlas 128×64 tại `public/assets/items/forest-collectibles-v1.png`.
