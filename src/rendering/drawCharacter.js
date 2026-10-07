import { locomotionFrame, locomotionImage } from '../game/characterMotion.js'

const sheets = new WeakMap()

export async function loadCharacterLocomotion(image) {
  const sheet = new Image()
  sheet.src = locomotionImage(image.src)
  await sheet.decode()
  sheets.set(image, sheet)
}

// Draw complete authored poses. Never deform or reconstruct limbs at runtime.
export function drawCharacter(ctx, image, frame, x, y, facing = 1, motion = {}) {
  if (!image?.complete || !image.naturalWidth) return
  const locomotion = locomotionFrame(motion)
  const sheet = locomotion === null ? image : sheets.get(image)
  if (sheet) {
    if (locomotion !== null) frame = locomotion
  } else {
    // Keep the complete standing pose while the locomotion asset is loading.
    frame = 0
  }
  ctx.save()
  ctx.imageSmoothingEnabled = false
  ctx.translate(Math.round(x), Math.round(y))
  ctx.scale(facing, 1)
  ctx.drawImage(sheet || image, frame % 4 * 128, Math.floor(frame / 4) * 128, 128, 128, -64, -116, 128, 128)
  ctx.restore()
}
