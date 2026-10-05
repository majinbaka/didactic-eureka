const OFFSETS = {
  'Trưởng lão Thái Huyền Tông': 225,
  'Bia đá': 225,
  'Bạch Tùng': 176,
  'Thiết Sơn': 132,
  'Minh Không': 88,
  'Linh Nhi': 44,
  'Vô Danh': 0,
}

export default function StorySpeech({ scene, name, rank, position, total, onNext, nextLabel = 'Tiếp tục' }) {
  const [width, setWidth] = useState(() => window.innerWidth)
  useEffect(() => {
    const resize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])
  const speaker = scene.speaker === 'Vô Danh' ? name : scene.speaker
  const anchor = Math.min(width * .7, width * .5 + 100) - (OFFSETS[scene.speaker] || 0)
  const bubbleWidth = Math.min(420, width - 24)
  const left = Math.max(12, Math.min(anchor - bubbleWidth / 2, width - bubbleWidth - 12))
  const title = scene.title?.replaceAll('{rank}', rank)
  return <section className="speech-layer" role="dialog" aria-modal="true" aria-label={`${speaker}: ${title || 'Lời thoại'}`} onKeyDown={event => {
    if (event.key !== 'Tab') return
    const bubble = event.currentTarget.querySelector('.speech-bubble')
    const button = event.currentTarget.querySelector('button')
    if (event.shiftKey && document.activeElement === bubble) { event.preventDefault(); button.focus() }
    if (!event.shiftKey && document.activeElement === button) { event.preventDefault(); bubble.focus() }
  }}>
    <div className="speech-bubble" tabIndex={0} style={{ left, width: bubbleWidth }}>
      <strong>{speaker}</strong>{title && <small>{title}</small>}
      <p>{scene.text.replaceAll('Vô Danh', name).replaceAll('{rank}', rank)}</p>
    </div>
    <i className="speech-tail" style={{ left: Math.max(18, Math.min(anchor, width - 18)) }} aria-hidden="true" />
    <footer className="speech-actions"><span>{position} / {total}</span><button key={`${position}-${speaker}`} autoFocus onClick={onNext}>{nextLabel}</button></footer>
  </section>
}
import { useEffect, useState } from 'react'
