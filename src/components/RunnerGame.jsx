import { useEffect, useRef, useState } from 'react'
import { createRun, sceneryForChunk, SCENERY_CHUNK, OBSTACLES } from '../game/runner'
import { animationFrame, characterBaseline, CHARACTER_ATLAS, selectCharacterAnimation } from '../game/characterAnimations'
import { joystickInput } from '../game/runnerControls'
import { breakthroughCosts, characterAge, characterLifespan, createInitialState, cultivationGain, elements, loadLocalSave, qiRecoveryRate, qiRequired, realms, saveLocal, transition } from '../game/state'
import { SUMMIT_GATE, puzzles, trigrams, directions, createTrial, answerTrial, tickTrial, stepTrialRun, openingScenes, prologuePhase } from '../game/prologue'
import { items, itemBlockedReason } from '../game/items'
import { collectibleCatalog, collectibleReward, RARITIES } from '../game/collectibles'
import { DECORATIVE_VARIANT_SPRITES, FLOATING_OBSTACLE_SPRITES, OBSTACLE_ATLASES, OBSTACLE_SPRITES, OBSTACLE_TYPE_SPRITES } from '../game/scenerySprites'
import PwaControls from './PwaControls'

const SCENERY_ASSETS = {
  background: '/assets/scenery/underworld-bamboo-v1/bamboo-forest-background.webp',
  objects: '/assets/scenery/underworld-bamboo-v1/forest-objects-atlas.webp',
  obstacles: OBSTACLE_ATLASES.classic,
  objectVariants: OBSTACLE_ATLASES.v2,
  obstacleTypes: OBSTACLE_ATLASES.types,
  floatingObstacle: '/assets/scenery/floating-obstacle-v1/floating-platform.webp',
  collectibles: '/assets/items/forest-collectibles-v1.png',
}

function CollectibleIcon({ item }) {
  return <i className="collectible-icon" aria-hidden="true" style={{ backgroundPosition: `${(item.sprite % 4) * 100 / 3}% ${Math.floor(item.sprite / 4) * 100}%` }} />
}

function CollectiblePanel({ collectibles, onClose }) {
  const collectedCounts = collectibles.reduce((counts, spawn) => {
    if (spawn.collected) counts[spawn.itemId] = (counts[spawn.itemId] || 0) + 1
    return counts
  }, {})
  const totalCounts = collectibles.reduce((counts, spawn) => { counts[spawn.itemId] = (counts[spawn.itemId] || 0) + 1; return counts }, {})
  return <section className="cultivation-panel collectible-panel" aria-label="Bách khoa thu thập Rừng Trúc U Tinh">
    <header><strong>LINH VẬT · RỪNG TRÚC U TINH</strong><button onClick={onClose} aria-label="Đóng bảng">×</button></header>
    <p className="root-summary">6 linh thảo · 2 linh thạch · tự nhặt khi chạm vào</p>
    <div className="collectible-list">{collectibleCatalog.map(item => <article key={item.id} className={collectedCounts[item.id] ? 'is-collected' : ''}>
      <CollectibleIcon item={item} /><span><strong>{item.name}</strong><small style={{ color: RARITIES[item.rarity].color }}>{item.kind === 'herb' ? 'Linh thảo' : 'Linh thạch'} · {RARITIES[item.rarity].name}</small><p>{item.description}</p></span><b>{collectedCounts[item.id] || 0}/{totalCounts[item.id] || 0}</b>
    </article>)}</div>
  </section>
}

const COLLECTION_GROUPS = [
  { title: 'Linh thảo', detail: 'Có thể nhặt trong Rừng Trúc U Tinh', entries: collectibleCatalog.filter(item => item.kind === 'herb').map(item => item.name) },
  { title: 'Pháp bảo', detail: 'Sở hữu, kích hoạt và sử dụng lâu dài', entries: ['Tụ Khí Hồ Lô', 'Ngộ Đạo Ngọc'] },
  { title: 'Đan dược', detail: 'Dùng một lần để hồi phục hoặc trợ tu', entries: ['Hồi Xuân Đan'] },
]

function ElementRadar({ progress }) {
  const center = 100, radius = 72
  const point = (index, scale = 1) => {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / elements.length
    return `${center + Math.cos(angle) * radius * scale},${center + Math.sin(angle) * radius * scale}`
  }
  const max = Math.max(10, ...Object.values(progress.elementCultivation))
  const values = elements.map(element => Math.max(.08, progress.elementCultivation[element.id] / max))
  return <figure className="element-radar"><svg viewBox="0 0 200 200" role="img" aria-label={`Biểu đồ ngũ hành: ${elements.map(element => `${element.name} ${progress.elementCultivation[element.id]}`).join(', ')}`}>
    {[.25, .5, .75, 1].map(level => <polygon key={level} points={elements.map((_, index) => point(index, level)).join(' ')} />)}
    {elements.map((element, index) => <g key={element.id}><line x1="100" y1="100" x2={point(index).split(',')[0]} y2={point(index).split(',')[1]} /><text x={point(index, 1.18).split(',')[0]} y={point(index, 1.18).split(',')[1]}>{element.name}</text></g>)}
    <polygon className="radar-value" points={values.map((value, index) => point(index, value)).join(' ')} />
  </svg><figcaption>Tu vi ngũ hành · mạnh yếu hiện tại</figcaption></figure>
}

function CharacterProfile({ progress, view, onView, onClose, onAuto, onReset }) {
  const dialog = useRef(null)
  useEffect(() => { dialog.current?.focus() }, [])
  const rootNames = elements.filter(element => progress.spiritRoots.includes(element.id)).map(element => element.name)
  return <section ref={dialog} tabIndex={-1} className="character-profile" role="dialog" aria-modal="true" aria-labelledby="profile-title" onKeyDown={event => { if (event.key === 'Escape') onClose() }}>
    <header className="profile-topbar"><div><small>HỒ SƠ ĐẠO HỮU</small><h1 id="profile-title">Vô Danh</h1></div><nav><button className={view === 'collection' ? 'active' : ''} onClick={() => onView(view === 'collection' ? 'profile' : 'collection')}>Bộ sưu tập</button><button onClick={() => onView(view === 'settings' ? 'profile' : 'settings')} aria-label="Mở cài đặt hồ sơ">⚙ Cài đặt</button><button className="profile-close" onClick={onClose} aria-label="Đóng hồ sơ">×</button></nav></header>
    {view === 'collection' ? <div className="profile-collection"><div className="profile-section-title"><small>BÁCH KHOA VẠN VẬT</small><h2>Những vật phẩm có thể thu thập</h2><p>Mở khóa dần trong hành trình tu tiên.</p></div><div className="collection-groups">{COLLECTION_GROUPS.map(group => <article key={group.title}><span aria-hidden="true">{group.title === 'Linh thảo' ? '❋' : group.title === 'Pháp bảo' ? '◇' : '◉'}</span><h3>{group.title}</h3><small>{group.detail}</small><ul>{group.entries.map(entry => <li key={entry}>{entry}</li>)}</ul></article>)}</div></div> : view === 'settings' ? <div className="profile-settings"><div className="profile-section-title"><small>CÀI ĐẶT</small><h2>Dữ liệu nhân vật</h2></div><article><h3>Đặt lại hành trình</h3><p>Xóa tiến độ đang chơi trên thiết bị và tạo nhân vật 15 tuổi mới. Thao tác không tự xóa bản lưu mây.</p><button className="danger-action" onClick={onReset}>Đặt lại nhân vật</button></article></div> : <div className="profile-content">
      <section className="profile-hero"><div className="meditation-scene"><span className="meditation-aura" /><ActionSprite animation="sit" /><p>VÔ DANH</p><small>{realms[progress.realm]} · Sơ kỳ</small></div><div className="identity-card"><span>Linh căn</span><h2>{rootNames.length === 1 ? `Đơn linh căn ${rootNames[0]}` : `${rootNames.length} linh căn · ${rootNames.join(' · ')}`}</h2><p>{rootNames.length === 1 ? 'Thiên tư chuyên nhất, tốc độ hấp thu linh khí nổi trội.' : 'Đa linh căn, đường tu rộng nhưng cần nhiều thời gian hơn.'}</p><div><b>{characterAge(progress)} tuổi</b><small>Thọ nguyên {characterLifespan(progress)} tuổi</small></div></div></section>
      <section className="profile-vitals"><article><small>LINH KHÍ</small><b>{progress.qi}<i> / {qiRequired(progress.realm)}</i></b><span>+{qiRecoveryRate(progress)} mỗi giây khi tự động</span></article><article><small>SINH LỰC</small><b>{progress.hp}<i> / {progress.maxHp}</i></b><span>Căn cốt cấp {progress.attributes.canCot}</span></article><article><small>THỜI GIAN</small><b>7 ngày</b><span>= 1 năm trong game</span></article></section>
      <section className="profile-training"><ElementRadar progress={progress} /><div className="element-scores"><h2>Tu vi theo hệ</h2>{elements.map(element => <div key={element.id} className={progress.spiritRoots.includes(element.id) ? 'owned' : ''}><span>{element.mark} {element.name}</span><b>{progress.elementCultivation[element.id]}</b></div>)}</div><div className="auto-training"><small>TỌA THIỀN</small><h2>Tu luyện tự động</h2><p>Hấp thu linh khí và tăng tu vi của mọi linh căn mỗi giây khi game đang mở.</p><button aria-pressed={progress.autoCultivate} onClick={() => onAuto(!progress.autoCultivate)}><i />{progress.autoCultivate ? 'Đang nhập định' : 'Bắt đầu nhập định'}</button></div></section>
    </div>}
  </section>
}
const RIVAL_CHARACTERS = {
  female: '/assets/characters/female-v1/character-female-v1-sheet.png',
  'bald-monk': '/assets/characters/bald-monk-v1/character-bald-monk-v1-sheet.png',
  strongman: '/assets/characters/strongman-v1/character-strongman-v1-sheet.png',
  elder: '/assets/characters/elder-v1/character-elder-v1-sheet.png',
}
const OBJECT_SPRITES = [
  { x: 0, y: 20, width: 340, height: 710 },
  { x: 335, y: 100, width: 300, height: 630 },
  { x: 635, y: 390, width: 300, height: 340 },
  { x: 930, y: 430, width: 324, height: 300 },
  { x: 0, y: 835, width: 350, height: 390 },
  { x: 350, y: 990, width: 300, height: 235 },
  { x: 625, y: 730, width: 320, height: 495 },
  { x: 940, y: 730, width: 314, height: 495 },
]
const ACTION_PAGES = [
  [
    { id: 'attack', label: 'Phóng khí', animation: 'hello' },
    { id: 'dash', label: 'Lướt', animation: 'run', elapsed: .1 },
    { id: 'jump', label: 'Nhảy', animation: 'jump' },
    { id: 'fly', label: 'Bay', animation: 'fly' },
    { id: 'hello', label: 'Chào', animation: 'hello' },
    { id: 'scratch', label: 'Gãi đầu', animation: 'scratch' },
    { id: 'doze', label: 'Ngủ gật', animation: 'doze', elapsed: .6 },
    { id: 'sit', label: 'Ngồi', animation: 'sit' },
  ],
  [
    { id: 'attack', label: 'Phóng khí', animation: 'hello' },
    { id: 'dash', label: 'Lướt', animation: 'run', elapsed: .1 },
    { id: 'jump', label: 'Nhảy', animation: 'jump' },
    { id: 'fly', label: 'Bay', animation: 'fly' },
    { id: 'crawl', label: 'Bò', animation: 'crawl' },
    { id: 'hurt', label: 'Bị thương', animation: 'hurt' },
    { id: 'collapse', label: 'Gục ngã', animation: 'collapse', elapsed: .5 },
    { id: 'hello', label: 'Chào', animation: 'hello', elapsed: .3 },
  ],
]

const ATTRIBUTE_LABELS = { canCot: ['Căn cốt', '+10 máu'], ngoTinh: ['Ngộ tính', '+ tu luyện'], thanPhap: ['Thân pháp', '+ chiến đấu'] }

function ProgressPanel({ mode, progress, notice, onAction, onClose }) {
  const cost = breakthroughCosts[progress.realm]
  return <section className="cultivation-panel" aria-label={mode === 'items' ? 'Hành trang' : mode === 'roots' ? 'Linh căn và tu luyện' : 'Hồ sơ và thuộc tính'}>
    <header><strong>{mode === 'items' ? 'HÀNH TRANG' : mode === 'roots' ? 'LINH CĂN NGŨ HÀNH' : 'THUỘC TÍNH'}</strong><button onClick={onClose} aria-label="Đóng bảng">×</button></header>
    {mode === 'items' ? <div className="inventory-list">{items.map(item => {
      const blocked = itemBlockedReason(progress, item.id)
      const buyBlocked = itemBlockedReason(progress, item.id, true)
      return <article key={item.id}>
        <strong>{item.name}</strong><small>{item.kind} · {item.id === 'jade' ? (progress.inventory.jadeActive ? 'Đang hiệu lực' : progress.inventory.jade ? 'Chưa kích hoạt' : 'Chưa sở hữu') : `${progress.inventory[item.id]} ${item.id === 'pill' ? 'viên' : '/ 5 lượt'}`}</small>
        <p>{item.description}</p>
        <div className="panel-actions"><button disabled={!!blocked} onClick={() => onAction({ type: 'use-item', id: item.id })} aria-label={`Dùng ${item.name}`}>{item.id === 'jade' ? 'Kích hoạt' : 'Dùng'}<small>{blocked || 'Sẵn sàng'}</small></button><button disabled={!!buyBlocked} onClick={() => onAction({ type: 'buy-item', id: item.id })} aria-label={`Mua ${item.name}`}>Mua · {item.price} ◆<small>{buyBlocked || (item.id === 'gourd' ? 'Bình mới: 5 lượt' : 'Thêm 1 vật phẩm')}</small></button></div>
      </article>
    })}</div> : mode === 'stats' ? <>
      <p className="panel-points">Điểm tự do <b>{progress.attributePoints}</b></p>
      {Object.entries(ATTRIBUTE_LABELS).map(([id, [name, detail]]) => <div className="hud-attribute" key={id}><span><b>{name} · {progress.attributes[id]}</b><small>{detail}</small></span><button disabled={!progress.attributePoints} onClick={() => onAction({ type: 'increase-attribute', attribute: id })} aria-label={`Cộng ${name}`}>＋</button></div>)}
      <button className="explore-action" onClick={() => onAction('explore')}>Lịch luyện <small>+8 ◆ · +1 dược</small></button>
    </> : <>
      <p className="root-summary">{progress.spiritRoots.length} linh căn · thời gian tu luyện ×{progress.spiritRoots.length}</p>
      <div className="hud-elements">{elements.map(element => { const owned = progress.spiritRoots.includes(element.id); return <span className={`${owned ? 'owned ' : ''}element-${element.id}`} key={element.id}><b>{element.mark}</b><small>{owned ? `${element.name} ${progress.elementCultivation[element.id]}` : element.name}</small></span> })}</div>
      <div className="panel-actions"><button onClick={() => onAction('cultivate')}>Nhập định <small>+{cultivationGain(progress)} linh khí/hành</small></button><button disabled={!cost || progress.qi < qiRequired(progress.realm) || progress.stones < cost.stones || progress.herbs < cost.herbs} onClick={() => onAction('breakthrough')}>Đột phá <small>{cost ? `${Math.round(cost.chance * 100)}% · ◆${cost.stones} · dược ${cost.herbs}` : 'Đã viên mãn'}</small></button></div>
    </>}
    <p className="panel-notice" role="status">{notice}</p>
  </section>
}

function ActionSprite({ animation, elapsed = 0 }) {
  const frame = animationFrame(animation, elapsed)
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
  const sprite = OBJECT_SPRITES[index]
  if (!sprite) return
  ctx.save(); ctx.globalAlpha = alpha
  ctx.drawImage(image, sprite.x, sprite.y, sprite.width, sprite.height, Math.round(x - width / 2), Math.round(base - height), width, height)
  ctx.restore()
}

function drawGroundDetail(ctx, image, variantImage, detail, x, ground) {
  const objects = {
    stone: { index: 4, width: 68, height: 68 },
    pebbles: { index: 5, width: 62, height: 48 },
    grass: { index: 3, width: 58, height: 58 },
    'bamboo-shoot': { index: 2, width: 52, height: 68 },
  }
  const object = objects[detail.kind]
  const variant = DECORATIVE_VARIANT_SPRITES[detail.kind]
  if (variant && variantImage?.complete && variantImage.naturalWidth) {
    const height = detail.kind === 'variant-bamboo' ? 86 : 48
    const width = height * variant.width / variant.height
    ctx.drawImage(variantImage, variant.x, variant.y, variant.width, variant.height, Math.round(x - width / 2), Math.round(ground - height), width, height)
    return
  }
  if (!object) return
  drawObject(ctx, image, object.index, x, ground + 4, object.width * detail.scale, object.height * detail.scale)
}

function drawObstacle(ctx, image, variantImage, typeImage, floatingImage, obstacle, x, top) {
  if (obstacle.kind === 'floating') {
    const sprite = FLOATING_OBSTACLE_SPRITES[obstacle.sprite]
    const sources = { floating: floatingImage, classic: image, v2: variantImage }
    const source = sources[sprite?.atlas]
    if (!sprite || !source?.complete || !source.naturalWidth) return
    ctx.drawImage(source, sprite.x, sprite.y, sprite.width, sprite.height, x, top, obstacle.width, obstacle.height - obstacle.bottom)
    return
  }
  const typeSprite = OBSTACLE_TYPE_SPRITES[obstacle.sprite]
  if (typeSprite && typeImage?.complete && typeImage.naturalWidth) {
    const scaleY = obstacle.height / (typeSprite.height - typeSprite.surface)
    ctx.drawImage(
      typeImage,
      typeSprite.x, typeSprite.y, typeSprite.width, typeSprite.height,
      x, top - typeSprite.surface * scaleY, obstacle.width, typeSprite.height * scaleY,
    )
    return
  }
  const key = obstacle.height >= 100
    ? (obstacle.width < 90 ? 'tallNarrow' : 'tallWide')
    : (obstacle.height <= 48 ? 'low' : 'medium')
  const useVariant = obstacle.sprite?.startsWith('carved-') && variantImage?.complete && variantImage.naturalWidth
  const source = useVariant ? variantImage : image
  if (!source?.complete || !source.naturalWidth) return
  const sprite = OBSTACLE_SPRITES[useVariant ? 'v2' : 'classic'][key]
  ctx.drawImage(
    source,
    sprite.x, sprite.y, sprite.width, sprite.height,
    x, top, obstacle.width, obstacle.height,
  )
}

function drawCollectible(ctx, image, spawn, camera, ground, time) {
  if (spawn.collected || !image?.complete || !image.naturalWidth) return
  const item = collectibleCatalog.find(entry => entry.id === spawn.itemId)
  if (!item) return
  const x = spawn.x - camera, y = ground - 30 + Math.round(Math.sin(time * 3 + spawn.x) * 3)
  if (x < -40 || x > ctx.canvas.width + 40) return
  const sourceX = (item.sprite % 4) * 32, sourceY = Math.floor(item.sprite / 4) * 32
  ctx.save()
  ctx.globalAlpha = .28 + Math.sin(time * 4 + spawn.x) * .06
  ctx.fillStyle = RARITIES[item.rarity].color; ctx.fillRect(Math.round(x - 17), y - 18, 34, 34)
  ctx.globalAlpha = 1; ctx.drawImage(image, sourceX, sourceY, 32, 32, Math.round(x - 16), y - 16, 32, 32)
  ctx.restore()
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
    for (const detail of chunk.details) drawGroundDetail(ctx, sprites.objects, sprites.objectVariants, detail, i * SCENERY_CHUNK + detail.offset - camera, ground + 4)
  }
  for (const t of s.targets) {
    if (!t.hp) continue
    const x = t.x - camera
    drawObject(ctx, sprites.objects, t.hp === 3 ? 6 : 7, x + 32, ground + 5, 92, 116)
    ctx.fillStyle = '#dfbc7c'; ctx.fillRect(x + 8, ground - 96, t.hp * 16, 4)
  }
  for (const obstacle of OBSTACLES) {
    const x = Math.round(obstacle.x - camera), top = ground - obstacle.height
    if (x + obstacle.width < 0 || x > width) continue
    drawObstacle(ctx, sprites.obstacles, sprites.objectVariants, sprites.obstacleTypes, sprites.floatingObstacle, obstacle, x, top)
  }
  for (const collectible of s.collectibles) drawCollectible(ctx, sprites.collectibles, collectible, camera, ground, s.time)
  const rivalFrame = animationFrame('run', s.time)
  for (const racer of [...s.racers].sort((a, b) => a.lane - b.lane)) {
    const x = racer.x - camera + 64
    if (x < -128 || x > width + 128) continue
    const frame = racer.y > 0 ? animationFrame('jump', s.time) : rivalFrame
    const baseline = characterBaseline(racer, ground, frame)
    drawCharacter(ctx, sprites.rivals[racer.id], frame, x, baseline, 1)
    ctx.font = '10px system-ui'; ctx.textAlign = 'center'
    ctx.fillStyle = '#10241edb'; ctx.fillRect(Math.round(x - 31), baseline - 119, 62, 15)
    ctx.fillStyle = '#f1ead4'; ctx.fillText(racer.name, Math.round(x), baseline - 108)
  }
  const animation = selectCharacterAnimation(s, input)
  const frame = animationFrame(animation, s.action ? s.actionTime : s.time)
  drawCharacter(ctx, sprites.character, frame, s.x - camera + 64, characterBaseline(s, ground, frame), s.facing)
  for (const b of s.shots) { ctx.fillStyle = '#f6de94'; ctx.fillRect(b.x - camera - 8, ground - b.y, 20, 8) }
}
export default function RunnerGame() {
  const [initialRun] = useState(createRun)
  const canvas = useRef(null), run = useRef(initialRun), input = useRef({ move: 0 }), gesture = useRef(null)
  const sprites = useRef({ character: null, background: null, objects: null, obstacles: null, objectVariants: null, obstacleTypes: null, floatingObstacle: null, collectibles: null, rivals: {} })
  const joystick = useRef(null)
  const [spriteStatus, setSpriteStatus] = useState('loading')
  const [hits, setHits] = useState(0)
  const [rank, setRank] = useState(1)
  const [storyIndex, setStoryIndex] = useState(0)
  const [storyStarted, setStoryStarted] = useState(false)
  const trialRef = useRef(createTrial())
  const [trial, setTrial] = useState(createTrial)
  const [fish, setFish] = useState(3)
  const [ring, setRing] = useState(0)
  const puzzleDialog = useRef(null)
  const [phase, setPhase] = useState('forest')
  const [playerX, setPlayerX] = useState(100)
  const [joystickView, setJoystickView] = useState(null)
  const [actionPage, setActionPage] = useState(0)
  const [progress, setProgress] = useState(loadLocalSave)
  const [panel, setPanel] = useState(null)
  const [notice, setNotice] = useState('Bấm vào HUD để mở tu luyện và cộng chỉ số.')
  const [collectionView, setCollectionView] = useState(initialRun.collectibles)
  const processedPickup = useRef(0)
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
    if (!progress.autoCultivate) return
    const timer = window.setInterval(() => {
      setProgress(previous => {
        const next = transition(previous, 'auto-cultivate-tick')
        if (next !== previous) saveLocal(next)
        return next
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [progress.autoCultivate])
  useEffect(() => {
    const character = new Image(), background = new Image(), objects = new Image(), obstacles = new Image(), objectVariants = new Image(), obstacleTypes = new Image(), floatingObstacle = new Image(), collectibles = new Image()
    const rivals = Object.fromEntries(Object.keys(RIVAL_CHARACTERS).map(id => [id, new Image()]))
    sprites.current = { character, background, objects, obstacles, objectVariants, obstacleTypes, floatingObstacle, collectibles, rivals }
    let loadedCount = 0
    const assetCount = 8 + Object.keys(rivals).length
    const loaded = () => { loadedCount += 1; if (loadedCount === assetCount) setSpriteStatus('ready') }
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
    obstacles.onload = loaded
    obstacles.onerror = failed
    obstacles.src = SCENERY_ASSETS.obstacles
    objectVariants.onload = loaded
    objectVariants.onerror = failed
    objectVariants.src = SCENERY_ASSETS.objectVariants
    obstacleTypes.onload = loaded
    obstacleTypes.onerror = failed
    obstacleTypes.src = SCENERY_ASSETS.obstacleTypes
    floatingObstacle.onload = loaded
    floatingObstacle.onerror = failed
    floatingObstacle.src = SCENERY_ASSETS.floatingObstacle
    collectibles.onload = loaded
    collectibles.onerror = failed
    collectibles.src = SCENERY_ASSETS.collectibles
    for (const [id, image] of Object.entries(rivals)) {
      image.onload = loaded
      image.onerror = failed
      image.src = RIVAL_CHARACTERS[id]
    }
    let frame, last = 0
    const tick = now => {
      const dt = Math.min((now - (last || now)) / 1000, .035); last = now
      const current = trialRef.current
      const frozen = !storyStarted || current.active || current.trapped > 0 || prologuePhase(run.current.x, current.stage) === 'complete'
      if (!frozen) run.current = stepTrialRun(run.current, input.current, dt, current)
      if (run.current.pickupSequence > processedPickup.current) {
        processedPickup.current = run.current.pickupSequence
        const item = run.current.lastPickup, reward = collectibleReward(item)
        setProgress(previous => {
          const next = transition(previous, { type: 'collect-runner-loot', ...reward })
          if (!saveLocal(next)) setNotice('Đã nhặt vật phẩm nhưng không lưu được trên thiết bị.')
          else setNotice(`Đã nhặt ${item.name} · +${reward.herbs || reward.stones} ${reward.herbs ? 'linh thảo' : 'linh thạch'}.`)
          return next
        })
        setCollectionView(run.current.collectibles)
      }
      if (storyStarted) {
        const result = tickTrial(current, run.current, dt)
        trialRef.current = result.trial; run.current = result.run; setTrial(result.trial)
        setRank(1 + result.run.racers.filter(r => r.x > result.run.x).length)
        if (!current.active && result.trial.active) setPanel(null)
      }
      input.current.jump = false; input.current.dash = false; input.current.flyToggle = false; input.current.action = null; input.current.actionMove = false
      const c = canvas.current, width = c.clientWidth, height = c.clientHeight
      if (c.width !== width || c.height !== height) { c.width = width; c.height = height }
      const context = c.getContext('2d'); context.imageSmoothingEnabled = false
      draw(context, run.current, width, height, input.current, sprites.current)
      setHits(run.current.hits); setPlayerX(run.current.x); setPhase(prologuePhase(run.current.x, trialRef.current.stage))
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
    return () => { for (const image of [character, background, objects, obstacles, objectVariants, obstacleTypes, floatingObstacle, collectibles, ...Object.values(rivals)]) image.onload = image.onerror = null; cancelAnimationFrame(frame); window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', reset) }
  }, [storyStarted])
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
  const triggerAction = action => {
    if (action === 'attack') {
      input.current.fire = true
      setTimeout(() => { input.current.fire = false }, 180)
    } else if (action === 'dash') input.current.dash = true
    else if (action === 'jump') { input.current.jump = true; input.current.actionMove = !joystick.current }
    else if (action === 'fly') input.current.flyToggle = true
    else { input.current.action = action; if (action === 'crawl') input.current.actionMove = !joystick.current }
  }
  const activateAction = (event, action) => {
    // Pointer down preserves simultaneous joystick input; keyboard activation arrives as click detail 0.
    if (event.type === 'pointerdown' || event.detail === 0) triggerAction(action)
  }
  const progressAction = action => {
    const next = transition(progress, action)
    if (next === progress) { setNotice(action?.type === 'use-item' || action?.type === 'buy-item' ? itemBlockedReason(progress, action.id, action.type === 'buy-item') : action === 'breakthrough' ? 'Chưa đủ linh khí hoặc vật phẩm.' : 'Chưa có điểm thuộc tính.'); return }
    setProgress(next)
    if (!saveLocal(next)) { setNotice('Không lưu được trên thiết bị. Tiến độ chỉ còn trong phiên này.'); return }
    if (action === 'cultivate') setNotice(`Mọi linh căn sở hữu +${cultivationGain(progress)} tu vi.`)
    else if (action === 'explore') setNotice('Lịch luyện nhận 8 linh thạch và 1 linh dược.')
    else if (action === 'breakthrough') setNotice(next.realm > progress.realm ? 'Đột phá thành công! Nhận 2 điểm thuộc tính.' : `Đột phá thất bại${progress.realm ? ', tụt một cảnh giới' : ''}.`)
    else if (action?.type === 'use-item' || action?.type === 'buy-item') setNotice(`${action.type === 'buy-item' ? 'Đã mua' : 'Đã dùng'} ${items.find(item => item.id === action.id).name}.`)
    else setNotice('Đã cộng một điểm thuộc tính.')
  }
  const setAutoCultivate = enabled => {
    const next = transition(progress, { type: 'set-auto-cultivate', enabled })
    setProgress(next)
    setNotice(enabled ? 'Đã bắt đầu tu luyện tự động.' : 'Đã dừng tu luyện tự động.')
    if (!saveLocal(next)) setNotice('Đã đổi chế độ nhưng không lưu được trên thiết bị.')
  }
  const resetProgress = () => {
    if (!window.confirm('Đặt lại toàn bộ tiến độ nhân vật trên thiết bị? Hành động này không thể hoàn tác.')) return
    const next = createInitialState()
    setProgress(next)
    setPanel('profile')
    setNotice(saveLocal(next) ? 'Đã tạo lại nhân vật mới.' : 'Đã tạo lại trong phiên nhưng không lưu được trên thiết bị.')
  }
  const requiredQi = qiRequired(progress.realm)
  const story = openingScenes[storyIndex]
  const advanceStory = () => {
    if (storyIndex < openingScenes.length - 1) setStoryIndex(index => index + 1)
    else setStoryStarted(true)
  }
  const chooseMaze = answer => {
    const result = answerTrial(trialRef.current, run.current, answer)
    trialRef.current = result.trial; run.current = result.run; setTrial(result.trial)
    input.current = { move: 0 }
    if (!result.trial.active) canvas.current?.focus()
  }
  useEffect(() => {
    if (trial.active) {
      input.current = { move: 0 }
      puzzleDialog.current?.focus()
    }
  }, [trial.active])
  const restartChapter = () => {
    run.current = createRun(); input.current = { move: 0 }
    processedPickup.current = 0; setCollectionView(run.current.collectibles)
    trialRef.current = createTrial(); setTrial(trialRef.current); setFish(3); setRing(0)
    setStoryIndex(0); setStoryStarted(false); setPhase('forest'); setPlayerX(100)
    setHits(0); setRank(1); setPanel(null); setJoystickView(null); joystick.current = null
  }
  const puzzle = puzzles[trial.stage]
  return <main className="runner-shell">
    <section className="runner-frame" aria-label="Trúc Linh Phong, chương mở đầu Tu Tiên Loạn Giới">
      {spriteStatus !== 'ready' && <p className="runner-loading" role="status">{spriteStatus === 'error' ? 'Không tải được cảnh Rừng Trúc. Hãy tải lại trang để thử lại.' : 'Đang tải Rừng Trúc U Tinh…'}</p>}
      <div className="runner-hud cultivation-hud">
        <div className="hud-sidebar">
          <button className="hud-avatar" onClick={() => setPanel('profile')} aria-label="Mở hồ sơ nhân vật"><img src="/assets/ui/character-portrait.png" alt="" /><span><b>VÔ DANH</b><small>HỒ SƠ</small></span></button>
          <button className="inventory-toggle" aria-label="Mở hành trang" aria-expanded={panel === 'items'} onClick={() => { setNotice(''); setPanel(panel === 'items' ? null : 'items') }}><img src="/assets/ui/inventory-bag-v1.png" alt="" /></button>
        </div>
        <div className="hud-vitals"><button onClick={() => setPanel(panel === 'stats' ? null : 'stats')}><span>♥ {progress.hp}/{progress.maxHp}</span><i><b style={{ width: `${progress.hp / progress.maxHp * 100}%` }} /></i><small>MÁU · CHỈ SỐ</small></button><button onClick={() => setPanel(panel === 'stats' ? null : 'stats')}><span>◆ {progress.stones}</span><small>LINH THẠCH</small></button><button onClick={() => setPanel(panel === 'collectibles' ? null : 'collectibles')}><span>❋ {progress.herbs}</span><small>LINH THẢO</small></button><button onClick={() => setPanel(panel === 'roots' ? null : 'roots')}><span>✦ {progress.qi}/{requiredQi}</span><i><b style={{ width: `${progress.qi / requiredQi * 100}%` }} /></i><small>LINH KHÍ</small></button></div>
      </div>
      {panel === 'collectibles' ? <CollectiblePanel collectibles={collectionView} onClose={() => setPanel(null)} /> : ['items', 'stats', 'roots'].includes(panel) && <ProgressPanel mode={panel} progress={progress} notice={notice} onAction={progressAction} onClose={() => setPanel(null)} />}
      {['profile', 'collection', 'settings'].includes(panel) && <CharacterProfile progress={progress} view={panel} onView={setPanel} onClose={() => setPanel(null)} onAuto={setAutoCultivate} onReset={resetProgress} />}
      <canvas ref={canvas} tabIndex={0} aria-label="Rừng Trúc U Tinh. Mũi tên hoặc A D để đi, giữ Shift để chạy, W để nhảy qua hoặc lên bậc đá, F để bay, J hoặc Space để phóng khí."
        onPointerDown={e => { e.currentTarget.focus(); e.currentTarget.setPointerCapture(e.pointerId); gesture.current = { x: e.clientX, y: e.clientY } }}
        onPointerUp={e => { const g = gesture.current; if (!g) return; const dx = e.clientX - g.x, dy = e.clientY - g.y; if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) { run.current.facing = Math.sign(dx); input.current.dash = true } else if (dy < -30) input.current.jump = true; else input.current.fire = true; gesture.current = null; setTimeout(() => { input.current.fire = false }, 100) }} onPointerCancel={() => { gesture.current = null }} />
      <div className="arena-label">TRÚC LINH PHONG <span>{phase === 'summit' ? 'Vân Tích Bộ · Bứt phá lên đỉnh' : 'Rừng Trúc U Tinh · Thử thách nhập môn'}</span></div>
      {storyStarted && phase !== 'complete' && <div className="chapter-progress" aria-label="Tiến độ chương"><i style={{ width: `${Math.min(100, Math.max(0, (playerX - 100) / (SUMMIT_GATE - 100) * 100))}%` }} /></div>}
      <p className="runner-status" role="status">{storyStarted && `Hạng ${rank}/5 · ${trial.slow > 0 ? `Độc Bão ${Math.ceil(trial.slow)}s · ` : ''}`}{trial.message} {phase === 'forest' ? `${hits} đòn trúng · W / nút Nhảy · Vượt bậc đá` : phase === 'summit' ? 'Uy áp Linh Phong · Tiến lên viên gạch cuối cùng!' : ''}</p>
      <div className="game-pwa"><PwaControls /></div>
      <div className="runner-controls" aria-label="Điều khiển">
        <div className="joystick-zone" role="group" aria-label="Giữ rồi vuốt sang trái hoặc phải để di chuyển. Vuốt xa để chạy." tabIndex={0}
          onPointerDown={startJoystick} onPointerMove={updateJoystick} onPointerUp={stopJoystick} onPointerCancel={stopJoystick}>
          <span className="joystick-hint" aria-hidden="true">GIỮ &amp; VUỐT<small>Di chuyển</small></span>
          {joystickView && <span className="joystick-base" aria-hidden="true" style={{ left: joystickView.x, top: joystickView.y }}><i style={{ transform: `translate(${joystickView.knobX}px, ${joystickView.knobY}px)` }} /></span>}
        </div>
        <div className="combat-pad" role="group" aria-label={`Hành động, trang ${actionPage + 1} / ${ACTION_PAGES.length}`}>
          {ACTION_PAGES[actionPage].map((action, index) => <button
            key={action.id}
            className={`combat-action combat-action--${action.id}${index >= 4 ? ' combat-action--utility' : ''}`}
            aria-label={action.id === 'fly' ? 'Bật hoặc tắt bay' : action.label}
            onPointerDown={event => activateAction(event, action.id)}
            onClick={event => activateAction(event, action.id)}
          ><ActionSprite animation={action.animation} elapsed={action.elapsed} /><span>{action.label}</span></button>)}
          <button className="combat-action combat-action--more" aria-label={`Mở trang động tác ${actionPage === 0 ? 2 : 1}`} aria-pressed={actionPage === 1} onClick={() => setActionPage(page => (page + 1) % ACTION_PAGES.length)}>
            <b aria-hidden="true">{actionPage + 1}/{ACTION_PAGES.length}</b><span>Đổi</span>
          </button>
        </div>
      </div>
      {!storyStarted && <section className="story-dialogue" role="dialog" aria-modal="true" aria-labelledby="story-title">
        <p className="story-kicker">{story.speaker}</p><h1 id="story-title">{story.title}</h1><p className="story-text">{story.text}</p>
        <footer><span>{storyIndex + 1} / {openingScenes.length}</span><button onClick={advanceStory}>{storyIndex === openingScenes.length - 1 ? 'Khai cuộc' : 'Tiếp tục'}</button></footer>
      </section>}
      {storyStarted && trial.active && <div className="puzzle-backdrop"><section ref={puzzleDialog} tabIndex={-1} className="story-dialogue maze-dialogue" role="dialog" aria-modal="true" aria-labelledby="maze-title" onKeyDown={e => {
        if (e.key !== 'Tab') return
        const buttons = [...e.currentTarget.querySelectorAll('button:not(:disabled)')]
        const first = buttons[0], last = buttons.at(-1)
        if (!first) { e.preventDefault(); return }
        if (e.shiftKey && (document.activeElement === first || document.activeElement === e.currentTarget)) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && (document.activeElement === last || document.activeElement === e.currentTarget)) { e.preventDefault(); first.focus() }
      }}>
        <p className="story-kicker">Bia đá {trial.stage + 1} / 3 · <span role="timer">Còn {Math.ceil(trial.remaining)} giây</span></p>
        <h1 id="maze-title">{puzzle.title}</h1><p>{puzzle.context}</p>
        <p className="story-text puzzle-poem">{puzzle.poem}</p><p className="puzzle-clue">{puzzle.clue}</p>
        {trial.stage < 2 ? <div className="maze-choices">{puzzle.choices.map((choice, index) => <button key={choice} disabled={trial.trapped > 0} onClick={() => chooseMaze(index)}>{choice}</button>)}</div> : <>
          <div className="bagua-disc" aria-label={`Cá Dương hướng ${trigrams[fish]}; Khảm hướng ${directions[(5 + ring) % 8]}`}>
            {trigrams.map((name, index) => <span key={name} style={{ transform: `rotate(${(index + ring) * 45}deg) translateY(-65px) rotate(${-(index + ring) * 45}deg)` }}>{name}</span>)}
            <b style={{ transform: `rotate(${(fish + ring) * 45}deg)` }}>☯ ↑</b>
          </div>
          <div className="maze-choices"><button onClick={() => setFish(value => (value + 1) % 8)}>Xoay cá Dương trắng · {trigrams[fish]}</button><button onClick={() => setRing(value => (value + 1) % 8)}>Xoay vòng ngoài · Khảm: {directions[(5 + ring) % 8]}</button><button onClick={() => chooseMaze({ fish, ring })}>Khai trận</button></div>
        </>}
        <p className="puzzle-penalty">Chọn sai / hết giờ: {puzzle.penalty}</p>
        <p className="maze-message" role="status">{trial.message}{trial.trapped > 0 ? ` · Còn bị giữ ${Math.ceil(trial.trapped)} giây` : ''}</p>
      </section></div>}
      {phase === 'complete' && <section className="story-dialogue ending-dialogue" role="dialog" aria-modal="true" aria-labelledby="ending-title">
        <p className="story-kicker">Trưởng lão Thái Huyền Tông</p><h1 id="ending-title">Trận pháp khép lại!</h1><p className="story-text">“Khóa năm vị trí đầu tiên!” Cột sáng vàng giội xuống bao bọc năm người thắng cuộc. Ta làm được rồi... con đường tu tiên của ta chính thức bắt đầu từ đây!</p>
        <footer><span>Đã bái nhập Tiên môn</span><button onClick={restartChapter}>Chơi lại chương</button></footer>
      </section>}
      {portrait && <div className="landscape-gate" role="dialog" aria-modal="true" aria-labelledby="landscape-title">
        <span aria-hidden="true">▭ ↻</span><h1 id="landscape-title">Chơi ở màn hình ngang</h1><p>Chạm để vào toàn màn hình và tự động xoay ngang.</p><button onClick={enterLandscape}>Vào game</button>
      </div>}
    </section>
  </main>
}
