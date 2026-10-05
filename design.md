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

- HUD: cụm góc trên trái gồm portrait pixel của nhân vật hiện tại, nút túi hành trang nhỏ ngay dưới avatar, cảnh giới, máu, linh thạch và linh khí. Bốn chỉ số xếp hai hàng để thanh linh khí luôn nằm trọn trong khung. Nút hành trang chỉ dùng icon túi pixel và có nhãn trợ năng. Bấm avatar mở hồ sơ nhân vật; bấm máu/linh thạch mở bảng cộng chỉ số; bấm linh khí mở linh căn, tu luyện và đột phá. Bảng nổi gọn trong sân chơi ngang, không che joystick hay cụm hành động.
- Hồ sơ nhân vật: bấm avatar mở lớp toàn màn hình, gồm cảnh nhân vật tọa thiền, linh căn, tuổi/thọ nguyên, máu, linh khí và tốc độ hồi, tu vi ngũ hành cùng biểu đồ radar. Thanh trên có Bộ sưu tập, Cài đặt và Đóng; Cài đặt chứa reset có xác nhận. Hồ sơ cuộn được ở màn hẹp và đóng bằng phím Escape.
- Điều khiển: joystick cảm ứng bên trái; cụm tám động tác có nút đổi trang bên phải; toàn bộ nằm trong cảnh.
- Mobile dọc: lớp chặn có nhãn rõ và nút xin fullscreen/khóa hướng ngang.
- PWA: hướng dẫn cài nếu trình duyệt chưa đưa install prompt; cập nhật bằng hành động người chơi. Icon dùng chân dung Vô Danh áo xanh ngọc trước vòng linh khí vàng và bóng trúc, giữ vùng an toàn riêng cho bản maskable.

## Khả năng tiếp cận

Giữ focus ring, sử dụng button thật, progress có nhãn, không chỉ dùng màu để báo trạng thái. Tôn trọng reduced motion. Kiểm tra độ tương phản khi đổi palette; không đặt chữ nhỏ quan trọng lên scenery. Không thêm âm thanh tự chạy. Bản nâng cấp cần tùy chọn tắt âm/giảm hiệu ứng.

## Tiêu chí nghiệm thu

Không tràn ngang tại 360px, 768px, 1440px; nhãn không bị cắt tiếng Việt; mọi thao tác dùng bàn phím được; loading không cho gửi nhiều yêu cầu; thiết kế offline phản ánh trạng thái thật. Tài liệu mô tả mục tiêu; code hiện tại là nguyên mẫu có thể tiếp tục tinh chỉnh.

## Game hành động đi ngang

Màn hình chính là chương mở đầu ngang toàn viewport, dùng asset nội bộ và palette xanh rừng/ngà/đồng. Hộp thoại xuất hiện tại các mốc truyện, khóa điều khiển khi người chơi đang đọc hoặc giải bia đá. Canvas responsive, sprite raster trong ô 128×128. Mỗi frame chứa nhân vật hoàn chỉnh, gồm tóc đen búi nhỏ, mắt, mũi, miệng và trang phục xanh ngọc/đai ngà. Renderer vẽ atlas liền thân 4×4 ô của nhân vật được chọn và bốn atlas nhân vật nội bộ cho các đối thủ chạy đua; không ghép body/quần áo và không dùng mask che da. Các pose có cùng tỷ lệ, neo chân `(64,116)`, hiển thị nearest-neighbor; tên ngắn trên đầu giúp phân biệt thí sinh. Bộ hiện tại có 16 key pose, chưa phải animation nhiều frame hoàn chỉnh. Map dùng nền raster Rừng Trúc U Tinh cùng atlas vật thể đồng bộ nét vẽ với nhân vật; nền cuộn parallax chậm, còn trúc, măng, cỏ, đá và bia sinh theo từng đoạn có seed ổn định. Asset cảnh giữ cạnh cứng, renderer tắt smoothing và chỉ lấy từ nguồn nội bộ được ghi lại trong thư mục `art/scenery`. Chạm cảnh để phóng khí; vuốt ngang để lướt, lên để nhảy. Joystick ẩn bên trái hiện tại điểm chạm khi giữ, vuốt trái/phải để đi và vuốt xa để chạy; cụm hành động bên phải hỗ trợ nhiều ngón tay. Bàn phím A/D hoặc mũi tên, W/↑ nhảy, J/Space phóng khí. Ba bia đá có hộp thoại cuộn, dữ kiện quan sát, đồng hồ năm phút mỗi bia, nút lựa chọn và thông báo hình phạt. Cửa cuối dùng đĩa Bát Quái hai vòng với nút xoay cá Dương, xoay vòng ngoài và Khai trận; thao tác được bằng bàn phím, focus giữ trong hộp thoại. Chọn sai áp dụng hình phạt và cho thử lại cửa quan.

## Bộ nhân vật mở rộng v2

Có thêm 20 atlas độc lập từ ImageGen, tham chiếu bộ nữ cũ, tại `public/assets/characters/`. Danh mục `roster-v2.json` và trang `/characters.html` cho phép xem tên tiếng Việt, đổi động tác và tạm dừng; mặc định dừng khi bật reduced motion. Trẻ em cao khoảng 70–77px, người thấp khoảng 82–91px, người cao khoảng 104–108px trong ô 128px; tất cả giữ neo chân (64,116). Mỗi nhân vật có 16 key pose liền thân, không phải animation nhiều frame hoàn chỉnh. Đây là thư viện asset và trang xem thử; bốn nhân vật đã được chọn làm diện mạo người chơi trong chương mở đầu; các nhân vật còn lại chỉ ở trang xem thử. Nguồn, prompt, danh sách thiết kế và ảnh tổng hợp nằm trong `art/characters/`; tái đóng gói bằng `npm run assets:character-roster`.

## Hành trang

Nút túi pixel nhỏ ngay dưới avatar mở bảng Hành trang cuộn trong sân chơi. Mỗi vật phẩm có tên, loại thời hạn, số viên/lượt hoặc trạng thái hiệu lực, mô tả, nút dùng/kích hoạt và giá mua bằng linh thạch. Nút vô hiệu kèm lý do bằng chữ khi đầy chỉ số, hết vật phẩm, thiếu tiền hoặc đã sở hữu. Thông báo kết quả dùng vùng status, lỗi localStorage được hiển thị. Bảng giữ palette xanh rừng/ngà/đồng.

## Vật cản đi cảnh

Renderer dùng tọa độ crop riêng cho từng vật thể vì atlas nguồn không phải lưới đều, tránh lấy vùng trống hoặc pixel của hàng phía trên vào đá và hình nộm.

Crop của mọi đá đứng được phải chặt tới pixel alpha đầu tiên ở mặt trên và cuối cùng ở chân đá; mặt collider vì thế trùng trực tiếp với silhouette, không tạo khe hở khiến chân nhân vật trông lơ lửng. Atlas biến thể v2 bổ sung bốn silhouette đá có va chạm và bốn vật trang trí không va chạm (sỏi, dương xỉ, măng trúc, đèn đá vỡ), được rải theo seed ổn định cùng cảnh cũ.

Atlas loại vật cản v3 không lặp lại khối đá theo skin: bó trúc đổ, gốc cổ thụ, bệ đèn đá, xà cổng đổ và chòi trúc có tỷ lệ rộng/cao cùng collider riêng. Metadata của mỗi sprite đánh dấu mặt đứng thật bên dưới lá, rêu hoặc lan can. Renderer căn pixel thấp nhất của từng pose nhân vật vào đúng mặt collider; không dùng offset lún chung để che khoảng alpha trong asset.

Các khối đá rêu dùng atlas raster riêng, đồng bộ nét pixel, ánh sáng và palette với nhân vật cùng Rừng Trúc U Minh. Bốn silhouette đá thấp, vừa, cao hẹp và cao rộng được co đúng vùng va chạm; mặt trên ngang, cạnh đứng và thân đá liền tới chân giúp người chơi đọc chính xác nơi có thể đứng. Đá trang trí từ atlas cảnh vẫn chỉ là cảnh nền. Ba bệ lơ lửng có thể nhảy nối tiếp gồm phiến linh thạch rộng, đá rêu thấp và mỏm ngọc hẹp, có kích thước/cao độ khác nhau và xuất hiện ngay trước mốc 4.200px. Vật cản phủ dọc tuyến 60.000px nhưng chừa vùng bia đá và cổng đích. W/mũi tên lên, vuốt lên hoặc nút Nhảy dùng chung cơ chế.

## Linh vật trên đường chạy

Linh thảo và linh thạch dùng atlas raster nội bộ 4×2 ô, mỗi ô 32×32px, cạnh cứng và có quầng sáng mang màu độ hiếm. Vật phẩm lơ lửng nhẹ trên mặt đất, tự biến mất khi nhân vật chạm qua. HUD hiển thị đồng thời tổng linh thảo và linh thạch; chạm ô linh thảo mở bách khoa hai cột (một cột trên màn hẹp/thấp), gồm ảnh, tên, loại, độ hiếm, mô tả và tiến độ nhặt trong phiên. Thông báo nhặt dùng vùng trạng thái hiện có, không che điều khiển.

## Hồ sơ và điều khiển chương đầu v5

Bộ sưu tập là lưới ảnh/tên vật phẩm; chọn ô mở nơi nhặt và tổng số từng nhặt. Thanh hồ sơ có menu Cốt truyện để đọc nhật ký theo thứ tự. Hồ sơ hiển thị tấn công, phòng thủ vật lý/pháp, thần thức và hai mục kỹ năng/pháp bảo bản mệnh khóa đến Kim Đan. Nhập định hiện số linh khí đã tích để người chơi bấm nhận. Cụm động tác chương đầu chỉ có Nhảy và Ngồi; joystick điều khiển đi bộ/chạy.

## Chọn nhân vật

Lớp chọn nhân vật hiện trước thoại mở đầu, hiển thị năm diện mạo, tuổi và thọ nguyên khởi đầu; tên có thể sửa trong ô nhập. Hồ sơ có nút chỉnh lại nhân vật. Trên màn hẹp, lưới chuyển thành ba cột và nội dung cuộn trong viewport.
