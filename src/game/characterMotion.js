// Presentation state only; this never enters the player's save or physics state.
export function advanceCharacterMotion(previous, body, animation) {
  const distance = previous ? Math.abs(body.x - previous.x) : 0
  const locomotion = animation === 'run' || animation === 'walk'
  const moving = distance > .001 && distance < 100
  const phase = ((previous?.phase || 0) + (locomotion && moving ? distance / (animation === 'run' ? 130 : 120) : 0)) % 1
  return { x: body.x, phase, animation: locomotion && !moving ? 'idle' : animation }
}

export const LOCOMOTION_ANIMATIONS = {
  walk: { frames: [0, 1, 2, 3], fps: 8, loop: true },
  run: { frames: [4, 5, 6, 7], fps: 12, loop: true },
}

export function locomotionImage(image) {
  return image.replace(/[^/]+\.png(?:\?.*)?$/, 'locomotion-v1.png')
}

export function locomotionFrame({ animation, elapsed = 0, phase } = {}) {
  const clip = LOCOMOTION_ANIMATIONS[animation]
  if (!clip) return null
  const step = phase === undefined ? Math.max(0, elapsed) * clip.fps : Math.max(0, phase) * clip.frames.length
  return clip.frames[Math.floor(step) % clip.frames.length]
}
