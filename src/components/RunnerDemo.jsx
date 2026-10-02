import { useEffect, useRef, useState } from 'react'
import { createRun, stepRun, WORLD } from '../game/runner'

function draw(ctx, s, width, height, moving) {
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
  ctx.save(); ctx.translate(Math.round(s.x - camera + 64), Math.round(ground - s.y)); ctx.scale(s.facing * 4, 4)
  const rect = (color, x, y, w, h) => { ctx.fillStyle = color; ctx.fillRect(x, y, w, h) }
  const stride = moving && s.y === 0 ? Math.sin(s.time * 16) * 3 : 0
  rect('#0c2026', -10, -29, 18, 10); rect('#80b9a7', -9, -28, 16, 7)
  rect('#d9c89f', -5, -23, 13, 6); rect('#152d32', 4, -22, 2, 2)
  rect('#3d817c', -8, -17, 16, 12); rect('#9bc9ac', -5, -17, 10, 5)
  rect('#ded29c', -8, -8, 16, 3); rect('#3d817c', 7, -16, 8, 6)
  rect('#b8d7b1', 13, -16, 3, 6); rect('#25575a', -12, -16, 5, 10)
  rect('#21494c', -7 + stride, -5, 6, 5); rect('#21494c', 2 - stride, -5, 6, 5)
  rect('#a2bba1', -9 + stride, -2, 9, 2); rect('#a2bba1', 2 - stride, -2, 10, 2)
  ctx.restore()
  for (const b of s.shots) { ctx.fillStyle = '#f6de94'; ctx.fillRect(b.x - camera - 8, ground - b.y, 20, 8) }
}
export default function RunnerDemo({ onBack }) {
  const canvas = useRef(null), run = useRef(createRun()), input = useRef({ move: 0 }), gesture = useRef(null)
  const [hits, setHits] = useState(0), [cleared, setCleared] = useState(false)
  useEffect(() => {
    let frame, last = 0
    const tick = now => {
      const dt = Math.min((now - (last || now)) / 1000, .035); last = now
      run.current = stepRun(run.current, input.current, dt)
      input.current.jump = false; input.current.dash = false
      const c = canvas.current, width = c.clientWidth, height = c.clientHeight
      if (c.width !== width || c.height !== height) { c.width = width; c.height = height }
      draw(c.getContext('2d'), run.current, width, height, input.current.move)
      setHits(run.current.hits); setCleared(run.current.targets.every(t => !t.hp))
      frame = requestAnimationFrame(tick)
    }
    const key = (e, down) => {
      if (e.target instanceof HTMLButtonElement) return
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', ' ', 'a', 'd', 'w', 'j', 'k'].includes(e.key)) e.preventDefault()
      if (['ArrowLeft', 'a'].includes(e.key)) input.current.move = down ? -1 : input.current.move === -1 ? 0 : input.current.move
      if (['ArrowRight', 'd'].includes(e.key)) input.current.move = down ? 1 : input.current.move === 1 ? 0 : input.current.move
      if (['ArrowUp', 'w', 'k'].includes(e.key) && down && !e.repeat) input.current.jump = true
      if ([' ', 'j'].includes(e.key)) input.current.fire = down
    }
    const down = e => key(e, true), up = e => key(e, false), reset = () => { input.current = { move: 0 } }
    window.addEventListener('keydown', down); window.addEventListener('keyup', up); window.addEventListener('blur', reset)
    frame = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', reset) }
  }, [])
  const hold = (field, value) => ({ onPointerDown: e => { e.currentTarget.setPointerCapture(e.pointerId); input.current[field] = value }, onPointerUp: () => { input.current[field] = field === 'move' ? 0 : false }, onPointerCancel: () => { input.current[field] = field === 'move' ? 0 : false }, onClick: e => { if (e.detail === 0) { input.current[field] = value; if (field !== 'jump') setTimeout(() => { input.current[field] = field === 'move' ? 0 : false }, 180) } } })
  return <main className="runner-shell">
    <header className="runner-header"><div><p className="eyebrow">PHÒNG THỬ NGHIỆM / 01</p><h1>Tu Tiên <span>Loạn Giới</span></h1></div><button onClick={onBack}>Đạo trường ↗</button></header>
    <section className="runner-frame" aria-label="Bản mẫu hành động đi ngang">
      <div className="runner-hud"><span><b>VÔ DANH</b><small>SPRITE 128 × 128</small></span><span className="demo-badge">BẢN MẪU</span><span>{hits} / 12 <small>ĐÒN TRÚNG</small></span></div>
      <canvas ref={canvas} tabIndex={0} aria-label="Sân tập. Mũi tên hoặc A D để chạy, W để nhảy, J hoặc Space để bắn."
        onPointerDown={e => { e.currentTarget.focus(); e.currentTarget.setPointerCapture(e.pointerId); gesture.current = { x: e.clientX, y: e.clientY } }}
        onPointerUp={e => { const g = gesture.current; if (!g) return; const dx = e.clientX - g.x, dy = e.clientY - g.y; if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) { run.current.facing = Math.sign(dx); input.current.dash = true } else if (dy < -30) input.current.jump = true; else input.current.fire = true; gesture.current = null; setTimeout(() => { input.current.fire = false }, 100) }} onPointerCancel={() => { gesture.current = null }} />
      <div className="arena-label">SÂN TẬP <span>Di chuyển · Nhảy · Công kích</span></div>
    </section>
    <section className="runner-controls" aria-label="Điều khiển"><div className="direction-pad"><button aria-label="Chạy trái" {...hold('move', -1)}>◀</button><button aria-label="Chạy phải" {...hold('move', 1)}>▶</button></div><p>CHẠM ĐỂ BẮN<br /><span>Vuốt ngang để lướt · Vuốt lên để nhảy</span></p><div className="combat-pad"><button {...hold('jump', true)}>↑ <span>Nhảy</span></button><button className="fire-button" {...hold('fire', true)}>✦ <span>Bắn</span></button></div></section>
    <footer className="runner-footer"><p role="status">{cleared ? 'Hoàn tất sân tập! Thử lại để tiếp tục.' : 'Bia tập có 3 điểm chịu đòn. Hãy thử chạy, nhảy và bắn.'}</p><button onClick={() => { run.current = createRun(); input.current = { move: 0 } }}>↻ Thử lại</button></footer>
    <p className="keyboard-hint">BÀN PHÍM: ← → / A D chạy · ↑ / W nhảy · SPACE / J bắn</p>
  </main>
}
