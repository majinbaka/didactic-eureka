# STORY BIBLE INITIALIZATION PACKAGE

**Artifact:** INIT-NF-001 · revision r1 · mode INITIALIZE + PROPOSE.  
**Bible path:** `docs/story/bible/`; nội dung đề xuất trong `docs/story/planning/foundation-v0.1.md` r1.  
**Canon baseline:** UNKNOWN / chưa có bằng chứng phê duyệt canon được tìm thấy trong các nguồn đã đọc.  
**Repository sources:** `fc9f5f44ad4632d3bde72d616bfde532d3a42f8a`. **Branch/time:** mọi nhánh định nghĩa tương lai, T0 trước slice; chưa có actual player path.  
**Status:** PROPOSED; confidence PROPOSED cho lore mới, CONFIRMED cho yêu cầu và tồn tại nguồn, không dùng confidence thay approval.  
**Visibility:** AUTHOR_ONLY; không đưa thẳng package này vào bách khoa game. **Next owner:** người dùng đánh giá foundation; story-architect chỉ lập chương khi được yêu cầu.

## A. Evidence inventory và nguồn được chấp nhận

| Source ID | Nguồn / revision | Điều có thể xác nhận / giới hạn |
| --- | --- | --- |
| SRC-NF-USER | Yêu cầu Phase 1 trong `Pasted text.txt`, attachment `c584d498-44bd-48be-b32d-c02bfdc47f13` của phiên này | Cho phép tạo foundation + initialization + review/revision; yêu cầu phàm nhân lưu, nguyên bản, 18 mục, tối đa 3 revisions và dừng. Không phải phê duyệt lore do AI mới sáng tác |
| SRC-NF-REPO | `README.md`, repository baseline nói trên | Nhận diện Tu Tiên Loạn Giới; bản mở đầu chơi được và công nghệ. Mô tả triển khai không tự là canon tác giả đã duyệt |
| SRC-NF-DESIGN | `game-design.md`, cùng baseline | Mở đầu mất ký ức/Thanh Vân Sơn; bộ cảnh giới, tuổi và tuổi thọ, đột phá đơn giản; nhiều cơ chế chỉ là dự kiến |
| SRC-NF-LIVE | `docs/story/README.md`, `docs/story/01-truc-linh-phong.md`, cùng baseline | Bản đọc chương hiện tại: phế linh căn, thẻ gia tộc, thi đua, nhận Nội môn ở hạng 1–3; nhánh hạng 4–5 chưa tiếp tục |
| SRC-NF-DRAFTS | `docs/story/01.1-nguoi-tro-lai-rung-truc.md` đến `01.4-so-chuyen-tram-ben-da.md`, cùng baseline | DRAFT/chờ duyệt rõ ràng: cứu người, Ngoại môn, dấu trúc gãy, Suối Trúc → Bến Đá → Thanh Nham. Không xác nhận đứa trẻ là main hay gia tộc có quyền năng |
| SRC-NF-ARCH | [Foundation](../planning/foundation-v0.1.md) r1 | Nguồn sáng tác PROPOSED cho toàn bộ NF IDs |
| SRC-NF-REVIEW | [Review](../planning/foundation-review-v0.1.md), r0 và r1 | Đánh giá trên giấy, không approval, không continuity PASS |

**Accepted requirements — không phải lore:** main bình thường; sức mạnh/thông tin/tài nguyên có giá; thế giới/NPC có agenda; gameplay và agency; không sao chép; giới hạn production hiện tại. Approval evidence là yêu cầu trực tiếp SRC-NF-USER cho các ràng buộc này. Chưa có fact lore mới nào được nhận thành CANON.

Các skill đọc: story-bible-manager (canon/schema/characters/knowledge/timeline/mystery), story-architect (architecture + shared principles/handoff), story-reviewer (rubric + shared handoff). `game-story-writer` không tìm thấy ở catalog, `.agents`, thư mục skills và plugins đã quét. Không cần nó để hoàn thành Phase 1; cần bổ sung trước bước scene nếu pipeline giữ nguyên. Dialogue/continuity skills được giữ cho production phù hợp, không giả vờ đã chạy scene pipeline trong foundation.

## B. Conflicts và tác động trước implementation

Đây là **xung đột đề xuất với nguồn hiện có**, không gắn nhãn CANON CONFLICT khi chưa có bằng chứng canon approval.

| Conflict ID | Nguồn cũ → đề xuất | Mức / phạm vi / cách xử lý |
| --- | --- | --- |
| CONFLICT-NF-001 | SRC-NF-DESIGN: lữ khách mất ký ức; SRC-NF-LIVE: phế linh căn, gia tộc suy vong → §3: con nhà lao động biết quá khứ, người nhà còn sống | Lớn, identity/opening. Không ghép bằng huyết thống ẩn. Nếu chọn foundation cần viết lại mở đầu và đối chiếu log/save; hiện giữ cả nguồn cũ |
| CONFLICT-NF-002 | SRC-NF-LIVE: top 3 vào Nội môn → §4: tuyển/học việc và đào tạo nhiều bước | Lớn, entry routes/01 outcome. Không tự đổi nội dung code; kế hoạch chuyển cảnh nhập môn chỉ làm sau khi người dùng chọn hướng |
| CONFLICT-NF-003 | SRC-NF-DESIGN: ngưỡng + tỷ lệ và tài nguyên đột phá → §5: dự án chuẩn bị, điều kiện khí và thương tổn | Lớn, gameplay/save. NF luật không ghi đè các công thức. Cần cultivation-game, kiểm thử và migration riêng khi triển khai |
| CONFLICT-NF-004 | Tuổi 15; tuổi theo đồng hồ hệ thống; thọ nguyên 60/100/180/300/500 → tuổi 17, clock hành động, mốc 80/130/220/360/600 | Lớn, thời gian/progression/save; cần chọn đơn vị và bảo toàn tuổi/tiến độ người chơi. Không áp tuổi mới lên save cũ |
| CONFLICT-NF-005 | Loạn Giới là các linh giới bị xé rách → vùng đứt liên thông khí trong phạm vi hữu hạn | Lớn, premise/world. Đây là thay thế ý nghĩa tên, không sự thật được đồng bộ; cần quyết định trước canon commit |
| CONFLICT-NF-006 | Drafts 01.1–01.4: dấu trúc gãy, cứu nạn và danh tính trẻ chưa rõ → mystery hồi lưu, main không mất quá khứ | Vừa/lớn, draft dependencies. Có thể giữ nghề trạm/cứu nạn như vật liệu về sau, nhưng không tự nhập trẻ/thẻ gia tộc vào NF. Không xóa hay đổi trạng thái bản thảo |

Giữ đề xuất nguyên khối để người dùng đánh giá một hướng truyện có logic. Không tạo phiên bản “mất ký ức nhưng thực ra nhớ hết” để che xung đột. Mọi câu “giữ tên repo” ở foundation chỉ giữ cách gọi làm đầu vào thiết kế, không bảo chứng tổ chức cũ/mới là cùng thực thể canon.

## C. Metadata và entity index

**Metadata mặc định cho mỗi NF record:** source SRC-NF-ARCH/r1 + mục dẫn dưới; canon_status PROPOSED; confidence PROPOSED; approval NONE; last_change CHANGE-NF-001; branch `NF/*` trừ guard được nêu; valid_time T0 hoặc thời điểm planned theo outline; visibility AUTHOR_ONLY; occurrence PLANNED. Aliases NONE trừ tên do player chọn; không có alias bí mật. Những trường chưa viết là UNKNOWN / NOT ESTABLISHED. Runtime IDs không đổi.

| IDs | Tên / chức năng | Module có trường nội dung |
| --- | --- | --- |
| ARCH-FOUNDATION-001 | Foundation | Foundation toàn bộ 18 mục |
| CHAR-NF-001 | Player, tên/diện mạo tùy chọn | §3, §12; alias chỉ là tên được nhập trên một path, hiện UNKNOWN |
| CHAR-NF-002, CHAR-NF-003 | Tạ Miên; Đỗ Nghi | §9, độc lập với NPC vô danh cũ |
| CHAR-NF-004, CHAR-NF-005 | Kỷ Vân; Bùi Sương | §9 |
| CHAR-NF-006, CHAR-NF-007 | Mạc Du; Tống Khê | §9–10 |
| CHAR-NF-008, CHAR-NF-009 | Dư Tịnh; Hà Châu | §9 |
| FACTION-NF-001–006 | Thái Huyền Tông; Cửu Bến; Ty Giám Mạch; Hội Thợ Vá Mạch; Liên cư Bờ Thấp; Khách trạm Ngoại Triều | §8; thứ tự là ánh xạ ID, không khoảng tự sinh record |
| LOC-NF-001–006 | Thạch Lưu; chân Thanh Vân Sơn; Tịch Hà; Kính Xuyên; Vành Nội; Bờ Ngoại Triều | §4, §6 |
| LOC-NF-007 | Xưởng Trầm Lưu | §17 |
| RULE-NF-001–005 | Chất lượng khí; thích nghi công pháp; chênh cảnh giới; tuổi thọ; world clock | §5, §17 |
| ITEM-NF-001–003 | Thước định lưu; Sổ đối chứng; Đinh hồi lộ | §7; owner/current location UNKNOWN, không mặc định inventory main |
| TERM-NF-001 | Phép Dưỡng Lưu | §7; chưa cấp cho main |
| MYST-NF-001–004 | Suy nguồn liên vùng; lô thuốc; đổi van; hiệu quả hồi lưu | §11 |
| CLUE-NF-001–009 | Vải bọc; mẫu cây; sổ nước/khí; sổ nhận; lệnh van; cấu kiện; bản vẽ; sổ đối chứng; thư/lịch nghề | §16; available theo outline, discovered UNKNOWN ở actual path |
| FORESHADOW-NF-001–006 | Chuỗi setup/reminder/payoff | §16; tất cả PLANNED, chưa PLANTED |
| ARC-NF-001–006 | Sáu arc từ sinh kế tới quyết định đường dài | §13; chưa đạt milestone |
| CHAPTER-NF-01–18 | Roadmap | §14; tách ID khỏi chương runtime 01 |
| END-NF-001–004 | Giữ mùa; mang bản đồ; nguồn riêng; đời hữu hạn | §15; alternatives, không đồng xảy ra |
| EVENT-NF-001 | Dự án mở nhánh nguồn phụ | §10, §17; planned, không completed ở T0 |
| VS-NF-001 | Slice chuyến thuốc | §18; concept, chưa scene brief |
| DECISION-NF-001–004 | Cách xử lý kiện; cơ duyên mùa thuốc; dùng bằng chứng; quyết định endgame | §D dưới; định nghĩa lựa chọn, chưa chọn |
| CONSEQ-NF-001–003 | Trách nhiệm lô; mùa sau; quyền nguồn/nợ/uy tín | §D; planned consequence definitions, không PENDING ở lịch sử người chơi chưa có |

Character fields tuổi, diện mạo NPC, voice cuối, lịch hẹn cụ thể, hôn nhân ngoài phần đã ghi: UNKNOWN. Bùi Sương có bạn đời trong đề xuất; không suy ra con. Các unknown không cần hỏi để thiết kế architecture, nhưng phải bổ sung đúng scope trước scene.

## D. Branch/state contract đề xuất

Không tạo runtime flags hoặc sửa schema. Dưới đây là pseudocode narrative, không phải cú pháp engine. Chỉ khai báo dữ liệu cần để không làm mất choice; chưa định nghĩa toàn bộ quest graph ở Phase 1.

| Field | Kiểu / phạm vi | Default thiết kế / giá trị actual |
| --- | --- | --- |
| `parcelDisposition` | enum unchosen/delivered/sealed/returned/lost, mỗi hợp đồng | unchosen / UNKNOWN |
| `contractLiability` | danh sách khoản nợ, mỗi khoản có người nhận và nguồn | [] / UNKNOWN |
| `knownEvidence` | set acquisition records, mỗi learner | [] trước phát hiện / UNKNOWN |
| `sourceAccess` | quyền nguồn + người cấp + hạn + điều khoản | none ở T0 NF / UNKNOWN |
| `worldProjects` | stage/resources/personnel/earliest/latest forecasts | theo snapshot NF; actual UNKNOWN |
| `relationLedger` | từng chiều + lĩnh vực trust/respect/fear/debt/secret | biết sơ Tạ Miên theo §3–9, các giá trị chi tiết UNKNOWN |
| `storyTime` | thời gian tích lũy hành động, đơn vị cần prototype | T0 cho simulated entry / actual UNKNOWN |

Không dùng số friendship mới; cập nhật diễn đạt bằng sự kiện. Nếu có runtime ledger phù hợp trong tương lai, ưu tiên ánh xạ thay thêm flags trùng.

| Decision | Intention / type / guard | Immediate response / delayed effect / merge |
| --- | --- | --- |
| DECISION-NF-001 | Kiểm/niêm, giao có hoặc không cảnh báo, hoàn hoặc từ chối; INFORMATION + TACTICAL + NARRATIVE. Đã nhận kiện cho nhánh giao/niêm/hoàn; có tiền hoặc thỏa thuận trả sau cho kiểm thuê; từ chối trước nhận không cần vốn | Khi nhận có transfer kiện từ kho → player; giao/hoàn có receiver xác nhận và transfer player → receiver/kho; mất kiện ghi LOST, không phát cho hai chủ. Thời lượng/chi phí báo trước. Chốt disposition một lần/hợp đồng; CONSEQ-NF-001 chỉ chạy khi có sự kiện chứng minh trách nhiệm, không do nhãn “rút lui”. Các nhánh nhập lại ở mốc tìm sinh kế, giữ nợ và knowledge riêng |
| DECISION-NF-002 | Chờ/chia/bán quyền/rút khỏi mùa thuốc; TACTICAL + RELATIONSHIP + NARRATIVE. Biết dấu cây; bán quyền chỉ nếu có người mua chấp nhận mức chứng cứ; chia cần đối tác đồng ý | Chờ tiêu thời gian, nhóm khác có thể tới; chia xác định phần trước; bán chuyển thông tin cho buyer, không giữ độc quyền; rút không cấp dược. CONSEQ-NF-002 ở kỳ trồng sau theo lượng thu thật, không theo choice text. Merge ở chuẩn bị chỗ tu, giữ ownership/nợ và quan hệ |
| DECISION-NF-003 | Công bố, thương lượng, bán hoặc giữ bằng chứng dự án; INFORMATION + NARRATIVE. Có acquisition và nguồn đối chứng cho mức kết luận đã chọn; thiếu chứng cứ chỉ được đưa nghi vấn | Bản sao có recipient/độ tin cậy; không tự cấp full mystery cho mọi NPC. CONSEQ-NF-003 khi hợp đồng/quyền cấp thay đổi bởi bên có thẩm quyền. Merge ở quyết định đi vùng khác, giữ phạm vi người biết và quyền truy cập |
| DECISION-NF-004 | Chọn vai trò cuối/tiếp tục hay dừng; MAJOR BRANCH. END-NF-001 cần pilot hữu ích/quyền/quỹ; END-NF-002 cần bản sao và thỏa thuận nghĩa vụ; END-NF-003 cần nguồn/an ninh; END-NF-004 cần sinh kế/thỏa thuận rời | Không cho chọn chữ nếu guard không đủ; luôn có hướng thu hẹp mục tiêu thay vì softlock đòi Hóa Thần. Endings không merge thành kết quả chung; cùng một nguồn không vừa được giao tập thể vừa bị player chiếm trong một path |

**Failure/skip/repeat:** hợp đồng mới có instance riêng; replay prototype không phải quay thời gian canon của NF. Không nhận hai lần tiền công cùng receipt. Bỏ quest không nhận clue, dùng clue bù phải có acquisition mới. Mốc hậu quả có receipt và one-time per cause; nếu khoản nợ trả hoặc hợp đồng hòa giải thì cập nhật/cancel phần truy đòi có bằng chứng, không xóa sự kiện đã phát sinh.

**Relationships mẫu:** giao có cảnh báo và kiểm chứng cho Tạ Miên lý do tin player về kê hàng, không tự tạo affection; giữ kín lô sai có thể khiến bà bớt sợ bị lộ nhưng không tin player trong mọi việc. Mua công của Đỗ Nghi chỉ xác lập trao đổi, không tạo nghĩa vụ cứu player miễn phí.

## E. Knowledge, mystery và timeline entry

**SNAPSHOT-NF-001, SIMULATED ENTRY, NF/*, T0, source r1:** main ở Thạch Lưu, phàm nhân, sức khỏe đủ làm ca nhẹ, vốn/lương thực chi tiết UNKNOWN trước thiết kế slice. Tạ Miên làm kho; chưa ràng buộc NPC khác hiện diện. Thước/sổ/đinh không tự có trong túi. Hợp đồng lô thuốc chưa nhận; mọi DECISION chưa chọn. EVENT-NF-001 đang gom vật liệu theo giả định clock; không đồng nghĩa player biết dự án.

| Knowledge ID | Learner / nội dung trước T0 hoặc planned acquisition | Scope / nguồn / loại |
| --- | --- | --- |
| KNOWLEDGE-NF-001 | Main biết nghề bến, nhà mình và địa lý gần; chưa có hiểu biết kỹ thuật linh mạch | NF/*, backstory §3; phần biết là PROPOSED, không có timeline runtime được nhập |
| KNOWLEDGE-NF-002 | Tạ Miên biết ngày kiểm lô bị đổi; nghi lỗi kho | NF/* T0, bí mật §9; không biết đáp án MYST-NF-002 |
| KNOWLEDGE-NF-003 | Tống Khê biết tải viện và dấu tạp nhiễm vùng | NF/* T0, §9–10; không biết tổng tải đại lục |
| KNOWLEDGE-NF-004 | Main thấy CLUE-NF-001 | PLANNED ở Ch.1, guard tự kiểm hoặc nhân chứng chỉ dấu; CLUE_WITHOUT_INTERPRETATION, không KNOWS nguyên nhân |
| KNOWLEDGE-NF-005 | Main xác nhận phần giải MYST-NF-002 | PLANNED Ch.3, cần mẫu có nguồn + đối chứng; báo cáo kiểm thuê là acquisition khác thao tác tự đo |
| KNOWLEDGE-NF-006 | Main biết giả thuyết tổng thể có bằng chứng MYST-NF-001 | PLANNED Ch.14, cần đối chứng vùng và CLUE-NF-006/007/008 hoặc nguồn thay hợp lệ; không cấp vì writer đọc §11 |

Người đọc ngoài nhân vật có thể hiểu chân tướng từ tài liệu này; hiểu ấy không được ghi vào knowledge của save. NPC biết một phần cũng không được dùng thoại kết luận toàn bộ mạng.

**Timeline đề xuất:** nhiều thế hệ sửa một chiều, niên đại UNKNOWN → hai mùa bến mất nước trước T0 → T0 slice/người chơi chưa nhập môn → event mở nguồn tiến qua ca dù player nhận công khác → những năm nghề/tu theo §13 → đối chứng hai lưu vực → pilot → quyết định vùng → hậu quả/ending. Thời điểm từng chuyến và bậc thực tế là branch-local, chưa có mốc OCCURRED. Đi xa cần thiết lập phương tiện/thời lượng; không dùng mục roadmap làm bằng chứng mọi NPC cùng có mặt.

**Mystery status:** MYST-NF-001–004 là definition có truth PROPOSED, actual discovery UNKNOWN. FORESHADOW còn PLANNED. Việc hoàn review không làm mystery REVEALED hoặc hậu quả TRIGGERED.

## F. Proposed changeset, history và gaps

**PROPOSAL-NF-001 / CHANGE-NF-001:** chuẩn bị foundation r1 và các record NF, trạng thái PROPOSED. **Applied:** tệp tài liệu proposal/index/review, không canon mutation. **Canon before/after:** chưa xác lập → vẫn chưa xác lập. **Approval lore:** NONE. **Retcon:** chưa thực hiện.

| Revision | Nội dung / nguồn | Authority và validation |
| --- | --- | --- |
| r0 | Foundation 18 mục theo SRC-NF-USER, baseline repo; review r0 | Initial creative proposal; có hai MUST FIX |
| r1 | Một vòng architect revision: clock, sinh kế, kỳ thú/động lực, nhịp năm; review lại | Proposal mới; giữ IDs; không xóa baseline runtime hoặc drafts. Review r0 chỉ áp bản r0, review r1 áp source r1 |

**Các module đã tạo:** bible/README + package (nguồn/index/state/context), planning/foundation (core/world/economy/characters/arcs/mysteries/foreshadow), planning/review (history critique). Không tạo file rỗng cho module chưa có nội dung.

**Validation tự kiểm cấu trúc:** kiểm IDs được tham chiếu có chỗ định nghĩa; bản ghi không trộn hai nhánh; clue bù không cấp tự động; snapshot không thành lịch sử player; conflicts được dẫn. Đây không phải continuity-manager PASS hay kiểm thử runtime.

**Gaps trước Phase 2:** người dùng chọn foundation/điểm cần sửa; quyết định phạm vi giữ prototype và meaning của Loạn Giới; canon baseline/approval rõ; mức chi tiết nghề/nhịp thời gian cần prototype; riêng tuyến scene cần `game-story-writer`. Không hỏi thêm để hoàn tất Phase 1 vì đề xuất đã có phạm vi và giả định đủ rõ.

**Gaps trước implementation:** mapping storyLog và schema hiện có; migration giữ tên/tuổi/thọ nguyên/thành tựu; xác định action clock đơn vị; persistence/ownership và rules; chiến đấu và khả năng rút; balance chi phí/nguồn; mobile/keyboard; offline/PWA. Đây là công việc tương lai, không được tính là hoàn thành bởi tài liệu.

**Gaps trước CANON_LOCKED:** continuity trên nội dung thực sản xuất, xử lý findings mới, phê duyệt, implementation và playtest. Nếu playtest đổi premise/rule phải cập nhật record liên quan và review các outline phụ thuộc; không sửa bí mật âm thầm ở thoại.

**Điểm dừng:** xuất foundation và initialization package, review đã làm; không viết Chapter 1. Đầu vào tiếp theo: `PLAN ARC 1 / CHAPTER 1`.
