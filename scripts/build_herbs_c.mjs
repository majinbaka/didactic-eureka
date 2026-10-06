import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const source = 'art/items/herbs-expansion-v1/group-c/source.png'
const destination = 'public/assets/items/herbs-v1/group-c.png'
const { width, height, hasAlpha } = await sharp(source).metadata()
if (!hasAlpha) throw new Error('The generated source must preserve alpha transparency.')
const composites = []
for (let index = 0; index < 30; index += 1) {
  const column = index % 6
  const row = Math.floor(index / 6)
  const left = Math.round(column * width / 6)
  const top = Math.round(row * height / 5)
  const right = Math.round((column + 1) * width / 6)
  const bottom = Math.round((row + 1) * height / 5)
  const extracted = await sharp(source)
    .extract({ left, top, width: right - left, height: bottom - top })
    .png().toBuffer()
  const trimmed = await sharp(extracted)
    .trim({ background: '#00000000', threshold: 5 })
    .png().toBuffer()
  const sprite = await sharp(trimmed)
    .resize(52, 52, { fit: 'inside', kernel: 'nearest' })
    .png().toBuffer()
  const size = await sharp(sprite).metadata()
  composites.push({
    input: sprite,
    left: column * 64 + Math.floor((64 - size.width) / 2),
    top: row * 64 + Math.floor((64 - size.height) / 2),
  })
}
await mkdir('public/assets/items/herbs-v1', { recursive: true })
await sharp({ create: { width: 384, height: 320, channels: 4, background: '#00000000' } })
  .composite(composites).png().toFile(destination)
console.log(`Packaged 30 transparent sprites: ${destination}`)
