export const SAVE_KEY = 'loan-gioi:save:v1'
export const realms = ['Luyện Khí', 'Trúc Cơ', 'Kim Đan', 'Nguyên Anh', 'Hóa Thần']
export const initialState = { version: 1, realm: 0, qi: 0, stones: 30, herbs: 0, journeys: 0 }
export const qiRequired = (realm) => 100 * (realm + 1)

export function isValidSave(value) {
  return value?.version === 1 && Number.isInteger(value.realm) && value.realm >= 0 && value.realm < realms.length &&
    ['qi', 'stones', 'herbs', 'journeys'].every((key) => Number.isSafeInteger(value[key]) && value[key] >= 0 && value[key] <= 1000000000) && value.qi <= qiRequired(value.realm)
}
export function loadLocalSave() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY))
    return isValidSave(saved) ? saved : { ...initialState }
  } catch { return { ...initialState } }
}
export function saveLocal(state) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); return true } catch { return false }
}
export function transition(state, action) {
  switch (action) {
    case 'cultivate': return { ...state, qi: Math.min(qiRequired(state.realm), state.qi + 10) }
    case 'explore': return { ...state, stones: state.stones + 8, herbs: state.herbs + 1, journeys: state.journeys + 1 }
    case 'breakthrough':
      if (state.qi < qiRequired(state.realm) || state.realm >= realms.length - 1) return state
      return { ...state, realm: state.realm + 1, qi: 0 }
    default: return state
  }
}
