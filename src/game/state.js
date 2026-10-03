export const SAVE_KEY = 'loan-gioi:save:v2'
export const LEGACY_SAVE_KEY = 'loan-gioi:save:v1'
export const SAVE_VERSION = 2
export const realms = ['Luyện Khí', 'Trúc Cơ', 'Kim Đan', 'Nguyên Anh', 'Hóa Thần']
export const elements = [
  { id: 'kim', name: 'Kim', mark: '金' }, { id: 'moc', name: 'Mộc', mark: '木' },
  { id: 'thuy', name: 'Thủy', mark: '水' }, { id: 'hoa', name: 'Hỏa', mark: '火' },
  { id: 'tho', name: 'Thổ', mark: '土' },
]
export const qiRequired = realm => 100 * (realm + 1)
export const breakthroughCosts = [
  { stones: 20, herbs: 2, chance: .85 }, { stones: 45, herbs: 5, chance: .7 },
  { stones: 90, herbs: 10, chance: .55 }, { stones: 180, herbs: 20, chance: .4 },
]
const safeInteger = value => Number.isSafeInteger(value) && value >= 0 && value <= 1000000000

export function rollSpiritRoots(random = Math.random) {
  const roll = random()
  const count = roll < .45 ? 1 : roll < .75 ? 2 : roll < .9 ? 3 : roll < .97 ? 4 : 5
  const pool = elements.map(element => element.id)
  const roots = []
  while (roots.length < count) roots.push(pool.splice(Math.floor(random() * pool.length), 1)[0])
  return roots
}

export function createInitialState(random = Math.random) {
  return {
    version: SAVE_VERSION, realm: 0, qi: 0, stones: 30, herbs: 2, journeys: 0,
    hp: 100, maxHp: 100, attributePoints: 0,
    attributes: { canCot: 1, ngoTinh: 1, thanPhap: 1 },
    spiritRoots: rollSpiritRoots(random),
    elementCultivation: { kim: 0, moc: 0, thuy: 0, hoa: 0, tho: 0 },
  }
}

// Export cố định cho test; ván chơi mới luôn gọi createInitialState để random linh căn.
export const initialState = createInitialState(() => 0)

export function migrateSave(value, random = Math.random) {
  if (value?.version === SAVE_VERSION) return value
  if (value?.version !== 1) return null
  const migrated = { ...createInitialState(random), realm: value.realm, qi: value.qi, stones: value.stones, herbs: value.herbs, journeys: value.journeys }
  return isValidSave(migrated) ? migrated : null
}

export function isValidSave(value) {
  if (value?.version !== SAVE_VERSION || !Number.isInteger(value.realm) || value.realm < 0 || value.realm >= realms.length) return false
  if (!['qi', 'stones', 'herbs', 'journeys', 'hp', 'maxHp', 'attributePoints'].every(key => safeInteger(value[key]))) return false
  if (value.qi > qiRequired(value.realm) || value.maxHp < 1 || value.hp > value.maxHp) return false
  if (!value.attributes || !['canCot', 'ngoTinh', 'thanPhap'].every(key => safeInteger(value.attributes[key]) && value.attributes[key] >= 1)) return false
  if (!Array.isArray(value.spiritRoots) || value.spiritRoots.length < 1 || value.spiritRoots.length > elements.length || new Set(value.spiritRoots).size !== value.spiritRoots.length) return false
  if (!value.spiritRoots.every(root => elements.some(element => element.id === root))) return false
  return Boolean(value.elementCultivation) && elements.every(element => safeInteger(value.elementCultivation[element.id]))
}

export function loadLocalSave(random = Math.random) {
  try {
    const current = JSON.parse(localStorage.getItem(SAVE_KEY))
    if (isValidSave(current)) return current
    const legacy = migrateSave(JSON.parse(localStorage.getItem(LEGACY_SAVE_KEY)), random)
    if (legacy) { saveLocal(legacy); return legacy }
  } catch { /* Bản lưu lỗi sẽ bắt đầu hành trình an toàn. */ }
  return createInitialState(random)
}

export function saveLocal(state) {
  if (!isValidSave(state)) return false
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); return true } catch { return false }
}

export const cultivationGain = state => Math.max(2, Math.floor((10 + state.attributes.ngoTinh - 1) / state.spiritRoots.length))

export function transition(state, action, random = Math.random) {
  if (action === 'cultivate') {
    const gain = cultivationGain(state)
    const elementCultivation = { ...state.elementCultivation }
    for (const root of state.spiritRoots) elementCultivation[root] += gain
    return { ...state, qi: Math.min(qiRequired(state.realm), state.qi + gain), elementCultivation }
  }
  if (action === 'explore') return { ...state, stones: state.stones + 8, herbs: state.herbs + 1, journeys: state.journeys + 1 }
  if (typeof action === 'object' && action.type === 'increase-attribute') {
    if (!['canCot', 'ngoTinh', 'thanPhap'].includes(action.attribute) || state.attributePoints < 1) return state
    const attributes = { ...state.attributes, [action.attribute]: state.attributes[action.attribute] + 1 }
    const maxHp = action.attribute === 'canCot' ? state.maxHp + 10 : state.maxHp
    return { ...state, attributes, attributePoints: state.attributePoints - 1, maxHp, hp: action.attribute === 'canCot' ? state.hp + 10 : state.hp }
  }
  if (action === 'breakthrough') {
    if (state.realm >= realms.length - 1 || state.qi < qiRequired(state.realm)) return state
    const cost = breakthroughCosts[state.realm]
    if (state.stones < cost.stones || state.herbs < cost.herbs) return state
    const paid = { ...state, stones: state.stones - cost.stones, herbs: state.herbs - cost.herbs }
    if (random() < cost.chance) return { ...paid, realm: state.realm + 1, qi: 0, attributePoints: state.attributePoints + 2, hp: state.maxHp }
    const realm = Math.max(0, state.realm - 1)
    return { ...paid, realm, qi: 0, hp: Math.max(1, Math.floor(state.hp * .7)) }
  }
  return state
}
