# Medium flying beast FX — ImageGen provenance

Date: 2026-10-06. Built-in image_gen; transparent_background=true on every call. All seven final sheets visually inspected: 4×5, twenty detached FX clusters, five four-frame phases, rightward projectiles, no creatures. Ngọc Phi Hồ and Hỏa Khổng Tước initial and edit attempts contained opaque backdrops and were rejected; new CUTOUT generations succeeded. Rejected outputs stay only in original generated directory. Runtime packing normalizes source gutters. This library does not implement combat entities.

## ngoc-phi-ho — Ngọc Phi Hồ

### Initial prompt

Use case: stylized-concept. Asset type: detached game pixel VFX spritesheet. Generate ONE transparent PNG exactly 4 equal columns by 5 equal rows, 20 frames. No text, grid lines, background, characters, animals, body parts, scenery, or shadows. Crisp Japanese JRPG pixel art, dark thin outlines, limited palette with ivory highlights. Equal cells, at least 15 percent transparent gutters every side, all artwork contained per cell. Each row is ONE four-frame clip: row1 melee small arc windup, arc expanding right, peak arc, dissipating sparks; row2 charge small glint, energy gathers, compact sphere brightens, peak charge; row3 ONE isolated RIGHTWARD projectile per cell with evolving internal energy, consistent size, centered for runtime translation; row4 impact tiny burst, expanding starburst, full radial burst, fading fragments; row5 lingering field compact ring, larger ring, weakened ring, fading motes. Travel is NOT a trail connecting frames; effects must detach and move independently.
Subject effects only: wood elemental magic, corresponding to Ngọc Phi Hồ. Melee abstract energy arc from forepaw swipe, NO actual limb. Travel projectile: three jade leaves spiraling forward. Palette follows jade winged fox with ivory muzzle, leaf feather wings, amber eyes, bushy green tail, but NO creature, head, wings or body. Charge compact glowing elemental core; impact matching elemental fragments; field low matching residual ring. Empty canvas must be completely alpha zero, no colored haze.

Original: /home/anhnv/.codex/generated_images/01a11046-d5bc-7062-8c04-9c1a3c149998/exec-43deb2a7-0038-481e-8864-34dcfeb348f5.png

### Rejected edit prompt

Edit this FX spritesheet only: REMOVE the entire continuous green backdrop and all atmospheric color haze. Keep the same 4 columns x 5 rows, twenty isolated pixel-art magical leaf clusters, but every pixel outside those clusters must be alpha ZERO transparent, NOT green, NOT black, NOT checkerboard painted pixels. No blur, no ambient lighting, no halos. Sharp solid tiny pixel clusters separated by huge fully invisible gutters. Row1 leaf crescent melee four phases; row2 compact charge four phases; row3 isolated rightward triple leaf projectile four phases; row4 radial leaf impact four phases; row5 low leaf ring fading four phases. No beast or body parts. Transparent PNG cutouts only.

Original: /home/anhnv/.codex/generated_images/01a11046-d5bc-7062-8c04-9c1a3c149998/exec-10a8de31-b14d-4e78-a812-45b3d6f3d7a8.png

### Selected replacement prompt

Create a CUTOUT pixel FX sprite sheet, exactly 4 columns × 5 rows, 20 small isolated symbols on fully transparent alpha0 background. Empty canvas must have NO COLOR and NO GLOW. Think game texture atlas: small sharply outlined sprite particles separated by huge invisible gutters. Not a poster, no atmospheric lighting, no gradient, no blur, no ambient fog. Each cluster uses only solid pixels and stays in inner60% of each cell. NO creatures, NO scenery, NO text/grid, NO caster or target or body parts. Row1 four curved melee energy trail phases: onset, extension, strike, retracting sparks. Row2 four elemental charge-core buildup phases. Row3 four right-facing traveling projectile phases, same scale, different particle positions. Row4 four impact explosion phases from contact through expanding then fading shards. Row5 four residual low ring phases with fewer particles. All20 cells nonempty. Every pixel outside these20 isolated FX clusters MUST be totally transparent. Japanese JRPG pixel art with hard edges, dark thin outlines, nuanced muted highlights, no soft glows or halos.
Subject effects: Jade green leaves with ivory gold highlights. Melee short jade claw arc. Charge small leaf core. Travel detached fan of three green leaves moving right, no fox. Impact scattered jade leaves and gold sparks. Residual low green leaf ring.

Original: /home/anhnv/.codex/generated_images/01a11046-d5bc-7062-8c04-9c1a3c149998/exec-9a3e5734-5bd3-42e8-9e59-1c3e8c9d0c50.png

Selected: art/beasts/effects-flying-v1/medium/ngoc-phi-ho-source.png

## suong-hac — Sương Hạc

### Initial prompt

Use case: stylized-concept. Asset type: detached game pixel VFX spritesheet. Generate ONE transparent PNG exactly 4 equal columns by 5 equal rows, 20 frames. No text, grid lines, background, characters, animals, body parts, scenery, or shadows. Crisp Japanese JRPG pixel art, dark thin outlines, limited palette with ivory highlights. Equal cells, at least 15 percent transparent gutters every side, all artwork contained per cell. Each row is ONE four-frame clip: row1 melee small arc windup, arc expanding right, peak arc, dissipating sparks; row2 charge small glint, energy gathers, compact sphere brightens, peak charge; row3 ONE isolated RIGHTWARD projectile per cell with evolving internal energy, consistent size, centered for runtime translation; row4 impact tiny burst, expanding starburst, full radial burst, fading fragments; row5 lingering field compact ring, larger ring, weakened ring, fading motes. Travel is NOT a trail connecting frames; effects must detach and move independently.
Subject effects only: water elemental magic, corresponding to Sương Hạc. Melee abstract energy arc from long beak lunge, NO actual limb. Travel projectile: a condensed turquoise mist spear. Palette follows elegant white mist crane with long teal neck, bronze beak, pale aqua wing tips, thin dark legs, but NO creature, head, wings or body. Charge compact glowing elemental core; impact matching elemental fragments; field low matching residual ring. Empty canvas must be completely alpha zero, no colored haze.

Original: /home/anhnv/.codex/generated_images/01a11046-d5bc-7062-8c04-9c1a3c149998/exec-dd92bbe0-6802-434c-a00e-37667ff2b04d.png

Selected: art/beasts/effects-flying-v1/medium/suong-hac-source.png

## hoa-khong-tuoc — Hỏa Khổng Tước

### Initial prompt

Use case: stylized-concept. Asset type: detached game pixel VFX spritesheet. Generate ONE transparent PNG exactly 4 equal columns by 5 equal rows, 20 frames. No text, grid lines, background, characters, animals, body parts, scenery, or shadows. Crisp Japanese JRPG pixel art, dark thin outlines, limited palette with ivory highlights. Equal cells, at least 15 percent transparent gutters every side, all artwork contained per cell. Each row is ONE four-frame clip: row1 melee small arc windup, arc expanding right, peak arc, dissipating sparks; row2 charge small glint, energy gathers, compact sphere brightens, peak charge; row3 ONE isolated RIGHTWARD projectile per cell with evolving internal energy, consistent size, centered for runtime translation; row4 impact tiny burst, expanding starburst, full radial burst, fading fragments; row5 lingering field compact ring, larger ring, weakened ring, fading motes. Travel is NOT a trail connecting frames; effects must detach and move independently.
Subject effects only: fire elemental magic, corresponding to Hỏa Khổng Tước. Melee abstract energy arc from talon slash, NO actual limb. Travel projectile: three burning eye feathers. Palette follows scarlet fire peacock with golden crest and compact fan tail of red gold eye feathers, ember wing tips, but NO creature, head, wings or body. Charge compact glowing elemental core; impact matching elemental fragments; field low matching residual ring. Empty canvas must be completely alpha zero, no colored haze.

Original: /home/anhnv/.codex/generated_images/01a11046-d5bc-7062-8c04-9c1a3c149998/exec-773632e0-1cd8-404d-a6ee-a8125157bb64.png

### Rejected edit prompt

Edit this fire FX spritesheet only: REMOVE the entire continuous red orange backdrop and ALL atmospheric haze. Keep same 4 columns x 5 rows, twenty isolated pixel-art flame eye-feather clusters. Every pixel outside those isolated clusters must be alpha ZERO transparent, NOT red, NOT black, NOT painted checkerboard. No blur, ambient lighting or halos. Sharp solid tiny pixel clusters separated by huge invisible gutters. Row1 flame crescent melee four phases; row2 compact flame core four phases; row3 isolated rightward triple fire eye-feather projectile four phases; row4 radial ember impact four phases; row5 low ember ring fading four phases. No beast or body parts. Transparent PNG cutouts only.

Original: /home/anhnv/.codex/generated_images/01a11046-d5bc-7062-8c04-9c1a3c149998/exec-66e34881-bbe5-4c2d-841d-6ec7c1d035a7.png

### Selected replacement prompt

Create a CUTOUT pixel FX sprite sheet, exactly 4 columns × 5 rows, 20 small isolated symbols on fully transparent alpha0 background. Empty canvas must have NO COLOR and NO GLOW. Think game texture atlas: small sharply outlined sprite particles separated by huge invisible gutters. Not a poster, no atmospheric lighting, no gradient, no blur, no ambient fog. Each cluster uses only solid pixels and stays in inner60% of each cell. NO creatures, NO scenery, NO text/grid, NO caster or target or body parts. Row1 four curved melee energy trail phases: onset, extension, strike, retracting sparks. Row2 four elemental charge-core buildup phases. Row3 four right-facing traveling projectile phases, same scale, different particle positions. Row4 four impact explosion phases from contact through expanding then fading shards. Row5 four residual low ring phases with fewer particles. All20 cells nonempty. Every pixel outside these20 isolated FX clusters MUST be totally transparent. Japanese JRPG pixel art with hard edges, dark thin outlines, nuanced muted highlights, no soft glows or halos.
Subject effects: Scarlet gold fire. Melee short fire claw arc. Charge compact ember core. Travel detached fan of three red gold eye-feathers moving right, no peacock. Impact scattered fire feathers and ember sparks. Residual low ember ring.

Original: /home/anhnv/.codex/generated_images/01a11046-d5bc-7062-8c04-9c1a3c149998/exec-0fddeb99-006f-4ec8-866f-f7b651cf33de.png

Selected: art/beasts/effects-flying-v1/medium/hoa-khong-tuoc-source.png

## thiet-phi-dieu — Thiết Phi Điểu

### Initial prompt

Use case: stylized-concept. Asset type: detached game pixel VFX spritesheet. Generate ONE transparent PNG exactly 4 equal columns by 5 equal rows, 20 frames. No text, grid lines, background, characters, animals, body parts, scenery, or shadows. Crisp Japanese JRPG pixel art, dark thin outlines, limited palette with ivory highlights. Equal cells, at least 15 percent transparent gutters every side, all artwork contained per cell. Each row is ONE four-frame clip: row1 melee small arc windup, arc expanding right, peak arc, dissipating sparks; row2 charge small glint, energy gathers, compact sphere brightens, peak charge; row3 ONE isolated RIGHTWARD projectile per cell with evolving internal energy, consistent size, centered for runtime translation; row4 impact tiny burst, expanding starburst, full radial burst, fading fragments; row5 lingering field compact ring, larger ring, weakened ring, fading motes. Travel is NOT a trail connecting frames; effects must detach and move independently.
Subject effects only: metal elemental magic, corresponding to Thiết Phi Điểu. Melee abstract energy arc from diving claw strike, NO actual limb. Travel projectile: a silver feather blade. Palette follows steel grey hawk with bronze beak, segmented silver blade feathers and dark cobalt breast, but NO creature, head, wings or body. Charge compact glowing elemental core; impact matching elemental fragments; field low matching residual ring. Empty canvas must be completely alpha zero, no colored haze.

Original: /home/anhnv/.codex/generated_images/01a11046-d5bc-7062-8c04-9c1a3c149998/exec-dfcb57a8-0efd-4de7-a77e-ec02e7f972d5.png

Selected: art/beasts/effects-flying-v1/medium/thiet-phi-dieu-source.png

## loi-phu-kieu — Lôi Phù Kiêu

### Initial prompt

Use case: stylized-concept. Asset type: detached game pixel VFX spritesheet. Generate ONE transparent PNG exactly 4 equal columns by 5 equal rows, 20 frames. No text, grid lines, background, characters, animals, body parts, scenery, or shadows. Crisp Japanese JRPG pixel art, dark thin outlines, limited palette with ivory highlights. Equal cells, at least 15 percent transparent gutters every side, all artwork contained per cell. Each row is ONE four-frame clip: row1 melee small arc windup, arc expanding right, peak arc, dissipating sparks; row2 charge small glint, energy gathers, compact sphere brightens, peak charge; row3 ONE isolated RIGHTWARD projectile per cell with evolving internal energy, consistent size, centered for runtime translation; row4 impact tiny burst, expanding starburst, full radial burst, fading fragments; row5 lingering field compact ring, larger ring, weakened ring, fading motes. Travel is NOT a trail connecting frames; effects must detach and move independently.
Subject effects only: lightning elemental magic, corresponding to Lôi Phù Kiêu. Melee abstract energy arc from forward talon rake, NO actual limb. Travel projectile: a cyan lightning rune bolt. Palette follows indigo thunder owl with large amber eyes, turquoise ear tufts, angular lightning marks on broad wings, but NO creature, head, wings or body. Charge compact glowing elemental core; impact matching elemental fragments; field low matching residual ring. Empty canvas must be completely alpha zero, no colored haze.

Original: /home/anhnv/.codex/generated_images/01a11046-d5bc-7062-8c04-9c1a3c149998/exec-2796ec20-ef52-4038-bf6f-fff849f1a565.png

Selected: art/beasts/effects-flying-v1/medium/loi-phu-kieu-source.png

## phong-duc-lang — Phong Dực Lang

### Initial prompt

Use case: stylized-concept. Asset type: detached game pixel VFX spritesheet. Generate ONE transparent PNG exactly 4 equal columns by 5 equal rows, 20 frames. No text, grid lines, background, characters, animals, body parts, scenery, or shadows. Crisp Japanese JRPG pixel art, dark thin outlines, limited palette with ivory highlights. Equal cells, at least 15 percent transparent gutters every side, all artwork contained per cell. Each row is ONE four-frame clip: row1 melee small arc windup, arc expanding right, peak arc, dissipating sparks; row2 charge small glint, energy gathers, compact sphere brightens, peak charge; row3 ONE isolated RIGHTWARD projectile per cell with evolving internal energy, consistent size, centered for runtime translation; row4 impact tiny burst, expanding starburst, full radial burst, fading fragments; row5 lingering field compact ring, larger ring, weakened ring, fading motes. Travel is NOT a trail connecting frames; effects must detach and move independently.
Subject effects only: wind elemental magic, corresponding to Phong Dực Lang. Melee abstract energy arc from lunging fang bite, NO actual limb. Travel projectile: a curved mint wind crescent. Palette follows slender grey green winged wolf with long feathered jade wings, cream chest, charcoal paws and alert ears, but NO creature, head, wings or body. Charge compact glowing elemental core; impact matching elemental fragments; field low matching residual ring. Empty canvas must be completely alpha zero, no colored haze.

Original: /home/anhnv/.codex/generated_images/01a11046-d5bc-7062-8c04-9c1a3c149998/exec-8b552ccf-2e87-40dc-b836-93a9070bec96.png

Selected: art/beasts/effects-flying-v1/medium/phong-duc-lang-source.png

## nguyet-phi-tho — Nguyệt Phi Thố

### Initial prompt

Use case: stylized-concept. Asset type: detached game pixel VFX spritesheet. Generate ONE transparent PNG exactly 4 equal columns by 5 equal rows, 20 frames. No text, grid lines, background, characters, animals, body parts, scenery, or shadows. Crisp Japanese JRPG pixel art, dark thin outlines, limited palette with ivory highlights. Equal cells, at least 15 percent transparent gutters every side, all artwork contained per cell. Each row is ONE four-frame clip: row1 melee small arc windup, arc expanding right, peak arc, dissipating sparks; row2 charge small glint, energy gathers, compact sphere brightens, peak charge; row3 ONE isolated RIGHTWARD projectile per cell with evolving internal energy, consistent size, centered for runtime translation; row4 impact tiny burst, expanding starburst, full radial burst, fading fragments; row5 lingering field compact ring, larger ring, weakened ring, fading motes. Travel is NOT a trail connecting frames; effects must detach and move independently.
Subject effects only: ice elemental magic, corresponding to Nguyệt Phi Thố. Melee abstract energy arc from hindleg aerial kick, NO actual limb. Travel projectile: a frosty blue moon disc. Palette follows ivory moon rabbit with pale blue feather wings, long silver tipped ears, small sapphire moon mark on brow, but NO creature, head, wings or body. Charge compact glowing elemental core; impact matching elemental fragments; field low matching residual ring. Empty canvas must be completely alpha zero, no colored haze.

Original: /home/anhnv/.codex/generated_images/01a11046-d5bc-7062-8c04-9c1a3c149998/exec-54f985e0-67e3-4118-bad6-5f16ba8de15b.png

Selected: art/beasts/effects-flying-v1/medium/nguyet-phi-tho-source.png
