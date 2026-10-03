import test from 'node:test'
import assert from 'node:assert/strict'
import { MAZE_GATE, SUMMIT_GATE, prologuePhase, resolveMaze } from './prologue.js'

test('prologue advances from forest through maze to summit', () => {
  assert.equal(prologuePhase(MAZE_GATE - 1), 'forest')
  assert.equal(prologuePhase(MAZE_GATE), 'maze')
  assert.equal(prologuePhase(MAZE_GATE, true), 'summit')
  assert.equal(prologuePhase(SUMMIT_GATE, true), 'complete')
})

test('the shadow-facing left path is the only life gate', () => {
  assert.equal(resolveMaze('left').solved, true)
  assert.equal(resolveMaze('middle').solved, false)
  assert.equal(resolveMaze('right').solved, false)
})
