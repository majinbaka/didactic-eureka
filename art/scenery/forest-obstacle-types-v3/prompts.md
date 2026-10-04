# Prompt loại vật cản Rừng Trúc v3

Tạo bằng ImageGen tích hợp ngày 2026-10-05. Tham chiếu `art/scenery/forest-object-variants-v2/variants-source.png` và `art/scenery/underworld-bamboo-v1/objects-source.png`.

## Prompt tạo atlas

Use case: stylized-concept. Asset type: production-ready 2D side-scrolling pixel game obstacle atlas for Tu Tiên Loạn Giới. Create six genuinely different walkable obstacle types, not visual variants of rectangular mossy rocks, in a 3×2 atlas: a very wide low fallen bamboo bundle, a compact ancient tree stump, broken ascending stone stairs, a narrow stone-lantern plinth, a wide collapsed torii crossbeam and a tall bamboo watch post. Preserve strongly different width/height ratios. Every gameplay surface must be readable and nearly horizontal. Crisp hand-painted pixel art, hard pixel clusters, side-on orthographic sprites; dark forest outlines, jade bamboo, weathered wood, gray-green stone, olive moss, warm ivory and old-gold rope. Soft dawn light. Six isolated complete sprites on genuine transparent alpha; no generic rectangular rock platforms, duplicated silhouettes, scenery, ground plane, characters, UI, text, grid or watermark.

Một lượt chỉnh nền được dùng với use case `background-extraction`: chỉ thay nền olive bằng alpha trong suốt, giữ nguyên sáu vật thể. `types-source.png` là ảnh sau lượt tách nền. Runtime pack lossless nằm tại `public/assets/scenery/forest-obstacle-types-v3/types-atlas.webp`.
