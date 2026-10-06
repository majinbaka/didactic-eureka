import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'

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
  if (!largest.length) throw new Error('Empty generated formation cell')
  const keep = new Uint8Array(seen.length)
  for (const index of largest) keep[index] = 1
  for (let index = 0; index < keep.length; index++) if (!keep[index]) data[index * 4 + 3] = 0
  return sharp(data, { raw: info }).png().toBuffer()
}

const art = 'art/items/equipment-v1/formations'
const assets = 'public/assets/items/equipment-v1/formations'
await mkdir(assets, { recursive: true })
const manifest = { generator: 'built-in OpenAI ImageGen', columns: 10, rows: 5, cellSize: 64, atlases: [] }
for (let batch = 1; batch <= 5; batch++) {
  const source = `${art}/source-${batch}.png`
  const destination = `${assets}/batch-${batch}.png`
  const { width, height, hasAlpha } = await sharp(source).metadata()
  if (!hasAlpha) throw new Error(`Missing source alpha: ${source}`)
  const pixels = await sharp(source).ensureAlpha().raw().toBuffer()
  // Generated sheets may drift slightly within their equal grid. Place each vertical
  // cut in the lowest-alpha gutter near the expected boundary, rather than through cloth.
  const boundaries = []
  for (let row = 0; row < 5; row++) {
    const cuts = [0]
    for (let col = 1; col < 10; col++) {
      const target = Math.round(col * width / 10)
      const radius = Math.floor(width / 10 * 0.28)
      let best = target, score = Infinity
      for (let x = target - radius; x <= target + radius; x++) {
        let ink = 0
        for (let y = Math.round(row * height / 5); y < Math.round((row + 1) * height / 5); y++) ink += pixels[(y * width + x) * 4 + 3]
        const candidate = ink + Math.abs(x - target) * 0.001
        if (candidate < score) { score = candidate; best = x }
      }
      cuts.push(best)
    }
    cuts.push(width)
    boundaries.push(cuts)
  }
  // Batch 4's broad arches and folding equipment shift column spacing significantly.
  // Reviewed source-space gutters retain the full silhouettes in their intended order.
  if (batch === 4) {
    const reviewed = [
      [0, 151, 306, 457, 595, 785, 1010, 1170, 1370, 1560, 1774],
      [0, 151, 306, 457, 630, 798, 1020, 1180, 1380, 1570, 1774],
      [0, 173, 324, 478, 647, 882, 1061, 1228, 1410, 1585, 1774],
      [0, 155, 319, 462, 613, 800, 968, 1200, 1387, 1577, 1774],
      [0, 185, 362, 555, 717, 903, 1042, 1250, 1445, 1575, 1774],
    ]
    for (let row = 0; row < 5; row++) boundaries[row] = reviewed[row].map(x => Math.round(x * width / 1774))
  }
  const tiles = []
  for (let sprite = 0; sprite < 50; sprite++) {
    const col = sprite % 10
    const row = Math.floor(sprite / 10)
    const left = boundaries[row][col]
    const top = Math.round(row * height / 5)
    const cellWidth = boundaries[row][col + 1] - left
    const cellHeight = Math.round((row + 1) * height / 5) - top
    const cell = await sharp(source).extract({ left, top, width: cellWidth, height: cellHeight }).png().toBuffer()
    // Alpha-trim each complete generated item, then center it inside a fixed runtime gutter.
    const isolated = await isolateSprite(cell)
    const trimmed = await sharp(isolated).trim({ background: '#00000000', threshold: 5 }).png().toBuffer()
    const tile = await sharp(trimmed).resize(54, 54, { fit: 'inside', kernel: sharp.kernel.nearest }).png().toBuffer({ resolveWithObject: true })
    tiles.push({ input: tile.data, left: col * 64 + Math.floor((64 - tile.info.width) / 2), top: row * 64 + Math.floor((64 - tile.info.height) / 2) })
  }
  await sharp({ create: { width: 640, height: 320, channels: 4, background: '#00000000' } }).composite(tiles).png().toFile(destination)
  const result = await sharp(destination).metadata()
  if (result.width !== 640 || result.height !== 320 || !result.hasAlpha) throw new Error(`Invalid atlas: ${destination}`)
  manifest.atlases.push({ batch, source, destination, sourceWidth: width, sourceHeight: height, spriteCount: 50, columnCuts: boundaries })
  console.log(`${destination}: 640×320 RGBA, 50 sprites`)
}
await writeFile(`${art}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n')
