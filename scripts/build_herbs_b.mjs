import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'

const source = 'art/items/herbs-expansion-v1/group-b/source.png'
const destination = 'public/assets/items/herbs-v1/group-b.png'
const { width, height, hasAlpha } = await sharp(source).metadata()
if (!hasAlpha) throw new Error('Herb atlas source must preserve transparent alpha')

const tiles = []
for (let index = 0; index < 32; index++) {
  const column = index % 8
  const row = Math.floor(index / 8)
  const left = Math.round(column * width / 8)
  const top = Math.round(row * height / 4)
  const cellWidth = Math.round((column + 1) * width / 8) - left
  const cellHeight = Math.round((row + 1) * height / 4) - top
  // Each generated cell is fitted separately to add an exact runtime gutter.
  const cell = await sharp(source).extract({ left, top, width: cellWidth, height: cellHeight }).png().toBuffer()
  const tile = await sharp(cell).resize(52, 52, {
    fit: 'inside', kernel: sharp.kernel.nearest, withoutEnlargement: true,
  }).png().toBuffer({ resolveWithObject: true })
  tiles.push({
    input: tile.data,
    left: column * 64 + Math.floor((64 - tile.info.width) / 2),
    top: row * 64 + Math.floor((64 - tile.info.height) / 2),
  })
}

await mkdir('public/assets/items/herbs-v1', { recursive: true })
await sharp({ create: { width: 512, height: 256, channels: 4, background: '#00000000' } })
  .composite(tiles).png().toFile(destination)
const packaged = await sharp(destination).metadata()
if (packaged.width !== 512 || packaged.height !== 256 || !packaged.hasAlpha) {
  throw new Error('Invalid packaged herb atlas')
}
await writeFile('art/items/herbs-expansion-v1/group-b/manifest.json', JSON.stringify({
  source, destination, generator: 'built-in OpenAI ImageGen',
  generatedAt: '2026-10-06', columns: 8, rows: 4, cellSize: 64,
  width: 512, height: 256, packing: '52px nearest-neighbor cell content with transparent gutters',
}, null, 2) + '\n')
console.log(`Packaged ${destination}: 512×256 RGBA, 32 sprites`)
