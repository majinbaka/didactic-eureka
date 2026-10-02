import test from 'node:test'
import assert from 'node:assert/strict'
import { createRun, stepRun, WORLD } from './runner.js'
test('movement stays in arena and jump lands', () => {
  let s = createRun()
  s = stepRun(s, { move: -1 }, 1)
  assert.equal(s.x, 0)
  s = stepRun(s, { move: 1 }, 20)
  assert.equal(s.x, WORLD - 128)
  s = stepRun(s, { jump: true }, .016)
  assert.ok(s.y > 0)
  for (let i = 0; i < 100; i++) s = stepRun(s, {}, .016)
  assert.equal(s.y, 0)
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
