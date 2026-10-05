/** Crop and pack original ImageGen artwork; preserve alpha and body proportions. */
import sharp from 'sharp'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
const root = new URL('../', import.meta.url)
const roster = JSON.parse(await readFile(new URL('art/characters/roster-v2.json', root)))
const template = JSON.parse(await readFile(new URL('public/assets/characters/female-v1/atlas.json', root)))
const catalog = []
const previews = []
for (const character of roster) {
  const source = new URL(`art/characters/${character.id}/character-keyposes-source.png`, root)
  const { data, info } = await sharp(source.pathname).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  if (info.width !== 1254 || info.height !== 1254) throw new Error(`Unexpected size: ${character.id}`)
  // Segment connected silhouettes: generated rows can overlap vertically even
  // when each figure is separate. Fixed grid cuts would clip hair or fingertips.
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
    if (count > 100) components.push({ label, left, top, width: right - left, height: bottom - top })
  }
  if (components.length !== 16) throw new Error(`Expected 16 silhouettes: ${character.id}, found ${components.length}`)
  components.sort((a, b) => (a.top + a.height / 2) - (b.top + b.height / 2))
  const crops = []
  for (let row = 0; row < 4; row++) {
    crops.push(...components.slice(row * 4, row * 4 + 4).sort((a, b) => a.left - b.left))
  }
  // One scale per character. Idle height preserves tall/short/adult/child differences.
  const scale = Math.min(character.height / crops[0].height, ...crops.map(c => Math.min(120 / c.width, 110 / c.height)))
  const frames = []
  for (const crop of crops) {
    const width = Math.round(crop.width * scale), height = Math.round(crop.height * scale)
    const pixels = Buffer.alloc(crop.width * crop.height * 4)
    for (let y = 0; y < crop.height; y++) for (let x = 0; x < crop.width; x++) {
      const origin = (crop.top + y) * info.width + crop.left + x
      // Keep original RGBA, excluding any neighboring silhouette in the bounds.
      if (labels[origin] && labels[origin] !== crop.label) continue
      data.copy(pixels, (y * crop.width + x) * 4, origin * 4, origin * 4 + 4)
    }
    const input = await sharp(pixels, { raw: { width: crop.width, height: crop.height, channels: 4 } })
      .resize(width, height, { kernel: 'nearest' }).png().toBuffer()
    frames.push(await sharp({ create: { width: 128, height: 128, channels: 4, background: '#00000000' } })
      .composite([{ input, left: Math.floor((128 - width) / 2), top: 116 - height }]).png().toBuffer())
  }
  const base = `assets/characters/${character.id}`
  const output = new URL(`public/${base}/`, root)
  await mkdir(output, { recursive: true })
  await sharp({ create: { width: 512, height: 512, channels: 4, background: '#00000000' } })
    .composite(frames.map((input, i) => ({ input, left: i % 4 * 128, top: Math.floor(i / 4) * 128 })))
    .png().toFile(new URL(`character-${character.id}-sheet.png`, output).pathname)
  await writeFile(new URL('preview-idle.png', output), frames[0])
  const atlas = { ...template, name: character.name, image: `/${base}/character-${character.id}-sheet.png` }
  await writeFile(new URL('atlas.json', output), JSON.stringify(atlas, null, 2) + '\n')
  await writeFile(new URL('README.md', output), `# ${character.name}\n\n${character.description}\n\nImageGen nội bộ; ảnh nguồn và prompt trong art/characters. Atlas 4×4, 16 key pose, ô 128×128, neo (64,116). Chưa phải chu kỳ animation nhiều frame hoàn chỉnh.\n`)
  catalog.push({ id: character.id, name: character.name, image: atlas.image, atlas: `/${base}/atlas.json`, preview: `/${base}/preview-idle.png` })
  previews.push(frames[0])
  console.log(`${character.name}: 16 poses; idle ${Math.round(crops[0].height * scale)}px`)
}
await writeFile(new URL('public/assets/characters/roster-v2.json', root), JSON.stringify(catalog, null, 2) + '\n')
await sharp({ create: { width: 640, height: 512, channels: 4, background: '#192b26' } })
  .composite(previews.map((input, i) => ({ input, left: i % 5 * 128, top: Math.floor(i / 5) * 128 })))
  .png().toFile(new URL('art/characters/roster-v2-preview.png', root).pathname)
console.log(`Packed ${catalog.length} characters / ${catalog.length * 16} key poses.`)
