import { collectNearby, createStageCollectibles } from './collectibles.js'

export const SCENERY_CHUNK = 320
export const JUMP_VELOCITY = 580
// World-space rectangles, matching the solid silhouettes drawn by the renderer.
const OPENING_OBSTACLES = [
  { x: 400, width: 80, height: 48, sprite: 'classic-low', contactInset: 1 },
  { x: 740, width: 96, height: 64, sprite: 'carved-medium', contactInset: 2 },
  { x: 1080, width: 72, height: 48, sprite: 'classic-low', contactInset: 1 },
  { x: 1152, width: 112, height: 112, sprite: 'carved-tall-wide', contactInset: 2 },
  { x: 1730, width: 96, height: 64, sprite: 'classic-medium', contactInset: 1 },
  { x: 2350, width: 80, height: 48, sprite: 'carved-low', contactInset: 2 },
  { x: 2430, width: 112, height: 112, sprite: 'classic-tall-wide', contactInset: 1 },
  { x: 2850, width: 80, height: 64, sprite: 'classic-medium', contactInset: 1 },
  { x: 3150, width: 144, height: 92, bottom: 41, kind: 'floating', sprite: 'spirit-slab' },
  { x: 3540, width: 104, height: 76, bottom: 28, kind: 'floating', sprite: 'moss-rock' },
  { x: 3900, width: 78, height: 106, bottom: 34, kind: 'floating', sprite: 'jade-crag' },
]
const PATH_OBSTACLE_TYPES = [
  { sprite: 'bamboo-log', width: 168, height: 42, contactInset: 2 },
  { sprite: 'tree-stump', width: 100, height: 78, contactInset: 2 },
  { sprite: 'lantern-plinth', width: 72, height: 104, contactInset: 2 },
  { sprite: 'torii-beam', width: 184, height: 72, contactInset: 3 },
  { sprite: 'watch-post', width: 84, height: 110, contactInset: 2 },
]
const FLOATING_OBSTACLE_TYPES = [
  { sprite: 'spirit-slab', width: 144, height: 92, bottom: 41 },
  { sprite: 'moss-rock', width: 104, height: 76, bottom: 28 },
  { sprite: 'jade-crag', width: 78, height: 106, bottom: 34 },
]
const TRIAL_LANDMARKS = [30000, 42000, 54000, 60000]
const isClearOfLandmark = x => TRIAL_LANDMARKS.every(landmark => Math.abs(x - landmark) > 520)
const LONG_PATH_OBSTACLES = Array.from({ length: 72 }, (_, index) => {
  const x = 4400 + index * 760 + (index % 4) * 95
  if (!isClearOfLandmark(x)) return null
  if (index % 4 === 3) return { x, kind: 'floating', ...FLOATING_OBSTACLE_TYPES[index % FLOATING_OBSTACLE_TYPES.length] }
  return { x, ...PATH_OBSTACLE_TYPES[index % PATH_OBSTACLE_TYPES.length] }
}).filter(Boolean)
export const OBSTACLES = [...OPENING_OBSTACLES, ...LONG_PATH_OBSTACLES]
const HALF_BODY = 18
const overlaps = (x, obstacle) => x + 64 + HALF_BODY > obstacle.x && x + 64 - HALF_BODY < obstacle.x + obstacle.width
export const isSupported = state => state.y === 0 || OBSTACLES.some(o => overlaps(state.x, o) && Math.abs(state.y - o.height) < .001)

function moveBody(body, velocity, dt, input = {}) {
  // Small physics steps prevent running/dashing through walls and missing ledges.
  const steps = Math.max(1, Math.ceil(dt / (1 / 120)))
  const delta = dt / steps
  for (let i = 0; i < steps; i++) {
    const previousY = body.y
    if (body.flying) {
      body.y = Math.max(40, Math.min(260, body.y + ((input.up ? 1 : 0) - (input.down ? 1 : 0)) * 220 * delta))
      if (!input.up && !input.down) body.y = Math.max(72, body.y + Math.sin(body.time * 4) * 12 * delta)
    } else if (!isSupported(body) || body.vy > 0) {
      body.vy -= 1450 * delta
      body.y += body.vy * delta
    }
    if (body.y <= previousY) {
      const floor = OBSTACLES.filter(o => overlaps(body.x, o) && previousY >= o.height && body.y <= o.height)
        .reduce((height, o) => Math.max(height, o.height), 0)
      if (body.y <= floor) { body.y = floor; body.vy = 0 }
    }
    let nextX = body.x + velocity * delta
    for (const o of OBSTACLES) {
      const obstacleBottom = o.bottom ?? 0
      if (body.y >= o.height || body.y < obstacleBottom) continue
      const right = body.x + 64 + HALF_BODY, left = body.x + 64 - HALF_BODY
      if (velocity > 0 && right <= o.x && nextX + 64 + HALF_BODY > o.x) nextX = Math.min(nextX, o.x - 64 - HALF_BODY)
      if (velocity < 0 && left >= o.x + o.width && nextX + 64 - HALF_BODY < o.x + o.width) nextX = Math.max(nextX, o.x + o.width - 64 + HALF_BODY)
    }
    body.x = nextX
  }
}
const ACTION_DURATION = { hello: 1.4, scratch: 1.4, doze: 3, sit: 3, crawl: 2.2, hurt: .4, collapse: Infinity }
const RACERS = [
  { id: 'female', name: 'Linh Nhi', x: -25, lane: -10, speed: 225, rhythm: .7 },
  { id: 'bald-monk', name: 'Minh Không', x: -60, lane: 7, speed: 218, rhythm: 1.9 },
  { id: 'strongman', name: 'Thiết Sơn', x: -95, lane: 15, speed: 205, rhythm: 3.1 },
  { id: 'elder', name: 'Bạch Tùng', x: -130, lane: -2, speed: 222, rhythm: 4.4 },
]

function seededValue(index, salt = 0) {
  let value = Math.imul(index ^ (salt * 374761393), 668265263)
  value = Math.imul(value ^ (value >>> 13), 1274126177)
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296
}

export function sceneryForChunk(index) {
  const count = 2 + Math.floor(seededValue(index, 1) * 3)
  const kinds = ['stone', 'pebbles', 'grass', 'bamboo-shoot', 'variant-pebbles', 'variant-fern', 'variant-bamboo', 'variant-lantern']
  return {
    index,
    bambooOffset: 24 + Math.floor(seededValue(index, 2) * 180),
    bambooHeight: 150 + Math.floor(seededValue(index, 3) * 95),
    bambooTone: Math.floor(seededValue(index, 4) * 3),
    details: Array.from({ length: count }, (_, item) => ({
      kind: kinds[Math.floor(seededValue(index, item + 10) * kinds.length)],
      offset: 18 + Math.floor(seededValue(index, item + 20) * (SCENERY_CHUNK - 48)),
      scale: .75 + seededValue(index, item + 30) * .65,
    })),
  }
}
export function createRun() {
  return {
    x: 100, y: 0, vy: 0, facing: 1, time: 0, cooldown: 0, dash: 0, actionMove: 0, flying: false, action: null, actionTime: 0,
    racers: RACERS.map(racer => ({ ...racer, x: 100 + racer.x, y: 0, vy: 0 })),
    shots: [], hits: 0, targets: [560, 940, 1260, 2250].map(x => ({ x, hp: 3 })),
    collectibles: createStageCollectibles(), lastPickup: null, pickupSequence: 0,
  }
}
export function stepRun(state, input, dt) {
  const s = { ...state, racers: state.racers.map(racer => ({ ...racer })), shots: state.shots.map(b => ({ ...b })), targets: state.targets.map(t => ({ ...t })), collectibles: state.collectibles.map(item => ({ ...item })) }
  s.time += dt
  s.cooldown = Math.max(0, s.cooldown - dt)
  s.dash = Math.max(0, s.dash - dt)
  s.actionMove = Math.max(0, (s.actionMove || 0) - dt)
  if (input.action && ACTION_DURATION[input.action]) { s.action = input.action; s.actionTime = 0 }
  if (input.actionMove) s.actionMove = input.action === 'crawl' ? ACTION_DURATION.crawl : .55
  if (s.action) {
    s.actionTime += dt
    if (s.actionTime >= ACTION_DURATION[s.action]) { s.action = null; s.actionTime = 0 }
  }
  if (input.flyToggle) { s.flying = !s.flying; s.vy = 0; if (!s.flying) s.y = Math.max(0, s.y) }
  const canMove = !s.action || s.action === 'crawl'
  if (input.move && canMove) s.facing = Math.sign(input.move)
  if (input.jump && isSupported(s) && !s.flying && canMove) s.vy = JUMP_VELOCITY
  if (input.dash) s.dash = .18
  const speed = s.action === 'crawl' ? 90 : input.run ? 390 : 240
  const move = input.move || (s.actionMove > 0 ? s.facing : 0)
  moveBody(s, (canMove ? (s.dash ? s.facing * 780 : move * speed) : 0) * (input.speedScale ?? 1), dt, input)
  const pickup = collectNearby(s.collectibles, s.x)
  s.collectibles = pickup.collectibles
  if (pickup.collected) { s.lastPickup = pickup.collected; s.pickupSequence += 1 }
  for (const racer of s.racers) {
    const stride = Math.sin(s.time * 1.7 + racer.rhythm) * 22
    const speed = Math.max(175, racer.speed + stride)
    if (isSupported(racer) && OBSTACLES.some(o => o.height > racer.y && o.x >= racer.x + 82 && o.x - (racer.x + 82) < 90)) racer.vy = JUMP_VELOCITY
    moveBody(racer, speed, dt)
  }
  if (input.fire && !s.cooldown && s.action !== 'collapse') {
    s.shots.push({ x: s.x + 64 + s.facing * 48, y: s.y + 62, dir: s.facing })
    s.cooldown = .22
  }
  s.shots = s.shots.filter(b => {
    b.x += b.dir * 650 * dt
    const target = s.targets.find(t => t.hp > 0 && Math.abs(t.x + 32 - b.x) < 35 && b.y < 96)
    if (target) { target.hp--; s.hits++; return false }
    return Math.abs(b.x - s.x) < 1800
  })
  return s
}
