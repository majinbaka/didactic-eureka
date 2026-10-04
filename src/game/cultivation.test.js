import test from 'node:test'
import assert from 'node:assert/strict'
import { createInitialState, transition, isValidSave, migrateSave } from './state.js'
import { generating, overcoming, damage, stats, createDuel, duelTurn } from './cultivation.js'
const initial = () => createInitialState(() => 0)
test('all five generating and overcoming cycles affect damage exactly', () => {
  for (const [element, target] of Object.entries(overcoming)) {
    assert.equal(damage({ attack: 100, defense: 20, element, target }), 129)
    assert.equal(damage({ attack: 100, defense: 20, element: target, target: element }), 56)
  }
  for (const [previous, element] of Object.entries(generating)) assert.equal(damage({ attack: 100, defense: 0, previous, element }), 120)
  assert.equal(damage({ attack: 100, defense: 0, element: 'kim', roots: ['kim'] }), 200)
})
test('v2 migration retains all old progress and rejects future schema', () => {
  const { cultivation: _, ...old } = initial(); old.version = 2; old.stones = 179; old.realm = 3
  const next = migrateSave(old)
  assert.equal(next.stones, 179); assert.equal(next.realm, 3); assert.equal(next.version, 3); assert.ok(isValidSave(next))
  assert.equal(migrateSave({ ...old, version: 99 }), null)
  assert.equal(isValidSave({ ...next, cultivation: { ...next.cultivation, toxicity: 101 } }), false)
})
test('nine qi layers precede foundation establishment', () => {
  let s = initial()
  for (let i = 2; i <= 9; i++) { s = transition({ ...s, qi: 100 }, 'breakthrough', () => 0); assert.equal(s.realm, 0); assert.equal(s.cultivation.layer, i) }
  s = transition({ ...s, qi: 100 }, 'breakthrough', () => 0); assert.equal(s.realm, 1)
})
test('toxicity blocks cultivation, purifying restores it, quality is validated', () => {
  const s = { ...initial(), cultivation: { ...initial().cultivation, toxicity: 90 } }
  assert.equal(transition(s, 'cultivate'), s)
  assert.ok(transition(transition(s, 'purify'), 'cultivate').qi > 0)
  assert.equal(transition(s, { type: 'pill', quality: -1 }), s)
})
test('tribulation locks actions, consumes resources, survives with preparations', () => {
  let s = initial(); s = { ...s, realm: 2, qi: 300, stones: 1000, herbs: 100, cultivation: { ...s.cultivation, bound: 3 } }
  s = transition(s, 'breakthrough', () => 0)
  assert.equal(s.cultivation.total, 3); assert.equal(transition(s, 'purify'), s)
  for (let i = 0; i < 3; i++) s = transition(s, { type: 'tribulation', guard: 'artifact' })
  assert.equal(s.realm, 3); assert.equal(s.cultivation.wave, 0); assert.ok(isValidSave(s))
})
test('failed tribulation causes injury, Nascent Soul can revive once', () => {
  let s = initial(); s = { ...s, realm: 3, cultivation: { ...s.cultivation, wave: 1, total: 6, trialHp: 1 } }
  s = transition(s, { type: 'tribulation', guard: 'body' }); assert.equal(s.cultivation.rebirth, 1)
  s = { ...s, cultivation: { ...s.cultivation, trialHp: 1 } }
  s = transition(s, { type: 'tribulation', guard: 'body' }); assert.equal(s.realm, 2); assert.equal(s.cultivation.wound, 10); assert.ok(isValidSave(s))
})
test('duel spends MP, rejects unavailable spells and ends without changing save', () => {
  const s = initial(), original = structuredClone(s); let duel = createDuel(s, 'moc')
  assert.equal(duelTurn(s, duel, 'hoa'), duel)
  duel = duelTurn(s, duel, 'kim', () => 1); assert.equal(duel.mp, stats(s).mp - 8)
  for (let i = 0; i < 100 && !duel.result; i++) duel = duelTurn(s, duel, 'physical', () => 1)
  assert.ok(duel.result); assert.deepEqual(s, original)
})
test('long mixed action sequences stay valid and bounded', () => {
  let s = initial()
  const actions = ['cultivate', 'explore', 'hunt', 'purify', 'breakthrough', { type: 'pill', quality: 3 }, 'bind']
  for (let i = 0; i < 3000; i++) { s = transition(s, s.cultivation.wave ? { type: 'tribulation', guard: 'body' } : actions[i % actions.length], () => .2); assert.ok(isValidSave(s), `step ${i}`) }
})
