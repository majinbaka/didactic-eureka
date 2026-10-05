import { stepRun } from './runner.js'

export const TRIAL_DISTANCE_SCALE = 20
export const MAZE_GATE = 1500 * TRIAL_DISTANCE_SCALE
export const SUMMIT_GATE = 3000 * TRIAL_DISTANCE_SCALE
export const PUZZLE_SECONDS = 5 * 60

export const openingScenes = [
  { speaker: 'Dẫn chuyện', title: 'Rừng trúc trước bình minh', text: 'Sương đọng thành giọt trên đầu lá. Dưới chân Trúc Linh Phong, hàng trăm thí sinh chờ cuộc tuyển chọn mười năm một lần; trên đoạn đường hiện ra trước mắt là năm người. Tiếng chuông từ Thái Huyền Tông vọng xuống, mỗi nhịp như thúc họ bước gần hơn tới cổng núi.' },
  { speaker: 'Vô Danh', title: 'Một con đường còn lại', text: 'Phế linh căn, không linh thạch, không ai tiến cử... Nếu quay về hôm nay, ta còn có thể đi đâu?' },
  { speaker: 'Linh Nhi', title: 'Trước vạch đá', text: 'Ngươi run à? Ta cũng run. Qua vạch rồi, đừng nhìn chân người khác; đá rêu ở đây dễ làm trượt lắm.' },
  { speaker: 'Minh Không', title: 'Lời khuyên', text: 'Lời khuyên quý hơn một bước chạy. Cứ nhớ nhìn đường dưới chân nhé.' },
  { speaker: 'Thiết Sơn', title: 'Đoạn dốc', text: 'Các ngươi cứ nói. Ta muốn biết đoạn dốc chịu nổi mấy lần nhảy.' },
  { speaker: 'Bạch Tùng', title: 'Ba cửa quan', text: 'Đừng quên ba bia đá. Chạy nhanh mà giải sai cũng vô ích.' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Luật cuộc đua', text: 'Nghe rõ: đi qua ba bia đá theo thứ tự rồi chạm cổng trên đỉnh Trúc Linh Phong. Ba người về đầu trong nhóm năm người được nhận vào Nội môn. Linh căn và xuất thân không cộng điểm.' },
  { speaker: 'Thiết Sơn', title: 'Một câu hỏi thẳng', text: 'Nếu tới bia trước, ta có thể đứng chắn người sau không?' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Đường do chính mình mở', text: 'Không đánh, không đẩy, không phá bia hay nhờ người ngoài giải hộ. Mỗi người phải tự giải đủ ba bia; tới trước không có quyền khóa đường người sau.' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Năm phút cho mỗi bia', text: 'Mỗi bia cho năm phút. Chọn sai hoặc hết giờ thì chịu hình phạt ghi dưới bia, rồi giải lại. Bia rừng trúc còn giữ chân năm giây và trừ mười giây.' },
  { speaker: 'Bạch Tùng', title: 'Ba bia, ba cái giá', text: 'Còn hai bia sau? Người trượt ở đó phải bắt đầu lại từ chân núi sao?' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Hình phạt không xóa đường', text: 'Không. Bia Ngũ Hành làm chậm bước mười giây; bia Bát Quái hất lùi năm mươi mét. Cứ trở lại giải tiếp; không ai bị loại chỉ vì một câu sai.' },
  { speaker: 'Minh Không', title: 'Điều phải nhớ', text: 'Vậy về ba sau khi giải đủ ba bia vẫn được nhận?' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Tiếng chuông giữ nhịp', text: 'Được. Khi bia hiện ra, trận pháp giữ cả nhóm đứng lại, nhưng đồng hồ giải vẫn đếm. Chớ quên thời hạn.' },
  { speaker: 'Linh Nhi', title: 'Lời hẹn trên đỉnh', text: 'Nghe rõ chưa? Ta sẽ không đợi ngươi ở chân núi đâu.' },
  { speaker: 'Vô Danh', title: 'Lời hẹn trên đỉnh', text: 'Vậy gặp nhau trên đỉnh.' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Khai cuộc', text: 'Thái Huyền Tông mở cửa. Các thí sinh, khai cuộc!' },
]

export const endingScenes = {
  winner: [
    { speaker: 'Vô Danh', title: 'Qua cổng đúng hạn', text: 'Ta đã qua đủ ba bia và về trong ba người đầu. Cuối cùng cũng tới được đỉnh núi!' },
    { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Được nhận vào Nội môn!', text: '“Ta đã chứng kiến ngươi qua đủ ba bia và về trong ba hạng đầu. Theo luật đã công bố, Vô Danh được nhận vào Nội môn Thái Huyền Tông. Từ hôm nay, hãy giữ lời mình đã chọn trên đường lên núi.”' },
    { speaker: 'Linh Nhi', title: 'Sau vạch đích', text: 'Ta đã bảo sẽ gặp ngươi trên đỉnh mà. Chào mừng đến Nội môn!' },
  ],
  defeat: [
    { speaker: 'Vô Danh', title: 'Sau người dẫn đầu', text: 'Ba bia đã ở lại sau lưng, nhưng ba vị trí đầu đều có chủ rồi...' },
    { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Về đích hạng {rank}', text: '“Ngươi về hạng {rank}. Lượt tuyển này chỉ nhận ba hạng đầu, nên ta không thể trao danh phận Nội môn cho ngươi. Kết quả sẽ được ghi trong hành trình. Nếu muốn thử lại, hãy nhớ đoạn đường nào đã khiến ngươi chậm chân.”' },
    { speaker: 'Vô Danh', title: 'Một lời giữa đỉnh núi', text: 'Lần sau ta sẽ nhớ lời Minh Không và nhìn kỹ từng bia. Con đường này vẫn còn đó.' },
  ],
}

export const trigrams = ['Càn', 'Đoài', 'Ly', 'Chấn', 'Tốn', 'Khảm', 'Cấn', 'Khôn']
export const directions = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc']
export const puzzles = [
  { title: 'Phong Trúc Quan Trắc', gate: 1500 * TRIAL_DISTANCE_SCALE, seconds: PUZZLE_SECONDS,
    context: 'Mây mù phủ ba lối rẽ, tiếng lá quệt nhau nghe như chân người chạy bên cạnh. Trước cửa trái, bóng một thân trúc kéo dài trên đất ướt; phía trên, ngọn cây bị gió bẻ nghiêng sang hướng khác. Bia đá tỏa ánh xanh lục, rễ trúc chờ sẵn dưới lớp lá mục.',
    dialogue: [
      { speaker: 'Bia đá', text: 'Ba cửa, một Sinh môn. Bóng trúc lùi khỏi nắng; đừng nhầm hướng gió với hướng bóng.' },
      { speaker: 'Linh Nhi', text: 'Bóng trúc ở bên trái, ngọn trúc lại nghiêng ra sau... hai hướng khác nhau đấy.' },
      { speaker: 'Bạch Tùng', text: 'Nắng từ Đông thì bóng đổ về Tây. Chọn cửa mang hướng của bóng.' },
    ],
    poem: 'Trúc hư tâm dĩ hữu tiết, phong quá bất lưu thanh.\nSinh môn nằm nơi bóng trúc lùi khỏi nắng,\nLạc bước vào Tử môn, ngàn trượng trúc giáp sẽ giam cầm.',
    clue: 'Mặt trời ở Đông → bóng cây ngả Tây. Gió từ Nam sang Bắc → đỉnh trúc nghiêng Bắc. Hãy phân biệt bóng nắng với hướng gió.',
    choices: ['A. Cửa Đông (Chấn - Mộc)', 'B. Cửa Tây (Đoài - Thủy) · Bên trái', 'C. Cửa Bắc (Khảm - Phong)'], answer: 1,
    explanation: 'Sinh môn ở phía Tây, theo bóng nắng buổi sáng.',
    penalty: 'Rễ trúc giam 5 giây, trừ 10 giây đếm ngược; tối đa 2 người phía sau vượt lên.' },
  { title: 'Ngũ Hành Tương Sinh', gate: 2100 * TRIAL_DISTANCE_SCALE, seconds: PUZZLE_SECONDS,
    context: 'Qua rừng trúc, đường đá tan vào đầm lầy. Năm thạch trụ Kim · Mộc · Thủy · Hỏa · Thổ nhô lên giữa sương mù; mặt mỗi trụ có một vết chân phát sáng rồi vụt tắt. Mùi rêu độc bám vào cổ áo, còn bờ bên kia đã khuất sau màn hơi nước.',
    dialogue: [
      { speaker: 'Bia đá', text: 'Khởi đầu là Mộc. Ô thứ nhất phải nuôi Mộc, ô thứ hai giữ đường Mộc thông suốt. Chọn sai sẽ dính Độc Bão.' },
      { speaker: 'Thiết Sơn', text: 'Năm trụ, hai bước. Ta chỉ cần nhảy lên trụ cao nhất?' },
      { speaker: 'Minh Không', text: 'Bia hỏi quan hệ ngũ hành, không hỏi độ cao. Thủy sinh Mộc; Kim khắc Mộc.' },
    ],
    poem: 'Thanh trúc thuộc Mộc, nhờ Thủy mà tươi tốt.\nHỏa diệt Mộc tàn, Kim đâm Mộc gãy.\nMuốn mượn lối đi, hãy dẫm lên ngón chân Tương Sinh, né tránh đường Tương Khắc.',
    clue: 'Bắt đầu: MỘC → Ô 1 → Ô 2 → Thoát: ĐỈNH NÚI. Chọn đường nhảy an toàn cho Mộc.',
    choices: ['A. Thủy → Kim', 'B. Thủy → Mộc', 'C. Hỏa → Thổ'], answer: 1,
    explanation: 'Thủy sinh Mộc, Mộc đồng hành với Mộc. Kim khắc Mộc; Hỏa thiêu Mộc.',
    penalty: 'Độc Bão giảm 20% tốc độ di chuyển trong 10 giây chạy tiếp theo.' },
  { title: 'Âm Dương Bát Quái', gate: 2700 * TRIAL_DISTANCE_SCALE, seconds: PUZZLE_SECONDS,
    context: 'Bậc đá lên đỉnh chỉ còn một đoạn, nhưng uy áp từ đĩa Bát Quái chặn kín lối. Hai vòng khắc quẻ chuyển động lệch nhịp, cá trắng ở giữa lúc hiện lúc chìm trong ánh vàng bình minh. Sau lưng, tiếng Suối Trúc chảy về Nam vọng qua vực đá.',
    dialogue: [
      { speaker: 'Bia đá', text: 'Cá Dương trắng phải chầu Càn. Dòng Khảm trên vòng ngoài phải chỉ Nam, cùng hướng Suối Trúc. Khớp cả hai mới khai trận.' },
      { speaker: 'Bạch Tùng', text: 'Có hai vòng xoay riêng. Đổi một vòng mà quên vòng kia thì trận vẫn khóa.' },
      { speaker: 'Linh Nhi', text: 'Ta nghe suối chảy phía Nam. Nhớ cá trắng trước, vòng ngoài sau!' },
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
