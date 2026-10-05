# Tu Tiên Loạn Giới — Game design v0.1

## Ý tưởng

Các linh giới vốn biệt lập bị xé rách sau sự kiện Loạn Giới. Một lữ khách không ký ức thức tỉnh tại Thanh Vân Sơn, học hấp thu linh khí, tìm hiểu môn phái và bước qua những khe nứt thế giới. Chủ đề: lựa chọn giữa trường sinh, nhân tính và trật tự vạn giới.

Thể loại dự kiến: RPG tu tiên kết hợp khám phá và tiến triển theo phiên ngắn. Mỹ thuật pixel 2D góc nhìn top-down 3/4 theo JRPG; kiến trúc gỗ, cổng torii, rừng trúc, đèn lồng, đền núi. Không sao chép nhân vật/asset thương hiệu có sẵn.

## Vòng lặp

Tu luyện → đạt linh khí → đột phá → mở bí cảnh → lịch luyện/chiến đấu → thu tài nguyên → chế tạo/nâng kỹ năng → tiếp tục tu luyện. Bản hiện tại có tu luyện, lịch luyện, đột phá và chương nhập môn; các phần khác là kế hoạch.

| Hành động | Kết quả |
| --- | --- |
| Tu luyện | Tăng linh khí và tu vi của mọi linh căn sở hữu; đa linh căn tu chậm hơn |
| Lịch luyện | +8 linh thạch, +1 linh thảo, +1 chuyến |
| Đột phá | Cần đủ linh khí/vật phẩm; có tỷ lệ thất bại và tụt cảnh giới |

Cảnh giới: Luyện Khí → Trúc Cơ → Kim Đan → Nguyên Anh → Hóa Thần. Ngưỡng `100 × (realmIndex + 1)`. Phàm nhân random 1–5 linh căn Kim/Mộc/Thủy/Hỏa/Thổ (45%/30%/15%/7%/3%). Mỗi lần tu luyện tăng mọi hành sở hữu theo `max(2, floor((10 + Ngộ tính - 1) / số linh căn))`.

Đột phá tốn linh thạch/linh thảo lần lượt 20/2, 45/5, 90/10, 180/20, 300/30 với tỷ lệ thành công 85%, 70%, 55%, 40%, 25%. Thất bại mất vật phẩm, linh khí về 0 và từ Trúc Cơ trở lên tụt một cảnh giới; thành công nhận 2 điểm Căn cốt/Ngộ tính/Thân pháp.

## Chương mở đầu: Trúc Linh Phong

Người chơi tỉnh dậy tại Rừng Trúc U Tinh dưới chân Thái Huyền Tông, mang phế linh căn và đặt mục tiêu vào ba hạng đầu trong nhóm năm người hiển thị. Sau hiệu lệnh của trưởng lão, Vô Danh chạy đua cùng bốn thí sinh dùng các bộ nhân vật nội bộ: Linh Nhi, Minh Không, Thiết Sơn và Bạch Tùng. Bốn đối thủ xếp phía sau Vô Danh lúc xuất phát, có nhịp cá nhân riêng nhưng tự tăng tốc khi bị bỏ xa và chùng xuống khi vượt quá xa. Nhịp mục tiêu của từng người dao động độc lập quanh vị trí người chơi, cho phép đổi hạng và vượt qua nhau mà không ép cả nhóm chạy thành một hàng; tốc độ thực tế được giới hạn trong 135–520px/s. Quãng đường chương được kéo dài 20 lần so với bản đầu: ba bia đá lần lượt tại 30000/42000/54000px và đích tại 60000px. Mỗi cửa có tối đa 5 phút để giải: Phong Trúc Quan Trắc (chọn Tây theo bóng nắng), Ngũ Hành Tương Sinh (chọn Thủy → Mộc), Âm Dương Bát Quái (xoay cá Dương trắng về Càn và Khảm về Suối Trúc phía Nam). Giữ nguyên tên quẻ/thuộc tính theo thiết kế hư cấu của màn chơi. Sai câu 1 giam 5 giây, trừ 10 giây và đưa tối đa hai đối thủ phía sau lên trước (hạng giới hạn 5); sai câu 2 giảm 20% tốc độ đi/chạy/lướt trong 10 giây di chuyển; sai câu 3 đẩy lùi 50m, quy đổi 10px/m. Hết giờ chịu cùng hình phạt và cấp lại thời gian của cửa quan; đồng hồ tạm dừng lúc bị giam. Câu sai phải giải lại, không reset chương. Khi đọc hội thoại hoặc bia, người chơi và mọi đối thủ đều dừng; debuff độc chỉ trôi khi chạy ngoài bia. Trạng thái chỉ trong phiên, không đổi save tu luyện. Hoàn thành chương ở hạng 1–3 xác lập việc bái nhập tiên môn; người chơi có thể chủ động chơi lại chương.

Chỉ cảnh đầu dùng lời dẫn chuyện. Từ lượt sau, lời thoại thuộc từng nhân vật; bia đá tự đọc lời khắc ở mỗi cửa trước khi hiện bảng giải. Nhóm thí sinh đứng cách nhau 44px trên vạch xuất phát để thấy rõ người đang nói.

## Thế giới và màn hình

- Thanh Vân Sơn: điểm xuất phát, tu luyện và hồ sơ.
- Rừng Trúc U Tinh: cửa quan nhập môn dưới chân tông môn; chương mở đầu đã có.
- Cổ Thành Vô Danh: giao thương, nhiệm vụ; dự kiến.
- Khe Nứt Loạn Giới: nội dung sau này, boss và câu chuyện.

Màn hình dự kiến: đạo trường, bản đồ vùng, chiến đấu, hành trang, công pháp, nhiệm vụ, hồ sơ, cài đặt. Prototype hiển thị đạo trường và thẻ vùng chưa mở.

## Nhân vật

| Nhân vật | Thiết kế | Vai trò |
| --- | --- | --- |
| Vô Danh | Áo xanh ngọc bạc, đai ngà, tóc đen búi nhỏ; dáng trung tính | Nhân vật người chơi |
| Sư phụ Hạc Vân | Áo trắng xám, gậy trúc, tóc bạc | Hướng dẫn tu luyện, dự kiến |
| Aki, người giữ đền | Áo đỏ đất/ngà, dây bùa, tóc nâu | Nhiệm vụ linh giới, dự kiến |
| Hồ linh | Lông trắng, đuôi xanh phát sáng | Đồng hành, dự kiến |
| Yêu ảnh | Dáng tím than, mắt hổ phách | Kẻ địch đầu game, dự kiến |

Nhân vật nhận diện bằng silhouette và 2–3 màu chủ đạo. Trang phục kín, ưu tiên sự thanh thoát và đọc rõ ở kích thước nhỏ.

### Tuổi thọ và tu luyện tự động

Nhân vật mới bắt đầu ở tuổi 15. Cứ 7 ngày theo đồng hồ hệ thống thì tuổi trong game tăng 1 năm. Thọ nguyên theo cảnh giới lần lượt là 60/100/180/300/500 tuổi từ Luyện Khí đến Hóa Thần; bản hiện tại chỉ hiển thị mốc thọ nguyên, chưa áp dụng cơ chế tử vong.

Hồ sơ toàn màn hình có thể bật tu luyện tự động khi game đang mở. Mỗi giây, nhân vật nhận `max(1, floor(cultivationGain / 5))` linh khí và cùng lượng tu vi cho mọi linh căn sở hữu, dừng tại trần linh khí của cảnh giới. Không cộng bù thời gian khi đóng game.

## Chuẩn asset dự kiến

Tile 16×16px; sprite nhân vật 32×48px; portrait 64×64px; icon 16×16 hoặc 24×24px. Sprite sheet chia ô bằng nhau, nền trong suốt, hướng xuống/trái/phải/lên; idle 2–4 frame, walk 4–6 frame. Pixel cạnh cứng, không blur/antialias trong asset. Palette mỗi nhân vật khoảng 8–16 màu. Tên `character-action-direction.png`; ghi tác giả/giấy phép khi thêm asset bên ngoài. CSS scenery hiện tại là placeholder nội bộ, chưa phải sprite final.

## Chiến đấu dự kiến

Theo lượt, ba hành động cơ bản: công kích, công pháp, phòng thủ. Dữ liệu công pháp/tài nguyên tách khỏi component. Bắt đầu single-player; realtime multiplayer, giao dịch và PvP cần server authority, không dựa vào save do client gửi.

## Trải nghiệm và phạm vi

Phiên 3–10 phút; tutorial qua nhiệm vụ nhỏ; không pay-to-win trong bản định hướng ban đầu. PWA hỗ trợ chơi local offline. Tài khoản liên kết và sync đa thiết bị thuộc giai đoạn sau. Quyết định còn mở: chiến đấu theo lượt hay thời gian thực, cơ chế offline, hệ phái, lịch sự kiện và monetize.

## Hành động đi ngang

Màn chơi có đi bộ, chạy, nhảy, bay, lướt và đánh tầm xa thời gian thực trên đường Rừng Trúc U Tinh cuộn liên tục hai hướng; nền rừng raster cuộn parallax, còn trúc, măng, cỏ, đá và sỏi từ atlas cảnh được sinh ổn định theo từng đoạn. Nhân vật còn có các animation xin chào, gãi đầu, ngủ gật, ngồi, bò, bị thương và nằm đất gục ngã. Có bốn bia gỗ từ cùng atlas cảnh, mỗi bia chịu ba đòn và đổi sang hình nứt sau khi trúng; bia không gây sát thương cho người chơi. Tốc độ đi 240px/s, chạy 390px/s, bò 90px/s, lướt 780px/s trong 0,18s, hai đòn cách nhau 0,22s. Bấm nút Nhảy hoặc Bò tạo chuyển động tiến theo hướng đang quay; joystick hoặc bàn phím vẫn có thể đổi hướng trong lúc thực hiện. Trạng thái chương chỉ nằm trong phiên, không thưởng tài nguyên hay thay schema save. Nhân vật dùng một atlas liền thân 4×4 ô, mỗi ô 128×128px, có tóc, khuôn mặt và trang phục vẽ sẵn trong từng pose. Bộ hiện tại có 16 key pose; chưa phải chu kỳ animation nhiều frame đầy đủ. Chu kỳ chạy xen hai pose sải chân với hai pose chuyển tiếp thu chân/đổi chân từ bộ đi bộ để chuyển động đọc rõ hơn. Cụm điều khiển hiển thị tám động tác mỗi trang và dùng nút Đổi ở góc trên bên phải khi số hành động vượt quá chín nút.

## Vật phẩm

Hành trang mua bằng linh thạch, lưu cùng tiến độ tu luyện. Khởi đầu (và migration v1/v2) nhận 2 Hồi Xuân Đan, 1 Tụ Khí Hồ Lô 5 lượt; chưa có ngọc bội.

| Vật phẩm | Loại | Giá | Hiệu quả |
| --- | --- | --- | --- |
| Hồi Xuân Đan | Một lần | 8 | Hồi tối đa 30 máu, mất 1 viên; tối đa 999 viên |
| Tụ Khí Hồ Lô | Nhiều lần | 24 | 5 lượt, mỗi lượt +20 linh khí; hết lượt mới mua bình mới |
| Ngộ Đạo Ngọc | Vĩnh viễn | 80 | Sở hữu duy nhất; kích hoạt +2 vào mỗi lần tu luyện cho linh khí và mọi linh căn |

Không tiêu hao khi máu/linh khí đầy. Hiệu quả hồi bị chặn ở ngưỡng tối đa; hồ lô không tăng tu vi linh căn. Ngọc không mất sau đột phá thất bại, tải lại hay chơi lại chương và không cộng dồn qua nhiều lần kích hoạt. Vật phẩm tác động chỉ số tu luyện lâu dài, chưa tác động chuyển động/chướng ngại trong chương nhập môn. Không có cooldown hay ngẫu nhiên khi dùng/mua.

### Linh vật thu thập theo bản đồ

Mỗi bản đồ có bảng vật phẩm riêng; các màn sau có thể mở rộng danh mục. Vật phẩm xuất hiện ở vị trí cố định theo màn, phân thành Phổ thông, Ít gặp, Quý hiếm và Cực phẩm; nhân vật tự nhặt khi chạy chạm qua. Bách khoa thu thập hiển thị ảnh pixel, mô tả, độ hiếm và số điểm xuất hiện đã nhặt trong phiên.

Danh mục có 6 loại linh thảo và 2 loại linh thạch, nhưng Rừng Trúc U Tinh hiện chỉ rơi một Thanh Trúc Diệp. Linh thảo thường quy đổi +1 linh thảo, Tử Vân Chi +2; Thanh Linh Thạch +1 linh thạch, Tử Tinh Thạch +3. Phần thưởng cộng ngay vào tài nguyên save v3 hiện có; trạng thái từng điểm nhặt chỉ tồn tại trong phiên màn chơi và được đặt lại khi chơi lại chương.

## Vật cản trong chương nhập môn

Tám khối đá mở đầu cao 48/64/112px và hơn 60 vật cản sinh ổn định dọc tuyến 60.000px từ rừng tới đỉnh núi; vùng quanh ba bia đá và cổng đích được để trống. Hai cụm bậc tăng từ 48 lên 112px cần nhảy nối tiếp. Nhân vật bị chặn ở hai bên khi đi, chạy, bò hoặc lướt; nhảy đáp lên mặt đá, nhảy tiếp từ mặt đá và rơi khi bước khỏi mép. Lực nhảy đầu 500px/s, trọng lực 1.450px/s², nên một cú nhảy chỉ lên cao khoảng 86px tính từ mặt đứng hiện tại. Ba bệ lơ lửng đầu tuyến xếp ở cao độ 64/112/160px và cần ba lần nhảy để lên mỏm cao nhất. Vật cản cao trên tuyến dài có bậc 48px ngay trước mặt. Bay vẫn dùng được nhưng phải lên cao hơn mặt đá để vượt. Bốn thí sinh tự nhảy và chịu cùng va chạm. Vật cản không gây mất máu và không thay đổi save. Độc Bão giảm tốc trước bước va chạm để không đẩy nhân vật xuyên đá.

Hai bộ đá rêu được xen kẽ theo tuyến để tránh lặp hình; crop runtime loại toàn bộ gutter trong suốt để mặt vẽ trùng mặt va chạm. Sỏi, dương xỉ, măng trúc và đèn đá vỡ v2 là scenery thuần, người chơi đi xuyên qua được và không được dùng silhouette giống bệ đứng.

Đường dài còn sinh năm loại vật cản có kích thước thực khác nhau: bó trúc `168×42`, gốc cây `100×78`, bệ đèn đá `72×104`, xà cổng đổ `184×72` và chòi trúc `84×110`px. Ba loại bệ lơ lửng là phiến linh thạch `144×52`, đá rêu `104×52` và mỏm ngọc `78×54`px; tuyến ba bệ đầu có cao độ tăng dần, còn các bệ lẻ dọc đường cao tối đa 80px. Crop ảnh bắt đầu đúng tại pixel mặt đứng; đáy chân từng pose được căn riêng vào collider, giữ hitbox khớp asset.

## Luật chương nhập môn và tiến độ v6

Người về hạng 1–3 trong nhóm năm người hiển thị được nhận vào Tiên môn. Hạng 4–5 là thất bại của lượt chơi, được ghi vào nhật ký và có thể chơi lại chương; chưa có tuyến truyện thất bại riêng. Thất bại đột phá tiếp tục mất nguyên liệu, linh khí và tụt cảnh giới theo luật hiện tại, không có cảnh tỉnh dậy để xóa kết quả.

Nhân vật mới bắt đầu với 0 linh thạch, 0 linh thảo, 0 đan và 0 lượt hồ lô. Phân bố linh căn: đơn 1%, dị 1%, song thường 10%, tam 30%, tứ/phế 58%. Dị linh căn hiện là phân loại hiếm trong hồ sơ; hiệu ứng riêng sẽ được thiết kế sau. Chỉ đi bộ, chạy, nhảy và ngồi có điều khiển trong chương đầu.

Nhập định tự bật cho nhân vật mới; mỗi 15 phút tích 1 linh khí, tối đa 4 linh khí tương ứng một giờ chưa nhận. Người chơi bấm nhận trong hồ sơ. Nhật ký lưu mốc bắt đầu, lựa chọn giải bia, đột phá và kết quả cuộc đua; reset nhân vật xóa nhật ký, bộ sưu tập và đưa chương về đầu.

## Cập nhật chương nhập môn

Cuộc tuyển chọn có hàng trăm thí sinh trong cốt truyện; màn chạy chỉ hiển thị người chơi và bốn NPC. Người chơi chọn một trong năm diện mạo và đặt tên khi vào game, có thể sửa lại từ hồ sơ. Tuổi khởi đầu và thọ nguyên khác nhau theo diện mạo. NPC phải dừng ở mỗi bia, giải đúng với xác suất 80% mỗi lượt; giải sai chờ thêm năm giây rồi thử lại. Hạng 1–3 trong nhóm hiển thị được nhận vào Nội môn. Nếu bốn NPC về trước, màn End tạm thời xuất hiện. Màn đầu có đúng một Thanh Trúc Diệp, chỉ nhặt khi nhân vật chạm trực tiếp. Bước nhảy hiện đạt các bậc lơ lửng cao hơn, tối đa ba bậc liền nhau. Luyện Khí có 13 kỳ; từ Trúc Cơ trở lên có Sơ kỳ, Trung kỳ, Hậu kỳ, Viên mãn. Mỗi lần đột phá thành công tăng hai điểm thuộc tính; chi phí và tỷ lệ đang giữ theo cảnh giới lớn.
