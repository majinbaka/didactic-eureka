import sharp from 'sharp'

const sourcePath = 'art/items/herbs-expansion-v1/group-a/source.png'
const outputPath = 'public/assets/items/herbs-v1/group-a.png'
const columns = 8
const rows = 4
const cellSize = 64
const spriteSize = 56
const metadata = await sharp(sourcePath).metadata()
// ImageGen placed transparent row gaps at these source coordinates.
// Crop there to preserve the complete silhouettes before building a uniform atlas.
const sourceRowEdges = [0, 364, 674, 952, metadata.height]
const sprites = []

for (let sprite = 0; sprite < columns * rows; sprite += 1) {
  const column = sprite % columns
  const row = Math.floor(sprite / columns)
  const left = Math.round(metadata.width * column / columns)
  const top = sourceRowEdges[row]
  const right = Math.round(metadata.width * (column + 1) / columns)
  const bottom = sourceRowEdges[row + 1]
  const cell = await sharp(sourcePath)
    .extract({ left, top, width: right - left, height: bottom - top })
    .png()
    .toBuffer()
  const input = await sharp(cell)
    .trim({ background: '#00000000' })
    .resize(spriteSize, spriteSize, {
      fit: 'contain',
      background: '#00000000',
      kernel: 'nearest',
    })
    .png()
    .toBuffer()
  sprites.push({
    input,
    left: column * cellSize + (cellSize - spriteSize) / 2,
    top: row * cellSize + (cellSize - spriteSize) / 2,
  })
}

await sharp({
  create: { width: columns * cellSize, height: rows * cellSize, channels: 4, background: '#00000000' },
})
  .composite(sprites)
  .png()
  .toFile(outputPath)

console.log(`Built ${outputPath} with ${sprites.length} transparent sprites`)
