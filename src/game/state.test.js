import test from 'node:test'
import assert from 'node:assert/strict'
import { createInitialState, cultivationGain, initialState, isValidSave, migrateSave, qiRequired, rollSpiritRoots, transition } from './state.js'

test('random spirit roots are unique and valid', () => {
  assert.deepEqual(rollSpiritRoots(() => 0), ['kim'])
  const rolls = [.99, .1, .1, .1, .1, .1]
  const roots = rollSpiritRoots(() => rolls.shift() ?? 0)
  assert.equal(roots.length, 5); assert.equal(new Set(roots).size, 5); assert.ok(isValidSave(createInitialState(() => 0)))
})
test('cultivation raises every owned element and multi-root cultivation is slower', () => {
  const one = createInitialState(() => 0), many = { ...one, spiritRoots: ['kim', 'moc', 'thuy'] }
  assert.ok(cultivationGain(one) > cultivationGain(many))
  const next = transition(many, 'cultivate')
  for (const root of many.spiritRoots) assert.equal(next.elementCultivation[root], cultivationGain(many))
  assert.equal(next.qi, cultivationGain(many))
})
test('breakthrough consumes materials and succeeds or drops realm', () => {
  const ready = { ...initialState, realm: 2, qi: qiRequired(2), stones: 200, herbs: 20 }
  const success = transition(ready, 'breakthrough', () => 0)
  assert.equal(success.realm, 2); assert.equal(success.cultivation.wave, 1); assert.equal(success.qi, 0)
  const failure = transition(ready, 'breakthrough', () => 1)
  assert.equal(failure.realm, 1); assert.equal(failure.qi, 0); assert.ok(failure.stones < ready.stones)
})
test('attribute points increase selected stats', () => {
  const next = transition({ ...initialState, attributePoints: 1 }, { type: 'increase-attribute', attribute: 'canCot' })
  assert.equal(next.attributes.canCot, 2); assert.equal(next.maxHp, 110); assert.equal(next.attributePoints, 0)
})
test('v1 save migrates without losing progress and invalid saves are rejected', () => {
  const migrated = migrateSave({ version: 1, realm: 2, qi: 42, stones: 71, herbs: 9, journeys: 4 }, () => 0)
  assert.ok(isValidSave(migrated)); assert.equal(migrated.realm, 2); assert.equal(migrated.stones, 71)
  for (const value of [null, {}, { ...initialState, hp: 101 }, { ...initialState, spiritRoots: [] }]) assert.equal(isValidSave(value), false)
})
