import { useEffect, useRef, useState } from 'react'
import { beastCatalog, BEAST_ACTIONS, BEAST_ELEMENTS, beastFrame } from '../game/beasts'
import { RARITIES } from '../game/collectibles'

const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase()
function BeastPreview({ beast, action, paused, replay }) {
  const canvas = useRef(null)
  const timer = useRef({ key: null, elapsed: 0 })
  const [failedImage, setFailedImage] = useState(null)
  useEffect(() => {
    const key = `${beast.id}:${action}:${replay}`
    if (timer.current.key !== key) timer.current = { key, elapsed: 0 }
    let active = true, request, elapsed = timer.current.elapsed, previous = 0
    const image = new Image()
    image.src = beast.image
    const draw = time => {
      if (!active) return
      if (previous && !paused && !document.hidden) elapsed += Math.min(time - previous, 100) / 1000
      timer.current.elapsed = elapsed
      previous = time
      const context = canvas.current?.getContext('2d')
      if (context) {
        const frame = beastFrame(beast, action, elapsed)
        context.imageSmoothingEnabled = false
        context.clearRect(0, 0, 128, 128)
        context.drawImage(image, frame % 4 * 128, Math.floor(frame / 4) * 128, 128, 128, 0, 0, 128, 128)
      }
      request = requestAnimationFrame(draw)
    }
    image.decode().then(() => { if (active) { setFailedImage(null); request = requestAnimationFrame(draw) } }).catch(() => { if (active) setFailedImage(beast.image) })
    return () => { active = false; cancelAnimationFrame(request) }
  }, [beast, action, paused, replay])
  return <><canvas ref={canvas} width="128" height="128" className="beast-preview" role="img" aria-label={`${beast.name}: ${BEAST_ACTIONS[action]}`} />{failedImage === beast.image && <p role="alert">Không tải được ảnh yêu thú. Hãy tải lại khi có kết nối.</p>}</>
}

export default function BeastCollection() {
  const [query, setQuery] = useState('')
  const [element, setElement] = useState('all')
  const [selectedId, setSelectedId] = useState(beastCatalog[0].id)
  const [action, setAction] = useState('idle')
  const [paused, setPaused] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [replay, setReplay] = useState(0)
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const change = event => setPaused(event.matches)
    motion.addEventListener('change', change)
    return () => motion.removeEventListener('change', change)
  }, [])
  const visible = beastCatalog.filter(beast => (element === 'all' || beast.element === element) && normalize(`${beast.name} ${beast.description} ${beast.attack.name} ${beast.skill.name}`).includes(normalize(query.trim())))
  const selected = visible.find(beast => beast.id === selectedId) || visible[0]
  return <div className="beast-collection">
    <p>{beastCatalog.length} yêu thú · Thư viện hoạt ảnh và thiết kế đòn đánh. Chưa xuất hiện trong màn chơi.</p>
    <div className="collection-filters">
      <label>Tìm yêu thú<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Tên, mô tả hoặc chiêu thức…" /></label>
      <label>Thuộc tính<select aria-label="Thuộc tính yêu thú" value={element} onChange={event => setElement(event.target.value)}><option value="all">Tất cả</option>{Object.entries(BEAST_ELEMENTS).map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>
      <label>Động tác<select aria-label="Động tác" value={action} onChange={event => { setAction(event.target.value); setReplay(value => value + 1) }}>{Object.entries(BEAST_ACTIONS).map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>
    </div>
    <div className="beast-controls"><button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Phát chuyển động' : 'Tạm dừng'}</button><button type="button" onClick={() => { setReplay(value => value + 1); setPaused(false) }}>Xem lại động tác</button><a href="/beasts.html">Xem toàn bộ hoạt ảnh</a></div>
    <p role="status">Hiển thị {visible.length}/{beastCatalog.length} yêu thú</p>
    {selected && <div className="collection-detail beast-detail"><BeastPreview beast={selected} action={action} paused={paused} replay={replay} /><div><h3>{selected.name}</h3><p>{BEAST_ELEMENTS[selected.element]} · {RARITIES[selected.rarity].name}</p><p>{selected.description}</p>{['attack', 'skill'].map(kind => <div key={kind}><h4>{kind === 'attack' ? 'Đánh thường' : 'Chiêu thức'}: {selected[kind].name}</h4><p>{selected[kind].description}</p><p>Báo đòn: {selected[kind].telegraph}</p><p>Tầm {selected[kind].range}px · Hồi chiêu {selected[kind].cooldownMs / 1000}s (thiết kế)</p></div>)}<a href={selected.image}>Atlas 20 frame</a> · <a href={selected.atlas}>Manifest</a></div></div>}
    <div className="collectible-list">{visible.map(beast => <button key={beast.id} type="button" className="collection-tile" aria-pressed={selected?.id === beast.id} onClick={() => { setSelectedId(beast.id); setReplay(value => value + 1) }}><img src={beast.preview} width="64" height="64" alt="" loading="lazy" /><strong>{beast.name}</strong><small>{BEAST_ELEMENTS[beast.element]}</small></button>)}</div>
    {!visible.length && <p>Không có yêu thú phù hợp. Hãy đổi từ khóa hoặc thuộc tính.</p>}
  </div>
}
