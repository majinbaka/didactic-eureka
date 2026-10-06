# Hiệu ứng yêu thú rừng — nguồn và prompt

Tạo bằng built-in image_gen; mỗi lần dùng transparent_background: true. Art nội bộ Tu Tiên Loạn Giới. Đã xem mười sheet thân quái tương ứng ở art/beasts/forest-v1/ để tham khảo màu và chiêu. Bộ này chỉ chứa VFX độc lập, không chứa thân yêu thú.

Mỗi sheet có20 frame, 4cột ×5hàng: cận chiến0–3, tụ lực4–7, chuyển động8–11, trúng đòn12–15, dư chấn16–19. Mỗi nhóm4 phase thực sự vẽ khác nhau. Đã kiểm tra tất cả bằng view_image: không có thân quái, không frame trống. Gutter nguồn hơi khác nhau; giữ toàn bộ alpha và tách atlas theo seam thích ứng. Bản sửa sói/hồ/lợn mở rộng gutter rõ ràng. Bản sửa điêu/hổ thu gọn hiệu ứng; speckle alpha thấp1–8 quanh một số hiệu ứng vẫn được giữ và gần như không thấy khi composite, không xóa alpha bằng threshold.

Mọi origin/attackOffset đều là điểm từ góc trên trái sprite thân128px quay phải; đó là gợi ý ghép hình, không phải hitbox. Dùngx'=128-x khi quay trái; chỉnh lại khi đổi tỷ lệ.

## truc-lang

Nguồn tham khảo đã xem: art/beasts/forest-v1/truc-lang-source.png

Lần tạo gốc: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-08793f4b-d601-4c84-a81f-08422c211825.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. This sheet contains EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, teeth anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns ×5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024×1280, each cell256×256. Every effect CENTERED INSIDE own cell, blank transparent margins at least20% of cell on all sides, maximum effect width/height150px. NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp visible pixels and tiny clustered highlights, dark thin outline, muted saturated fantasy colors, no blurry smoke.
EXACT ROW-MAJOR ORDER: row1 frames0–3 four phases of melee impact streak: starts small, active arc, fullest strike, dissipating. row2 frames4–7 four phases of skill charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8–11 four distinct looping moving projectile/effect phases, all traveling RIGHT, isolated sprite can translate independently without its caster. row4 frames12–15 skill impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16–19 four residual field/orbit/summon phases: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX, no beasts. Detached fragments stay inside cell.
Melee effect row1: ivory paired puncture sparks and olive slashing streaks suggesting a lunging bite WITHOUT teeth or jaw. Skill rows2–5: mint green and pale jade wind. Charge curling wind with bamboo leaves; projectile two crescent wind blades with short trailing leaf wisps pointing right; impact shattered mint crescents; residual small swirling leaf vortex. Keep all components standalone, detached and creature-free.
```

Lần sửa: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-515f0cfd-c898-4132-9a8e-47e191263a35.png

Prompt sửa chính xác:

```text
Fix only sprite sheet separation. Preserve all twenty effects, their identities and exact4×5 row-major order. This is a TRANSPARENT FX-ONLY game animation sheet. Shrink EVERY effect cluster to fit inside central50% of its equal cell and CENTER it precisely. Remove all detached ambient haze/speckles outside the compact effect cluster. MUST leave 25% completely transparent padding on every edge of each cell: clean transparent vertical lanes and clean horizontal lanes. NO continuous fog, no background, no rectangular patches, no animals, no text, no grid. Keep localized highlights within each isolated cluster. All20 cells nonempty, same effect choreography.
```

Bản được chọn: Lần sửa.

Lưu tại: art/beasts/effects-v1/forest/truc-lang-source.png

## moc-ho

Nguồn tham khảo đã xem: art/beasts/forest-v1/moc-ho-source.png

Lần tạo gốc: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-e12078b1-e6fa-4b1e-b8aa-43fc6cb78248.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. This sheet contains EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, teeth anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns ×5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024×1280, each cell256×256. Every effect CENTERED INSIDE own cell, blank transparent margins at least20% of cell on all sides, maximum effect width/height150px. NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp visible pixels and tiny clustered highlights, dark thin outline, muted saturated fantasy colors, no blurry smoke.
EXACT ROW-MAJOR ORDER: row1 frames0–3 four phases of melee impact streak: starts small, active arc, fullest strike, dissipating. row2 frames4–7 four phases of skill charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8–11 four distinct looping moving projectile/effect phases, all traveling RIGHT, isolated sprite can translate independently without its caster. row4 frames12–15 skill impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16–19 four residual field/orbit/summon phases: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX, no beasts. Detached fragments stay inside cell.
Melee effect row1: low emerald curved horizontal sweep arc with leaf fragments, suggesting tail sweep WITHOUT tail. Skill rows2–5: olive emerald and gold leaf spirits. Charge three leaves orbiting gold core; projectile three pointed luminous leaves trailing curved green wisps right, no faces; impact clustered leaf burst; residual three orbiting leaf lights. Keep all components standalone, detached and creature-free.
```

Lần sửa: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-2e93912b-5629-465d-b967-378347989ad8.png

Prompt sửa chính xác:

```text
Fix only sprite sheet separation. Preserve all twenty effects, their identities and exact4×5 row-major order. This is a TRANSPARENT FX-ONLY game animation sheet. Shrink EVERY effect cluster to fit inside central50% of its equal cell and CENTER it precisely. Remove all detached ambient haze/speckles outside the compact effect cluster. MUST leave 25% completely transparent padding on every edge of each cell: clean transparent vertical lanes and clean horizontal lanes. NO continuous fog, no background, no rectangular patches, no animals, no text, no grid. Keep localized highlights within each isolated cluster. All20 cells nonempty, same effect choreography.
```

Bản được chọn: Lần sửa.

Lưu tại: art/beasts/effects-v1/forest/moc-ho-source.png

## thach-tru

Nguồn tham khảo đã xem: art/beasts/forest-v1/thach-tru-source.png

Lần tạo gốc: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-8c0cfeb9-74b5-43b7-8944-2c1e80135f34.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. This sheet contains EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, teeth anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns ×5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024×1280, each cell256×256. Every effect CENTERED INSIDE own cell, blank transparent margins at least20% of cell on all sides, maximum effect width/height150px. NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp visible pixels and tiny clustered highlights, dark thin outline, muted saturated fantasy colors, no blurry smoke.
EXACT ROW-MAJOR ORDER: row1 frames0–3 four phases of melee impact streak: starts small, active arc, fullest strike, dissipating. row2 frames4–7 four phases of skill charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8–11 four distinct looping moving projectile/effect phases, all traveling RIGHT, isolated sprite can translate independently without its caster. row4 frames12–15 skill impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16–19 four residual field/orbit/summon phases: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX, no beasts. Detached fragments stay inside cell.
Melee effect row1: two ivory wedge-shaped glints and orange dust streaks, charge impact WITHOUT tusks or body. Skill rows2–5: gray terracotta rock and amber fissure energy. Charge floating pebble ring; traveling ground segment of one short upright angular stone pillar and orange cracks pointed right; impact stone shard eruption; residual small rune crack and hovering pebbles, NOT a landscape. Keep all components standalone, detached and creature-free.
```

Lần sửa: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-94b204c3-cef8-4ff8-99bd-a3625e1095c4.png

Prompt sửa chính xác:

```text
Fix only sprite sheet separation. Preserve all twenty effects, their identities and exact4×5 row-major order. This is a TRANSPARENT FX-ONLY game animation sheet. Shrink EVERY effect cluster to fit inside central50% of its equal cell and CENTER it precisely. Remove all detached ambient haze/speckles outside the compact effect cluster. MUST leave 25% completely transparent padding on every edge of each cell: clean transparent vertical lanes and clean horizontal lanes. NO continuous fog, no background, no rectangular patches, no animals, no text, no grid. Keep localized highlights within each isolated cluster. All20 cells nonempty, same effect choreography.
```

Bản được chọn: Lần sửa.

Lưu tại: art/beasts/effects-v1/forest/thach-tru-source.png

## doc-chu

Nguồn tham khảo đã xem: art/beasts/forest-v1/doc-chu-source.png

Lần tạo gốc: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-a8be59e2-f5c2-414e-a80c-375c29807891.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. This sheet contains EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, teeth anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns ×5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024×1280, each cell256×256. Every effect CENTERED INSIDE own cell, blank transparent margins at least20% of cell on all sides, maximum effect width/height150px. NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp visible pixels and tiny clustered highlights, dark thin outline, muted saturated fantasy colors, no blurry smoke.
EXACT ROW-MAJOR ORDER: row1 frames0–3 four phases of melee impact streak: starts small, active arc, fullest strike, dissipating. row2 frames4–7 four phases of skill charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8–11 four distinct looping moving projectile/effect phases, all traveling RIGHT, isolated sprite can translate independently without its caster. row4 frames12–15 skill impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16–19 four residual field/orbit/summon phases: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX, no beasts. Detached fragments stay inside cell.
Melee effect row1: thin white web snare filament with violet puncture glints, no spider fangs. Skill rows2–5: purple violet venom web. Charge purple orb tangled in silk; projectile SMALL triangular right-pointing web fan with venom beads; impact broken silk starburst and poison droplets; residual compact violet web patch pulsing with small beads, no spider silhouette. Keep all components standalone, detached and creature-free.
```

Bản được chọn: Lần tạo gốc.

Lưu tại: art/beasts/effects-v1/forest/doc-chu-source.png

## linh-loc

Nguồn tham khảo đã xem: art/beasts/forest-v1/linh-loc-source.png

Lần tạo gốc: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-e70366ed-3d55-4d48-894d-9d3459c09425.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. This sheet contains EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, teeth anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns ×5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024×1280, each cell256×256. Every effect CENTERED INSIDE own cell, blank transparent margins at least20% of cell on all sides, maximum effect width/height150px. NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp visible pixels and tiny clustered highlights, dark thin outline, muted saturated fantasy colors, no blurry smoke.
EXACT ROW-MAJOR ORDER: row1 frames0–3 four phases of melee impact streak: starts small, active arc, fullest strike, dissipating. row2 frames4–7 four phases of skill charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8–11 four distinct looping moving projectile/effect phases, all traveling RIGHT, isolated sprite can translate independently without its caster. row4 frames12–15 skill impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16–19 four residual field/orbit/summon phases: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX, no beasts. Detached fragments stay inside cell.
Melee effect row1: jade angular thrust streaks with gold contact glint, no horn or deer. Skill rows2–5: jade emerald magic and brown root tendrils. Charge jade rune ring with small leaf motes; traveling ground segment two short curling roots rising from magic flecks, leaning right; impact tangled root burst; residual circular root snare with jade leaves, no ground platform. Keep all components standalone, detached and creature-free.
```

Bản được chọn: Lần tạo gốc.

Lưu tại: art/beasts/effects-v1/forest/linh-loc-source.png

## son-hung

Nguồn tham khảo đã xem: art/beasts/forest-v1/son-hung-source.png

Lần tạo gốc: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-cc4f9d2a-5cb6-44b2-8f1b-7e9aca19295a.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. This sheet contains EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, teeth anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns ×5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024×1280, each cell256×256. Every effect CENTERED INSIDE own cell, blank transparent margins at least20% of cell on all sides, maximum effect width/height150px. NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp visible pixels and tiny clustered highlights, dark thin outline, muted saturated fantasy colors, no blurry smoke.
EXACT ROW-MAJOR ORDER: row1 frames0–3 four phases of melee impact streak: starts small, active arc, fullest strike, dissipating. row2 frames4–7 four phases of skill charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8–11 four distinct looping moving projectile/effect phases, all traveling RIGHT, isolated sprite can translate independently without its caster. row4 frames12–15 skill impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16–19 four residual field/orbit/summon phases: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX, no beasts. Detached fragments stay inside cell.
Melee effect row1: two bronze downward claw slash streaks with amber impact flecks, no paws. Skill rows2–5: bronze amber seismic stone magic. Charge tight pebble orb and fissure sparks; traveling low jagged ground shockwave segment RIGHT with a curling amber rim and small rocks; impact angular rock explosion; residual compact glowing cracked-earth sigil with levitating pebbles, no terrain tile. Keep all components standalone, detached and creature-free.
```

Bản được chọn: Lần tạo gốc.

Lưu tại: art/beasts/effects-v1/forest/son-hung-source.png

## phong-duong

Nguồn tham khảo đã xem: art/beasts/forest-v1/phong-duong-source.png

Lần tạo gốc: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-06e0ab42-c30f-45d6-9241-d64d55cd5ae7.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. This sheet contains EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, teeth anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns ×5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024×1280, each cell256×256. Every effect CENTERED INSIDE own cell, blank transparent margins at least20% of cell on all sides, maximum effect width/height150px. NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp visible pixels and tiny clustered highlights, dark thin outline, muted saturated fantasy colors, no blurry smoke.
EXACT ROW-MAJOR ORDER: row1 frames0–3 four phases of melee impact streak: starts small, active arc, fullest strike, dissipating. row2 frames4–7 four phases of skill charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8–11 four distinct looping moving projectile/effect phases, all traveling RIGHT, isolated sprite can translate independently without its caster. row4 frames12–15 skill impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16–19 four residual field/orbit/summon phases: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX, no beasts. Detached fragments stay inside cell.
Melee effect row1: two turquoise curled impact arcs with white compressed cloud glint, no horns. Skill rows2–5: turquoise cyan ivory wind. Charge two spiraling turquoise wind rings; projectile one compact tornado with spiral wisps curling right, four cycling vortex shapes; impact unraveling turquoise wind burst; residual two small turquoise wind rings orbiting empty center. Keep all components standalone, detached and creature-free.
```

Bản được chọn: Lần tạo gốc.

Lưu tại: art/beasts/effects-v1/forest/phong-duong-source.png

## hoa-dieu

Nguồn tham khảo đã xem: art/beasts/forest-v1/hoa-dieu-source.png

Lần tạo gốc: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-b352f945-f5fe-45b6-8ee1-d34499b3856e.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. This sheet contains EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, teeth anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns ×5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024×1280, each cell256×256. Every effect CENTERED INSIDE own cell, blank transparent margins at least20% of cell on all sides, maximum effect width/height150px. NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp visible pixels and tiny clustered highlights, dark thin outline, muted saturated fantasy colors, no blurry smoke.
EXACT ROW-MAJOR ORDER: row1 frames0–3 four phases of melee impact streak: starts small, active arc, fullest strike, dissipating. row2 frames4–7 four phases of skill charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8–11 four distinct looping moving projectile/effect phases, all traveling RIGHT, isolated sprite can translate independently without its caster. row4 frames12–15 skill impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16–19 four residual field/orbit/summon phases: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX, no beasts. Detached fragments stay inside cell.
Melee effect row1: three gold-orange diagonal diving slash streaks with vermilion sparks, no talons or bird. Skill rows2–5: vermilion orange gold flame. Charge golden ember orb ring; projectile three isolated flaming feather-shaped energy bolts pointing right with short fire trails, no bird wings; impact fire petal explosion; residual smoldering golden ember swirl. Keep all components standalone, detached and creature-free.
```

Lần sửa: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-b88d746d-23ce-46a7-ac08-e087500d4056.png

Prompt sửa chính xác:

```text
Fix only sprite sheet separation. Preserve all twenty effects, their identities and exact4×5 row-major order. This is a TRANSPARENT FX-ONLY game animation sheet. Shrink EVERY effect cluster to fit inside central50% of its equal cell and CENTER it precisely. Remove all detached ambient haze/speckles outside the compact effect cluster. MUST leave 25% completely transparent padding on every edge of each cell: four clean transparent vertical lanes and five clean horizontal lanes. NO continuous fog, no background, no rectangular patches, no animals, no text, no grid. Keep localized flame/ice highlights within each isolated cluster. All20 cells nonempty, same effect choreography.
```

Bản được chọn: Lần sửa.

Lưu tại: art/beasts/effects-v1/forest/hoa-dieu-source.png

## bang-ho

Nguồn tham khảo đã xem: art/beasts/forest-v1/bang-ho-source.png

Lần tạo gốc: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-5c90366a-55eb-4c5c-a5b0-8a2c79f10c02.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. This sheet contains EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, teeth anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns ×5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024×1280, each cell256×256. Every effect CENTERED INSIDE own cell, blank transparent margins at least20% of cell on all sides, maximum effect width/height150px. NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp visible pixels and tiny clustered highlights, dark thin outline, muted saturated fantasy colors, no blurry smoke.
EXACT ROW-MAJOR ORDER: row1 frames0–3 four phases of melee impact streak: starts small, active arc, fullest strike, dissipating. row2 frames4–7 four phases of skill charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8–11 four distinct looping moving projectile/effect phases, all traveling RIGHT, isolated sprite can translate independently without its caster. row4 frames12–15 skill impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16–19 four residual field/orbit/summon phases: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX, no beasts. Detached fragments stay inside cell.
Melee effect row1: three cyan white claw slash arcs and ice particles, no tiger or paw. Skill rows2–5: icy cyan azure white. Charge snowflake crystal orb; traveling ground segment THREE short pointed blue ice spikes rising from frost rim and leaning right, no teeth anatomy; impact shattering ice starburst; residual small frost ring with floating diamond crystals. Keep all components standalone, detached and creature-free.
```

Lần sửa: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-12e2126a-0198-4e91-a257-accf1bbd870a.png

Prompt sửa chính xác:

```text
Fix only sprite sheet separation. Preserve all twenty effects, their identities and exact4×5 row-major order. This is a TRANSPARENT FX-ONLY game animation sheet. Shrink EVERY effect cluster to fit inside central50% of its equal cell and CENTER it precisely. Remove all detached ambient haze/speckles outside the compact effect cluster. MUST leave 25% completely transparent padding on every edge of each cell: four clean transparent vertical lanes and five clean horizontal lanes. NO continuous fog, no background, no rectangular patches, no animals, no text, no grid. Keep localized flame/ice highlights within each isolated cluster. All20 cells nonempty, same effect choreography.
```

Bản được chọn: Lần sửa.

Lưu tại: art/beasts/effects-v1/forest/bang-ho-source.png

## am-buc

Nguồn tham khảo đã xem: art/beasts/forest-v1/am-buc-source.png

Lần tạo gốc: /home/anhnv/.codex/generated_images/01a10ed0-1e1e-7cf0-9f65-493669845c38/exec-a0a655a8-4dce-40e2-9d72-aa5709af624e.png

Prompt chính xác:

```text
Use case: stylized-concept. Asset type: standalone pixel-art combat VFX animation spritesheet for Japanese fantasy cultivation side-scrolling game. This sheet contains EFFECTS ONLY, for separate animation layers moving independently of creatures. NO animals, monsters, bodies, heads, faces, limbs, paws, wings, teeth anatomy, people or scenery. No text, labels, grid or background. True transparent background.
EXACT 20 nonempty frames in STRICT UNIFORM 4 columns ×5 rows, all equal cells. Canvas portrait ratio4:5 preferably1024×1280, each cell256×256. Every effect CENTERED INSIDE own cell, blank transparent margins at least20% of cell on all sides, maximum effect width/height150px. NEVER touch neighboring effects. Constant effect scale per4frame animation group; different actual hand-drawn temporal shapes, not copied transformed duplicates. Crisp visible pixels and tiny clustered highlights, dark thin outline, muted saturated fantasy colors, no blurry smoke.
EXACT ROW-MAJOR ORDER: row1 frames0–3 four phases of melee impact streak: starts small, active arc, fullest strike, dissipating. row2 frames4–7 four phases of skill charge: seed spark, accumulating swirl, tight charged core, full poised energy. row3 frames8–11 four distinct looping moving projectile/effect phases, all traveling RIGHT, isolated sprite can translate independently without its caster. row4 frames12–15 skill impact: initial contact, growing burst, full burst, shrinking fragments. row5 frames16–19 four residual field/orbit/summon phases: settles, pulses, weakens, dissolves but frame19 still nonempty. Every cell contains meaningful FX, no beasts. Detached fragments stay inside cell.
Melee effect row1: indigo violet thin sweeping sickle arc with pale purple contact glints, no wing or bat. Skill rows2–5: violet purple indigo sonic magic. Charge small concentric luminous circles gathering; projectile three elliptical sonic rings with rightward forward glow and short violet wave trails; impact shattered expanding ring burst; residual small orbiting broken ring segments. Keep all components standalone, detached and creature-free.
```

Bản được chọn: Lần tạo gốc.

Lưu tại: art/beasts/effects-v1/forest/am-buc-source.png
