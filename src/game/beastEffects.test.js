import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { beastCatalog } from './beasts.js'
import { beastEffectCatalog, BEAST_EFFECT_PHASES, getBeastEffect, beastEffectFrame } from './beastEffects.js'

test('every beast has detached FX, five transparent strips and matching atlas pixels', async () => {
  assert.equal(beastEffectCatalog.length, 50)
  assert.equal(new Set(beastEffectCatalog.map(effect => effect.beastId)).size, 50)
  const allHashes = new Set()
  assert.deepEqual(new Set(beastEffectCatalog.map(effect => effect.beastId)), new Set(beastCatalog.map(beast => beast.id)))
  for (const beast of beastCatalog) {
    const effect = getBeastEffect(beast.id)
    assert.ok(effect, beast.id)
    assert.equal(effect.skillName, beast.skill.name)
    assert.ok(['linear', 'ground', 'beam', 'orbit', 'falling'].includes(effect.skillMotion))
    assert.ok(effect.travelSpeed >= 0 && effect.notes)
    const atlas = JSON.parse(await readFile(new URL(`../../public${effect.atlas}`, import.meta.url)))
    assert.deepEqual(atlas.animations, effect.animations)
    const imagePath = new URL(`../../public${effect.image}`, import.meta.url).pathname
    const metadata = await sharp(imagePath).metadata()
    assert.equal(metadata.width, 512); assert.equal(metadata.height, 640); assert.ok(metadata.hasAlpha)
    assert.deepEqual(Object.keys(effect.animations), Object.keys(BEAST_EFFECT_PHASES))
    const sequence = []
    for (const [name, clip] of Object.entries(effect.animations)) {
      assert.equal(clip.frames.length, 4)
      assert.ok(clip.fps > 0)
      assert.equal(clip.loop, name === 'travel' || name === 'field')
      const stripPath = new URL(`../../public${clip.image}`, import.meta.url).pathname
      const stripMetadata = await sharp(stripPath).metadata()
      assert.equal(stripMetadata.width, 512); assert.equal(stripMetadata.height, 128); assert.ok(stripMetadata.hasAlpha)
      for (const [i, frame] of clip.frames.entries()) {
        sequence.push(frame)
        const pixels = await sharp(imagePath).extract({ left: frame % 4 * 128, top: Math.floor(frame / 4) * 128, width: 128, height: 128 }).ensureAlpha().raw().toBuffer()
        const stripPixels = await sharp(stripPath).extract({ left: i * 128, top: 0, width: 128, height: 128 }).ensureAlpha().raw().toBuffer()
        assert.deepEqual(pixels, stripPixels, `${beast.id}:${name}:${i} strip mismatch`)
        for (let y = 0; y < 128; y++) for (let x = 0; x < 128; x++) {
          if (x < 2 || x >= 126 || y < 2 || y >= 126) assert.equal(pixels[(y * 128 + x) * 4 + 3], 0, `${beast.id}:${name}:${i} edge bleed`)
        }
        let clear = 0, visible = 0
        for (let offset = 3; offset < pixels.length; offset += 4) { if (pixels[offset] > 8) visible++; else clear++ }
        assert.ok(clear > 100 && visible > 20, `${beast.id}:${name}:${i} empty/opaque FX`)
        const hash = createHash('sha256').update(pixels).digest('hex')
        assert.ok(!allHashes.has(hash), `${beast.id}:${name}:${i} repeated FX frame`)
        allHashes.add(hash)
      }
    }
    assert.deepEqual(sequence, Array.from({ length: 20 }, (_, i) => i))
  }
  const publicCatalog = JSON.parse(await readFile(new URL('../../public/assets/beasts/effects-v1/roster.json', import.meta.url)))
  assert.deepEqual(publicCatalog, beastEffectCatalog)
})

test('FX lookup and timing support looping flight and finite impact independently of caster', () => {
  const effect = getBeastEffect(beastCatalog[0].id)
  assert.equal(getBeastEffect('missing'), null)
  assert.equal(beastEffectFrame(effect, 'travel', 0), 8)
  assert.equal(beastEffectFrame(effect, 'travel', 4 / 12), 8)
  assert.equal(beastEffectFrame(effect, 'impact', 999), 15)
  assert.equal(beastEffectFrame(effect, 'charge', -1), 4)
  assert.equal(beastEffectFrame(effect, 'melee', NaN), 0)
  assert.equal(beastEffectFrame(effect, 'unknown', 0), null)
  assert.equal(beastEffectFrame(effect, 'constructor', 0), null)
  assert.equal(beastEffectFrame(null, 'travel', 0), null)
})
