const actions = { idle: 'Đứng', walk: 'Di chuyển', jump: 'Nhảy', attack: 'Đánh thường', skill: 'Thi triển chiêu', hurt: 'Bị thương', collapse: 'Gục ngã' }
const elements = { wood: 'Mộc', fire: 'Hỏa', earth: 'Thổ', metal: 'Kim', water: 'Thủy', shadow: 'Ảnh', wind: 'Phong', lightning: 'Lôi', ice: 'Băng' }
const flyingActions = { idle: 'Lơ lửng', walk: 'Bay', jump: 'Vọt cao / hạ cánh' }
const sizes = { tiny: 'Tí hon', small: 'Nhỏ', medium: 'Vừa', large: 'Lớn', huge: 'Khổng lồ' }
const locomotion = document.querySelector('#locomotion')
const select = document.querySelector('#action'), pause = document.querySelector('#pause')
const replay = document.querySelector('#replay'), status = document.querySelector('#status')
const grid = document.querySelector('#grid'), query = document.querySelector('#query'), element = document.querySelector('#element')
const motion = matchMedia('(prefers-reduced-motion: reduce)')
let paused = motion.matches, elapsed = 0, previous = 0, total = 0
const beasts = []
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase()
for (const [value, label] of Object.entries(actions)) select.add(new Option(label, value))
for (const [value, label] of Object.entries(elements)) element.add(new Option(label, value))
function updateButton() { pause.textContent = paused ? 'Phát chuyển động' : 'Tạm dừng'; pause.setAttribute('aria-pressed', String(paused)) }
updateButton()
pause.addEventListener('click', () => { paused = !paused; updateButton() })
replay.addEventListener('click', () => { elapsed = 0; paused = false; updateButton() })
motion.addEventListener('change', event => { paused = event.matches; updateButton() })
select.addEventListener('change', () => { elapsed = 0 })
function filter() {
  for (const option of select.options) option.textContent = locomotion.value === 'flying' ? flyingActions[option.value] || actions[option.value] : actions[option.value]
  let visible = 0
  for (const { beast, card } of beasts) {
    card.hidden = !(element.value === 'all' || beast.element === element.value) || !(locomotion.value === 'all' || beast.locomotion === locomotion.value) || !normalize(`${beast.name} ${beast.description} ${beast.attack.name} ${beast.skill.name}`).includes(normalize(query.value.trim()))
    if (!card.hidden) visible++
  }
  status.textContent = `Hiển thị ${visible}/${total} yêu thú.${beasts.length < total ? ' Một số ảnh chưa tải được; hãy tải lại trang.' : ''}${visible ? '' : ' Hãy đổi từ khóa hoặc thuộc tính.'}`
}
locomotion.addEventListener('change', filter)
query.addEventListener('input', filter); element.addEventListener('change', filter)
function animate(time) {
  if (!paused && !document.hidden && previous) elapsed += Math.min(time - previous, 100)
  previous = time
  for (const { context, image, beast, card } of beasts) {
    if (card.hidden) continue
    const action = beast.animations[select.value], step = Math.floor(elapsed * action.fps / 1000)
    const frame = action.frames[action.loop ? step % action.frames.length : Math.min(step, action.frames.length - 1)]
    context.clearRect(0, 0, 128, 128)
    context.drawImage(image, frame % 4 * 128, Math.floor(frame / 4) * 128, 128, 128, 0, 0, 128, 128)
  }
  requestAnimationFrame(animate)
}
try {
  const response = await fetch('/assets/beasts/roster-v1.json')
  if (!response.ok) throw new Error('roster')
  const roster = await response.json(); total = roster.length
  const loaded = await Promise.allSettled(roster.map(async beast => {
    const image = new Image(); image.src = beast.image; await image.decode()
    return { beast, image }
  }))
  for (const result of loaded) {
    if (result.status !== 'fulfilled') continue
    const { beast, image } = result.value, card = document.createElement('article')
    const heading = document.createElement('h2'); heading.textContent = `${beast.name} · ${elements[beast.element]}`
    const description = document.createElement('p'); description.textContent = beast.description
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 128
    canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', `Yêu thú ${beast.name}`)
    const context = canvas.getContext('2d'); context.imageSmoothingEnabled = false
    card.append(canvas, heading, description)
    if (beast.locomotion === 'flying') {
      const info = document.createElement('p'); info.textContent = `Biết bay · ${sizes[beast.size]} · Lơ lửng / Bay / Vọt cao`
      card.append(info)
    }
    for (const kind of ['attack', 'skill']) {
      const title = document.createElement('h3'); title.textContent = `${kind === 'attack' ? 'Đánh thường' : 'Chiêu thức'}: ${beast[kind].name}`
      const info = document.createElement('p'); info.textContent = `${beast[kind].description} Báo đòn: ${beast[kind].telegraph} Tầm ${beast[kind].range}px; hồi ${beast[kind].cooldownMs / 1000}s (thiết kế).`
      card.append(title, info)
    }
    for (const [href, label] of [[beast.image, 'Atlas 20 frame'], [beast.atlas, 'Manifest']]) {
      const link = document.createElement('a'); link.href = href; link.textContent = label; card.append(link)
    }
    grid.append(card); beasts.push({ context, image, beast, card })
  }
  if (!beasts.length) throw new Error('images')
  select.disabled = pause.disabled = replay.disabled = false
  filter(); requestAnimationFrame(animate)
} catch { status.textContent = 'Không tải được bộ yêu thú. Kiểm tra kết nối rồi tải lại trang.' }
