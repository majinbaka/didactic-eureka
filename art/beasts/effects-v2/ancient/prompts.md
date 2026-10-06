# Hiệu ứng cổ thú mở rộng v2

Six new FX-only sources generated with built-in ImageGen and transparent_background: true. Each has twenty distinct phases: melee4, charge4, travel4, impact4, field4, in a4×5 sheet. Internal original fantasy effect art; no external licensed assets. Creature bodies are intentionally absent. Metadata defines independent ranged render motion only; no damage/collision/AI implementation.

## Exact common generation prompt

Use case: stylized-concept. Production Japanese-inspired crisp low-resolution pixel art VFX-only spritesheet for 2D sideview cultivation fantasy game. EXACTLY TWENTY nonempty independently drawn distinct effect frames, perfectly uniform FOUR COLUMNS by FIVE ROWS. Equal cells, no gridlines, labels, text, watermark. True transparent alpha background. ONLY detached magic effects; absolutely NO animals, creatures, silhouettes, characters, body, face, limbs, fur, wings, claws, hands or feet. Effects centered entirely within CENTRAL50% of each equal cell; minimum25% completely clear transparent padding ALLFOURSIDES each cell. No haze or stray colored noise between cells, no connecting trails. Hard square pixel edges, small restrained palette, no smooth painting. Consistent scale within each row clip. Draw full effect silhouette without clipping. Portrait sheet1024x1280. EXACT row order: row1 melee initiation/strike/full/fade (4 phases); row2 charge buildup1/2/3/4; row3 independent ranged skill travel4-cycle; row4 impact start/expand/peak/fade; row5 residual field4-cycle. Twenty separated small effect clusters, five rowsfour columns. Each phase drawn differently, no duplicate copy. Direction of travel is RIGHT: bright leading tip at RIGHT, trailing streaks at LEFT. Creature name used only as metadata, never draw any creature.

The exact generation input was the common prompt above + newline + `VFX palette and exact clip content: ` + the per-beast content below. No reference images were supplied for initial generation.

## Dung Giao (dung-giao)

VFX palette and exact clip content: Palette molten orange scarlet fire with bright ivory core and charcoal ember grains. Row1 detached curved orange tail-lash arc no actual tail; row2 small flame motes accumulate into orange molten core; row3 horizontal fire breath BEAM SEGMENT starting LEFT and expanding RIGHT, flame leading tipRIGHT, four undulating phases; row4 explosive orange fire bloom four expansion/fade phases; row5 small detached patch of molten embers and low flames, four flicker phases.

Initial artifact: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-7ff9fbce-a7d5-4258-9e09-5cd4b91bced6.png`.

## Nham Tượng (nham-tuong)

VFX palette and exact clip content: Palette ochre brown earth magic and warm amber glows. Row1 detached ivory amber upswing slash with stonechips, no actual tusks; row2 brown rockchips condense into amber ground sigil; row3 cluster of THREE jagged stone pillars forming sequential rightward ground shockwave, four rising/shifting phases; row4 rock shatter impact burst four expansion/fade phases; row5 three low stone shards rooted in small amber cracks with four glowing phases. No scenery or ground slab.

Initial artifact: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-911d2ddf-cf08-4079-91a0-b9ea3dbe8443.png`.

## U Bức (u-buc)

VFX palette and exact clip content: Palette violet black shadow magic, luminous lavender centers. Row1 detached violet crescent slash, no actual wings; row2 lavender motes condense into small concentric ring; row3 THREE concentric violet sonic ring projectiles advancing RIGHT, bright round leading rim atRIGHT and trailing lavender ripplesLEFT, four pulse phases; row4 violet sonic starburst impact four expansion/fade phases; row5 hollow purple resonance circle with small lavender motes in four ripple phases.

Initial artifact: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-3647d012-260c-451a-b2e2-4b7788508e54.png`.

## Quang Lân (quang-lan)

VFX palette and exact clip content: Palette bright golden brass ivory metal magic. Row1 detached golden crescent sweep no actual tail; row2 golden motes accumulate into circular radiant charge; row3 THREE diamond-shaped golden scale BLADES projectiles pointingRIGHT with bright ivory tipsRIGHT and golden streaksLEFT, four shimmer phases; row4 glittering gold metal shard burst four expansion/fade phases; row5 hollow radiant halo with small diamond blades at rim rotating in four distinct phases. No animal or body scales attached to creature.

Initial artifact: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-3142fa49-1499-4ecd-864f-7d6b15d39e4c.png`.

## Lôi Mã (loi-ma)

VFX palette and exact clip content: Palette electric cyan blue and white lightning. Row1 two short cyan impact slash sparks from kick, no actual legs or hooves; row2 blue sparks condense into electric ball; row3 horizontal BRANCHING LIGHTNING BEAM from LEFT to RIGHT, white core with cyan outer branches, four changing jagged pulse phases; row4 electric white cyan starburst four expansion/fade phases; row5 small patch of cyan electric arc fragments crawling around hollow circle in four changing phases.

Initial artifact: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-08c93341-5dcd-4690-9d07-1a83df0d44d8.png`.

## Băng Bằng (bang-bang)

VFX palette and exact clip content: Palette ice blue white cold magic with deep sapphire edges. Row1 detached THREE icy rake slashes, no actual talons; row2 pale blue flakes gather into crystalline ice charge; row3 THREE slender crystal ice feather-shaped LANCES fanned and pointingRIGHT, sharp bright tipsRIGHT, pale vapor trailsLEFT, four shimmering phases; row4 blue ice shards impactburst four expansion/fade phases; row5 small patch of tiny blue ice crystals with pale cold ring four flickering phases. No literal bird feathers attached to body or wings.

Initial artifact: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-b9ce684d-836e-42d9-a239-26b6a75a4f76.png`.


## Exact cleanup prompts

### dung-giao

Reference input was the initial artifact above; imagegen referenced_image_paths contained that one path. transparent_background: true.

Use case: precise-object-edit. Clean this transparent pixel VFX-only spritesheet. Preserve EXACTLY20 separate effects,4columns5rows, correct five rows melee/charge/travel/impact/field. Remove ALL haze, noisy colored dust and speckles connecting adjacent effect clusters. Each entire effect confined strictly inside CENTRAL50% of its equalcell, with minimum25% empty padding EACHside100%alpha0. Shrink effects to half-cellwidth and half-cellheight if needed preserving full silhouettes, never crop. Clean ALL gutters completelyalpha0. Keep same20distinct animation phases,palette,and directionalRIGHT travel: bright leading tipsRIGHT,trailing strokesLEFT. No continuousbackground,no rectangles,text,gridlines,animals,creaturebodies or limbs. Only20small isolated crisp square-pixel effects with wide completely clear transparent gutters.

Cleanup artifact: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-68777898-c7f0-4592-8b2d-d16030b2cac5.png`.

### nham-tuong

Reference input was the initial artifact above; imagegen referenced_image_paths contained that one path. transparent_background: true.

Use case: precise-object-edit. Clean this transparent pixel VFX-only spritesheet. Preserve EXACTLY20 separate effects,4columns5rows, correct five rows melee/charge/travel/impact/field. Remove ALL haze, noisy colored dust and speckles connecting adjacent effect clusters. Each entire effect confined strictly inside CENTRAL50% of its equalcell, with minimum25% empty padding EACHside100%alpha0. Shrink effects to half-cellwidth and half-cellheight if needed preserving full silhouettes, never crop. Clean ALL gutters completelyalpha0. Keep same20distinct animation phases,palette,and directionalRIGHT travel: bright leading tipsRIGHT,trailing strokesLEFT. No continuousbackground,no rectangles,text,gridlines,animals,creaturebodies or limbs. Only20small isolated crisp square-pixel effects with wide completely clear transparent gutters.

Cleanup artifact: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-7685e8ec-44a5-4024-bfa1-c15eded8319e.png`.

### u-buc

Reference input was the initial artifact above; imagegen referenced_image_paths contained that one path. transparent_background: true.

Use case: precise-object-edit. Clean this transparent pixel VFX-only spritesheet. Preserve EXACTLY20 separate effects,4columns5rows, correct five rows melee/charge/travel/impact/field. Remove ALL haze, noisy colored dust and speckles connecting adjacent effect clusters. Each entire effect confined strictly inside CENTRAL50% of its equalcell, with minimum25% empty padding EACHside100%alpha0. Shrink effects to half-cellwidth and half-cellheight if needed preserving full silhouettes, never crop. Clean ALL gutters completelyalpha0. Keep same20distinct animation phases,palette,and directionalRIGHT travel: bright leading tipsRIGHT,trailing strokesLEFT. No continuousbackground,no rectangles,text,gridlines,animals,creaturebodies or limbs. Only20small isolated crisp square-pixel effects with wide completely clear transparent gutters.

Cleanup artifact: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-9676d2ca-6831-4874-bae9-ba51492a683f.png`.

### quang-lan

Reference input was the initial artifact above; imagegen referenced_image_paths contained that one path. transparent_background: true.

Edit this sprite sheet. Remove the red and yellow background noise entirely. Keep only the twenty main golden effect shapes. Resize every main effect to a small isolated sprite within the center half of its cell. Exactly four columns and five rows on a fully transparent background. Every cell must have a clean empty border on all sides at least one quarter of cell width. NO stray glow, haze, sparks, dust or pixels in the gutters. Preserve each effect's full shape, row order and twenty distinct phases. Preserve the rightward golden blade projectiles in row three. No text, no lines, no creatures.

Cleanup artifact: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-2b4f90d6-8d77-4546-84ee-3ebce24e59ae.png`.

### loi-ma

Reference input was the initial artifact above; imagegen referenced_image_paths contained that one path. transparent_background: true.

Use case: precise-object-edit. Remove ALL blue noisy dust/haze connecting adjacent effect cells from this transparent pixel VFX-only sheet. Preserve EXACTLY20 effects,4columns5rows: melee/charge/travel/impact/field each rowfourframes. Everyeffect must be small confined STRICTLYCENTRAL50%of its equalcell; empty25%paddingALLFOURSIDES100%alpha0. Shrink full effect silhouettes rather than cropping. NO continuousbluebackground,no colored haze,no particles outside central50%cell. Keep20different phases,electriccyanwhitepalette,and row3 horizontalRIGHT lightning beam with brightleadRIGHT,trailsLEFT. No creatures,bodies,text,gridlines. Only20isolated small pixel effects on truly clear transparent background.

Cleanup artifact: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-8ca9ff51-a3f8-4575-a392-258c0ff1b86a.png`.

### bang-bang

Reference input was the initial artifact above; imagegen referenced_image_paths contained that one path. transparent_background: true.

Edit this sprite sheet. Remove the blue and cyan background noise entirely. Keep only the twenty main icy effect shapes. Resize every main effect to a small isolated sprite within the center half of its cell. Exactly four columns and five rows on a fully transparent background. Every cell must have a clean empty border on all sides at least one quarter of cell width. NO stray glow, haze, sparks, dust or pixels in the gutters. Preserve each effect's full shape, row order and twenty distinct phases. Preserve the three rightward ice lances in row three. No text, no lines, no creatures.

Cleanup artifact: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-5e4d9340-8cf1-42e0-a3c6-bb626e7e83e0.png`.


### bang-bang second cleanup

Input reference: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-5e4d9340-8cf1-42e0-a3c6-bb626e7e83e0.png`.

Rebuild the supplied icy magic effects into a CLEAN game sprite sheet. Exactly 4 columns and 5 rows of 20 small effect sprites. Make the sprites HALF THEIR CURRENT SIZE so there is a huge empty transparent gutter around every one. Completely DELETE all blue/cyan stippled noise, fog and haze between the sprites. Each effect has a sharply bounded silhouette with alpha zero immediately outside that silhouette. Draw only the 20 main effect shapes; discard ALL surrounding ambient mist. Row 1 three curved ice slash streaks, row 2 charge crystal growing, row 3 three sharp ice lances flying RIGHT with short tails on LEFT, row 4 ice shard impact expanding then fading, row 5 a few tiny ice crystals on a ring. Four different phases per row. Use true transparent background, no text, no animals. Wide clean empty transparent gutters are the primary required change.

Final artifact: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-3646af79-8654-4698-9e22-063bcc5cb8fb.png`.

## Selected project sources and QA

- dung-giao: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-68777898-c7f0-4592-8b2d-d16030b2cac5.png` → `art/beasts/effects-v2/ancient/dung-giao-source.png`
- nham-tuong: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-7685e8ec-44a5-4024-bfa1-c15eded8319e.png` → `art/beasts/effects-v2/ancient/nham-tuong-source.png`
- u-buc: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-9676d2ca-6831-4874-bae9-ba51492a683f.png` → `art/beasts/effects-v2/ancient/u-buc-source.png`
- quang-lan: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-2b4f90d6-8d77-4546-84ee-3ebce24e59ae.png` → `art/beasts/effects-v2/ancient/quang-lan-source.png`
- loi-ma: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-8ca9ff51-a3f8-4575-a392-258c0ff1b86a.png` → `art/beasts/effects-v2/ancient/loi-ma-source.png`
- bang-bang: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-3646af79-8654-4698-9e22-063bcc5cb8fb.png` → `art/beasts/effects-v2/ancient/bang-bang-source.png`

Inspected all six selected outputs: exactly20 nonempty FX-only shapes, correct five clip rows, no creature bodies. Actual RGBA alpha is0..255. Cleanup reduced surrounding haze; some small disconnected spark/dust particles remain. Existing adaptive crop retains particles inside each cell. Sources tested with effectCrops and packEffectFrames:20 crops and20 distinct packed frames per beast. No hitbox/damage/AI integrated.
