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

Ưu tiên mobile ngang: sân chơi chiếm toàn bộ viewport, tính safe-area và không có khối giao diện bên ngoài. HUD, joystick, cụm động tác phân trang và chơi lại đều phủ trong cảnh. PWA khai báo `fullscreen` và `landscape`; trình duyệt chặn khóa hướng tự động sẽ hiện lớp bắt buộc một lần chạm để xin fullscreen/khóa ngang, đồng thời vẫn yêu cầu người chơi xoay máy nếu API không được hỗ trợ. Desktop dùng cùng bố cục toàn màn hình. Không thêm cơ chế di chuyển giả.

HUD và điều khiển phủ có nền xanh rừng đậm bán trong suốt để đọc rõ mà không tách khỏi cảnh; nút có viền ngà/đồng và bóng cứng theo phong cách pixel. Cụm hành động bên phải là lưới 3×3 gồm tám nút động tác và một nút Đổi cố định ở góc trên bên phải. Nút Đổi chuyển giữa nhóm di chuyển/biểu cảm và nhóm tư thế thấp/bị thương; các thao tác chiến đấu thiết yếu được giữ ở cả hai trang. Mỗi nút dùng key pose tương ứng lấy trực tiếp từ spritesheet nhân vật thay cho ký hiệu Unicode; joystick ở phía đối diện để hỗ trợ nhiều ngón tay.

## Thành phần và trạng thái

- HUD: cụm góc trên trái gồm portrait pixel của nhân vật hiện tại, cảnh giới, máu, linh thạch và linh khí. Bấm avatar/máu/linh thạch mở bảng cộng chỉ số; bấm linh khí mở linh căn, tu luyện và đột phá. Bảng nổi gọn trong sân chơi ngang, không che joystick hay cụm hành động.
- Điều khiển: joystick cảm ứng bên trái; cụm tám động tác có nút đổi trang bên phải; toàn bộ nằm trong cảnh.
- Mobile dọc: lớp chặn có nhãn rõ và nút xin fullscreen/khóa hướng ngang.
- PWA: hướng dẫn cài nếu trình duyệt chưa đưa install prompt; cập nhật bằng hành động người chơi.

## Khả năng tiếp cận

Giữ focus ring, sử dụng button thật, progress có nhãn, không chỉ dùng màu để báo trạng thái. Tôn trọng reduced motion. Kiểm tra độ tương phản khi đổi palette; không đặt chữ nhỏ quan trọng lên scenery. Không thêm âm thanh tự chạy. Bản nâng cấp cần tùy chọn tắt âm/giảm hiệu ứng.

## Tiêu chí nghiệm thu

Không tràn ngang tại 360px, 768px, 1440px; nhãn không bị cắt tiếng Việt; mọi thao tác dùng bàn phím được; loading không cho gửi nhiều yêu cầu; thiết kế offline phản ánh trạng thái thật. Tài liệu mô tả mục tiêu; code hiện tại là nguyên mẫu có thể tiếp tục tinh chỉnh.

## Game hành động đi ngang

Màn hình chính là chương mở đầu ngang toàn viewport, dùng asset nội bộ và palette xanh rừng/ngà/đồng. Hộp thoại xuất hiện tại các mốc truyện, khóa điều khiển khi người chơi đang đọc hoặc giải bia đá. Canvas responsive, sprite raster trong ô 128×128. Mỗi frame chứa nhân vật hoàn chỉnh, gồm tóc đen búi nhỏ, mắt, mũi, miệng và trang phục xanh ngọc/đai ngà. Renderer vẽ atlas liền thân 4×4 ô của Vô Danh và bốn atlas nhân vật nội bộ cho các đối thủ chạy đua; không ghép body/quần áo và không dùng mask che da. Các pose có cùng tỷ lệ, neo chân `(64,116)`, hiển thị nearest-neighbor; tên ngắn trên đầu giúp phân biệt thí sinh. Bộ hiện tại có 16 key pose, chưa phải animation nhiều frame hoàn chỉnh. Map dùng nền raster Rừng Trúc U Tinh cùng atlas vật thể đồng bộ nét vẽ với nhân vật; nền cuộn parallax chậm, còn trúc, măng, cỏ, đá và bia sinh theo từng đoạn có seed ổn định. Asset cảnh giữ cạnh cứng, renderer tắt smoothing và chỉ lấy từ nguồn nội bộ được ghi lại trong thư mục `art/scenery`. Chạm cảnh để phóng khí; vuốt ngang để lướt, lên để nhảy. Joystick ẩn bên trái hiện tại điểm chạm khi giữ, vuốt trái/phải để đi và vuốt xa để chạy; cụm hành động bên phải hỗ trợ nhiều ngón tay. Bàn phím A/D hoặc mũi tên, W/↑ nhảy, J/Space phóng khí. Chọn nhầm Tử môn mở lớp thoại tỉnh mộng có focus rõ và hành động chạy lại từ đầu.
