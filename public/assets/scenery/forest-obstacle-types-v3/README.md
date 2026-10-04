# Loại vật cản Rừng Trúc v3

Asset nội bộ tạo bằng ImageGen tích hợp ngày 2026-10-05, không dùng asset bên ngoài.

- `types-atlas.webp`: atlas lossless 960×640 gồm bó trúc đổ, gốc cổ thụ, bậc đá vỡ, bệ đèn đá, xà cổng đổ và chòi trúc.
- Năm loại có mặt đứng được được sinh dọc đường với kích thước collider riêng; bậc đá vỡ được giữ trong atlas cho thiết kế collider bậc thang sau này.
- Metadata crop ghi cả vị trí mặt đứng bên trong sprite để renderer căn collider vào mặt sử dụng thay vì đỉnh alpha của lá/rêu trang trí.
- Ảnh nguồn và prompt nằm tại `art/scenery/forest-obstacle-types-v3/`.
