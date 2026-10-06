# Narrative Review — ARC 1 v0.1

**Artifact:** REVIEW-ARC1-001/r1. **Nguồn cuối:** ARCH-ARC1-001/r1, ARC-NF-001 và CHAPTER-NF-01–03.  
**Baseline:** foundation r1 được người dùng duyệt ngày 2026-10-05; INIT-NF-001/r1 + [approval/context](../bible/arc-1-context-v0.1.md).  
**Phương pháp:** áp dụng story-reviewer sau architect trên cùng tác nhân, không là review độc lập. Phạm vi 17 mục kiến trúc, chưa có scene/thoại hoặc playtest. Continuity-manager report chưa có; độ tin cậy vừa cho cấu trúc, chưa xác minh trải nghiệm thực.

## Review r0 — findings và revision

Nguồn r0 SHA-256: `07392ce691fa49bce47cc0c26472df3436922b2899deba1715e79008cec7ca9d`. r0 đã được thay bằng r1; những đoạn làm căn cứ được giữ ngắn dưới đây.

| ID / mức / owner | Problem và tác động | Yêu cầu sửa / acceptance |
| --- | --- | --- |
| REV-A1-001 · MUST FIX · architect | §15 Ch.3 cho tuyến không vào vườn “dùng báo cáo có nguồn”, §11 nói báo cáo tốn phí; người hết vốn có sàn sống nhưng chưa có đường bằng chứng/học độc lập. Nghèo có thể khóa kết luận hoặc buộc gia nhập tông môn | Có đường đổi lao động lấy kết luận đã kiểm, không cần đồ/vốn; giữ thời gian và mất lợi thế. Cả đường học độc lập có phương án thanh toán phù hợp. Không tự cấp kỹ năng hay xóa nợ |
| REV-A1-002 · MUST FIX · architect | §16 yêu cầu mang hàng ra “trước khi dấu nhiễu vượt dải an toàn” nhưng chưa quy định dấu bắt buộc, forecast và tuyến tới sau mùa. Dễ thành tai nạn tùy tác giả hoặc mùa chờ main | Cảnh báo trước cam kết dù bỏ node tùy chọn; thời gian tới từ nguồn; đến muộn xử lý hàng/hồ sơ sau mùa, giữ thiệt hại. Không dựng lại vườn hoặc đổ mọi nguyên nhân lên van |
| REV-A1-003 · SHOULD FIX · architect | §4 Mạc Du “có thể” chuyển hợp đồng/hạn chế bảo chứng; còn là áp lực trừu tượng, chưa chứng minh một kẻ đối kháng thực sự lựa chọn chống lợi ích main | Có hành động chủ động giữ quyền mua và chuyển trách nhiệm bằng điều khoản được xem trước ký. Từ chối mất ưu tiên nhưng giữ quyền sống/báo cáo; không biến ông thành kẻ gây mọi tai nạn |

**Điểm r0:** hook 8, agency 7, character 7, conflict 8, pacing 7, emotional 7, mystery 8, gameplay 7, environmental 8, payoff 7. Tổng 74/10 = **7.4/10**. Dialogue N/A; continuity not verified. Hai MUST FIX chặn handoff kiến trúc dù điểm trung bình chấp nhận được.

## Overall Score — review lại r1

| Dimension | Điểm | Bằng chứng trong Arc 1/r1 và giới hạn |
| --- | --- | --- |
| HOOK | 8 | §2/§15: giữ đồ nghề hôm nay, tìm cách đi xa trước khi già; lô hỏng vẫn được mua cao |
| PLAYER AGENCY | 8 | §12–13/§16: chọn phạm vi cam kết, rút, hoãn, đổi công lấy kiểm; tới muộn không tua thế giới |
| CHARACTER QUALITY | 8 | §4/§7: Mạc Du chọn giữ lợi ích dù biết lý do trì hoãn; Bùi Sương và người nhà có agenda, không chỉ trao quest |
| DIALOGUE | N/A | Chưa có thoại; không chấm voice/subtext từ profile |
| CONFLICT | 8 | §4/§16: tiền học và nguồn nguy hiểm cùng chuỗi, quyền mua giới hạn hành động; có bên thật sự chịu hụt |
| PACING | 8 | §6/§14–15: cân/mang → sửa/học → thăm vườn/chia phần; vài tháng chuẩn bị một ngưỡng. Thời lượng phiên Ch.2–3 cần kiểm |
| EMOTIONAL IMPACT | 7 | §2/§5/§13: giữ đồ nghề, trở về còn sức, học chấp nhận mất phần cơ hội; cảm xúc chưa chứng minh bằng scene |
| MYSTERY / CURIOSITY | 8 | §10–11: nguyên nhân kép trả sớm bằng mẫu/đối chứng; không lấy bệnh làm bằng chứng toàn mạng |
| GAMEPLAY INTEGRATION | 8 | §6/§12–16: tải, kiểm, chi phí, nghỉ, quyền truy cập và công pháp đều thay cách giải; chưa implementation |
| ENVIRONMENTAL STORYTELLING | 8 | §8/§11/§16: cọc nước, vải ẩm, lá đọng sương và cây chín có tác dụng quan sát; dấu dẫn rút có payoff |
| CONTINUITY | Not verified | Đã đối chiếu foundation/index nhưng không có report continuity-manager; không coi tự kiểm là PASS |
| PAYOFF | 8 | §3/§13/§16: trả lời thuốc, trả công/trách nhiệm và năng lực nhỏ; khác biệt phàm nhân/Luyện Khí vẫn thật |

**Overall: 7.9/10 = 79/10**, trung bình mười chiều có điểm; loại dialogue và continuity. Điểm đều là đánh giá kiến trúc tạm thời, không score game. **Không còn MUST FIX mở trong phạm vi Arc 1 architecture.** Chưa đủ để tuyên bố scene canon, balance hoặc release.

## Strong Elements

- Một ngưỡng cảnh giới có chẩn đoán, công pháp, nơi tu, thời gian và phục hồi (§6). Thắng cao trào không bằng buff bất ngờ.
- Quyền hạn của main vừa với năng lực: tự quyết phần giao và lời khai, chưa đóng toàn tuyến (§4/§16).
- Phương án nghèo/hoãn/tới muộn giữ agency và tổn thất; không biến lựa chọn rút thành load lại (§13/§16).

## Critical Problems / Chapter-level Problems

Scene-level N/A: chưa có Scene ID hoặc Scene Brief. Findings áp dụng chapter/decision IDs. REV-A1-001/002 đã sửa ở §13/§16; REV-A1-003 đã sửa ở §4. Đường hoãn dẫn khí là kết thúc đúng foundation, không được marketing/narration gọi thành đã đạt Luyện Khí.

Ch.1 cần ít nhất một phát hiện/biến đổi hợp đồng trước kết mốc. Ch.2 có nguy cơ thành menu học; giữ sửa/kiểm/dừng như tác vụ thay đổi quyết định. Ch.3 cần kết khác cho người đến sớm và đến muộn; r1 mô tả mất quyền hái/lợi giá, không chỉ đổi một lời thoại.

## Player Agency Analysis

Main gây kết quả hàng, nguồn học và cam kết. NPC không tự giải lô rồi trao phần thưởng. Tuyến độc lập/học việc là nhánh lớn duy nhất, khác người kiểm/nghĩa vụ nhưng nhập lại tại đánh giá; không union tri thức/ownership. Flavor không được quảng cáo là narrative choice.

**Agency test:** bỏ main, mùa vẫn tiến và người mua vẫn đến, nhưng phần khai báo/cam kết/lợi ích của main không tồn tại. **Failure test:** không vốn vẫn sống và đổi công lấy kiểm; đến muộn mất cơ hội thật; không đầu tư dẫn khí vẫn giữ trạng thái phàm nhân.

## Character Analysis

Đỗ Nghi thu phí và phải nuôi đội, Tạ Miên có giờ chăm con, Mạc Du có quyền từ chủ vốn, Bùi Sương có vườn/nợ: việc họ làm không chỉ vì main. Không áp tình cảm bằng tổng điểm; cần diễn đạt tin về chuyên môn hoặc hợp đồng cụ thể. Giữ secret biết/không biết theo §10, tránh cho Đỗ Nghi giải thích toàn đại lục.

## Dialogue Analysis

N/A; chưa viết. Kiến trúc dành phát hiện chủ chốt cho vải, mẫu, dụng cụ và hồ sơ thay vì độc thoại lore. Không có nhiệm vụ dialogue writer trong lượt này.

## Pacing Analysis

**Boredom test:** bỏ Ch.1 mất động lực/kiện/trách nhiệm; bỏ Ch.2 mất phương pháp/giới hạn/quyết định học; bỏ Ch.3 mất đối chứng/cao trào/hậu quả. Các lần cân/kiểm lặp trong một chương chỉ giữ khi đổi nguồn tin, chi phí hoặc khả năng cam kết. Học qua tháng truyện không phải yêu cầu grind nhiều phiên giống nhau.

**Immediate engagement:** Ch.1 muốn biết vì sao kho khác cùng dấu; Ch.2 cần cân nhắc cơ hội thuốc đã đặt mua; Ch.3 cần nguồn tu dài hạn vì quyền thuê sắp đổi. Không cần twist huyết thống để nối chương.

## Mystery / Foreshadowing Analysis

Hai nguồn bằng chứng và các đường bù có giá bảo vệ kết luận MYST-NF-002. Lá/sương không tự suy thành cơ chế hồi lưu; cảnh báo phải có acquisition hoặc quan sát bắt buộc trước nguy hiểm. MYST-NF-003 chỉ gợi mở, MYST-NF-001 không mở sớm. Lịch Tạ Miên là setup chưa payoff, phải giữ receipt khi nội dung được viết sau này.

## Gameplay Integration Analysis

Năng lực đầu đổi một tác vụ đo ở nơi ổn định, không thay toàn traversal/combat. Tới muộn dùng đối chứng/hợp đồng thay thu hái; mất tài nguyên vẫn có dấu trong tổng kết. Clock phản ánh agenda độc lập; không dùng đóng app làm thời gian trôi. Cần thiết kế/implementation riêng trước khi chứng minh balance.

## Recommended Changes và trạng thái

- **MUST FIX:** REV-A1-001/002 CLOSED trong r1, acceptance có đường cụ thể tại §13/§16. Không giữ blocker dưới dạng lời hứa sửa sau.
- **SHOULD FIX trước implementation:** owner gameplay/implementer, prototype ngân sách ca–học–hồi phục để tránh ca cơ bản kéo dài quá mức; kiểm hai phương pháp dẫn khí không thành lựa chọn thống trị. Ngoài phạm vi task hiện tại.
- **SHOULD FIX khi được yêu cầu lập nội dung chi tiết:** owner architect, chia Ch.2 thành tác vụ thay đổi quyết định thay vì danh sách lecture; giữ ngân sách tối đa hai node riêng mỗi đường học. Chưa sản xuất Scene Brief.
- **OPTIONAL:** đặt tên địa điểm con/người thợ gia đình khi cần, không cần thêm cast trong arc hiện tại.

## Rewrite Instructions / Handoff

**Architect:** revision r1 đã thực hiện; giữ 17 mục, ba chapter IDs, một ngưỡng, một nhánh lớn, state/knowledge guards và bí mật foundation. Không thêm Arc 2 để vá payoff.

**Game-story-writer:** chưa mở task; không viết scene. Khi được yêu cầu sau này, giữ đường không vốn/hoãn/tới muộn và điều khoản thấy trước ký. Mỗi acquisition/receipt phải có nguồn; không gọi thao tác giám sát là main tự thi pháp. Dialogue và continuity/review cần chạy trên nội dung thực được tạo khi đó.

**Bible owner:** approval foundation được ghi nhận, proposal Arc 1 vẫn chờ người dùng duyệt; không canon commit từ điểm review. Review này hoàn tất một vòng critique → revision → review lại và dừng ở Arc 1 architecture.
