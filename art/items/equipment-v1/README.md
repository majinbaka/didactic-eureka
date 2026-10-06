# Bộ sưu tập 1.000 vật phẩm tu tiên

Bốn nhóm, mỗi nhóm 250 món: weapons (vũ khí tấn công), defense (trang bị phòng thủ), formations (trận pháp), treasures (pháp bảo). Nguồn ImageGen tích hợp và prompt chính xác lưu trong từng thư mục nhóm; không dùng tài nguyên bên ngoài. Dữ liệu mô tả và độ hiếm ở `src/game/collection-*.js`. Đây là nội dung bách khoa, chưa có hiệu ứng trang bị hoặc điểm rơi.

`preview.png` hiển thị toàn bộ 1.000 ảnh: mỗi hàng một nhóm, từ trái sang phải là batch 1–5. Trong mỗi batch đọc 10 cột × 5 hàng, khớp sprite index 0–49. Atlas runtime trong `public/assets/items/equipment-v1/` có ô 64×64px, alpha trong suốt; mỗi ảnh 640×320px. Script đóng gói giữ nguồn và dùng nearest-neighbor, với crop theo gutter/các ô nguồn; xem README/manifest nhóm để biết các hiệu chỉnh bố cục do ImageGen.

Đóng gói lại: `node scripts/build_collection_weapons.mjs`, `node scripts/build_collection_defense.mjs`, `node scripts/build_collection_formations.mjs`, `node scripts/build_collection_treasures.mjs`. Tạo ảnh tổng hợp: `node scripts/build_equipment_preview.mjs`.

Kiểm tra: `npm run lint`, `npm test`, `npm run build`. Bộ test xác nhận 250 món/nhóm, tên/ID duy nhất, slot ảnh riêng, kích thước/alpha, 1.000 ảnh không rỗng hoặc trùng pixel và không có thưởng/điểm rơi cho các nhóm mới. Các nguồn/atlas đã được xem trực quan. Chưa kiểm tra tương tác mobile/desktop/keyboard trong trình duyệt vì không có browser khả dụng trong phiên này. Build thành công, có cảnh báo chunk JavaScript vượt 500kB.
