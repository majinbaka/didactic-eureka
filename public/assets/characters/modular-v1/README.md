# Asset nhân vật modular v1

- `base-body-128.png`: PNG RGBA 128×128, base body trung tính, không tóc, tư thế đứng hướng phải.
- `outfit-jade-128.png`: PNG RGBA 128×128, lớp áo xanh ngọc, đai ngà, quần và giày; không chứa tóc/body.
- `base-body-sheet-20x20.png`: atlas base body 20 cột × 20 hàng, tổng 2560×2560px.
- `outfit-jade-sheet-20x20.png`: atlas quần áo tương ứng, cùng kích thước và tọa độ ô.
- `atlas.json`: kích thước atlas và ánh xạ tên frame sang tọa độ.
- `preview-idle-right-00.png`: ảnh kiểm tra ghép base body + quần áo.
- `*-source.png`: bản gốc từ ImageGen, giữ để chỉnh sửa tiếp.

Hai lớp dùng cùng canvas, vẽ body trước rồi outfit tại cùng tọa độ. Tóc tương lai dùng một lớp riêng cùng canvas. Xuất 128px bằng nearest-neighbor; hiển thị với `image-rendering: pixelated`.

Atlas v2 có 62 frame cho idle, đi bộ, chạy, nhảy, bay, xin chào, gãi đầu, ngủ gật, ngồi, bò, bị thương và gục ngã. `atlas.json` là nguồn mapping index/fps; 338 ô còn lại trong suốt. Base body và outfit luôn dùng cùng index frame.

Chạy `python3 build_atlas.py` trong thư mục này để dựng lại hai atlas, manifest và preview sau khi chỉnh layer nguồn.

Nguồn: tạo bằng công cụ ImageGen tích hợp của Codex theo yêu cầu trong repo; không dùng asset bên thứ ba. Hai lớp được yêu cầu căn theo cùng reference; cần rà lại từng pixel khi mở rộng animation.
