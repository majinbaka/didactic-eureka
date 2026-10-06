import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const art = 'art/items/equipment-v1/defense'
const output = 'public/assets/items/equipment-v1/defense'
await mkdir(output, { recursive: true })

// ImageGen produced an extra robe in each row and an extra lightning shield.
// Keep the selected 50 designs in catalog order instead of packing duplicates.
const layouts = {
  2: { counts: [11, 11, 11, 11, 11], skip: [8, 8, 8, 9, 9] },
  3: { counts: [11, 10, 10, 10, 10], skip: [9, -1, -1, -1, -1] },
}

function gapNear(nominal, radius, limit, occupancy) {
  let best = Math.round(nominal)
  for (let p = Math.max(1, Math.round(nominal - radius)); p < Math.min(limit, nominal + radius); p += 1) {
    if (occupancy[p] < occupancy[best]
      || (occupancy[p] === occupancy[best] && Math.abs(p - nominal) < Math.abs(best - nominal))) best = p
  }
  return best
}

for (let batch = 1; batch <= 5; batch += 1) {
  const sourcePath = `${art}/batch-${batch}.source.png`
  const { data, info } = await sharp(sourcePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const alpha = (x, y) => data[(y * width + x) * channels + 3]
  const yCounts = Array(height).fill(0)
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) if (alpha(x, y) > 16) yCounts[y] += 1
  }
  const rowEdges = [0]
  for (let row = 1; row < 5; row += 1) rowEdges.push(gapNear(height * row / 5, height / 40, height, yCounts))
  rowEdges.push(height)
  const sprites = []
  for (let row = 0; row < 5; row += 1) {
    const columns = layouts[batch]?.counts[row] ?? 10
    const skip = layouts[batch]?.skip[row] ?? -1
    const top = rowEdges[row]
    const bottom = rowEdges[row + 1]
    const xCounts = Array(width).fill(0)
    for (let x = 0; x < width; x += 1) {
      for (let y = top; y < bottom; y += 1) if (alpha(x, y) > 16) xCounts[x] += 1
    }
    const edges = [0]
    for (let col = 1; col < columns; col += 1) edges.push(gapNear(width * col / columns, width / columns / 5, width, xCounts))
    edges.push(width)
    for (let col = 0; col < columns; col += 1) {
      if (col === skip) continue
      const cell = await sharp(sourcePath).extract({ left: edges[col], top, width: edges[col + 1] - edges[col], height: bottom - top }).png().toBuffer()
      const input = await sharp(cell).trim({ background: '#00000000' }).resize(56, 56, { fit: 'contain', background: '#00000000', kernel: 'nearest' }).png().toBuffer()
      const index = sprites.length
      sprites.push({ input, left: (index % 10) * 64 + 4, top: Math.floor(index / 10) * 64 + 4 })
    }
  }
  if (sprites.length !== 50) throw new Error(`Batch ${batch}: expected 50 sprites, got ${sprites.length}`)
  const outputPath = `${output}/batch-${batch}.png`
  await sharp({ create: { width: 640, height: 320, channels: 4, background: '#00000000' } }).composite(sprites).png().toFile(outputPath)
  console.log(`Built ${outputPath}: 50 alpha sprites, nearest-neighbor`)
}
