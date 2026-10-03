import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { animationFrame, CHARACTER_ANIMATIONS, selectCharacterAnimation } from './characterAnimations.js'

test('animation lookup follows the packaged atlas frame sequences', () => {
  const manifest = JSON.parse(readFileSync(new URL('../../public/assets/characters/jade-v2/atlas.json', import.meta.url)))
  const bundledManifest = JSON.parse(readFileSync(new URL('./characterAtlas.json', import.meta.url)))
  assert.deepEqual(bundledManifest, manifest, 'Bundled and downloadable atlas metadata must match')
  for (const [name, animation] of Object.entries(CHARACTER_ANIMATIONS)) {
    for (let step = 0; step < animation.frames.length * 3; step++) {
      const frame = animationFrame(name, (step + .01) / animation.fps)
      const expectedIndex = animation.loop ? step % animation.frames.length : Math.min(step, animation.frames.length - 1)
      assert.equal(frame, animation.frames[expectedIndex])
      assert.ok(frame >= 0 && frame < manifest.frameCount)
    }
  }
})

test('idle and unknown animations use the complete standing frame', () => {
  assert.equal(animationFrame('idle', 100), 0)
  assert.equal(animationFrame('missing', -10), 0)
  assert.equal(animationFrame('collapse', 100), CHARACTER_ANIMATIONS.collapse.frames.at(-1))
})

test('run alternates full strides with gathered-leg transition poses', () => {
  assert.deepEqual(CHARACTER_ANIMATIONS.run.frames, [3, 1, 4, 2])
  assert.notEqual(CHARACTER_ANIMATIONS.run.frames[0], CHARACTER_ANIMATIONS.run.frames[2])
})

test('state selection keeps action poses and flight ahead of ground locomotion', () => {
  assert.equal(selectCharacterAnimation({ action: 'sit', flying: false, y: 0 }, { move: 1 }), 'sit')
  assert.equal(selectCharacterAnimation({ flying: true, y: 80 }, { move: 1 }), 'fly')
  assert.equal(selectCharacterAnimation({ y: 30 }, { move: 1 }), 'jump')
  assert.equal(selectCharacterAnimation({ y: 0 }, { move: 1, run: true }), 'run')
  assert.equal(selectCharacterAnimation({ y: 0 }, { move: 1 }), 'walk')
})

test('complete character atlas has transparent gutters and populated frames', async () => {
  const { default: sharp } = await import('sharp')
  const manifest = JSON.parse(readFileSync(new URL('./characterAtlas.json', import.meta.url)))
  const path = new URL(`../../public${manifest.image}`, import.meta.url)
  const { data, info } = await sharp(path.pathname).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  assert.equal(info.width, manifest.sheetWidth)
  assert.equal(info.height, manifest.sheetHeight)
  for (let frame = 0; frame < manifest.frameCount; frame++) {
    let painted = 0
    for (let y = 0; y < manifest.cellHeight; y++) {
      for (let x = 0; x < manifest.cellWidth; x++) {
        const px = frame % manifest.columns * manifest.cellWidth + x
        const py = Math.floor(frame / manifest.columns) * manifest.cellHeight + y
        const alpha = data[(py * info.width + px) * 4 + 3]
        if (alpha > 8) painted++
        if (x === 0 || y === 0 || x === 127 || y >= manifest.anchor.y) assert.equal(alpha, 0, `Frame ${frame} clips its gutter/ground`)
      }
    }
    assert.ok(painted > 500, `Frame ${frame} must contain a complete pose`)
  }
})
