/** Separate mechanic/VFX atlases; no beast bodies or combat integration. */
import sharp from 'sharp'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { effectCrops, packEffectFrames } from './lib/effect_atlas.mjs'
const root = new URL('../', import.meta.url)
const partial = process.argv.includes('--partial')
const clips = {
  melee: { fps: 12, loop: false }, charge: { fps: 8, loop: false },
  travel: { fps: 12, loop: true }, impact: { fps: 12, loop: false }, field: { fps: 6, loop: true },
}
const beasts = JSON.parse(await readFile(new URL('public/assets/beasts/roster-v1.json', root)))
let inputs = (await Promise.all(['forest', 'mystic', 'ancient'].map(async group => {
  try { return JSON.parse(await readFile(new URL(`art/beasts/effects-v1/${group}/roster.json`, root))) }
  catch (error) { if (partial && error.code === 'ENOENT') return []; throw error }
}))).flat()
if (partial) inputs = (await Promise.all(inputs.map(async entry => {
  try { await access(new URL(entry.source, root)); return entry } catch { return null }
}))).filter(Boolean)
if (!partial && (inputs.length !== 30 || new Set(inputs.map(e => e.beastId)).size !== 30)) throw new Error('Expected 30 unique VFX sets')
const catalog = [], previews = []
for (const entry of inputs) {
  const beast = beasts.find(beast => beast.id === entry.beastId)
  if (!beast) throw new Error(`Unknown beast: ${entry.beastId}`)
  const source = new URL(entry.source, root).pathname
  const crops = await effectCrops(source)
  const base = `/assets/beasts/effects-v1/${entry.beastId}`
  const output = new URL(`public${base}/`, root)
  await mkdir(output, { recursive: true })
  const animations = {}, frames = []
  for (const [index, [name, settings]] of Object.entries(clips).entries()) {
    const ground = (entry.skillMotion === 'ground' && ['travel', 'field'].includes(name)) || (entry.skillMotion === 'falling' && name === 'field')
    const clipFrames = await packEffectFrames(source, crops.slice(index * 4, index * 4 + 4), ground)
    await sharp({ create: { width: 512, height: 128, channels: 4, background: '#00000000' } })
      .composite(clipFrames.map((input, i) => ({ input, left: i * 128, top: 0 })))
      .png({ compressionLevel: 9 }).toFile(new URL(`${name}.png`, output).pathname)
    animations[name] = { ...settings, frames: [0, 1, 2, 3].map(i => index * 4 + i),
      image: `${base}/${name}.png`, stripFrames: [0, 1, 2, 3], anchor: { x: name === 'travel' && entry.skillMotion === 'beam' ? 8 : 64, y: ground ? 112 : 64 } }
    frames.push(...clipFrames)
  }
  const image = `${base}/sheet.png`
  await sharp({ create: { width: 512, height: 640, channels: 4, background: '#00000000' } })
    .composite(frames.map((input, i) => ({ input, left: i % 4 * 128, top: Math.floor(i / 4) * 128 })))
    .png({ compressionLevel: 9 }).toFile(new URL('sheet.png', output).pathname)
  const manifest = { ...entry, version: 1, beastId: entry.beastId, name: beast.name, skillName: beast.skill.name,
    image, atlas: `${base}/atlas.json`, cellWidth: 128, cellHeight: 128, columns: 4, rows: 5,
    frameCount: 20, facing: 'right', animations, sourceCuts: crops }
  await writeFile(new URL('atlas.json', output), JSON.stringify(manifest, null, 2) + '\n')
  const { sourceCuts: _sourceCuts, ...metadata } = manifest
  catalog.push(metadata); previews.push(frames[9])
  console.log(`${beast.name}: 5 detached VFX clips`)
}
const json = '[\n' + catalog.map(entry => JSON.stringify(entry)).join(',\n') + '\n]\n'
await writeFile(new URL('public/assets/beasts/effects-v1/roster.json', root), json)
await writeFile(new URL('src/game/beastEffectRoster.json', root), json)
await sharp({ create: { width: 768, height: 640, channels: 4, background: '#192b26' } })
  .composite(previews.map((input, i) => ({ input, left: i % 6 * 128, top: Math.floor(i / 6) * 128 })))
  .png().toFile(new URL('art/beasts/effects-v1/preview.png', root).pathname)
