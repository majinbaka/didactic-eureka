import test from 'node:test'
import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { LOCOMOTION_ANIMATIONS, locomotionFrame, locomotionImage } from './characterMotion.js'
import { drawCharacter, loadCharacterLocomotion } from '../rendering/drawCharacter.js'

test('locomotion selects authored rows by distance, or by time in the gallery', () => {
  for (const [animation, clip] of Object.entries(LOCOMOTION_ANIMATIONS)) {
    for (let step = 0; step < 12; step++) {
      assert.equal(locomotionFrame({ animation, phase: (step + .01) / 4 }), clip.frames[step % 4])
      assert.equal(locomotionFrame({ animation, elapsed: (step + .01) / clip.fps }), clip.frames[step % 4])
    }
  }
  assert.equal(locomotionFrame({ animation: 'run', phase: .5, elapsed: 0 }), 6)
  assert.equal(locomotionFrame({ animation: 'jump' }), null)
  assert.equal(locomotionFrame({ animation: 'idle' }), null)
})

test('all characters ship distinct complete locomotion frames with transparent gutters', async () => {
  const root = new URL('../../public/assets/characters/', import.meta.url)
  const directories = (await readdir(root, { withFileTypes: true })).filter(d => d.isDirectory())
  const roster = JSON.parse(await readFile(new URL('roster-all.json', root)))
  assert.equal(directories.length, 26)
  assert.deepEqual(roster.map(c => c.id).sort(), directories.map(d => d.name).sort())
  for (const { name } of directories) {
    const original = JSON.parse(await readFile(new URL(`${name}/atlas.json`, root)))
    const manifest = JSON.parse(await readFile(new URL(`${name}/locomotion-v1.json`, root)))
    assert.equal(locomotionImage(original.image), manifest.image)
    assert.deepEqual(manifest.animations, LOCOMOTION_ANIMATIONS)
    const { data, info } = await sharp(new URL(`../../public${manifest.image}`, import.meta.url).pathname)
      .ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    assert.equal(info.width, 512)
    assert.equal(info.height, 256)
    const hashes = new Set()
    for (let frame = 0; frame < 8; frame++) {
      let painted = 0, bottom = -1
      const pixels = Buffer.alloc(128 * 128 * 4)
      for (let y = 0; y < 128; y++) for (let x = 0; x < 128; x++) {
        const offset = ((Math.floor(frame / 4) * 128 + y) * 512 + frame % 4 * 128 + x) * 4
        const alpha = data[offset + 3]
        data.copy(pixels, (y * 128 + x) * 4, offset, offset + 4)
        if (alpha > 8) { painted++; bottom = y }
        if (x === 0 || x === 127 || y === 0 || y >= 116) assert.equal(alpha, 0, `${name}/${frame}: clipped gutter`)
      }
      assert.ok(painted > 500, `${name}/${frame}: empty silhouette`)
      assert.equal(bottom, 115, `${name}/${frame}: foot anchor`)
      hashes.add(createHash('sha256').update(pixels).digest('hex'))
    }
    assert.equal(hashes.size, 8, `${name}: repeated frame`)
  }
})

test('renderer crops one full sprite, mirrors the sheet, and keeps other action poses', async t => {
  class ImageStub {
    complete = true
    naturalWidth = 512
    async decode() { if (this.src.includes('missing')) throw new Error('Missing sheet') }
  }
  const originalImage = globalThis.Image
  globalThis.Image = ImageStub
  t.after(() => { if (originalImage) globalThis.Image = originalImage; else delete globalThis.Image })
  const image = new ImageStub()
  image.src = '/assets/characters/jade-v2/character-jade-sheet.png'
  const calls = []
  const ctx = { save() {}, restore() {}, translate() {}, scale(...args) { calls.push(['scale', ...args]) },
    drawImage(...args) { calls.push(['drawImage', ...args]) } }
  await loadCharacterLocomotion(image)
  drawCharacter(ctx, image, 3, 64, 116, -1, { animation: 'run', phase: .25 })
  assert.deepEqual(calls[0], ['scale', -1, 1])
  assert.equal(calls[1][1].src, '/assets/characters/jade-v2/locomotion-v1.png')
  assert.deepEqual(calls[1].slice(2), [128, 128, 128, 128, -64, -116, 128, 128])
  calls.length = 0
  drawCharacter(ctx, image, 12, 64, 116, 1, { animation: 'sit' })
  assert.equal(calls[1][1], image)
  assert.deepEqual(calls[1].slice(2, 6), [0, 384, 128, 128])
  image.src = '/missing/character.png'
  await assert.rejects(loadCharacterLocomotion(image), /Missing sheet/)
})
