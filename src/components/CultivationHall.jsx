import { useEffect, useRef, useState } from 'react'
import { elements, realms, qiRequired, transition, breakthroughCosts } from '../game/state'
import { stats, rootLabel, breakthroughChance, mutations, createDuel, duelTurn } from '../game/cultivation'

export default function CultivationHall({ progress: s, onChange, onClose }) {
  const dialog = useRef(null), [notice, setNotice] = useState('Tiến độ tự lưu trên thiết bị.'), [duel, setDuel] = useState(null)
  useEffect(() => { const node = dialog.current; node.showModal(); return () => node.close() }, [])
  const c = s.cultivation, st = stats(s)
  const act = action => {
    const next = transition(s, action)
    if (next === s) { setNotice('Chưa đủ tài nguyên hoặc chưa đạt điều kiện. Đan độc từ 80 chặn tu luyện và đột phá.'); return }
    if (!onChange(next)) { setNotice('Không thể lưu trên thiết bị. Tiến độ hiện chỉ còn trong phiên này.'); return }
    setNotice(next.cultivation.wave ? `Đợt lôi kiếp ${next.cultivation.wave}/${next.cultivation.total}: chọn cách đỡ.` : next.realm > s.realm ? 'Đột phá thành công!' : next.realm < s.realm || next.cultivation.wound > c.wound ? 'Thất bại: tổn thương 10 lượt, có thể tụt cảnh giới. Tĩnh tâm để hồi phục.' : 'Đã cập nhật tiến độ.')
  }
  const locked = !!c.wave || !!duel && !duel.result
  return <dialog className="dao-hall" ref={dialog} onCancel={onClose} aria-labelledby="dao-title">
    <header><h2 id="dao-title">Đạo pháp · {realms[s.realm]}{!s.realm ? ` tầng ${c.layer}` : ''}</h2><button autoFocus onClick={onClose} aria-label="Đóng Đạo pháp">Đóng</button></header>
    <p role="status">{notice}</p>
    <div className="dao-grid">
      <section><h3>Căn cốt & chiến lực</h3><p>{rootLabel(s)}</p><p>Căn cốt {s.attributes.canCot} · Ngộ tính {s.attributes.ngoTinh} · Phúc duyên {c.luck}</p>
        <p>HP {st.hp} · MP {st.mp} · Ngoại công {st.physical} · Nội công {st.magical}</p><p>Kháng ngoại {st.defense} · Kháng nội {st.ward} · Kháng mỗi hành {Math.round(st.resistance * 100)}% · Né {Math.round(st.evasion * 100)}%</p><p>Tốc độ {st.speed} · Tầm phép {st.range} · Sức tải {st.load}</p>
        <p>Điểm tự do: {s.attributePoints}</p><div className="dao-actions">{[['strength', 'Lực lượng'], ['mind', 'Thần thức'], ['will', 'Định tâm']].map(([key, label]) => <button key={key} disabled={locked || !s.attributePoints || c[key] >= 1000} onClick={() => act({ type: 'train-stat', stat: key })}>{label} {c[key]} ＋</button>)}</div>
        <p>{s.realm >= 2 ? 'Đã đạt mốc Ngự kiếm.' : 'Kim Đan mở mốc Ngự kiếm.'} {s.realm >= 3 ? `Nguyên Anh: ${c.rebirth ? 'đã dùng' : 'còn'} một lần hồi sinh khi độ kiếp.` : 'Nguyên Anh mở hồi sinh khi độ kiếp.'}</p>
      </section>
      <section><h3>Tu luyện & đan dược</h3><p>Linh khí {s.qi}/{qiRequired(s.realm)} · ◆ {s.stones} · Linh thảo {s.herbs}</p><p>Đan độc {c.toxicity}/100 · Sát khí {c.karma}/100 · Tổn thương {c.wound}/10</p><p>Đột phá {Math.round(breakthroughChance(s) * 100)}% · Đan hỗ trợ phẩm {c.pill}. Tầng 1–8 chỉ cần đầy linh khí; đại cảnh giới cần {breakthroughCosts[s.realm]?.stones ?? 0} ◆ và {breakthroughCosts[s.realm]?.herbs ?? 0} thảo.</p>
        <div className="dao-actions"><button disabled={locked || c.toxicity >= 80} onClick={() => act('cultivate')}>Nhập định</button><button disabled={locked} onClick={() => act('explore')}>Lịch luyện</button><button disabled={locked} onClick={() => act('purify')}>Tĩnh tâm · tẩy 15 độc</button><button disabled={locked || s.realm === 6 || s.qi < qiRequired(s.realm) || c.toxicity >= 80} onClick={() => act('breakthrough')}>Đột phá</button>{[1, 2, 3].map(q => <button key={q} disabled={locked || s.herbs < q * 2 || c.toxicity >= 80} onClick={() => act({ type: 'pill', quality: q })}>Đan phẩm {q} · {q * 2} thảo</button>)}</div>
      </section>
      <section><h3>Pháp bảo & biến dị</h3><p>Đã luyện hóa {c.bound}/{st.capacity} pháp bảo. Mỗi pháp bảo giảm 15 sát thương lôi kiếp khi dùng; tốn 12 MP/đợt.</p><button disabled={locked || s.stones < 20 || c.bound >= st.capacity} onClick={() => act('bind')}>Luyện hóa · 20 ◆</button><p>Trúc Cơ: chọn một biến dị vĩnh viễn, tốn 80 ◆ và 8 thảo. Chiêu biến dị khống chế ở lượt 1, 4, 7…</p><div className="dao-actions">{Object.entries(mutations).map(([id, label]) => <button key={id} disabled={locked || !!c.mutation || s.realm < 1 || s.stones < 80 || s.herbs < 8} onClick={() => act({ type: 'mutate', element: id })}>{label}</button>)}</div></section>
      <section><h3>Ngũ hành · đấu luyện</h3><p>Sinh: Kim → Thủy → Mộc → Hỏa → Thổ → Kim (+20% chiêu kế). Khắc: Kim → Mộc → Thổ → Thủy → Hỏa → Kim (+50%, xuyên 30% giáp); bị khắc −30%. Thiên linh căn tăng gấp đôi sát thương bản hệ.</p>
        {!duel || duel.result ? <div className="dao-actions">{elements.map(e => <button key={e.id} disabled={!!c.wave} onClick={() => setDuel(createDuel(s, e.id))}>Đối thủ {e.name}</button>)}</div> : null}
        {duel && <><p>Đối thủ {elements.find(e => e.id === duel.element)?.name}: {duel.hp}/{duel.maxHp} HP · Bạn {duel.playerHp} HP / {duel.mp} MP</p><p role="status">{duel.log}</p><div className="dao-actions">{[['physical', 'Ngoại công'], ...elements.filter(e => s.spiritRoots.includes(e.id)).map(e => [e.id, e.name]), ...(c.mutation ? [[c.mutation, mutations[c.mutation]]] : [])].map(([id, label]) => <button key={id} disabled={!!duel.result || !!c.wave} onClick={() => setDuel(duelTurn(s, duel, id))}>{label}</button>)}<button disabled={!!duel.result} onClick={() => setDuel({ ...duel, result: 'retreat', log: 'Đã rời đấu luyện.' })}>Rút lui</button></div></>}
        <p>Đấu luyện không thưởng tài nguyên, không tăng sát khí. Săn yêu nhận 16 ◆, 2 thảo và 10 sát khí; sát khí tăng sát thương nhưng khuếch đại lôi kiếp tới ×3.</p><button disabled={locked} onClick={() => act('hunt')}>Săn yêu · tích sát khí</button>
      </section>
    </div>
    {!!c.wave && <section className="dao-trial"><h3>Lôi kiếp {c.wave}/{c.total}</h3><p>HP {c.trialHp} · MP {c.trialMp} · Tiến độ kiếp được lưu sau từng đợt.</p><div className="dao-actions"><button onClick={() => act({ type: 'tribulation', guard: 'body' })}>Dùng thể chất</button><button disabled={!c.bound || c.trialMp < 12} onClick={() => act({ type: 'tribulation', guard: 'artifact' })}>Pháp bảo · 12 MP</button><button disabled={s.stones < 10} onClick={() => act({ type: 'tribulation', guard: 'formation' })}>Trận pháp · 10 ◆</button></div></section>}
  </dialog>
}
