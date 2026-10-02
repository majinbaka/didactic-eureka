import atlas from './characterAtlas.json' with { type: 'json' }

export const CHARACTER_ATLAS = {
  cell: atlas.cellWidth,
  columns: atlas.columns,
  anchor: atlas.anchor || { x: 64, y: 116 },
  outfitExposedSkin: atlas.outfitExposedSkin || {},
  body: '/assets/characters/modular-v1/base-body-sheet-20x20.png',
  outfit: '/assets/characters/modular-v1/outfit-jade-sheet-20x20.png',
}

export const CHARACTER_ANIMATIONS = atlas.animations

export function animationFrame(name, elapsed) {
  const animation = CHARACTER_ANIMATIONS[name] || CHARACTER_ANIMATIONS.idle
  const offset = Math.floor(Math.max(0, elapsed) * animation.fps)
  const count = animation.frames.length
  const frame = animation.loop ? offset % count : Math.min(offset, count - 1)
  return animation.frames[frame]
}

export function selectCharacterAnimation(state, input = {}) {
  if (state.action) return state.action
  if (state.flying) return 'fly'
  if (state.y > 0) return 'jump'
  if (input.move) return input.run || state.dash > 0 ? 'run' : 'walk'
  return 'idle'
}
