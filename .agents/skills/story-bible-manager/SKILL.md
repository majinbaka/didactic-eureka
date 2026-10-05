---
name: story-bible-manager
description: Initialize and maintain a canonical game story bible; retrieve lore, generate scoped context, track branch-specific narrative state, validate changes and commit explicitly approved canon or retcons. Use for narrative knowledge management, not creative scene writing, quality scoring or runtime save implementation.
---

# Story Bible Manager

Maintain the Story Bible as the single source of truth and narrative state database. Store, organize, retrieve, validate, update and protect facts across chapters, branches, writers and sessions. Do not invent missing lore to complete records.

## Modes and reference routing

Determine mode and scope from the task. Safe read-only modes may be inferred; never infer COMMIT or RETCON. Without explicit mutation intent, return a query, validation or proposed changeset.

Read [canon rules](references/canon-rules.md) for authority/status decisions. Load only the additional references needed:

| Mode | Result | Read |
| --- | --- | --- |
| INITIALIZE | Evidence inventory, modular bible and import proposals | [Bible schema](references/bible-schema.md), canon rules |
| QUERY | Sourced answer at specified branch/time; gaps | Bible schema; relevant entity/state model |
| CONTEXT | Task-specific, revision-pinned context package | [Context package](references/context-package.md); relevant models |
| PROPOSE | Isolated proposal and candidate deltas; canon unchanged | [Update workflow](references/update-workflow.md); relevant schemas |
| VALIDATE | Conflicts, reachable-state checks, coverage and fixes | [Health check](references/health-check.md); relevant models |
| COMMIT | Approved, conflict-free changeset with history | Update workflow, canon rules; touched schemas |
| RETCON | Dependency impact, reviewable replacement and authorized commit | Update workflow, canon rules |
| HEALTH_CHECK | Integrity findings; no automatic canon edits | Health check |
| SUMMARY | Compressed state with provenance, scope and omissions | Context package |

Models: [characters](references/character-schema.md), [knowledge](references/knowledge-model.md), [timeline and branch state](references/timeline-model.md), [mysteries, clues and payoff](references/mystery-model.md).

## Common workflow

1. Locate the existing bible, indexes and baseline; do not create a competing bible. Read repo guidance and relevant sources. Here inspect `docs/story/` and `game-design.md` when extracting story inputs; their existence alone is not approval evidence.
2. Establish mode, source revisions, branch conditions, story time and audience. Distinguish authored conditional canon from an actual player's recorded path. If branch/time is absent, give common facts plus labeled alternatives, or request the missing scope when required.
3. Search stable IDs, names and aliases in indexes first, then load relevant entity files and dependencies. Detect possible duplicates before adding records. Do not load the whole bible for a local query.
4. Resolve authority with evidence. Keep CANON, PROPOSED, DRAFT, DEPRECATED, REJECTED and UNKNOWN distinct; keep confidence separate. Report `CANON CONFLICT` or `WORLD RULE CONFLICT` with both sources. Never resolve a conflicting draft by silently changing the bible.
5. Query, package, validate or prepare a changeset. Track knowledge acquisition, chronology, ownership, relationships, flags, decisions and delayed effects under exact guards.
6. For authorized writes, follow the update workflow; recheck the baseline before applying. Record source, approval and history. Finish with resulting revision, touched records and gaps.

## Critical restrictions

- Explicit user instructions outrank narrative artifacts; scope them precisely. Exploratory suggestions are not approval. Creating this skill does not authorize creating game canon.
- Never promote proposals, drafts, inferred facts, good reviews or continuity PASS without explicit approval and commit intent. Existing authorization may satisfy this requirement; do not ask again for unchanged, already approved scope.
- Never silently retcon, erase superseded history, reuse IDs or merge mutually exclusive player histories.
- Global truth, writer knowledge, player knowledge and each NPC's knowledge/belief are separate. Planned scenes are not occurred events; available clues are not discovered clues.
- Preserve important decisions, promises, lies, pending consequences and branch-local state through summaries and chapter changes.
- Missing information is `UNKNOWN / NOT ESTABLISHED`. Drafting assumptions stay local or PROPOSED.
- This skill does not edit game code, saves, Firebase or deployment unless independently requested. It does not automatically invoke other skills, send messages or spawn agents.

## Output contracts

Every output identifies mode, bible path/baseline, source revisions, branch/time scope, canon status, confidence/gaps and next owner where useful. Cite file sections or stable fact/entity IDs near assertions. Read-only operations say canon was unchanged; mutation outputs distinguish prepared, blocked and applied.

- INITIALIZE: source inventory, accepted facts with approval evidence, conflicts, created module/index paths and proposals. Unknown fields are intentional; no empty files.
- QUERY: direct answer, conditional alternatives, evidence and unknowns. Never present one branch's value as universal.
- PROPOSE / VALIDATE: changeset/report ID, deltas, conflicts, assumptions, coverage and eligibility; no claim of approval.
- COMMIT / RETCON: changeset ID, before/after revision, approval scope/evidence, applied additions/modifications/deprecations, changelog and downstream revalidation. If blocked, identify the reason and retain baseline.
- CONTEXT / SUMMARY: use the context-package contract; derived views never become authority.
- HEALTH_CHECK: use the health-check report contract; suggestions remain proposals.

## Pipeline handoff

| Consumer | Provide |
| --- | --- |
| story-architect | Premise, world constraints, arcs, unresolved mysteries, quest/state dependencies, consequences |
| game-story-writer | Scene context, entry state, guards, history, forbidden contradictions; new facts remain DRAFT |
| character-dialogue-writer | Voice, knowledge, beliefs, secrets, emotions, relationships and prior conversations |
| story-continuity-manager | Revision-pinned canon; receive checks and candidate deltas |
| story-reviewer | Scoped canon/context; suggested fixes remain PROPOSED |

Continuity manager owns scene validation; this skill owns bible organization and approved storage. Where a workflow allows continuity manager to write an approved ledger, use the same baseline, approval and changelog rather than creating a second store. Other skills are optional consumers, not required dependencies for querying. Only approved results return through COMMIT.
