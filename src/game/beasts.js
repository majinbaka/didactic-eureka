import roster from './beastRoster.json' with { type: 'json' }
export const beastCatalog = roster
export const BEAST_ACTIONS = { idle: 'Đứng', walk: 'Di chuyển', jump: 'Nhảy', attack: 'Đánh thường', skill: 'Thi triển chiêu', hurt: 'Bị thương', collapse: 'Gục ngã' }
export const BEAST_ELEMENTS = { wood: 'Mộc', fire: 'Hỏa', earth: 'Thổ', metal: 'Kim', water: 'Thủy', shadow: 'Ảnh', wind: 'Phong', lightning: 'Lôi', ice: 'Băng' }
export function beastFrame(beast, action, seconds) {
  const animation = beast.animations[action] || beast.animations.idle
  const step = Math.floor(Math.max(0, Number.isFinite(seconds) ? seconds : 0) * animation.fps)
  return animation.frames[animation.loop ? step % animation.frames.length : Math.min(step, animation.frames.length - 1)]
}

export const BEAST_SIZES = { tiny: 'Tí hon', small: 'Nhỏ', medium: 'Vừa', large: 'Lớn', huge: 'Khổng lồ' }
export function beastActionLabel(beast, action) {
  if (beast.locomotion === 'flying') return { idle: 'Lơ lửng', walk: 'Bay', jump: 'Vọt cao / hạ cánh' }[action] || BEAST_ACTIONS[action]
  return BEAST_ACTIONS[action]
}
