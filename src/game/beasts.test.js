import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { beastCatalog, beastFrame, BEAST_ACTIONS, BEAST_ELEMENTS } from './beasts.js'

test('30 beasts have unique attacks, skills, images and complete manifests', async () => {
  assert.equal(beastCatalog.length, 30)
  for (const field of ['id', 'name', 'image']) assert.equal(new Set(beastCatalog.map(b => b[field])).size, 30)
  for (const kind of ['attack', 'skill']) {
    assert.equal(new Set(beastCatalog.map(b => b[kind].pattern)).size, 30, kind)
    for (const beast of beastCatalog) {
      assert.ok(beast[kind].name && beast[kind].telegraph && beast[kind].description)
      assert.ok(beast[kind].range > 0 && beast[kind].cooldownMs > 0)
    }
  }
  const hashes = new Set()
  for (const beast of beastCatalog) {
    assert.ok(BEAST_ELEMENTS[beast.element], beast.id)
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
