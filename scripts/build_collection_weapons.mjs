import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const columns = 10
const rows = 5
const cellSize = 64
const spriteSize = 56
const sourceRoot = 'art/items/equipment-v1/weapons'
const outputRoot = 'public/assets/items/equipment-v1/weapons'
await mkdir(outputRoot, { recursive: true })

// Find empty source gutters around the expected borders. ImageGen keeps the
// item order but can shift centers; uniform source crops would clip blades.
function gutters(projection, parts) {
  const edges = [0]
  const step = projection.length / parts
  for (let part = 1; part < parts; part += 1) {
    const target = Math.round(step * part)
    const radius = Math.floor(step * 0.32)
    let best = target
    let cost = Infinity
    for (let x = Math.max(edges.at(-1) + 1, target - radius); x <= Math.min(projection.length - 1, target + radius); x += 1) {
      const value = projection[x] * 1000 + Math.abs(target - x)
      if (value < cost) { cost = value; best = x }
    }
    edges.push(best)
  }
  edges.push(projection.length)
  return edges
}

function columnEdges(projection) {
  const runs = []
  let start = -1
  let end = -1
  for (let x = 0; x <= projection.length; x += 1) {
    if ((projection[x] || 0) > 5) {
      if (start < 0) start = x
      end = x
    } else if (start >= 0 && x - end > 1) {
      const area = projection.slice(start, end + 1).reduce((sum, value) => sum + value, 0)
      if (area > 1000) runs.push([start, end])
      start = -1
    }
  }
  // Paired daggers have a small internal gap: merge the nearest fragments.
  while (runs.length > columns) {
    let nearest = 0
    for (let i = 1; i < runs.length - 1; i += 1) {
      if (runs[i + 1][0] - runs[i][1] < runs[nearest + 1][0] - runs[nearest][1]) nearest = i
    }
    runs.splice(nearest, 2, [runs[nearest][0], runs[nearest + 1][1]])
  }
  if (runs.length !== columns) return gutters(projection, columns)
  return [0, ...runs.slice(1).map((run, i) => Math.floor((runs[i][1] + run[0]) / 2)), projection.length]
}

const batches = process.argv.length > 2 ? process.argv.slice(2).map(Number) : [1, 2, 3, 4, 5]
for (const batch of batches) {
  const sourcePath = `${sourceRoot}/source-${batch}.png`
  const { data, info } = await sharp(sourcePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const rowProjection = Array(info.height).fill(0)
  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) rowProjection[y] += data[(y * info.width + x) * 4 + 3] > 12 ? 1 : 0
  }
  const yEdges = gutters(rowProjection, rows)
  const sprites = []
  for (let row = 0; row < rows; row += 1) {
    const top = yEdges[row]
    const height = yEdges[row + 1] - top
    const projection = Array(info.width).fill(0)
    for (let y = top; y < top + height; y += 1) {
      for (let x = 0; x < info.width; x += 1) projection[x] += data[(y * info.width + x) * 4 + 3] > 12 ? 1 : 0
    }
    const xEdges = columnEdges(projection)
    for (let column = 0; column < columns; column += 1) {
      const crop = { left: xEdges[column], top, width: xEdges[column + 1] - xEdges[column], height }
      const cell = await sharp(sourcePath).extract(crop).png().toBuffer()
      const input = await sharp(cell).trim({ background: '#00000000' }).resize(spriteSize, spriteSize, {
        fit: 'contain', background: '#00000000', kernel: 'nearest',
      }).png().toBuffer()
      sprites.push({ input, left: column * cellSize + 4, top: row * cellSize + 4 })
    }
  }
  const outputPath = `${outputRoot}/batch-${batch}.png`
  await sharp({ create: { width: columns * cellSize, height: rows * cellSize, channels: 4, background: '#00000000' } })
    .composite(sprites).png().toFile(outputPath)
  console.log(`Built ${outputPath}: ${sprites.length} sprites, alpha preserved; source ${info.width}×${info.height}`)
}
