import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { RARITIES } from './collectibles.js'
import { beastCatalog, beastFrame, BEAST_ACTIONS, BEAST_ELEMENTS, BEAST_SIZES, beastActionLabel } from './beasts.js'

test('70 beasts have unique attacks, skills, images and complete manifests', async () => {
  assert.equal(beastCatalog.length, 70)
  for (const field of ['id', 'name', 'image']) assert.equal(new Set(beastCatalog.map(b => b[field])).size, 70)
  for (const kind of ['attack', 'skill']) {
    assert.equal(new Set(beastCatalog.map(b => b[kind].pattern)).size, 70, kind)
    for (const beast of beastCatalog) {
      assert.ok(beast[kind].name && beast[kind].telegraph && beast[kind].description)
      assert.ok(beast[kind].range > 0 && beast[kind].cooldownMs > 0)
    }
  }
  const hashes = new Set()
  for (const beast of beastCatalog) {
    assert.ok(BEAST_ELEMENTS[beast.element], beast.id)
    assert.ok(RARITIES[beast.rarity], `${beast.id}: supported rarity`)
    const atlas = JSON.parse(await readFile(new URL(`../../public${beast.atlas}`, import.meta.url)))
    assert.deepEqual(atlas.animations, beast.animations)
    assert.equal(atlas.frameCount, 20)
    assert.deepEqual(Object.keys(atlas.animations), Object.keys(BEAST_ACTIONS))
    assert.deepEqual(Object.values(atlas.animations).flatMap(a => a.frames).sort((a,b) => a-b), Array.from({ length: 20 }, (_,i) => i))
    const path = new URL(`../../public${beast.image}`, import.meta.url).pathname
    const metadata = await sharp(path).metadata()
    assert.equal(metadata.width, 512); assert.equal(metadata.height, 640); assert.ok(metadata.hasAlpha)
    for (let frame = 0; frame < 20; frame++) {
      const data = await sharp(path).extract({ left: frame % 4 * 128, top: Math.floor(frame / 4) * 128, width: 128, height: 128 }).ensureAlpha().raw().toBuffer()
      let opaque = 0, clear = 0
      for (let i = 3; i < data.length; i += 4) { if (data[i] > 8) opaque++; else clear++ }
      assert.ok(opaque > 30 && clear > 100, `${beast.id}:${frame} alpha`)
      const hash = createHash('sha256').update(data).digest('hex')
      assert.ok(!hashes.has(hash), `${beast.id}:${frame} duplicate frame`); hashes.add(hash)
    }
  }
  const publicRoster = JSON.parse(await readFile(new URL('../../public/assets/beasts/roster-v1.json', import.meta.url)))
  assert.deepEqual(publicRoster, beastCatalog)
})

test('looping motion repeats, combat actions stop, invalid actions fall back', () => {
  const beast = beastCatalog[0]
  assert.equal(beastFrame(beast, 'walk', 0), 2)
  assert.equal(beastFrame(beast, 'walk', .5), 2)
  assert.equal(beastFrame(beast, 'attack', 999), 12)
  assert.equal(beastFrame(beast, 'skill', 999), 16)
  assert.equal(beastFrame(beast, 'collapse', 999), 19)
  assert.equal(beastFrame(beast, 'invalid', -1), 0)
  assert.equal(beastFrame(beast, 'walk', NaN), 2)
})


test('20 new flying beasts retain different pixel sizes and airborne anchors', async () => {
  const flying = beastCatalog.filter(beast => beast.locomotion === 'flying')
  assert.equal(flying.length, 20)
  assert.equal(new Set(flying.map(beast => beast.size)).size, 5)
  assert.ok(new Set(flying.map(beast => beast.spriteExtentPx)).size >= 10)
  for (const beast of flying) {
    assert.ok(BEAST_SIZES[beast.size], beast.id)
    assert.equal(beast.flightHeightPx, 12)
    assert.ok(beast.spriteExtentPx >= 40 && beast.spriteExtentPx <= 100)
    const atlas = JSON.parse(await readFile(new URL(`../../public${beast.atlas}`, import.meta.url)))
    assert.equal(atlas.spriteExtentPx, beast.spriteExtentPx)
    assert.equal(atlas.locomotion, 'flying')
    const path = new URL(`../../public${beast.image}`, import.meta.url).pathname
    for (let frame = 0; frame < 20; frame++) {
      const pixels = await sharp(path).extract({ left: frame % 4 * 128, top: Math.floor(frame / 4) * 128, width: 128, height: 128 }).ensureAlpha().raw().toBuffer()
      let left = 128, right = 0, top = 128, bottom = 0
      for (let y = 0; y < 128; y++) for (let x = 0; x < 128; x++) {
        if (pixels[(y * 128 + x) * 4 + 3] <= 8) continue
        left = Math.min(left, x); right = Math.max(right, x + 1)
        top = Math.min(top, y); bottom = Math.max(bottom, y + 1)
      }
      assert.ok(right - left <= Math.round(120 * beast.spriteExtentPx / 100), `${beast.id}:${frame} width`)
      assert.ok(bottom - top <= beast.spriteExtentPx, `${beast.id}:${frame} height`)
      assert.ok(bottom <= (frame < 18 ? 104 : 116), `${beast.id}:${frame} anchor`)
    }
    assert.equal(beastActionLabel(beast, 'idle'), 'Lơ lửng')
    assert.equal(beastActionLabel(beast, 'walk'), 'Bay')
    assert.equal(beastActionLabel(beast, 'skill'), BEAST_ACTIONS.skill)
  }
  assert.equal(beastActionLabel(beastCatalog[0], 'walk'), BEAST_ACTIONS.walk)
})
