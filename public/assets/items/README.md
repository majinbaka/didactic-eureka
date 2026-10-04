# Vật phẩm Rừng Trúc U Tinh

`forest-collectibles-v1.png` là atlas raster 4×2 ô, mỗi ô 32×32px. Sáu linh thảo và hai linh thạch được tạo riêng cho project bằng ImageGen tích hợp, tham chiếu trực tiếp nhân vật `jade-v2` và cảnh Rừng Trúc U Tinh; không dùng tài nguyên bên ngoài.

Ảnh nguồn và prompt nằm tại `art/items/forest-collectibles-v2/`. Chạy `node scripts/build_collectible_atlas.mjs` để cắt từng vật phẩm, thu nhỏ nearest-neighbor, làm cứng alpha và đóng gói lại atlas.
