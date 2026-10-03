import { useEffect, useRef, useState } from 'react'
import { createRun, sceneryForChunk, SCENERY_CHUNK, stepRun } from '../game/runner'
import { animationFrame, CHARACTER_ATLAS, selectCharacterAnimation } from '../game/characterAnimations'
import { joystickInput } from '../game/runnerControls'
import PwaControls from './PwaControls'

const SCENERY_ASSETS = {
  background: '/assets/scenery/underworld-bamboo-v1/bamboo-forest-background.webp',
  objects: '/assets/scenery/underworld-bamboo-v1/forest-objects-atlas.webp',
}
const OBJECT_COLUMNS = 4
const OBJECT_ROWS = 2
const ACTION_BUTTON_FRAMES = {
  attack: animationFrame('hello', 0),
  dash: animationFrame('run', 0.11),
  fly: animationFrame('fly', 0),
  jump: animationFrame('jump', 0),
}

function ActionSprite({ action }) {
  const frame = ACTION_BUTTON_FRAMES[action]
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
  const animation = selectCharacterAnimation(s, input)
  const frame = animationFrame(animation, s.action ? s.actionTime : s.time)
  drawCharacter(ctx, sprites.character, frame, s.x - camera + 64, ground - s.y, s.facing)
  for (const b of s.shots) { ctx.fillStyle = '#f6de94'; ctx.fillRect(b.x - camera - 8, ground - b.y, 20, 8) }
}
export default function RunnerDemo() {
  const canvas = useRef(null), run = useRef(createRun()), input = useRef({ move: 0 }), gesture = useRef(null)
  const sprites = useRef({ character: null, background: null, objects: null })
  const joystick = useRef(null)
  const [spriteStatus, setSpriteStatus] = useState('loading')
  const [hits, setHits] = useState(0), [cleared, setCleared] = useState(false)
  const [joystickView, setJoystickView] = useState(null)
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
    sprites.current = { character, background, objects }
    let loadedCount = 0
    const loaded = () => { loadedCount += 1; if (loadedCount === 3) setSpriteStatus('ready') }
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
    let frame, last = 0
    const tick = now => {
      const dt = Math.min((now - (last || now)) / 1000, .035); last = now
      run.current = stepRun(run.current, input.current, dt)
      input.current.jump = false; input.current.dash = false; input.current.flyToggle = false; input.current.action = null
      const c = canvas.current, width = c.clientWidth, height = c.clientHeight
      if (c.width !== width || c.height !== height) { c.width = width; c.height = height }
      const context = c.getContext('2d'); context.imageSmoothingEnabled = false
      draw(context, run.current, width, height, input.current, sprites.current)
      setHits(run.current.hits); setCleared(run.current.targets.every(t => !t.hp))
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
    return () => { for (const image of [character, background, objects]) image.onload = image.onerror = null; cancelAnimationFrame(frame); window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', reset) }
  }, [])
  const hold = (field, value) => ({ onPointerDown: e => { e.currentTarget.setPointerCapture(e.pointerId); input.current[field] = value }, onPointerUp: () => { input.current[field] = field === 'move' ? 0 : false }, onPointerCancel: () => { input.current[field] = field === 'move' ? 0 : false }, onClick: e => { if (e.detail === 0) { input.current[field] = value; if (field !== 'jump') setTimeout(() => { input.current[field] = field === 'move' ? 0 : false }, 180) } } })
  const holdJump = { onPointerDown: e => { e.currentTarget.setPointerCapture(e.pointerId); input.current.jump = true; input.current.up = true }, onPointerUp: () => { input.current.up = false }, onPointerCancel: () => { input.current.up = false }, onClick: e => { if (e.detail === 0) input.current.jump = true } }
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
  return <main className="runner-shell">
    <section className="runner-frame" aria-label="Bản mẫu hành động đi ngang">
      {spriteStatus !== 'ready' && <p className="runner-loading" role="status">{spriteStatus === 'error' ? 'Không tải được hình ảnh sân tập. Hãy tải lại trang để thử lại.' : 'Đang tải hình ảnh sân tập…'}</p>}
      <div className="runner-hud"><span><b>VÔ DANH</b><small>SPRITE 128 × 128</small></span><span className="demo-badge">BẢN MẪU</span><span>{hits} / 12 <small>ĐÒN TRÚNG</small></span></div>
      <canvas ref={canvas} tabIndex={0} aria-label="Sân tập. Mũi tên hoặc A D để đi, giữ Shift để chạy, W để nhảy, F để bay, J hoặc Space để đánh."
        onPointerDown={e => { e.currentTarget.focus(); e.currentTarget.setPointerCapture(e.pointerId); gesture.current = { x: e.clientX, y: e.clientY } }}
        onPointerUp={e => { const g = gesture.current; if (!g) return; const dx = e.clientX - g.x, dy = e.clientY - g.y; if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) { run.current.facing = Math.sign(dx); input.current.dash = true } else if (dy < -30) input.current.jump = true; else input.current.fire = true; gesture.current = null; setTimeout(() => { input.current.fire = false }, 100) }} onPointerCancel={() => { gesture.current = null }} />
      <div className="arena-label">RỪNG TRÚC U MINH <span>Di chuyển · Nhảy · Công kích</span></div>
      <p className="runner-status" role="status">{cleared ? 'Hoàn tất sân tập!' : 'Bia tập chịu ba đòn.'}</p>
      <button className="restart-button" aria-label="Chơi lại sân tập" onClick={() => { run.current = createRun(); input.current = { move: 0 } }}>↻</button>
      <div className="game-pwa"><PwaControls /></div>
      <div className="runner-controls" aria-label="Điều khiển">
        <div className="joystick-zone" role="group" aria-label="Giữ rồi vuốt sang trái hoặc phải để di chuyển. Vuốt xa để chạy." tabIndex={0}
          onPointerDown={startJoystick} onPointerMove={updateJoystick} onPointerUp={stopJoystick} onPointerCancel={stopJoystick}>
          <span className="joystick-hint" aria-hidden="true">GIỮ &amp; VUỐT<small>Di chuyển</small></span>
          {joystickView && <span className="joystick-base" aria-hidden="true" style={{ left: joystickView.x, top: joystickView.y }}><i style={{ transform: `translate(${joystickView.knobX}px, ${joystickView.knobY}px)` }} /></span>}
        </div>
        <div className="combat-pad" role="group" aria-label="Hành động chiến đấu">
          <button className="combat-action combat-action--jump" aria-label="Nhảy" {...holdJump}><ActionSprite action="jump" /><span>Nhảy</span></button>
          <button className="combat-action combat-action--fly" aria-label="Bật hoặc tắt bay" onClick={() => { input.current.flyToggle = true }}><ActionSprite action="fly" /><span>Bay</span></button>
          <button className="combat-action combat-action--dash" aria-label="Lướt" onClick={() => { input.current.dash = true }}><ActionSprite action="dash" /><span>Lướt</span></button>
          <button className="combat-action combat-action--attack" aria-label="Đánh" {...hold('fire', true)}><ActionSprite action="attack" /><span>Đánh</span></button>
        </div>
      </div>
      {portrait && <div className="landscape-gate" role="dialog" aria-modal="true" aria-labelledby="landscape-title">
        <span aria-hidden="true">▭ ↻</span><h1 id="landscape-title">Chơi ở màn hình ngang</h1><p>Chạm để vào toàn màn hình và tự động xoay ngang.</p><button onClick={enterLandscape}>Vào game</button>
      </div>}
    </section>
  </main>
}
