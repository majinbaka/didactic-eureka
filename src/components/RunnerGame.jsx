import { useEffect, useRef, useState } from 'react'
import { createRun, raceRank, rivalsFinished, sceneryForChunk, SCENERY_CHUNK, OBSTACLES } from '../game/runner'
import { animationFrame, characterBaseline, CHARACTER_ATLAS, selectCharacterAnimation } from '../game/characterAnimations'
import { joystickInput } from '../game/runnerControls'
import { accrueOfflineQi, recordStory, breakthroughCosts, characterAge, characterLifespan, characterOption, playableCharacters, realmLabel, createInitialState, cultivationGain, elements, loadLocalSave, qiRequired, realms, saveLocal, transition } from '../game/state'
import { SUMMIT_GATE, puzzles, trigrams, directions, createTrial, answerTrial, tickTrial, stepTrialRun, openingScenes, endingScenes, prologuePhase } from '../game/prologue'
import { items, itemBlockedReason } from '../game/items'
import { collectibleCatalog, collectibleReward, RARITIES } from '../game/collectibles'
import { DECORATIVE_VARIANT_SPRITES, FLOATING_OBSTACLE_SPRITES, OBSTACLE_ATLASES, OBSTACLE_SPRITES, OBSTACLE_TYPE_SPRITES } from '../game/scenerySprites'
import PwaControls from './PwaControls'
import StorySpeech from './StorySpeech'
import CollectiblePanel from './CollectiblePanel'

const SCENERY_ASSETS = {
  background: '/assets/scenery/underworld-bamboo-v1/bamboo-forest-background.webp',
  objects: '/assets/scenery/underworld-bamboo-v1/forest-objects-atlas.webp',
  obstacles: OBSTACLE_ATLASES.classic,
  objectVariants: OBSTACLE_ATLASES.v2,
  obstacleTypes: OBSTACLE_ATLASES.types,
  floatingObstacle: '/assets/scenery/floating-obstacle-v1/floating-platform.webp',
  collectibles: '/assets/items/forest-collectibles-v1.png',
}

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

function CharacterProfile({ progress, view, onView, onClose, onAuto, onClaim, onReset, onIdentity }) {
  const dialog = useRef(null)
  useEffect(() => { dialog.current?.focus() }, [])
  const rootNames = elements.filter(element => progress.spiritRoots.includes(element.id)).map(element => element.name)
  return <section ref={dialog} tabIndex={-1} className="character-profile" role="dialog" aria-modal="true" aria-labelledby="profile-title" onKeyDown={event => { if (event.key === 'Escape') onClose() }}>
    <header className="profile-topbar"><div><small>HỒ SƠ ĐẠO HỮU</small><h1 id="profile-title">{progress.characterName}</h1></div><nav><button onClick={() => onView("collection")}>Bộ sưu tập</button><button onClick={() => onView("story")}>Cốt truyện</button><button onClick={() => onView(view === 'settings' ? 'profile' : 'settings')} aria-label="Mở cài đặt hồ sơ">⚙ Cài đặt</button><button className="profile-close" onClick={onClose} aria-label="Đóng hồ sơ">×</button></nav></header>
    {view === 'collection' ? <div className="profile-collection"><CollectiblePanel counts={progress.collectionCounts} onClose={() => onView('profile')} /></div> : view === 'story' ? <div className="profile-collection"><div className="profile-section-title"><h2>Hành trình {progress.characterName}</h2><p>Những dấu mốc đã trải qua trong lượt chơi này.</p></div><ol className="story-log">{progress.storyLog.map((entry, index) => <li key={index}>{entry}</li>)}</ol></div> : view === 'settings' ? <div className="profile-settings"><div className="profile-section-title"><small>CÀI ĐẶT</small><h2>Dữ liệu nhân vật</h2></div><article><h3>Tên và hình dáng</h3><p>Đổi tên hoặc chọn lại nhân vật đang chơi.</p><button onClick={onIdentity}>Chỉnh nhân vật</button></article><article><h3>Đặt lại hành trình</h3><p>Xóa tiến độ đang chơi trên thiết bị. Thao tác không tự xóa bản lưu mây.</p><button className="danger-action" onClick={onReset}>Đặt lại nhân vật</button></article></div> : <div className="profile-content">
      <section className="profile-hero"><div className="meditation-scene"><span className="meditation-aura" /><ActionSprite animation="sit" image={characterOption(progress).image} /><p>{progress.characterName}</p><small>{realmLabel(progress)}</small></div><div className="identity-card"><span>Linh căn</span><h2>{progress.spiritRootType === 'di' ? `Dị linh căn ${rootNames[0]}` : rootNames.length === 1 ? `Đơn linh căn ${rootNames[0]}` : progress.spiritRootType === 'phe' ? `Phế linh căn · ${rootNames.join(' · ')}` : `${rootNames.length} linh căn · ${rootNames.join(' · ')}`}</h2><p>{rootNames.length === 1 ? 'Thiên tư chuyên nhất, tốc độ hấp thu linh khí nổi trội.' : 'Đa linh căn, đường tu rộng nhưng cần nhiều thời gian hơn.'}</p><div><b>{characterAge(progress)} tuổi</b><small>Thọ nguyên {characterLifespan(progress)} tuổi</small></div></div></section>
      <section className="profile-vitals"><article><small>LINH KHÍ</small><b>{progress.qi}<i> / {qiRequired(progress.realm)}</i></b><span>+1 mỗi 15 phút nhập định</span></article><article><small>SINH LỰC</small><b>{progress.hp}<i> / {progress.maxHp}</i></b><span>Căn cốt cấp {progress.attributes.canCot}</span></article><article><small>THỜI GIAN</small><b>7 ngày</b><span>= 1 năm trong game</span></article></section>
      <section className="profile-vitals combat-stats"><article><small>TẤN CÔNG</small><b>{10 + progress.attributes.thanPhap * 2}</b><span>Thân pháp và sức đánh</span></article><article><small>PHÒNG THỦ VẬT LÝ / PHÁP</small><b>{progress.attributes.canCot * 3} / {progress.attributes.ngoTinh * 3}</b><span>Hộ thể · kháng linh lực</span></article><article><small>THẦN THỨC</small><b>{progress.attributes.ngoTinh * 2}</b><span>Ngộ tính</span></article><article><small>KỸ NĂNG ĐẶC BIỆT</small><span>{progress.realm >= 2 ? 'Chưa lĩnh ngộ' : 'Mở sau Kim Đan'}</span></article><article><small>PHÁP BẢO BẢN MỆNH</small><span>{progress.realm >= 2 ? 'Chưa luyện chế' : 'Mở sau Kim Đan'}</span></article></section><section className="profile-training"><ElementRadar progress={progress} /><div className="element-scores"><h2>Tu vi theo hệ</h2>{elements.map(element => <div key={element.id} className={progress.spiritRoots.includes(element.id) ? 'owned' : ''}><span>{element.mark} {element.name}</span><b>{progress.elementCultivation[element.id]}</b></div>)}</div><div className="auto-training"><small>TỌA THIỀN</small><h2>Tu luyện tự động</h2><p>Tự nhập định khi rời game: +1 linh khí mỗi 15 phút, tối đa 1 giờ để nhận khi trở lại.</p><button aria-pressed={progress.autoCultivate} onClick={() => onAuto(!progress.autoCultivate)}><i />{progress.autoCultivate ? 'Đang nhập định' : 'Bắt đầu nhập định'}</button><button disabled={!progress.pendingQi} onClick={onClaim}>Nhận {progress.pendingQi} linh khí đã tích</button></div></section>
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
const ACTION_PAGES = [[{ id: 'jump', label: 'Nhảy', animation: 'jump' }, { id: 'sit', label: 'Ngồi', animation: 'sit' }]]

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

function ActionSprite({ animation, elapsed = 0, image = CHARACTER_ATLAS.image }) {
  const frame = animationFrame(animation, elapsed)
  const column = frame % CHARACTER_ATLAS.columns
  const row = Math.floor(frame / CHARACTER_ATLAS.columns)
  return <b
    className="action-sprite"
    aria-hidden="true"
    style={{ backgroundImage: `url(${image})`, backgroundPosition: `${column * 100 / (CHARACTER_ATLAS.columns - 1)}% ${row * 100 / (CHARACTER_ATLAS.columns - 1)}%` }}
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

function draw(ctx, s, width, height, input, sprites, staged = false, stone = false, finish = false) {
  const ground = height - 64
  const castCenter = Math.min(width * .7, width * .5 + 100)
  const openingView = Math.min(1, Math.max(0, 1 - (s.x - 100) / 500))
  const camera = s.x - (width * .32 + (castCenter - width * .32) * openingView)
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
  if (staged) {
    const frame = animationFrame('idle', 0)
    if (finish) {
      for (let row = 0; row < 4; row++) for (let column = 0; column < 4; column++) {
        ctx.fillStyle = (row + column) % 2 ? '#dfbc7c' : '#19352b'
        ctx.fillRect(Math.round(castCenter + 30 + column * 12), ground + row * 12, 12, 12)
      }
    } else if (stone) drawObject(ctx, sprites.objects, 6, castCenter - 225, ground + 5, 70, 106)
    if (!stone) drawCharacter(ctx, sprites.elder, frame, Math.min(width - 46, castCenter + 115), ground - 70, -1)
    for (const [id, offset] of [['elder', 176], ['strongman', 132], ['bald-monk', 88], ['female', 44]]) drawCharacter(ctx, sprites.rivals[id], frame, castCenter - offset, ground + 1, 1)
    drawCharacter(ctx, sprites.character, frame, castCenter, ground + 1, 1)
    return
  }
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
  const sprites = useRef({ character: null, elder: null, background: null, objects: null, obstacles: null, objectVariants: null, obstacleTypes: null, floatingObstacle: null, collectibles: null, rivals: {} })
  const joystick = useRef(null)
  const [spriteStatus, setSpriteStatus] = useState('loading')
  const [rank, setRank] = useState(1)
  const [storyIndex, setStoryIndex] = useState(0)
  const [endingIndex, setEndingIndex] = useState(0)
  const [storyStarted, setStoryStarted] = useState(false)
  const [puzzleStep, setPuzzleStep] = useState(0)
  const puzzleStepRef = useRef(0)
  const trialRef = useRef(createTrial())
  const [trial, setTrial] = useState(createTrial)
  const [fish, setFish] = useState(3)
  const [ring, setRing] = useState(0)
  const puzzleDialog = useRef(null)
  const [phase, setPhase] = useState('forest')
  const [playerX, setPlayerX] = useState(100)
  const [joystickView, setJoystickView] = useState(null)
  const [progress, setProgress] = useState(loadLocalSave)
  const [selectingCharacter, setSelectingCharacter] = useState(true)
  const [chosenId, setChosenId] = useState(progress.characterId)
  const [chosenName, setChosenName] = useState(progress.characterName)
  const [panel, setPanel] = useState(null)
  const [notice, setNotice] = useState('Bấm vào HUD để mở tu luyện và cộng chỉ số.')
  const processedPickup = useRef(0)
  const finishedChapter = useRef(false)
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
    const update = () => setProgress(previous => { const next = accrueOfflineQi(previous); saveLocal(next); return next })
    update()
    const onVisibility = () => { if (document.visibilityState === 'visible') update() }
    document.addEventListener('visibilitychange', onVisibility)
    const timer = window.setInterval(update, 60000)
    return () => { document.removeEventListener('visibilitychange', onVisibility); window.clearInterval(timer) }
  }, [])
  useEffect(() => {
    const character = new Image(), elder = new Image(), background = new Image(), objects = new Image(), obstacles = new Image(), objectVariants = new Image(), obstacleTypes = new Image(), floatingObstacle = new Image(), collectibles = new Image()
    const rivals = Object.fromEntries(Object.keys(RIVAL_CHARACTERS).map(id => [id, new Image()]))
    sprites.current = { character, elder, background, objects, obstacles, objectVariants, obstacleTypes, floatingObstacle, collectibles, rivals }
    let loadedCount = 0
    const assetCount = 9 + Object.keys(rivals).length
    const loaded = () => { loadedCount += 1; if (loadedCount === assetCount) setSpriteStatus('ready') }
    const failed = () => setSpriteStatus('error')
    character.onload = loaded
    character.onerror = failed
    character.src = playableCharacters.find(option => option.id === progress.characterId)?.image || CHARACTER_ATLAS.image
    elder.onload = loaded
    elder.onerror = failed
    elder.src = '/assets/characters/sect-master-v1/character-sect-master-v1-sheet.png'
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
      const frozen = selectingCharacter || !storyStarted || current.active || current.trapped > 0 || rivalsFinished(run.current) || prologuePhase(run.current.x, current.stage) === 'complete'
      if (!frozen) run.current = stepTrialRun(run.current, input.current, dt, current)
      if (run.current.pickupSequence > processedPickup.current) {
        processedPickup.current = run.current.pickupSequence
        const item = run.current.lastPickup, reward = collectibleReward(item)
        setProgress(previous => {
          const next = transition(previous, { type: 'collect-runner-loot', itemId: item.id, ...reward })
          if (!saveLocal(next)) setNotice('Đã nhặt vật phẩm nhưng không lưu được trên thiết bị.')
          else setNotice(`Đã nhặt ${item.name} · +${reward.herbs || reward.stones} ${reward.herbs ? 'linh thảo' : 'linh thạch'}.`)
          return next
        })
      }
      if (storyStarted) {
        const result = tickTrial(current, run.current, dt)
        trialRef.current = result.trial; run.current = result.run; setTrial(result.trial)
        const currentRank = raceRank(result.run)
        setRank(currentRank)
        if (!finishedChapter.current && (prologuePhase(result.run.x, result.trial.stage) === 'complete' || rivalsFinished(result.run))) {
          finishedChapter.current = true
          setProgress(previous => { const next = recordStory(previous, currentRank <= 3 ? `Về đích hạng ${currentRank} Trúc Linh Phong, được nhận vào Tiên môn.` : `Về đích hạng ${currentRank}, không được nhận vào Tiên môn.`); saveLocal(next); return next })
        }
        if (!current.active && result.trial.active) { puzzleStepRef.current = 0; setPuzzleStep(0); setPanel(null) }
      }
      input.current.jump = false; input.current.action = null; input.current.actionMove = false
      const c = canvas.current, width = c.clientWidth, height = c.clientHeight
      if (c.width !== width || c.height !== height) { c.width = width; c.height = height }
      const context = c.getContext('2d'); context.imageSmoothingEnabled = false
      const atEnd = prologuePhase(run.current.x, trialRef.current.stage) === 'complete'
      const reading = trialRef.current.active && puzzleStepRef.current < puzzles[trialRef.current.stage].dialogue.length
      const atFinish = atEnd || rivalsFinished(run.current)
      draw(context, run.current, width, height, input.current, sprites.current, !storyStarted || atFinish || reading, reading, atFinish)
      setPlayerX(run.current.x)
      setPhase(rivalsFinished(run.current) && run.current.x < SUMMIT_GATE ? 'end' : prologuePhase(run.current.x, trialRef.current.stage))
      frame = requestAnimationFrame(tick)
    }
    const key = (e, down) => {
      if (e.target instanceof HTMLElement && (e.target.isContentEditable || e.target.closest('button, input, select, textarea'))) return
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'a', 'd', 'w', 's', 'Shift'].includes(e.key)) e.preventDefault()
      if (['ArrowLeft', 'a'].includes(e.key)) input.current.move = down ? -1 : input.current.move === -1 ? 0 : input.current.move
      if (['ArrowRight', 'd'].includes(e.key)) input.current.move = down ? 1 : input.current.move === 1 ? 0 : input.current.move
      if (['ArrowUp', 'w', 'k'].includes(e.key)) { input.current.up = down; if (down && !e.repeat) input.current.jump = true }
      if (e.key === 'Shift') input.current.run = down
      const actions = { s: 'sit' }
      if (down && !e.repeat && actions[e.key]) input.current.action = actions[e.key]
    }
    const down = e => key(e, true), up = e => key(e, false), reset = () => { input.current = { move: 0 } }
    window.addEventListener('keydown', down); window.addEventListener('keyup', up); window.addEventListener('blur', reset)
    frame = requestAnimationFrame(tick)
    return () => { for (const image of [character, elder, background, objects, obstacles, objectVariants, obstacleTypes, floatingObstacle, collectibles, ...Object.values(rivals)]) image.onload = image.onerror = null; cancelAnimationFrame(frame); window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', reset) }
  }, [storyStarted, selectingCharacter, progress.characterId])
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
    if (action === 'jump') input.current.jump = true
    else input.current.action = action
  }
  const activateAction = (event, action) => {
    // Pointer down preserves simultaneous joystick input; keyboard activation arrives as click detail 0.
    if (event.type === 'pointerdown' || event.detail === 0) triggerAction(action)
  }
  const progressAction = action => {
    const next = transition(progress, action)
    if (next === progress) { setNotice(action?.type === 'use-item' || action?.type === 'buy-item' ? itemBlockedReason(progress, action.id, action.type === 'buy-item') : action === 'breakthrough' ? 'Chưa đủ linh khí hoặc vật phẩm.' : 'Chưa có điểm thuộc tính.'); return }
    const recorded = action === 'breakthrough' ? recordStory(next, next.realm > progress.realm || next.qiStage > progress.qiStage || next.minorStage > progress.minorStage ? `Đột phá thành công lên ${realmLabel(next)}.` : `Đột phá thất bại tại ${realms[progress.realm]}.`) : next
    setProgress(recorded)
    if (!saveLocal(recorded)) { setNotice('Không lưu được trên thiết bị. Tiến độ chỉ còn trong phiên này.'); return }
    if (action === 'claim-offline-qi') setNotice('Đã nhận linh khí nhập định.')
    else if (action === 'cultivate') setNotice(`Mọi linh căn sở hữu +${cultivationGain(progress)} tu vi.`)
    else if (action === 'explore') setNotice('Lịch luyện nhận 8 linh thạch và 1 linh dược.')
    else if (action === 'breakthrough') setNotice(next.realm > progress.realm || next.qiStage > progress.qiStage || next.minorStage > progress.minorStage ? 'Đột phá thành công! Nhận 2 điểm thuộc tính.' : `Đột phá thất bại${progress.realm ? ', tụt một cảnh giới' : ''}.`)
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
    setChosenId(next.characterId); setChosenName(next.characterName); setSelectingCharacter(true)
    setProgress(next)
    restartChapter()
    setPanel('profile')
    setNotice(saveLocal(next) ? 'Đã tạo lại nhân vật mới.' : 'Đã tạo lại trong phiên nhưng không lưu được trên thiết bị.')
  }
  const appendStory = entry => setProgress(previous => { const next = recordStory(previous, entry); saveLocal(next); return next })
  const requiredQi = qiRequired(progress.realm)
  const story = openingScenes[storyIndex]
  const storyText = value => value.replaceAll('Vô Danh', progress.characterName)
  const advanceStory = () => {
    if (storyIndex < openingScenes.length - 1) setStoryIndex(index => index + 1)
    else { setStoryStarted(true); appendStory('Cuộc đua lên Trúc Linh Phong bắt đầu.') }
  }
  const chooseMaze = answer => {
    const result = answerTrial(trialRef.current, run.current, answer)
    trialRef.current = result.trial; run.current = result.run; setTrial(result.trial)
    input.current = { move: 0 }
    if (!result.trial.active) { if (result.trial.stage > trial.stage) appendStory(`Giải thành công bia đá ${trial.stage + 1}: ${puzzles[trial.stage].title}.`); else appendStory(`Thất bại tại bia đá ${trial.stage + 1}, chịu hình phạt và tiếp tục thử sức.`); canvas.current?.focus() }
  }
  useEffect(() => {
    if (trial.active) {
      input.current = { move: 0 }
      if (puzzleStep >= puzzles[trial.stage].dialogue.length) puzzleDialog.current?.focus()
    }
  }, [trial.active, trial.stage, puzzleStep])
  const restartChapter = () => {
    run.current = createRun(); input.current = { move: 0 }
    processedPickup.current = 0; finishedChapter.current = false
    trialRef.current = createTrial(); setTrial(trialRef.current); setFish(3); setRing(0)
    puzzleStepRef.current = 0; setPuzzleStep(0)
    setStoryIndex(0); setStoryStarted(false); setPhase('forest'); setPlayerX(100)
    setEndingIndex(0)
    setRank(1); setPanel(null); setJoystickView(null); joystick.current = null
  }
  const puzzle = puzzles[trial.stage]
  const ending = endingScenes[rank <= 3 ? 'winner' : 'defeat']
  const endingScene = ending[endingIndex]
  const selectedCharacter = playableCharacters.find(option => option.id === chosenId) || playableCharacters[0]
  const saveCharacter = event => {
    event.preventDefault()
    const next = transition(progress, { type: 'set-character', id: chosenId, name: chosenName })
    if (next === progress) { setNotice('Tên cần có từ 1 đến 24 ký tự.'); return }
    setProgress(next)
    setSelectingCharacter(false)
    setNotice(saveLocal(next) ? `Đang chơi ${next.characterName}.` : 'Đã chọn nhân vật nhưng không lưu được trên thiết bị.')
  }
  return <main className="runner-shell">
    <section className="runner-frame" aria-label="Trúc Linh Phong, chương mở đầu Tu Tiên Loạn Giới">
      {spriteStatus !== 'ready' && <p className="runner-loading" role="status">{spriteStatus === 'error' ? 'Không tải được cảnh Rừng Trúc. Hãy tải lại trang để thử lại.' : 'Đang tải Rừng Trúc U Tinh…'}</p>}
      {selectingCharacter && <div className="character-select-backdrop"><form className="character-select" onSubmit={saveCharacter} aria-labelledby="character-select-title">
        <h1 id="character-select-title">Chọn nhân vật</h1><p>Chọn diện mạo và viết tên cho hành trình của bạn.</p>
        <div className="character-choices" role="group" aria-label="Nhân vật sẵn có">{playableCharacters.map(option => <button type="button" key={option.id} className={chosenId === option.id ? 'selected' : ''} aria-pressed={chosenId === option.id} onClick={() => { setChosenId(option.id); setChosenName(option.name) }}><img src={option.preview} alt="" /><strong>{option.name}</strong><small>{option.age} tuổi · thọ nguyên {option.lifespan}</small></button>)}</div>
        <label htmlFor="character-name">Tên nhân vật</label><input id="character-name" autoFocus maxLength={24} value={chosenName} onChange={event => setChosenName(event.target.value)} required />
        <p className="character-selection-summary">{selectedCharacter.age} tuổi · thọ nguyên {selectedCharacter.lifespan} tuổi</p><button className="character-confirm" type="submit">Bắt đầu hành trình</button>
      </form></div>}
      <div className="runner-hud cultivation-hud">
        <div className="hud-sidebar">
          <button className="hud-avatar" onClick={() => setPanel('profile')} aria-label="Mở hồ sơ nhân vật"><img src={characterOption(progress).preview} alt="" /><span><b>{progress.characterName}</b><small>HỒ SƠ</small></span></button>
          <button className="inventory-toggle" aria-label="Mở hành trang" aria-expanded={panel === 'items'} onClick={() => { setNotice(''); setPanel(panel === 'items' ? null : 'items') }}><img src="/assets/ui/inventory-bag-v1.png" alt="" /></button>
        </div>
        <div className="hud-vitals"><button onClick={() => setPanel(panel === 'stats' ? null : 'stats')}><span>♥ {progress.hp}/{progress.maxHp}</span><i><b style={{ width: `${progress.hp / progress.maxHp * 100}%` }} /></i><small>MÁU · CHỈ SỐ</small></button><button onClick={() => setPanel(panel === 'stats' ? null : 'stats')}><span>◆ {progress.stones}</span><small>LINH THẠCH</small></button><button onClick={() => setPanel(panel === 'collectibles' ? null : 'collectibles')}><span>❋ {progress.herbs}</span><small>LINH THẢO</small></button><button onClick={() => setPanel(panel === 'roots' ? null : 'roots')}><span>✦ {progress.qi}/{requiredQi}</span><i><b style={{ width: `${progress.qi / requiredQi * 100}%` }} /></i><small>LINH KHÍ</small></button></div>
      </div>
      {panel === 'collectibles' ? <CollectiblePanel counts={progress.collectionCounts} onClose={() => setPanel(null)} /> : ['items', 'stats', 'roots'].includes(panel) && <ProgressPanel mode={panel} progress={progress} notice={notice} onAction={progressAction} onClose={() => setPanel(null)} />}
      {['profile', 'collection', 'story', 'settings'].includes(panel) && <CharacterProfile progress={progress} view={panel} onView={setPanel} onClose={() => setPanel(null)} onAuto={setAutoCultivate} onClaim={() => progressAction('claim-offline-qi')} onReset={resetProgress} onIdentity={() => { setChosenId(progress.characterId); setChosenName(progress.characterName); setPanel(null); setSelectingCharacter(true) }} />}
      <canvas ref={canvas} tabIndex={0} aria-label="Rừng Trúc U Tinh. Mũi tên hoặc A D để đi, giữ Shift để chạy, W để nhảy qua hoặc lên bậc đá, S để ngồi."
        onPointerDown={e => { e.currentTarget.focus(); e.currentTarget.setPointerCapture(e.pointerId); gesture.current = { x: e.clientX, y: e.clientY } }}
        onPointerUp={e => { const g = gesture.current; if (!g) return; if (e.clientY - g.y < -30) input.current.jump = true; gesture.current = null }} onPointerCancel={() => { gesture.current = null }} />
      <div className="arena-label">TRÚC LINH PHONG <span>{phase === 'summit' ? 'Vân Tích Bộ · Bứt phá lên đỉnh' : 'Rừng Trúc U Tinh · Thử thách nhập môn'}</span></div>
      {storyStarted && phase !== 'complete' && <div className="chapter-progress" aria-label="Tiến độ chương"><i style={{ width: `${Math.min(100, Math.max(0, (playerX - 100) / (SUMMIT_GATE - 100) * 100))}%` }} /></div>}
      <p className="runner-status" role="status">{storyStarted && `Hạng ${rank}/5 · ${trial.slow > 0 ? `Độc Bão ${Math.ceil(trial.slow)}s · ` : ''}`}{trial.message} {phase === 'forest' ? 'W / nút Nhảy · Vượt bậc đá' : phase === 'summit' ? 'Uy áp Linh Phong · Tiến lên viên gạch cuối cùng!' : ''}</p>
      <div className="game-pwa"><PwaControls /></div>
      <div className="runner-controls" aria-label="Điều khiển">
        <div className="joystick-zone" role="group" aria-label="Giữ rồi vuốt sang trái hoặc phải để di chuyển. Vuốt xa để chạy." tabIndex={0}
          onPointerDown={startJoystick} onPointerMove={updateJoystick} onPointerUp={stopJoystick} onPointerCancel={stopJoystick}>
          <span className="joystick-hint" aria-hidden="true">GIỮ &amp; VUỐT<small>Di chuyển</small></span>
          {joystickView && <span className="joystick-base" aria-hidden="true" style={{ left: joystickView.x, top: joystickView.y }}><i style={{ transform: `translate(${joystickView.knobX}px, ${joystickView.knobY}px)` }} /></span>}
        </div>
        <div className="combat-pad combat-pad--initial" role="group" aria-label="Động tác cơ bản">
          {ACTION_PAGES[0].map(action => <button key={action.id} className={`combat-action combat-action--${action.id}`} onPointerDown={event => activateAction(event, action.id)} onClick={event => activateAction(event, action.id)}><ActionSprite animation={action.animation} image={characterOption(progress).image} /><span>{action.label}</span></button>)}
        </div>
      </div>
      {!storyStarted && !selectingCharacter && storyIndex === 0 && <section className="story-dialogue" role="dialog" aria-modal="true" aria-labelledby="story-title" onKeyDown={e => { if (e.key === 'Tab') { e.preventDefault(); e.currentTarget.querySelector('button').focus() } }}>
        <p className="story-kicker">{storyText(story.speaker)}</p><h1 id="story-title">{story.title}</h1><p className="story-text">{storyText(story.text)}</p>
        <footer><span>{storyIndex + 1} / {openingScenes.length}</span><button autoFocus onClick={advanceStory}>{storyIndex === openingScenes.length - 1 ? 'Khai cuộc' : 'Tiếp tục'}</button></footer>
      </section>}
      {!storyStarted && !selectingCharacter && storyIndex > 0 && <StorySpeech scene={story} name={progress.characterName} rank={rank} position={storyIndex + 1} total={openingScenes.length} onNext={advanceStory} nextLabel={storyIndex === openingScenes.length - 1 ? 'Khai cuộc' : 'Tiếp tục'} />}
      {storyStarted && trial.active && puzzleStep < puzzle.dialogue.length && <StorySpeech scene={{ ...puzzle.dialogue[puzzleStep], title: puzzle.title }} name={progress.characterName} rank={rank} position={puzzleStep + 1} total={puzzle.dialogue.length} onNext={() => { puzzleStepRef.current += 1; setPuzzleStep(puzzleStepRef.current) }} nextLabel={puzzleStep === puzzle.dialogue.length - 1 ? 'Đọc câu đố' : 'Tiếp tục'} />}
      {storyStarted && trial.active && puzzleStep >= puzzle.dialogue.length && <div className="puzzle-backdrop"><section ref={puzzleDialog} tabIndex={-1} className="story-dialogue maze-dialogue" role="dialog" aria-modal="true" aria-labelledby="maze-title" onKeyDown={e => {
        if (e.key !== 'Tab') return
        const buttons = [...e.currentTarget.querySelectorAll('button:not(:disabled)')]
        const first = buttons[0], last = buttons.at(-1)
        if (!first) { e.preventDefault(); return }
        if (e.shiftKey && (document.activeElement === first || document.activeElement === e.currentTarget)) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && (document.activeElement === last || document.activeElement === e.currentTarget)) { e.preventDefault(); first.focus() }
      }}>
        <p className="story-kicker">Bia đá {trial.stage + 1} / 3 · <span role="timer">Còn {Math.ceil(trial.remaining)} giây</span></p>
        <h1 id="maze-title">{puzzle.title}</h1>
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
      {phase === 'complete' && <StorySpeech scene={endingScene} name={progress.characterName} rank={rank} position={endingIndex + 1} total={ending.length} onNext={() => endingIndex < ending.length - 1 ? setEndingIndex(index => index + 1) : restartChapter()} nextLabel={endingIndex < ending.length - 1 ? 'Tiếp tục' : 'Chơi lại chương'} />}
      {phase === 'end' && <StorySpeech scene={{ speaker: 'Trưởng lão Thái Huyền Tông', title: 'Cuộc đua khép lại', text: 'Bốn người kia đã chạm cổng trước ngươi. Lượt tuyển này khép lại; hãy nhớ con đường và thử sức lần nữa.' }} name={progress.characterName} rank={5} position={1} total={1} onNext={restartChapter} nextLabel="Chơi lại chương" />}
      {portrait && <div className="landscape-gate" role="dialog" aria-modal="true" aria-labelledby="landscape-title">
        <span aria-hidden="true">▭ ↻</span><h1 id="landscape-title">Chơi ở màn hình ngang</h1><p>Chạm để vào toàn màn hình và tự động xoay ngang.</p><button onClick={enterLandscape}>Vào game</button>
      </div>}
    </section>
  </main>
}
