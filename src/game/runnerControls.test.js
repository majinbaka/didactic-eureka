import test from 'node:test'
import assert from 'node:assert/strict'
import { JOYSTICK_RADIUS, joystickInput } from './runnerControls.js'

test('joystick has a dead zone and maps both horizontal directions', () => {
  assert.equal(joystickInput(5, 0).move, 0)
  assert.equal(joystickInput(-20, 0).move, -1)
  assert.equal(joystickInput(20, 0).move, 1)
})

test('joystick runs on a long drag and clamps its visible knob', () => {
  const result = joystickInput(80, 60)
  assert.equal(result.run, true)
  assert.ok(Math.hypot(result.knobX, result.knobY) <= JOYSTICK_RADIUS)
})
