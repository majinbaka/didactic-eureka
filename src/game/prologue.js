import { stepRun } from './runner.js'

export const TRIAL_DISTANCE_SCALE = 20
export const MAZE_GATE = 1500 * TRIAL_DISTANCE_SCALE
export const SUMMIT_GATE = 3000 * TRIAL_DISTANCE_SCALE
export const PUZZLE_SECONDS = 5 * 60

export const openingScenes = [
  { speaker: 'Vô Danh · Nội tâm', title: 'Tỉnh giác giữa Rừng Trúc U Tinh', text: 'Gió lạnh quá... Cuối cùng cũng tới được Rừng Trúc U Tinh rồi sao?' },
  { speaker: 'Vô Danh · Nội tâm', title: 'Đại lễ mười năm một lần', text: 'Gia tộc suy vong, bản thân lại mang phế linh căn. Nếu không thể bái nhập Thái Huyền Tông lần này, ta sẽ chẳng còn cơ hội quay đầu. Bất luận thế nào, hôm nay ta phải giành lấy vị trí đầu tiên!' },
  { speaker: 'Dẫn chuyện', title: 'Tiếng pháo hiệu xuất phát', text: 'Hàng trăm tu sĩ trẻ tuổi tụ giữa rừng trúc. Trên ngọn trúc cao nhất, một vị trưởng lão áo trắng lướt qua hư không, giọng nói ngân như chuông đồng.' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Trúc Linh Phong · Thử thách nhập môn', text: 'Rừng Trúc U Tinh là cửa quan đầu tiên! Chỉ người đầu tiên vượt qua rừng trúc và bước lên ngọn Linh Phong mới có quyền trở thành Đệ tử Nội môn. Tiên duyên ở ngay trước mắt... Khai cuộc!' },
]

export const trigrams = ['Càn', 'Đoài', 'Ly', 'Chấn', 'Tốn', 'Khảm', 'Cấn', 'Khôn']
export const directions = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc']
export const puzzles = [
  { title: 'Phong Trúc Quan Trắc', gate: 1500 * TRIAL_DISTANCE_SCALE, seconds: PUZZLE_SECONDS,
    context: 'Mây mù bao phủ ba lối rẽ. Trúc ma quỷ chắn đường, bia đá tỏa ánh xanh lục.',
    poem: 'Trúc hư tâm dĩ hữu tiết, phong quá bất lưu thanh.\nSinh môn nằm ở nơi ngọn trúc nghiêng theo bóng nắng,\nLạc bước vào Tử môn, ngàn trượng trúc giáp sẽ giam cầm.',
    clue: 'Mặt trời ở Đông → bóng cây ngả Tây. Gió từ Nam sang Bắc → đỉnh trúc nghiêng Bắc. Hãy phân biệt bóng nắng với hướng gió.',
    choices: ['A. Cửa Đông (Chấn - Mộc)', 'B. Cửa Tây (Đoài - Thủy) · Bên trái', 'C. Cửa Bắc (Khảm - Phong)'], answer: 1,
    explanation: 'Sinh môn ở phía Tây, theo bóng nắng buổi sáng.',
    penalty: 'Rễ trúc giam 5 giây, trừ 10 giây đếm ngược và tụt 2 hạng (tối đa hạng 5).' },
  { title: 'Ngũ Hành Tương Sinh', gate: 2100 * TRIAL_DISTANCE_SCALE, seconds: PUZZLE_SECONDS,
    context: 'Đầm lầy phủ rêu độc. Năm thạch trụ Kim · Mộc · Thủy · Hỏa · Thổ nhô lên giữa sương mù.',
    poem: 'Thanh trúc thuộc Mộc, nhờ Thủy mà tươi tốt.\nHỏa diệt Mộc tàn, Kim đâm Mộc gãy.\nMuốn mượn lối đi, hãy dẫm lên ngón chân Tương Sinh, né tránh đường Tương Khắc.',
    clue: 'Bắt đầu: MỘC → Ô 1 → Ô 2 → Thoát: ĐỈNH NÚI. Chọn đường nhảy an toàn cho Mộc.',
    choices: ['A. Thủy → Kim', 'B. Thủy → Mộc', 'C. Hỏa → Thổ'], answer: 1,
    explanation: 'Thủy sinh Mộc, Mộc đồng hành với Mộc. Kim khắc Mộc; Hỏa thiêu Mộc.',
    penalty: 'Độc Bão giảm 20% tốc độ di chuyển trong 10 giây chạy tiếp theo.' },
  { title: 'Âm Dương Bát Quái', gate: 2700 * TRIAL_DISTANCE_SCALE, seconds: PUZZLE_SECONDS,
    context: 'Bậc đá đỉnh núi đã gần kề. Uy áp dồn dập tràn qua đĩa Bát Quái hai vòng.',
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
