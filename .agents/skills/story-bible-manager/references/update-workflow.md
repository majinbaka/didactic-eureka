# Proposals, commits, retcons and concurrent sessions

## Changeset before canon edits

Prepare a durable or displayed CANON CHANGESET before editing canonical records. PROPOSE writes only explicitly labeled proposal material within requested scope; it does not touch canonical fields.

```yaml
change_id: CHANGE-unique
mode: COMMIT | RETCON
status: PREPARED | BLOCKED | APPLIED
bible_path: project path
base_revision: current baseline
source: artifact ID and exact revision
branch_scope: predicate or universal
as_of: event/time or not applicable
approval: owner, evidence, approved source revision and delta scope
checks: continuity result/revision, review blockers, coverage gaps
add: new records and evidence
update: record.field, old value, new value, guard, trigger, evidence
deprecate: old fact, replacement, reason
dependencies: records, scenes, summaries and implementation consumers
conflicts: sourced contradictions or none
unknowns: unresolved gaps
```

These example keys do not prove approval; populate from actual evidence. Approval matches exact source revision and scope. Generic approval of wording does not authorize unrelated world rules.

## Scene commit

1. Read the exact source and baseline. Check current continuity validation and review findings against project lifecycle. Here eligibility requires continuity PASS, resolved MUST FIX findings and narrative-owner approval, including authorization already supplied in the task.
2. Extract facts and states: characters, locations/physical/emotional state, each learner's knowledge, player reveals, relationships, causal events, items, flags, decisions, consequences, mysteries/clues, foreshadowing and arcs. Keep every branch guard and occurrence layer.
3. Check duplicates, references, world rules, chronology, reachability and old values. Unsupported facts remain proposals; contradictions are conflicts.
4. Produce the complete changeset with indexes/snapshot dependencies before mutation. Conflicting/unapproved changes are BLOCKED and leave canon unchanged. Do not automatically commit a partial subset; a separately authorized conflict-free subset needs its own scoped changeset.
5. Re-read baseline, affected records, approval and allocated IDs immediately before applying. If stale, stop and regenerate/revalidate; do not overwrite another session's changes.
6. Apply approved records, indexes, revision and changelog coherently. Re-read changed files to verify IDs, links, old/new values, guards and metadata. Report APPLIED only when the whole scoped update is consistent.

Direct approved-fact imports need not pretend a scene exists or run unrelated scene reviews; validate actual evidence and applicable lifecycle. Never manufacture continuity PASS. Changed source revisions invalidate their dependent reviews and checks.

## Concurrent writes and recovery

Use one coordinated writer per bible baseline; readers/proposal authors may work independently. Pin proposals to baseline/source revisions. Use existing locking/transaction tooling when available; otherwise serialize edits explicitly. Plain Markdown is not an atomic database; a pre-write revision check alone cannot prevent simultaneous races.

If exclusive write access cannot be established, return the prepared changeset to the coordinated writer. Preserve unrelated working-tree edits; never reset the repo for a clean baseline. Retain preimages of touched records or use an existing versioned workspace before mutation.

On partial failure, mark the changeset incomplete, identify applied files and do not announce a valid new baseline. Restore only your own unchanged writes from preimages if safe; concurrent edits require reconciliation. An applied CHANGE ID is not replayed: confirm matching payload and return the recorded result. Different content needs a new CHANGE ID.

## Retcon

Explicit RETCON intent is required. Document OLD CANON → NEW CANON; analyze dependencies across characters, dialogue, mysteries, timeline, quests, foreshadowing, relationships, knowledge, items, flags, endings and approved scenes. Report required revisions and substantial impact before changing canon.

Prepare a concrete changeset and impact report. If existing authorization covers the exact replacement and affected scope, proceed without asking again. Otherwise obtain narrative-owner approval of replacement and impact before applying. Preserve superseded claims as DEPRECATED with replacement links, provenance and historical validity.

Mark dependent checks/context stale. Track affected content as NEEDS_REVISION with owners; do not rewrite all downstream scenes or claim unperformed checks passed. A future state-changing event is a transition, not a retcon of the past.

## Changelog

Every canon modification records CHANGE ID, date/sequence, old/new revision, source/revision, approval evidence, added/modified/deprecated claims, reason, affected entities, guards and downstream work. Preserve rejected/deprecated proposals and reserved IDs; archive/split history instead of silently deleting it.
