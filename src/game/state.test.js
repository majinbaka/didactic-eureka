import test from 'node:test'
import assert from 'node:assert/strict'
import { breakthroughCosts, createInitialState, cultivationGain, initialState, isValidSave, migrateSave, qiRequired, realms, rollSpiritRoots, transition } from './state.js'

test('new mortals receive unique random spirit roots', () => {
  assert.deepEqual(rollSpiritRoots(() => 0), ['kim'])
  const values = [.99, .1, .1, .1, .1, .1, .1]
  const roots = rollSpiritRoots(() => values.shift() ?? 0)
  assert.equal(roots.length, 5)
  assert.equal(new Set(roots).size, 5)
  assert.equal(isValidSave(createInitialState(() => 0)), true)
})

test('cultivation is slower with multiple roots and raises every owned element', () => {
  const one = createInitialState(() => 0)
  const many = { ...one, spiritRoots: ['kim', 'moc', 'thuy'] }
  assert.ok(cultivationGain(one) > cultivationGain(many))
  const next = transition(many, 'cultivate')
  assert.equal(next.qi, cultivationGain(many))
  for (const root of many.spiritRoots) assert.equal(next.elementCultivation[root], cultivationGain(many))
  assert.equal(next.elementCultivation.hoa, 0)
})

test('breakthrough requires and consumes resources, then awards attribute points', () => {
  const ready = { ...initialState, qi: qiRequired(0), stones: 30, herbs: 2 }
  const next = transition(ready, 'breakthrough', () => 0)
  assert.equal(next.realm, 1)
  assert.equal(next.stones, 30 - breakthroughCosts[0].stones)
  assert.equal(next.herbs, 0)
  assert.equal(next.attributePoints, 2)
  assert.deepEqual(transition({ ...ready, herbs: 1 }, 'breakthrough', () => 0), { ...ready, herbs: 1 })
})

test('failed breakthrough can drop a realm but never below the first realm', () => {
  const ready = { ...initialState, realm: 2, qi: qiRequired(2), stones: 200, herbs: 20 }
  assert.equal(transition(ready, 'breakthrough', () => 1).realm, 1)
  assert.equal(transition({ ...ready, realm: 0, qi: qiRequired(0) }, 'breakthrough', () => 1).realm, 0)
})

test('attribute points increase stats and constitution raises health', () => {
  const next = transition({ ...initialState, attributePoints: 1 }, { type: 'increase-attribute', attribute: 'canCot' })
  assert.equal(next.attributes.canCot, 2)
  assert.equal(next.maxHp, 110)
  assert.equal(next.hp, 110)
  assert.equal(next.attributePoints, 0)
})

test('v1 saves migrate without losing progress', () => {
  const migrated = migrateSave({ version: 1, realm: 2, qi: 42, stones: 71, herbs: 9, journeys: 4 }, () => 0)
  assert.equal(isValidSave(migrated), true)
  assert.equal(migrated.realm, 2)
  assert.equal(migrated.qi, 42)
  assert.equal(migrated.stones, 71)
  assert.deepEqual(migrated.spiritRoots, ['kim'])
})

test('final realm cannot advance and corrupt saves are rejected', () => {
  const final = { ...initialState, realm: realms.length - 1, qi: qiRequired(realms.length - 1) }
  assert.deepEqual(transition(final, 'breakthrough'), final)
  for (const value of [null, {}, { ...initialState, version: 1 }, { ...initialState, realm: 5 }, { ...initialState, stones: -1 }, { ...initialState, spiritRoots: [] }, { ...initialState, hp: 101 }]) assert.equal(isValidSave(value), false)
})
