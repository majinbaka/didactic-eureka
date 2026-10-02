# Thiết kế giao diện ứng dụng

## Định hướng

Tu Tiên Loạn Giới là hành trình tu tiên chậm rãi trong một thế giới pixel lấy cảm hứng Nhật Bản. Nội dung tiếng Việt có dấu. Giao diện mang cảm giác đạo trường yên tĩnh: xanh rừng, giấy ngà, đồng cũ, ánh bình minh. Bối cảnh tu tiên là hư cấu pha trộn; chữ Nhật/Hán chỉ trang trí, không thay nhãn thao tác tiếng Việt.

## Hệ thống thị giác

| Vai trò | Màu |
| --- | --- |
| Nền | `#101d1c` |
| Panel | `#192b26` |
| Viền | `#36493c` |
| Chữ chính | `#e7e9db` |
| Chữ phụ | `#93a697` |
| Điểm nhấn vàng | `#dfbc7c` |
| Hành động chính | `#b7c493` |

Tiêu đề dùng serif có hỗ trợ tiếng Việt; nội dung dùng system sans. Chưa phụ thuộc font CDN. Chỉ dùng font pixel cho nhãn ngắn khi font có đầy đủ dấu; không đánh đổi khả năng đọc. Panel bo 4px, đường viền mảnh, khoảng cách 8/16/24/32px. Asset pixel phóng theo bội số nguyên, `image-rendering: pixelated`; UI không cần pixel hóa văn bản.

## Bố cục

Ưu tiên mobile: một viewport game dọc chứa cảnh pixel, HUD hồ sơ/tài nguyên phía trên và bảng thao tác cùng navigation phía dưới. Điện thoại dùng toàn chiều rộng và `100svh`, tính safe-area; màn hình thấp được phép cuộn để giữ vùng chạm và nội dung. Desktop/tablet căn giữa khung dọc tối đa 480px, không tách nút khỏi game. Hồ sơ, bản đồ và cài đặt mở bằng dialog trong game, hỗ trợ Escape, focus và đóng để trở về cảnh. Không thêm cơ chế di chuyển giả.

HUD và bảng thao tác có nền xanh rừng đậm để đọc rõ; nút cạnh vuông, viền ngà/đồng và bóng cứng theo phong cách pixel. Cảnh CSS kéo dài phía sau HUD; địa điểm chưa mở vẫn là thông tin. Ba hành động nằm cùng hàng trong tầm ngón tay, menu bốn mục sát đáy. Cài PWA và cloud save nằm trong cài đặt.

## Thành phần và trạng thái

- Hồ sơ: tên, cảnh giới, tài nguyên, trạng thái lưu và điều khiển cloud.
- Đạo trường: cảnh pixel decor, mô tả accessible; không có tương tác di chuyển ở prototype.
- Tu luyện: primary; lịch luyện: secondary; đột phá: disabled khi thiếu linh khí hoặc đạt giới hạn demo.
- Địa điểm chưa mở: thẻ thông tin, không giả làm nút.
- Cloud chưa cấu hình/offline/đang tải: nút disabled kèm diễn giải.
- Lỗi lưu/mạng: thông báo tiếng Việt trong vùng `aria-live`; không làm mất bản local.
- PWA: hướng dẫn cài nếu trình duyệt chưa đưa install prompt; cập nhật bằng hành động người chơi.

## Khả năng tiếp cận

Giữ focus ring, sử dụng button thật, progress có nhãn, không chỉ dùng màu để báo trạng thái. Tôn trọng reduced motion. Kiểm tra độ tương phản khi đổi palette; không đặt chữ nhỏ quan trọng lên scenery. Không thêm âm thanh tự chạy. Bản nâng cấp cần tùy chọn tắt âm/giảm hiệu ứng.

## Tiêu chí nghiệm thu

Không tràn ngang tại 360px, 768px, 1440px; nhãn không bị cắt tiếng Việt; mọi thao tác dùng bàn phím được; loading không cho gửi nhiều yêu cầu; thiết kế offline phản ánh trạng thái thật. Tài liệu mô tả mục tiêu; code hiện tại là nguyên mẫu có thể tiếp tục tinh chỉnh.
