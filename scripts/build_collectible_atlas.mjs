import sharp from 'sharp'

const sourcePath = 'art/items/forest-collectibles-v2/collectibles-source.png'
const outputPath = 'public/assets/items/forest-collectibles-v1.png'
const columns = 4
const rows = 2
const cellSize = 32
const spriteSize = 28

const source = sharp(sourcePath)
const metadata = await source.metadata()
const composites = []

for (let index = 0; index < columns * rows; index += 1) {
  const column = index % columns
  const row = Math.floor(index / columns)
  const left = Math.round((metadata.width * column) / columns)
  const top = Math.round((metadata.height * row) / rows)
  const right = Math.round((metadata.width * (column + 1)) / columns)
  const bottom = Math.round((metadata.height * (row + 1)) / rows)

  const cell = await sharp(sourcePath)
    .extract({ left, top, width: right - left, height: bottom - top })
    .png()
    .toBuffer()

  const { data, info } = await sharp(cell)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize(spriteSize, spriteSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: 'nearest',
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let offset = 3; offset < data.length; offset += 4) {
    data[offset] = data[offset] >= 96 ? 255 : 0
  }

  composites.push({
    input: data,
    raw: info,
    left: column * cellSize + (cellSize - spriteSize) / 2,
    top: row * cellSize + (cellSize - spriteSize) / 2,
  })
}

await sharp({
  create: {
    width: columns * cellSize,
    height: rows * cellSize,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite(composites)
  .png({ palette: true, colours: 64, dither: 0 })
  .toFile(outputPath)

console.log(`Built ${outputPath} from ${sourcePath}`)
