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

Đột phá tốn linh thạch/linh thảo lần lượt 20/2, 45/5, 90/10, 180/20 với tỷ lệ thành công 85%, 70%, 55%, 40%. Thất bại mất vật phẩm, linh khí về 0 và từ Trúc Cơ trở lên tụt một cảnh giới; thành công nhận 2 điểm Căn cốt/Ngộ tính/Thân pháp.

## Chương mở đầu: Trúc Linh Phong

Người chơi tỉnh dậy tại Rừng Trúc U Tinh dưới chân Thái Huyền Tông, mang phế linh căn và đặt mục tiêu giành một trong năm vị trí Nội môn. Sau hiệu lệnh của trưởng lão, Vô Danh chạy đua cùng bốn thí sinh dùng các bộ nhân vật nội bộ: Linh Nhi, Minh Không, Thiết Sơn và Bạch Tùng. Chương gồm ba nhịp chơi: vượt Trúc Diệp Cương Phong bằng di chuyển/nhảy/lướt; đọc bia đá và chọn Sinh môn bên trái dựa theo bóng nắng; vượt uy áp và chạy lên đỉnh Linh Phong. Chọn sai cửa làm Vô Danh tỉnh dậy, nhận ra lần thất bại vừa rồi chỉ là giấc mơ, rồi bắt đầu lại cuộc đua; không làm mất tiến độ tu luyện lâu dài. Hoàn thành chương khóa năm vị trí đầu tiên và xác lập việc bái nhập tiên môn; người chơi có thể chủ động chơi lại chương.

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

## Chuẩn asset dự kiến

Tile 16×16px; sprite nhân vật 32×48px; portrait 64×64px; icon 16×16 hoặc 24×24px. Sprite sheet chia ô bằng nhau, nền trong suốt, hướng xuống/trái/phải/lên; idle 2–4 frame, walk 4–6 frame. Pixel cạnh cứng, không blur/antialias trong asset. Palette mỗi nhân vật khoảng 8–16 màu. Tên `character-action-direction.png`; ghi tác giả/giấy phép khi thêm asset bên ngoài. CSS scenery hiện tại là placeholder nội bộ, chưa phải sprite final.

## Chiến đấu dự kiến

Theo lượt, ba hành động cơ bản: công kích, công pháp, phòng thủ. Dữ liệu công pháp/tài nguyên tách khỏi component. Bắt đầu single-player; realtime multiplayer, giao dịch và PvP cần server authority, không dựa vào save do client gửi.

## Trải nghiệm và phạm vi

Phiên 3–10 phút; tutorial qua nhiệm vụ nhỏ; không pay-to-win trong bản định hướng ban đầu. PWA hỗ trợ chơi local offline. Tài khoản liên kết và sync đa thiết bị thuộc giai đoạn sau. Quyết định còn mở: chiến đấu theo lượt hay thời gian thực, cơ chế offline, hệ phái, lịch sự kiện và monetize.

## Hành động đi ngang

Màn chơi có đi bộ, chạy, nhảy, bay, lướt và đánh tầm xa thời gian thực trên đường Rừng Trúc U Tinh cuộn liên tục hai hướng; nền rừng raster cuộn parallax, còn trúc, măng, cỏ, đá và sỏi từ atlas cảnh được sinh ổn định theo từng đoạn. Nhân vật còn có các animation xin chào, gãi đầu, ngủ gật, ngồi, bò, bị thương và nằm đất gục ngã. Có bốn bia gỗ từ cùng atlas cảnh, mỗi bia chịu ba đòn và đổi sang hình nứt sau khi trúng; bia không gây sát thương cho người chơi. Tốc độ đi 240px/s, chạy 390px/s, lướt 780px/s trong 0,18s, hai đòn cách nhau 0,22s. Trạng thái chương chỉ nằm trong phiên, không thưởng tài nguyên hay thay schema save. Nhân vật dùng một atlas liền thân 4×4 ô, mỗi ô 128×128px, có tóc, khuôn mặt và trang phục vẽ sẵn trong từng pose. Bộ hiện tại có 16 key pose; chưa phải chu kỳ animation nhiều frame đầy đủ. Chu kỳ chạy xen hai pose sải chân với hai pose chuyển tiếp thu chân/đổi chân từ bộ đi bộ để chuyển động đọc rõ hơn. Cụm điều khiển hiển thị tám động tác mỗi trang và dùng nút Đổi ở góc trên bên phải khi số hành động vượt quá chín nút.

## Hệ thống Đạo pháp (đã triển khai, save v3)

Bảng Đạo pháp là vòng chơi RPG theo lượt bên cạnh chương chạy ngang. Công thức nằm trong `src/game/cultivation.js`; các thay đổi không áp lên tốc độ/đạn/bia của runner. Luyện Khí có 9 tầng, mỗi tầng đầu cần 100 khí và thưởng 1 điểm. Các đại cảnh giới tiếp nối tới Độ Kiếp, Đại Thừa; ngưỡng khí là `100 × (realm + 1)`. Chi phí thạch/thảo: 20/2, 45/5, 90/10, 180/20, 300/30, 450/45. Bảng này thay quy tắc đột phá v0.1 phía trên.

- Căn cốt, Ngộ tính, Phúc duyên là tầng căn cơ; Lực lượng, Thần thức, Thân pháp, Định tâm là tầng chính; HP/MP, công/kháng, né tránh được tính theo cảnh giới và tổn thương. Chỉ số tốc độ/tầm phép/sức tải mới hiển thị để mô tả nhân vật, chưa điều khiển runner hay hành trang. Phúc duyên tăng cơ hội thêm 12 thạch khi lịch luyện, tối đa 50%.
- Thiên linh căn hấp thu ×4 và sát thương bản hệ ×2. Đa căn chia tốc độ cho số căn. Tương sinh tăng 20% sát thương chiêu kế tiếp, khắc tăng 50% và xuyên 30% giáp, bị khắc giảm 30%. Đấu luyện chỉ dùng hệ sở hữu và biến dị đã chọn; không phát thưởng và không làm mất đồ.
- Trúc Cơ có thể chọn một biến dị vĩnh viễn (80 thạch, 8 thảo): Lôi/Băng/Phong/Âm/Dương. Bản đầu dùng chung hiệu ứng mất lượt ở lượt 1, 4, 7…; chưa có hợp thành linh căn hay hiệu ứng không gian riêng cho từng biến dị.
- Luyện hóa pháp bảo giá 20 thạch; sức chứa `min(20, 1 + floor(Thần thức / 5))`. Khi đỡ kiếp: 12 MP mỗi đợt, giảm 15 sát thương mỗi pháp bảo. Trận pháp giá 10 thạch/đợt, giảm 25 sát thương. Thể chất giảm sát thương theo Căn cốt, không tốn vật phẩm.
- Đan phẩm 1–3 giá 2/4/6 thảo, thêm 25/50/75 khí, tích 12/24/36 độc, hỗ trợ xác suất +5/+10/+15 điểm phần trăm. Từ 80 độc chặn uống đan, tu luyện và đột phá. Tĩnh tâm giảm 15 độc, 5 sát khí, 1 tổn thương; nhập định giảm 1 tổn thương. Các hành động theo lượt, không có cooldown thời gian thực.
- Xác suất đại cảnh giới: clamp(0.85 − realm×0.12 + Định tâm×0.01 + Ngộ tính×0.005 + phẩm đan×0.05 − độc×0.004 − sát khí×0.002, 0.1, 0.98). Thất bại mất vật phẩm/khí, tụt tối đa một đại cảnh giới, bị tổn thương 10 lượt (giảm tối đa 50% chiến lực), không xóa nhân vật hay trang bị.
- Từ Kim Đan phải vượt tiếp lôi kiếp: 3 đợt, Nguyên Anh 6 đợt, Hóa Thần/Độ Kiếp 9 đợt. Khóa các hành động kinh tế trong kiếp; lưu mỗi lựa chọn và tiếp tục được sau tải lại. Nguyên Anh có một lần hồi nửa HP nếu kiếp gây chí tử, phục hồi quyền hồi sinh sau đột phá thành công.
- Săn yêu là hành động tài nguyên trừu tượng: +16 thạch, +2 thảo, +10 sát khí; chưa có NPC/PvP. Sát khí tăng sát thương tối đa ×2 và lôi kiếp tối đa ×3. Tâm ma hiện được biểu diễn bằng rủi ro thất bại và tổn thương; chưa có kẻ địch tâm ma riêng hay chế độ Hardcore.

Ngự kiếm là mốc cảnh giới được ghi trên hồ sơ; khả năng bay của chương nhập môn vẫn là thao tác hướng dẫn có sẵn. Hệ thống học công pháp, kỳ ngộ có nội dung, hợp thành biến dị, nhiều pháp bảo có tên riêng và PvP vẫn là dự kiến.
