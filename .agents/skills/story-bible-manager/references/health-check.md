# Bible integrity and validation

## Report contract

STORY BIBLE HEALTH REPORT or CANON VALIDATION REPORT: scope, baseline/source revisions, paths/time covered, status PASS / NEEDS FIX / INCOMPLETE, gaps, findings, proposed corrections and next owners. Each finding has ID, severity, category, evidence, affected entities/paths, consequence and minimal action. This mode does not write canon.

Severity: BLOCKER (unsafe commit/conflicting authority), MAJOR (broken causality/state/reveal), MINOR (limited inconsistency), WATCH (potentially overdue development). Quality concerns are not automatically canon contradictions.

## Checks

| Area | Inspect |
| --- | --- |
| Authority | Unsourced canon, stale approval/checks, draft promotion, deprecated fact presented as current |
| Identity/indexes | Duplicate IDs/entities, alias collisions, missing/retired references, dangling links, stale indexes |
| World/terms | Conflicting rules, invented exceptions, wrong terms, planned mechanics presented as implemented |
| Timeline/location | Causal cycles, impossible travel/overlaps, age errors, unexplained relocation, plans treated as occurred |
| Knowledge | Unearned reveals, transmission gaps, suspicion as certainty, NPC/player/writer conflation, branch leaks |
| Items | Conflicting ownership, lost/destroyed object reused, inventory mismatch, important unused items |
| Decisions/state | Forgotten choices/promises/lies, invalid flags, missing guards, exclusive paths unioned, repeat-trigger errors |
| Consequences | Missing source, forgotten/impossible triggers, READY treated as fired, unexplained cancellation |
| Quests | Unreachable stages, missing resolution, conflicting completion/failure guards |
| Mysteries/clues | Orphaned clues, mysteries without evidence, reveal without acquisition, false leads as truth |
| Foreshadowing | Setup without payoff, payoff without reachable setup, abandonment without reason |
| Characters/arcs | Inactive important actors, unsupported state changes, stalled/instant arcs, relationships without causes |
| Views/history | Stale snapshots/packages, absent changelog, incomplete changeset, concurrent baseline divergence |

Unresolved mysteries and inactive characters are not necessarily errors. Consider pacing, current chapter and evidence; do not invent deadlines or demand immediate payoffs.

VALIDATE traces relevant reachable paths and dependencies for proposed information. HEALTH_CHECK examines requested bible scope and cross-module integrity. Full checks can require more modules than local queries; list coverage. Missing inputs prevent unconditional PASS. Manual inspection is not exhaustive branch execution; report limits.

## Behavioral acceptance scenarios

Use isolated fixtures when evaluating behavior; inspect decisions/artifacts, not exact wording:

1. Unapproved draft contradicts canonical injury: sourced CANON CONFLICT, unchanged baseline.
2. Approved scene has give/keep item outcomes without a recorded choice: conditional definitions and owner alternatives, no universal transfer.
3. Writer knows mystery answer; player has uninterpreted clue: no reveal advancement; NPC knowledge remains separate.
4. Approved changeset uses older baseline: no writes until regenerated/revalidated; no stale approval reuse for changed deltas.
5. Player-safe context requested: scoped facts/citations/gaps, no hidden truth/property leakage.
6. Substantial retcon requested: impact before commit, exact approval scope, preserved superseded truth, tracked dependent revisions.
7. Proposed smith matches existing alias: check identity before new ID; ambiguous identity stays explicit.
8. Later chapter asks about old promise/consequence: retrieve unresolved guarded obligations instead of relying on latest summary.

These scenarios are evaluation guidance, not claims that behavioral tests have run.
