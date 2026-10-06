# Võ khố công kích — 250 vật phẩm

- `source-1.png` đến `source-5.png`: năm atlas được tạo bằng built-in ImageGen, yêu cầu nền alpha trong suốt và 50 thiết kế khác nhau mỗi ảnh. Không dùng tài sản bên ngoài hay tạo biến thể bằng đổi màu.
- `prompt-1.txt` đến `prompt-5.txt`: prompt nguồn theo thứ tự hàng, trái sang phải.
- `designs.json`: tên tiếng Việt tương ứng từng sprite.
- `src/game/collection-weapons.js`: danh mục chính, 250 ID và tên riêng, độ hiếm, mô tả, ảnh và chỉ số sprite.
- Atlas runtime: `public/assets/items/equipment-v1/weapons/batch-{1..5}.png`, 640×320, lưới 10×5, ô 64px; hình giữ tỷ lệ trong vùng 56×56px.

Đóng gói lại bằng `node scripts/build_collection_weapons.mjs`; có thể chọn từng batch, ví dụ `node scripts/build_collection_weapons.mjs 1 2`. Sharp giữ alpha, tìm khoảng trống giữa các vật thể theo từng hàng, trim vùng trong suốt và scale nearest-neighbor. Source ImageGen không có tọa độ lưới hoàn toàn đều, nên runtime dùng atlas đã đóng gói.

Các nhóm lần lượt: kiếm/đao; thương/kích; cung/nỏ/ám khí; phủ/chùy/trượng; roi/xích/binh khí đặc dị. Công dụng trong mô tả là định hướng tương lai; danh mục không tự thêm cơ chế chiến đấu, trang bị hoặc điểm rơi.

Kiểm tra: 250 tên và ID duy nhất, năm atlas đúng kích thước/alpha; đã xem trực tiếp năm ảnh nguồn và năm atlas runtime để kiểm tra thứ tự và silhouette.
