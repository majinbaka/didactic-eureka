export const items = [
  { id: 'pill', name: 'Hồi Xuân Đan', kind: 'Dùng một lần', description: 'Hồi 30 máu; tiêu hao 1 viên.', price: 8 },
  { id: 'gourd', name: 'Tụ Khí Hồ Lô', kind: 'Dùng nhiều lần', description: 'Hồi 20 linh khí/lượt; mỗi bình có 5 lượt.', price: 24 },
  { id: 'jade', name: 'Ngộ Đạo Ngọc', kind: 'Vĩnh viễn', description: 'Kích hoạt một lần: +2 linh khí và tu vi mỗi hành khi tu luyện.', price: 80 },
]
export const createInventory = () => ({ pill: 2, gourd: 5, jade: 0, jadeActive: false })
export function validInventory(value) {
  return value && Object.keys(value).length === 4 && Number.isInteger(value.pill) && value.pill >= 0 && value.pill <= 999 &&
    Number.isInteger(value.gourd) && value.gourd >= 0 && value.gourd <= 5 && [0, 1].includes(value.jade) &&
    typeof value.jadeActive === 'boolean' && (!value.jadeActive || value.jade === 1)
}
export function itemBlockedReason(state, id, buying = false) {
  const item = items.find(entry => entry.id === id)
  if (!item) return 'Vật phẩm không tồn tại.'
  const bag = state.inventory
  if (buying) {
    if (id === 'pill' && bag.pill >= 999) return 'Đã đủ 999 viên.'
    if (id !== 'pill' && bag[id]) return id === 'jade' ? 'Đã sở hữu.' : 'Dùng hết bình hiện tại trước khi mua.'
    return state.stones < item.price ? 'Không đủ linh thạch.' : ''
  }
  if (!bag[id]) return 'Đã hết vật phẩm.'
  if (id === 'pill' && state.hp >= state.maxHp) return 'Máu đã đầy.'
  if (id === 'gourd' && state.qi >= 100 * (state.realm + 1)) return 'Linh khí đã đầy.'
  if (id === 'jade' && bag.jadeActive) return 'Đã kích hoạt vĩnh viễn.'
  return ''
}
export function itemTransition(state, action) {
  const buying = action.type === 'buy-item'
  if (itemBlockedReason(state, action.id, buying)) return state
  const inventory = { ...state.inventory }
  if (buying) {
    inventory[action.id] += action.id === 'gourd' ? 5 : 1
    return { ...state, inventory, stones: state.stones - items.find(item => item.id === action.id).price }
  }
  if (action.id === 'jade') { inventory.jadeActive = true; return { ...state, inventory } }
  inventory[action.id]--
  return { ...state, inventory, ...(action.id === 'pill' ? { hp: Math.min(state.maxHp, state.hp + 30) } : { qi: Math.min(100 * (state.realm + 1), state.qi + 20) }) }
}
