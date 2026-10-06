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

## Vật phẩm tu tiên mở rộng v1

Thêm 1.000 mục bách khoa, chia đều bốn nhóm: vũ khí tấn công (`weapons`), trang bị phòng thủ (`defense`), trận pháp (`formations`) và pháp bảo (`treasures`). Ba agent tạo ba nhóm đầu; nhóm tích hợp tạo pháp bảo. Mỗi nhóm có 250 tên tiếng Việt, mô tả, độ hiếm và ảnh riêng. Các mục mới chưa có điểm rơi, trang bị hay hiệu ứng sử dụng.

Mỗi nhóm dùng năm atlas `equipment-v1/<nhóm>/batch-1.png` tới `batch-5.png`, lưới 10×5, 640×320px, ô 64px nền alpha. Ảnh được tạo bằng ImageGen tích hợp, đóng gói nearest-neighbor bằng Sharp; không dùng asset bên ngoài. Nguồn và prompt lưu tại `art/items/equipment-v1/<nhóm>/`; dữ liệu tại `src/game/collection-*.js`. Các script `scripts/build_collection_*.mjs` đóng gói lại từ nguồn có sẵn. Kiểm thử danh mục kiểm tra đủ số lượng, tên/ID duy nhất, khớp ô ảnh, alpha và không có ảnh rỗng/trùng.
