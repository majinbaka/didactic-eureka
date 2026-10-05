# Modular bible and common records

## Locate or initialize

Use existing root and vocabulary. Otherwise use `story-bible/` in the agreed documentation area. Create only populated, useful modules; split before exceeding repo file limits (600 lines here). No empty scaffold or file per unknown field.

INITIALIZE inventories sources and approval evidence first. Import established approved facts as CANON only within explicit initialization authorization. Unapproved ideas become PROPOSED/DRAFT; absent values stay UNKNOWN. Without established approval, create a labeled proposal rather than announcing a canonical bible. Preserve source documents.

Suggested modules, activated as content needs them:

| Path | Contents |
| --- | --- |
| README.md | Authority, baseline revision, schema version, module index, scope conventions |
| core/{premise,themes,narrative-rules,terminology}.md | Premise, genre, setting, tone, themes, target experience, player role, conflict, core mystery, ending conditions, rules/terms |
| world/{world-overview,world-rules,history,geography,cultures,technology,magic-system}.md | Setting constraints and facts |
| characters/index.md; characters/character-[id].md | ID/alias lookup and records; protagonist may use a named path |
| factions/index.md; factions/faction-[id].md | Goals, membership, power, allies/enemies and history |
| locations/index.md; locations/location-[id].md | Geography, travel and scoped occupancy |
| timeline/{master-timeline,historical-events,story-events}.md | Causal events and temporal ordering |
| story/{main-plot,chapters,quests}.md | Plot/quest definitions; plans separate from occurred events |
| mysteries/index.md; mysteries/mystery-[id].md | Truth, clues and reveal state |
| relationships/relationship-map.md | Directional relationships and event-backed changes |
| knowledge/{player-knowledge,character-knowledge}.md | Acquisition and belief by perspective |
| state/{current-story-state,flags,inventory-state}.md | Scoped snapshots and transition definitions |
| items/important-items.md; lore/index.md | Important objects and links to populated lore modules |
| decisions/player-decisions.md | Guarded choices and actual path records |
| consequences/pending-consequences.md | Durable delayed effects |
| foreshadowing/tracker.md; arcs/tracker.md | Setup/payoff and earned progression |
| changelog/canon-changelog.md | Commit history and superseded facts |
| proposals/pending-proposals.md | Isolated proposed/draft/rejected changes |

## Common metadata

Each record: ID, canonical name, aliases, type, canon status, confidence, source/revision/section, approval evidence, last change ID, branch predicate, valid story time, visibility. References use IDs plus file links. Index rows contain ID, name, aliases, path, status and compact scope; reserve retired IDs.

Prefixes: CHAR-, LOC-, ITEM-, FACTION-, EVENT-, QUEST-, MYST-, CLUE-, DECISION-, CONSEQ-, FLAG-, RULE-, TERM-, FORESHADOW-, ARC-, SCENE-, CHAPTER-. Add FACT-, KNOWLEDGE-, CHANGE-, PROPOSAL- if useful. Existing names such as `FLAG_MET_FOX` remain valid; do not rename runtime flags for a suggested convention. Never reuse/renumber IDs. Approved duplicate consolidation retains redirects and historical references.

Before additions compare IDs, names, aliases, role, location, provenance and events. Similar names do not prove identity; ambiguous matches stay unresolved. Allocate final IDs against the latest index at commit to avoid concurrent collisions.

## Entity fields

- Location: name/type/region, description/atmosphere/history, current state, characters present, important objects, secrets, known/hidden entrances, connected locations, travel time/method/constraints, significance and previous events. Occupancy is scoped by branch/time.
- Item: name/description/origin, owner/location, significance, known/hidden properties, who knows, previous owners, required-for references, status (destroyed/lost/possessed/hidden/unknown), transfers and sources. Ownership must agree with inventory.
- Faction: name/aliases, purpose/ideology, leaders/members, resources/power, territory, alliances/conflicts, secrets, player standing and events.
- Rule: statement, scope, rigidity, approved exceptions, dependencies and violation examples. Cover magic, technology, politics, death/time, monsters, social/economic/religious rules, communication and travel where established. Never invent exceptions.
- Term: canonical term, definition, aliases, forbidden/deprecated names, first introduction, familiar characters.

## State-bearing records

- Relationship: A/B IDs, direction, type, qualitative trust/respect/fear/affection/suspicion, debt/conflict, shared history, important interactions, current state and event-linked changes. Numbers supplement meaning only on an established scale.
- Quest: ID/name/status, giver/objective/purpose, start condition/stage, knowledge/items required, characters, decisions/branches, completion/failure conditions, consequences, mysteries/events. Status: LOCKED, AVAILABLE, ACTIVE, BLOCKED, COMPLETED, FAILED, ABANDONED.
- Flag: key/type/domain/default, scoped current value, set-by, used-by, narrative meaning. Prefer derived existing state to redundancy. Unknown current value is not default. Proposed flags do not imply runtime support.
- Decision: scene/options/choice, guards, immediate effects, relationship effects, flags, future consequences, aware/unaware characters, status. Authored options differ from a recorded player's choice.
- Consequence: source event/decision, description, trigger, earliest trigger, characters, expected effect, status PENDING/READY/TRIGGERED/CANCELLED, trigger/cancellation evidence, repeat policy. READY is not TRIGGERED.

Schema changes require explicit version/migration notes preserving IDs and history. Narrative bookkeeping does not migrate runtime saves.
