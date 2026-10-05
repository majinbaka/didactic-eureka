# Continuity schema

Use existing project format or Markdown/JSON. This is an authoring ledger, not a required runtime save schema. Retain stable IDs, source provenance, baseline revisions and branch conditions.

## Bible domains

Track WORLD RULES, CHARACTERS, LOCATIONS, FACTIONS, TIMELINE, HISTORICAL EVENTS, ITEMS, LORE, QUESTS, RELATIONSHIPS, MYSTERIES, SECRETS, PLAYER KNOWLEDGE, CHARACTER KNOWLEDGE, STORY FLAGS, DECISIONS and CONSEQUENCES.

Rules/locations/factions/lore: ID, definition, constraints, status, source. Items: ownership/location and transfer history. Quests/flags: allowed values, prerequisites, triggers, consequences. Mysteries/secrets: truth, clues, reveal conditions and permitted knowers.

## Character state

```text
Character ID:
Status:
Location:
Goal:
Emotional state:
Relationship with player:
Trust:
Fear:
Knowledge:
Beliefs:
Secrets:
Promises:
Lies:
Items:
Injuries:
Important memories:
Last interaction:
```

Separate knowledge from belief. Reuse supplied relationship scales. Memories/promises/lies need origin and current status; optional events need guards on callbacks.

## Knowledge and timeline

Knowledge records: Fact ID; GLOBAL TRUTH; PLAYER KNOWLEDGE; CHARACTER KNOWLEDGE per character ID; beliefs; acquisition event/source; branch guard. Unknown acquisition is a gap, not evidence of knowing.

Example: king is dead; minister knows; player and guard do not. The guard cannot discuss death as fact without learning it. Supported rumors, suspicions and lies are distinct.

Timeline events:

```text
EVENT ID:
DATE / RELATIVE TIME:
LOCATION:
CHARACTERS INVOLVED:
EVENT:
WHO KNOWS:
CONSEQUENCES:
SOURCE REVISION / BRANCH CONDITION:
```

Check event order, travel duration, simultaneous presence and transfers. Unknown travel rules are a gap/warning, not invented canon distances.

## Audit checks

- Character: personality/development, acquired knowledge, emotional state and relationships reflecting prior events.
- World: rules, existing locations, item provenance and ownership.
- Timeline: order, travel and possible presence.
- Story: prior revelations, spoilers, previous events/promises and contradictions.
- State: quest flags/guards, required items, NPC alive/present/available, revisit and one-time effects.
- Branches: failure, skipped/optional events, merges and persistent differences; no knowledge from missed events.

State paths checked and omissions. For large graphs describe symbolic conditions/samples; sampling is not exhaustive validation.

## Severity / status

CRITICAL: breaks causal logic or required progression. MAJOR: obvious inconsistency. MINOR: localized continuity problem. WARNING: possible future issue or uncertain risk, not proven contradiction.

NEEDS FIX when contradictions or missing evidence prevent validation. PASS requires no unresolved contradictions in declared scope and no blocking gaps; disclose nonblocking warnings. Severity and confidence are separate.

## Output details

```text
[Severity] ISSUE ID / SCENE ID / NODE ID / PATH:
Problem:
Evidence: artifact, revision, precise location
Expected state:
Suggested correction: minimal repair and owning skill

STORY STATE UPDATE:
Status: proposed / approved and applied / none
Baseline revision:
Approval evidence:
Source scene/report/review revisions:
Event ID / trigger / branch condition:
Deltas: domain, entity ID, old value, new value/operation, provenance
Resulting revision: only if applied
```

Only accepted events enter approved updates. Retcons need explicit approval, retained superseded history and downstream revalidation. Approved authored scenes do not prove a particular player's choices occurred.
