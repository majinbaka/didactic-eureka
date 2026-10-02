# Vô Danh — spritesheet liền thân

- `character-jade-sheet.png`: PNG RGBA 512×512, 4×4 ô 128px, 16 key pose.
- `preview-idle.png`: tư thế đứng, đủ tóc đen búi nhỏ, mắt, mũi, miệng và áo xanh ngọc/đai ngà.
- `atlas.json`: thứ tự frame, tốc độ phát và neo `(64,116)`; bản runtime ở `src/game/characterAtlas.json` được packer xuất cùng lúc.

Mỗi frame là một nhân vật mặc sẵn trang phục. Chỉ vẽ một lớp; không cần body, outfit hay mask che da. Hướng trái được lật ngang. Đây là bộ key pose ngắn, chưa phải animation nhiều frame hoàn chỉnh.

Nguồn: ImageGen tích hợp, tạo riêng cho project từ reference nội bộ ngày 2026-10-02. Source và prompt đầy đủ ở `art/characters/jade-v2/`. `npm run assets:character` đóng gói bằng Sharp: cắt pose, giữ cùng tỷ lệ, nearest-neighbor và giữ alpha. Không vẽ bổ sung bộ phận cơ thể bằng script. Bộ modular cũ được lưu ngoài public tại `art/characters/modular-v1/legacy-public/` để không được PWA tải/cache nữa; các script legacy chỉ mang tính lưu trữ.
