#!/usr/bin/env python3
"""Pack ImageGen raster poses; never redraw or reduce them to a coarse grid.

Pillow is used only to crop, uniformly resize, align, and package the two layers.
Frame zero is copied byte-for-pixel from the originally approved 128px PNGs.
"""
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'art/characters/modular-v1'
OUTPUT = ROOT / 'public/assets/characters/modular-v1'
CELL = 128
COLS = ROWS = 20
NEAREST = getattr(Image, 'Resampling', Image).NEAREST

# Source-board gutters, measured on the actual generated reference (1254px).
# All layer pairs MUST use the same crop and transform.
ROW_EDGES = [0, 344, 652, 969, 1254]
COLUMN_EDGES = [
    [0, 320, 620, 960, 1254],
    [0, 320, 620, 969, 1254],
    [0, 320, 620, 960, 1254],
    [0, 320, 645, 890, 1254],
]

ANIMATIONS = {
    'idle': ([0], 1, True),
    'walk': ([1, 0, 2, 0], 8, True),
    'run': ([3, 4], 10, True),
    'jump': ([5], 1, True),
    'fly': ([6], 1, True),
    'hello': ([7, 8], 4, True),
    'scratch': ([9, 10], 4, True),
    'doze': ([0, 11, 11, 11], 2, True),
    'sit': ([12], 1, True),
    'crawl': ([13], 1, True),
    'hurt': ([14], 1, False),
    'collapse': ([14, 12, 15], 5, False),
}

# Equipment coverage: seated/crawling/prone garments conceal the torso and
# limbs. Render only exposed head/hands from the full base body underneath.
# Source-coordinate windows are transformed with BOTH layers during packing.
EXPOSED_SKIN = {
    12: [(98, 1006, 201, 1122), (45, 1161, 107, 1214)],
    13: [(507, 1028, 617, 1144), (542, 1160, 619, 1220), (474, 1164, 535, 1220)],
    15: [(1145, 1128, 1244, 1195), (1160, 1192, 1215, 1210)],
}


def rgba(path):
    image = Image.open(path).convert('RGBA')
    assert image.getchannel('A').getextrema()[0] == 0, f'{path}: missing transparency'
    return image


def export_alpha(image):
    # The generator leaves invisible matte pixels (alpha 1..5) in the gutters.
    # Remove only that export residue so crop bounds exclude it. Keep painted
    # colors, shading, and all visible alpha intact; do not quantize the artwork.
    image.putalpha(image.getchannel('A').point(lambda value: 0 if value <= 8 else value))
    return image


def build():
    bodies = export_alpha(rgba(ART / 'body-keyposes-source.png'))
    clothes = export_alpha(rgba(ART / 'outfit-keyposes-source.png'))
    assert bodies.size == clothes.size == (1254, 1254), 'Reference boards must align exactly'
    pairs = []
    for index in range(16):
        row, col = divmod(index, 4)
        top = [985, 985, 973, 985][col] if row == 3 else ROW_EDGES[row]
        bottom = [980, 980, 973, 980][col] if row == 2 else ROW_EDGES[row + 1]
        box = (COLUMN_EDGES[row][col], top, COLUMN_EDGES[row][col + 1], bottom)
        pair = [board.crop(box) for board in (bodies, clothes)]
        bounds = Image.alpha_composite(*pair).getbbox()
        assert bounds, f'Empty source pose {index}'
        pairs.append((pair, bounds, box))

    # Constant scale preserves anatomy across standing, seated and prone poses.
    original = [rgba(OUTPUT / name) for name in ('base-body-128.png', 'outfit-jade-128.png')]
    original_bounds = Image.alpha_composite(*original).getbbox()
    reference_bounds = pairs[0][1]
    scale = (original_bounds[3] - original_bounds[1]) / (reference_bounds[3] - reference_bounds[1])
    scale = min(scale, min(120 / (bounds[2] - bounds[0]) for _, bounds, _ in pairs))
    sheets = [Image.new('RGBA', (COLS * CELL, ROWS * CELL)) for _ in range(2)]
    preview = Image.new('RGBA', (4 * CELL, 4 * CELL))
    skin_windows = {}
    for index, (pair, bounds, box) in enumerate(pairs):
        if index == 0:
            frames = original
        else:
            size = (round((bounds[2] - bounds[0]) * scale), round((bounds[3] - bounds[1]) * scale))
            target = ((CELL - size[0]) // 2, 116 - size[1])
            assert target[0] >= 0 and target[1] >= 0, f'Pose {index} would clip'
            frames = []
            for layer in pair:
                frame = Image.new('RGBA', (CELL, CELL))
                frame.alpha_composite(layer.crop(bounds).resize(size, NEAREST), target)
                frames.append(frame)
        for sheet, frame in zip(sheets, frames):
            sheet.paste(frame, ((index % COLS) * CELL, (index // COLS) * CELL))
        preview_body = frames[0]
        if index in EXPOSED_SKIN:
            windows = []
            for rect in EXPOSED_SKIN[index]:
                mapped = [round((rect[i] - box[i % 2] - bounds[i % 2]) * scale) + target[i % 2]
                          for i in range(4)]
                windows.append([max(0, min(CELL, value)) for value in mapped])
            skin_windows[str(index)] = windows
            preview_body = Image.new('RGBA', (CELL, CELL))
            for rect in windows:
                preview_body.paste(frames[0].crop(rect), rect[:2])
        preview.alpha_composite(Image.alpha_composite(preview_body, frames[1]), ((index % 4) * CELL, (index // 4) * CELL))

    for sheet, name in zip(sheets, ('base-body-sheet-20x20.png', 'outfit-jade-sheet-20x20.png')):
        sheet.save(OUTPUT / name, optimize=True)
    preview.resize((1024, 1024), NEAREST).save(OUTPUT / 'preview-animation-contact-sheet.png')
    Image.alpha_composite(*original).save(OUTPUT / 'preview-idle-right-00.png')
    manifest = {
        'version': 3, 'cellWidth': CELL, 'cellHeight': CELL,
        'columns': COLS, 'rows': ROWS, 'sheetWidth': COLS * CELL, 'sheetHeight': ROWS * CELL,
        'anchor': {'x': 64, 'y': 116}, 'frameCount': 16, 'reservedCells': 384,
        'outfitExposedSkin': skin_windows,
        'animations': {name: {'frames': frames, 'fps': fps, 'loop': loop}
                       for name, (frames, fps, loop) in ANIMATIONS.items()},
    }
    metadata = json.dumps(manifest, indent=2) + '\n'
    (OUTPUT / 'atlas.json').write_text(metadata)
    (ROOT / 'src/game/characterAtlas.json').write_text(metadata)
    print('Packed 16 raster keyposes with the original idle frame; 384 cells reserved.')


if __name__ == '__main__':
    build()
