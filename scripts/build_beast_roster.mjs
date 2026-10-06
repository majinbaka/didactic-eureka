/** Pack original transparent ImageGen cells without repainting or inventing frames. */
import sharp from 'sharp'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
const root = new URL('../', import.meta.url)
const animations = {
  idle: { frames: [0, 1], fps: 3, loop: true },
  walk: { frames: [2, 3, 4, 5], fps: 8, loop: true },
  jump: { frames: [6, 7, 8], fps: 6, loop: false },
  attack: { frames: [9, 10, 11, 12], fps: 8, loop: false },
  skill: { frames: [13, 14, 15, 16], fps: 6, loop: false },
  hurt: { frames: [17], fps: 6, loop: false },
  collapse: { frames: [18, 19], fps: 4, loop: false },
}
const groups = ['forest-v1', 'mystic-v1', 'ancient-v1', 'forest-v2', 'mystic-v2', 'ancient-v2', 'flying-small-v1', 'flying-medium-v1', 'flying-large-v1']
let roster = (await Promise.all(groups.map(async group =>
  JSON.parse(await readFile(new URL(`art/beasts/${group}/roster.json`, root)).catch(error => { if (process.argv.includes('--partial') && error.code === 'ENOENT') return '[]'; throw error }))))).flat()
if (process.argv.includes('--partial')) {
  const available = await Promise.all(roster.map(async beast => { try { await access(new URL(beast.source, root)); return beast } catch { return null } }))
  roster = available.filter(Boolean)
}
if (!process.argv.includes('--partial') && (roster.length !== 70 || new Set(roster.map(b => b.id)).size !== 70)) throw new Error('Expected 70 unique beasts')
const catalog = [], previews = []
for (const beast of roster) {
  const source = new URL(beast.source, root)
  const { data, info } = await sharp(source.pathname).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  if (info.channels !== 4) throw new Error(`Missing alpha: ${beast.id}`)
  // ImageGen grids have uneven gutters. Find low-alpha seams near each grid boundary.
  const alphaAt = (x, y) => data[(y * info.width + x) * 4 + 3] > 8 ? 1 : 0
  function seams(length, divisions, occupancy) {
    const cuts = [0]
    for (let index = 1; index < divisions; index++) {
      const expected = Math.round(length * index / divisions)
      const radius = Math.floor(length / divisions * 0.18)
      let cut = expected, best = Infinity
      for (let position = expected - radius; position <= expected + radius; position++) {
        const score = occupancy(position) + Math.abs(position - expected) / length
        if (score < best) { best = score; cut = position }
      }
      cuts.push(cut)
    }
    return [...cuts, length]
  }
  const ys = seams(info.height, 5, y => {
    let sum = 0
    for (let x = 0; x < info.width; x++) sum += alphaAt(x, y)
    return sum
  })
  const crops = []
  for (let row = 0; row < 5; row++) {
    const xs = seams(info.width, 4, x => {
      let sum = 0
      for (let y = ys[row]; y < ys[row + 1]; y++) sum += alphaAt(x, y)
      return sum
    })
    for (let col = 0; col < 4; col++) {
      let left = info.width, top = info.height, right = 0, bottom = 0, clear = 0
      for (let y = ys[row]; y < ys[row + 1]; y++) for (let x = xs[col]; x < xs[col + 1]; x++) {
        if (!alphaAt(x, y)) { clear++; continue }
        left = Math.min(left, x); top = Math.min(top, y)
        right = Math.max(right, x + 1); bottom = Math.max(bottom, y + 1)
      }
      if (right <= left || bottom <= top || !clear) throw new Error(`Empty or opaque pose: ${beast.id}:${crops.length}`)
      crops.push({ left, top, width: right - left, height: bottom - top })
    }
  }
  // One scale preserves body proportions; special airborne pose sits above the ground.
  const extent = beast.spriteExtentPx ?? 100
  const flightHeight = beast.locomotion === 'flying' ? beast.flightHeightPx : 0
  if (!(extent >= 40 && extent <= 100) || !Number.isInteger(flightHeight) || flightHeight < 0 || flightHeight > 12) throw new Error(`Invalid size/flight metadata: ${beast.id}`)
  const scale = extent / 100 * Math.min(...crops.map(crop => Math.min(120 / crop.width, 100 / crop.height)))
  const frames = []
  for (const [index, crop] of crops.entries()) {
    const width = Math.max(1, Math.round(crop.width * scale)), height = Math.max(1, Math.round(crop.height * scale))
    const input = await sharp(source.pathname).extract(crop)
      .resize(width, height, { kernel: 'nearest' }).png().toBuffer()
    frames.push(await sharp({ create: { width: 128, height: 128, channels: 4, background: '#00000000' } })
      .composite([{ input, left: Math.floor((128 - width) / 2), top: 116 - height - (beast.locomotion === 'flying' && index < 18 ? flightHeight : index === 7 ? 12 : 0) }]).png().toBuffer())
  }
  const base = `/assets/beasts/${beast.id}`
  const output = new URL(`public${base}/`, root)
  await mkdir(output, { recursive: true })
  await sharp({ create: { width: 512, height: 640, channels: 4, background: '#00000000' } })
    .composite(frames.map((input, i) => ({ input, left: i % 4 * 128, top: Math.floor(i / 4) * 128 })))
    .png().toFile(new URL('sheet.png', output).pathname)
  await writeFile(new URL('preview.png', output), frames[0])
  const atlas = { version: 1, cellWidth: 128, cellHeight: 128, columns: 4, rows: 5,
    sheetWidth: 512, sheetHeight: 640, frameCount: 20, anchor: { x: 64, y: 116 }, image: `${base}/sheet.png`, source: beast.source, sourceCuts: crops, animations, ...(beast.locomotion === 'flying' ? { locomotion: beast.locomotion, size: beast.size, spriteExtentPx: extent, flightHeightPx: flightHeight } : {}) }
  await writeFile(new URL('atlas.json', output), JSON.stringify(atlas, null, 2) + '\n')
  catalog.push({ ...beast, image: atlas.image, preview: `${base}/preview.png`, atlas: `${base}/atlas.json`, animations })
  previews.push(frames[0])
  console.log(`${beast.name}: 20 frames`)
}
const json = '[\n' + catalog.map(entry => JSON.stringify(entry)).join(',\n') + '\n]\n'
await writeFile(new URL('public/assets/beasts/roster-v1.json', root), json)
await writeFile(new URL('src/game/beastRoster.json', root), json)
await sharp({ create: { width: 768, height: Math.ceil(previews.length / 6) * 128, channels: 4, background: '#192b26' } })
  .composite(previews.map((input, i) => ({ input, left: i % 6 * 128, top: Math.floor(i / 6) * 128 })))
  .png().toFile(new URL('art/beasts/roster-v1-preview.png', root).pathname)
