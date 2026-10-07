import test from 'node:test'
import assert from 'node:assert/strict'
import { advanceCharacterMotion } from './characterMotion.js'


test('footsteps follow actual distance in either direction, including stops and teleports', () => {
  let motion = advanceCharacterMotion(null, { x: 100 }, 'run')
  assert.equal(motion.animation, 'idle')
  motion = advanceCharacterMotion(motion, { x: 120 }, 'run')
  assert.ok(motion.phase > 0)
  const forward = motion.phase
  motion = advanceCharacterMotion(motion, { x: 100 }, 'run')
  assert.ok(motion.phase > forward, 'Turning left must keep the gait cycling forward')
  const stopped = advanceCharacterMotion(motion, { x: 100 }, 'run')
  assert.equal(stopped.animation, 'idle', 'Holding input against a wall must not run in place')
  assert.equal(stopped.phase, motion.phase)
  assert.equal(advanceCharacterMotion(stopped, { x: 5000 }, 'run').phase, stopped.phase)
  for (const action of ['jump', 'sit', 'hurt', 'fly']) {
    assert.equal(advanceCharacterMotion(stopped, { x: 100 }, action).animation, action)
  }
})

test('step phase is independent of render frame rate and preserves phase across walking/running', () => {
  const simulate = count => {
    let motion = advanceCharacterMotion(null, { x: 0 }, 'run')
    for (let i = 1; i <= count; i++) motion = advanceCharacterMotion(motion, { x: i * 390 / count }, 'run')
    return motion.phase
  }
  assert.ok(Math.abs(Math.sin(simulate(30) * Math.PI * 2) - Math.sin(simulate(144) * Math.PI * 2)) < 1e-10)
  const walking = advanceCharacterMotion({ x: 0, phase: .4 }, { x: 10 }, 'walk')
  const running = advanceCharacterMotion(walking, { x: 20 }, 'run')
  assert.ok(running.phase > walking.phase && running.phase - walking.phase < .1)
})
