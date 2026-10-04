import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const floatingSource = fileURLToPath(new URL('../art/scenery/floating-obstacle-v1/floating-platform-source.png', import.meta.url))
const outputDirectory = fileURLToPath(new URL('../public/assets/scenery/floating-obstacle-v1/', import.meta.url))
const floatingOutput = fileURLToPath(new URL('../public/assets/scenery/floating-obstacle-v1/floating-platform.webp', import.meta.url))

await mkdir(outputDirectory, { recursive: true })
const trimmed = await sharp(floatingSource).trim({ background: '#00000000' })
  .resize(240, 112, { fit: 'inside', kernel: 'nearest' }).webp({ lossless: true }).toBuffer()
const metadata = await sharp(trimmed).metadata()
await sharp({ create: { width: 256, height: 128, channels: 4, background: '#00000000' } })
  .composite([{ input: trimmed, left: Math.floor((256 - metadata.width) / 2), top: 120 - metadata.height }])
  .webp({ lossless: true }).toFile(floatingOutput)
