import test from 'node:test'
import assert from 'node:assert/strict'
import { createInitialState, transition, cultivationGain, migrateSave, isValidSave, loadLocalSave, SAVE_KEY, PREVIOUS_SAVE_KEY } from './state.js'
const use = id => ({ type: 'use-item', id })
const buy = id => ({ type: 'buy-item', id })
test('single use heals to cap and never consumes at full health', () => {
  const state = createInitialState()
  assert.equal(transition(state, use('pill')), state)
  const next = transition({ ...state, hp: 90 }, use('pill'))
  assert.equal(next.hp, 100); assert.equal(next.inventory.pill, 1)
  assert.equal(state.inventory.pill, 2)
})
test('gourd has exactly five uses, cannot refill early, and can be repurchased', () => {
  let state = { ...createInitialState(), stones: 100 }
  assert.equal(transition(state, buy('gourd')), state)
  for (let i = 0; i < 5; i++) state = transition(state, use('gourd'))
  assert.equal(state.qi, 100); assert.equal(state.inventory.gourd, 0)
  assert.equal(transition(state, use('gourd')), state)
  state = transition(state, buy('gourd'))
  assert.equal(state.stones, 76); assert.equal(state.inventory.gourd, 5)
  assert.equal(transition(state, use('gourd')), state)
})
test('permanent bonus survives serialization and cannot stack or be bought twice', () => {
  const base = { ...createInitialState(), stones: 100 }
  const owned = transition(base, buy('jade'))
  const active = transition(owned, use('jade'))
  assert.equal(cultivationGain(active), cultivationGain(base) + 2)
  assert.equal(transition(active, use('jade')), active)
  assert.equal(transition(active, buy('jade')), active)
  assert.deepEqual(migrateSave(JSON.parse(JSON.stringify(active))), active)
  assert.equal(transition(active, 'cultivate').qi, cultivationGain(active))
})
test('invalid actions, insufficient funds, and invalid inventory are rejected', () => {
  const state = { ...createInitialState(), stones: 0 }
  for (const action of [buy('pill'), buy('jade'), use('unknown'), use('jade')]) assert.equal(transition(state, action), state)
  for (const patch of [{ pill: -1 }, { gourd: 6 }, { jade: 0, jadeActive: true }, { pill: 1.5 }]) assert.equal(isValidSave({ ...state, inventory: { ...state.inventory, ...patch } }), false)
})
test('v2 migration preserves all progression and local fallback retains legacy data', () => {
  const { inventory: _inventory, ...old } = { ...createInitialState(), version: 2, stones: 77, journeys: 12 }
  const migrated = migrateSave(old)
  assert.equal(migrated.stones, 77); assert.equal(migrated.journeys, 12)
  assert.ok(isValidSave(migrated))
  const entries = new Map([[SAVE_KEY, '{bad'], [PREVIOUS_SAVE_KEY, JSON.stringify(old)]])
  const previous = globalThis.localStorage
  globalThis.localStorage = { getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value) }
  try { assert.deepEqual(loadLocalSave(), migrated); assert.equal(entries.get(PREVIOUS_SAVE_KEY), JSON.stringify(old)) } finally { globalThis.localStorage = previous }
})
