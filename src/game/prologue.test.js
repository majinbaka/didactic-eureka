import test from 'node:test'
import assert from 'node:assert/strict'
import { createTrial, answerTrial, tickTrial, prologuePhase, puzzles, stepTrialRun } from './prologue.js'
import { createRun } from './runner.js'

test('all three gates are required before completion', () => {
  for (let stage = 0; stage < 3; stage++) {
    assert.equal(prologuePhase(puzzles[stage].gate, stage), 'maze')
    assert.equal(prologuePhase(3000, stage), 'maze')
  }
  assert.equal(prologuePhase(3000, 3), 'complete')
})
test('correct answers advance in order, both bagua alignments required', () => {
  let trial = { ...createTrial(), active: true }
  for (let stage = 0; stage < 3; stage++) {
    trial = answerTrial({ ...trial, active: true }, createRun(), stage === 2 ? { fish: 0, ring: 7 } : 1).trial
    assert.equal(trial.stage, stage + 1)
  }
  for (const answer of [{ fish: 0, ring: 0 }, { fish: 3, ring: 7 }]) assert.equal(answerTrial({ ...createTrial(), stage: 2, active: true }, createRun(), answer).trial.stage, 2)
})
test('wrong first gate traps, deducts time and drops two places, repeated inputs blocked', () => {
  const run = { ...createRun(), x: 1000 }
  const result = answerTrial({ ...createTrial(), active: true }, run, 0)
  assert.equal(result.trial.remaining, 10)
  assert.equal(result.trial.trapped, 5)
  assert.equal(result.run.racers.filter(r => r.x > run.x).length, 2)
  assert.equal(answerTrial(result.trial, result.run, 1).trial.stage, 0)
  assert.equal(tickTrial(result.trial, result.run, 5).trial.trapped, 0)
  assert.equal(run.racers.filter(r => r.x > run.x).length, 0)
})
test('poison lasts ten travel seconds and final failure knocks back fifty metres', () => {
  const base = { ...createTrial(), active: true, stage: 1, remaining: 15 }
  const poisoned = answerTrial(base, createRun(), 0).trial
  assert.equal(poisoned.slow, 10)
  assert.equal(tickTrial(poisoned, createRun(), 1).trial.slow, 10)
  assert.equal(tickTrial({ ...poisoned, active: false }, createRun(), 1).trial.slow, 9)
  const failed = answerTrial({ ...base, stage: 2 }, { ...createRun(), x: 2700 }, null)
  assert.equal(failed.run.x, 2200)
  assert.equal(failed.trial.active, false)
})
test('timeout applies penalty once and rearms timer; gate clamps overshoot', () => {
  for (let stage = 0; stage < 3; stage++) {
    const result = tickTrial({ ...createTrial(), active: true, stage, remaining: .01 }, createRun(), .02)
    assert.equal(result.trial.remaining, puzzles[stage].seconds)
    assert.match(result.trial.message, /Hết giờ/)
  }
  const entered = tickTrial(createTrial(), { ...createRun(), x: 1510 }, .02)
  assert.equal(entered.run.x, 1500)
  assert.equal(entered.trial.active, true)
})

test('poison scales walking, running and dashing by twenty percent', () => {
  for (const input of [{ move: 1 }, { move: 1, run: true }, { dash: true }]) {
    const run = createRun()
    const normal = stepTrialRun(run, input, .03, { slow: 0 })
    const slowed = stepTrialRun(run, input, .03, { slow: 10 })
    assert.ok(Math.abs((slowed.x - run.x) / (normal.x - run.x) - .8) < 1e-9)
  }
})
