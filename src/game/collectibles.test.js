import test from 'node:test'
import assert from 'node:assert/strict'
import { collectibleCatalog, collectibleReward, collectNearby, createStageCollectibles, STAGE_COLLECTIBLES } from './collectibles.js'

test('first stage spawns exactly one herb', () => {
  assert.equal(createStageCollectibles().length, 1)
  assert.equal(STAGE_COLLECTIBLES['rung-truc-u-tinh'].itemIds.length, 1)
  assert.equal(collectibleCatalog.find(item => item.id === createStageCollectibles()[0].itemId).kind, 'herb')
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

test('jumping over the herb does not collect it', () => {
  const start = createStageCollectibles()
  assert.equal(collectNearby(start, start[0].x - 64, 100).collected, null)
  assert.equal(collectNearby(start, start[0].x - 64, 0).collected.id, 'thanh-truc-diep')
})
