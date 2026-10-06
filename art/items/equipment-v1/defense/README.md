# Bộ hộ cụ tu tiên v1

250 thiết kế: 50 giáp, 50 pháp y, 50 thuẫn, 50 mũ và 50 hộ uyển/ngoa. Đây là danh mục minh họa; chưa có hiệu ứng trang bị hoặc điểm rơi.

Ảnh nguồn được tạo mới bằng công cụ ImageGen tích hợp; không dùng asset ngoài hoặc biến thể đổi màu bằng code. Mỗi `batch-N.prompt.txt` lưu nguyên prompt tương ứng `batch-N.source.png`. `designs.json` ghi tên, mô tả, thứ tự atlas và ID.

Đóng gói bằng `node scripts/build_collection_defense.mjs` từ root repo. Atlas đầu ra `public/assets/items/equipment-v1/defense/batch-N.png` có 10×5 ô, mỗi ô 64px; silhouette trim alpha, fit 56px và đặt giữa ô, dùng nearest-neighbor.

Nguồn pháp y có 11 vật phẩm mỗi hàng. Bộ đóng gói bỏ một hình dư ở mỗi hàng: cột 9, 9, 9, 10, 10 (đếm từ 1). Nguồn thuẫn có 11 vật phẩm ở hàng đầu; bỏ cột 10 là thuẫn lôi giác dư. Script tìm rãnh alpha gần biên danh nghĩa để giữ trọn silhouette. Các atlas còn lại dùng 10 cột × 5 hàng. Đã kiểm tra trực quan nguồn và đầu ra; 250 ô đều có alpha và dữ liệu pixel khác nhau.
