# Narrative Review — STORY FOUNDATION v0.1

**Artifact:** REVIEW-FOUNDATION-001.  
**Phạm vi:** 18 mục foundation, kiến trúc/outline/vertical slice; không chấm scene hay thoại chưa viết.  
**Phương pháp:** áp dụng rubric của `story-reviewer`, đổi vai phản biện trên cùng tác nhân; không phải đánh giá độc lập từ một người hoặc agent khác.  
**Baseline:** repository `fc9f5f44ad4632d3bde72d616bfde532d3a42f8a`; chưa có canon bible được duyệt; chưa có continuity report.  
**Giới hạn:** điểm đánh giá khả năng của thiết kế trên giấy, không phải chất lượng game đã chơi; không xác nhận tính độc đáo tuyệt đối trên toàn bộ tác phẩm tu tiên.

## Lượt review đầu — foundation r0

Nguồn r0 SHA-256: `f476b28aeb72f4ce2cdcf6bbbd021f9ea24519825e1ccebc66e3cd47ffdddecd`. Các đoạn bị sửa được ghi bằng trích dẫn ngắn ở finding bên dưới; bản foundation đang đọc sau revision là r1.

| Dimension | Điểm | Bằng chứng r0 |
| --- | --- | --- |
| HOOK | 7 | §4 lô thuốc vừa “hỏng” vừa được mua cao tạo câu hỏi; khao khát trường sinh vẫn chung |
| PLAYER AGENCY | 7 | §18 từ chối/niêm/giao có giá; chưa bảo vệ khỏi softlock hết vốn |
| CHARACTER QUALITY | 8 | §9 Bùi Sương, Tống Khê, Tạ Miên có agenda và giới hạn khác nhau |
| DIALOGUE | N/A | Không có full dialogue trong scope |
| CONFLICT | 8 | §10 người giữ viện và người trồng cùng cần một nguồn |
| PACING | 6 | §14 có 18 chương nhưng chưa phân biệt các lần kiểm sổ và chưa neo khoảng năm |
| EMOTIONAL IMPACT | 6 | §12 có ý tưởng thời gian và tự cô lập; chưa có hình ảnh đời thường làm động lực thành cụ thể |
| MYSTERY / CURIOSITY | 8 | §11 không có chủ mưu toàn tri; đáp án thuốc được trả sớm |
| GAMEPLAY INTEGRATION | 7 | §5 cảnh giới có động tác mới; §17 world clock thiếu quy tắc chốt lượt và báo trước |
| ENVIRONMENTAL STORYTELLING | 7 | §16 mẫu/vải/sổ/cấu kiện; tương tác hiện thiên về đo và đọc |
| CONTINUITY | Not verified | Chưa có report continuity; các xung đột repo cần tách rõ trong package |
| PAYOFF | 7 | §15 ending và §16 clue bù có điều kiện; chưa giải xung đột thất bại hợp đồng với đường tiến |

**Overall: 7.1/10**, trung bình 10 chiều có điểm (71/10). Hai chiều loại trừ như trên. Điểm không xóa blocker.

## Critical Problems và revision routing

### REV-NF-001 · MUST FIX · world clock chưa đủ công bằng

**Nguồn:** r0 §17: “thời gian truyện tiến khi chốt chuyến đi, ca làm, nghỉ hồi phục hoặc đóng quan”.

**Vấn đề:** chưa biết thời lượng được báo khi nào, có thể dùng ca làm lặp để farm không tiến thế giới không, hoặc bị chuyển mùa bất ngờ sau một menu nghỉ. NPC “tự hành động” đang là lời hứa thiếu quy tắc kiểm chứng.

**Ảnh hưởng:** thiếu tin cậy về deadline; người cẩn thận bị phạt khi hệ thống che thời gian; nguy cơ main vẫn là nút kích hoạt mọi dự án.

**Owner:** story-architect; bí quyết state do story-bible-manager ghi là PROPOSED.

**Acceptance:** thời lượng hiện trước chốt hành động; đọc/menu không trôi; mọi hoạt động lặp có thời lượng; dự án có điều kiện/nguồn lực/tiến độ độc lập, forecast và dấu vết khi player vắng; nghỉ bảo đảm sinh tồn vẫn tiến lịch; không tự thêm thời gian thực khi tắt app.

### REV-NF-002 · MUST FIX · đường từ chối và thất bại chưa có sàn sinh kế

**Nguồn:** r0 §18: “hoàn hàng/rút giữ sức khỏe và mở ca kho khác với thu nhập thấp hơn”.

**Vấn đề:** chưa rõ bị nợ và mất dụng cụ có còn đủ tiền/đồ để nhận ca kho. Tuyên bố “không chặn toàn bộ game” ở §4 chưa có cơ chế hỗ trợ.

**Ảnh hưởng:** player có thể mất hết vốn sau một lựa chọn sinh tồn, buộc load lại; RUN AWAY khi đó chỉ là lựa chọn danh nghĩa.

**Owner:** story-architect; không yêu cầu writer bịa một NPC tặng đồ.

**Acceptance:** có ca cơ bản không cần vốn, cung cấp ăn/ngủ thay tiền cao; nợ tồn tại và hạn chế hợp đồng cao; không cho farm giàu ở nơi an toàn; kết quả hoàn hàng khác mất kiện; main còn bị thương thì phục hồi trước làm việc.

### REV-NF-003 · SHOULD FIX · thiếu nhịp kỳ thú và động lực trường sinh cụ thể

**Nguồn:** §3 want “học một phương pháp tu luyện đủ tin cậy để kéo dài đời mình”; §14 Ch.5, 9, 12, 13 cùng dựa nhiều vào đo/sổ/thương lượng.

**Vấn đề:** kinh tế có logic nhưng dễ thành truyện kiểm toán có phép thuật. Thiếu trải nghiệm cảm giác làm người bình thường muốn đi xa, và thiếu nhịp khác nhau khi chơi.

**Owner:** story-architect. **Chi phí:** thêm định hướng hành động/mỹ thuật vào outline, không viết scene.

**Acceptance:** một ký ức đời thường khiến player muốn có thời gian; ít nhất ba chapter có động từ/không gian khác đọc hồ sơ; cảnh kỳ thú vẫn có giới hạn vật lý/rủi ro; không dùng kỳ thú để cấp buff miễn phí.

### REV-NF-004 · SHOULD FIX · thời gian dài và bậc tu chưa nối nhau

**Nguồn:** §13 6 arc nối tới Hóa Thần; §14 Ch.11 nói người nhà đổi đời nhưng không có khung năm.

**Vấn đề:** outline có thể bị triển khai thành 18 ngày nhảy từ phàm nhân lên Hóa Thần, hoặc đột ngột tua chục năm làm người chơi không hiểu điều đã mất.

**Owner:** story-architect.

**Acceptance:** khung thời gian arc chỉ là nhịp tham chiếu, không đột phá bắt buộc; time skip do quyết định đóng quan/chuyến đi, nêu thời lượng và hậu quả trước; không giới thiệu một đại cảnh giới mới mỗi chương.

## Kiểm tra theo yêu cầu người dùng

| Nguy cơ | Nhận định r0 |
| --- | --- |
| Cliché | Không dùng huyết thống/đại năng; bệnh và tài nguyên vẫn là mô típ phổ biến, cần chất riêng ở quy trình bảo quản/hồi lưu |
| Main quá mạnh | Không có quyền năng độc quyền; khả năng khảo mạch giới hạn; chưa chứng minh cân bằng trong chiến đấu |
| Cơ duyên quá dễ | §17 có người cạnh tranh, cơ hội rút; slice cần sửa sinh kế sau thất bại |
| World revolves around player | Agenda có, clock thiếu chi tiết: REV-NF-001 |
| Generic cultivation system | Tên bậc truyền thống có chủ đích; từng bậc đổi khả năng và ràng buộc; con số tuổi còn thử nghiệm |
| Generic sect | Tông môn có quỹ, đội nghề và phe; tên giữ từ repo, không sáng tác bằng đổi tên tổ chức mẫu |
| Predictable villain | Tống Khê cứu viện nhưng dồn chi phí; không âm thầm đứng sau mọi việc |
| Meaningless realm progression | Có neo rút, dự trữ, thần thức, mạng trận; cần prototype cho sự khác biệt thật |
| Weak gameplay integration | Loop hợp lý nhưng cần clock và fallback cụ thể |
| Lack of player agency | Nhiều cách giải; từ chối có nguy cơ softlock: REV-NF-002 |
| Mystery yếu | Câu hỏi vật chất có bằng chứng, tránh “main là ai”; rủi ro đáp án quá kỹ thuật cần kỳ thú |
| Escalation quá nhanh | Phạm vi địa lý hữu hạn; khung năm chưa có: REV-NF-004 |

## Các phân tích chuyên môn

**Strong elements:** §9 đối thủ có lợi ích có thể hiểu; §7 đồ nghề cần sửa và giữ lịch sử; §16 clue thay thế không tặng cùng lợi thế; §15 ending không yêu cầu giết boss/cứu vũ trụ. Đây là điểm thiết kế, chưa phải hiệu quả thực tế.

**Scene-level problems:** N/A; chưa có scene. Findings chỉ áp dụng mục kiến trúc và VS-NF-001, không phát lệnh viết scene.

**Player agency:** các lựa chọn là thay chi phí, quyền và thông tin; thiếu sàn sinh kế làm nhánh rút yếu. Major branch cần giữ giới hạn ngân sách đã nêu, không tạo 6 game riêng.

**Character:** arc tự cô lập có thể phân nhánh thay vì ép mọi player thành người cứu đời. Tống Khê cần hành động hợp logic ngay cả khi biết mình gây hại. Con của Tạ Miên không được dùng như nạn nhân chết bắt buộc để đổi thái độ main.

**Dialogue:** N/A; sau này kiểm voice/tri thức, chưa dùng điểm kiến trúc làm chứng nhận thoại tốt.

**Pacing:** cần xen khảo sát vật lý, vận chuyển, bảo vệ đường rút, sửa thiết bị và thời gian đời thường. Không dồn mọi chapter thành giải một sai số khác.

**Mystery/foreshadowing:** clue bù có đường mua/thuê là hợp lý; writer phải phân biệt nghe lời khai với tin lời khai. Kết luận toàn mạng không được mở bằng một mảnh sổ.

**Gameplay:** gameplay được đề xuất khác phần lớn prototype. Người triển khai cần chọn subset theo slice trước, không làm mô phỏng đại lục để viết một chuyến hàng.

## Rewrite Instructions / bàn giao

**Cho story-architect:** sửa REV-NF-001–004 trong foundation, giữ IDs, hệ giá phải trả, agenda độc lập, phạm vi hữu hạn và bí mật AUTHOR_ONLY. Cập nhật package/state cùng revision rồi review lại.

**Cho game-story-writer:** chưa có task; không viết chapter/scene. Khi Phase 2–3 được yêu cầu, chỉ nhận brief đã được duyệt và baseline đã xác lập. `game-story-writer` chưa tìm thấy trong catalog, `.agents` hoặc skill/plugin directories đã quét; đây là khoảng trống của pipeline tương lai.

**Downstream:** mọi snapshot/review phụ thuộc r0 phải cập nhật cho r1; không chuyển điểm reviewer thành APPROVED hoặc CANON_LOCKED.

## Revision 1 — kết quả architect

Foundation r1 giữ nguyên IDs, không thêm quyền năng độc quyền hoặc đổi mystery để né critique.

- REV-NF-001: §17 báo thời lượng trước chốt, mọi ca sinh lợi tiến lịch, forecast theo tri thức và dự án cần nguồn lực. EVENT-NF-001 tách van tạm 12 ca khỏi nhánh hoàn chỉnh nhiều mùa/năm; player chậm có thể tới sau khi dự án hoàn thành, chỉ còn xử lý hậu quả.
- REV-NF-002: §18 có ca ăn/ngủ không vốn; đồ mượn chỉ dùng trong ca; nợ, thương tật và mất quyền hợp đồng cao vẫn giữ. Điều khoản tách hoàn hàng, mất kiện và bị cướp trên tuyến có bảo chứng.
- REV-NF-003: §3 có mong muốn đi thuyền thượng lưu, §6 có hiện tượng kỳ thú; Ch.10 dò đá nổi, Ch.12 đi qua đường thú di cư, Ch.14 đặt trạm nghe và giữ lối về. Không cấp đồ mạnh như phần thưởng xem cảnh đẹp.
- REV-NF-004: §13 có thời lượng arc và báo hậu quả trước time skip; cho phép mục tiêu/ending ở bậc thấp. §17 phân biệt hai tuyến climax với bốn epilogue để không phình ngân sách.

## Review lại — foundation r1

**Source SHA-256:** `cfd19eabcc5bfc532d41846d4be949b3f55e4e51b98c0576c249851b9734a9d3`. **Revision đã dùng:** 1/3. Đây là lượt review thứ hai sau một vòng revision, không phải hai vòng revision.

| Dimension | Điểm | Bằng chứng r1 / giới hạn |
| --- | --- | --- |
| HOOK | 8 | §3 mong đi xa và §4 lô thuốc đáng nghi gắn nhu cầu trước mắt với hành trình dài |
| PLAYER AGENCY | 8 | §18 từ chối/rút có đường sống, nợ giữ; §15 có mục tiêu đời hữu hạn |
| CHARACTER QUALITY | 8 | §9 agenda, resources, limits, known/unknown và sinh hoạt ngoài quest rõ; voice chưa viết |
| DIALOGUE | N/A | Không sản xuất full dialogue trong Phase 1 |
| CONFLICT | 8 | §10 cứu viện không xóa tổn thất hạ lưu; kiến thức đúng chưa đủ quyền quyết định |
| PACING | 7 | §13 khung nhiều năm và §14 tương tác khác nhau; trải nghiệm phiên/nghỉ/time skip cần thử |
| EMOTIONAL IMPACT | 7 | §3 hình ảnh thuyền, §11/16 thời gian người thân và nghề; chưa có scene để chứng minh cảm xúc |
| MYSTERY / CURIOSITY | 8 | §11–16 có câu hỏi nhỏ trả sớm, truth vật chất hữu hạn, đối chứng và clue bù có giá |
| GAMEPLAY INTEGRATION | 8 | §5 năng lực cảnh giới khác nhau; §17 thời gian/nguồn lực; §18 giới hạn slice khả thi trên giấy |
| ENVIRONMENTAL STORYTELLING | 8 | §6 dấu sương/thú/đá, §17 cấu kiện và van; bằng chứng có thể trải nghiệm, không chỉ nghe giảng |
| CONTINUITY | Not verified | Package liệt kê conflicts/state, nhưng chưa có report continuity-manager hoặc bản đã approved |
| PAYOFF | 8 | §15–16 ending theo quyền/nợ/tri thức, clue bù đúng điều kiện; §17 hậu quả việc đã xảy ra không bị tua lại |

**Overall: 7.8/10**, trung bình 10 chiều có điểm (78/10), không tính DIALOGUE và CONTINUITY. Không có MUST FIX còn mở trong phạm vi foundation. Điều này không có nghĩa đủ điều kiện canon commit, production scene hay release.

**Tái kiểm 12 nguy cơ:** chưa thấy main được ưu ái vô điều kiện/cơ duyên miễn phí/thế giới dừng đợi; hệ cảnh giới giữ tên truyền thống nhưng thay gameplay; tông môn có tổ chức nghề/quỹ; đối thủ có lý và không omniscient; có nhánh từ chối/sinh kế; mystery có chuỗi đối chứng; escalation có thời gian và giới hạn không gian. Rủi ro còn lại lớn nhất là chất văn và nhịp chơi: kiến trúc đúng không đảm bảo một chuyến hàng sẽ hấp dẫn khi thật sự chơi.

### Recommended Changes còn lại

**SHOULD FIX ở Phase 2, owner story-architect:** kiểm budget thời lượng phiên khi lập current/next chapter; cắt thao tác kiểm sổ lặp nếu không đổi tình thế. Xây entry/exit guards với dữ liệu engine thực trước scene. Đây là phần lập chương, không mở rộng scope Phase 1 để làm ngay.

**SHOULD FIX trước implementation, owner cultivation-game + người triển khai:** cân bằng lịch tuổi, chi phí hồi phục, tỷ lệ bậc và hiệu quả đinh rút; kiểm sàn sinh kế không farm vô hạn và không ép người rút phải grind dài. Bảng tuổi và năm là đề xuất, chưa bằng chứng balance.

**OPTIONAL:** gợi ý tên chapter và tổ chức sau khi người dùng xác định định hướng; không đổi IDs. Không cần twist thêm chỉ để tăng điểm mystery.

**Writer handoff:** chưa được mở. Không sửa bằng việc tự viết cảnh minh họa hoặc thoại dài. Khi người dùng yêu cầu bước tiếp theo, architect dùng context r1; nếu premise/realm/world clock thay đổi, review các phần phụ thuộc phải chạy lại.

**Kết luận phạm vi:** đủ hoàn thiện để xuất STORY FOUNDATION v0.1 và INITIALIZATION PACKAGE, chờ đánh giá. Dừng sau một vòng revision; không tiếp tục vòng hai để cố điểm tuyệt đối. Canon unchanged; không APPROVED/IMPLEMENTED/PLAYTESTED/CANON_LOCKED.
