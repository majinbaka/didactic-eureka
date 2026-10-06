# Story Bible — điểm quản lý narrative

**Schema:** narrative bookkeeping v0.1. **Baseline:** INIT-NF-001/r1 + CONTEXT-ARC1-001/r1. **Design authority:** foundation r1 được người dùng duyệt ngày 2026-10-05. **Canon baseline:** chưa đồng bộ; chưa có canon commit hoặc retcon. **Audience:** AUTHOR_ONLY.

Thư mục này quản lý nguồn, IDs và đề xuất, không thay thế [bản đọc chương đang chơi](../README.md). Dữ liệu runtime vẫn thuộc code và save hiện tại. Cốt truyện mới chưa được duyệt để thay phần đã triển khai.

| Tài liệu | Vai trò | Trạng thái |
| --- | --- | --- |
| [STORY FOUNDATION v0.1](../planning/foundation-v0.1.md) | Premise, luật, thế giới, nhân vật, arcs, roadmap, mystery, loop, slice | Design APPROVED theo context mới; production OUTLINED; chưa canon commit |
| [STORY BIBLE INITIALIZATION PACKAGE](initialization-v0.1.md) | Nguồn, xung đột, index, state/knowledge, candidate changes và gaps | INITIALIZE + PROPOSE; không canon commit |
| [Narrative Review](../planning/foundation-review-v0.1.md) | Critique r0, revision requests, review r1 và giới hạn | REVIEWED; không là phê duyệt |
| [Arc 1 Context](arc-1-context-v0.1.md) | Approval evidence, context có phạm vi, index proposal Arc 1 | CONTEXT + PROPOSE; không canon mutation |
| [ARC 1 v0.1](../planning/arc-1-v0.1.md) | 17 mục kiến trúc, ba chương, choices và consequences | PROPOSED; production PLANNED; review r1 hoàn tất |
| [Arc 1 Review](../planning/arc-1-review-v0.1.md) | Critique r0, fixes và review r1 | REVIEWED; không là phê duyệt |

Đọc index trong package trước, rồi mở mục foundation được dẫn. Các tệp đó là module nội dung của cùng một bible đề xuất; không có một bible thứ hai xác nhận sự thật khác. Khi nội dung lớn lên có thể tách `characters/`, `world/`, `mysteries/`, `state/` mà giữ IDs và lịch sử nguồn.

Quy tắc: chỉ người dùng phê duyệt mới có bằng chứng approval; điểm cao, continuity PASS và file tồn tại không tự biến thành canon. Không union lịch sử nhánh. Biết một clue tồn tại không có nghĩa nhân vật đã tìm thấy nó. Không đưa bí mật author-only vào trang người chơi.

Lifecycle theo yêu cầu dự án: IDEA → OUTLINED → PLANNED → DRAFTED → REVIEWED → APPROVED → IMPLEMENTED → PLAYTESTED → CANON_LOCKED. Trạng thái canon PROPOSED/CANON/UNKNOWN được lưu riêng; cả mức duyệt thiết kế và các sự kiện thực xảy ra đều cần nguồn. Không dùng lifecycle rút gọn của skill để bỏ bước triển khai/playtest người dùng yêu cầu.

Điểm dừng hiện tại: kiến trúc Arc 1 và review đã hoàn tất; người dùng đánh giá Arc 1. Chưa sản xuất Scene Brief, cảnh chi tiết hoặc kiến trúc Arc 2. Các trạng thái chưa duyệt ở snapshot Phase 1 giữ ý nghĩa lịch sử; tra context mới trước khi dùng chúng để xác định authority hiện tại.
