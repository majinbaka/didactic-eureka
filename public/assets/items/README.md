# Vật phẩm Rừng Trúc U Tinh

`forest-collectibles-v1.png` là atlas raster 4×2 ô, mỗi ô 32×32px. Sáu linh thảo và hai linh thạch được tạo riêng cho project bằng ImageGen tích hợp, tham chiếu trực tiếp nhân vật `jade-v2` và cảnh Rừng Trúc U Tinh; không dùng tài nguyên bên ngoài.

Ảnh nguồn và prompt nằm tại `art/items/forest-collectibles-v2/`. Chạy `node scripts/build_collectible_atlas.mjs` để cắt từng vật phẩm, thu nhỏ nearest-neighbor, làm cứng alpha và đóng gói lại atlas.

## Linh thảo mở rộng v1

Ba agent tạo thêm 94 linh thảo bằng ImageGen tích hợp, nâng danh mục lên 100 linh thảo và giữ hai linh thạch cũ. Mỗi linh thảo có tên, mô tả, độ hiếm và một ô ảnh riêng; các loại mới hiện là nội dung bách khoa, chưa có điểm rơi.

| Atlas trong `herbs-v1/` | Số linh thảo | Lưới | Kích thước |
| --- | --- | --- | --- |
| `group-a.png` | 32 | 8×4 | 512×256px |
| `group-b.png` | 32 | 8×4 | 512×256px |
| `group-c.png` | 30 | 6×5 | 384×320px |

Các ô 64×64px có alpha trong suốt, đóng gói bằng Sharp và nearest-neighbor. Ảnh nguồn, prompt cuối và provenance được lưu theo nhóm trong `art/items/herbs-expansion-v1/`. Tái tạo atlas với `node scripts/build_herbs_a.mjs`, `node scripts/build_herbs_b.mjs`, `node scripts/build_herbs_c.mjs`. Metadata `image`, `sprite`, `columns`, `rows` trong `src/game/herbs-*.js` khớp thứ tự từng atlas.
