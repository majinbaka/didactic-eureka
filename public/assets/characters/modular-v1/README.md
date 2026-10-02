# Asset nhân vật modular v1

- `base-body-128.png`: PNG RGBA 128×128, base body trung tính, không tóc, tư thế đứng hướng phải.
- `outfit-jade-128.png`: PNG RGBA 128×128, lớp áo xanh ngọc, đai ngà, quần và giày; không chứa tóc/body.
- `base-body-sheet-20x20.png`: atlas base body 20 cột × 20 hàng, tổng 2560×2560px.
- `outfit-jade-sheet-20x20.png`: atlas quần áo tương ứng, cùng kích thước và tọa độ ô.
- `atlas.json`: kích thước atlas và ánh xạ tên frame sang tọa độ.
- `preview-idle-right-00.png`: ảnh kiểm tra ghép base body + quần áo.
- `*-source.png`: bản gốc từ ImageGen, giữ để chỉnh sửa tiếp.

Hai lớp dùng cùng canvas, vẽ body trước rồi outfit tại cùng tọa độ. Tóc tương lai dùng một lớp riêng cùng canvas. Xuất 128px bằng nearest-neighbor; hiển thị với `image-rendering: pixelated`.

Atlas v3 khôi phục tạo hình gốc, thay bộ hình khối 32px của v2. Ô 0 giữ nguyên từng pixel của `base-body-128.png` và `outfit-jade-128.png` đã chọn ban đầu. Các pose còn lại được ImageGen tạo từ hai ảnh gốc; script chỉ cắt, xuất 128px và đóng gói, không vẽ lại nhân vật bằng hình khối.

Có 16 key pose cho các trạng thái idle, đi bộ, chạy, nhảy, bay, xin chào, gãi đầu, ngủ gật, ngồi, bò, bị thương và gục ngã; 384 ô còn lại trong suốt. Đây là bộ key pose ngắn, chưa phải các chu kỳ animation nhiều frame đầy đủ. `atlas.json` là nguồn mapping duy nhất cho frame/fps; runtime đọc trực tiếp manifest. Base body và outfit luôn dùng cùng index frame, điểm neo `(64,116)`.

`outfitExposedSkin` trong manifest xác định vùng đầu/bàn tay còn lộ ra khi mặc bộ áo này ở các tư thế thấp. Renderer clip lớp body theo các vùng này trước khi vẽ outfit để phần thân/chân bị che không lộ ngoài viền trang phục. Nếu hiển thị base body riêng, vẽ nguyên frame, không dùng mask trang phục. Outfit mới cần metadata che phủ riêng.

Chạy `python3 scripts/build_character_atlas.py` từ root repo (cần Pillow). Script cũ trong thư mục này chỉ chuyển đến packer mới. Source board và prompt sửa nằm tại `art/characters/modular-v1/`; giữ ngoài public để không đưa chúng vào bộ cache PWA. Preview ghép lớp dùng cùng quy tắc che phủ như trong game.

Nguồn: tạo bằng công cụ ImageGen tích hợp của Codex theo yêu cầu trong repo; không dùng asset bên thứ ba. Hai lớp được yêu cầu căn theo cùng reference; cần rà lại từng pixel khi mở rộng animation.
