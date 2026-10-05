# Handoff, ownership and canon contract

Read when exchanging artifacts or handling branch state/canon.

## Responsibility boundaries

| Skill | Owns | Excludes |
| --- | --- | --- |
| story-architect | Structure, arcs, quest graph, planned choices, briefs | Full scenes, polished dialogue, canon validation |
| game-story-writer (existing) | Detailed interactive scenes and scene rewrites | Silent architecture/canon changes |
| character-dialogue-writer | Voice, subtext, conversational rhythm, choice wording/responses | Plot redesign, new revelations or effect semantics |
| story-continuity-manager | Canon ledger, state validation, contradiction reports | Creative redesign, subjective quality editing |
| story-reviewer | Experience assessment and prioritized revision requests | Full rewrites, authoritative canon maintenance |

## Artifact envelope

Use this or an equivalent existing format:

```yaml
artifact_id: stable ID
artifact_type: architecture | scene_brief | scene_draft | dialogue | continuity_report | review
revision: revision ID
source_revisions: source IDs and revisions
scene_ids: relevant scenes
canon_baseline: bible/ledger revision or unavailable
lifecycle: proposed | draft | validated | reviewed | approved_canon
branch_scope: path conditions and entry-state assumptions
assumptions: unverified facts
open_questions: unresolved decisions
next_owner: skill or narrative owner
```

Changed sources invalidate dependent reports/reviews; identify affected scopes for rechecking.

## Choice/state interface

Each choice retains its ID, intention, player-facing line/action, guard, world response and destination. Classify FLAVOR, RELATIONSHIP, INFORMATION, TACTICAL, NARRATIVE or MAJOR BRANCH. Specify:

- Preconditions: knowledge, flags, required items and NPC availability.
- Effects: relationship delta on the supplied scale, flag assignments, item transfers, information gained with learner/source, future consequence. Use `none` for no effect.
- Failure/skip/repeat behavior; delayed payoff ID/trigger; merge policy.
- State transition trigger, old/new value or operation, branch scope, provenance and one-time/replay behavior.

New flags/mechanics/scales are proposals with dependencies, not implemented facts. Branch-local effects never apply to every player. At merges, preserve differences or normalize through an explicit event; never grant unearned knowledge or erase consequences.

## Lifecycle and revision loop

Idea → architect structure/brief → existing writer scene → dialogue polish → continuity report → reviewer report → revision → approved canon.

Route structure changes to architect, scene reconstruction to writer, wording to dialogue writer, ledger questions to continuity manager. Rewritten scopes return through dialogue, continuity and review as applicable; preserve IDs and record revision dependencies.

Canon eligibility requires a current continuity PASS, resolved MUST FIX findings and approval by the designated narrative owner, including authorization already supplied in the task. Missing baselines prevent unconditional eligibility. Then continuity manager may apply the specified approved deltas with source revisions, approval evidence and change history. Until then, deltas remain proposed. Never silently retcon; approved retcons retain superseded history and trigger downstream impact review.

Approved authored branches are conditional canon definitions, not proof a particular player chose them. Keep actual player-path state separate. Runtime saves/schema migrations are implementation work outside narrative bookkeeping.
