# Story Bible — điểm quản lý narrative

**Schema:** narrative bookkeeping v0.1. **Baseline:** INIT-NF-001/r1, proposal store. **Canon baseline:** chưa xác lập; chưa có canon commit hoặc retcon. **Audience:** AUTHOR_ONLY.

Thư mục này quản lý nguồn, IDs và đề xuất, không thay thế [bản đọc chương đang chơi](../README.md). Dữ liệu runtime vẫn thuộc code và save hiện tại. Cốt truyện mới chưa được duyệt để thay phần đã triển khai.

| Tài liệu | Vai trò | Trạng thái |
| --- | --- | --- |
| [STORY FOUNDATION v0.1](../planning/foundation-v0.1.md) | Premise, luật, thế giới, nhân vật, arcs, roadmap, mystery, loop, slice | PROPOSED; production OUTLINED; review r1 hoàn tất |
| [STORY BIBLE INITIALIZATION PACKAGE](initialization-v0.1.md) | Nguồn, xung đột, index, state/knowledge, candidate changes và gaps | INITIALIZE + PROPOSE; không canon commit |
| [Narrative Review](../planning/foundation-review-v0.1.md) | Critique r0, revision requests, review r1 và giới hạn | REVIEWED; không là phê duyệt |

Đọc index trong package trước, rồi mở mục foundation được dẫn. Các tệp đó là module nội dung của cùng một bible đề xuất; không có một bible thứ hai xác nhận sự thật khác. Khi nội dung lớn lên có thể tách `characters/`, `world/`, `mysteries/`, `state/` mà giữ IDs và lịch sử nguồn.

Quy tắc: chỉ người dùng phê duyệt mới có bằng chứng approval; điểm cao, continuity PASS và file tồn tại không tự biến thành canon. Không union lịch sử nhánh. Biết một clue tồn tại không có nghĩa nhân vật đã tìm thấy nó. Không đưa bí mật author-only vào trang người chơi.

Lifecycle theo yêu cầu dự án: IDEA → OUTLINED → PLANNED → DRAFTED → REVIEWED → APPROVED → IMPLEMENTED → PLAYTESTED → CANON_LOCKED. Trạng thái canon PROPOSED/CANON/UNKNOWN được lưu riêng; cả mức duyệt thiết kế và các sự kiện thực xảy ra đều cần nguồn. Không dùng lifecycle rút gọn của skill để bỏ bước triển khai/playtest người dùng yêu cầu.

Bước tiếp theo có phạm vi rõ: `PLAN ARC 1 / CHAPTER 1`. Chưa lập current/next chapter hoặc sản xuất scene trong Phase 1.
