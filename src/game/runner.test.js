import test from 'node:test'
import assert from 'node:assert/strict'
import { createRun, sceneryForChunk, stepRun, OBSTACLES } from './runner.js'
test('movement continues in both directions and jump lands', () => {
  let s = createRun()
  s = stepRun(s, { move: -1 }, 1)
  assert.equal(s.x, -140)
  s = stepRun(s, { move: 1 }, .5)
  assert.equal(s.x, -20)
  s = stepRun(s, { jump: true }, .016)
  assert.ok(s.y > 0)
  for (let i = 0; i < 100; i++) s = stepRun(s, {}, .016)
  assert.equal(s.y, 0)
})
test('procedural scenery is stable and varies between chunks', () => {
  assert.deepEqual(sceneryForChunk(42), sceneryForChunk(42))
  assert.notDeepEqual(sceneryForChunk(42), sceneryForChunk(43))
  assert.ok(sceneryForChunk(-3).details.length >= 2)
})
test('walking across a collectible picks it up once', () => {
  let state = { ...createRun(), x: 190 }
  state = stepRun(state, { move: 1 }, .1)
  assert.equal(state.pickupSequence, 1)
  assert.equal(state.lastPickup.id, 'thanh-truc-diep')
  const next = stepRun(state, {}, .1)
  assert.equal(next.pickupSequence, 1)
})
test('three shots destroy a target and preserve input state', () => {
  let s = createRun(); s.x = 430
  const before = structuredClone(s)
  s = stepRun(s, { fire: true }, .016)
  assert.deepEqual(before.shots, [])
  for (let i = 0; i < 80; i++) s = stepRun(s, { fire: true }, .016)
  assert.equal(s.targets[0].hp, 0)
  assert.ok(s.hits >= 3)
})
test('flight toggles and keeps the player above ground', () => {
  let s = stepRun(createRun(), { flyToggle: true }, .016)
  assert.equal(s.flying, true)
  assert.ok(s.y >= 40)
  s = stepRun(s, { jump: true }, .5)
  assert.ok(s.y > 40)
  s = stepRun(s, { flyToggle: true }, .016)
  assert.equal(s.flying, false)
})
test('actions expire except for collapse', () => {
  let s = stepRun(createRun(), { action: 'hello' }, .016)
  assert.equal(s.action, 'hello')
  s = stepRun(s, {}, 2)
  assert.equal(s.action, null)
  s = stepRun(s, { action: 'collapse' }, 10)
  assert.equal(s.action, 'collapse')
})
test('four existing characters start behind the player and advance independently without waiting', () => {
  const start = createRun()
  assert.deepEqual(start.racers.map(racer => racer.id), ['female', 'bald-monk', 'strongman', 'elder'])
  assert.ok(start.racers.every(racer => racer.x < start.x))
  const next = stepRun(start, {}, .1)
  assert.ok(next.racers.every((racer, index) => racer.x > start.racers[index].x))
  assert.equal(new Set(next.racers.map(racer => racer.x)).size, 4)
  const racing = Array.from({ length: 20 }).reduce(state => stepRun(state, {}, .25), next)
  assert.ok(racing.racers.every(racer => racer.x > racing.x + 500))
  assert.ok(racing.racers.every(racer => racer.speed < 342))
})

test('action buttons combine jumping and crawling with forward movement', () => {
  const start = createRun()
  const jumping = stepRun(start, { jump: true, actionMove: true }, .1)
  assert.ok(jumping.x > start.x)
  assert.ok(jumping.y > 0)

  const crawling = stepRun(createRun(), { action: 'crawl', actionMove: true }, .5)
  assert.equal(crawling.action, 'crawl')
  assert.ok(crawling.x > 100)

  const facingLeft = { ...createRun(), facing: -1 }
  const leftJump = stepRun(facingLeft, { jump: true, actionMove: true }, .1)
  assert.ok(leftJump.x < facingLeft.x)
})

test('jumping and crawling follow held joystick direction instead of automatic facing', () => {
  const facingRight = createRun()
  const jumpingLeft = stepRun(facingRight, { move: -1, jump: true }, .1)
  assert.ok(jumpingLeft.x < facingRight.x)
  assert.equal(jumpingLeft.facing, -1)

  const facingLeft = { ...createRun(), facing: -1 }
  const crawlingRight = stepRun(facingLeft, { move: 1, action: 'crawl' }, .5)
  assert.ok(crawlingRight.x > facingLeft.x)
  assert.equal(crawlingRight.facing, 1)
})

const advance = (state, input, frames = 120) => {
  for (let i = 0; i < frames; i++) state = stepRun(state, input, 1 / 120)
  return state
}
test('solid walls stop walking, running and dashing from either side', () => {
  for (const input of [{ move: 1 }, { move: 1, run: true }, { dash: true }]) {
    const start = { ...createRun(), x: 300 }
    const snapshot = structuredClone(start)
    assert.equal(advance(start, input).x, 318)
    assert.deepEqual(start, snapshot)
  }
  assert.equal(advance({ ...createRun(), x: 450 }, { move: -1 }).x, 434)
  assert.equal(stepRun(createRun(), { move: 1 }, 20).x, 318)
})
test('jump lands on a rock, remains supported, jumps again and falls off its edge', () => {
  let state = stepRun({ ...createRun(), x: 318 }, { jump: true }, 1 / 120)
  state = advance(state, { move: 1 }, 35)
  state = advance(state, {}, 100)
  assert.equal(state.y, 48)
  assert.equal(state.vy, 0)
  assert.ok(stepRun(state, { jump: true }, .016).y > 48)
  state = advance(state, { move: 1 }, 55)
  state = advance(state, {}, 100)
  assert.equal(state.y, 0)
})
test('every raised step is reachable by jumping from the previous step', () => {
  for (const o of OBSTACLES) {
    const prior = OBSTACLES.find(p => p.x + p.width === o.x)
    let state = { ...createRun(), x: o.x - 82, y: prior?.height ?? 0 }
    state = stepRun(state, { jump: true }, 1 / 120)
    state = advance(state, { move: 1 }, 30)
    state = advance(state, {}, 100)
    assert.equal(state.y, o.height, `landing on obstacle at ${o.x}`)
  }
})
test('flight cannot pass through a wall but can fly above it and land on it', () => {
  let state = advance({ ...createRun(), x: 650, y: 40, flying: true }, { move: 1, down: true })
  assert.equal(state.x, 658)
  state = advance(state, { up: true }, 50)
  state = advance(state, { move: 1 }, 35)
  state = stepRun(state, { flyToggle: true }, .016)
  state = advance(state, {}, 120)
  assert.equal(state.y, 64)
})
