# Review rubric

## Scoring dimensions

Score 1–10 with scene/node/choice evidence. Anchors: 1–2 broken/absent; 3–4 materially weak; 5–6 functional but uneven; 7–8 strong/purposeful; 9–10 exceptional execution supported by evidence. Absence of a defect alone does not earn 10.

| Dimension | Evaluate |
| --- | --- |
| HOOK | Specific reason to enter and continue now |
| PLAYER AGENCY | Discover, cause, prevent, choose, fail, interrupt, investigate or change |
| CHARACTER QUALITY | Independent agendas, credible motives, development |
| DIALOGUE | Distinct voices, subtext, responses, economy |
| CONFLICT | Competing goals, stakes, escalation |
| PACING | Progression, interaction rhythm, repetition/delays |
| EMOTIONAL IMPACT | Feeling earned through setup, relationships, actions |
| MYSTERY / CURIOSITY | Questions, clues, changing understanding |
| GAMEPLAY INTEGRATION | Mechanics/player action carry narrative meaning |
| ENVIRONMENTAL STORYTELLING | Interactive evidence and world responses |
| CONTINUITY | Current manager report and consistency evidence |
| PAYOFF | Promises, setups and choices receive consequences |

Report all twelve. For genuinely inapplicable/unverifiable dimensions use `N/A — reason` or `not verified — reason` instead of fabricated scores. Overall is arithmetic mean of scored dimensions rounded to one decimal; disclose exclusions and provisional scores. List blockers separately regardless of average.

## Defect detector

Check EXPOSITION DUMP, NPC INFORMATION MACHINE, FAKE CHOICE, PASSIVE PLAYER, GENERIC DIALOGUE, SAME CHARACTER VOICE, CONVENIENT PLOT, UNEARNT REVELATION, MISSING FORESHADOWING, NO CONFLICT, WEAK MOTIVATION, REPETITIVE SCENE, PREDICTABLE EVENT, NO CONSEQUENCE, TOO MUCH DIALOGUE, GAMEPLAY-STORY DISCONNECT, LORE OVERLOAD, EMOTIONAL MANIPULATION WITHOUT SETUP, DEUS EX MACHINA and CHARACTER ACTING OUT OF CHARACTER.

Name defects with evidence/player impact. An honest flavor choice is not automatically fake; a mystery is not automatically confusing; quiet scenes can deliver relationship development/payoff.

## Four experience tests

1. Boredom: If the scene vanished, what would the player lose? If almost nothing, recommend REMOVE, MERGE or REDESIGN, including effects on downstream state/clues.
2. Agency: Could the scene work almost unchanged without the player? If yes, propose specific supported discovery, causation, prevention, choice, failure, interruption, investigation or change.
3. Dialogue: Could major information be discovered, shown, experienced or interacted with? Suggest a concrete gameplay/environmental replacement and implementation dependencies.
4. Engagement: Why continue RIGHT NOW at scene end? Identify the actual hook; propose stronger feasible hooks without exposing protected revelations.

## Review output

```text
# Narrative Review
Source revisions / scene scope / continuity baseline:
Coverage, limits and confidence:

## Overall Score
X/10; calculation and exclusions/provisional scores
All twelve dimensions with evidence
Blocking issues independent of average

## Strong Elements
Only supported strengths; none if unsupported

## Critical Problems
For each:
Problem:
Why it hurts the experience:
Example: scene/node/choice ID and precise passage/action
Recommended change:

## Scene-level Problems
By Scene ID

## Player Agency Analysis
## Character Analysis
## Dialogue Analysis
## Pacing Analysis
## Mystery / Foreshadowing Analysis
## Gameplay Integration Analysis

## Recommended Changes
MUST FIX / SHOULD FIX / OPTIONAL
Each: finding ID, owner, concrete change, affected paths, cost/dependencies

## Rewrite Instructions
For game-story-writer:
Scene IDs and source revisions:
Preserve: strong beats, locked canon, secrets, IDs, effects
Change: exact event/action/interaction, player impact, constraints
Acceptance criteria: observable resulting behavior
Downstream dialogue/continuity/review scope to repeat:
Other routed requests: architect / dialogue writer / continuity manager
```

MUST FIX blocks purpose, progression, causality or canon eligibility. SHOULD FIX materially improves experience. OPTIONAL is lower-impact preference/polish. Approval decisions stay within granted authority; scores do not canonize scenes.
