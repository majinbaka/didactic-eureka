# Kiến trúc và dữ liệu

`App.jsx` điều phối UI → `game/state.js` chuyển trạng thái thuần → localStorage hoặc `services/firebase.js` cho I/O cloud. `PwaControls.jsx` điều phối install/update; Vite PWA sinh manifest và Workbox service worker lúc build.

## Schema v2

```js
{ version: 2, realm: 0, qi: 0, stones: 30, herbs: 2, journeys: 0,
  hp: 100, maxHp: 100, attributePoints: 0,
  attributes: { canCot: 1, ngoTinh: 1, thanPhap: 1 },
  spiritRoots: ['kim'], elementCultivation: { kim: 0, moc: 0, thuy: 0, hoa: 0, tho: 0 } }
```

`realm` là index 0–4, qi không vượt `100 * (realm + 1)`; số nguyên không âm có giới hạn. Local key `loan-gioi:save:v2`; v1 local/cloud được migration giữ nguyên tiến độ cũ và bổ sung trường mới. Firestore thêm `updatedAt` từ server timestamp tại `players/{uid}/saves/main`.

## Đồng bộ

Bản local là nguồn chơi hiện tại. Không tự pull khi startup. Upload ghi đè bản cloud cùng UID; download yêu cầu xác nhận và thay local nếu schema hợp lệ. Không subscription realtime; tránh vòng lặp đồng bộ và phí ghi theo click. Nếu cần realtime sau này, thêm subscription có cleanup và cơ chế revision/conflict trước khi nối UI.

Auth anonymous tạo khi người chơi chọn cloud action. Cùng origin/browser giữ phiên; không dùng anonymous làm giải pháp đăng nhập đa thiết bị. Firebase config thiếu → nút cloud disabled. Lỗi SDK → UI thông báo, local tiếp tục hoạt động. Anonymous Auth và rules phải được bật/deploy trên dịch vụ thật.

## Giới hạn prototype

Client có thể sửa tiến độ; rules hiện tại chỉ kiểm tra ownership/schema, không chứng minh phần thưởng hợp lệ. Trước PvP/giao dịch/leaderboard, dùng server transaction/Cloud Functions và command validation. Chưa có chức năng reset/delete UI, chat, multiplayer, analytics, cloud migration hoặc RTDB presence.

## Offline/PWA

Workbox precache HTML/CSS/JS/icon. Không runtime-cache Firebase API. localStorage không phải backup bảo đảm; trình duyệt có thể xóa dữ liệu. Bản build production trên HTTPS cần được kiểm tra install và cold reload offline thực tế trước phát hành.

## Schema v3 — hành trang

Local key `loan-gioi:save:v3`, giữ các trường v2 và thêm `inventory: { pill: 2, gourd: 5, jade: 0, jadeActive: false }`. `pill` là số viên 0–999; `gourd` là số lượt còn lại 0–5; `jade` là quyền sở hữu 0/1; chỉ được kích hoạt khi sở hữu. Logic danh mục, giá, điều kiện và tiêu hao nằm tại `src/game/items.js`.

Load thử v3 → v2 → v1, migration giữ tiến độ và bổ sung hành trang khởi đầu; không xóa các key cũ. Cloud download cũng migration v1/v2, upload dùng v3. Rules yêu cầu inventory hợp lệ và giữ giới hạn UID. Cần triển khai rules mới trước khi upload schema v3; chưa kiểm thử Emulator trong thay đổi này.

## Schema v4 — hồ sơ nhân vật

Local key `loan-gioi:save:v4`, giữ các trường v3 và thêm `bornAt` (Unix time mili giây) cùng `autoCultivate` (boolean). Migration v1/v2/v3 giữ toàn bộ tiến độ; bản cũ bắt đầu tính tuổi từ thời điểm migration. Tuổi được suy ra từ `bornAt`, không ghi lặp vào save. Tu luyện tự động chỉ tick khi ứng dụng đang mở và lưu local sau mỗi lần thay đổi.

Firestore rules đã mô tả schema v4 nhưng chưa được kiểm thử bằng Emulator hoặc deploy. Cần deploy rules trước khi upload save v4 lên dự án Firebase thật.

## Schema v5 — hành trình và thu thập

Local key `loan-gioi:save:v5`, đọc và migration từ v1–v4 mà không xóa bản cũ. Thêm `spiritRootType`, `lastSeenAt`, `pendingQi`, `collectionCounts` và `storyLog`. Bản v4 giữ toàn bộ tài nguyên, thuộc tính và tiến độ; các trường mới bắt đầu từ thời điểm migration. Bản mới khởi đầu không có tài nguyên hay vật phẩm. Bộ sưu tập đếm tổng lượt nhặt theo ID vật phẩm qua các lần chơi chương; reset nhân vật xóa cả lượt đếm và nhật ký.

Nhập định dùng dấu thời gian local, giới hạn 4 linh khí trước khi người chơi nhận. Đây là tiến độ do client tự khai, không thích hợp làm nguồn tin cậy cho cạnh tranh. Firestore rules v5 cần được thử bằng Emulator và triển khai riêng trước khi dùng cloud save v5.

## Schema v6 — danh tính và tiểu cảnh

Local key `loan-gioi:save:v6`, migration v1–v5 giữ toàn bộ tiến độ và điền mặc định diện mạo Vô Danh, tên Vô Danh, tuổi khởi đầu 15, thọ nguyên gốc 60, Luyện Khí kỳ 1. Thêm `characterId`, `characterName`, `baseAge`, `baseLifespan`, `qiStage` (1–13), `minorStage` (0–3). Thay diện mạo/tên không reset tài nguyên hoặc thời gian sinh. Firestore rules v6 cần kiểm thử bằng Emulator trước release và deploy riêng.
