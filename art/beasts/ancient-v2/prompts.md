# Cổ thú bổ sung v2 — nguồn ImageGen

Generated with built-in ImageGen; transparent_background: true. Internal original fantasy designs, no external licensed art. Each image is one new beast with 20 poses arranged 4 columns × 5 rows, with attached attack/skill effects. No combat implementation or detached VFX is included. Quang Lân uses metal (Kim), since the catalog has no light element.

## Exact prompt common to every generation

Use case: stylized-concept. Asset type: production 2D side-view game pixel spritesheet for Vietnamese cultivation fantasy. Draw ONE beast repeated as TWENTY distinct animation poses in strictly uniform 4 columns x 5 rows, row-major order. Transparent background, NO text, labels, borders, gridlines or scenery. Japanese-inspired polished JRPG pixel art, dark sharp pixel outlines, restrained rich palette, hard square pixel edges, no smooth painting. Same creature identity and body scale in ALL 20 cells, right facing side view. Every full creature body remains visible in EVERY cell including skill frames; do not replace creature with effects alone. Equal cells, center horizontally, grounded feet near bottom except airborne poses. Render 1024 x 1280 sheet. Pose order: row1 idle calm, idle breath visibly lower, walk front-right contact, walk passing legs tucked; row2 opposite contact, opposite passing, jump deep crouch, jump airborne extended; row3 jump landing compressed, basic attack windup, basic attack strike, basic attack follow-through; row4 attack recovery, special skill charge, skill release, skill expands; row5 skill recovery, hurt recoil, collapse falling sideways, collapsed lying down. Frames 10-12 depict basic attack with attached VFX; frames 14-16 depict special skill. Frame20 lying horizontally knocked out. Do not merely mirror or translate duplicate sprites. CRITICAL gutters: creature occupies only 55% each cell width and 58% height. Entire VFX at most78% cell width. Minimum12% transparent padding each side each cell; no neighbors touch.

The exact full prompt sent for each beast is the common prompt above + a newline + its Subject line below. No reference images were supplied.

## Dung Giao (dung-giao)

Subject: Compact charcoal and red fire salamander dragon, four stocky legs, orange lava cracks across scales, blunt horned head and ember tail fin. Basic attack tail lash with orange crescent; skill opens jaws and breathes molten orange fire plume.

Project copy: `art/beasts/ancient-v2/dung-giao-source.png`.

## Nham Tượng (nham-tuong)

Subject: Earth mammoth with ochre shaggy fur, broad stone armor plates across back, two ivory curved tusks and sturdy trunk. Basic tusk upswing lifts stone chips; skill front feet slam ground raising three jagged stone pillars.

Project copy: `art/beasts/ancient-v2/nham-tuong-source.png`.

## U Bức (u-buc)

Subject: Dark giant bat with violet black leathery wings, huge pointed ears, tiny pale fangs, glowing lavender eyes and clawed feet. Basic wing edge slash creates short purple arc; skill opens mouth emitting concentric violet sonic rings. Walk frames use folded wings crawling; jump flaps.

Project copy: `art/beasts/ancient-v2/u-buc-source.png`.

## Quang Lân (quang-lan)

Subject: Radiant golden pangolin with overlapping brass ivory scales, small pointed snout, long curled armored tail, bright amber eyes and four short clawed legs. Basic tail sweeps golden crescent; skill curls partly and radiates a halo of golden scale blades.

Project copy: `art/beasts/ancient-v2/quang-lan-source.png`.

## Lôi Mã (loi-ma)

Subject: Midnight blue lightning horse with luminous cyan mane and tail, bronze horseshoes, lean powerful equine body and white forehead bolt marking. Basic double front hoof kick creates blue sparks; skill rears and calls branching electric bolts around forelegs.

Project copy: `art/beasts/ancient-v2/loi-ma-source.png`.

## Băng Bằng (bang-bang)

Subject: Ice peng giant mythic bird: compact blue white feathered roc eagle, hooked ivory beak, frosted crown, two powerful talons and broad crystalline feather wings. Basic talon rake creates icy slash; skill spreads wings releasing a fan of three ice feather lances. Maintain bird body in all cells.

Project copy: `art/beasts/ancient-v2/bang-bang-source.png`.


## Original generated artifacts

- dung-giao: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-839c52c1-09fb-43f9-9066-7e3a76f4de27.png`
- nham-tuong: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-328105c0-d8a5-4a35-8752-65ec566f4901.png`
- u-buc: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-ca946687-8085-4263-ad21-c49085143cde.png`
- quang-lan: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-da5eb980-6795-4cb3-beba-d4662db83945.png`
- loi-ma: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-2874b878-e4be-4899-89bc-42f57a13788e.png`
- bang-bang: `/home/anhnv/.codex/generated_images/01a11028-b952-7ff3-8b2a-045c33601409/exec-46f36c28-173b-4371-b920-5164996c4f9a.png`

Visual QA: inspected all six sheets; twenty poses and full creature body remain visible in all cells, including attached skill effects and horizontal collapse. Sources contain actual transparency. Native dimensions1122×1402; attached VFX sometimes approaches cell gutters, so use the existing adaptive seam crop pipeline for runtime repacking.
