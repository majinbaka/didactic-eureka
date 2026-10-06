import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const groups = ['weapons', 'defense', 'formations', 'treasures']
const labels = ['Vũ khí tấn công · 250', 'Trang bị phòng thủ · 250', 'Trận pháp · 250', 'Pháp bảo · 250']
const tiles = []
for (const [row, group] of groups.entries()) {
  const label = `<svg width="3200" height="40"><text x="12" y="28" font-family="sans-serif" font-size="24" fill="#dfbc7c">${labels[row]}</text></svg>`
  tiles.push({ input: Buffer.from(label), left: 0, top: row * 360 })
  for (let batch = 1; batch <= 5; batch++) tiles.push({ input: `public/assets/items/equipment-v1/${group}/batch-${batch}.png`, left: (batch - 1) * 640, top: row * 360 + 40 })
}
await mkdir('art/items/equipment-v1', { recursive: true })
await sharp({ create: { width: 3200, height: 1440, channels: 4, background: '#101d1c' } }).composite(tiles).png().toFile('art/items/equipment-v1/preview.png')
console.log('art/items/equipment-v1/preview.png: all 1000 item icons')
