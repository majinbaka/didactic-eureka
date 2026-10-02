import { useEffect, useState } from 'react'
import { loadLocalSave, qiRequired, realms, saveLocal, transition } from './game/state'
import { firebaseConfigured, uploadSave, downloadSave } from './services/firebase'
import PwaControls from './components/PwaControls'

const places = [
  { name: 'Thanh Vân Sơn', detail: 'Đạo trường · Linh khí hội tụ', mark: '山', active: true },
  { name: 'Rừng Trúc U Minh', detail: 'Bí cảnh · Sắp khai mở', mark: '竹' },
  { name: 'Cổ Thành Vô Danh', detail: 'Thương hội · Sắp khai mở', mark: '門' },
]
function PixelScene() {
  return <div className="scene" role="img" aria-label="Đạo sĩ áo xanh dưới cổng đền, núi xa và hoa anh đào trong cảnh pixel">
    <div className="sun" /><div className="mountain far" /><div className="mountain near" />
    <div className="cloud one" /><div className="cloud two" />
    <div className="tree"><i /><i /><i /><i /></div>
    <div className="gate"><div className="roof" /><div className="beam" /><div className="pillar left" /><div className="pillar right" /></div>
    <div className="lantern left" /><div className="lantern right" />
    <div className="ground" /><div className="path" /><div className="grass g1" /><div className="grass g2" />
    <div className="cultivator"><div className="hair" /><div className="face" /><div className="robe" /><div className="belt" /><div className="feet" /></div>
    <span className="scene-label">THANH VÂN SƠN · BÌNH MINH</span>
  </div>
}
export default function App() {
  const [state, setState] = useState(loadLocalSave)
  const [notice, setNotice] = useState('Đạo hữu, một hành trình mới đang chờ.')
  const [busy, setBusy] = useState(false)
  const [online, setOnline] = useState(navigator.onLine)
  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    window.addEventListener('online', update); window.addEventListener('offline', update)
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update) }
  }, [])
  function act(action) {
    const next = transition(state, action)
    setState(next)
    if (!saveLocal(next)) { setNotice('Không thể lưu trên máy. Kiểm tra dung lượng hoặc quyền lưu trữ của trình duyệt.'); return }
    setNotice({ cultivate: 'Tĩnh tâm nhập định. Linh khí +10.', explore: 'Trở về từ sơn lộ. Linh thạch +8, linh thảo +1.', breakthrough: 'Thiên địa cộng minh. Bạn đã bước vào cảnh giới mới!' }[action])
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
  const canAdvance = state.qi >= required && state.realm < realms.length - 1
  return <div className="app-shell">
    <header><a className="brand" href="/">LG<span>LOẠN GIỚI<small>TU TIÊN KÝ</small></span></a><div className="header-right"><span className="connection">● {online ? 'Đang trực tuyến' : 'Chơi offline'}</span><PwaControls /></div></header>
    <main>
      <div className="intro"><div><p className="eyebrow">CHƯƠNG I / KHỞI NGUYÊN</p><h1>Tu Tiên Loạn Giới<span>Một niệm khởi. Vạn giới sinh.</span></h1></div><span className="edition">BẢN KHỞI TẠO <b>0.1</b></span></div>
      <div className="game-layout">
        <aside className="panel profile"><p className="eyebrow">ĐẠO HỮU</p><div className="avatar">青</div><h2>Vô Danh</h2><p className="muted">Lữ khách đến từ dị giới</p><span className="realm">{realms[state.realm]} · Sơ kỳ</span><div className="divider" /><div className="stat"><span>Linh thạch</span><b>◆ {state.stones}</b></div><div className="stat"><span>Linh thảo</span><b>✦ {state.herbs}</b></div><div className="stat"><span>Lịch luyện</span><b>{state.journeys} chuyến</b></div><div className="divider" /><p className="small">Tiến độ tự lưu trên thiết bị.</p><button className="quiet full" disabled={!firebaseConfigured || busy || !online} onClick={() => sync('upload')}>{busy ? 'Đang kết nối…' : '↑ Lưu lên mây'}</button><button className="quiet full" disabled={!firebaseConfigured || busy || !online} onClick={() => { if (window.confirm('Thay tiến độ hiện tại bằng bản lưu trên mây?')) sync('download') }}>↓ Tải bản lưu trên mây</button><p className="small">{firebaseConfigured ? 'Firebase đã cấu hình · tài khoản khách' : 'Chế độ local · chưa kết nối Firebase'}</p></aside>
        <section className="world"><PixelScene /><div className="panel cultivation"><div className="section-heading"><div><p className="eyebrow">CON ĐƯỜNG TRƯỜNG SINH</p><h2>Tĩnh tâm tu luyện</h2></div><span className="qi-label">{state.qi} / {required} linh khí</span></div><progress value={state.qi} max={required} aria-label="Tiến độ linh khí" /><div className="actions"><button className="primary" disabled={busy} onClick={() => act('cultivate')}>✧ Tu luyện <small>+10 linh khí</small></button><button disabled={busy} onClick={() => act('explore')}>⚔ Lịch luyện <small>Thu thập tài nguyên</small></button><button disabled={!canAdvance || busy} onClick={() => act('breakthrough')}>↑ Đột phá <small>{state.realm === realms.length - 1 ? 'Đạt giới hạn demo' : 'Đủ linh khí để tiến cấp'}</small></button></div><p className="notice" role="status" aria-live="polite">{notice}</p></div></section>
        <aside className="panel locations"><p className="eyebrow">VẠN GIỚI ĐỒ</p><h2>Dấu chân lữ khách</h2>{places.map((place) => <div className={`place ${place.active ? 'active' : ''}`} key={place.name}><span className="place-mark">{place.mark}</span><div><h3>{place.name}</h3><p>{place.detail}</p></div></div>)}<div className="lore"><span>世界</span><p>“Khi ranh giới giữa các cõi rạn vỡ, người phàm cũng có thể chạm tới trời cao.”</p></div><p className="small">Prototype: tu luyện, lịch luyện và đột phá. Các vùng mới sẽ được bổ sung.</p></aside>
      </div>
    </main><footer><span>TU TIÊN LOẠN GIỚI</span><span>Pixel world · Một hành trình không vội</span></footer>
  </div>
}
