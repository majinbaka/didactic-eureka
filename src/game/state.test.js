import test from 'node:test'
import assert from 'node:assert/strict'
import { AUTO_QI_INTERVAL, accrueOfflineQi, characterAge, characterLifespan, createInitialState, cultivationGain, initialState, isValidSave, migrateSave, qiRequired, rollSpiritRootProfile, rollSpiritRoots, transition, YEAR_MS } from './state.js'

test('random spirit roots are unique and valid', () => {
  assert.deepEqual(rollSpiritRoots(() => 0), ['kim'])
  const rolls = [.99, .1, .1, .1, .1, .1]
  const roots = rollSpiritRoots(() => rolls.shift() ?? 0)
  assert.equal(roots.length, 4); assert.equal(new Set(roots).size, 4); assert.ok(isValidSave(createInitialState(() => 0)))
})
test('cultivation raises every owned element and multi-root cultivation is slower', () => {
  const one = createInitialState(() => 0), many = { ...one, spiritRoots: ['kim', 'moc', 'thuy'] }
  assert.ok(cultivationGain(one) > cultivationGain(many))
  const next = transition(many, 'cultivate')
  for (const root of many.spiritRoots) assert.equal(next.elementCultivation[root], cultivationGain(many))
  assert.equal(next.qi, cultivationGain(many))
})
test('offline cultivation earns one qi per fifteen minutes, capped at one hour', () => {
  const bornAt = 1000, state = createInitialState(() => 0, bornAt)
  assert.equal(characterAge(state, bornAt + YEAR_MS * 3), 18)
  assert.equal(characterLifespan(state), 60)
  const pending = accrueOfflineQi(state, bornAt + AUTO_QI_INTERVAL * 10)
  assert.equal(pending.pendingQi, 4)
  const claimed = transition(pending, 'claim-offline-qi')
  assert.equal(claimed.qi, 4)
  assert.equal(claimed.pendingQi, 0)
  assert.equal(claimed.elementCultivation.kim, 4)
})
test('breakthrough consumes materials and succeeds or drops realm', () => {
  const ready = { ...initialState, realm: 2, minorStage: 3, qi: qiRequired(2), stones: 200, herbs: 20 }
  const success = transition(ready, 'breakthrough', () => 0)
  assert.equal(success.realm, 3); assert.equal(success.attributePoints, 2); assert.equal(success.qi, 0)
  const failure = transition(ready, 'breakthrough', () => 1)
  assert.equal(failure.realm, 1); assert.equal(failure.qi, 0); assert.ok(failure.stones < ready.stones)
})
test('attribute points increase selected stats', () => {
  const next = transition({ ...initialState, attributePoints: 1 }, { type: 'increase-attribute', attribute: 'canCot' })
  assert.equal(next.attributes.canCot, 2); assert.equal(next.maxHp, 110); assert.equal(next.attributePoints, 0)
})
test('runner loot adds existing resources and rejects invalid rewards', () => {
  const next = transition(initialState, { type: 'collect-runner-loot', herbs: 2, stones: 3 })
  assert.equal(next.herbs, initialState.herbs + 2); assert.equal(next.stones, initialState.stones + 3)
  assert.equal(transition(initialState, { type: 'collect-runner-loot', herbs: -1, stones: 0 }), initialState)
})
test('v1 save migrates without losing progress and invalid saves are rejected', () => {
  const migrated = migrateSave({ version: 1, realm: 2, qi: 42, stones: 71, herbs: 9, journeys: 4 }, () => 0)
  assert.ok(isValidSave(migrated)); assert.equal(migrated.realm, 2); assert.equal(migrated.stones, 71)
  for (const value of [null, {}, { ...initialState, hp: 101 }, { ...initialState, spiritRoots: [] }]) assert.equal(isValidSave(value), false)
})
test('v3 save migrates to v4 with character time fields', () => {
  const v3 = { ...initialState, version: 3 }
  delete v3.bornAt
  delete v3.autoCultivate
  const migrated = migrateSave(v3, () => 0, 12345)
  assert.equal(migrated.version, 6)
  assert.equal(migrated.bornAt, 12345)
  assert.equal(migrated.autoCultivate, false)
})

test('new character starts without resources and root odds meet the requested bands', () => {
  const state = createInitialState(() => 0)
  assert.equal(state.stones, 0); assert.equal(state.herbs, 0)
  assert.equal(state.inventory.pill, 0); assert.equal(state.inventory.gourd, 0)
  for (const [roll, count] of [[0,1],[.015,1],[.05,2],[.2,3],[.8,4]]) {
    assert.equal(rollSpiritRoots(() => roll).length, count)
  }
})

test('rare one-root profiles distinguish single and unusual roots', () => { assert.equal(rollSpiritRootProfile(() => 0).type, 'don'); assert.equal(rollSpiritRootProfile(() => .015).type, 'di') })

test('character choice persists, age varies, and Luyện Khí has thirteen stages', () => {
  const start = createInitialState(() => 0, 1000)
  const chosen = transition(start, { type: 'set-character', id: 'lean-scholar-v1', name: 'Mặc Thiên' })
  assert.equal(chosen.characterName, 'Mặc Thiên')
  assert.equal(characterAge(chosen, 1000), 24)
  assert.equal(characterLifespan(chosen), 68)
  assert.ok(isValidSave(chosen))
  const ready = { ...chosen, qi: qiRequired(0), stones: 100, herbs: 10 }
  assert.equal(transition(ready, 'breakthrough', () => 0).qiStage, 2)
  assert.equal(transition({ ...ready, qiStage: 13 }, 'breakthrough', () => 0).realm, 1)
})
