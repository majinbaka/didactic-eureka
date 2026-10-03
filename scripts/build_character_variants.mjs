/** Pack generated 4x4 character boards without redrawing their artwork. */
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const variants = ['female-v1', 'elder-v1', 'bald-monk-v1', 'strongman-v1', 'sect-master-v1']
const rows = [0, 332, 663, 995, 1254]
const columns = [0, 320, 635, 990, 1254]
const animations = {
  idle: [[0], 1, true], walk: [[1, 0, 2, 0], 8, true], run: [[3, 1, 4, 2], 12, true],
  jump: [[5], 1, true], fly: [[6], 1, true], hello: [[7, 8], 4, true],
  scratch: [[9, 10], 4, true], doze: [[0, 11, 11, 11], 2, true], sit: [[12], 1, true],
  crawl: [[13], 1, true], hurt: [[14], 1, false], collapse: [[14, 12, 15], 5, false],
}

for (const variant of variants) {
  const source = new URL(`art/characters/${variant}/character-keyposes-source.png`, root)
  const output = new URL(`public/assets/characters/${variant}/`, root)
  const { data, info } = await sharp(source.pathname).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  if (info.width !== 1254 || info.height !== 1254) throw new Error(`Unexpected source dimensions for ${variant}`)

  const crops = []
  for (let frame = 0; frame < 16; frame++) {
    const row = Math.floor(frame / 4), col = frame % 4
    let left = info.width, top = info.height, right = 0, bottom = 0
    for (let y = rows[row]; y < rows[row + 1]; y++) {
      for (let x = columns[col]; x < columns[col + 1]; x++) {
        if (data[(y * info.width + x) * 4 + 3] > 8) {
          left = Math.min(left, x); top = Math.min(top, y)
          right = Math.max(right, x + 1); bottom = Math.max(bottom, y + 1)
        }
      }
    }
    if (right <= left || bottom <= top) throw new Error(`Empty pose ${frame} in ${variant}`)
    crops.push({ left, top, width: right - left, height: bottom - top })
  }

  const scale = Math.min(...crops.map(crop => Math.min(116 / crop.width, 108 / crop.height)))
  const frames = []
  for (const crop of crops) {
    const width = Math.round(crop.width * scale), height = Math.round(crop.height * scale)
    const pose = await sharp(source.pathname).extract(crop).resize(width, height, { kernel: 'nearest' }).png().toBuffer()
    frames.push(await sharp({ create: { width: 128, height: 128, channels: 4, background: '#00000000' } })
      .composite([{ input: pose, left: Math.floor((128 - width) / 2), top: 116 - height }]).png().toBuffer())
  }

  await mkdir(output, { recursive: true })
  const sheet = await sharp({ create: { width: 512, height: 512, channels: 4, background: '#00000000' } })
    .composite(frames.map((input, index) => ({ input, left: index % 4 * 128, top: Math.floor(index / 4) * 128 }))).png().toBuffer()
  await writeFile(new URL(`character-${variant}-sheet.png`, output), sheet)
  await writeFile(new URL('preview-idle.png', output), frames[0])

  const manifest = {
    version: 1, cellWidth: 128, cellHeight: 128, columns: 4, rows: 4,
    sheetWidth: 512, sheetHeight: 512, anchor: { x: 64, y: 116 }, frameCount: 16,
    image: `/assets/characters/${variant}/character-${variant}-sheet.png`,
    animations: Object.fromEntries(Object.entries(animations).map(([name, [poses, fps, loop]]) => [name, { frames: poses, fps, loop }])),
  }
  await writeFile(new URL('atlas.json', output), `${JSON.stringify(manifest, null, 2)}\n`)
  await writeFile(new URL('README.md', output), `# ${variant}\n\nSprite liền thân 4×4, 16 key pose, ô 128×128, neo chân (64,116). Nguồn ImageGen nội bộ ở \`art/characters/${variant}/\`.\n`)
}

console.log(`Packed ${variants.length} character variants.`)
