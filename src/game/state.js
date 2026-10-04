import { newCultivation, validCultivation, cultivationAction, cultivationAmount } from './cultivation.js'
export const SAVE_KEY = 'loan-gioi:save:v3'
export const LEGACY_SAVE_KEY = 'loan-gioi:save:v1'
export const realms = ['Luyện Khí', 'Trúc Cơ', 'Kim Đan', 'Nguyên Anh', 'Hóa Thần', 'Độ Kiếp', 'Đại Thừa']
export const elements = [
  { id: 'kim', name: 'Kim', mark: '金' }, { id: 'moc', name: 'Mộc', mark: '木' },
  { id: 'thuy', name: 'Thủy', mark: '水' }, { id: 'hoa', name: 'Hỏa', mark: '火' },
  { id: 'tho', name: 'Thổ', mark: '土' },
]
export const breakthroughCosts = [
  { stones: 20, herbs: 2, chance: .85 }, { stones: 45, herbs: 5, chance: .7 },
  { stones: 90, herbs: 10, chance: .55 }, { stones: 180, herbs: 20, chance: .4 }, { stones: 300, herbs: 30, chance: .3 }, { stones: 450, herbs: 45, chance: .2 },
]
export const qiRequired = realm => 100 * (realm + 1)
const safe = value => Number.isSafeInteger(value) && value >= 0 && value <= 1000000000

export function rollSpiritRoots(random = Math.random) {
  const roll = random()
  const count = roll < .45 ? 1 : roll < .75 ? 2 : roll < .9 ? 3 : roll < .97 ? 4 : 5
  const pool = elements.map(element => element.id), roots = []
  while (roots.length < count) roots.push(pool.splice(Math.floor(random() * pool.length), 1)[0])
  return roots
}
export function createInitialState(random = Math.random) {
  return { version: 3, cultivation: newCultivation(), realm: 0, qi: 0, stones: 30, herbs: 2, journeys: 0, hp: 100, maxHp: 100, attributePoints: 0,
    attributes: { canCot: 1, ngoTinh: 1, thanPhap: 1 }, spiritRoots: rollSpiritRoots(random),
    elementCultivation: { kim: 0, moc: 0, thuy: 0, hoa: 0, tho: 0 } }
}
export const initialState = createInitialState(() => 0)
export function isValidSave(value) {
  return value?.version === 3 && validCultivation(value.cultivation) && Number.isInteger(value.realm) && value.realm >= 0 && value.realm < realms.length &&
    ['qi', 'stones', 'herbs', 'journeys', 'hp', 'maxHp', 'attributePoints'].every(key => safe(value[key])) && value.maxHp >= 1 && value.hp <= value.maxHp && value.qi <= qiRequired(value.realm) &&
    ['canCot', 'ngoTinh', 'thanPhap'].every(key => safe(value.attributes?.[key]) && value.attributes[key] >= 1) &&
    Array.isArray(value.spiritRoots) && value.spiritRoots.length >= 1 && value.spiritRoots.length <= 5 && new Set(value.spiritRoots).size === value.spiritRoots.length && value.spiritRoots.every(root => elements.some(element => element.id === root)) &&
    elements.every(element => safe(value.elementCultivation?.[element.id]))
}
export function migrateSave(value, random = Math.random) {
  if (isValidSave(value)) return value
  if (value?.version === 2) { const next = { ...value, version: 3, cultivation: newCultivation() }; return isValidSave(next) ? next : null }
  if (value?.version !== 1) return null
  const next = { ...createInitialState(random), realm: value.realm, qi: value.qi, stones: value.stones, herbs: value.herbs, journeys: value.journeys }
  return isValidSave(next) ? next : null
}
export function loadLocalSave(random = Math.random) {
  for (const key of [SAVE_KEY, 'loan-gioi:save:v2', LEGACY_SAVE_KEY]) {
    try { const value = migrateSave(JSON.parse(localStorage.getItem(key)), random); if (value) { saveLocal(value); return value } } catch { /* Try an older save without deleting the original. */ }
  }
  return createInitialState(random)
}
export function saveLocal(state) { if (!isValidSave(state)) return false; try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); return true } catch { return false } }
export const cultivationGain = cultivationAmount
export function transition(state, action, random = Math.random) {
  const result = cultivationAction(state, action, random)
  if (result !== null) return isValidSave(result) ? result : state
  if (action?.type === 'increase-attribute') {
    if (!['canCot', 'ngoTinh', 'thanPhap'].includes(action.attribute) || !state.attributePoints || state.attributes[action.attribute] >= 1000) return state
    const constitution = action.attribute === 'canCot'
    const next = { ...state, attributePoints: state.attributePoints - 1, attributes: { ...state.attributes, [action.attribute]: state.attributes[action.attribute] + 1 }, maxHp: state.maxHp + (constitution ? 10 : 0), hp: state.hp + (constitution ? 10 : 0) }
    return isValidSave(next) ? next : state
  }

  return state
}
