---
name: cultivation-game
description: Phát triển cơ chế tu luyện, cảnh giới, phần thưởng và phiên bản save cho Tu Tiên Loạn Giới; dùng khi sửa logic gameplay hoặc cân bằng.
---

Đọc `game-design.md` và `docs/architecture.md`. Đặt transition/công thức trong `src/game`, tách khỏi React và Firebase. Demo chỉ có 5 cảnh giới; các vùng/chiến đấu là dự kiến. Quyết định cooldown/chi phí/thất bại cần ghi lại trong game design, tránh ngầm đổi vòng lặp.

Bảo vệ ngưỡng linh khí, chỉ số nguyên không âm và giới hạn cảnh giới; dùng tests cho biên đột phá và chuỗi hành động. Khi đổi save, có version/migration và kiểm tra dữ liệu local/cloud. Không reset tiến độ để chữa lỗi schema. Phần thưởng cạnh tranh cần xác thực server, không coi client transition là chống gian lận.
