import test from 'node:test'
import assert from 'node:assert/strict'
import { collectibleCatalog, collectibleReward, collectNearby, createStageCollectibles, STAGE_COLLECTIBLES } from './collectibles.js'

test('first stage exposes six herbs and two spirit stones within map limits', () => {
  const ids = STAGE_COLLECTIBLES['rung-truc-u-tinh'].itemIds
  const entries = collectibleCatalog.filter(item => ids.includes(item.id))
  assert.equal(entries.filter(item => item.kind === 'herb').length, 6)
  assert.equal(entries.filter(item => item.kind === 'stone').length, 2)
  assert.equal(new Set(entries.map(item => item.rarity)).size, 4)
})

test('running through a pickup collects it exactly once', () => {
  const start = createStageCollectibles()
  const playerX = start[0].x - 64
  const first = collectNearby(start, playerX)
  assert.equal(first.collected.id, 'thanh-truc-diep')
  assert.equal(first.collectibles.filter(item => item.collected).length, 1)
  const again = collectNearby(first.collectibles, playerX)
  assert.equal(again.collected, null)
  assert.equal(start[0].collected, false)
})

test('rewards convert named drops to existing save resources', () => {
  assert.deepEqual(collectibleReward(collectibleCatalog.find(item => item.id === 'bach-ngoc-sam')), { herbs: 1, stones: 0 })
  assert.deepEqual(collectibleReward(collectibleCatalog.find(item => item.id === 'tu-tinh-thach')), { herbs: 0, stones: 3 })
})
