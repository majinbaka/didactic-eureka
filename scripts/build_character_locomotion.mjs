/** Pack authored ImageGen silhouettes. No anatomy synthesis or deformation. */
import sharp from 'sharp'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { LOCOMOTION_ANIMATIONS } from '../src/game/characterMotion.js'

const root = new URL('../', import.meta.url)
const directory = new URL('public/assets/characters/', root)
const roster = JSON.parse(await readFile(new URL('roster-v2.json', directory)))
const names = { 'jade-v2': 'Vô Danh', 'female-v1': 'Linh Nhi', 'bald-monk-v1': 'Minh Không',
  'strongman-v1': 'Thiết Sơn', 'elder-v1': 'Bạch Tùng', 'sect-master-v1': 'Trưởng lão' }
const catalog = []
const previews = []

for (const entry of await readdir(directory, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const id = entry.name
  const base = new URL(`${id}/`, directory)
  const atlas = JSON.parse(await readFile(new URL('atlas.json', base)))
  const source = new URL(`art/characters/locomotion-v1/${id}.png`, root)
  const { data, info } = await sharp(source.pathname).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const labels = new Int32Array(info.width * info.height)
  const components = []
  let label = 0
  for (let pixel = 0; pixel < labels.length; pixel++) {
    if (labels[pixel] || data[pixel * 4 + 3] <= 8) continue
    label++
    const stack = [pixel]
    labels[pixel] = label
    let count = 0, left = info.width, top = info.height, right = 0, bottom = 0
    while (stack.length) {
      const current = stack.pop(), x = current % info.width, y = Math.floor(current / info.width)
      count++
      left = Math.min(left, x); top = Math.min(top, y)
      right = Math.max(right, x + 1); bottom = Math.max(bottom, y + 1)
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy, next = ny * info.width + nx
        if (nx < 0 || ny < 0 || nx >= info.width || ny >= info.height || labels[next] || data[next * 4 + 3] <= 8) continue
        labels[next] = label
        stack.push(next)
      }
    }
    if (count > 100) components.push({ label, count, left, top, width: right - left, height: bottom - top })
  }
  if (components.length !== 8) throw new Error(`${id}: expected 8 complete silhouettes, found ${components.length}`)
  components.sort((a, b) => a.top + a.height / 2 - b.top - b.height / 2)
  const crops = [0, 1].flatMap(row => components.slice(row * 4, row * 4 + 4).sort((a, b) => a.left - b.left))
  // Measure the original idle's alpha directly; Sharp trim runs before extract.
  const idlePixels = await sharp(new URL(`public${atlas.image}`, root).pathname)
    .extract({ left: 0, top: 0, width: 128, height: 128 }).ensureAlpha().raw().toBuffer()
  let idleTop = 128, idleBottom = 0
  for (let y = 0; y < 128; y++) for (let x = 0; x < 128; x++) {
    if (idlePixels[(y * 128 + x) * 4 + 3] > 8) { idleTop = Math.min(idleTop, y); idleBottom = Math.max(idleBottom, y) }
  }
  const walkHeight = crops.slice(0, 4).reduce((sum, c) => sum + c.height, 0) / 4
  const scale = Math.min((idleBottom - idleTop + 1) / walkHeight, ...crops.map(c => Math.min(120 / c.width, 110 / c.height)))
  const frames = []
  for (const crop of crops) {
    const pixels = Buffer.alloc(crop.width * crop.height * 4)
    for (let y = 0; y < crop.height; y++) for (let x = 0; x < crop.width; x++) {
      const origin = (crop.top + y) * info.width + crop.left + x
      if (labels[origin] !== crop.label) continue
      data.copy(pixels, (y * crop.width + x) * 4, origin * 4, origin * 4 + 4)
    }
    const width = Math.round(crop.width * scale), height = Math.round(crop.height * scale)
    const input = await sharp(pixels, { raw: { width: crop.width, height: crop.height, channels: 4 } })
      .resize(width, height, { kernel: 'nearest' }).png().toBuffer()
    frames.push(await sharp({ create: { width: 128, height: 128, channels: 4, background: '#00000000' } })
      .composite([{ input, left: Math.floor((128 - width) / 2), top: 116 - height }]).png().toBuffer())
  }
  await sharp({ create: { width: 512, height: 256, channels: 4, background: '#00000000' } })
    .composite(frames.map((input, i) => ({ input, left: i % 4 * 128, top: Math.floor(i / 4) * 128 })))
    .png().toFile(new URL('locomotion-v1.png', base).pathname)
  const manifest = { version: 1, cellWidth: 128, cellHeight: 128, columns: 4, rows: 2,
    sheetWidth: 512, sheetHeight: 256, anchor: { x: 64, y: 116 }, frameCount: 8,
    image: `/assets/characters/${id}/locomotion-v1.png`, animations: LOCOMOTION_ANIMATIONS }
  await writeFile(new URL('locomotion-v1.json', base), JSON.stringify(manifest, null, 2) + '\n')
  catalog.push(roster.find(c => c.id === id) || { id, name: names[id] || id, image: atlas.image,
    atlas: `/assets/characters/${id}/atlas.json`, preview: `/assets/characters/${id}/preview-idle.png` })
  previews.push(frames[4], frames[5])
  console.log(`${id}: 8 frames, walk height ${Math.round(walkHeight * scale)}px`)
}
await writeFile(new URL('roster-all.json', directory), JSON.stringify(catalog, null, 2) + '\n')
await sharp({ create: { width: 1024, height: Math.ceil(previews.length / 8) * 128, channels: 4, background: '#192b26' } })
  .composite(previews.map((input, i) => ({ input, left: i % 8 * 128, top: Math.floor(i / 8) * 128 })))
  .png().toFile(new URL('art/characters/locomotion-v1/preview.png', root).pathname)
