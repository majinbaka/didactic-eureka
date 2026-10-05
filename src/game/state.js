import { createInventory, validInventory, itemTransition } from './items.js'
export const SAVE_KEY = 'loan-gioi:save:v5'
export const V4_SAVE_KEY = 'loan-gioi:save:v4'
export const PREVIOUS_SAVE_KEY = 'loan-gioi:save:v3'
export const LEGACY_SAVE_KEY = 'loan-gioi:save:v1'
export const V2_SAVE_KEY = 'loan-gioi:save:v2'
export const realms = ['Luyện Khí', 'Trúc Cơ', 'Kim Đan', 'Nguyên Anh', 'Hóa Thần']
export const realmLifespans = [60, 100, 180, 300, 500]
export const YEAR_MS = 7 * 24 * 60 * 60 * 1000
export const elements = [
  { id: 'kim', name: 'Kim', mark: '金' }, { id: 'moc', name: 'Mộc', mark: '木' },
  { id: 'thuy', name: 'Thủy', mark: '水' }, { id: 'hoa', name: 'Hỏa', mark: '火' },
  { id: 'tho', name: 'Thổ', mark: '土' },
]
export const breakthroughCosts = [
  { stones: 20, herbs: 2, chance: .85 }, { stones: 45, herbs: 5, chance: .7 },
  { stones: 90, herbs: 10, chance: .55 }, { stones: 180, herbs: 20, chance: .4 },
]
export const qiRequired = realm => 100 * (realm + 1)
const safe = value => Number.isSafeInteger(value) && value >= 0 && value <= 1000000000
const safeTimestamp = value => Number.isSafeInteger(value) && value >= 0 && value <= Number.MAX_SAFE_INTEGER

export function rollSpiritRootProfile(random = Math.random) {
  const roll = random()
  const count = roll < .01 ? 1 : roll < .02 ? 1 : roll < .12 ? 2 : roll < .42 ? 3 : 4
  const pool = elements.map(element => element.id), roots = []
  while (roots.length < count) roots.push(pool.splice(Math.floor(random() * pool.length), 1)[0])
  return { roots, type: roll < .01 ? 'don' : roll < .02 ? 'di' : count === 4 ? 'phe' : 'thuong' }
}
export const rollSpiritRoots = random => rollSpiritRootProfile(random).roots
export function createInitialState(random = Math.random, now = Date.now()) {
  const rootProfile = rollSpiritRootProfile(random)
  return { version: 5, inventory: createInventory(), realm: 0, qi: 0, stones: 0, herbs: 0, journeys: 0, hp: 100, maxHp: 100, attributePoints: 0,
    bornAt: now, autoCultivate: true, lastSeenAt: now, pendingQi: 0, collectionCounts: {}, storyLog: [],
    attributes: { canCot: 1, ngoTinh: 1, thanPhap: 1 }, spiritRoots: rootProfile.roots, spiritRootType: rootProfile.type,
    elementCultivation: { kim: 0, moc: 0, thuy: 0, hoa: 0, tho: 0 } }
}
export const initialState = createInitialState(() => 0, 0)
export function isValidSave(value) {
  return value?.version === 5 && validInventory(value.inventory) && Number.isInteger(value.realm) && value.realm >= 0 && value.realm < realms.length &&
    safeTimestamp(value.bornAt) && safeTimestamp(value.lastSeenAt) && safe(value.pendingQi) && typeof value.autoCultivate === 'boolean' && ['don', 'di', 'phe', 'thuong'].includes(value.spiritRootType) && Array.isArray(value.storyLog) && value.storyLog.length <= 500 && value.storyLog.every(entry => typeof entry === 'string' && entry.length <= 300) && value.collectionCounts && Object.keys(value.collectionCounts).length <= 100 && Object.values(value.collectionCounts).every(safe) &&
    ['qi', 'stones', 'herbs', 'journeys', 'hp', 'maxHp', 'attributePoints'].every(key => safe(value[key])) && value.maxHp >= 1 && value.hp <= value.maxHp && value.qi <= qiRequired(value.realm) &&
    ['canCot', 'ngoTinh', 'thanPhap'].every(key => safe(value.attributes?.[key]) && value.attributes[key] >= 1) &&
    Array.isArray(value.spiritRoots) && value.spiritRoots.length >= 1 && value.spiritRoots.length <= 5 && new Set(value.spiritRoots).size === value.spiritRoots.length && value.spiritRoots.every(root => elements.some(element => element.id === root)) &&
    elements.every(element => safe(value.elementCultivation?.[element.id]))
}
export function migrateSave(value, random = Math.random, now = Date.now()) {
  if (isValidSave(value)) return value
  if (value?.version === 4) {
    const next = { ...value, version: 5, spiritRootType: value.spiritRoots.length === 4 ? 'phe' : 'thuong', lastSeenAt: now, pendingQi: 0, collectionCounts: {}, storyLog: [] }
    return isValidSave(next) ? next : null
  }
  if (value?.version === 3) {
    const next = { ...value, version: 5, spiritRootType: value.spiritRoots.length === 4 ? 'phe' : 'thuong', bornAt: now, autoCultivate: false, lastSeenAt: now, pendingQi: 0, collectionCounts: {}, storyLog: [] }
    return isValidSave(next) ? next : null
  }
  if (value?.version === 2) {
    const next = { ...value, version: 5, spiritRootType: value.spiritRoots.length === 4 ? 'phe' : 'thuong', inventory: createInventory(), bornAt: now, autoCultivate: false, lastSeenAt: now, pendingQi: 0, collectionCounts: {}, storyLog: [] }
    return isValidSave(next) ? next : null
  }
  if (value?.version !== 1) return null
  const next = { ...createInitialState(random, now), realm: value.realm, qi: value.qi, stones: value.stones, herbs: value.herbs, journeys: value.journeys }
  return isValidSave(next) ? next : null
}
export function loadLocalSave(random = Math.random) {
  for (const key of [SAVE_KEY, V4_SAVE_KEY, PREVIOUS_SAVE_KEY, V2_SAVE_KEY, LEGACY_SAVE_KEY]) {
    try {
      const migrated = migrateSave(JSON.parse(localStorage.getItem(key)), random)
      if (migrated) { if (key !== SAVE_KEY) saveLocal(migrated); return migrated }
    } catch { /* Thử bản lưu cũ mà không xóa dữ liệu. */ }
  }
  return createInitialState(random)
}
export function saveLocal(state) { if (!isValidSave(state)) return false; try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); return true } catch { return false } }
export const cultivationGain = state => Math.max(2, Math.floor((10 + state.attributes.ngoTinh - 1) / state.spiritRoots.length)) + (state.inventory.jadeActive ? 2 : 0)
export const qiRecoveryRate = () => 1
export const AUTO_QI_INTERVAL = 15 * 60 * 1000
export const OFFLINE_QI_CAP = 4
export function accrueOfflineQi(state, now = Date.now()) {
  const elapsed = Math.max(0, now - state.lastSeenAt)
  const earned = state.autoCultivate ? Math.min(OFFLINE_QI_CAP, Math.floor(elapsed / AUTO_QI_INTERVAL)) : 0
  return { ...state, lastSeenAt: state.autoCultivate ? Math.min(now, state.lastSeenAt + Math.floor(elapsed / AUTO_QI_INTERVAL) * AUTO_QI_INTERVAL) : now, pendingQi: Math.min(OFFLINE_QI_CAP, state.pendingQi + earned) }
}
export function recordStory(state, entry) {
  if (!entry || state.storyLog.at(-1) === entry) return state
  return { ...state, storyLog: [...state.storyLog, entry].slice(-500) }
}
export const characterAge = (state, now = Date.now()) => 15 + Math.max(0, Math.floor((now - state.bornAt) / YEAR_MS))
export const characterLifespan = state => realmLifespans[state.realm]
export function transition(state, action, random = Math.random) {
  if (action?.type === 'use-item' || action?.type === 'buy-item') return itemTransition(state, action)
  if (action?.type === 'collect-runner-loot') {
    const herbs = safe(action.herbs) ? action.herbs : 0, stones = safe(action.stones) ? action.stones : 0
    if (!herbs && !stones) return state
    return { ...state, herbs: Math.min(1000000000, state.herbs + herbs), stones: Math.min(1000000000, state.stones + stones), collectionCounts: action.itemId ? { ...state.collectionCounts, [action.itemId]: Math.min(1000000000, (state.collectionCounts[action.itemId] || 0) + 1) } : state.collectionCounts }
  }
  if (action?.type === 'set-auto-cultivate') return { ...state, autoCultivate: Boolean(action.enabled) }
  if (action === 'claim-offline-qi') {
    if (!state.pendingQi) return state
    const gain = Math.min(state.pendingQi, qiRequired(state.realm) - state.qi)
    const elementCultivation = { ...state.elementCultivation }
    for (const root of state.spiritRoots) elementCultivation[root] += gain
    return { ...state, qi: state.qi + gain, pendingQi: 0, elementCultivation }
  }
  if (action === 'cultivate') {
    const gain = cultivationGain(state), elementCultivation = { ...state.elementCultivation }
    for (const root of state.spiritRoots) elementCultivation[root] += gain
    return { ...state, qi: Math.min(qiRequired(state.realm), state.qi + gain), elementCultivation }
  }
  if (action === 'explore') return { ...state, stones: state.stones + 8, herbs: state.herbs + 1, journeys: state.journeys + 1 }
  if (action?.type === 'increase-attribute') {
    if (!['canCot', 'ngoTinh', 'thanPhap'].includes(action.attribute) || !state.attributePoints) return state
    const constitution = action.attribute === 'canCot'
    return { ...state, attributePoints: state.attributePoints - 1, attributes: { ...state.attributes, [action.attribute]: state.attributes[action.attribute] + 1 }, maxHp: state.maxHp + (constitution ? 10 : 0), hp: state.hp + (constitution ? 10 : 0) }
  }
  if (action === 'breakthrough') {
    if (state.realm >= realms.length - 1 || state.qi < qiRequired(state.realm)) return state
    const cost = breakthroughCosts[state.realm]; if (state.stones < cost.stones || state.herbs < cost.herbs) return state
    const paid = { ...state, stones: state.stones - cost.stones, herbs: state.herbs - cost.herbs, qi: 0 }
    return random() < cost.chance ? { ...paid, realm: state.realm + 1, attributePoints: state.attributePoints + 2, hp: state.maxHp } : { ...paid, realm: Math.max(0, state.realm - 1), hp: Math.max(1, Math.floor(state.hp * .7)) }
  }
  return state
}
