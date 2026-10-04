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

## Schema v3 — Đạo pháp

Key hiện tại `loan-gioi:save:v3`; giữ nguyên các trường v2 và thêm `cultivation` chứa tầng Luyện Khí, strength/mind/will/luck, toxicity/karma, bound/pill/wound, mutation, wave/total/trialHp/trialMp/rebirth. Chấp nhận 7 đại cảnh giới. `src/game/cultivation.js` định nghĩa giới hạn, công thức và transition thuần. `state.js` kiểm tra trước khi trả trạng thái mới. Đấu luyện chỉ tồn tại trong phiên của bảng, không thưởng và không lưu HP đấu luyện.

Đọc lần lượt v3 → v2 → v1; migrate v2 giữ các trường cũ, thêm giá trị mặc định, không xóa key cũ. Cloud download dùng cùng migration; upload dùng schema v3, cần rules tương ứng trước release. Lôi kiếp lưu từng đợt và khóa các hành động khác để tránh hồi tài nguyên giữa kiếp. Cloud vẫn chủ động, không tự sync. Client save không chống gian lận.

Validation Đạo pháp: bộ test Node kiểm tra migration v1/v2, chuỗi 3.000 hành động, sinh–khắc, đan độc, độ kiếp/hồi sinh và đấu luyện. Firebase Emulator v1.19.8 đã kiểm tra rules v3 với chủ sở hữu đọc/ghi, chưa đăng nhập/UID khác bị từ chối, sai timestamp/version/đan độc/trạng thái kiếp bị từ chối. Chưa deploy rules hoặc kiểm tra trên Firebase production.
