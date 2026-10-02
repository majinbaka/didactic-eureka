export const CHARACTER_ATLAS = {
  cell: 128,
  columns: 20,
  body: '/assets/characters/modular-v1/base-body-sheet-20x20.png',
  outfit: '/assets/characters/modular-v1/outfit-jade-sheet-20x20.png',
}

const definitions = [
  ['idle', 4, 6], ['walk', 6, 10], ['run', 6, 14], ['jump', 4, 12],
  ['fly', 4, 10], ['hello', 6, 7], ['scratch', 6, 7], ['doze', 6, 4],
  ['sit', 4, 4], ['crawl', 6, 8], ['hurt', 4, 10], ['collapse', 6, 8],
]

let firstFrame = 0
export const CHARACTER_ANIMATIONS = Object.fromEntries(definitions.map(([name, count, fps]) => {
  const animation = [name, { firstFrame, count, fps, loop: !['hurt', 'collapse'].includes(name) }]
  firstFrame += count
  return animation
}))

export function animationFrame(name, elapsed) {
  const animation = CHARACTER_ANIMATIONS[name] || CHARACTER_ANIMATIONS.idle
  const offset = Math.floor(elapsed * animation.fps)
  const frame = animation.loop ? offset % animation.count : Math.min(offset, animation.count - 1)
  return animation.firstFrame + frame
}

export function selectCharacterAnimation(state, input = {}) {
  if (state.action) return state.action
  if (state.flying) return 'fly'
  if (state.y > 0) return 'jump'
  if (input.move) return input.run || state.dash > 0 ? 'run' : 'walk'
  return 'idle'
}
