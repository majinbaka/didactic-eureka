import test from 'node:test'
import assert from 'node:assert/strict'
import { initialState, transition, isValidSave, qiRequired, realms } from './state.js'

test('cultivation caps qi and breakthrough needs sufficient qi', () => {
  assert.deepEqual(transition(initialState, 'breakthrough'), initialState)
  let state = { ...initialState }
  for (let i = 0; i < 12; i++) state = transition(state, 'cultivate')
  assert.equal(state.qi, 100)
  state = transition(state, 'breakthrough')
  assert.equal(state.realm, 1)
  assert.equal(state.qi, 0)
  assert.equal(state.stones, initialState.stones)
})
test('exploration rewards resources and journeys', () => {
  const next = transition(initialState, 'explore')
  assert.equal(next.stones, 38)
  assert.equal(next.herbs, 1)
  assert.equal(next.journeys, 1)
  assert.equal(initialState.stones, 30)
})
test('final realm cannot advance', () => {
  const final = { ...initialState, realm: realms.length - 1, qi: qiRequired(realms.length - 1) }
  assert.deepEqual(transition(final, 'breakthrough'), final)
})
test('reject corrupted and incompatible saves', () => {
  assert.equal(isValidSave(initialState), true)
  for (const value of [null, {}, { ...initialState, version: 2 }, { ...initialState, realm: 5 }, { ...initialState, stones: -1 }, { ...initialState, qi: 101 }, { ...initialState, herbs: 1.5 }]) assert.equal(isValidSave(value), false)
})
