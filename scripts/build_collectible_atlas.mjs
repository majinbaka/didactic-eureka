import sharp from 'sharp'

const scale = 2, cell = 16, columns = 4, rows = 2
const width = cell * columns, height = cell * rows
const pixels = Buffer.alloc(width * height * 4)
const palette = {
  leaf: [76, 139, 91, 255], light: [164, 202, 121, 255], dark: [34, 73, 58, 255],
  cyan: [118, 211, 203, 255], red: [211, 91, 70, 255], gold: [238, 190, 93, 255],
  blue: [87, 151, 195, 255], white: [225, 231, 211, 255], purple: [143, 91, 190, 255],
}
const put = (icon, x, y, color) => {
  const ox = (icon % columns) * cell, oy = Math.floor(icon / columns) * cell
  if (x < 0 || y < 0 || x >= cell || y >= cell) return
  const offset = ((oy + y) * width + ox + x) * 4
  pixels.set(palette[color], offset)
}
const rect = (icon, x, y, w, h, color) => { for (let py = y; py < y + h; py++) for (let px = x; px < x + w; px++) put(icon, px, py, color) }
const stem = (icon, color = 'leaf') => { rect(icon, 7, 7, 2, 7, 'dark'); rect(icon, 8, 7, 1, 6, color) }

stem(0); rect(0, 3, 5, 5, 2, 'leaf'); rect(0, 8, 3, 5, 2, 'light'); rect(0, 5, 9, 3, 2, 'light')
stem(1); rect(1, 3, 7, 4, 2, 'leaf'); rect(1, 9, 5, 3, 2, 'light'); put(1, 5, 4, 'cyan'); put(1, 10, 3, 'cyan'); put(1, 4, 3, 'white')
stem(2); rect(2, 5, 3, 6, 6, 'red'); rect(2, 7, 2, 2, 8, 'gold'); rect(2, 3, 5, 10, 2, 'red'); rect(2, 6, 4, 4, 4, 'gold')
stem(3, 'blue'); rect(3, 4, 5, 8, 3, 'blue'); rect(3, 5, 4, 6, 2, 'cyan'); rect(3, 6, 8, 4, 4, 'white')
rect(4, 7, 3, 3, 10, 'white'); rect(4, 5, 6, 7, 5, 'white'); rect(4, 4, 4, 3, 3, 'leaf'); rect(4, 10, 3, 3, 4, 'light'); put(4, 5, 13, 'gold'); put(4, 10, 13, 'gold')
stem(5, 'purple'); rect(5, 3, 4, 10, 3, 'purple'); rect(5, 5, 2, 7, 3, 'purple'); rect(5, 6, 7, 6, 2, 'cyan'); put(5, 10, 3, 'white')
rect(6, 6, 2, 5, 12, 'blue'); rect(6, 4, 6, 9, 6, 'cyan'); rect(6, 7, 3, 2, 8, 'white'); rect(6, 5, 12, 7, 2, 'dark')
rect(7, 6, 1, 5, 13, 'purple'); rect(7, 3, 6, 10, 6, 'purple'); rect(7, 7, 2, 2, 9, 'white'); rect(7, 5, 12, 7, 2, 'blue')

await sharp(pixels, { raw: { width, height, channels: 4 } })
  .resize(width * scale, height * scale, { kernel: 'nearest' })
  .png({ palette: true })
  .toFile('public/assets/items/forest-collectibles-v1.png')
