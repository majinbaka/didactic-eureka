export const OBSTACLE_ATLASES = {
  classic: '/assets/scenery/forest-obstacles-v1/obstacles-atlas.webp',
  v2: '/assets/scenery/forest-object-variants-v2/variants-atlas.webp',
  types: '/assets/scenery/forest-obstacle-types-v3/types-atlas.webp',
}

export const OBSTACLE_TYPE_SPRITES = {
  'bamboo-log': { x: 12, y: 215, width: 296, height: 97, surface: 28 },
  'tree-stump': { x: 332, y: 110, width: 296, height: 202, surface: 8 },
  'broken-stairs': { x: 652, y: 56, width: 296, height: 256, surface: 37 },
  'lantern-plinth': { x: 61, y: 336, width: 197, height: 296, surface: 11 },
  'torii-beam': { x: 332, y: 517, width: 296, height: 115, surface: 5 },
  'watch-post': { x: 693, y: 336, width: 214, height: 296, surface: 56 },
}

export const OBSTACLE_SPRITES = {
  classic: {
    low: { x: 49, y: 292, width: 535, height: 206 },
    medium: { x: 670, y: 211, width: 537, height: 287 },
    tallNarrow: { x: 170, y: 677, width: 294, height: 478 },
    tallWide: { x: 660, y: 645, width: 559, height: 510 },
  },
  v2: {
    low: { x: 8, y: 148, width: 240, height: 100 },
    medium: { x: 264, y: 30, width: 240, height: 218 },
    tallNarrow: { x: 553, y: 8, width: 174, height: 240 },
    tallWide: { x: 776, y: 44, width: 240, height: 204 },
  },
}

export const DECORATIVE_VARIANT_SPRITES = {
  'variant-pebbles': { x: 23, y: 416, width: 210, height: 88 },
  'variant-fern': { x: 279, y: 358, width: 209, height: 146 },
  'variant-bamboo': { x: 565, y: 294, width: 150, height: 210 },
  'variant-lantern': { x: 791, y: 363, width: 210, height: 141 },
}
