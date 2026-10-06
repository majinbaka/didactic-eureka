# Arc 1 — context, approval và proposal index

**Artifact:** CONTEXT-ARC1-001/r1 · modes CONTEXT + PROPOSE.  
**Bible path/baseline:** `docs/story/bible/`, INIT-NF-001/r1. Canon commit: NONE; canon baseline chưa đồng bộ.  
**Sources:** ARCH-FOUNDATION-001/r1; INIT-NF-001/r1; yêu cầu hiện tại SRC-A1-USER ngày 2026-10-05; ARCH-ARC1-001/r1; REVIEW-ARC1-001/r1.  
**Scope:** NF/*, T0 → cuối CHAPTER-NF-03; AUTHOR_ONLY; definitions PLANNED/CONDITIONAL, actual path UNKNOWN. Next owner: người dùng đánh giá Arc 1.

## Approval evidence và authority

Người dùng: **“STORY FOUNDATION v0.1 is approved.”** Foundation hiện có tại thời điểm yêu cầu là ARCH-FOUNDATION-001/r1. Ghi nhận **APPROVED ở cấp thiết kế**, CONFIRMED bởi yêu cầu trực tiếp. Các lời “chưa duyệt” trong foundation/package/review cũ là snapshot lịch sử và được supersede về approval bởi bản ghi này; giữ nguyên để không sửa lịch sử review.

Phạm vi duyệt gồm nền tảng truyện, không phải bằng chứng nội dung đã triển khai hoặc một người chơi đã trải qua sự kiện. Không có yêu cầu COMMIT/RETCON bible; do đó không tự chuyển metadata NF thành CANON hoặc ghi đè runtime. Các khác biệt với prototype trong CONFLICT-NF-001–006 vẫn là dependencies cần xử lý khi có task implementation; chúng không ngăn dùng foundation đã duyệt để lập Arc 1.

Người dùng đồng thời cho phép thiết kế và review/revise Arc 1, cấm cảnh chi tiết và đi xa hơn kiến trúc Arc 1. **Arc 1/r1 vẫn PROPOSED, chưa được duyệt.** Review không thay phê duyệt. Không cần hỏi lại việc thiết kế đã được cho phép.

## Context package cho architect/reviewer

**REQUIRED:**

- CHAR-NF-001: người lao động nhớ quá khứ, còn gia đình, muốn có sinh kế và thời gian đi xa; lợi thế cân/đo có thể học được, không huyết thống đặc biệt (foundation §3–4).
- RULE-NF-001–005: chất lượng khí khác lượng khí; công pháp có dải thích nghi; không thắng vượt cảnh giới vô điều kiện; tuổi thọ không chữa mọi bệnh; clock tiến theo hoạt động có thời lượng báo trước, không theo đóng app (§5, §17).
- ARC-NF-001/CHAPTER-NF-01–03: sinh kế → nguồn học → mùa tài nguyên; nhịp vài tháng–một năm; hoãn đột phá hợp lệ (§13–14).
- CHAR-NF-002–006: agenda, bí mật và giới hạn tri thức như §9. Không nhập NPC bản thảo 01.1–01.4 vào những IDs này.
- LOC-NF-001/002, FACTION-NF-001/002/004/005: phạm vi bến/chân núi và chuỗi lao động; không mở Xưởng Trầm Lưu hoặc Ngoại Triều (§6–8).
- MYST-NF-002/CLUE-NF-001/002: nguyên nhân kép cần mẫu/đối chứng, kết luận Ch.3; KNOWLEDGE-NF-005 chỉ cấp khi acquisition có nguồn. MYST-NF-001 truth AUTHOR_ONLY không được main biết (§11, §16; package §E).
- DECISION-NF-001/002, CONSEQ-NF-001–003: hàng, trách nhiệm, mùa sau, nợ/quyền; không union các kết quả hoặc nhận thưởng lặp (package §D).
- Sàn sinh kế không vốn giữ đường sống, vẫn tiến lịch và giữ nợ; rút không bị coi là mất kiện tự động (§18).

**RELEVANT:** ITEM-NF-001/002 cần mua/thuê, không có mặc định; TERM-NF-001 Dưỡng Lưu có hạn chế; CLUE-NF-009 là setup lịch nghề; EVENT-NF-001 có giai đoạn van tạm 12 ca và giai đoạn nhiều năm, không đứng chờ main (§7, §16–18).

**OMITTED:** chi tiết các arc sau, core truth đại lục, endgame, profile Dư Tịnh/Hà Châu. Không cần để thiết kế Arc 1; nguồn vẫn ở foundation. MYST-NF-003 chỉ mở câu hỏi cuối arc, không trả lời.

## Proposal index và deltas

**PROPOSAL-ARC1-001/r1:** prepared architecture additions, không canon mutation. Nguồn đầy đủ: [17 mục Arc 1](../planning/arc-1-v0.1.md); đánh giá: [review](../planning/arc-1-review-v0.1.md).

| IDs / fields | Proposal và nơi định nghĩa |
| --- | --- |
| ARCH-ARC1-001; ARC-NF-001; CHAPTER-NF-01–03 | Kiến trúc chi tiết cấp arc/chương; §1–17 và §15; không scene IDs |
| DECISION-A1-001–005 | Chuẩn bị chuyến; đường học; công pháp; dẫn khí/hoãn; cam kết cao trào — §12 |
| CLUE-A1-001/002 | Đường rút/ngưỡng; thông báo thuê nguồn — §11 |
| CONSEQ-A1-001–003 | Tin chuyên môn; thương tổn dẫn khí; đồ nghề gia đình — §13 |
| Starting inventory; nguồn học trả bằng lao động; mẫu lưu | Chi tiết mới PROPOSED — §2, §13; không canon và không save schema |
| Mạc Du gây sức ép điều khoản; đầu vào/đầu ra chapter | Chi tiết mới PROPOSED — §4, §15–16; không thay bí mật gốc |
| Hoàn tất hoặc hoãn dẫn khí | Outcomes conditional — §3, §6, §12, §16; không thêm campaign |

State dùng vocabulary package §D: `parcelDisposition`, trách nhiệm/bảo chứng, quyền truy cập, ownership, nguồn tri thức và kết quả mùa. Các khái niệm nguồn học/công pháp/chẩn đoán/ngưỡng an toàn mới là proposal narrative, chưa có field engine. Không sinh state mặc định từ tồn tại tài liệu.

## Validation và readiness

Đã tự đối chiếu r1 với foundation: giữ IDs, ba chương, giới hạn cảnh giới, clue/payoff và ngân sách một nhánh lớn; hoãn, từ chối, thiếu vốn, đến muộn và bỏ clue có đường kế tiếp được mô tả. Đây là validation cấu trúc trên giấy, không continuity-manager PASS hoặc reachability test của engine.

UNKNOWN: giá/đơn vị clock cụ thể, lịch từng NPC, thông số dẫn khí, thời lượng chơi Ch.2–3, runtime mapping. Trạng thái ngày kiểm bị đổi của Tạ Miên không mặc định main biết; nợ/chủ mẫu/quan hệ là branch-local.

**Canon unchanged.** Ghi nhận approval design và lưu proposal trong cùng bible; không tạo bible cạnh tranh, không sửa code, không viết scene, không lập Arc 2.
