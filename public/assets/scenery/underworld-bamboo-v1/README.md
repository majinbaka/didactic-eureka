# Rừng Trúc U Minh v1

Asset nội bộ tạo bằng công cụ ImageGen tích hợp ngày 2026-10-02, dùng atlas nhân vật `jade-v2` làm tham chiếu phong cách. Không dùng asset bên ngoài.

- `bamboo-forest-background.webp`: nền rừng trúc 1536×1024, dùng làm lớp parallax xa; WebP được tối ưu để nằm trong precache PWA.
- `forest-objects-atlas.webp`: atlas trong suốt 4×2; thứ tự trái sang phải, trên xuống dưới: trúc lớn, trúc mảnh, măng, cỏ, đá lớn, sỏi, bia nguyên, bia nứt.
- Renderer dùng tọa độ crop riêng cho từng vật thể vì bố cục nguồn 1254×1254 không phải lưới đều; đá và hình nộm vì vậy không lấy vùng trống hoặc pixel của hàng phía trên.

Ảnh nguồn và prompt được lưu ở `art/scenery/underworld-bamboo-v1/`.
