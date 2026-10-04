// Pure progression and combat rules. No clock, UI, or storage dependencies.
export const generating = { kim: 'thuy', thuy: 'moc', moc: 'hoa', hoa: 'tho', tho: 'kim' }
export const overcoming = { kim: 'moc', moc: 'tho', tho: 'thuy', thuy: 'hoa', hoa: 'kim' }
export const mutations = { loi: 'Lôi', bang: 'Băng', phong: 'Phong', am: 'Âm', duong: 'Dương' }
export const newCultivation = () => ({ layer: 1, strength: 1, mind: 1, will: 1, luck: 1, toxicity: 0, karma: 0, bound: 0, pill: 0, wound: 0, mutation: '', wave: 0, total: 0, trialHp: 0, trialMp: 0, rebirth: 0 })
export const systemLimits = { layer: [1, 9], strength: [1, 1000], mind: [1, 1000], will: [1, 1000], luck: [1, 1000], toxicity: [0, 100], karma: [0, 100], bound: [0, 20], pill: [0, 3], wound: [0, 10], wave: [0, 9], total: [0, 9], trialHp: [0, 1000000000], trialMp: [0, 1000000000], rebirth: [0, 1] }
export function validCultivation(c) {
  return c && Object.keys(c).length === Object.keys(systemLimits).length + 1 && Object.entries(systemLimits).every(([k, [lo, hi]]) => Number.isInteger(c[k]) && c[k] >= lo && c[k] <= hi) && ['', ...Object.keys(mutations)].includes(c.mutation) && (c.wave === 0 ? c.total === 0 : [3, 6, 9].includes(c.total) && c.wave <= c.total && c.trialHp > 0)
}
export function stats(s) {
  const c = s.cultivation, tier = 1 + s.realm * .6 + (c.layer - 1) * .08
  const power = Math.max(.5, 1 - c.wound * .05), n = v => Math.floor(v * tier * power)
  return { hp: s.maxHp + n(s.attributes.canCot * 12), mp: n(40 + c.mind * 12), physical: n(12 + c.strength * 4), magical: n(12 + c.mind * 5), defense: n(4 + s.attributes.canCot * 2), ward: n(4 + c.will * 2), evasion: Math.min(.35, s.attributes.thanPhap * .015), capacity: Math.min(20, 1 + Math.floor(c.mind / 5)), resistance: Math.min(.4, c.will * .01), speed: 100 + s.attributes.thanPhap * 2, range: 3 + Math.floor(c.mind / 5), load: 20 + c.strength * 5 }
}
export function damage({ attack, defense, element, target, previous = '', roots = [] }) {
  const strong = overcoming[element] === target, weak = overcoming[target] === element
  return Math.max(1, Math.floor((attack - defense * (strong ? .7 : 1)) * (strong ? 1.5 : weak ? .7 : 1) * (generating[previous] === element ? 1.2 : 1) * (roots.length === 1 && roots[0] === element ? 2 : 1)))
}
export const breakthroughChance = s => Math.max(.1, Math.min(.98, .85 - s.realm * .12 + s.cultivation.will * .01 + s.attributes.ngoTinh * .005 + s.cultivation.pill * .05 - s.cultivation.toxicity * .004 - s.cultivation.karma * .002))
export const rootLabel = s => s.cultivation.mutation ? `Biến dị · ${mutations[s.cultivation.mutation]}` : s.spiritRoots.length === 1 ? 'Thiên linh căn · tốc độ ×4, sát thương bản hệ ×2' : s.spiritRoots.length >= 4 ? 'Tạp linh căn · đa hệ' : 'Chân linh căn'
export function cultivationAction(s, action, random) {
  const c = s.cultivation, type = typeof action === 'string' ? action : action?.type
  const update = changes => ({ ...s, cultivation: { ...c, ...changes } })
  if (c.wave) {
    if (type !== 'tribulation' || !['body', 'artifact', 'formation'].includes(action.guard)) return s
    const st = stats(s), mpCost = action.guard === 'artifact' ? 12 : 0
    if ((mpCost && (!c.bound || c.trialMp < mpCost)) || (action.guard === 'formation' && s.stones < 10)) return s
    const hit = Math.max(1, Math.floor((18 + s.realm * 8 + c.wave * 3) * (1 + c.karma / 50) - st.defense * .5 - (action.guard === 'artifact' ? c.bound * 15 : action.guard === 'formation' ? 25 : s.attributes.canCot * 2)))
    const next = { ...s, stones: s.stones - (action.guard === 'formation' ? 10 : 0), cultivation: { ...c, trialHp: Math.max(0, c.trialHp - hit), trialMp: c.trialMp - mpCost } }
    if (!next.cultivation.trialHp && s.realm >= 3 && !c.rebirth) next.cultivation = { ...next.cultivation, trialHp: Math.floor(st.hp / 2), rebirth: 1 }
    if (!next.cultivation.trialHp) return { ...next, realm: Math.max(0, s.realm - 1), hp: 1, cultivation: { ...next.cultivation, wave: 0, total: 0, wound: 10 } }
    if (c.wave === c.total) return { ...next, realm: s.realm + 1, hp: s.maxHp, attributePoints: s.attributePoints + 2, cultivation: { ...next.cultivation, wave: 0, total: 0, rebirth: 0 } }
    return { ...next, cultivation: { ...next.cultivation, wave: c.wave + 1 } }
  }
  if (type === 'train-stat' && ['strength', 'mind', 'will'].includes(action.stat) && s.attributePoints && c[action.stat] < 1000) return { ...update({ [action.stat]: c[action.stat] + 1 }), attributePoints: s.attributePoints - 1 }
  if (type === 'purify') return update({ toxicity: Math.max(0, c.toxicity - 15), karma: Math.max(0, c.karma - 5), wound: Math.max(0, c.wound - 1) })
  if (type === 'pill' && [1, 2, 3].includes(action.quality) && s.herbs >= action.quality * 2 && c.toxicity < 80) return { ...update({ pill: Math.max(c.pill, action.quality), toxicity: Math.min(100, c.toxicity + action.quality * 12) }), herbs: s.herbs - action.quality * 2, qi: Math.min(100 * (s.realm + 1), s.qi + action.quality * 25) }
  if (type === 'bind' && c.bound < stats(s).capacity && s.stones >= 20) return { ...update({ bound: c.bound + 1 }), stones: s.stones - 20 }
  if (type === 'mutate' && Object.hasOwn(mutations, action.element) && !c.mutation && s.realm >= 1 && s.stones >= 80 && s.herbs >= 8) return { ...update({ mutation: action.element }), stones: s.stones - 80, herbs: s.herbs - 8 }
  if (type === 'cultivate') {
    if (c.toxicity >= 80) return s
    const gain = cultivationAmount(s), cultivation = { ...c, wound: Math.max(0, c.wound - 1) }
    return { ...s, cultivation, qi: Math.min(100 * (s.realm + 1), s.qi + gain), elementCultivation: Object.fromEntries(Object.entries(s.elementCultivation).map(([k, v]) => [k, Math.min(1e9, v + (s.spiritRoots.includes(k) ? gain : 0))])) }
  }
  if (type === 'hunt') return { ...update({ karma: Math.min(100, c.karma + 10) }), stones: Math.min(1e9, s.stones + 16), herbs: Math.min(1e9, s.herbs + 2), journeys: Math.min(1e9, s.journeys + 1) }
  if (type === 'explore') return { ...s, stones: Math.min(1e9, s.stones + 8 + (random() < Math.min(.5, c.luck * .02) ? 12 : 0)), herbs: Math.min(1e9, s.herbs + 1), journeys: Math.min(1e9, s.journeys + 1) }
  if (type === 'breakthrough') {
    if (s.realm >= 6 || s.qi < 100 * (s.realm + 1) || c.toxicity >= 80) return s
    if (!s.realm && c.layer < 9) return { ...update({ layer: c.layer + 1 }), qi: 0, attributePoints: s.attributePoints + 1 }
    const stones = [20, 45, 90, 180, 300, 450][s.realm], herbs = [2, 5, 10, 20, 30, 45][s.realm]
    if (s.stones < stones || s.herbs < herbs) return s
    const next = { ...s, qi: 0, stones: s.stones - stones, herbs: s.herbs - herbs, cultivation: { ...c, pill: 0 } }
    if (random() >= breakthroughChance(s)) return { ...next, realm: Math.max(0, s.realm - 1), hp: Math.max(1, Math.floor(s.hp * .7)), cultivation: { ...next.cultivation, wound: 10 } }
    if (s.realm >= 2) return { ...next, cultivation: { ...next.cultivation, wave: 1, total: s.realm === 2 ? 3 : s.realm === 3 ? 6 : 9, trialHp: stats(s).hp, trialMp: stats(s).mp } }
    return { ...next, realm: s.realm + 1, hp: s.maxHp, attributePoints: s.attributePoints + 2 }
  }
  return null
}
export const cultivationAmount = s => s.cultivation.toxicity >= 80 ? 0 : Math.max(1, Math.floor((9 + s.attributes.ngoTinh) * (s.spiritRoots.length === 1 ? 4 : 1) / s.spiritRoots.length * (1 - s.cultivation.toxicity / 150)))
export function createDuel(s, element) { const st = stats(s); return { element, hp: 90 + s.realm * 60, maxHp: 90 + s.realm * 60, playerHp: st.hp, mp: st.mp, previous: '', turn: 0, log: 'Chọn chiêu thức. Đấu luyện không mất trang bị.', result: '' } }
export function duelTurn(s, duel, element, random = Math.random) {
  if (duel.result || (element !== 'physical' && !s.spiritRoots.includes(element) && (!s.cultivation.mutation || element !== s.cultivation.mutation))) return duel
  const st = stats(s), spell = element !== 'physical', cost = spell ? 8 : 0
  if (duel.mp < cost) return { ...duel, log: 'Thiếu linh lực. Dùng Ngoại công để hồi 4 MP.' }
  const dealt = damage({ attack: (spell ? st.magical : st.physical) * (1 + s.cultivation.karma / 100), defense: 8 + s.realm * 4, element, target: duel.element, previous: duel.previous, roots: s.spiritRoots })
  const hp = Math.max(0, duel.hp - dealt), control = Object.hasOwn(mutations, element) && duel.turn % 3 === 0
  const incoming = !hp || control || random() < st.evasion ? 0 : Math.max(1, Math.floor(damage({ attack: 15 + s.realm * 9, defense: st.ward, element: duel.element, target: s.spiritRoots[0] }) * (1 - st.resistance)))
  const playerHp = Math.max(0, duel.playerHp - incoming)
  return { ...duel, hp, playerHp, mp: Math.min(st.mp, duel.mp - cost + (spell ? 0 : 4)), previous: spell ? element : '', turn: duel.turn + 1, result: hp === 0 ? 'win' : playerHp === 0 ? 'loss' : '', log: `Gây ${dealt} sát thương · nhận ${incoming}.${control ? ' Biến dị khống chế: đối thủ mất lượt!' : ''}${!hp ? ' Thắng đấu luyện.' : !playerHp ? ' Thua đấu luyện.' : ''}` }
}
