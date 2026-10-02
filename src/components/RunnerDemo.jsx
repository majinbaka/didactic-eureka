import { useEffect, useRef, useState } from 'react'
import { createRun, sceneryForChunk, SCENERY_CHUNK, stepRun } from '../game/runner'
import { animationFrame, CHARACTER_ATLAS, selectCharacterAnimation } from '../game/characterAnimations'

function drawCharacter(ctx, image, frame, x, y, facing) {
  if (!image?.complete || !image.naturalWidth) return
  const sourceX = (frame % CHARACTER_ATLAS.columns) * CHARACTER_ATLAS.cell
  const sourceY = Math.floor(frame / CHARACTER_ATLAS.columns) * CHARACTER_ATLAS.cell
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.scale(facing, 1)
  ctx.drawImage(image, sourceX, sourceY, 128, 128, -CHARACTER_ATLAS.anchor.x, -CHARACTER_ATLAS.anchor.y, 128, 128)
  ctx.restore()
}

function drawBamboo(ctx, x, base, height, tone, alpha = 1) {
  const trunks = ['#416348', '#4f7450', '#64855a']
  ctx.save(); ctx.globalAlpha = alpha
  ctx.fillStyle = trunks[tone]
  ctx.fillRect(Math.round(x), base - height, 12, height)
  ctx.fillStyle = '#263f35'
  for (let y = base - 28; y > base - height; y -= 42) ctx.fillRect(Math.round(x) - 2, y, 16, 5)
  ctx.fillStyle = tone === 2 ? '#789866' : '#587b55'
  for (let y = base - 55, side = 1; y > base - height + 15; y -= 55, side *= -1) {
    ctx.fillRect(Math.round(x + (side > 0 ? 10 : -38)), y, 40, 8)
    ctx.fillRect(Math.round(x + (side > 0 ? 28 : -42)), y - 8, 20, 8)
  }
  ctx.restore()
}

function drawGroundDetail(ctx, detail, x, ground) {
  ctx.save(); ctx.translate(Math.round(x), ground); ctx.scale(detail.scale, detail.scale)
  if (detail.kind === 'stone') {
    ctx.fillStyle = '#778274'; ctx.fillRect(-12, -11, 24, 11); ctx.fillStyle = '#9aa28b'; ctx.fillRect(-7, -15, 14, 5); ctx.fillStyle = '#435444'; ctx.fillRect(7, -7, 9, 7)
  } else if (detail.kind === 'pebbles') {
    ctx.fillStyle = '#879083'; ctx.fillRect(-13, -6, 8, 5); ctx.fillRect(1, -9, 10, 7); ctx.fillRect(15, -5, 6, 4)
  } else if (detail.kind === 'grass') {
    ctx.fillStyle = '#294735'; ctx.fillRect(-13, -12, 5, 12); ctx.fillRect(-3, -19, 5, 19); ctx.fillRect(7, -14, 5, 14)
  } else {
    ctx.fillStyle = '#6e8b58'; ctx.fillRect(-3, -19, 7, 19); ctx.fillRect(4, -16, 11, 6); ctx.fillRect(-12, -11, 11, 6)
  }
  ctx.restore()
}

function draw(ctx, s, width, height, input, sprites) {
  const ground = height - 64
  const camera = s.x - width * .32
  ctx.fillStyle = '#b8c7a1'; ctx.fillRect(0, 0, width, height)
  const moonCycle = width + 180
  const moonX = ((width * .72 - camera * .025) % moonCycle + moonCycle) % moonCycle - 90
  ctx.fillStyle = '#d8d3a4'; ctx.fillRect(moonX, 38, 44, 44)
  ctx.fillStyle = '#71866d'
  const ridgeOffset = -(((camera * .08) % 260) + 260) % 260
  for (let x = ridgeOffset - 100; x < width + 160; x += 260) {
    ctx.beginPath(); ctx.moveTo(x, ground); ctx.lineTo(x + 100, ground - 150); ctx.lineTo(x + 230, ground); ctx.fill()
  }
  ctx.fillStyle = '#3b614e'; ctx.fillRect(0, ground - 156, width, 156)
  const farStart = Math.floor((camera * .28 - 100) / 150)
  for (let i = farStart; i <= farStart + Math.ceil(width / 150) + 2; i++) drawBamboo(ctx, i * 150 - camera * .28, ground, 185 + Math.abs(i % 3) * 28, Math.abs(i) % 3, .55)
  const startChunk = Math.floor((camera - 100) / SCENERY_CHUNK)
  const endChunk = Math.ceil((camera + width + 100) / SCENERY_CHUNK)
  for (let i = startChunk; i <= endChunk; i++) {
    const chunk = sceneryForChunk(i)
    drawBamboo(ctx, i * SCENERY_CHUNK + chunk.bambooOffset - camera, ground, chunk.bambooHeight, chunk.bambooTone)
  }
  ctx.fillStyle = '#789263'; ctx.fillRect(0, ground, width, 8)
  ctx.fillStyle = '#354c3a'; ctx.fillRect(0, ground + 8, width, 56)
  ctx.fillStyle = '#192e2b'
  for (let x = -camera % 64; x < width; x += 64) ctx.fillRect(x, ground + 24, 48, 8)
  for (let i = startChunk; i <= endChunk; i++) {
    const chunk = sceneryForChunk(i)
    for (const detail of chunk.details) drawGroundDetail(ctx, detail, i * SCENERY_CHUNK + detail.offset - camera, ground + 4)
  }
  for (const t of s.targets) {
    if (!t.hp) continue
    const x = t.x - camera
    ctx.fillStyle = '#574b62'; ctx.fillRect(x + 8, ground - 80, 48, 72)
    ctx.fillStyle = '#a4a0a5'; ctx.fillRect(x, ground - 64, 64, 16)
    ctx.fillStyle = '#edbd72'; ctx.fillRect(x + 20, ground - 56, 8, 8); ctx.fillRect(x + 40, ground - 56, 8, 8)
    ctx.fillStyle = '#dfbc7c'; ctx.fillRect(x + 8, ground - 96, t.hp * 16, 4)
  }
  const animation = selectCharacterAnimation(s, input)
  const frame = animationFrame(animation, s.action ? s.actionTime : s.time)
  drawCharacter(ctx, sprites.character, frame, s.x - camera + 64, ground - s.y, s.facing)
  for (const b of s.shots) { ctx.fillStyle = '#f6de94'; ctx.fillRect(b.x - camera - 8, ground - b.y, 20, 8) }
}
export default function RunnerDemo({ onBack }) {
  const canvas = useRef(null), run = useRef(createRun()), input = useRef({ move: 0 }), gesture = useRef(null)
  const sprites = useRef({ character: null })
  const [spriteStatus, setSpriteStatus] = useState('loading')
  const [hits, setHits] = useState(0), [cleared, setCleared] = useState(false)
  useEffect(() => {
    const character = new Image()
    sprites.current = { character }
    const loaded = () => { if (character.naturalWidth) setSpriteStatus('ready') }
    const failed = () => setSpriteStatus('error')
    character.onload = loaded
    character.onerror = failed
    character.src = CHARACTER_ATLAS.image
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
    return () => { character.onload = character.onerror = null; cancelAnimationFrame(frame); window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', reset) }
  }, [])
  const hold = (field, value) => ({ onPointerDown: e => { e.currentTarget.setPointerCapture(e.pointerId); input.current[field] = value }, onPointerUp: () => { input.current[field] = field === 'move' ? 0 : false }, onPointerCancel: () => { input.current[field] = field === 'move' ? 0 : false }, onClick: e => { if (e.detail === 0) { input.current[field] = value; if (field !== 'jump') setTimeout(() => { input.current[field] = field === 'move' ? 0 : false }, 180) } } })
  const holdJump = { onPointerDown: e => { e.currentTarget.setPointerCapture(e.pointerId); input.current.jump = true; input.current.up = true }, onPointerUp: () => { input.current.up = false }, onPointerCancel: () => { input.current.up = false } }
  const trigger = action => () => { input.current.action = action }
  return <main className="runner-shell">
    <header className="runner-header"><div><p className="eyebrow">PHÒNG THỬ NGHIỆM / 01</p><h1>Tu Tiên <span>Loạn Giới</span></h1></div><button onClick={onBack}>Đạo trường ↗</button></header>
    <section className="runner-frame" aria-label="Bản mẫu hành động đi ngang">
      {spriteStatus !== 'ready' && <p role="status">{spriteStatus === 'error' ? 'Không tải được hình nhân vật. Hãy tải lại trang để thử lại.' : 'Đang tải hình nhân vật…'}</p>}
      <div className="runner-hud"><span><b>VÔ DANH</b><small>SPRITE 128 × 128</small></span><span className="demo-badge">BẢN MẪU</span><span>{hits} / 12 <small>ĐÒN TRÚNG</small></span></div>
      <canvas ref={canvas} tabIndex={0} aria-label="Sân tập. Mũi tên hoặc A D để đi, giữ Shift để chạy, W để nhảy, F để bay, J hoặc Space để bắn."
        onPointerDown={e => { e.currentTarget.focus(); e.currentTarget.setPointerCapture(e.pointerId); gesture.current = { x: e.clientX, y: e.clientY } }}
        onPointerUp={e => { const g = gesture.current; if (!g) return; const dx = e.clientX - g.x, dy = e.clientY - g.y; if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) { run.current.facing = Math.sign(dx); input.current.dash = true } else if (dy < -30) input.current.jump = true; else input.current.fire = true; gesture.current = null; setTimeout(() => { input.current.fire = false }, 100) }} onPointerCancel={() => { gesture.current = null }} />
      <div className="arena-label">RỪNG TRÚC U MINH <span>Đường rừng sinh cảnh liên tục · Di chuyển · Nhảy · Công kích</span></div>
    </section>
    <section className="runner-controls" aria-label="Điều khiển"><div className="direction-pad"><button aria-label="Đi sang trái" {...hold('move', -1)}>◀</button><button aria-label="Đi sang phải" {...hold('move', 1)}>▶</button><button {...hold('run', true)}>» <span>Chạy</span></button></div><p>CHẠM ĐỂ BẮN<br /><span>Vuốt ngang để lướt · Vuốt lên để nhảy</span></p><div className="combat-pad"><button {...holdJump}>↑ <span>Nhảy</span></button><button onClick={() => { input.current.flyToggle = true }}>☁ <span>Bay</span></button><button className="fire-button" {...hold('fire', true)}>✦ <span>Bắn</span></button></div></section>
    <section className="pose-controls" aria-label="Tư thế nhân vật">
      <button onClick={trigger('hello')}>Xin chào</button><button onClick={trigger('scratch')}>Gãi đầu</button><button onClick={trigger('doze')}>Ngủ gật</button><button onClick={trigger('sit')}>Ngồi</button><button onClick={trigger('crawl')}>Bò</button><button onClick={trigger('hurt')}>Bị thương</button><button onClick={trigger('collapse')}>Gục ngã</button>
    </section>
    <footer className="runner-footer"><p role="status">{cleared ? 'Hoàn tất sân tập! Thử lại để tiếp tục.' : 'Bia tập có 3 điểm chịu đòn. Hãy thử chạy, nhảy và bắn.'}</p><button onClick={() => { run.current = createRun(); input.current = { move: 0 } }}>↻ Thử lại</button></footer>
    <p className="keyboard-hint">BÀN PHÍM: A/D đi · SHIFT chạy · W nhảy · F bay · ↓ hạ · J bắn · H/G/N/S/C/T/X tư thế</p>
  </main>
}
