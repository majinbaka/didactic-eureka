import test from 'node:test'
import assert from 'node:assert/strict'
import { createRun, raceRank, rivalsFinished, sceneryForChunk, stepRun, JUMP_VELOCITY, RIVAL_PUZZLE_SUCCESS, OBSTACLES, rivalPace } from './runner.js'
import { FLOATING_OBSTACLE_SPRITES, OBSTACLE_ATLASES, OBSTACLE_SPRITES, OBSTACLE_TYPE_SPRITES } from './scenerySprites.js'
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
test('four existing characters start behind the player and advance independently', () => {
  const start = createRun()
  assert.deepEqual(start.racers.map(racer => racer.id), ['female', 'bald-monk', 'strongman', 'elder'])
  assert.ok(start.racers.every(racer => racer.x < start.x))
  assert.deepEqual(start.racers.map((racer, index) => (index ? start.racers[index - 1].x : start.x) - racer.x), [44, 44, 44, 44])
  const next = stepRun(start, {}, .1)
  assert.ok(next.racers.every((racer, index) => racer.x > start.racers[index].x))
  assert.equal(new Set(next.racers.map(racer => racer.x)).size, 4)
  const racing = Array.from({ length: 20 }).reduce(state => stepRun(state, {}, .25), next)
  assert.ok(racing.racers.every(racer => racer.x > racing.x + 500))
})

test('rivals speed up when behind and slow down when too far ahead', () => {
  const racer = createRun().racers[0]
  const behind = rivalPace({ ...racer, x: -900 }, 100, 0)
  const nearby = rivalPace({ ...racer, x: 100 }, 100, 0)
  const ahead = rivalPace({ ...racer, x: 1100 }, 100, 0)
  assert.ok(behind > 390)
  assert.ok(behind > nearby)
  assert.ok(nearby > ahead)
  assert.ok(ahead >= 135)
})

test('changing rival cadence creates chances to pass the player', () => {
  const racer = { ...createRun().racers[0], x: -400 }
  const speeds = Array.from({ length: 240 }, (_, frame) => rivalPace(racer, 100, frame / 20))
  assert.ok(speeds.some(speed => speed > 390))
  assert.ok(speeds.some(speed => speed > racer.speed + 100))
})

test('rivals can exchange the lead while the player keeps running', () => {
  let state = createRun()
  state = {
    ...state,
    flying: true,
    y: 260,
    racers: state.racers.map(racer => ({ ...racer, flying: true, y: 260, time: 0 })),
  }
  let rivalTookLead = false
  for (let frame = 0; frame < 30 * 60; frame++) {
    state = stepRun(state, { move: 1, run: true }, 1 / 60)
    rivalTookLead ||= state.racers.some(racer => racer.x > state.x)
  }
  assert.equal(rivalTookLead, true)
  assert.ok(state.racers.every(racer => Math.abs(racer.x - state.x) < 600))
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
  for (const o of OBSTACLES.filter(obstacle => obstacle.x < 3000)) {
    const prior = OBSTACLES.find(p => p.x + p.width === o.x)
    let state = { ...createRun(), x: o.x - 82, y: prior?.height ?? 0 }
    state = stepRun(state, { jump: true }, 1 / 120)
    state = advance(state, { move: 1 }, 30)
    state = advance(state, {}, 100)
    assert.equal(state.y, o.height, `landing on obstacle at ${o.x}`)
  }
})
test('each path obstacle has a reachable approach', () => {
  const samples = new Map()
  for (const obstacle of OBSTACLES.filter(item => item.sprite && item.x >= 4400 && item.kind !== 'floating')) {
    if (!samples.has(obstacle.sprite)) samples.set(obstacle.sprite, obstacle)
  }
  for (const [type, obstacle] of samples) {
    const step = OBSTACLES.find(item => item.x + item.width === obstacle.x)
    if (obstacle.height > 86) assert.equal(step?.height, 48, `approach for ${type}`)
    let state = { ...createRun(), x: obstacle.x - 82, y: step?.height ?? 0 }
    state = stepRun(state, { jump: true }, 1 / 120)
    state = advance(state, { move: 1 }, 40)
    state = advance(state, {}, 120)
    assert.equal(state.y, obstacle.height, `landing on ${type}`)
  }
})
test('obstacles cover the extended path while keeping trial landmarks clear', () => {
  assert.ok(OBSTACLES.length > 60)
  assert.ok(OBSTACLES.some(obstacle => obstacle.x > 50000))
  assert.ok(OBSTACLES.some(obstacle => obstacle.kind === 'floating'))
  const floatingTypes = new Set(OBSTACLES.filter(obstacle => obstacle.kind === 'floating').map(obstacle => obstacle.sprite))
  assert.deepEqual(floatingTypes, new Set(['spirit-slab', 'moss-rock', 'jade-crag']))
  assert.ok(OBSTACLES.filter(obstacle => obstacle.kind === 'floating' && obstacle.x < 4200).length >= 3)
  const obstacleTypes = new Set(OBSTACLES.map(obstacle => obstacle.sprite).filter(Boolean))
  assert.ok(['bamboo-log', 'tree-stump', 'lantern-plinth', 'torii-beam', 'watch-post'].every(type => obstacleTypes.has(type)))
  assert.ok(new Set(OBSTACLES.map(obstacle => `${obstacle.width}x${obstacle.height}`)).size >= 8)
  for (const landmark of [30000, 42000, 54000, 60000]) {
    assert.ok(OBSTACLES.every(obstacle => Math.abs(obstacle.x - landmark) > 500))
  }
})
test('a short jump lands on the first floating platform', () => {
  const platform = OBSTACLES.find(obstacle => obstacle.kind === 'floating')
  let state = { ...createRun(), x: platform.x - 82 }
  state = stepRun(state, { jump: true }, 1 / 120)
  state = advance(state, { move: 1 }, 42)
  state = advance(state, {}, 120)
  assert.equal(JUMP_VELOCITY, 500)
  assert.ok(JUMP_VELOCITY ** 2 / (2 * 1450) < 90)
  assert.equal(state.y, platform.height)
})
test('walkable obstacle crops begin exactly at their visible top surface', async () => {
  const { default: sharp } = await import('sharp')
  for (const [atlasName, sprites] of Object.entries(OBSTACLE_SPRITES)) {
    const path = new URL(`../../public${OBSTACLE_ATLASES[atlasName]}`, import.meta.url)
    const { data, info } = await sharp(path.pathname).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    for (const [name, sprite] of Object.entries(sprites)) {
      const edgeHasPixel = localY => Array.from({ length: sprite.width }, (_, localX) => {
        const offset = ((sprite.y + localY) * info.width + sprite.x + localX) * 4 + 3
        return data[offset] > 8
      }).some(Boolean)
      assert.ok(edgeHasPixel(0), `${atlasName}/${name} must touch the collision top`)
      assert.ok(edgeHasPixel(sprite.height - 1), `${atlasName}/${name} must touch its baseline`)
    }
  }
  const typePath = new URL(`../../public${OBSTACLE_ATLASES.types}`, import.meta.url)
  const { data, info } = await sharp(typePath.pathname).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  for (const [name, sprite] of Object.entries(OBSTACLE_TYPE_SPRITES)) {
    const surfaceHasPixel = Array.from({ length: sprite.width }, (_, localX) => {
      const offset = ((sprite.y + sprite.surface) * info.width + sprite.x + localX) * 4 + 3
      return data[offset] > 8
    }).some(Boolean)
    assert.ok(surfaceHasPixel, `${name} must paint its declared walkable surface`)
  }
  const floatingPaths = {
    floating: '../../public/assets/scenery/floating-obstacle-v1/floating-platform.webp',
    classic: `../../public${OBSTACLE_ATLASES.classic}`,
    v2: `../../public${OBSTACLE_ATLASES.v2}`,
  }
  for (const [name, sprite] of Object.entries(FLOATING_OBSTACLE_SPRITES)) {
    const path = new URL(floatingPaths[sprite.atlas], import.meta.url)
    const { data, info } = await sharp(path.pathname).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const surfaceHasPixel = Array.from({ length: sprite.width }, (_, localX) => data[((sprite.y * info.width + sprite.x + localX) * 4) + 3] > 8).some(Boolean)
    assert.ok(surfaceHasPixel, `${name} crop must begin on its visible walkable surface`)
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

test('rivals stop at each stele and solve with an eighty percent roll', () => {
  assert.equal(RIVAL_PUZZLE_SUCCESS, .8)
  let run = createRun()
  run.racers[0].x = 29999
  run = stepRun(run, {}, .1, () => .99)
  assert.equal(run.racers[0].x, 30000)
  assert.equal(run.racers[0].puzzleStage, 0)
  run = stepRun(run, {}, 2, () => .99)
  assert.equal(run.racers[0].puzzleStage, 0)
  assert.equal(run.racers[0].puzzleWait, 5)
  run = stepRun(run, {}, 5, () => .79)
  assert.equal(run.racers[0].puzzleStage, 1)
})

test('rank and end trigger after all four rivals finish', () => {
  const run = createRun()
  assert.equal(raceRank(run), 1)
  assert.equal(rivalsFinished(run), false)
  const finished = { ...run, racers: run.racers.map(racer => ({ ...racer, x: 60000, finished: true })) }
  assert.equal(raceRank(finished), 5)
  assert.equal(rivalsFinished(finished), true)
})

test('three floating platforms can be crossed with consecutive jumps', () => {
  let run = { ...createRun(), x: 3068 }
  for (const height of [64, 112, 160]) {
    for (let frame = 0; frame < 55; frame++) run = stepRun(run, { move: frame < 37 ? 1 : 0, jump: frame === 0 }, .016)
    assert.equal(run.y, height)
  }
})
