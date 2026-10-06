import sharp from 'sharp'

/** Locate unequal transparent gutters; keep disconnected particles inside each cell. */
export async function effectCrops(path, columns = 4, rows = 5) {
  const { data, info } = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  if (!data.some((value, index) => index % 4 === 3 && value === 0)) throw new Error(`Opaque source: ${path}`)
  const occupied = (x, y) => data[(y * info.width + x) * 4 + 3] > 8 ? 1 : 0
  function seams(length, divisions, occupancy) {
    const cuts = [0]
    for (let i = 1; i < divisions; i++) {
      const expected = Math.round(length * i / divisions), radius = Math.floor(length / divisions * .18)
      let cut = expected, best = Infinity
      for (let p = expected - radius; p <= expected + radius; p++) {
        const score = occupancy(p) + Math.abs(p - expected) / length
        if (score < best) { best = score; cut = p }
      }
      cuts.push(cut)
    }
    return [...cuts, length]
  }
  const ys = seams(info.height, rows, y => {
    let sum = 0
    for (let x = 0; x < info.width; x++) sum += occupied(x, y)
    return sum
  })
  const crops = []
  for (let row = 0; row < rows; row++) {
    const xs = seams(info.width, columns, x => {
      let sum = 0
      for (let y = ys[row]; y < ys[row + 1]; y++) sum += occupied(x, y)
      return sum
    })
    for (let col = 0; col < columns; col++) {
      let left = info.width, top = info.height, right = 0, bottom = 0
      for (let y = ys[row]; y < ys[row + 1]; y++) for (let x = xs[col]; x < xs[col + 1]; x++) {
        if (!occupied(x, y)) continue
        left = Math.min(left, x); top = Math.min(top, y)
        right = Math.max(right, x + 1); bottom = Math.max(bottom, y + 1)
      }
      if (right <= left || bottom <= top) throw new Error(`Empty effect ${crops.length}: ${path}`)
      crops.push({ left, top, width: right - left, height: bottom - top })
    }
  }
  return crops
}

export async function packEffectFrames(path, crops, ground = false) {
  // A shared scale for a four-frame clip retains expansion, rather than resizing each phase to fill the cell.
  const scale = Math.min(...crops.map(crop => Math.min(112 / crop.width, 100 / crop.height)))
  return Promise.all(crops.map(async crop => {
    const width = Math.max(1, Math.round(crop.width * scale)), height = Math.max(1, Math.round(crop.height * scale))
    const input = await sharp(path).extract(crop).resize(width, height, { kernel: 'nearest' }).png().toBuffer()
    return sharp({ create: { width: 128, height: 128, channels: 4, background: '#00000000' } })
      .composite([{ input, left: Math.floor((128 - width) / 2), top: ground ? 112 - height : Math.floor((128 - height) / 2) }]).png().toBuffer()
  }))
}
