const phases = { melee: 'Vệt đánh gần', charge: 'Tụ lực', travel: 'Chiêu di chuyển', impact: 'Va chạm', field: 'Hiệu ứng lưu lại' }
const motionNames = { linear: 'Đạn bay', ground: 'Sóng trên đất', beam: 'Tia / luồng', orbit: 'Vòng xoay', falling: 'Chiêu rơi' }
const phase = document.querySelector('#phase'), direction = document.querySelector('#direction')
const pause = document.querySelector('#pause'), replay = document.querySelector('#replay')
const status = document.querySelector('#status'), grid = document.querySelector('#grid'), query = document.querySelector('#query')
const motion = matchMedia('(prefers-reduced-motion: reduce)')
let paused = motion.matches, elapsed = 0, previous = 0, total = 0
const effects = []
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase()
for (const [value, label] of Object.entries(phases)) phase.add(new Option(label, value))
phase.value = 'travel'
function button() { pause.textContent = paused ? 'Phát chuyển động' : 'Tạm dừng'; pause.setAttribute('aria-pressed', String(paused)) }
button()
pause.addEventListener('click', () => { paused = !paused; button() })
replay.addEventListener('click', () => { elapsed = 0; paused = false; button() })
phase.addEventListener('change', () => { elapsed = 0 })
direction.addEventListener('change', () => { elapsed = 0 })
motion.addEventListener('change', event => { paused = event.matches; button() })
function filter() {
  let visible = 0
  for (const { entry, card } of effects) {
    card.hidden = !normalize(`${entry.name} ${entry.skillName} ${entry.notes}`).includes(normalize(query.value.trim()))
    if (!card.hidden) visible++
  }
  status.textContent = `Hiển thị ${visible}/${total} bộ hiệu ứng.${effects.length < total ? ' Một số ảnh không tải được; hãy tải lại trang.' : ''}${visible ? '' : ' Hãy đổi từ khóa.'}`
}
query.addEventListener('input', filter)
function animate(time) {
  if (!paused && !document.hidden && previous) elapsed += Math.min(time - previous, 100) / 1000
  previous = time
  for (const { context, image, entry, card } of effects) {
    if (card.hidden) continue
    const clip = entry.animations[phase.value], step = Math.floor(elapsed * clip.fps)
    const frame = clip.frames[clip.loop ? step % clip.frames.length : Math.min(step, clip.frames.length - 1)]
    let x = 128, y = clip.anchor.y === 112 ? 112 : 64
    let width = 128, height = 128
    const progress = (elapsed * Math.max(entry.travelSpeed, 100) / 220) % 1
    if (phase.value === 'travel') {
      switch (entry.skillMotion) {
        case 'linear': x = 64 + progress * 128; break
        case 'ground': x = 64 + progress * 128; y = 112; break
        case 'falling': width = height = 96; y = 40 + progress * 48; break
        case 'orbit': width = height = 96; x += Math.cos(elapsed * 2) * 32; y += Math.sin(elapsed * 2) * 16; break
        case 'beam': x = 16; width = 224; height = 96; break
      }
    }
    // Mirror around the effect anchor; a moving effect never draws a beast pose.
    const facing = Number(direction.value), displayX = facing === 1 ? x : 256 - x
    context.clearRect(0, 0, 256, 128)
    context.save(); context.translate(displayX, y); context.scale(facing, 1)
    context.drawImage(image, frame % 4 * 128, Math.floor(frame / 4) * 128, 128, 128,
      -clip.anchor.x * width / 128, -clip.anchor.y * height / 128, width, height)
    context.restore()
  }
  requestAnimationFrame(animate)
}
try {
  const response = await fetch('/assets/beasts/effects-v1/roster.json')
  if (!response.ok) throw new Error('roster')
  const roster = await response.json(); total = roster.length
  const loaded = await Promise.allSettled(roster.map(async entry => {
    const image = new Image(); image.src = entry.image; await image.decode(); return { entry, image }
  }))
  for (const result of loaded) {
    if (result.status !== 'fulfilled') continue
    const { entry, image } = result.value, card = document.createElement('article')
    const heading = document.createElement('h2'); heading.textContent = entry.name
    const info = document.createElement('p'); info.textContent = `${entry.skillName} · ${motionNames[entry.skillMotion]}`
    const notes = document.createElement('p'); notes.textContent = entry.notes
    const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 128
    canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', `Hiệu ứng độc lập ${entry.name}`)
    const context = canvas.getContext('2d'); context.imageSmoothingEnabled = false
    const links = document.createElement('div'); links.className = 'phase-links'
    for (const [id, clip] of Object.entries(entry.animations)) {
      const link = document.createElement('a'); link.href = clip.image; link.textContent = `${phases[id]} PNG`; links.append(link)
    }
    const manifest = document.createElement('a'); manifest.href = entry.atlas; manifest.textContent = 'Manifest'
    card.append(canvas, heading, info, notes, links, manifest); grid.append(card)
    effects.push({ entry, image, context, card })
  }
  if (!effects.length) throw new Error('images')
  phase.disabled = pause.disabled = replay.disabled = false
  filter(); requestAnimationFrame(animate)
} catch { status.textContent = 'Không tải được hiệu ứng. Kiểm tra kết nối rồi tải lại trang.' }
