# STORY FOUNDATION v0.1

**Tên làm việc:** Tu Tiên Loạn Giới — Những mùa nước cạn.  
**Artifact:** ARCH-FOUNDATION-001 · revision r1 · production OUTLINED · review REVIEWED · canon PROPOSED.  
**Nguồn:** yêu cầu Phase 1 của người dùng; repository baseline `fc9f5f44ad4632d3bde72d616bfde532d3a42f8a`; [gói khởi tạo](../bible/initialization-v0.1.md).  
**Phạm vi:** kiến trúc toàn truyện; mọi nhánh tương lai; trước sự kiện mở đầu T0. Không ghi nhận lịch sử của một người chơi.  
**Đối tượng:** người thiết kế; có bí mật và kết thúc. Toàn bộ địa danh, sự kiện và cơ chế mới là đề xuất, chưa có trong game.  
**Chủ sở hữu tiếp theo:** người dùng đánh giá foundation; [review r0 → một vòng revision → review r1](foundation-review-v0.1.md). Chưa chuyển sang viết chương.

## 1. Game Narrative Vision

Một người làm thuê ở vùng hạ lưu bước vào tu tiên để có thêm thời gian sống và quyền quyết định đời mình. Người ấy dần phát hiện tuổi thọ của tu sĩ phụ thuộc vào những vùng đất, công việc và sinh mạng mà các bảng giá thường không ghi. Trường sinh là một hành trình có thể theo đuổi; không có vật phẩm nào bảo đảm đạt đích.

Trải nghiệm chủ đạo: từ sợ một con thú và tiếc một ngày công đến đủ sức bảo vệ một tuyến đường; rồi nhận ra bảo vệ tuyến đường cũng có thể lấy mất nước của nơi khác. Người chơi phải hiểu tình thế, chọn mức rủi ro, tích lũy và sống với phần mình không cứu được.

**Story engine:** linh mạch đổi dòng theo mùa và bị khai thác vượt khả năng hồi phục → hợp đồng, tuyến vận chuyển và phân phối tài nguyên mất cân bằng → nhiều bên tự tìm cách thích nghi → player chọn sinh kế và quan hệ → lựa chọn làm đổi cơ hội, thông tin và bên chịu tổn thất của mùa sau. Không phải mỗi mùa đều có thiên tai; giai đoạn yên ổn cho phép xây nghề, trả nợ và nhìn thấy đời thường.

Ranh giới sáng tác: không huyết thống cứu thế, không hồi sinh miễn phí, không pháp bảo sinh tài nguyên vô hạn, không vòng lặp xúc phạm rồi báo thù. Không thiết kế từ cốt truyện hay tên riêng của một tác phẩm mẫu. Hình ảnh pixel Nhật Bản là định hướng mỹ thuật của repo, không biến xã hội hư cấu thành bản sao lịch sử Nhật Bản.

## 2. Core Fantasy

**“Ta không được chọn. Ta học cách sống lâu hơn bằng những quyết định có thể giải thích được.”**

- Biết đặt dấu đường quay về trước khi bước vào nơi nguy hiểm.
- Dùng kiến thức nghề nghiệp, trao đổi và chuẩn bị để lấy một phần tài nguyên rồi rút.
- Giữ được một pháp khí qua nhiều năm nhờ hiểu giới hạn và sửa đúng lúc.
- Tự chọn trở thành người thuộc một tổ chức, người làm nghề độc lập hoặc người bảo vệ một tuyến sinh kế.
- Nhìn thấy người từng cùng mình ăn cơm lớn tuổi, đổi nghề, rời đi; trường sinh cũng là việc học cách không giữ mọi người bên mình.

Cảm xúc chiến thắng đầu game là trở về với đủ tiền công và không mất dụng cụ. Giữa game là thương lượng mà không phải cầu xin. Cuối game là đủ năng lực tham dự một quyết định vùng, nhưng không thể quyết định thay tất cả các vùng.

## 3. Main Character Concept

**CHAR-NF-001 · người chơi, tên và diện mạo do player chọn.** Tuổi thiết kế mở đầu 17; đây là thay đổi đề xuất so với tuổi 15 của runtime. Xuất thân gia đình sửa bến và cân hàng ở LOC-NF-001, không mất ký ức, không có gia phả bí mật. Người nhà còn sống và biết quá khứ của player; họ không giữ chìa khóa bí mật tu tiên.

- **Want:** học một phương pháp tu luyện đủ tin cậy để kéo dài đời mình; trước mắt kiếm đủ tiền duy trì sinh kế sau khi bến cũ mất luồng nước.
- **Need:** học phân biệt tự chủ với tự cô lập; có thể chọn sống độc lập nhưng vẫn phải hiểu mình phụ thuộc ai.
- **Misconception:** nếu ghi đủ dữ liệu và giữ kín mọi chuyện thì sẽ tránh được mọi món nợ và tổn thất.
- **Obstacle:** vốn ít, chưa cảm nhận linh khí, thiếu công pháp, kiến thức đo nước không tương đương kiến thức linh mạch; thân thể cần ăn ngủ và chữa thương.
- **Weakness:** tin vào số đo hơn lời người, chậm quyết khi dữ liệu mâu thuẫn, có thể bỏ lỡ thời cơ.
- **Lợi thế ban đầu:** biết đọc chữ thông dụng, kiểm cân và so mực nước. Người khác có thể học những nghề này; không phải thiên phú độc quyền.
- **Giới hạn/cái giá:** phải đo nhiều lần, trả phí cho dụng cụ và người kiểm chứng; đổi dòng linh khí có thể không hiện trên mực nước. Ghi sổ sai có thể khiến đoàn hàng đi nhầm và player chịu bồi thường.

Động lực cụ thể: từ nhỏ player nhìn thấy đèn thuyền thượng lưu đi khỏi bến mà chưa từng có tiền lên một chuyến. Người thợ cùng nhà dành ba mươi năm sửa bến, tới lúc đủ tiền thì đầu gối không còn chịu nổi đường núi. Người ấy vẫn sống, có niềm vui và không là lời cảnh báo một chiều. Player muốn đủ thời gian để vừa có một nghề vừa nhìn thấy những nơi mình chỉ biết qua hàng hóa. Khi tu luyện, “đi xa” có thể đổi nghĩa thành giữ được một mái nhà qua nhiều thế hệ; lựa chọn ấy thuộc player.

Không trao “bảo vật riêng của main” ở đầu truyện. Nếu player theo nghề khảo mạch, lợi thế đến từ chuỗi kỹ năng, vật liệu và quan hệ, không từ khả năng nhìn xuyên chân tướng. Linh căn yếu hoặc nhiều hành là trở ngại về hiệu suất, không phải căn cơ tối thượng chưa thức tỉnh.

## 4. Starting Situation

**T0:** bến Thạch Lưu cạn một luồng hàng sau hai mùa ít nước. Người làm bến phải chuyển việc; đầu nậu mua lại dụng cụ với giá thấp. Đội sửa đường của Thái Huyền Tông thuê lao động kiểm lại đường tới chân Trúc Linh Phong vì tuyến thuốc bị ẩm và trễ chuyến.

Player có thể nhận việc, bán số đo bến cho nhà buôn hoặc làm ca ở kho để có tiền chuẩn bị. Đường tiếp xúc với tu tiên mở qua công việc có rủi ro vừa sức; thất bại một hợp đồng không chặn toàn bộ game. Người nhà muốn player có nghề chắc, không đồng lòng cổ vũ “đi thành tiên”. Không có đại năng đi ngang nhận học trò.

Cú chạm đầu tiên: một kiện thuốc được ghi là “hỏng” vẫn được nhà buôn hỏi mua giá cao, trong khi người làm bến phát bệnh khi hong nó. Câu hỏi tức thời là **thuốc này còn dùng được hay đang che giấu nguy hiểm?** Player có thể tìm hiểu hoặc chỉ giao kiện theo hợp đồng. Vấn đề trả công và trách nhiệm xuất hiện trước bí mật linh mạch.

Tông môn không đặc cách nhập môn vì một việc tốt. Tuyển chọn chỉ cấp quyền dự tuyển/học việc theo nhu cầu và khả năng; đào tạo, bảo lãnh, học phí lao động và kiểm tra tiếp tục. Đường tán tu có thể tồn tại nhưng đắt và chậm hơn ở một số kỹ năng.

## 5. Cultivation System

Giữ bộ tên **Luyện Khí → Trúc Cơ → Kim Đan → Nguyên Anh → Hóa Thần** để đối chiếu repo; thêm trạng thái phàm nhân trước Luyện Khí là đề xuất. Ý nghĩa cốt lõi là thay đổi cách cơ thể giữ và sử dụng linh khí, không phải một thanh EXP duy nhất.

**RULE-NF-001:** linh khí có lưu lượng, độ ổn định và tạp nhiễm. Nơi dồi dào có thể quá nhiễu để tu luyện an toàn; vùng yếu nhưng ổn định vẫn có giá. Linh thạch tích trữ một phần khí, không tái tạo nguồn đã mất. Linh dược chuyển hóa khí theo chu kỳ sinh trưởng; hái non có lợi tức trước mắt và mất sản lượng sau.

**RULE-NF-002:** công pháp huấn luyện thân thể thích nghi với một dải điều kiện. Chuyển công pháp được nhưng cần thời gian điều chỉnh, có thể mất kỹ năng cũ và chịu thương tổn. Không có công pháp tối ưu cho mọi địa hình.

| Bậc | Gameplay mới | Requirement + resource + preparation | Risk + consequence |
| --- | --- | --- | --- |
| Phàm nhân → Luyện Khí | Cảm khí gần, vận dụng một pháp khí đơn giản theo lượt thở; biết phân biệt vùng quá nhiễu | Thể trạng hồi phục; bản dẫn khí đã kiểm chứng; thuê chỗ ổn định; luyện kiểm soát hơi thở và thử liều nhỏ | Dẫn khí lệch gây thương tổn, ngừng việc vài ngày; không thử lại khi chưa chữa. Thành công cho năng lực hạn chế, chưa bay |
| Luyện Khí → Trúc Cơ | Duy trì kỹ thuật khi di chuyển; dựng neo rút lui ngắn; khảo mạch cần kiểm chứng thay vì chỉ thấy ánh sáng | Mạch dẫn đủ bền; vật liệu dựng nền; nơi an toàn; thực nghiệm trước với mẫu khí khác nhau; quỹ chữa thương | Nền lệch làm giảm sức chứa hoặc khóa một kỹ thuật đến khi sửa. Thành công mở hợp đồng xa và nghĩa vụ tổ chức |
| Trúc Cơ → Kim Đan | Tích khí để hoạt động ngắn ngoài nguồn; điều khiển pháp khí bay hữu hạn; duy trì trận nhỏ | Tương thích công pháp/thân thể; lò và người trợ luyện trả công; thuốc ổn định; dự trữ sinh kế cho thời gian đóng quan | Kết tụ không đều làm mất phần sức chứa; có thể cứu chữa với giá cao. Khi thành công, lệ thuộc lịch nạp và nguồn đã chọn |
| Kim Đan → Nguyên Anh | Thần thức tách đi khảo sát ngắn, phối hợp nhiều điểm trận; biết mình bỏ sót tín hiệu nào | Bản đồ phản ứng bản thân qua nhiều vùng; vật liệu hộ thể; người giữ thân hoặc trận thay thế tốn phí; đường cắt kết nối | Thần thức bị tổn thương gây mất độ chính xác/kỹ thuật, không xóa ký ức tùy tiện; thân thật luôn dễ bị tập kích |
| Nguyên Anh → Hóa Thần | Đồng điều một mạng trận có giới hạn địa bàn; tác động tuyến vận chuyển khí, không toàn tri | Hiểu các điểm nguồn/đích; quyền tiếp cận hoặc chiếm giữ có hậu quả; đội vận hành hoặc mạng tự động đắt, ít linh hoạt; kế hoạch bảo trì | Phản hồi lan qua mạng làm thương người vận hành và mất khả năng duy trì; thành công tạo quyền lực vùng cùng trách nhiệm về mạng |

**RULE-NF-003 — chênh lệch:** giao đấu trực diện hơn một đại cảnh giới thường dẫn đến thua. Bẫy, độc và địa hình có thể cho cơ hội trì hoãn, đánh cắp mục tiêu hay thoát; giết vượt cấp phải có thông tin đúng, chuẩn bị cụ thể và tổn thất. Không có đòn định kỳ vô hiệu mọi chênh lệch.

**RULE-NF-004 — tuổi thọ:** đột phá tăng trần sinh học, không hoàn trả mọi tuổi đã mất hoặc chữa mọi bệnh. Mốc thử nghiệm: phàm nhân khoảng 60 năm; các bậc 80/130/220/360/600. Đây là giá trị thiết kế chưa cân bằng, khác runtime. Thương tật và khai thác quá mức có thể rút ngắn thời gian thực sống.

Breakthrough là một dự án: chẩn đoán → chọn điều kiện và phương án → dành ngân sách/rút khỏi công việc → thử kiểm soát → quyết định tiếp tục hay dừng → phục hồi. Player được rút trước ngưỡng cam kết và mất phần phí đã tiêu; sau ngưỡng đó chỉ có phương án giảm hại. Không dùng tỷ lệ thất bại ẩn làm nguồn khó duy nhất.

## 6. World Structure

Thế giới được hé lộ qua điều player cần làm, không mở bản đồ vũ trụ lúc tạo nhân vật.

| Tầng / ID | Nơi và vai trò | Lý do mở / thay đổi gameplay |
| --- | --- | --- |
| LOC-NF-001 | Bến Thạch Lưu, làng và đường quanh bến | Kiếm sống, học cân/đo, sửa dụng cụ, đánh giá một nguy hiểm gần |
| LOC-NF-002 | Vùng chân Thanh Vân Sơn, Rừng Trúc U Tinh và Trúc Linh Phong | Đường thuốc, thuê dẫn đường; giữ địa danh prototype, thay vai trò phải được duyệt |
| LOC-NF-003 | Lưu vực Tịch Hà: tông môn, chợ và ba tuyến mạch | Lập hành trình, so nguồn khí, hợp đồng và mùa tài nguyên |
| LOC-NF-004 | Nước Kính Xuyên: đồng bằng, vùng núi và cơ quan thuế mạch | Giấy đi đường, pháp lý hàng hóa, quyền cư trú; thấy lợi ích hạ lưu xung đột với thượng lưu |
| LOC-NF-005 | Đại lục Vành Nội, các lưu vực cùng chạm một vành đứt mạch | So hệ thống khai thác, trao đổi kỹ thuật; đi xa làm giảm hiệu suất công pháp đã quen |
| LOC-NF-006 | Bờ Ngoại Triều, ngoài vành đứt | Điều kiện khí theo chu kỳ khác, thời gian vận chuyển dài; phải thiết lập một sinh kế mới thay vì bỏ mọi đồ cũ |

Phạm vi truyện hữu hạn ở hai miền của một đại lục và một vùng biển tiếp giáp. Không mặc định trên mỗi thế giới lại có một thế giới mạnh hơn vô hạn. “Loạn Giới” là tên dân gian của những vùng bị đứt liên thông linh khí; việc đổi nghĩa so với “nhiều linh giới bị xé rách” là đề xuất có tác động lớn, xem gói khởi tạo.

Khí và nước có liên hệ qua đá nền, không đồng nhất: đo nước là manh mối, không bản đồ hoàn chỉnh. Kỳ thú được hé lộ qua hành động: lá trong rừng đọng sương ở mặt dưới khi nhịp khí đảo; một vách đá hát âm trầm trước đợt chuyển dòng, còn đàn thú rời vùng sớm hơn người đo; qua vành đứt, thuyền chỉ đi được khi dải đá nổi mất điện tích. Những hiện tượng này có thể đẹp và nguy hiểm cùng lúc. Không có quy tắc mọi yêu thú đều ác: đường di cư, nơi kiếm ăn và phản ứng khi bị ép lãnh địa có dấu quan sát.

Thông tin di chuyển theo người, thư và mạng truyền tin có phí; chưa có cơ chế gọi tức thời toàn thế giới. Hành trình cần thời gian, vật tư và nơi trú; con người không dịch chuyển chỉ để có mặt trong quest của main.

## 7. Resource Economy

Chuỗi nhân quả: linh khí ổn định → cây/đá tích khí → nghề thu hái và tinh luyện → công pháp/pháp khí → người tu luyện → quyền bảo vệ hoặc chiếm nguồn → thay đổi sản lượng và quyền tiếp cận. Công việc phàm nhân như vận tải, sửa bến và bảo quản quyết định chuỗi này có hoạt động được hay không.

| Tài nguyên | Nguồn / nút thắt | Chi phí và đối tượng hưởng lợi |
| --- | --- | --- |
| Linh thạch | Mỏ hoặc tinh luyện; hữu hạn theo mùa | Hao công và tạp nhiễm; chủ mỏ thu tô, thợ cần thuốc và thông khí |
| Linh dược | Nơi có chu kỳ khí phù hợp | Thời gian chín, vận chuyển và chế biến; người giữ vườn mất vụ nếu hái non |
| Chỗ tu luyện | Độ ổn định tốt, được bảo trì | Tiền thuê, suất thành viên, nghĩa vụ lao động; có thể bị cắt khi chiến sự |
| Công pháp | Truyền thừa, bản sao cần kiểm chứng | Học phí, người sửa lỗi, tài nguyên tương thích; sách trộm có thể đủ chữ nhưng thiếu phương pháp an toàn |
| Thông tin | Quan sát, thư tín, bản đồ, nhân chứng | Giá tiền/thời gian, uy tín nguồn, tuổi thông tin, lộ ý định của người hỏi |
| Thời gian và sức khỏe | Tuổi, nghỉ ngơi, chăm sóc | Đóng quan lỡ hợp đồng/mùa; chữa thương cạnh tranh với tiền đột phá |

**Ví dụ ngân sách**, không phải bảng giá runtime: có 500 linh thạch sau khi giữ riêng lương thực. Chọn thuốc và thuê chỗ đột phá 360 thì chưa đủ pháp khí sửa đường 240; mua thông tin 60 và vật tư đi khảo sát 140 cho cơ hội tìm nguồn khí nhưng hoãn đột phá; giúp NPC trả 200 nợ có thể giữ người trợ luyện, không bảo đảm họ nhận lời. Số tiền chưa tiêu cũng có giá trị dự phòng; game không phạt tích lũy chỉ vì muốn player tiêu.

Thông tin lưu nguồn, thời điểm, độ tin cậy và kết luận người nói. Tin “vườn mở đêm nay” có thể đúng lịch nhưng sai độ an toàn. Player được so mẫu và mua bảo chứng; không trả tiền để UI hiện một đáp án toàn tri. Tin giả thường do lợi ích hoặc quan sát hạn chế, không phải mọi NPC đều lừa.

**ITEM-NF-001 · Thước định lưu:** dụng cụ nghề phổ thông, player có thể mua hoặc thuê. Đo lệch pha ở khoảng cách gần; cần mẫu chuẩn, không dò kho báu. Hỏng lớp khắc thì số đo trôi; sửa bằng người có nghề, ghi lần hiệu chỉnh và giữ lịch sử đổi chủ. Có thể theo player đến giữa game vì hiệu quả đo vẫn hữu ích.

**ITEM-NF-002 · Sổ đối chứng:** vật ghi dữ liệu, không pháp bảo. Mất sổ là mất bằng chứng độc bản, không mất kiến thức đã nhớ; sao lưu tốn thời gian và có nguy cơ lộ tuyến. Không có “sổ tự cập nhật”.

**ITEM-NF-003 · Đinh hồi lộ:** neo đường rút ở Trúc Cơ, cặp đinh phải đặt và kiểm trước. Khoảng nối ngắn, không xuyên trận phong tỏa; nếu đích bị phá chỉ báo mất liên kết. Đổi lấy tải hành trang và thời gian chuẩn bị.

**TERM-NF-001 · Phép Dưỡng Lưu:** công pháp rẻ dành cho lao động đường mạch; tiết kiệm hao khí khi di chuyển nhưng dẫn sát thương kém, cần nhịp nghỉ để tránh tổn mạch. Lựa chọn khác là phương pháp tích khí ngắn để chiến đấu, mạnh hơn trong một lần đối đầu nhưng tốn nguồn và kém bền đường dài. Không mặc định chọn nghề đồng nghĩa chọn đạo đức tốt.

## 8. Major Factions

| ID / tổ chức | Mục tiêu, cơ cấu và nguồn lực | Giới hạn, mâu thuẫn và hành động độc lập |
| --- | --- | --- |
| FACTION-NF-001 · Thái Huyền Tông | Giữ nguồn khí ổn định và truyền thừa; ngoại môn lo đường/vườn/kho, nội môn quản các phép chuyên sâu, chấp sự điều phối, trưởng lão quyết suất lớn; có trận nguồn và đội bảo vệ | Phe giữ đất muốn giảm khai thác, phe mở tuyến cần doanh thu, gia tộc bảo trợ muốn suất riêng. Hạn ngạch lao động và kinh phí buộc họ bỏ một trạm ngay cả khi player xin cứu |
| FACTION-NF-002 · Thương liên Cửu Bến | Giữ hàng và tín dụng chạy qua các tuyến; chủ bến, nhà kho, người môi giới cùng góp vốn | Không một thương chủ ra lệnh mọi thành viên; đóng tuyến làm phá sản đối tác. Mua trước sản lượng và mở đường khác trước khi player biết |
| FACTION-NF-003 · Ty Giám Mạch Kính Xuyên | Thu thuế và giữ nước/khí tới các vùng dân cư; quan đo mạch, đội kiểm định, sổ cấp quyền | Thiếu nhân lực, dữ liệu trễ; cần doanh thu từ chính bên đang bị kiểm. Có thể cấm khai thác đúng lý nhưng gây thất nghiệp |
| FACTION-NF-004 · Hội Thợ Vá Mạch | Bán năng lực sửa trận và giữ tri thức nghề; nhóm thợ, người kiểm chuẩn và quỹ thương tật | Không đủ người sửa mọi nơi; bảo vệ bí quyết làm giá sửa cao. Tranh cãi mở dạy phàm nhân hay giữ độc quyền |
| FACTION-NF-005 · Liên cư Bờ Thấp | Giữ đất sống, nước và quyền thương lượng; đại diện làng, chủ ruộng thuê và dân mất bến | Không đồng nhất: người bán đất muốn bồi thường nhanh, người ở lại muốn hạn ngạch nguồn. Có thể ký thỏa thuận bất lợi dài hạn để qua mùa đói |
| FACTION-NF-006 · Khách trạm Ngoại Triều | Giữ hành lang vượt vành và trao đổi kỹ thuật thích nghi | Nguồn trợ cấp hữu hạn, ưu tiên chuyến hàng có lời; không chờ main đến mới khảo sát thành công |

Mọi tổ chức đều cần thợ, thức ăn, thay người và kế nhiệm; không tổ chức nào tồn tại chỉ để làm đối thủ của player. Tán tu và chợ đen là mạng nhiều người, chưa phải một “phe tà” thống nhất. Player có thể làm thuê nhiều bên nhưng phải chịu điều khoản bảo mật/xung đột hợp đồng.

## 9. Major Characters

Mỗi CHAR-NF là ID mới của đề xuất. Không suy ra các NPC vô danh trong bản thảo 01.1–01.4 chính là các nhân vật này.

| ID / người | Want / need / fear | Lợi ích, nguồn lực, giới hạn | Bí mật; biết / không biết; quan hệ và arc |
| --- | --- | --- | --- |
| CHAR-NF-002 · Tạ Miên, người giữ kho | Muốn đủ tiền đưa con học nghề; cần dừng giấu sai để giữ việc; sợ bị gánh toàn bộ lô hỏng | Có kho, sổ giao hàng, quan hệ lao động; không quyền đóng tuyến hay chữa bệnh | Đã đổi ngày kiểm một lô vì bị ép doanh số. Biết lô nào bị hong lại, không biết linh mạch. Quen gia đình player; có thể nhận trách nhiệm hoặc tiếp tục chuyển lỗi |
| CHAR-NF-003 · Đỗ Nghi, thợ kiểm mạch | Muốn giữ chứng chỉ và nuôi nhóm thợ; cần học chia sẻ kỹ thuật; sợ số đo sai làm chết người | Có mẫu chuẩn, tay nghề và hợp đồng; tổn thương tay nên không tự sửa mọi trận | Bản hiệu chỉnh mới từng gây tai nạn. Biết sai số dụng cụ, không biết lịch sử vành đứt. Dạy player có trả công; có thể thành cộng sự hoặc đối thủ nghề |
| CHAR-NF-004 · Kỷ Vân, chấp sự ngoại môn | Muốn giữ đội và định mức; cần thừa nhận suất phân phối không công bằng; sợ đội bị giải thể | Điều lịch, cấp dụng cụ theo quy chế; không quyền đổi luật trưởng lão | Đã dùng quỹ cá nhân lấp thiếu hụt nhưng không còn vốn. Biết cắt trạm sắp tới, không biết bên nào đổi van nguồn. Tôn trọng làm việc chắc; không bảo lãnh vô điều kiện |
| CHAR-NF-005 · Bùi Sương, tán tu trồng thuốc | Muốn giữ vườn thuê để trả khoản chữa thương cho bạn đời; cần thương lượng thay vì liều một vụ; sợ mất quyền thuê | Có mùa cây và người hái quen; lực chiến thấp, không thể giữ vườn trước cả đội | Biết một khoảnh trưởng thành sớm và định giấu nó. Không biết mẫu đã nhiễm. Tranh tài nguyên với player có lý; quan hệ có thể hợp tác, nghi kỵ hoặc nợ cụ thể |
| CHAR-NF-006 · Mạc Du, trưởng đoàn hàng | Muốn chứng minh tuyến vòng có lời; cần đặt giới hạn bảo chứng; sợ bị chủ vốn thay | Có vận tải, tín dụng và tin từ chợ; không đủ sức chống tu sĩ cao bậc | Bán quyền ưu tiên một tuyến cho hai bên khi tưởng họ không đi cùng mùa. Biết giá và lịch, không biết ổn định khí. Tôn trọng người giữ hợp đồng dù không thích họ |
| CHAR-NF-007 · Tống Khê, tu sĩ Kim Đan phụ trách nguồn | Muốn giữ viện chữa bệnh và tuổi thọ người đang sống; cần thừa nhận ai đang gánh chi phí; sợ giảm khí làm bệnh nhân chết | Có kỹ thuật chuyển dòng và phe ủng hộ, không tự tạo khí hay đủ quyền toàn tông | Thấy tăng tạp nhiễm nhưng dự định tiếp tục mở van vì dừng ngay gây khủng hoảng. Biết nhu cầu và sơ đồ vùng, không biết tổng tải đại lục. Đối thủ có thể giữ lập trường dù player chứng minh nguy cơ |
| CHAR-NF-008 · Dư Tịnh, người kiểm thuế | Muốn giữ hồ sơ có thể dùng trước tòa; cần chấp nhận nhân chứng ngoài chuẩn; sợ sai dấu khiến dân bị thu thuế hai lần | Có quyền niêm hàng và đọc sổ tỉnh; thiếu quân lực bảo vệ nguồn xa | Giữ một bản kê không đóng dấu vì cấp trên bác. Biết quyền cấp trùng, không biết cách sửa mạch. Hợp tác theo bằng chứng, có thể niêm chính hàng của player |
| CHAR-NF-009 · Hà Châu, kỹ sư hành lang Ngoại Triều | Muốn mở một tuyến ổn định trước khi vốn hết; cần coi hiểu biết địa phương ngang kỹ thuật của mình; sợ khảo sát mất nhiều năm vô ích | Có mạng trạm và bản tính tải; xa nguồn tiếp tế, không đủ người vận hành | Biết một hành lang đã thất bại nhưng chưa công bố để giữ vốn. Không biết sinh kế hạ lưu. Có thể mở tuyến khi player vắng mặt; không là người dẫn đường miễn phí |

**Đời sống ngoài quest:** Tạ Miên đổi ca chăm con; Đỗ Nghi ưu tiên đơn sửa có thể nuôi đội; Bùi Sương bỏ chợ khi cần chăm người nhà; Kỷ Vân phải tuyển người khác nếu player không nhận việc. Sự vắng mặt phải có dấu vết trong lịch, thư hoặc người thay thế.

Quan hệ lưu theo từng chiều: tin trong lĩnh vực nào, tôn trọng việc gì, sợ hành vi nào, nợ bao nhiêu/đến hạn khi nào, bí mật chung và ai được biết. Cứu Bùi Sương không mặc định được quyền lấy vườn của bà. Mạc Du có thể thích player nhưng vẫn yêu cầu đặt cọc.

## 10. Core Conflict

Cá nhân: player muốn sống lâu và giữ quyền chọn, nhưng mỗi bước tiến cần nguồn lực nằm trong một mạng lợi ích. Né hết ràng buộc làm mất nhiều cơ hội; nhận mọi bảo trợ làm mất quyền quyết định.

Xã hội: vùng Tịch Hà cấp nhiều quyền khai thác lên cùng một nguồn. Mọi bên dựa vào lượng khí danh nghĩa, còn lượng khí ổn định thực tế đang giảm. Người muốn cắt tải đúng về sinh thái nhưng chưa có kế hoạch cho bệnh viện, lao động và khoản nợ; người muốn tiếp tục khai thác cứu được hôm nay nhưng đẩy tổn thất sang nơi ít tiếng nói.

**EVENT-NF-001 — kế hoạch đối kháng có đồng hồ:** Tống Khê gom vật liệu và người cho dự án nhiều giai đoạn: khảo sát, van cấp tạm để giữ viện qua mùa thiếu, rồi xây nhánh phụ lâu dài trong nhiều năm. Mạc Du đặt trước hàng, Ty Giám Mạch kiểm hồ sơ, Hội Thợ định giá sửa. Player có thể kiếm lợi, chống, giúp thiết kế lại hoặc rời vùng. Không có player, nhánh phụ vẫn có thể mở theo tiến độ dự án.

Tống Khê không là chủ mưu mọi tai nạn. Một số sự cố do sai số, một số do tham lợi, một số do điều kiện chưa ai hiểu. Chứng minh nguy cơ không tự khiến mọi người dừng dự án: họ cần giải pháp, quyền thực hiện và cách chia phần thiệt hại.

## 11. Core Mystery

**MYST-NF-001:** vì sao các nguồn khí cách xa nhau cùng mất độ ổn định sau những đợt chuyển dòng tưởng như cục bộ? Có thể kéo dài tuổi thọ mà không đẩy một món nợ sinh thái vô hạn sang nơi khác không?

**TRUTH — AUTHOR_ONLY:** các linh mạch trong vành từng nối qua một lớp nền có chu kỳ chậm. Nhiều thế hệ chuyển dòng và dựng trận một chiều đã chặn khả năng hồi ổn giữa các vùng. “Loạn Giới” là nhiều đợt đứt liên thông nối tiếp; không phải một tai họa do một người, một huyết thống hay một ý chí vũ trụ. Nhu cầu khai thác không tự gây mọi biến động: dao động tự nhiên vẫn tồn tại và phải đo riêng.

Người xưa có ghi một vài cách nối hồi lưu nhưng không giải được toàn mạng. Ghi chép rời có thể giúp, không là bản thiết kế hoàn chỉnh chỉ cần main đọc. Sửa tuyến làm giảm một phần tổn thất, cần hợp tác và thử nghiệm; trường sinh vô hạn vẫn chưa được chứng minh.

| Câu hỏi | Mở / tiến / trả lời | Tin của NPC và tri thức player |
| --- | --- | --- |
| MYST-NF-002 · thuốc hỏng vì gì? | Ch.1 / Ch.2 / Ch.3 | Tạ Miên nghi quy trình kho; player chỉ biết mùi và dấu hong. Trả lời bằng mẫu so sánh: có tạp nhiễm từ nguồn, đồng thời bảo quản sai làm nặng hơn |
| MYST-NF-003 · ai đổi van? | Ch.3 / Ch.5 / Ch.6 | Người trồng thuốc đổ lỗi thương đoàn. Sổ vận hành cho thấy thay đổi được duyệt để cứu viện; sai phạm nằm ở giấu tải, không phải toàn bộ việc chuyển khí |
| MYST-NF-001 · vì sao cùng suy? | Ch.4 / Ch.8–12 / Ch.14 | Ty biết hồ sơ, Tống Khê biết tải vùng, Hà Châu biết hành lang; không ai biết toàn bộ. Player phải đối chứng hai lưu vực trước kết luận |
| MYST-NF-004 · hồi lưu có ích thật? | Ch.10 / Ch.13–15 / Ch.16 | Thợ có kỹ thuật cục bộ, chưa có dữ liệu dài hạn. Pilot cho kết quả tốt ở một dải điều kiện; kết thúc không tuyên bố mọi vấn đề đã chữa |

**Misdirection hợp lý:** bệnh trùng lúc hàng từ nơi khác về khiến người dân nghi thương đoàn; số đo nước ổn khiến thợ nghĩ linh mạch vẫn ổn. Player không tự biết điều nào sai. Đáp án sớm giải quyết vấn đề sớm; không trì hoãn mọi câu trả lời tới cuối game.

## 12. Character Arc

| Giai đoạn | Thay đổi có thể chơi | Bằng chứng / lựa chọn |
| --- | --- | --- |
| Sinh tồn | Biết công nhận điều mình chưa biết | Sửa sổ và chấp nhận mất công; hoặc che sai rồi mất bảo chứng ở hợp đồng sau |
| Tích lũy | Biết chuẩn bị cả đường rút và quỹ hồi phục | Rời một vườn có lợi tức, nhìn người khác lấy phần mình bỏ; thắng không phải phần thưởng mặc định |
| Độc lập | Nhận ra không ai hoàn toàn tự cấp nguồn | Đóng quan phải thuê người giữ đồ hoặc chấp nhận ít kỹ thuật; quan hệ được kiểm bằng điều khoản thật |
| Quyền lực | Hiểu số đo đúng không thay quyết định chia chi phí | Công bố bằng chứng có thể mất tài trợ; giữ kín giúp lợi nhuận và để lại trách nhiệm cụ thể |
| Đường dài | Chọn loại phụ thuộc mình chấp nhận | Gắn với một vùng, mang tri thức đi tiếp hoặc giữ nguồn cho bản thân; không ép player diễn arc đạo đức cứu đời |

Các NPC không tự đi cùng arc main: Đỗ Nghi có thể mở học nghề dù player bỏ đi; Tống Khê có thể chấp nhận cắt tải ở viện khác nhưng vẫn giữ viện của mình; Hà Châu có thể thất bại và bán bản tính tải. Không có romance bắt buộc hay tình cảm đồng loạt. Tình thân và đồng nghiệp đã đủ làm thời gian có sức nặng.

## 13. Major Story Arcs

| ARC ID | Phạm vi | Mục tiêu player / xung đột / thay đổi cuối arc |
| --- | --- | --- |
| ARC-NF-001 · Một nghề để sống | Ch.1–3, phàm nhân đến cơ hội dẫn khí | Kiếm sinh kế, học kiểm chứng; lô thuốc và bảo chứng. Có nghề/đường học, biết hiểm họa nhỏ; có thể chưa đột phá nếu hoãn |
| ARC-NF-002 · Một chỗ để tu | Ch.4–6, Luyện Khí/chuẩn bị Trúc Cơ | Chọn tổ chức hoặc hợp đồng độc lập; tranh suất và mùa thuốc. Trạm cũ đổi chủ, lựa chọn để lại quyền truy cập và nợ |
| ARC-NF-003 · Một tuyến để giữ | Ch.7–9, Trúc Cơ/chuẩn bị Kim Đan | Chuẩn bị bí cảnh và đi tuyến xa; dự án mở nguồn. Thấy cả người hưởng lợi và vùng bị giảm khí; công bố hoặc giữ bằng chứng |
| ARC-NF-004 · Một bản đồ chưa đủ | Ch.10–12, Kim Đan/chuẩn bị Nguyên Anh | Đối chứng lưu vực khác, mất hiệu suất ngoài nguồn quen; gia đình và bạn nghề đổi đời trong khi main đi xa. Hiểu cấu trúc hồi ổn, không tìm thần khí |
| ARC-NF-005 · Một phương án có giá | Ch.13–15, Nguyên Anh/cơ hội Hóa Thần | Làm pilot, xây quyền tiếp cận, thương lượng tổn thất; thử nghiệm có thể thất bại. Chọn mô hình vận hành và thu hẹp điều mình hứa |
| ARC-NF-006 · Còn đường phía trước | Ch.16–18, kết thúc một hành trình | Giải quyết dự án vùng và nghĩa vụ của player; Hóa Thần chỉ cần cho tuyến điều khiển mạng trực tiếp. Kết thúc xác lập kiểu đời sống, không khóa mọi bí mật thế giới |

**Nhịp thời gian tham chiếu, chưa cân bằng:** arc 1 khoảng vài tháng–1 năm; arc 2 khoảng 2–5 năm; arc 3 khoảng 5–12 năm; arc 4 khoảng 12–25 năm; arc 5 khoảng 25–60 năm; arc 6 tùy đường đi và tuổi còn lại. Đây là thời lượng trong từng arc, không năm mốc cộng dồn hay lịch đột phá bắt buộc. Các mốc đời sống cần được tính từ tổng thời gian thực của nhánh. Có thể kết thúc ở bậc thấp hơn; Hóa Thần là mục tiêu hiếm của tuyến trường sinh dài, không kết quả mặc định của 18 chương. Time skip chỉ chốt khi player đồng ý một chuyến đi/đóng quan có thời lượng báo trước và biết nghĩa vụ nào có thể đến hạn; thư và lịch người thay giúp nhìn thấy điều đã đổi.

Cảnh giới là năng lực cần đạt cho cách giải quyết cụ thể, không điều kiện máy móc để đọc chương. Player chậm tu có thể thuê/hợp tác cho việc cao bậc nhưng phải trả phí, mất quyền quyết định kỹ thuật và vẫn chịu nguy hiểm. Đường nghề không cho thắng giao đấu bằng tiền tự động.

## 14. High-Level Chapter Roadmap

Mọi CHAPTER-NF là outline. Không phải chương runtime 01; không ấn định số scene, thoại hay quest chi tiết.

| ID | Tiêu đề / mục tiêu | Xung đột, thông tin, lựa chọn và thay đổi / hook |
| --- | --- | --- |
| CHAPTER-NF-01 | Bến thiếu một chuyến · kiếm công và kiểm lô thuốc | Thiếu ca/thiếu tiền; nghi kho sai. Giao, kiểm hoặc từ chối; một khoản bảo chứng và mối quan hệ thay đổi. Hook: dấu ẩm xuất hiện cả ở kho khác |
| CHAPTER-NF-02 | Giá một lời chỉ đường · mua kiến thức dẫn khí | Người bán sách và người dạy giữ lợi ích khác nhau. Chọn nghề/học có kiểm chứng; học phí và thời gian có giá. Hook: mẫu thuốc nơi nguồn cũng nhiễm |
| CHAPTER-NF-03 | Mùa hái sớm · kiếm tài nguyên tu luyện | Bùi Sương và đội thu mua cần cùng khoảnh cây. Chờ, chia, bán tin hoặc rút; kết thúc bí ẩn lô thuốc, đổi sản lượng sau. Hook: quyền thuê nguồn sắp đổi |
| CHAPTER-NF-04 | Suất dưới mái thấp · tìm nơi tu | Cạnh tranh thời gian phòng tu, không đấu sinh tử vô cớ. Nhận nghĩa vụ hoặc thuê ngoài; quyền truy cập có điều kiện. Hook: hai trạm cùng sai pha |
| CHAPTER-NF-05 | Sổ không khớp van · kiểm tuyến | Người được cứu cần giữ khí, người trồng cần dòng cũ. Mua sổ hay đo thực địa; biết một phần tải. Hook: van mở đúng dấu phê duyệt |
| CHAPTER-NF-06 | Cổng vẫn đóng · chọn cách dựng nền | Đủ tu vi chưa đủ nơi và vốn. Hoãn, vay hoặc đổi công pháp; trả lời ai đổi van, dự án vẫn tiến. Hook: đường vòng qua công trình cũ mở mùa tới |
| CHAPTER-NF-07 | Lối về phải đặt trước · chuẩn bị vào bí cảnh | Bản đồ cũ và đoàn đối thủ không đồng ý lịch. Đặt neo, thuê thợ hoặc chỉ bán tin; cơ hội có người lấy trước. Hook: tiếng van trong công trình vẫn chạy |
| CHAPTER-NF-08 | Xưởng Trầm Lưu · lấy mẫu và tìm lối ra | Không đủ tải cứu mọi nhóm/lấy mọi vật. Ưu tiên người, mẫu hoặc công cụ; bản đồ hồi lưu có phần thiếu. Hook: cấu kiện giống ở lưu vực xa |
| CHAPTER-NF-09 | Giá của tuyến mới · dự án chuyển nguồn | Player có bằng chứng nhưng chưa có quyền. Công bố, thương lượng, bán hoặc giữ; phân phối và uy tín đổi, kế hoạch vẫn có thể hoàn thành. Hook: cần dữ liệu nơi khác |
| CHAPTER-NF-10 | Ra khỏi nguồn quen · gây dựng tại vùng mới | Công pháp giảm hiệu suất; phải kiếm việc và thử điều chỉnh. Dò đường đá nổi theo nhịp khí, thử thuyền và trả phí neo trú. Chọn đầu tư nguồn mới hoặc trở về; mở MYST-NF-004. Hook: nơi này từng nối một tuyến hồi |
| CHAPTER-NF-11 | Người ở nhà đã đổi · đối diện thời gian | Thư tới muộn, ca nghề có người thay, quan hệ không đứng yên. Về thăm, trả người chăm sóc hoặc giữ chuyến khảo sát; mỗi lựa chọn bỏ lỡ điều cụ thể. Hook: bản kê hai vùng không thể cùng đúng |
| CHAPTER-NF-12 | Hai phép đo, một vết nứt · đối chứng | Hồ sơ và mẫu khác thời điểm. Vượt một tuyến thú di cư để lấy mẫu cùng thời điểm, hoặc trả đội nghề và công bố kết luận hạn chế; bác lời giải “một kẻ phá mọi nguồn”. Hook: pilot cần quyền đi qua ba địa bàn |
| CHAPTER-NF-13 | Chỗ cho một phép thử · xây liên minh | Mọi bên muốn người khác giảm phần trước. Chọn phạm vi nhỏ hoặc vốn lớn có điều khoản; không mặc định làm chủ liên minh. Hook: thiết bị thử bắt đầu lệch |
| CHAPTER-NF-14 | Vành đứt có nhịp · kiểm giả thuyết | Mẫu đại lục và hành lang xác nhận chu kỳ hồi ổn; cần đội bảo vệ. Đặt chuỗi trạm nghe vách đá, giữ đường rút khi nhịp đảo; đổi mục tiêu hoặc chịu rủi ro đo bổ sung. Trả lời cốt lõi MYST-NF-001. Hook: phương án có vùng được và mất |
| CHAPTER-NF-15 | Ai nghỉ một mùa · chia tổn thất | Thử hồi lưu đòi giảm tải trước khi có lợi. Đền bù, bán quyền hoặc chọn nguồn riêng; thử nghiệm có thể chỉ đạt một phần. Hook: quyết định vận hành không thể hoãn mãi |
| CHAPTER-NF-16 | Van không tự quay · quyết định dự án vùng | Pilot và hợp đồng giới hạn khả năng. Điều khiển trực tiếp, ủy quyền kiểm soát hoặc rút khỏi mạng; trả lời hiệu quả hồi lưu theo điều kiện đã đo |
| CHAPTER-NF-17 | Những món nợ còn tên · giải quyết hậu quả | Không đủ tài sản trả mọi tổn thất. Thương lượng, chịu trách nhiệm hoặc bỏ đi có truy đòi; phản ánh bạn nghề/chỗ ở đổi vì lựa chọn |
| CHAPTER-NF-18 | Mùa sau · kết thúc mở có ranh giới | Xác lập nguồn tu, quan hệ và con đường tiếp tục. Không boss vũ trụ bắt buộc, không cảnh chứng nhận trường sinh vô hạn; lời hứa vùng được trả trước khi mở chân trời mới |

## 15. Endgame Direction

Climax là chọn và thực hiện một phương án vùng có dữ liệu nhưng còn bất định, trong khi nhiều người cần kết quả ngay. Có thể có chiến đấu bảo vệ trạm hoặc ngăn cưỡng chiếm; không bắt buộc giết Tống Khê để hệ sinh thái được chữa.

| Hướng kết thúc | Điều kiện dự kiến | Điều được / điều bỏ / dấu vết dài hạn |
| --- | --- | --- |
| END-NF-001 · Người giữ mùa | Pilot có hiệu quả, quyền vận hành hợp lệ và có quỹ duy trì | Có nguồn tu ổn hơn, gắn với vùng; chậm đường đi xa. NPC không tự hết nợ; năm sau vẫn cần phân phối |
| END-NF-002 · Người đi mang bản đồ | Có bằng chứng sao lưu và đã xử lý nghĩa vụ hoặc ký thỏa thuận trả dần | Giữ tự do hành trình, chia/bán tri thức theo lựa chọn; mất quyền dùng nguồn cũ ưu tiên. Vùng vận hành bởi người khác |
| END-NF-003 · Động phủ riêng | Có quyền hoặc đủ lực chiếm nguồn riêng, dự trữ và phương án an ninh | Tu luyện thuận trước mắt; thu hẹp quan hệ, chịu phản ứng pháp lý/chính trị. Không kết án bằng một đoạn giảng đạo, không miễn chi phí khai thác |
| END-NF-004 · Đời sống đã chọn | Chủ động dừng đuổi bậc tiếp theo; có sinh kế hoặc thỏa thuận rời nghề | Một kết thúc hợp lệ với tuổi hữu hạn; nghề và người còn lại phản ánh hành động. Không ghi “bad ending” chỉ vì không lên đỉnh |

Trục ending gồm nguồn sống, nghĩa vụ, quyền kiểm soát và cách dùng tri thức; không tính bằng thanh thiện/ác. Nếu pilot thất bại, player vẫn có đường rời vùng, nghề khác hoặc sống với phương án giảm hại. Không bắt phải lên Hóa Thần để mọi ending được coi hoàn thành.

## 16. Major Foreshadowing Plan

| ID | Setup → reminder → payoff | Nguồn / khả năng bỏ lỡ / bảo vệ bí mật |
| --- | --- | --- |
| FORESHADOW-NF-001 | Ch.1 dấu ẩm cùng hướng → Ch.3 mẫu nguồn → Ch.3 hiểu tạp nhiễm và bảo quản cùng góp phần | CLUE-NF-001 vải bọc; CLUE-NF-002 mẫu cây. Nếu bỏ lô, có mẫu từ kho khác ở Ch.2; không cho player kết luận trước đo |
| FORESHADOW-NF-002 | Ch.4 mực nước bình thường nhưng số đo khí lệch → Ch.5 đo lặp → Ch.12 so hai lưu vực | CLUE-NF-003 cặp sổ nước/khí. Không học nghề thì thuê đo hoặc mua bản chứng có nguồn; không tự thưởng kỹ năng |
| FORESHADOW-NF-003 | Ch.5 sổ viện nhận khí trước ngày van thay → Ch.6 lệnh có phê duyệt → Ch.9 hiểu cái giá dự án | CLUE-NF-004 sổ nhận; CLUE-NF-005 lệnh van. Tống Khê tin cứu người đáng làm, không biết toàn mạng |
| FORESHADOW-NF-004 | Ch.7 cấu kiện có đường hồi bị bịt → Ch.8 mẫu bản vẽ → Ch.14 cơ chế hồi ổn | CLUE-NF-006 cấu kiện; CLUE-NF-007 bản vẽ. Nếu không vào bí cảnh, đoàn khác bán mẫu ở Ch.10; giá và người giữ quyền khác |
| FORESHADOW-NF-005 | Ch.10 hiệu suất đổi theo chu kỳ → Ch.12 dữ liệu lệch thời điểm → Ch.16 pilot chỉ tốt trong dải điều kiện | CLUE-NF-008 sổ đối chứng. Pilot thành công không là phép chữa tất cả; sai dự báo phải để lại cảnh báo |
| FORESHADOW-NF-006 | Ch.2 lịch chăm con của Tạ Miên → Ch.6 người học nghề thay ca → Ch.11 con đã có việc khi player trở về | CLUE-NF-009 thư/lịch nghề. Player biết qua thư hoặc gặp người thay, không tự có ký ức chuyến thăm đã bỏ |

Revelation cần hai loại bằng chứng độc lập trước khi cho phép kết luận mạnh: vật/mẫu và hồ sơ/đo lặp. Mua báo cáo đã kiểm có thể thay thao tác nhưng tốn tiền và không trao quyền sở hữu mẫu. Thông tin có thể đến muộn với phạm vi hẹp; clue bù không giữ nguyên phần thưởng của người khám phá sớm.

## 17. Gameplay ↔ Narrative Loop

Nghe tin → xét nguồn và thời hạn → chọn mục tiêu → dự trù vật tư/quỹ hồi phục → khảo sát → thấy dấu người khác → đánh giá lại → thương lượng/ẩn mình/tranh đoạt/rút → trở về và kiểm chứng → thế giới phản ứng theo việc thật xảy ra → chọn đầu tư hoặc trả nợ.

**Bí cảnh đề xuất LOC-NF-007 · Xưởng Trầm Lưu** ở Ch.7–8:

- **Origin:** cơ sở thử hồi khí cũ bị nước và đá bồi lấp; vùng khí khép theo nhịp van khiến chỉ mở một phần mỗi mùa.
- **Rule:** lấy khí ở một phòng làm áp tăng ở phòng khác; tải hành trang và pháp khí ảnh hưởng tốc độ đóng cửa. Có dấu đo trước hành động gây thay đổi, không bẫy vô cớ.
- **Resource:** vật liệu chịu lệch pha, mẫu cấu kiện, bản ghi thử cũ; không rương vô tận.
- **Danger:** đường rút đổi khi van chuyển, tạp nhiễm và hộ trận lỗi; tu sĩ mạnh dễ tạo tải vượt ngưỡng nên sức mạnh không thay việc khảo sát.
- **Competition:** đội thợ muốn mẫu, thương đoàn muốn vật liệu, tán tu muốn bán bản đồ; họ có lịch và có thể rút trước.
- **Mystery:** sơ đồ công trình có đường hồi bị bịt từ những lần sửa khác nhau, không cùng một mệnh lệnh bí mật.
- **Consequence:** lấy quá nhiều cấu kiện làm mùa sau khó vào hơn; bán bản vẽ thay quyền thương lượng; người mất tích tạo việc tìm kiếm, khoản bảo hiểm và người kế nhiệm.

**Cơ duyên mẫu:** dấu cây chín sớm → điều tra độ nhiễm → biết Bùi Sương cũng giữ tin → chọn đợi, chia, bán quyền hoặc rút → đội thu mua đến theo hợp đồng riêng → kết quả thay mùa sau và uy tín bảo chứng. Không đảm bảo người giúp NPC sẽ được linh dược quý hơn.

**Death:** người chết không hồi sinh bằng đan phổ thông. Cái chết có nguyên nhân, dấu cảnh báo và hậu quả theo vai trò: hợp đồng chuyển ai, dụng cụ thuộc ai, người được chăm sóc sống bằng gì. Không định sẵn giết một bạn nghề để làm main trưởng thành. Nếu Đỗ Nghi chết, chứng chỉ không truyền thẳng cho player; hội nghề kiểm người tiếp quản.

**World clock đề xuất — RULE-NF-005:** trước khi chốt ca/chuyến đi/nghỉ/đóng quan, UI báo thời lượng hoặc khoảng thời lượng có nguyên nhân bất định. Mọi hoạt động lặp sinh lợi đều tiêu thời gian; đọc thoại, xem menu và đóng app không tiêu thời gian. Khi chốt hành động, mô phỏng tiến các dự án đang đủ ngân sách/người/vật liệu trên đoạn thời gian ấy, dù player làm việc không liên quan. Thiếu điều kiện thì hoãn hoặc đổi quy mô theo agenda, không tự coi deadline là hoàn thành.

Ví dụ EVENT-NF-001: ở T0 đang gom vật liệu, van cấp tạm dự kiến mở sau 12 ca tương đương nếu đoàn hàng tới đúng hẹn; có thể hoãn 3–5 ca nếu tuyến ngập. Nhánh phụ đầy đủ cần nhiều mùa/năm, quyền tiếp cận và các đội xây riêng; Ch.5–9 tiếp xúc các giai đoạn sau, không kéo dài một deadline 12 ca thành nhiều năm. Nếu player tu chậm hoặc bỏ đi lâu, có thể trở lại khi nhánh đã mở và chọn giảm hại/tái thương lượng thay vì được quyền ngăn việc đã hoàn thành. Kỷ Vân có lịch dự kiến, Mạc Du có tin hàng; player cần hỏi để biết độ chắc. Trước một lựa chọn vượt qua mốc mà player đã biết, UI nhắc nguy cơ; mốc chưa biết chỉ có dấu gián tiếp, không cảnh báo toàn tri. Sau khi trở lại, dấu van, giá hàng và nhân sự phản ánh kết quả; không bắt mọi thay đổi phải đợi player nói chuyện NPC. Không có player, lịch vẫn tiến qua thời gian của các ca khác.

Nghỉ hồi phục và ca sinh kế cơ bản cũng tiến lịch; không có farm vô hạn trong một mùa. Những biến động ảnh hưởng sinh tồn phải được báo bằng dấu có thể tiếp cận, nhưng không hứa giữ mọi cơ hội. NPC không chết vì player mất mạng vài ngày ngoài đời. Cơ chế mới chưa nối vào đồng hồ tuổi runtime, cần thiết kế chuyển đổi riêng trước triển khai.

**Rút lui:** trước khu nguy hiểm có cơ hội thu thập dấu thực lực và đặt đường về. Rút trước giao chiến thường giữ vật tư chưa dùng; trong truy đuổi có thể bỏ tải, phá neo hoặc mất tiền đặt cọc. Đường về đã chuẩn bị cải thiện cơ hội, không bảo đảm sống. Một mục tiêu rút được là thành công sinh tồn, không thất bại đạo đức.

**Branch budget:** mỗi arc tối đa một nhánh cấu trúc lớn, hai tuyến tới cùng mốc tổng kết; arc cuối dùng tối đa hai tuyến giải quyết dự án rồi bốn biến thể epilogue END-NF, không bốn campaign riêng; mục tiêu 2–4 node outline riêng mỗi nhánh khi lập kế hoạch sau. Chưa cấp ngân sách dialogue. Các khác biệt về nợ, tri thức, quyền nguồn và người sống tiếp tục qua điểm nhập; không reset quan hệ để giảm chi phí viết.

## 18. Early Game Vertical Slice

**VS-NF-001 — Một chuyến thuốc trước mưa.** Phạm vi thử tương lai khoảng 25–40 phút tổng, chia các phiên 3–10 phút; thuộc ARC-NF-001, chưa phải kế hoạch chi tiết Ch.1. Chỉ một bến, kho, đoạn đường và điểm giao; ba NPC có agenda: Tạ Miên giữ hợp đồng, Đỗ Nghi kiểm mẫu để bảo vệ nghề, người nhận thuốc cần hàng đúng hạn.

Player nhận hoặc từ chối lô nghi hỏng → hỏi/so lô khác/tự thử có rủi ro → chọn chi tiền kiểm hay giữ quỹ → đi đường an toàn có phí hoặc đoạn ngắn còn dấu sạt → gặp nguy cơ và có cơ hội rút → giao có cảnh báo, niêm để kiểm thêm hoặc hoàn hàng → nhận công/bồi thường theo điều khoản → thấy kho, lịch giao và quan hệ đổi.

Thử gameplay: lựa chọn thông tin, tải vật tư, đường rút và một hành động pháp khí do người thuê cho dùng thử dưới giám sát; không ban Luyện Khí vì hoàn thành một quest. Tiếp xúc linh khí có thể là quan sát dụng cụ, chưa phải tự thi triển.

**Sàn sinh kế:** ca phân loại/đếm bao dưới giám sát không cần đặt cọc hay dụng cụ riêng, đổi lấy một ngày ăn/ngủ và phần công nhỏ. Vay đồ chỉ dùng trong ca, không giữ làm vốn miễn phí. Ca luôn có thể tiếp cận sau hồi phục cơ bản, nhưng mất thời gian và không đủ dư để mua tài nguyên quý nhanh. Thương tật nặng cần nhận chăm sóc thành khoản nợ; nếu thân thể mất khả năng nghề cũ, có nhiệm vụ nhẹ hơn với thu nhập thấp. Nợ hạn chế hợp đồng cao và giữ nghĩa vụ trả, không khóa quyền sống. Sàn này không bảo đảm bất tử trong vùng nguy hiểm.

Điều khoản mẫu báo trước: hoàn kiện nguyên vẹn trước mốc giao chỉ mất công và phí đường đã chi; niêm có bằng chứng dẫn tới tranh chấp trả công; mất kiện do liều ngoài tuyến bảo chứng tạo bồi thường; bị cướp trên tuyến bảo chứng phải trình chứng cứ để chia trách nhiệm. Không đánh đồng chạy thoát với mất hàng.

**Kết quả dự kiến:** giao và che dấu tăng tiền trước mắt nhưng tạo trách nhiệm kiểm về sau; niêm có chứng cứ giảm tiền công nhưng giữ bảo chứng; hoàn hàng/rút giữ sức khỏe và mở ca kho khác với thu nhập thấp hơn. Không có phương án vừa nhiều tiền, vừa mọi NPC thích, vừa toàn bộ bí mật.

**Bằng chứng cần playtest:** player nói được vì sao đang nghi lô thuốc; biết tiền còn lại và đường rút; hiểu chi phí của quyết định trước khi chốt; ít nhất hai phương pháp hoàn thành có người chọn; người từ chối vẫn tìm được sinh kế; nhận thấy một NPC hành động vì mục tiêu riêng. Không gán score cho kết quả chưa thử.

**Dependency chưa có trong runtime:** nhận/từ chối hợp đồng, sổ tin có nguồn, chi phí chuyến đi, phản ứng NPC và mốc world clock. Slice đầu tránh chiến đấu AI, mô phỏng kinh tế toàn vùng và cảnh đột phá nhiều bước; các phần đó cần thiết kế/triển khai riêng.

---

**Điểm dừng:** foundation → critique → tối đa ba vòng revision → dừng. Chỉ sau bước tiếp theo do người dùng chọn `PLAN ARC 1 / CHAPTER 1` mới lập current/next chapter; chỉ current chapter mới sản xuất scene. Lifecycle dự án: IDEA → OUTLINED → PLANNED → DRAFTED → REVIEWED → APPROVED → IMPLEMENTED → PLAYTESTED → CANON_LOCKED. Foundation này không phải sự kiện đã xảy ra và không khóa canon.
