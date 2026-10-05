# Architecture format

## Story and character engine

Build Premise → Main conflict → Character motivations → Story questions → Acts/Chapters → Quests → Scenes → Revelations → Decisions → Consequences → Climax → Resolution.

Player: identity; want; emotional need; obstacle; misconception/weakness; journey change.

Each major character: Want; Need; Fear; Secret; External conflict; Internal conflict; Relationship with player; Potential character arc. NPCs pursue goals beyond helping the player.

Story engine: what evolving situation continuously generates problems, discoveries, decisions and conflict? Show how player responses change it beyond unlocking another quest.

## Questions, information and foreshadowing

For each question record ID, introduction, advancement, resolution and path prerequisites. Classify SHORT-TERM QUESTION (soon), MID-TERM QUESTION (several scenes) or CORE MYSTERY (near climax). Distribute answers; do not resolve everything immediately.

For each relevant fact track TRUTH, CHARACTER BELIEF per character, PLAYER KNOWLEDGE per branch, MISDIRECTION, CLUE and REVELATION. Misdirection must be reasonable based on available evidence.

Important reveals normally need SETUP → REMINDER / ESCALATION → PAYOFF, with scene IDs and reachability. Optional clues require reachable substitutes or conditional payoffs. Twists should be surprising yet supported in retrospect.

## Chapter template

```text
CHAPTER ID / TITLE:
Narrative purpose:
Player objective:
Main conflict:
Character development:
New information:
Mystery introduced:
Mystery advanced:
Mystery resolved:
Important decision:
Gameplay opportunity:
Emotional beat:
Ending hook:
```

Quest records: ID, chapter, purpose, objective, prerequisites, playable steps, success/failure/abandon outcomes, state changes and next scenes. Mark required/optional content and dependencies.

## Scene Brief for game-story-writer

```text
SCENE ID:
SCENE NAME:
LOCATION:
NARRATIVE PURPOSE:
PLAYER OBJECTIVE:
CHARACTERS PRESENT:
CHARACTER GOALS:
CONFLICT:
STARTING STATE:
IMPORTANT EVENTS:
PLAYER INTERACTIONS:
INFORMATION REVEALED:
INFORMATION HIDDEN:
CLUES:
CHOICES:
CONSEQUENCES:
CHARACTER CHANGE:
STORY STATE CHANGE:
ENDING STATE:
NEXT HOOK:
```

Use `none` or `unknown — decision needed` rather than dropping fields. Specify state by branch, important failure/skip/repeat behavior and playable events rather than cinematic summaries alone.

## Branching

- FLAVOR CHOICE: expression changes, plot unchanged.
- RELATIONSHIP CHOICE: NPC relationship changes.
- INFORMATION CHOICE: learned information changes.
- TACTICAL CHOICE: problem-solving method changes.
- NARRATIVE CHOICE: future events change.
- MAJOR BRANCH: substantially different story path.

Use the shared state interface. For major branches estimate unique scenes, dialogue variants and flags; define reconvergence and surviving consequences. Do not add branches merely to include choices. Keep displayed intention honest even when eventual outcomes are hidden.
