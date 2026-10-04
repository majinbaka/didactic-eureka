import { isSupported } from './runner.js'
import atlas from './characterAtlas.json' with { type: 'json' }

export const CHARACTER_ATLAS = {
  cell: atlas.cellWidth,
  columns: atlas.columns,
  anchor: atlas.anchor || { x: 64, y: 116 },
  image: atlas.image,
}

export const CHARACTER_ANIMATIONS = atlas.animations

export function animationFrame(name, elapsed) {
  const animation = CHARACTER_ANIMATIONS[name] || CHARACTER_ANIMATIONS.idle
  const offset = Math.floor(Math.max(0, elapsed) * animation.fps)
  const count = animation.frames.length
  const frame = animation.loop ? offset % count : Math.min(offset, count - 1)
  return animation.frames[frame]
}

export function characterFootInset(frame) {
  return frame === 9 || frame === 11 ? 2 : 1
}

export function characterBaseline(state, ground, frame = 0) {
  return ground - Math.max(0, state.y || 0) + characterFootInset(frame)
}

export function selectCharacterAnimation(state, input = {}) {
  if (state.action) return state.action
  if (state.flying) return 'fly'
  if (state.y > 0 && !isSupported(state)) return 'jump'
  if (input.move) return input.run || state.dash > 0 ? 'run' : 'walk'
  return 'idle'
}
