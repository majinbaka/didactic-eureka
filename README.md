# Tu Tiên Loạn Giới

Game tu tiên pixel lấy cảm hứng mỹ thuật Nhật Bản, viết bằng React + JavaScript, HTML và CSS. Vite build frontend; PWA cài lên thiết bị; Vercel phục vụ web; Firebase Auth + Firestore lưu tiến độ.

## Chạy project

Yêu cầu Node.js 22.12+ (hoặc 20.19+), npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Không cần Firebase để chơi bản local. Lệnh kiểm tra:

```bash
npm run lint
npm test
npm run build
npm run preview
```

## Bản game hiện có gì?

- Chương mở đầu “Trúc Linh Phong — Thử thách nhập môn” với thoại, vượt Rừng Trúc U Tinh, giải bia đá trận pháp và cuộc đua lên đỉnh núi.
- Một linh thảo trong màn Rừng Trúc U Tinh; phải chạm trực tiếp mới nhặt và lưu tài nguyên. Bộ sưu tập có ảnh và mô tả cho 100 linh thảo, 2 linh thạch cùng 1.000 vật phẩm tu tiên (250 vũ khí tấn công, 250 trang bị phòng thủ, 250 trận pháp và 250 pháp bảo), hỗ trợ tìm kiếm/lọc; các loại chưa có điểm rơi được ghi rõ.
- PWA manifest, icon thường/maskable, cache app shell offline, thông báo cập nhật.

Khi vào game, người chơi chọn diện mạo có sẵn và đặt tên; mỗi nhân vật có tuổi và thọ nguyên riêng. Chương đầu cho đi bộ/chạy, nhảy và ngồi bằng chạm hoặc bàn phím; cụm hành động mobile nằm ở góc phải. Nhân vật dùng spritesheet liền thân 128px, mặc sẵn áo xanh ngọc, có tóc búi và đầy đủ khuôn mặt. Trên mobile, PWA ưu tiên toàn màn hình ngang; trình duyệt không cho khóa hướng tự động sẽ yêu cầu một lần chạm trước khi vào game. Bộ 16 key pose chưa phải animation nhiều frame đầy đủ. Chưa có chiến đấu với AI, multiplayer hay hệ thống kinh tế hoàn chỉnh. Chưa deploy dịch vụ thật.

## Firebase

1. Tạo Firebase project và đăng ký Web App.
2. Điền web config vào `.env.local` theo `.env.example`.
3. Bật Authentication → Sign-in method → Anonymous. Tạo Cloud Firestore.
4. Deploy rules trước khi dùng lưu mây:

```bash
npx firebase-tools login
npx firebase-tools deploy --only firestore --project YOUR_PROJECT_ID
```

Bản lưu tại `players/{uid}/saves/main`; chỉ chủ sở hữu có quyền. Rules kiểm tra schema và thời gian server. Web config `VITE_*` xuất hiện trong bundle; tuyệt đối không đặt service-account/Admin SDK key ở frontend.

Anonymous account gắn với trình duyệt; chưa hỗ trợ khôi phục tài khoản sau khi xóa storage hay chuyển thiết bị. Cần liên kết tài khoản Google/email trước khi triển khai tính năng đó. Lưu mây là upload chủ động; tải mây thay bản local sau xác nhận. Không có merge hay realtime sync trong bản này. Rules chưa chống gian lận tài nguyên: gameplay cạnh tranh phải được xác thực phía server. Xem [kiến trúc](docs/architecture.md).

## Deploy Vercel

Import repository trong Vercel, chọn framework Vite, build `npm run build`, output `dist`; đã có `vercel.json`. Thêm các biến `.env.example` vào môi trường Preview/Production và redeploy khi đổi biến. Khai báo domain cần dùng trong Firebase Authentication → Authorized domains, đặc biệt khi bổ sung đăng nhập OAuth. Frontend deploy riêng; Firestore rules deploy bằng Firebase CLI.

## Cài PWA và offline

Dùng bản production trên HTTPS hoặc `npm run preview` trên localhost. Sau lần tải đầu tiên và service worker kích hoạt, app shell chơi được offline; lưu mây cần mạng. Nút “Cài game” dùng lời mời trình duyệt nếu có, nếu chưa có sẽ hiện hướng dẫn. Safari iOS: Chia sẻ → Thêm vào màn hình chính. Khả năng cài phụ thuộc trình duyệt. Khi có phiên bản mới, chọn “Có bản mới · Tải lại”; tiến độ được lưu trước đó.

## Tài liệu cho người và AI

- [design.md](design.md): thiết kế giao diện ứng dụng.
- [game-design.md](game-design.md): thế giới, gameplay, nhân vật và chuẩn asset.
- [Cốt truyện đang hoạt động](docs/story/README.md): mục lục các chương chơi được và bản đọc nội dung từng chương.
- [AGENTS.md](AGENTS.md): quy ước làm việc trong repo.
- [Kiến trúc dữ liệu](docs/architecture.md), [lộ trình](docs/roadmap.md).
- `.agents/skills/*/SKILL.md`: skill riêng cho UI, gameplay, Firebase.

## Dependency

Override `@grpc/grpc-js` lên nhánh 1.14.5 để xử lý advisory trong dependency Node của Firebase SDK. Khi cập nhật Firebase, kiểm tra lại `npm audit` và override này.

## Nguồn kỹ thuật

[Vite](https://vite.dev/guide/), [Vite PWA](https://vite-pwa-org.netlify.app/guide/), [Firebase web setup](https://firebase.google.com/docs/web/setup), [Firestore rules](https://firebase.google.com/docs/firestore/security/get-started), [Vite trên Vercel](https://vercel.com/docs/frameworks/frontend/vite).

## Bộ 20 nhân vật mở rộng

Mở `/characters.html` trên dev server để xem 20 nhân vật mới: nam/nữ cao thấp, đầy đặn/gầy, ông bà và trẻ em, với nhiều kiểu tóc, râu và trang phục. Mỗi nhân vật có atlas trong suốt 512×512 gồm 16 key pose, manifest và ảnh đứng xem trước. Bốn nhân vật trong bộ đã được chọn làm diện mạo người chơi; các nhân vật còn lại vẫn ở trang xem thử.

- Danh mục: `public/assets/characters/roster-v2.json`.
- Ảnh tổng hợp: [roster-v2-preview.png](art/characters/roster-v2-preview.png).
- Nguồn/prompt: [character-variants-v2-prompts.md](art/characters/character-variants-v2-prompts.md), [roster-v2.json](art/characters/roster-v2.json).
- Đóng gói lại: `npm run assets:character-roster` (giữ alpha, scale nearest-neighbor và tỷ lệ chiều cao).

## Bộ 30 yêu thú

Hồ sơ → Bộ sưu tập → Danh mục → Yêu thú để xem 30 quái pixel, tìm kiếm không dấu và lọc thuộc tính. Trang `/beasts.html` xem toàn bộ hoạt ảnh, đổi động tác, tạm dừng và phát lại. Mỗi quái có atlas trong suốt 512×640, 20 frame vẽ riêng và manifest: đứng, di chuyển, nhảy, đòn thường, chiêu, bị thương, gục ngã. Hai chu kỳ đứng/di chuyển lặp; các động tác còn lại kết thúc ở frame cuối.

Mỗi yêu thú có thiết kế đòn thường và chiêu riêng; chưa có AI chiến đấu, sát thương hoặc điểm xuất hiện trong màn chơi. Không thay dữ liệu save. Nguồn và prompt ImageGen tích hợp ở [art/beasts](art/beasts/README.md), runtime ở `public/assets/beasts/roster-v1.json`; tái đóng gói bằng `npm run assets:beast-roster`.
