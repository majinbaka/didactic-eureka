import test from 'node:test'
import assert from 'node:assert/strict'
import { createRun, sceneryForChunk, stepRun } from './runner.js'
test('movement continues in both directions and jump lands', () => {
  let s = createRun()
  s = stepRun(s, { move: -1 }, 1)
  assert.equal(s.x, -140)
  s = stepRun(s, { move: 1 }, 20)
  assert.equal(s.x, 4660)
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
test('three shots destroy a target and preserve input state', () => {
  let s = createRun(); s.x = 350
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
