export const WORLD = 1800
const ACTION_DURATION = { hello: 1.4, scratch: 1.4, doze: 3, sit: 3, crawl: 2.2, hurt: .4, collapse: Infinity }
export function createRun() {
  return { x: 100, y: 0, vy: 0, facing: 1, time: 0, cooldown: 0, dash: 0, flying: false, action: null, actionTime: 0, shots: [], hits: 0, targets: [480, 860, 1240, 1600].map(x => ({ x, hp: 3 })) }
}
export function stepRun(state, input, dt) {
  const s = { ...state, shots: state.shots.map(b => ({ ...b })), targets: state.targets.map(t => ({ ...t })) }
  s.time += dt
  s.cooldown = Math.max(0, s.cooldown - dt)
  s.dash = Math.max(0, s.dash - dt)
  if (input.action && ACTION_DURATION[input.action]) { s.action = input.action; s.actionTime = 0 }
  if (s.action) {
    s.actionTime += dt
    if (s.actionTime >= ACTION_DURATION[s.action]) { s.action = null; s.actionTime = 0 }
  }
  if (input.flyToggle) { s.flying = !s.flying; s.vy = 0; if (!s.flying) s.y = Math.max(0, s.y) }
  const canMove = !s.action || s.action === 'crawl'
  if (input.move && canMove) s.facing = Math.sign(input.move)
  if (input.jump && s.y === 0 && !s.flying && canMove) s.vy = 540
  if (input.dash) s.dash = .18
  const speed = s.action === 'crawl' ? 90 : input.run ? 390 : 240
  s.x = Math.max(0, Math.min(WORLD - 128, s.x + (canMove ? (s.dash ? s.facing * 780 : (input.move || 0) * speed) : 0) * dt))
  if (s.flying) {
    s.y = Math.max(40, Math.min(260, s.y + ((input.up ? 1 : 0) - (input.down ? 1 : 0)) * 220 * dt))
    if (!input.up && !input.down) s.y = Math.max(72, s.y + Math.sin(s.time * 4) * 12 * dt)
  } else {
    s.y = Math.max(0, s.y + s.vy * dt)
    s.vy = s.y > 0 ? s.vy - 1450 * dt : 0
  }
  if (input.fire && !s.cooldown && s.action !== 'collapse') {
    s.shots.push({ x: s.x + 64 + s.facing * 48, y: s.y + 62, dir: s.facing })
    s.cooldown = .22
  }
  s.shots = s.shots.filter(b => {
    b.x += b.dir * 650 * dt
    const target = s.targets.find(t => t.hp > 0 && Math.abs(t.x + 32 - b.x) < 35 && b.y < 96)
    if (target) { target.hp--; s.hits++; return false }
    return b.x > 0 && b.x < WORLD
  })
  return s
}
