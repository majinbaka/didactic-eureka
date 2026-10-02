import { useEffect, useRef, useState } from 'react'
import { createRun, stepRun, WORLD } from '../game/runner'
import { animationFrame, CHARACTER_ATLAS, selectCharacterAnimation } from '../game/characterAnimations'

function drawCharacter(ctx, image, frame, x, y, facing) {
  if (!image?.complete || !image.naturalWidth) return
  const sourceX = (frame % CHARACTER_ATLAS.columns) * CHARACTER_ATLAS.cell
  const sourceY = Math.floor(frame / CHARACTER_ATLAS.columns) * CHARACTER_ATLAS.cell
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.scale(facing, 1)
  ctx.drawImage(image, sourceX, sourceY, 128, 128, -CHARACTER_ATLAS.anchor.x, -CHARACTER_ATLAS.anchor.y, 128, 128)
  ctx.restore()
}

function draw(ctx, s, width, height, input, sprites) {
  const ground = height - 64
  const camera = Math.max(0, Math.min(WORLD - width, s.x - width * .32))
  ctx.fillStyle = '#132c30'; ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = '#21433e'
  for (let i = 0; i < 12; i++) { const x = i * 220 - camera * .25; ctx.fillRect(x, ground - 180, 112, 180); ctx.fillRect(x + 24, ground - 220, 64, 40) }
  ctx.fillStyle = '#a3b995'; ctx.fillRect(width - 100 - camera * .04, 40, 40, 40)
  ctx.fillStyle = '#789263'; ctx.fillRect(0, ground, width, 8)
  ctx.fillStyle = '#354c3a'; ctx.fillRect(0, ground + 8, width, 56)
  ctx.fillStyle = '#192e2b'
  for (let x = -camera % 64; x < width; x += 64) ctx.fillRect(x, ground + 24, 48, 8)
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
      <div className="arena-label">SÂN TẬP <span>Di chuyển · Nhảy · Công kích</span></div>
    </section>
    <section className="runner-controls" aria-label="Điều khiển"><div className="direction-pad"><button aria-label="Đi sang trái" {...hold('move', -1)}>◀</button><button aria-label="Đi sang phải" {...hold('move', 1)}>▶</button><button {...hold('run', true)}>» <span>Chạy</span></button></div><p>CHẠM ĐỂ BẮN<br /><span>Vuốt ngang để lướt · Vuốt lên để nhảy</span></p><div className="combat-pad"><button {...holdJump}>↑ <span>Nhảy</span></button><button onClick={() => { input.current.flyToggle = true }}>☁ <span>Bay</span></button><button className="fire-button" {...hold('fire', true)}>✦ <span>Bắn</span></button></div></section>
    <section className="pose-controls" aria-label="Tư thế nhân vật">
      <button onClick={trigger('hello')}>Xin chào</button><button onClick={trigger('scratch')}>Gãi đầu</button><button onClick={trigger('doze')}>Ngủ gật</button><button onClick={trigger('sit')}>Ngồi</button><button onClick={trigger('crawl')}>Bò</button><button onClick={trigger('hurt')}>Bị thương</button><button onClick={trigger('collapse')}>Gục ngã</button>
    </section>
    <footer className="runner-footer"><p role="status">{cleared ? 'Hoàn tất sân tập! Thử lại để tiếp tục.' : 'Bia tập có 3 điểm chịu đòn. Hãy thử chạy, nhảy và bắn.'}</p><button onClick={() => { run.current = createRun(); input.current = { move: 0 } }}>↻ Thử lại</button></footer>
    <p className="keyboard-hint">BÀN PHÍM: A/D đi · SHIFT chạy · W nhảy · F bay · ↓ hạ · J bắn · H/G/N/S/C/T/X tư thế</p>
  </main>
}
