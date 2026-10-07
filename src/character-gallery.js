import { drawCharacter, loadCharacterLocomotion } from './rendering/drawCharacter.js'

const actions = { idle: 'Đứng', walk: 'Đi bộ', run: 'Chạy', jump: 'Nhảy', fly: 'Bay', hello: 'Xin chào', scratch: 'Gãi đầu', doze: 'Ngủ gật', sit: 'Ngồi', crawl: 'Bò', hurt: 'Bị thương', collapse: 'Nằm xuống' }
const select = document.querySelector('#action')
const pause = document.querySelector('#pause')
const status = document.querySelector('#status')
const grid = document.querySelector('#grid')
const motion = matchMedia('(prefers-reduced-motion: reduce)')
let paused = motion.matches
let elapsed = 0
let previous = 0
const characters = []
for (const [value, label] of Object.entries(actions)) select.add(new Option(label, value))
function updateButton() { pause.textContent = paused ? 'Phát chuyển động' : 'Tạm dừng'; pause.setAttribute('aria-pressed', String(paused)) }
updateButton()
pause.addEventListener('click', () => { paused = !paused; updateButton() })
motion.addEventListener('change', event => { paused = event.matches; updateButton() })
select.addEventListener('change', () => { elapsed = 0 })
async function json(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Không tải được ${url}`)
  return response.json()
}
function animate(time) {
  if (!paused && !document.hidden && previous) elapsed += Math.min(time - previous, 100)
  previous = time
  for (const { context, image, atlas } of characters) {
    const action = atlas.animations[select.value]
    const step = Math.floor(elapsed * action.fps / 1000)
    const frame = action.frames[action.loop ? step % action.frames.length : Math.min(step, action.frames.length - 1)]
    context.clearRect(0, 0, 128, 128)
    drawCharacter(context, image, frame, 64, 116, 1, { animation: select.value, elapsed: elapsed / 1000 })
  }
  requestAnimationFrame(animate)
}
try {
  const roster = await json('/assets/characters/roster-all.json')
  const loaded = await Promise.allSettled(roster.map(async character => {
    const atlas = await json(character.atlas)
    const image = new Image()
    image.src = character.image
    await image.decode()
    await loadCharacterLocomotion(image)
    return { character, atlas, image }
  }))
  for (const result of loaded) {
    if (result.status !== 'fulfilled') continue
    const { character, atlas, image } = result.value
    const card = document.createElement('article')
    const heading = document.createElement('h2'); heading.textContent = character.name
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 128
    canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', `Nhân vật ${character.name}`)
    const context = canvas.getContext('2d'); context.imageSmoothingEnabled = false
    const link = document.createElement('a'); link.href = character.image; link.textContent = 'Xem đủ 16 tư thế'
    const movementLink = document.createElement('a'); movementLink.href = character.image.replace(/[^/]+$/, 'locomotion-v1.png'); movementLink.textContent = 'Xem spritesheet đi / chạy'
    card.append(canvas, heading, link, movementLink); grid.append(card)
    characters.push({ context, image, atlas })
  }
  if (!characters.length) throw new Error('Không có ảnh tải thành công')
  select.disabled = pause.disabled = false
  status.textContent = characters.length === roster.length ? `Đã tải ${characters.length} nhân vật.` : `Đã tải ${characters.length}/${roster.length} nhân vật. Một số ảnh chưa tải được; hãy tải lại trang.`
  requestAnimationFrame(animate)
} catch {
  status.textContent = 'Không tải được bộ nhân vật. Kiểm tra kết nối rồi tải lại trang.'
}
