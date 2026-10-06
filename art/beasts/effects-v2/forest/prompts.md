# Hiệu ứng yêu thú rừng v2 — nguồn ImageGen

Tạo bằng built-in image_gen, transparent_background: true. Đã xem 7 sheet thân quái forest-v2 tương ứng để khớp palette và chiêu. Mỗi sheet 20 VFX, lưới 4×5: melee, charge, travel, impact, field, mỗi pha 4 frame. Đã xem toàn bộ bằng view_image: không có thân quái, mọi ô có hiệu ứng. Giữ alpha gốc; một số nguồn có speckle ngoài cụm chính nên đóng gói với seam thích ứng. Hỏa Nhạn dùng một hỏa châu trên travel, phát ba entity riêng khi ghép.

## Kim Dương (kim-duong)

Nguồn thân tham khảo: art/beasts/forest-v2/kim-duong-source.png

Nguồn gốc: /home/anhnv/.codex/generated_images/01a11028-6e5b-7e23-8031-44d684e9275e/exec-d5716466-c08d-42e6-bfaa-f7eaa52e50da.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, horns, teeth, anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns x5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024x1280, each cell256x256. Every effect CENTERED INSIDE own cell; maximum effect width/height140px. Clean transparent gutters at least25% of cell on all sides; NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp pixel clusters and tiny highlights, thin dark outline, compact fantasy palette; no blurry smoke, haze or stray speckle outside compact cluster.
EXACT ROW-MAJOR ORDER: row1 frames0-3 four phases of melee streak: starts small, active arc, fullest strike, dissipating. row2 frames4-7 four phases of charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8-11 four distinct looping moving projectile phases, all traveling RIGHT, isolated sprite can translate independently WITHOUT caster. row4 frames12-15 impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16-19 residual field: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX. Melee row1: gold horn-strike crescent streak with silver spark clusters; NO horns anatomy. Skill rows2-5: bronze and silver metal energy; charge golden disk with tiny silver shards; travel THREE pointed silver shards flying right in a compact fan with gold trails; impact metallic star sparkburst; field fading gold circle and fallen silver fragments. Keep all components standalone, detached, creature-free.
```

Lưu: art/beasts/effects-v2/forest/kim-duong-source.png

## Sơn Tiêu (son-tieu)

Nguồn thân tham khảo: art/beasts/forest-v2/son-tieu-source.png

Nguồn gốc: /home/anhnv/.codex/generated_images/01a11028-6e5b-7e23-8031-44d684e9275e/exec-84f72762-1058-46a8-8628-171efb9cb8af.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, horns, teeth, anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns x5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024x1280, each cell256x256. Every effect CENTERED INSIDE own cell; maximum effect width/height140px. Clean transparent gutters at least25% of cell on all sides; NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp pixel clusters and tiny highlights, thin dark outline, compact fantasy palette; no blurry smoke, haze or stray speckle outside compact cluster.
EXACT ROW-MAJOR ORDER: row1 frames0-3 four phases of melee streak: starts small, active arc, fullest strike, dissipating. row2 frames4-7 four phases of charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8-11 four distinct looping moving projectile phases, all traveling RIGHT, isolated sprite can translate independently WITHOUT caster. row4 frames12-15 impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16-19 residual field: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX. Melee row1: olive green upward palm-strike arc with small leaves; NO palm anatomy. Skill rows2-5: moss green vines and bright lime highlights; charge twisted vine bud spiral; travel coiled vine knot shaped abstractly like a compact spiral projectile flying right, NOT hand anatomy; impact unfurling vine rosette; field curling roots and leaves. Keep all components standalone, detached, creature-free.
```

Lưu: art/beasts/effects-v2/forest/son-tieu-source.png

## Sa Giải (sa-giai)

Nguồn thân tham khảo: art/beasts/forest-v2/sa-giai-source.png

Nguồn gốc: /home/anhnv/.codex/generated_images/01a11028-6e5b-7e23-8031-44d684e9275e/exec-d1204988-3bd8-4647-8a94-2914ff2e8d61.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, horns, teeth, anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns x5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024x1280, each cell256x256. Every effect CENTERED INSIDE own cell; maximum effect width/height140px. Clean transparent gutters at least25% of cell on all sides; NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp pixel clusters and tiny highlights, thin dark outline, compact fantasy palette; no blurry smoke, haze or stray speckle outside compact cluster.
EXACT ROW-MAJOR ORDER: row1 frames0-3 four phases of melee streak: starts small, active arc, fullest strike, dissipating. row2 frames4-7 four phases of charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8-11 four distinct looping moving projectile phases, all traveling RIGHT, isolated sprite can translate independently WITHOUT caster. row4 frames12-15 impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16-19 residual field: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX. Melee row1: ochre paired pincer-impact streaks; NO pincers anatomy. Skill rows2-5: sandstone ochre and pale gold sand; charge small sand whirl; travel short compact sand geyser with pebble grains sweeping to right along ground; impact sand fountain; field low residual sand whirl and pebbles. Keep all components standalone, detached, creature-free.
```

Lưu: art/beasts/effects-v2/forest/sa-giai-source.png

## Vũ Điệp (vu-diep)

Nguồn thân tham khảo: art/beasts/forest-v2/vu-diep-source.png

Nguồn gốc: /home/anhnv/.codex/generated_images/01a11028-6e5b-7e23-8031-44d684e9275e/exec-bd32af49-aa23-43eb-ac93-f0fa006cc53a.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, horns, teeth, anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns x5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024x1280, each cell256x256. Every effect CENTERED INSIDE own cell; maximum effect width/height140px. Clean transparent gutters at least25% of cell on all sides; NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp pixel clusters and tiny highlights, thin dark outline, compact fantasy palette; no blurry smoke, haze or stray speckle outside compact cluster.
EXACT ROW-MAJOR ORDER: row1 frames0-3 four phases of melee streak: starts small, active arc, fullest strike, dissipating. row2 frames4-7 four phases of charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8-11 four distinct looping moving projectile phases, all traveling RIGHT, isolated sprite can translate independently WITHOUT caster. row4 frames12-15 impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16-19 residual field: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX. Melee row1: mint green wing-sweep crescent with ivory pollen; NO wings anatomy. Skill rows2-5: mint jade and ivory wind pollen; charge small rotating pollen seed halo; travel swirling compact pollen gust flying right with short pale trail; impact dispersing white wind puff; field tiny pollen vortex. Keep all components standalone, detached, creature-free.
```

Lưu: art/beasts/effects-v2/forest/vu-diep-source.png

## Bạch Điêu (bach-dieu)

Nguồn thân tham khảo: art/beasts/forest-v2/bach-dieu-source.png

Nguồn gốc: /home/anhnv/.codex/generated_images/01a11028-6e5b-7e23-8031-44d684e9275e/exec-16ba93bb-dd5d-4748-b53a-e0f40737155e.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, horns, teeth, anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns x5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024x1280, each cell256x256. Every effect CENTERED INSIDE own cell; maximum effect width/height140px. Clean transparent gutters at least25% of cell on all sides; NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp pixel clusters and tiny highlights, thin dark outline, compact fantasy palette; no blurry smoke, haze or stray speckle outside compact cluster.
EXACT ROW-MAJOR ORDER: row1 frames0-3 four phases of melee streak: starts small, active arc, fullest strike, dissipating. row2 frames4-7 four phases of charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8-11 four distinct looping moving projectile phases, all traveling RIGHT, isolated sprite can translate independently WITHOUT caster. row4 frames12-15 impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16-19 residual field: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX. Melee row1: three pale cyan low claw slash streaks; NO claws anatomy. Skill rows2-5: ice white and crystalline cyan; charge compact frosty ice arc forming; travel jagged curved crystalline ice boomerang flying right with short snowflake trail; impact shattered cyan ice burst; field floating ice splinters and frost spiral. Keep all components standalone, detached, creature-free.
```

Lưu: art/beasts/effects-v2/forest/bach-dieu-source.png

## Hỏa Nhạn (hoa-nhan)

Nguồn thân tham khảo: art/beasts/forest-v2/hoa-nhan-source.png

Nguồn gốc: /home/anhnv/.codex/generated_images/01a11028-6e5b-7e23-8031-44d684e9275e/exec-4e13ef3d-0bc5-4199-8a99-2ca229c138e2.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, horns, teeth, anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns x5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024x1280, each cell256x256. Every effect CENTERED INSIDE own cell; maximum effect width/height140px. Clean transparent gutters at least25% of cell on all sides; NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp pixel clusters and tiny highlights, thin dark outline, compact fantasy palette; no blurry smoke, haze or stray speckle outside compact cluster.
EXACT ROW-MAJOR ORDER: row1 frames0-3 four phases of melee streak: starts small, active arc, fullest strike, dissipating. row2 frames4-7 four phases of charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8-11 four distinct looping moving projectile phases, all traveling RIGHT, isolated sprite can translate independently WITHOUT caster. row4 frames12-15 impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16-19 residual field: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX. Melee row1: amber paired peck spark streaks; NO beak anatomy. Skill rows2-5: scarlet orange and bright gold fire; charge compact cluster of three fiery sparks; travel THREE round fire bubbles flying right with tiny flame tails; impact bursting fire bubbles; field compact ember halo. Keep all components standalone, detached, creature-free.
```

Lưu: art/beasts/effects-v2/forest/hoa-nhan-source.png

## Thủy Thát (thuy-that)

Nguồn thân tham khảo: art/beasts/forest-v2/thuy-that-source.png

Nguồn gốc: /home/anhnv/.codex/generated_images/01a11028-6e5b-7e23-8031-44d684e9275e/exec-cf548886-7db5-4135-9c9c-fc3cdb214e07.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, horns, teeth, anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns x5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024x1280, each cell256x256. Every effect CENTERED INSIDE own cell; maximum effect width/height140px. Clean transparent gutters at least25% of cell on all sides; NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp pixel clusters and tiny highlights, thin dark outline, compact fantasy palette; no blurry smoke, haze or stray speckle outside compact cluster.
EXACT ROW-MAJOR ORDER: row1 frames0-3 four phases of melee streak: starts small, active arc, fullest strike, dissipating. row2 frames4-7 four phases of charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8-11 four distinct looping moving projectile phases, all traveling RIGHT, isolated sprite can translate independently WITHOUT caster. row4 frames12-15 impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16-19 residual field: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX. Melee row1: blue watery sweeping tail-slap arc; NO tail anatomy. Skill rows2-5: turquoise and bright blue water; charge growing bright water pearl; travel ONE round blue water orb flying right with short splash trail; impact circular water splash; field watery ripple and small droplets. Keep all components standalone, detached, creature-free.
```

Lưu: art/beasts/effects-v2/forest/thuy-that-source.png
