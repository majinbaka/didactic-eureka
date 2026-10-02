export const JOYSTICK_RADIUS = 38
export const JOYSTICK_DEAD_ZONE = 9

export function joystickInput(dx, dy) {
  const distance = Math.hypot(dx, dy)
  const scale = distance > JOYSTICK_RADIUS ? JOYSTICK_RADIUS / distance : 1

  return {
    knobX: dx * scale,
    knobY: dy * scale,
    move: Math.abs(dx) > JOYSTICK_DEAD_ZONE ? Math.sign(dx) : 0,
    run: Math.abs(dx) > JOYSTICK_RADIUS * .72,
  }
}
