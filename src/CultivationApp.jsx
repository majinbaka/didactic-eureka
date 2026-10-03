import { useEffect, useRef, useState } from 'react'
import { breakthroughCosts, cultivationGain, elements, loadLocalSave, qiRequired, realms, saveLocal, transition } from './game/state'
import { firebaseConfigured, uploadSave, downloadSave } from './services/firebase'
import PwaControls from './components/PwaControls'

const places = [
  { name: 'Thanh Vân Sơn', detail: 'Đạo trường · Linh khí hội tụ', mark: '山', active: true },
  { name: 'Rừng Trúc U Minh', detail: 'Bí cảnh · Sắp khai mở', mark: '竹' },
  { name: 'Cổ Thành Vô Danh', detail: 'Thương hội · Sắp khai mở', mark: '門' },
]
function GameSheet({ title, onClose, children }) {
  const ref = useRef(null)
  useEffect(() => { ref.current.showModal() }, [])
  return <dialog ref={ref} className="game-sheet" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div className="sheet-heading"><h2>{title}</h2><button aria-label="Đóng bảng" onClick={onClose}>✕</button></div>
    <div className="sheet-content">{children}</div>
  </dialog>
}
function PixelScene() {
  return <div className="scene" role="img" aria-label="Đạo sĩ áo xanh dưới cổng đền, núi xa và hoa anh đào trong cảnh pixel">
    <div className="sun" /><div className="mountain far" /><div className="mountain near" />
    <div className="cloud one" /><div className="cloud two" />
    <div className="tree"><i /><i /><i /><i /></div>
    <div className="gate"><div className="roof" /><div className="beam" /><div className="pillar left" /><div className="pillar right" /></div>
    <div className="lantern left" /><div className="lantern right" />
    <div className="ground" /><div className="path" /><div className="grass g1" /><div className="grass g2" />
    <div className="cultivator"><div className="hair" /><div className="face" /><div className="robe" /><div className="belt" /><div className="feet" /></div>
    <div className="pond" /><div className="stones" /><div className="petals" /><span className="character-name">Vô Danh</span>
  </div>
}
export default function App() {
  const [state, setState] = useState(loadLocalSave)
  const [notice, setNotice] = useState('Đạo hữu, một hành trình mới đang chờ.')
  const [sheet, setSheet] = useState(null)
  const [busy, setBusy] = useState(false)
  const [online, setOnline] = useState(navigator.onLine)
  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    window.addEventListener('online', update); window.addEventListener('offline', update)
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update) }
  }, [])
  function act(action) {
    const next = transition(state, action)
    if (next === state) {
      if (action === 'breakthrough') setNotice('Chưa đủ linh khí hoặc vật phẩm để đột phá.')
      return
    }
    setState(next)
    if (!saveLocal(next)) { setNotice('Không thể lưu trên máy. Kiểm tra dung lượng hoặc quyền lưu trữ của trình duyệt.'); return }
    if (action === 'cultivate') setNotice(`Tĩnh tâm nhập định. Linh khí +${cultivationGain(state)}; các linh căn cùng tăng tu vi.`)
    else if (action === 'explore') setNotice('Trở về từ sơn lộ. Linh thạch +8, linh thảo +1.')
    else setNotice(next.realm > state.realm ? 'Thiên địa cộng minh. Đột phá thành công, nhận 2 điểm thuộc tính!' : `Đột phá thất bại${state.realm > 0 ? ', cảnh giới bị tụt' : ''}. Vật phẩm đã tiêu hao.`)
  }
  function increaseAttribute(attribute) {
    const next = transition(state, { type: 'increase-attribute', attribute })
    if (next === state) { setNotice('Bạn chưa có điểm thuộc tính. Đột phá để nhận thêm.'); return }
    setState(next); saveLocal(next); setNotice('Đã cộng một điểm thuộc tính.')
  }
  async function sync(direction) {
    setBusy(true)
    try {
      if (direction === 'upload') { await uploadSave(state); setNotice('Đã lưu tiến độ lên mây.') }
      else {
        const saved = await downloadSave()
        if (saved) { setState(saved); setNotice(saveLocal(saved) ? 'Đã khôi phục tiến độ từ mây.' : 'Đã tải bản lưu nhưng không thể lưu trên thiết bị.') }
        else setNotice('Chưa có bản lưu trên mây.')
      }
    } catch { setNotice('Không thể kết nối mây. Kiểm tra mạng, cấu hình Firebase, Anonymous Auth và quyền Firestore.') }
    finally { setBusy(false) }
  }
  const required = qiRequired(state.realm)
  const cost = breakthroughCosts[state.realm]
  const hasMaterials = cost && state.stones >= cost.stones && state.herbs >= cost.herbs
  const canAdvance = state.qi >= required && state.realm < realms.length - 1 && hasMaterials
  return <main className="app-shell">
    <section className="game-screen" aria-label="Tu Tiên Loạn Giới">
      <PixelScene />
      <header className="game-hud">
        <button className="player-card" onClick={() => setSheet('profile')} aria-label="Mở hồ sơ và cộng chỉ số Vô Danh">
          <span className="portrait avatar-pixel" aria-hidden="true"><i /><i /><i /></span><span><strong>Vô Danh</strong><small>{realms[state.realm]} · {state.spiritRoots.length} linh căn</small></span>
        </button>
        <button className="menu-button" onClick={() => setSheet('settings')} aria-label="Mở cài đặt">☰</button>
        <div className="resource-bar"><button onClick={() => setSheet('profile')}><i>♥</i> {state.hp}/{state.maxHp}<small>Máu · Chỉ số</small></button><button onClick={() => setSheet('profile')}><i>◆</i> {state.stones}<small>Linh thạch</small></button><button onClick={() => setSheet('roots')}><i>✦</i> {state.qi}/{required}<small>Linh khí</small></button></div>
      </header>
      <div className="location-banner"><span className="location-diamond">山</span><div><h1>Thanh Vân Sơn</h1><p>ĐẠO TRƯỜNG · BÌNH MINH</p></div></div>
      <div className="world-caption"><span>CHƯƠNG I</span><p>Một niệm khởi. Vạn giới sinh.</p></div>
      <section className="control-deck" aria-label="Điều khiển đạo trường">
        <p className="notice" role="status" aria-live="polite"><span aria-hidden="true">✧</span> {notice}</p>
        <div className="qi-heading"><span>Linh khí <b>{realms[state.realm]}</b></span><strong>{state.qi}<span> / {required}</span></strong></div>
        <progress value={state.qi} max={required} aria-label="Tiến độ linh khí" />
        <div className="actions"><button className="primary" disabled={busy} onClick={() => act('cultivate')}><span className="action-icon">✧</span>Tu luyện<small>+{cultivationGain(state)} linh khí</small></button><button disabled={busy} onClick={() => act('explore')}><span className="action-icon">⚔</span>Lịch luyện<small>Thu thập</small></button><button disabled={!canAdvance || busy} onClick={() => act('breakthrough')}><span className="action-icon">⇧</span>Đột phá<small>{state.realm === realms.length - 1 ? 'Đã viên mãn' : canAdvance ? `${Math.round(cost.chance * 100)}% thành công` : `Cần ◆${cost.stones} ✦${cost.herbs}`}</small></button></div>
        <nav className="bottom-nav" aria-label="Menu game"><span className="nav-current" aria-current="page"><span>⌂</span>Đạo trường</span><button onClick={() => setSheet('map')}><span>▧</span>Bản đồ</button><button onClick={() => setSheet('profile')}><span>♙</span>Đạo hữu</button><button onClick={() => setSheet('settings')}><span>⚙</span>Cài đặt</button></nav>
      </section>
      {sheet && <GameSheet title={{ profile: 'Đạo hữu · Chỉ số', roots: 'Linh căn ngũ hành', map: 'Vạn giới đồ', settings: 'Cài đặt' }[sheet]} onClose={() => setSheet(null)}>
        {sheet === 'profile' && <><div className="profile-heading"><span className="portrait avatar-pixel"><i /><i /><i /></span><div><h3>Vô Danh</h3><p>{realms[state.realm]} · Còn {state.attributePoints} điểm</p></div></div><div className="stat"><span>Máu</span><b>♥ {state.hp}/{state.maxHp}</b></div>{[['canCot', 'Căn cốt', '+10 máu tối đa'], ['ngoTinh', 'Ngộ tính', '+1 hiệu quả tu luyện'], ['thanPhap', 'Thân pháp', 'Nền tảng chiến đấu']].map(([id, name, detail]) => <div className="attribute" key={id}><span><b>{name} · {state.attributes[id]}</b><small>{detail}</small></span><button disabled={!state.attributePoints} onClick={() => increaseAttribute(id)} aria-label={`Cộng một điểm ${name}`}>＋</button></div>)}<div className="stat"><span>Linh thạch / Linh thảo</span><b>◆ {state.stones} · ✦ {state.herbs}</b></div><p className="small">Mỗi lần đột phá thành công nhận 2 điểm thuộc tính.</p></>}
        {sheet === 'roots' && <><p className="small root-intro">Phàm nhân thức tỉnh ngẫu nhiên 1–5 linh căn. Nhiều linh căn tu luyện chậm hơn, nhưng mọi hành đang sở hữu đều nhận tu vi.</p><div className="element-grid">{elements.map(element => { const owned = state.spiritRoots.includes(element.id); return <div className={`element element-${element.id}${owned ? ' owned' : ''}`} key={element.id}><span>{element.mark}</span><b>{element.name}</b><small>{owned ? `${state.elementCultivation[element.id]} tu vi` : 'Chưa thức tỉnh'}</small></div> })}</div><div className="stat"><span>Hệ số thời gian</span><b>×{state.spiritRoots.length}</b></div><div className="stat"><span>Mỗi lần nhập định</span><b>+{cultivationGain(state)} mỗi hành</b></div></>}
        {sheet === 'map' && <>{places.map(place => <div className={`place ${place.active ? 'active' : ''}`} key={place.name}><span className="place-mark">{place.mark}</span><div><h3>{place.name}</h3><p>{place.detail}</p></div><span className="place-state">{place.active ? 'Đang ở đây' : 'Chưa mở'}</span></div>)}<p className="small">Các vùng mới sẽ được bổ sung trong những phiên bản sau.</p></>}
        {sheet === 'settings' && <><p className="eyebrow">TU TIÊN LOẠN GIỚI · 0.1</p><PwaControls /><div className="divider" /><h3>Bản lưu</h3><p className="small">Tiến độ tự lưu trên thiết bị. {firebaseConfigured ? 'Lưu mây sử dụng tài khoản khách.' : 'Chế độ local · chưa kết nối Firebase.'}</p><button className="full" disabled={!firebaseConfigured || busy || !online} onClick={() => sync('upload')}>{busy ? 'Đang kết nối…' : '↑ Lưu lên mây'}</button><button className="full" disabled={!firebaseConfigured || busy || !online} onClick={() => { if (window.confirm('Thay tiến độ hiện tại bằng bản lưu trên mây?')) sync('download') }}>↓ Tải bản lưu trên mây</button><p className="small sync-notice" role="status">{notice}</p></>}
      </GameSheet>}
    </section>
  </main>
}
