import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { collectibleCatalog, collectibleReward, collectNearby, createStageCollectibles, COLLECTIBLE_KINDS, RARITIES, STAGE_COLLECTIBLES } from './collectibles.js'

test('collection contains 100 distinct herbs and preserves both stones', () => {
  assert.equal(collectibleCatalog.filter(item => item.kind === 'herb').length, 100)
  assert.equal(collectibleCatalog.filter(item => item.kind === 'stone').length, 2)
  assert.equal(new Set(collectibleCatalog.map(item => item.id)).size, collectibleCatalog.length)
  assert.equal(new Set(collectibleCatalog.map(item => item.name)).size, collectibleCatalog.length)
  const slots = new Set()
  for (const item of collectibleCatalog) {
    assert.ok(item.description && RARITIES[item.rarity], item.id)
    const columns = item.columns || 4, rows = item.rows || 2
    const image = item.image || '/assets/items/forest-collectibles-v1.png'
    assert.ok(Number.isInteger(item.sprite) && item.sprite >= 0 && item.sprite < columns * rows, item.id)
    assert.ok(existsSync(new URL(`../../public${image}`, import.meta.url)), image)
    const slot = `${image}:${item.sprite}`
    assert.ok(!slots.has(slot), `Duplicate image slot: ${slot}`)
    slots.add(slot)
  }
})

test('equipment collection contains exactly 1000 catalog-only items in four groups', () => {
  const kinds = ['weapon', 'defense', 'formation', 'treasure']
  assert.equal(collectibleCatalog.length, 1102)
  for (const kind of kinds) {
    const entries = collectibleCatalog.filter(item => item.kind === kind)
    assert.equal(entries.length, 250, kind)
    assert.ok(COLLECTIBLE_KINDS[kind])
    for (const item of entries) {
      assert.deepEqual(collectibleReward(item), { herbs: 0, stones: 0 })
      assert.ok(!Object.values(STAGE_COLLECTIBLES).some(stage => stage.itemIds.includes(item.id)))
    }
  }
})

test('equipment atlases have transparent, nonempty and distinct 64px icons', async () => {
  const items = collectibleCatalog.filter(item => ['weapon', 'defense', 'formation', 'treasure'].includes(item.kind))
  const hashes = new Set()
  for (const image of new Set(items.map(item => item.image))) {
    const path = fileURLToPath(new URL(`../../public${image}`, import.meta.url))
    const metadata = await sharp(path).metadata()
    assert.equal(metadata.width, 640, image)
    assert.equal(metadata.height, 320, image)
    assert.ok(metadata.hasAlpha, image)
    for (const item of items.filter(entry => entry.image === image)) {
      const { data } = await sharp(path).extract({ left: item.sprite % 10 * 64, top: Math.floor(item.sprite / 10) * 64, width: 64, height: 64 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
      const alpha = data.filter((_, index) => index % 4 === 3)
      assert.ok(alpha.some(value => value > 0), `Empty icon: ${item.id}`)
      assert.ok(alpha.some(value => value === 0), `Opaque background: ${item.id}`)
      const hash = createHash('sha256').update(data).digest('hex')
      assert.ok(!hashes.has(hash), `Repeated icon: ${item.id}`)
      hashes.add(hash)
    }
  }
})

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
