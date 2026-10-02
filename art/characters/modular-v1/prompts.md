# Sửa tạo hình về mẫu gốc — ImageGen tích hợp

Source chỉnh sửa là `base-body-source.png` và `outfit-jade-source.png` trong thư mục asset public. Frame đứng dùng nguyên PNG 128px đã chọn; không tái tạo bằng AI.

## Body key poses

Use case: identity-preserve.
Make a production pixel-art animation keypose sheet of the EXACT bald adult gender-neutral mannequin in reference image 1. Reference image 2 is its matching outfit for silhouette context only: DO NOT render clothing. Preserve original slender proportions, long legs, four-head-tall body, head shape, faceless face, peach skin shading, fine pixel detail. No hair, no breasts or genitals, smooth featureless doll anatomy. NOT blocky 32px chibi, NOT a redesign.
OUTPUT: square transparent PNG contact sheet, exactly 4 columns and 4 rows of equally sized square cells, ideally 2048x2048. Every pose stays strictly within its own cell with clear transparent gutters. No text, labels, grid lines, floor or shadows. All sprites face right or 3/4 right. Fixed anatomical scale and proportions across ALL cells: standing character height 82% of cell. Feet ground baseline 91% of cell; low poses remain low on that same baseline. No scaling up seated/prone characters.
Exact row-major arrangement:
row 1: neutral standing ORIGINAL pose; walk left foot forward; walk right foot forward; running long stride left foot forward.
row 2: running right foot forward; airborne jump knees bent; horizontal flying to right arms forward body straight; wave hello hand raised open palm.
row 3: wave hello with palm tilted opposite; scratch head hand touching bald scalp; scratch head slightly different elbow; sleepy slumped standing head bowed.
row 4: seated on ground knees bent facing right; crawling on hands and knees facing right; injured recoiling clutching chest (NO injury marks); collapsed lying horizontally on side on ground with head on right.
Keep carefully articulated hands feet elbows knees, clean fine pixel edges and same original shading. All sixteen figures fully visible, no clipping. Strict uniform invisible grid. Transparent everywhere outside the sixteen bodies.

## Clothing overlay

Use case: precise-object-edit.
Image 1 is EDIT TARGET: sixteen bald mannequin animation poses on transparent background. Image 2 is the EXACT approved jade clothing design reference.
Create a PAPER-DOLL CLOTHING OVERLAY for EVERY pose in image 1. Keep EXACT image 1 canvas dimensions and every pose at its EXACT pixel position and anatomical scale. DO NOT rearrange, center, resize, re-pose, shift or change the sixteen silhouettes.
Dress each pose in the identical outfit from image 2: jade green wrap tunic with finely shaded folds, ivory crossed collar and cuffs, wide ivory belt tied at right with long ivory hanging sash, dark forest loose trousers, soft brown ankle shoes. Preserve original fine pixel detail; NOT chunky geometric shapes. Naturally bend sleeves, trousers, sash and tunic hem to match each pose.
OUTPUT CLOTHING ONLY, transparent background. Remove ALL mannequin body pixels: heads, faces, bald scalps, hands, exposed wrists, skin in collar holes must be FULLY TRANSPARENT. Keep only fabric and shoes. No skin-colored pixels; no hair; no extra objects, no labels, no grid, no shadows. Original source image should be able to be alpha-composited beneath this layer with all 16 outfits aligned. Pose order and placement must match image 1 exactly including the prone and flying figures. Do not draw necks or heads.

## Coverage correction

Use case: precise-object-edit. Image 1 is the clothing-only overlay edit target. Image 2 is the exact underlying bald mannequin body sheet, an alignment template. Image 3 is original clothing design reference.
Correct clothing coverage and alignment ONLY, keep whole canvas size and all sixteen locations exactly unchanged.
The last row has mistakes: the seated figure's trousers and shoes fail to fully cover the mannequin legs and feet underneath; the prone collapsed outfit is placed too high leaving a stripe of bare legs/torso along the ground. Enlarge/reposition only these cloth silhouettes to fully cover the corresponding legs, feet, torso and upper arms on image 2. All feet must be enclosed by shoes. Align cuffs just before hands, collars below heads. For the crawling figure similarly cover legs/feet fully. Keep head and hands locations in mind from image 2 but leave them TRANSPARENT in output. Preserve all other poses as closely as possible.
Retain original fine pixel art, jade wrap robe, ivory collar/cuffs and long hanging belt, forest trousers, brown shoes. No body skin in output. Transparent background. Output just clothing layers of all sixteen figures, not clothed people. Never redraw the mannequin in output, never add heads or hands. No text no grid no shadows.

`outfit-keyposes-first.png` là lần tạo đầu để đối chiếu; packer chỉ dùng `outfit-keyposes-source.png` đã sửa. Cả hai source sheet giữ bản gốc ImageGen. Xuất PNG xử lý các pixel matte gần như trong suốt (alpha <= 8), không làm giảm palette hay vẽ lại chi tiết.
