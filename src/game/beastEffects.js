import roster from './beastEffectRoster.json' with { type: 'json' }
export const beastEffectCatalog = roster
export const BEAST_EFFECT_PHASES = { melee: 'Vệt đánh gần', charge: 'Tụ lực', travel: 'Chiêu di chuyển', impact: 'Va chạm', field: 'Hiệu ứng lưu lại' }
export function getBeastEffect(beastId) { return beastEffectCatalog.find(effect => effect.beastId === beastId) || null }
/** Global sheet frame; use frame % 4 with a clip's separate 512x128 strip. */
export function beastEffectFrame(effect, phase, seconds) {
  if (!effect || !Object.hasOwn(effect.animations, phase)) return null
  const animation = effect.animations[phase]
  const step = Math.floor(Math.max(0, Number.isFinite(seconds) ? seconds : 0) * animation.fps)
  return animation.frames[animation.loop ? step % animation.frames.length : Math.min(step, animation.frames.length - 1)]
}
