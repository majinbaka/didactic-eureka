import { stepRun } from './runner.js'

export const TRIAL_DISTANCE_SCALE = 20
export const MAZE_GATE = 1500 * TRIAL_DISTANCE_SCALE
export const SUMMIT_GATE = 3000 * TRIAL_DISTANCE_SCALE
export const PUZZLE_SECONDS = 5 * 60

export const openingScenes = [
  { speaker: 'Dẫn chuyện', title: 'Rừng trúc trước bình minh', text: 'Sương đọng thành giọt trên đầu lá. Dưới chân Trúc Linh Phong, hàng trăm thí sinh chờ cuộc tuyển chọn mười năm một lần; trên đoạn đường hiện ra trước mắt là năm người. Tiếng chuông từ Thái Huyền Tông vọng xuống, mỗi nhịp như thúc họ bước gần hơn tới cổng núi.' },
  { speaker: 'Vô Danh · Nội tâm', title: 'Một con đường còn lại', text: 'Tấm thẻ gỗ của gia tộc đã mòn đến không đọc nổi họ. Phế linh căn, không linh thạch, không ai tiến cử. Nếu quay về hôm nay, ta còn có thể đi đâu? Vô Danh siết chặt thẻ trong lòng bàn tay rồi bước lên vạch đá.' },
  { speaker: 'Linh Nhi', title: 'Năm người trước vạch đá', text: '“Ngươi run à?” Linh Nhi kéo lại dải buộc tóc, nhường Vô Danh một khoảng đứng. “Ta cũng run. Nhưng qua vạch rồi, đừng nhìn chân người khác; đá rêu ở đây dễ làm trượt lắm.”' },
  { speaker: 'Minh Không', title: 'Chuyện trước giờ xuất phát', text: '“Lời khuyên quý hơn một bước chạy.” Minh Không cười với Linh Nhi. Thiết Sơn ở bên cạnh khẽ gõ gót giày xuống đất: “Các ngươi cứ nói. Ta muốn biết đoạn dốc chịu nổi mấy lần nhảy.” Bạch Tùng chỉ nhìn lối trúc khuất trong sương: “Đừng quên ba bia đá.”' },
  { speaker: 'Dẫn chuyện', title: 'Người giữ luật', text: 'Một vị trưởng lão áo trắng đáp xuống mỏm đá, tay cầm gậy trúc. Đám đông im bặt. Ông chờ năm thí sinh gần ông nhìn về mình mới mở lời; giọng không lớn nhưng vang đến tận hàng đèn đá cuối rừng.' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Luật cuộc đua', text: '“Nghe rõ: hàng trăm người cùng xuất phát, đi qua ba bia đá theo thứ tự rồi chạm cổng trên đỉnh Trúc Linh Phong. Người về trong ba hạng đầu của nhóm năm người được nhận vào Nội môn trong lượt tuyển này. Linh căn và xuất thân không cộng điểm; vượt người khác trên đường cũng không miễn giải bia.”' },
  { speaker: 'Thiết Sơn', title: 'Một câu hỏi thẳng', text: '“Nếu tới bia trước, ta có thể đứng chắn người sau không?” Thiết Sơn hỏi, mắt vẫn dõi về đoạn đường hẹp giữa hai vách đá. Vài người trong đám đông xì xào; Linh Nhi quay sang chờ câu trả lời.' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Đường do chính mình mở', text: '“Không đánh, không đẩy, không phá bia hay nhờ người ngoài giải hộ. Các ngươi chỉ được dùng bước chân, sức nhảy và trí mình. Mỗi người phải tự giải ba bia theo thứ tự; tới trước không có quyền khóa đường người sau.” Thiết Sơn buông bàn tay đang nắm chặt, gật đầu.' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Năm phút cho mỗi bia', text: '“Mỗi bia cho năm phút. Chọn sai thì chịu hình phạt ghi dưới bia và phải giải lại; hết giờ cũng chịu đúng hình phạt ấy, rồi đồng hồ của bia được cấp lại năm phút. Chẳng hạn, sai ở bia rừng trúc thì bị rễ giữ chân, mất thêm mười giây và người phía sau có thể vượt. Đọc kỹ hướng nắng, hướng gió trước khi chọn.”' },
  { speaker: 'Bạch Tùng', title: 'Ba bia, ba cái giá', text: 'Bạch Tùng cau mày: “Còn hai bia sau? Người trượt ở đó phải bắt đầu lại từ chân núi sao?” Minh Không thôi cười. Cả hai cùng nhìn những đốm sáng xanh chạy dọc thân gậy của trưởng lão.' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Hình phạt không xóa đường', text: '“Bia Ngũ Hành gieo Độc Bão, khiến bước đi chậm hai phần mười trong mười giây sau khi rời bia. Bia Bát Quái hất kẻ giải sai lùi năm mươi mét trên lộ trình. Cứ trở lại và giải tiếp; không ai bị loại chỉ vì một câu sai.”' },
  { speaker: 'Minh Không', title: 'Điều phải nhớ', text: '“Vậy về ba sau khi giải đủ ba bia vẫn được nhận?” Minh Không hỏi. Thiết Sơn quay sang nhìn hắn: “Câu ấy ngươi đã biết đáp án rồi.” Minh Không không cười nữa.' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Tiếng chuông giữ nhịp', text: '“Được. Kết quả lần này sẽ được ghi. Khi bia hiện ra, trận pháp giữ nhịp chạy của cả nhóm, nhưng đồng hồ giải vẫn đếm. Chớ để lời bàn tán làm mình quên thời hạn.” Ông nhìn lần lượt từng thí sinh, đợi họ gật đầu.' },
  { speaker: 'Linh Nhi', title: 'Lời hẹn trên đỉnh', text: 'Linh Nhi nghiêng đầu nhìn Vô Danh: “Nghe rõ chưa? Ta sẽ không đợi ngươi ở chân núi đâu.” Vô Danh đáp: “Vậy gặp nhau trên đỉnh.” Thiết Sơn bật cười; ngay cả Bạch Tùng cũng thoáng quay lại nhìn họ.' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Khai cuộc', text: 'Đầu gậy trúc chạm mặt đá. Một tiếng chuông trong trẻo xuyên qua rừng, sương trước vạch xuất phát tách thành lối đi. “Thái Huyền Tông mở cửa. Các thí sinh, khai cuộc!”' },
]

export const endingScenes = {
  winner: [
    { speaker: 'Dẫn chuyện', title: 'Qua cổng đúng hạn', text: 'Vô Danh đặt chân qua vạch cổng trong ba người dẫn đầu. Tiếng chuông trên đỉnh ngân lên, gió lùa qua tay áo ướt sương. Phía sau còn tiếng bước chân trên bậc đá; Vô Danh ngoảnh lại, biết cuộc chạy của những người kia vẫn chưa hết.' },
    { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Được nhận vào Nội môn!', text: '“Ta đã chứng kiến ngươi qua đủ ba bia và về trong ba hạng đầu. Theo luật đã công bố, Vô Danh được nhận vào Nội môn Thái Huyền Tông. Từ hôm nay, hãy giữ lời mình đã chọn trên đường lên núi.”' },
    { speaker: 'Linh Nhi', title: 'Sau vạch đích', text: 'Trong tiếng gió, Vô Danh nhớ lời Linh Nhi ở vạch xuất phát: “Ta sẽ không đợi ngươi ở chân núi đâu.” Vô Danh nhìn tấm thẻ gỗ trong tay: lần đầu tiên, nó không còn giống một lời từ biệt.' },
  ],
  defeat: [
    { speaker: 'Dẫn chuyện', title: 'Sau người dẫn đầu', text: 'Khi Vô Danh tới cổng, ba vị trí được nhận đã có chủ. Ba tấm bia đã ở lại sau lưng. Vô Danh dừng thở một nhịp rồi bước hẳn qua vạch đích.' },
    { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Về đích hạng {rank}', text: '“Ngươi về hạng {rank}. Lượt tuyển này chỉ nhận ba hạng đầu, nên ta không thể trao danh phận Nội môn cho ngươi. Kết quả sẽ được ghi trong hành trình. Nếu muốn thử lại, hãy nhớ đoạn đường nào đã khiến ngươi chậm chân.”' },
    { speaker: 'Vô Danh · Nội tâm', title: 'Một lời giữa đỉnh núi', text: 'Vô Danh nhớ câu Minh Không nói trước vạch xuất phát: “Lời khuyên quý hơn một bước chạy.” Có lẽ lần sau phải nhìn lại bia nào đã giữ mình lâu nhất. Con đường xuống núi vẫn còn đó; lời hẹn với chính mình cũng vậy.' },
  ],
}

export const trigrams = ['Càn', 'Đoài', 'Ly', 'Chấn', 'Tốn', 'Khảm', 'Cấn', 'Khôn']
export const directions = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc']
export const puzzles = [
  { title: 'Phong Trúc Quan Trắc', gate: 1500 * TRIAL_DISTANCE_SCALE, seconds: PUZZLE_SECONDS,
    context: 'Mây mù phủ ba lối rẽ, tiếng lá quệt nhau nghe như chân người chạy bên cạnh. Trước cửa trái, bóng một thân trúc kéo dài trên đất ướt; phía trên, ngọn cây bị gió bẻ nghiêng sang hướng khác. Bia đá tỏa ánh xanh lục, rễ trúc chờ sẵn dưới lớp lá mục.',
    dialogue: [
      { speaker: 'Linh Nhi', text: '“Ba cửa mà chỉ một cửa mở. Bóng trúc ở bên trái, ngọn trúc lại nghiêng ra sau... hai hướng khác nhau đấy.”' },
      { speaker: 'Trưởng lão · Tiếng vọng từ bia', text: '“Cửa này hỏi bóng do nắng tạo ra, không hỏi ngọn bị gió đẩy. Ví dụ: nắng rọi từ Đông thì thân trúc chắn sáng và bóng đổ về Tây. Gió từ Nam chỉ làm ngọn nghiêng Bắc.”' },
      { speaker: 'Bạch Tùng', text: '“Chọn cửa mang hướng của bóng. Cửa sai sẽ gọi rễ trúc giữ người lại; đừng để mắt chạy theo ngọn lá.”' },
    ],
    poem: 'Trúc hư tâm dĩ hữu tiết, phong quá bất lưu thanh.\nSinh môn nằm nơi bóng trúc lùi khỏi nắng,\nLạc bước vào Tử môn, ngàn trượng trúc giáp sẽ giam cầm.',
    clue: 'Mặt trời ở Đông → bóng cây ngả Tây. Gió từ Nam sang Bắc → đỉnh trúc nghiêng Bắc. Hãy phân biệt bóng nắng với hướng gió.',
    choices: ['A. Cửa Đông (Chấn - Mộc)', 'B. Cửa Tây (Đoài - Thủy) · Bên trái', 'C. Cửa Bắc (Khảm - Phong)'], answer: 1,
    explanation: 'Sinh môn ở phía Tây, theo bóng nắng buổi sáng.',
    penalty: 'Rễ trúc giam 5 giây, trừ 10 giây đếm ngược; tối đa 2 người phía sau vượt lên.' },
  { title: 'Ngũ Hành Tương Sinh', gate: 2100 * TRIAL_DISTANCE_SCALE, seconds: PUZZLE_SECONDS,
    context: 'Qua rừng trúc, đường đá tan vào đầm lầy. Năm thạch trụ Kim · Mộc · Thủy · Hỏa · Thổ nhô lên giữa sương mù; mặt mỗi trụ có một vết chân phát sáng rồi vụt tắt. Mùi rêu độc bám vào cổ áo, còn bờ bên kia đã khuất sau màn hơi nước.',
    dialogue: [
      { speaker: 'Thiết Sơn', text: '“Năm trụ, hai bước. Ta chỉ cần nhảy lên trụ cao nhất?” Minh Không kéo tay áo hắn: “Bia hỏi quan hệ ngũ hành, không hỏi độ cao.”' },
      { speaker: 'Trưởng lão · Tiếng vọng từ bia', text: '“Khởi đầu là Mộc. Hãy chọn hai ô theo đúng thứ tự ghi trên lựa chọn; ô thứ nhất phải nuôi Mộc, ô thứ hai giữ đường Mộc thông suốt. Ví dụ, Thủy sinh Mộc; Kim khắc Mộc, còn Hỏa đốt Mộc. Chọn sai hoặc hết giờ sẽ dính Độc Bão.”' },
      { speaker: 'Minh Không', text: '“Độc làm chậm cả đi, chạy lẫn lướt trong mười giây trên đường. Lúc còn đứng trước bia, trận pháp giữ nguyên độc lực.”' },
    ],
    poem: 'Thanh trúc thuộc Mộc, nhờ Thủy mà tươi tốt.\nHỏa diệt Mộc tàn, Kim đâm Mộc gãy.\nMuốn mượn lối đi, hãy dẫm lên ngón chân Tương Sinh, né tránh đường Tương Khắc.',
    clue: 'Bắt đầu: MỘC → Ô 1 → Ô 2 → Thoát: ĐỈNH NÚI. Chọn đường nhảy an toàn cho Mộc.',
    choices: ['A. Thủy → Kim', 'B. Thủy → Mộc', 'C. Hỏa → Thổ'], answer: 1,
    explanation: 'Thủy sinh Mộc, Mộc đồng hành với Mộc. Kim khắc Mộc; Hỏa thiêu Mộc.',
    penalty: 'Độc Bão giảm 20% tốc độ di chuyển trong 10 giây chạy tiếp theo.' },
  { title: 'Âm Dương Bát Quái', gate: 2700 * TRIAL_DISTANCE_SCALE, seconds: PUZZLE_SECONDS,
    context: 'Bậc đá lên đỉnh chỉ còn một đoạn, nhưng uy áp từ đĩa Bát Quái chặn kín lối. Hai vòng khắc quẻ chuyển động lệch nhịp, cá trắng ở giữa lúc hiện lúc chìm trong ánh vàng bình minh. Sau lưng, tiếng Suối Trúc chảy về Nam vọng qua vực đá.',
    dialogue: [
      { speaker: 'Bạch Tùng', text: '“Có hai vòng xoay riêng. Đổi một vòng mà quên vòng kia thì trận vẫn khóa.”' },
      { speaker: 'Trưởng lão · Tiếng vọng từ bia', text: '“Trước hết bấm xoay cá Dương trắng cho tới khi nút chỉ Càn. Sau đó xoay vòng ngoài cho tới khi dòng Khảm chỉ Nam, cùng hướng Suối Trúc sau lưng. Ví dụ, chỉ đúng Càn mà Khảm còn ở Tây Nam vẫn là sai. Chỉ bấm Khai trận khi cả hai đã khớp.”' },
      { speaker: 'Linh Nhi', text: '“Ta nghe suối chảy phía Nam. Bình minh là Dương thịnh; nhớ cá trắng trước, vòng ngoài sau!”' },
    ],
    poem: 'Nhật vi Dương, Nguyệt vi Âm.\nBình minh ló rạng, Dương thịnh Âm suy.\nXoay đĩa Bát Quái: Định hướng Khảm - Càn, mở đường Vạn Thọ!',
    clue: 'Buổi sáng: Dương khí tăng. Suối Trúc sau lưng chảy về phía Nam. Cá Dương trắng chầu Càn; Khảm trùng hướng suối.',
    explanation: 'Dương trắng chầu Càn, Khảm hướng Nam trung hòa linh lực.',
    penalty: 'Sóng linh lực hất lùi 50m (500px), đối thủ có cơ hội vượt lên.' },
]
export function createTrial() {
  return { stage: 0, active: false, remaining: PUZZLE_SECONDS, trapped: 0, slow: 0, message: '' }
}
export function prologuePhase(x, stage = 0) {
  if (stage === 3 && x >= SUMMIT_GATE) return 'complete'
  if (stage < 3 && x >= puzzles[stage].gate) return 'maze'
  return stage ? 'summit' : 'forest'
}
export function answerTrial(trial, run, answer) {
  if (!trial.active || trial.trapped > 0) return { trial, run }
  const puzzle = puzzles[trial.stage]
  const correct = trial.stage === 2 ? answer?.fish === 0 && answer?.ring === 7 : answer === puzzle.answer
  if (correct) return { run, trial: { ...trial, stage: trial.stage + 1, active: false, remaining: puzzles[trial.stage + 1]?.seconds ?? 0, message: puzzle.explanation } }
  const next = { ...trial, message: `Sai trận pháp! ${puzzle.penalty}` }
  let nextRun = { ...run, racers: run.racers.map(r => ({ ...r })) }
  if (trial.stage === 0) {
    next.trapped = 5
    next.remaining = Math.max(0, trial.remaining - 10)
    const behind = nextRun.racers.filter(r => r.x <= run.x).sort((a, b) => b.x - a.x)
    behind.slice(0, 2).forEach((r, i) => { r.x = run.x + 30 + i * 30 })
  } else if (trial.stage === 1) next.slow = 10
  else { nextRun.x -= 500; next.active = false }
  if (next.remaining <= 0) next.remaining = puzzle.seconds
  return { trial: next, run: nextRun }
}
export function tickTrial(trial, run, dt) {
  if (trial.trapped > 0) return { run, trial: { ...trial, trapped: Math.max(0, trial.trapped - dt) } }
  if (!trial.active) {
    if (trial.stage < 3 && run.x >= puzzles[trial.stage].gate) return { run: { ...run, x: puzzles[trial.stage].gate, dash: 0 }, trial: { ...trial, active: true } }
    return { run, trial: { ...trial, slow: Math.max(0, trial.slow - dt) } }
  }
  const remaining = trial.remaining - dt
  if (remaining <= 0) {
    const result = answerTrial({ ...trial, remaining: 0 }, run, null)
    result.trial.message = `Hết giờ! ${puzzles[trial.stage].penalty}`
    return result
  }
  return { run, trial: { ...trial, remaining } }
}

export function stepTrialRun(run, input, dt, trial) {
  if (trial.active || trial.trapped > 0) return run
  return stepRun(run, { ...input, speedScale: trial.slow > 0 ? .8 : 1 }, dt)
}
