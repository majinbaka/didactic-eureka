# Prompt biến thể vật thể Rừng Trúc v2

Tạo bằng công cụ ImageGen tích hợp ngày 2026-10-05. Ảnh tham chiếu: `art/scenery/forest-obstacles-v1/obstacles-source.png` và `art/scenery/underworld-bamboo-v1/objects-source.png`.

## Atlas vật thể

Use case: stylized-concept. Asset type: production-ready 2D side-scrolling pixel game object atlas for Tu Tiên Loạn Giới. Image 1 is the style and silhouette reference for walkable mossy stone obstacles; Image 2 is the style reference for decorative bamboo-forest objects. Create one clean 4 columns × 2 rows atlas with eight separate object variants on a genuinely transparent background. Top row: four walkable moss-covered stone platforms with perfectly horizontal readable tops, near-vertical solid sides and continuous mass to a flat baseline. Bottom row: four non-collidable ground decorations—pebbles, fern tuft, bamboo shoots and a broken mossy stone lantern—which must not resemble platforms. Crisp hand-painted pixel art, hard pixel clusters, no blur or antialiasing; dark forest outlines, jade/olive moss, gray-green stone, warm ivory highlights and subtle old-gold accents. Soft dawn light from upper right. Isolated sprites with transparent gutters; no ground plane, characters, UI, text, grid, symbols or watermark.

Ảnh sinh nguyên bản được lưu ở `variants-source.png`. Bản runtime được cắt alpha, thu nhỏ nearest-neighbor và đóng gói lossless tại `public/assets/scenery/forest-object-variants-v2/variants-atlas.webp`.
