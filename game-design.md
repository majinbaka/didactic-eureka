# Tu Tiên Loạn Giới — Game design v0.1

## Ý tưởng

Các linh giới vốn biệt lập bị xé rách sau sự kiện Loạn Giới. Một lữ khách không ký ức thức tỉnh tại Thanh Vân Sơn, học hấp thu linh khí, tìm hiểu môn phái và bước qua những khe nứt thế giới. Chủ đề: lựa chọn giữa trường sinh, nhân tính và trật tự vạn giới.

Thể loại dự kiến: RPG tu tiên kết hợp khám phá và tiến triển theo phiên ngắn. Mỹ thuật pixel 2D góc nhìn top-down 3/4 theo JRPG; kiến trúc gỗ, cổng torii, rừng trúc, đèn lồng, đền núi. Không sao chép nhân vật/asset thương hiệu có sẵn.

## Vòng lặp

Tu luyện → đạt linh khí → đột phá → mở bí cảnh → lịch luyện/chiến đấu → thu tài nguyên → chế tạo/nâng kỹ năng → tiếp tục tu luyện. Bản khởi tạo chỉ có click tu luyện, thu thập demo và đột phá; các phần khác là kế hoạch.

| Hành động demo | Kết quả |
| --- | --- |
| Tu luyện | Tăng linh khí và tu vi cho mọi linh căn đang sở hữu; đa linh căn tu chậm hơn |
| Lịch luyện | +8 linh thạch, +1 linh thảo, +1 chuyến |
| Đột phá | Cần đủ linh khí, linh thạch, linh thảo; có tỷ lệ thất bại và tụt cảnh giới |

Cảnh giới: Luyện Khí → Trúc Cơ → Kim Đan → Nguyên Anh → Hóa Thần. Ngưỡng `100 × (realmIndex + 1)`. Chi phí đột phá lần lượt là 20/2, 45/5, 90/10 và 180/20 linh thạch/linh thảo; tỷ lệ thành công 85%, 70%, 55%, 40%. Thất bại tiêu hao vật phẩm, đưa linh khí về 0 và từ Trúc Cơ trở lên tụt một cảnh giới. Thành công cho 2 điểm thuộc tính để tăng Căn cốt, Ngộ tính hoặc Thân pháp.

Phàm nhân mới thức tỉnh ngẫu nhiên 1–5 linh căn trong Kim, Mộc, Thủy, Hỏa, Thổ. Xác suất số lượng lần lượt là 45%, 30%, 15%, 7%, 3%. Mỗi lần tu luyện tăng toàn bộ hành đang sở hữu; lượng tăng cơ bản là `floor((10 + Ngộ tính - 1) / số linh căn)`, tối thiểu 2. Vì vậy đa linh căn phát triển nhiều hệ nhưng cần nhiều lần nhập định hơn để đột phá.

## Thế giới và màn hình

- Thanh Vân Sơn: điểm xuất phát, tu luyện và hồ sơ.
- Rừng Trúc U Minh: bí cảnh linh thảo, yêu thú; dự kiến.
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

## Chuẩn asset dự kiến

Tile 16×16px; sprite nhân vật 32×48px; portrait 64×64px; icon 16×16 hoặc 24×24px. Sprite sheet chia ô bằng nhau, nền trong suốt, hướng xuống/trái/phải/lên; idle 2–4 frame, walk 4–6 frame. Pixel cạnh cứng, không blur/antialias trong asset. Palette mỗi nhân vật khoảng 8–16 màu. Tên `character-action-direction.png`; ghi tác giả/giấy phép khi thêm asset bên ngoài. CSS scenery hiện tại là placeholder nội bộ, chưa phải sprite final.

## Chiến đấu dự kiến

Theo lượt, ba hành động cơ bản: công kích, công pháp, phòng thủ. Dữ liệu công pháp/tài nguyên tách khỏi component. Bắt đầu single-player; realtime multiplayer, giao dịch và PvP cần server authority, không dựa vào save do client gửi.

## Trải nghiệm và phạm vi

Phiên 3–10 phút; tutorial qua nhiệm vụ nhỏ; không pay-to-win trong bản định hướng ban đầu. PWA hỗ trợ chơi local offline. Tài khoản liên kết và sync đa thiết bị thuộc giai đoạn sau. Quyết định còn mở: chiến đấu theo lượt hay thời gian thực, cơ chế offline, hệ phái, lịch sự kiện và monetize.

## Sample hành động đi ngang

Bản mẫu riêng có đi bộ, chạy, nhảy, bay, lướt và đánh tầm xa thời gian thực trên đường Rừng Trúc U Minh cuộn liên tục hai hướng; nền rừng raster cuộn parallax, còn trúc, măng, cỏ, đá và sỏi từ atlas cảnh được sinh ổn định theo từng đoạn. Nhân vật còn có các animation xin chào, gãi đầu, ngủ gật, ngồi, bò, bị thương và nằm đất gục ngã. Có bốn bia gỗ từ cùng atlas cảnh, mỗi bia chịu ba đòn và đổi sang hình nứt sau khi trúng; bia không gây sát thương cho người chơi. Tốc độ đi 240px/s, chạy 390px/s, lướt 780px/s trong 0,18s, hai đòn cách nhau 0,22s. Đây là thử nghiệm điều khiển, chưa phải map/nội dung chiến đấu hoàn chỉnh. Trạng thái chỉ nằm trong phiên, không thưởng tài nguyên hay thay schema save. Nhân vật dùng một atlas liền thân 4×4 ô, mỗi ô 128×128px, có tóc, khuôn mặt và trang phục vẽ sẵn trong từng pose. Bộ hiện tại có 16 key pose; chưa phải chu kỳ animation nhiều frame đầy đủ. Chu kỳ chạy xen hai pose sải chân với hai pose chuyển tiếp thu chân/đổi chân từ bộ đi bộ để chuyển động đọc rõ hơn. Cụm điều khiển hiển thị tám động tác mỗi trang và dùng nút Đổi ở góc trên bên phải khi số hành động vượt quá chín nút.
