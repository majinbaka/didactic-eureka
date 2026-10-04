export const RARITIES = {
  common: { name: 'Phổ thông', color: '#b7c493' },
  uncommon: { name: 'Ít gặp', color: '#79c9a5' },
  rare: { name: 'Quý hiếm', color: '#78aee8' },
  epic: { name: 'Cực phẩm', color: '#c68bea' },
}

export const collectibleCatalog = [
  { id: 'thanh-truc-diep', name: 'Thanh Trúc Diệp', kind: 'herb', rarity: 'common', sprite: 0, description: 'Lá trúc ngậm linh khí sớm mai.' },
  { id: 'ngung-suong-thao', name: 'Ngưng Sương Thảo', kind: 'herb', rarity: 'common', sprite: 1, description: 'Cỏ mảnh kết giọt sương mát lạnh.' },
  { id: 'xich-duong-hoa', name: 'Xích Dương Hoa', kind: 'herb', rarity: 'uncommon', sprite: 2, description: 'Đóa hoa đỏ ấm mọc nơi có nắng.' },
  { id: 'u-minh-co', name: 'U Minh Cô', kind: 'herb', rarity: 'uncommon', sprite: 3, description: 'Nấm lam phát sáng dưới bóng trúc.' },
  { id: 'bach-ngoc-sam', name: 'Bạch Ngọc Sâm', kind: 'herb', rarity: 'rare', sprite: 4, description: 'Linh sâm trắng có rễ như ngọc.' },
  { id: 'tu-van-chi', name: 'Tử Vân Chi', kind: 'herb', rarity: 'epic', sprite: 5, description: 'Linh chi tím chỉ hiện giữa mây núi.' },
  { id: 'thanh-linh-thach', name: 'Thanh Linh Thạch', kind: 'stone', rarity: 'common', sprite: 6, description: 'Tinh thạch xanh dùng trong tu luyện.' },
  { id: 'tu-tinh-thach', name: 'Tử Tinh Thạch', kind: 'stone', rarity: 'rare', sprite: 7, description: 'Tinh thể tím cô đọng linh lực mạnh.' },
]

const FIRST_STAGE_SPAWNS = [
  ['thanh-truc-diep', 270], ['ngung-suong-thao', 540], ['thanh-linh-thach', 680],
  ['xich-duong-hoa', 910], ['thanh-truc-diep', 1320], ['u-minh-co', 1600],
  ['thanh-linh-thach', 1900], ['bach-ngoc-sam', 2180], ['ngung-suong-thao', 2580],
  ['tu-tinh-thach', 2820], ['tu-van-chi', 2940],
]

export const STAGE_COLLECTIBLES = {
  'rung-truc-u-tinh': {
    name: 'Rừng Trúc U Tinh',
    itemIds: collectibleCatalog.map(item => item.id),
    spawns: FIRST_STAGE_SPAWNS,
  },
}

export function createStageCollectibles(stageId = 'rung-truc-u-tinh') {
  const stage = STAGE_COLLECTIBLES[stageId]
  if (!stage) return []
  return stage.spawns.map(([itemId, x], index) => ({ id: `${stageId}-${index}`, itemId, x, collected: false }))
}

export function collectNearby(collectibles, playerX, radius = 42) {
  let collected = null
  const next = collectibles.map(item => {
    if (collected || item.collected || Math.abs(item.x - (playerX + 64)) > radius) return item
    collected = collectibleCatalog.find(entry => entry.id === item.itemId) ?? null
    return collected ? { ...item, collected: true } : item
  })
  return { collectibles: next, collected }
}

export function collectibleReward(item) {
  if (!item) return { herbs: 0, stones: 0 }
  if (item.kind === 'herb') return { herbs: item.rarity === 'epic' ? 2 : 1, stones: 0 }
  return { herbs: 0, stones: item.rarity === 'rare' ? 3 : 1 }
}
