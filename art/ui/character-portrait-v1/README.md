# Character portrait v1

Portrait HUD được tạo bằng công cụ ImageGen tích hợp, tham chiếu trực tiếp `public/assets/characters/jade-v2/preview-idle.png`.

Prompt chính: portrait pixel head-and-shoulders của đúng nhân vật hiện tại; giữ tóc đen búi cao, trâm tóc, áo xanh ngọc viền ngà, biểu cảm điềm tĩnh; palette 12–16 màu, cạnh pixel cứng, nền trong suốt, không chữ/khung/vũ khí/phụ kiện mới.

- `character-portrait-source.png`: bản nguồn do ImageGen tạo.
- `public/assets/ui/character-portrait.png`: bản 128×128, resize nearest-neighbor và giới hạn palette để dùng trong HUD.
