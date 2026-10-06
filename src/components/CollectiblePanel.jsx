import BeastCollection from './BeastCollection'
import { useEffect, useRef, useState } from 'react'
import { collectibleCatalog, COLLECTIBLE_KINDS, RARITIES, STAGE_COLLECTIBLES } from '../game/collectibles'

const searchText = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()

function CollectibleIcon({ item }) {
  const columns = item.columns || 4, rows = item.rows || 2
  return <i className="collectible-icon" aria-hidden="true" style={{
    backgroundImage: `url(${item.image || '/assets/items/forest-collectibles-v1.png'})`,
    backgroundSize: `${columns * 100}% ${rows * 100}%`,
    backgroundPosition: `${(item.sprite % columns) * 100 / (columns - 1)}% ${Math.floor(item.sprite / columns) * 100 / (rows - 1)}%`,
  }} />
}

export default function CollectiblePanel({ counts = {}, onClose }) {
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState('herb')
  const [rarity, setRarity] = useState('all')
  const [imageError, setImageError] = useState(false)
  const panel = useRef(null)
  useEffect(() => { panel.current?.focus() }, [])
  useEffect(() => {
    let active = true
    const images = [...new Set(collectibleCatalog.filter(item => item.kind === kind).map(item => item.image || '/assets/items/forest-collectibles-v1.png'))].map(src => {
      const image = new Image()
      image.onerror = () => { if (active) setImageError(true) }
      image.src = src
      return image
    })
    return () => { active = false; images.forEach(image => { image.onerror = null }) }
  }, [kind])
  const visible = collectibleCatalog.filter(item => item.kind === kind && (rarity === 'all' || item.rarity === rarity) && searchText(`${item.name} ${item.description}`).includes(searchText(query.trim())))
  const total = collectibleCatalog.filter(item => item.kind === kind).length
  const discovered = collectibleCatalog.filter(item => item.kind === kind && counts[item.id] > 0).length
  const locations = selected ? Object.values(STAGE_COLLECTIBLES).filter(stage => stage.itemIds.includes(selected.id)).map(stage => stage.name) : []
  return <section ref={panel} tabIndex={-1} className="cultivation-panel collectible-panel" aria-label="Bộ sưu tập" onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); onClose() } }}>
    <header><strong>BỘ SƯU TẬP</strong><button onClick={onClose} aria-label="Đóng bảng">×</button></header>
    <label className="collection-category">Danh mục<select value={kind === 'beast' ? 'beast' : 'items'} onChange={event => { setKind(event.target.value === 'beast' ? 'beast' : 'herb'); setSelected(null) }}><option value="items">Vật phẩm</option><option value="beast">Yêu thú (30)</option></select></label>
    {kind === 'beast' ? <BeastCollection /> : <>
    <p className="collection-summary">{total} {COLLECTIBLE_KINDS[kind].toLowerCase()} · Đã tìm thấy {discovered}/{total}</p>
    <div className="collection-filters">
      <label>Tìm kiếm<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Tên hoặc mô tả vật phẩm…" /></label>
      <label>Loại<select aria-label="Loại" value={kind} onChange={event => { setKind(event.target.value); setSelected(null); setImageError(false) }}>{Object.entries(COLLECTIBLE_KINDS).map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>
      <label>Độ hiếm<select aria-label="Độ hiếm" value={rarity} onChange={event => setRarity(event.target.value)}><option value="all">Tất cả</option>{Object.entries(RARITIES).map(([id, entry]) => <option key={id} value={id}>{entry.name}</option>)}</select></label>
    </div>
    <p className="collection-results" role="status">Hiển thị {visible.length}/{total} loại{imageError ? ' · Không tải được một số ảnh. Hãy thử tải lại khi có kết nối.' : ''}</p>
    {selected && <div className="collection-detail" role="region" aria-label={`Chi tiết ${selected.name}`}><CollectibleIcon item={selected} /><div><h3>{selected.name}</h3><p style={{ color: RARITIES[selected.rarity].color }}>{RARITIES[selected.rarity].name}</p><p>{selected.description}</p><p>{locations.length ? `Có thể nhặt tại: ${locations.join(', ')}` : 'Chưa có điểm rơi trong các màn hiện tại.'}</p><p>Tổng số đã từng nhặt: <b>{counts[selected.id] || 0}</b></p></div></div>}
    <div className="collectible-list">{visible.map(item => <button type="button" key={item.id} className={`collection-tile${counts[item.id] ? ' is-collected' : ''}`} aria-pressed={selected?.id === item.id} onClick={() => setSelected(item)}><CollectibleIcon item={item} /><strong>{item.name}</strong><small style={{ color: RARITIES[item.rarity].color }}>{RARITIES[item.rarity].name}</small><small>{counts[item.id] ? `Đã nhặt ${counts[item.id]}` : 'Chưa tìm thấy'}</small></button>)}</div>
    {!visible.length && <p className="collection-empty">Không có vật phẩm phù hợp. Hãy đổi từ khóa hoặc độ hiếm.</p>}
    </>}
  </section>
}
