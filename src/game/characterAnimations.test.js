import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { animationFrame, CHARACTER_ANIMATIONS, selectCharacterAnimation } from './characterAnimations.js'

test('animation lookup follows the packaged atlas frame sequences', () => {
  const manifest = JSON.parse(readFileSync(new URL('../../public/assets/characters/modular-v1/atlas.json', import.meta.url)))
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

test('idle and unknown animations preserve the approved original frame', () => {
  assert.equal(animationFrame('idle', 100), 0)
  assert.equal(animationFrame('missing', -10), 0)
  assert.equal(animationFrame('collapse', 100), CHARACTER_ANIMATIONS.collapse.frames.at(-1))
})

test('state selection keeps action poses and flight ahead of ground locomotion', () => {
  assert.equal(selectCharacterAnimation({ action: 'sit', flying: false, y: 0 }, { move: 1 }), 'sit')
  assert.equal(selectCharacterAnimation({ flying: true, y: 80 }, { move: 1 }), 'fly')
  assert.equal(selectCharacterAnimation({ y: 30 }, { move: 1 }), 'jump')
  assert.equal(selectCharacterAnimation({ y: 0 }, { move: 1, run: true }), 'run')
  assert.equal(selectCharacterAnimation({ y: 0 }, { move: 1 }), 'walk')
})

test('outfit coverage windows remain inside their corresponding frames', () => {
  const manifest = JSON.parse(readFileSync(new URL('../../public/assets/characters/modular-v1/atlas.json', import.meta.url)))
  for (const [frame, windows] of Object.entries(manifest.outfitExposedSkin)) {
    assert.ok(Number(frame) < manifest.frameCount)
    for (const [left, top, right, bottom] of windows) {
      assert.ok(left >= 0 && top >= 0 && right <= 128 && bottom <= 128)
      assert.ok(right > left && bottom > top)
    }
  }
})
