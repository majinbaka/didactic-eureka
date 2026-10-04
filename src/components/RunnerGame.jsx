import { useEffect, useRef, useState } from 'react'
import { createRun, sceneryForChunk, SCENERY_CHUNK, stepRun } from '../game/runner'
import { animationFrame, CHARACTER_ATLAS, selectCharacterAnimation } from '../game/characterAnimations'
import { joystickInput } from '../game/runnerControls'
import { breakthroughCosts, cultivationGain, elements, loadLocalSave, qiRequired, realms, saveLocal, transition } from '../game/state'
import { SUMMIT_GATE, mazeRiddle, openingScenes, prologuePhase, resolveMaze } from '../game/prologue'
import { items, itemBlockedReason } from '../game/items'
import PwaControls from './PwaControls'

const SCENERY_ASSETS = {
  background: '/assets/scenery/underworld-bamboo-v1/bamboo-forest-background.webp',
  objects: '/assets/scenery/underworld-bamboo-v1/forest-objects-atlas.webp',
}
const RIVAL_CHARACTERS = {
  female: '/assets/characters/female-v1/character-female-v1-sheet.png',
  'bald-monk': '/assets/characters/bald-monk-v1/character-bald-monk-v1-sheet.png',
  strongman: '/assets/characters/strongman-v1/character-strongman-v1-sheet.png',
  elder: '/assets/characters/elder-v1/character-elder-v1-sheet.png',
}
const OBJECT_COLUMNS = 4
const OBJECT_ROWS = 2
const ACTION_PAGES = [
  [
    { id: 'attack', label: 'Phóng khí', animation: 'hello' },
    { id: 'dash', label: 'Lướt', animation: 'run', elapsed: .1 },
    { id: 'jump', label: 'Nhảy', animation: 'jump' },
    { id: 'fly', label: 'Bay', animation: 'fly' },
    { id: 'hello', label: 'Chào', animation: 'hello' },
    { id: 'scratch', label: 'Gãi đầu', animation: 'scratch' },
    { id: 'doze', label: 'Ngủ gật', animation: 'doze', elapsed: .6 },
    { id: 'sit', label: 'Ngồi', animation: 'sit' },
  ],
  [
    { id: 'attack', label: 'Phóng khí', animation: 'hello' },
    { id: 'dash', label: 'Lướt', animation: 'run', elapsed: .1 },
    { id: 'jump', label: 'Nhảy', animation: 'jump' },
    { id: 'fly', label: 'Bay', animation: 'fly' },
    { id: 'crawl', label: 'Bò', animation: 'crawl' },
    { id: 'hurt', label: 'Bị thương', animation: 'hurt' },
    { id: 'collapse', label: 'Gục ngã', animation: 'collapse', elapsed: .5 },
    { id: 'hello', label: 'Chào', animation: 'hello', elapsed: .3 },
  ],
]

const ATTRIBUTE_LABELS = { canCot: ['Căn cốt', '+10 máu'], ngoTinh: ['Ngộ tính', '+ tu luyện'], thanPhap: ['Thân pháp', '+ chiến đấu'] }

function ProgressPanel({ mode, progress, notice, onAction, onClose }) {
  const cost = breakthroughCosts[progress.realm]
  return <section className="cultivation-panel" aria-label={mode === 'items' ? 'Hành trang' : mode === 'roots' ? 'Linh căn và tu luyện' : 'Hồ sơ và thuộc tính'}>
    <header><strong>{mode === 'items' ? 'HÀNH TRANG' : mode === 'roots' ? 'LINH CĂN NGŨ HÀNH' : 'THUỘC TÍNH'}</strong><button onClick={onClose} aria-label="Đóng bảng">×</button></header>
    {mode === 'items' ? <div className="inventory-list">{items.map(item => {
      const blocked = itemBlockedReason(progress, item.id)
      const buyBlocked = itemBlockedReason(progress, item.id, true)
      return <article key={item.id}>
        <strong>{item.name}</strong><small>{item.kind} · {item.id === 'jade' ? (progress.inventory.jadeActive ? 'Đang hiệu lực' : progress.inventory.jade ? 'Chưa kích hoạt' : 'Chưa sở hữu') : `${progress.inventory[item.id]} ${item.id === 'pill' ? 'viên' : '/ 5 lượt'}`}</small>
        <p>{item.description}</p>
        <div className="panel-actions"><button disabled={!!blocked} onClick={() => onAction({ type: 'use-item', id: item.id })} aria-label={`Dùng ${item.name}`}>{item.id === 'jade' ? 'Kích hoạt' : 'Dùng'}<small>{blocked || 'Sẵn sàng'}</small></button><button disabled={!!buyBlocked} onClick={() => onAction({ type: 'buy-item', id: item.id })} aria-label={`Mua ${item.name}`}>Mua · {item.price} ◆<small>{buyBlocked || (item.id === 'gourd' ? 'Bình mới: 5 lượt' : 'Thêm 1 vật phẩm')}</small></button></div>
      </article>
    })}</div> : mode === 'stats' ? <>
      <p className="panel-points">Điểm tự do <b>{progress.attributePoints}</b></p>
      {Object.entries(ATTRIBUTE_LABELS).map(([id, [name, detail]]) => <div className="hud-attribute" key={id}><span><b>{name} · {progress.attributes[id]}</b><small>{detail}</small></span><button disabled={!progress.attributePoints} onClick={() => onAction({ type: 'increase-attribute', attribute: id })} aria-label={`Cộng ${name}`}>＋</button></div>)}
      <button className="explore-action" onClick={() => onAction('explore')}>Lịch luyện <small>+8 ◆ · +1 dược</small></button>
    </> : <>
      <p className="root-summary">{progress.spiritRoots.length} linh căn · thời gian tu luyện ×{progress.spiritRoots.length}</p>
      <div className="hud-elements">{elements.map(element => { const owned = progress.spiritRoots.includes(element.id); return <span className={`${owned ? 'owned ' : ''}element-${element.id}`} key={element.id}><b>{element.mark}</b><small>{owned ? `${element.name} ${progress.elementCultivation[element.id]}` : element.name}</small></span> })}</div>
      <div className="panel-actions"><button onClick={() => onAction('cultivate')}>Nhập định <small>+{cultivationGain(progress)} linh khí/hành</small></button><button disabled={!cost || progress.qi < qiRequired(progress.realm) || progress.stones < cost.stones || progress.herbs < cost.herbs} onClick={() => onAction('breakthrough')}>Đột phá <small>{cost ? `${Math.round(cost.chance * 100)}% · ◆${cost.stones} · dược ${cost.herbs}` : 'Đã viên mãn'}</small></button></div>
    </>}
    <p className="panel-notice" role="status">{notice}</p>
  </section>
}

function ActionSprite({ animation, elapsed = 0 }) {
  const frame = animationFrame(animation, elapsed)
  const column = frame % CHARACTER_ATLAS.columns
  const row = Math.floor(frame / CHARACTER_ATLAS.columns)
  return <b
    className="action-sprite"
    aria-hidden="true"
    style={{ backgroundImage: `url(${CHARACTER_ATLAS.image})`, backgroundPosition: `${column * 100 / (CHARACTER_ATLAS.columns - 1)}% ${row * 100 / (CHARACTER_ATLAS.columns - 1)}%` }}
  />
}

function drawCharacter(ctx, image, frame, x, y, facing) {
  if (!image?.complete || !image.naturalWidth) return
  const sourceX = (frame % CHARACTER_ATLAS.columns) * CHARACTER_ATLAS.cell
  const sourceY = Math.floor(frame / CHARACTER_ATLAS.columns) * CHARACTER_ATLAS.cell
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.scale(facing, 1)
  ctx.drawImage(image, sourceX, sourceY, 128, 128, -CHARACTER_ATLAS.anchor.x, -CHARACTER_ATLAS.anchor.y, 128, 128)
  ctx.restore()
}

function drawObject(ctx, image, index, x, base, width, height, alpha = 1) {
  if (!image?.complete || !image.naturalWidth) return
  const cellWidth = image.naturalWidth / OBJECT_COLUMNS
  const cellHeight = image.naturalHeight / OBJECT_ROWS
  const sourceX = (index % OBJECT_COLUMNS) * cellWidth
  const sourceY = Math.floor(index / OBJECT_COLUMNS) * cellHeight
  ctx.save(); ctx.globalAlpha = alpha
  ctx.drawImage(image, sourceX, sourceY, cellWidth, cellHeight, Math.round(x - width / 2), Math.round(base - height), width, height)
  ctx.restore()
}

function drawGroundDetail(ctx, image, detail, x, ground) {
  const objects = {
    stone: { index: 4, width: 68, height: 68 },
    pebbles: { index: 5, width: 62, height: 48 },
    grass: { index: 3, width: 58, height: 58 },
    'bamboo-shoot': { index: 2, width: 52, height: 68 },
  }
  const object = objects[detail.kind]
  drawObject(ctx, image, object.index, x, ground + 4, object.width * detail.scale, object.height * detail.scale)
}

function drawBackground(ctx, image, width, height, camera) {
  if (!image?.complete || !image.naturalWidth) {
    ctx.fillStyle = '#6f8b76'; ctx.fillRect(0, 0, width, height)
    return
  }
  const scale = height / image.naturalHeight
  const tileWidth = image.naturalWidth * scale
  const offset = -(((camera * .055) % tileWidth) + tileWidth) % tileWidth
  for (let x = offset - tileWidth; x < width + tileWidth; x += tileWidth) {
    ctx.drawImage(image, Math.round(x), 0, Math.ceil(tileWidth), height)
  }
}

function draw(ctx, s, width, height, input, sprites) {
  const ground = height - 64
  const camera = s.x - width * .32
  drawBackground(ctx, sprites.background, width, height, camera)
  const farStart = Math.floor((camera * .28 - 100) / 150)
  for (let i = farStart; i <= farStart + Math.ceil(width / 150) + 2; i++) {
    const height = 205 + Math.abs(i % 3) * 24
    drawObject(ctx, sprites.objects, Math.abs(i) % 2, i * 150 - camera * .28, ground + 5, height * .48, height, .46)
  }
  const startChunk = Math.floor((camera - 100) / SCENERY_CHUNK)
  const endChunk = Math.ceil((camera + width + 100) / SCENERY_CHUNK)
  for (let i = startChunk; i <= endChunk; i++) {
    const chunk = sceneryForChunk(i)
    drawObject(ctx, sprites.objects, chunk.bambooTone % 2, i * SCENERY_CHUNK + chunk.bambooOffset - camera, ground + 5, chunk.bambooHeight * .5, chunk.bambooHeight)
  }
  const groundGradient = ctx.createLinearGradient(0, ground, 0, height)
  groundGradient.addColorStop(0, '#647648e8'); groundGradient.addColorStop(.18, '#344632f2'); groundGradient.addColorStop(1, '#172923')
  ctx.fillStyle = groundGradient; ctx.fillRect(0, ground, width, height - ground)
  ctx.fillStyle = '#98a66b'; ctx.fillRect(0, ground, width, 4)
  for (let i = startChunk; i <= endChunk; i++) {
    const chunk = sceneryForChunk(i)
    for (const detail of chunk.details) drawGroundDetail(ctx, sprites.objects, detail, i * SCENERY_CHUNK + detail.offset - camera, ground + 4)
  }
  for (const t of s.targets) {
    if (!t.hp) continue
    const x = t.x - camera
    drawObject(ctx, sprites.objects, t.hp === 3 ? 6 : 7, x + 32, ground + 5, 92, 116)
    ctx.fillStyle = '#dfbc7c'; ctx.fillRect(x + 8, ground - 96, t.hp * 16, 4)
  }
  const rivalFrame = animationFrame('run', s.time)
  for (const racer of [...s.racers].sort((a, b) => a.lane - b.lane)) {
    const x = racer.x - camera + 64
    if (x < -128 || x > width + 128) continue
    drawCharacter(ctx, sprites.rivals[racer.id], rivalFrame, x, ground + racer.lane, 1)
    ctx.font = '10px system-ui'; ctx.textAlign = 'center'
    ctx.fillStyle = '#10241edb'; ctx.fillRect(Math.round(x - 31), ground + racer.lane - 119, 62, 15)
    ctx.fillStyle = '#f1ead4'; ctx.fillText(racer.name, Math.round(x), ground + racer.lane - 108)
  }
  const animation = selectCharacterAnimation(s, input)
  const frame = animationFrame(animation, s.action ? s.actionTime : s.time)
  drawCharacter(ctx, sprites.character, frame, s.x - camera + 64, ground - s.y, s.facing)
  for (const b of s.shots) { ctx.fillStyle = '#f6de94'; ctx.fillRect(b.x - camera - 8, ground - b.y, 20, 8) }
}
export default function RunnerGame() {
  const canvas = useRef(null), run = useRef(createRun()), input = useRef({ move: 0 }), gesture = useRef(null)
  const sprites = useRef({ character: null, background: null, objects: null, rivals: {} })
  const joystick = useRef(null)
  const [spriteStatus, setSpriteStatus] = useState('loading')
  const [hits, setHits] = useState(0)
  const [storyIndex, setStoryIndex] = useState(0)
  const [storyStarted, setStoryStarted] = useState(false)
  const [mazeSolved, setMazeSolved] = useState(false)
  const [mazeMessage, setMazeMessage] = useState('')
  const [dreaming, setDreaming] = useState(false)
  const [phase, setPhase] = useState('forest')
  const [playerX, setPlayerX] = useState(100)
  const [joystickView, setJoystickView] = useState(null)
  const [actionPage, setActionPage] = useState(0)
  const [progress, setProgress] = useState(loadLocalSave)
  const [panel, setPanel] = useState(null)
  const [notice, setNotice] = useState('Bấm vào HUD để mở tu luyện và cộng chỉ số.')
  const [portrait, setPortrait] = useState(() => window.matchMedia('(orientation: portrait)').matches)
  const enterLandscape = async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.()
      await screen.orientation?.lock?.('landscape')
    } catch {
      // Browser mobile có thể không hỗ trợ khóa hướng; lớp portrait vẫn hướng dẫn xoay máy.
    }
    setPortrait(window.matchMedia('(orientation: portrait)').matches)
  }
  useEffect(() => {
    const orientation = window.matchMedia('(orientation: portrait)')
    const updateOrientation = () => setPortrait(orientation.matches)
    orientation.addEventListener('change', updateOrientation)
    screen.orientation?.lock?.('landscape').catch(() => {})
    return () => orientation.removeEventListener('change', updateOrientation)
  }, [])
  useEffect(() => {
    const character = new Image(), background = new Image(), objects = new Image()
    const rivals = Object.fromEntries(Object.keys(RIVAL_CHARACTERS).map(id => [id, new Image()]))
    sprites.current = { character, background, objects, rivals }
    let loadedCount = 0
    const assetCount = 3 + Object.keys(rivals).length
    const loaded = () => { loadedCount += 1; if (loadedCount === assetCount) setSpriteStatus('ready') }
    const failed = () => setSpriteStatus('error')
    character.onload = loaded
    character.onerror = failed
    character.src = CHARACTER_ATLAS.image
    background.onload = loaded
    background.onerror = failed
    background.src = SCENERY_ASSETS.background
    objects.onload = loaded
    objects.onerror = failed
    objects.src = SCENERY_ASSETS.objects
    for (const [id, image] of Object.entries(rivals)) {
      image.onload = loaded
      image.onerror = failed
      image.src = RIVAL_CHARACTERS[id]
    }
    let frame, last = 0
    const tick = now => {
      const dt = Math.min((now - (last || now)) / 1000, .035); last = now
      const frozen = !storyStarted || dreaming || prologuePhase(run.current.x, mazeSolved) === 'maze' || prologuePhase(run.current.x, mazeSolved) === 'complete'
      run.current = frozen ? run.current : stepRun(run.current, input.current, dt)
      input.current.jump = false; input.current.dash = false; input.current.flyToggle = false; input.current.action = null
      const c = canvas.current, width = c.clientWidth, height = c.clientHeight
      if (c.width !== width || c.height !== height) { c.width = width; c.height = height }
      const context = c.getContext('2d'); context.imageSmoothingEnabled = false
      draw(context, run.current, width, height, input.current, sprites.current)
      setHits(run.current.hits); setPlayerX(run.current.x); setPhase(prologuePhase(run.current.x, mazeSolved))
      frame = requestAnimationFrame(tick)
    }
    const key = (e, down) => {
      if (e.target instanceof HTMLButtonElement) return
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'a', 'd', 'w', 'j', 'k', 'f', 'h', 'g', 'n', 's', 'c', 't', 'x', 'Shift'].includes(e.key)) e.preventDefault()
      if (['ArrowLeft', 'a'].includes(e.key)) input.current.move = down ? -1 : input.current.move === -1 ? 0 : input.current.move
      if (['ArrowRight', 'd'].includes(e.key)) input.current.move = down ? 1 : input.current.move === 1 ? 0 : input.current.move
      if (['ArrowUp', 'w', 'k'].includes(e.key)) { input.current.up = down; if (down && !e.repeat) input.current.jump = true }
      if (e.key === 'ArrowDown') input.current.down = down
      if (e.key === 'Shift') input.current.run = down
      if ([' ', 'j'].includes(e.key)) input.current.fire = down
      if (down && !e.repeat && e.key === 'f') input.current.flyToggle = true
      const actions = { h: 'hello', g: 'scratch', n: 'doze', s: 'sit', c: 'crawl', t: 'hurt', x: 'collapse' }
      if (down && !e.repeat && actions[e.key]) input.current.action = actions[e.key]
    }
    const down = e => key(e, true), up = e => key(e, false), reset = () => { input.current = { move: 0 } }
    window.addEventListener('keydown', down); window.addEventListener('keyup', up); window.addEventListener('blur', reset)
    frame = requestAnimationFrame(tick)
    return () => { for (const image of [character, background, objects, ...Object.values(rivals)]) image.onload = image.onerror = null; cancelAnimationFrame(frame); window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', reset) }
  }, [dreaming, mazeSolved, storyStarted])
  const updateJoystick = e => {
    const active = joystick.current
    if (!active || active.pointerId !== e.pointerId) return
    const mapped = joystickInput(e.clientX - active.clientX, e.clientY - active.clientY)
    input.current.move = mapped.move
    input.current.run = mapped.run
    setJoystickView({ x: active.x, y: active.y, knobX: mapped.knobX, knobY: mapped.knobY })
  }
  const startJoystick = e => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.setPointerCapture(e.pointerId)
    joystick.current = { pointerId: e.pointerId, clientX: e.clientX, clientY: e.clientY, x: e.clientX - rect.left, y: e.clientY - rect.top }
    setJoystickView({ x: e.clientX - rect.left, y: e.clientY - rect.top, knobX: 0, knobY: 0 })
  }
  const stopJoystick = e => {
    if (joystick.current?.pointerId !== e.pointerId) return
    joystick.current = null
    input.current.move = 0
    input.current.run = false
    setJoystickView(null)
  }
  const triggerAction = action => {
    if (action === 'attack') {
      input.current.fire = true
      setTimeout(() => { input.current.fire = false }, 180)
    } else if (action === 'dash') input.current.dash = true
    else if (action === 'jump') input.current.jump = true
    else if (action === 'fly') input.current.flyToggle = true
    else input.current.action = action
  }
  const progressAction = action => {
    const next = transition(progress, action)
    if (next === progress) { setNotice(action?.type === 'use-item' || action?.type === 'buy-item' ? itemBlockedReason(progress, action.id, action.type === 'buy-item') : action === 'breakthrough' ? 'Chưa đủ linh khí hoặc vật phẩm.' : 'Chưa có điểm thuộc tính.'); return }
    setProgress(next)
    if (!saveLocal(next)) { setNotice('Không lưu được trên thiết bị. Tiến độ chỉ còn trong phiên này.'); return }
    if (action === 'cultivate') setNotice(`Mọi linh căn sở hữu +${cultivationGain(progress)} tu vi.`)
    else if (action === 'explore') setNotice('Lịch luyện nhận 8 linh thạch và 1 linh dược.')
    else if (action === 'breakthrough') setNotice(next.realm > progress.realm ? 'Đột phá thành công! Nhận 2 điểm thuộc tính.' : `Đột phá thất bại${progress.realm ? ', tụt một cảnh giới' : ''}.`)
    else if (action?.type === 'use-item' || action?.type === 'buy-item') setNotice(`${action.type === 'buy-item' ? 'Đã mua' : 'Đã dùng'} ${items.find(item => item.id === action.id).name}.`)
    else setNotice('Đã cộng một điểm thuộc tính.')
  }
  const requiredQi = qiRequired(progress.realm)
  const story = openingScenes[storyIndex]
  const advanceStory = () => {
    if (storyIndex < openingScenes.length - 1) setStoryIndex(index => index + 1)
    else setStoryStarted(true)
  }
  const chooseMaze = choice => {
    const result = resolveMaze(choice)
    setMazeMessage(result.message)
    if (result.solved) setMazeSolved(true)
    else setDreaming(true)
  }
  const retryDream = () => {
    run.current = createRun(); input.current = { move: 0 }
    setDreaming(false); setMazeSolved(false); setMazeMessage(''); setPhase('forest'); setPlayerX(100)
  }
  const restartChapter = () => {
    run.current = createRun(); input.current = { move: 0 }
    setStoryIndex(0); setStoryStarted(false); setMazeSolved(false); setMazeMessage(''); setDreaming(false); setPhase('forest'); setPlayerX(100)
  }
  return <main className="runner-shell">
    <section className="runner-frame" aria-label="Trúc Linh Phong, chương mở đầu Tu Tiên Loạn Giới">
      {spriteStatus !== 'ready' && <p className="runner-loading" role="status">{spriteStatus === 'error' ? 'Không tải được cảnh Rừng Trúc. Hãy tải lại trang để thử lại.' : 'Đang tải Rừng Trúc U Tinh…'}</p>}
      <div className="runner-hud cultivation-hud">
        <button className="hud-avatar" onClick={() => setPanel(panel === 'stats' ? null : 'stats')} aria-label="Mở hồ sơ và cộng chỉ số"><img src="/assets/ui/character-portrait.png" alt="" /><span><b>VÔ DANH</b><small>{realms[progress.realm]}</small></span></button>
        <div className="hud-vitals"><button onClick={() => setPanel(panel === 'stats' ? null : 'stats')}><span>♥ {progress.hp}/{progress.maxHp}</span><i><b style={{ width: `${progress.hp / progress.maxHp * 100}%` }} /></i><small>MÁU · CHỈ SỐ</small></button><button onClick={() => setPanel(panel === 'stats' ? null : 'stats')}><span>◆ {progress.stones}</span><small>LINH THẠCH</small></button><button onClick={() => setPanel(panel === 'roots' ? null : 'roots')}><span>✦ {progress.qi}/{requiredQi}</span><i><b style={{ width: `${progress.qi / requiredQi * 100}%` }} /></i><small>LINH KHÍ · TU LUYỆN</small></button></div>
      </div>
      <button className="inventory-toggle" aria-expanded={panel === 'items'} onClick={() => { setNotice(''); setPanel(panel === 'items' ? null : 'items') }}>Hành trang</button>
      {panel && <ProgressPanel mode={panel} progress={progress} notice={notice} onAction={progressAction} onClose={() => setPanel(null)} />}
      <canvas ref={canvas} tabIndex={0} aria-label="Rừng Trúc U Tinh. Mũi tên hoặc A D để đi, giữ Shift để chạy, W để nhảy, F để bay, J hoặc Space để phóng khí."
        onPointerDown={e => { e.currentTarget.focus(); e.currentTarget.setPointerCapture(e.pointerId); gesture.current = { x: e.clientX, y: e.clientY } }}
        onPointerUp={e => { const g = gesture.current; if (!g) return; const dx = e.clientX - g.x, dy = e.clientY - g.y; if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) { run.current.facing = Math.sign(dx); input.current.dash = true } else if (dy < -30) input.current.jump = true; else input.current.fire = true; gesture.current = null; setTimeout(() => { input.current.fire = false }, 100) }} onPointerCancel={() => { gesture.current = null }} />
      <div className="arena-label">TRÚC LINH PHONG <span>{phase === 'summit' ? 'Vân Tích Bộ · Bứt phá lên đỉnh' : 'Rừng Trúc U Tinh · Thử thách nhập môn'}</span></div>
      {storyStarted && phase !== 'complete' && <div className="chapter-progress" aria-label="Tiến độ chương"><i style={{ width: `${Math.min(100, Math.max(0, (playerX - 100) / (SUMMIT_GATE - 100) * 100))}%` }} /></div>}
      <p className="runner-status" role="status">{phase === 'forest' ? `${hits} đòn trúng · Vượt Trúc Diệp Cương Phong` : phase === 'summit' ? 'Uy áp Linh Phong · Tiến lên viên gạch cuối cùng!' : ''}</p>
      <button className="restart-button" aria-label="Chơi lại chương mở đầu" onClick={restartChapter}>↻</button>
      <div className="game-pwa"><PwaControls /></div>
      <div className="runner-controls" aria-label="Điều khiển">
        <div className="joystick-zone" role="group" aria-label="Giữ rồi vuốt sang trái hoặc phải để di chuyển. Vuốt xa để chạy." tabIndex={0}
          onPointerDown={startJoystick} onPointerMove={updateJoystick} onPointerUp={stopJoystick} onPointerCancel={stopJoystick}>
          <span className="joystick-hint" aria-hidden="true">GIỮ &amp; VUỐT<small>Di chuyển</small></span>
          {joystickView && <span className="joystick-base" aria-hidden="true" style={{ left: joystickView.x, top: joystickView.y }}><i style={{ transform: `translate(${joystickView.knobX}px, ${joystickView.knobY}px)` }} /></span>}
        </div>
        <div className="combat-pad" role="group" aria-label={`Hành động, trang ${actionPage + 1} / ${ACTION_PAGES.length}`}>
          {ACTION_PAGES[actionPage].map((action, index) => <button
            key={action.id}
            className={`combat-action combat-action--${action.id}${index >= 4 ? ' combat-action--utility' : ''}`}
            aria-label={action.id === 'fly' ? 'Bật hoặc tắt bay' : action.label}
            onClick={() => triggerAction(action.id)}
          ><ActionSprite animation={action.animation} elapsed={action.elapsed} /><span>{action.label}</span></button>)}
          <button className="combat-action combat-action--more" aria-label={`Mở trang động tác ${actionPage === 0 ? 2 : 1}`} aria-pressed={actionPage === 1} onClick={() => setActionPage(page => (page + 1) % ACTION_PAGES.length)}>
            <b aria-hidden="true">{actionPage + 1}/{ACTION_PAGES.length}</b><span>Đổi</span>
          </button>
        </div>
      </div>
      {!storyStarted && <section className="story-dialogue" role="dialog" aria-modal="true" aria-labelledby="story-title">
        <p className="story-kicker">{story.speaker}</p><h1 id="story-title">{story.title}</h1><p className="story-text">{story.text}</p>
        <footer><span>{storyIndex + 1} / {openingScenes.length}</span><button onClick={advanceStory}>{storyIndex === openingScenes.length - 1 ? 'Khai cuộc' : 'Tiếp tục'}</button></footer>
      </section>}
      {storyStarted && phase === 'maze' && !dreaming && <section className="story-dialogue maze-dialogue" role="dialog" aria-modal="true" aria-labelledby="maze-title">
        <p className="story-kicker">{mazeRiddle.speaker}</p><h1 id="maze-title">{mazeRiddle.title}</h1><p className="story-text">{mazeRiddle.text}</p>
        <div className="maze-choices">{mazeRiddle.choices.map(choice => <button key={choice.id} onClick={() => chooseMaze(choice.id)}><b>{choice.label}</b><small>{choice.hint}</small></button>)}</div>
        {mazeMessage && <p className="maze-message" role="status">{mazeMessage}</p>}
      </section>}
      {dreaming && <section className="story-dialogue dream-dialogue" role="dialog" aria-modal="true" aria-labelledby="dream-title">
        <p className="story-kicker">Vô Danh · Tỉnh mộng</p><h1 id="dream-title">Hóa ra chỉ là một giấc mơ…</h1><p className="story-text">Vô Danh choàng tỉnh giữa tiếng pháo hiệu. Rừng trúc, bia đá và Tử môn vừa rồi tan như sương sớm. Cuộc đua thật sự mới bắt đầu — lần này phải nhìn kỹ bóng nắng và chạy lại!</p>
        <footer><span>Không mất tiến độ tu luyện</span><button onClick={retryDream}>Chạy lại từ đầu</button></footer>
      </section>}
      {phase === 'complete' && <section className="story-dialogue ending-dialogue" role="dialog" aria-modal="true" aria-labelledby="ending-title">
        <p className="story-kicker">Trưởng lão Thái Huyền Tông</p><h1 id="ending-title">Trận pháp khép lại!</h1><p className="story-text">“Khóa năm vị trí đầu tiên!” Cột sáng vàng giội xuống bao bọc năm người thắng cuộc. Ta làm được rồi... con đường tu tiên của ta chính thức bắt đầu từ đây!</p>
        <footer><span>Đã bái nhập Tiên môn</span><button onClick={restartChapter}>Chơi lại chương</button></footer>
      </section>}
      {portrait && <div className="landscape-gate" role="dialog" aria-modal="true" aria-labelledby="landscape-title">
        <span aria-hidden="true">▭ ↻</span><h1 id="landscape-title">Chơi ở màn hình ngang</h1><p>Chạm để vào toàn màn hình và tự động xoay ngang.</p><button onClick={enterLandscape}>Vào game</button>
      </div>}
    </section>
  </main>
}
