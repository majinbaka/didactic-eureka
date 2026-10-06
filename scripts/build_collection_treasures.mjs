import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

// Remove isolated spill from adjacent generated cells; preserve the largest coherent sprite.
async function isolateSprite(cell) {
  const { data, info } = await sharp(cell).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const seen = new Uint8Array(info.width * info.height)
  let largest = []
  for (let seed = 0; seed < seen.length; seed++) {
    if (seen[seed] || data[seed * 4 + 3] < 8) continue
    const component = [seed]
    seen[seed] = 1
    for (let cursor = 0; cursor < component.length; cursor++) {
      const index = component[cursor]
      const x = index % info.width
      const y = Math.floor(index / info.width)
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy
        if (nx < 0 || nx >= info.width || ny < 0 || ny >= info.height) continue
        const neighbor = ny * info.width + nx
        if (!seen[neighbor] && data[neighbor * 4 + 3] >= 8) {
          seen[neighbor] = 1
          component.push(neighbor)
        }
      }
    }
    if (component.length > largest.length) largest = component
  }
  if (!largest.length) throw new Error('Empty generated treasure cell')
  const keep = new Uint8Array(seen.length)
  for (const index of largest) keep[index] = 1
  for (let index = 0; index < keep.length; index++) if (!keep[index]) data[index * 4 + 3] = 0
  return sharp(data, { raw: info }).png().toBuffer()
}

// Repackage original ImageGen sources; source images are not regenerated here.
const destination = 'public/assets/items/equipment-v1/treasures'
await mkdir(destination, { recursive: true })
for (let batch = 1; batch <= 5; batch++) {
  const source = `art/items/equipment-v1/treasures/source-${batch}.png`
  const { width, height, hasAlpha } = await sharp(source).metadata()
  if (!hasAlpha) throw new Error(`Missing alpha: ${source}`)
  const sprites = []
  for (let sprite = 0; sprite < 50; sprite++) {
    const col = sprite % 10, row = Math.floor(sprite / 10)
    const left = Math.round(col * width / 10), top = Math.round(row * height / 5)
    const right = Math.round((col + 1) * width / 10), bottom = Math.round((row + 1) * height / 5)
    const cell = await sharp(source).extract({ left, top, width: right - left, height: bottom - top }).png().toBuffer()
    const isolated = await isolateSprite(cell)
    const trimmed = await sharp(isolated).trim({ background: '#00000000', threshold: 5 }).png().toBuffer()
    const icon = await sharp(trimmed).resize(52, 52, { fit: 'inside', kernel: 'nearest' }).png().toBuffer()
    const size = await sharp(icon).metadata()
    sprites.push({ input: icon, left: col * 64 + Math.floor((64 - size.width) / 2), top: row * 64 + Math.floor((64 - size.height) / 2) })
  }
  await sharp({ create: { width: 640, height: 320, channels: 4, background: '#00000000' } }).composite(sprites).png().toFile(`${destination}/batch-${batch}.png`)
  console.log(`Packed treasure batch ${batch}: 50 slots`)
}
