# Timeline, branches and state

## Event record

EVENT ID; absolute time if known; relative story time; chapter/scene; location; participants; event; cause; immediate/long-term consequences; witnesses; later informed characters with transmission event; prerequisites; guard; occurrence; canon status; provenance.

Preserve CAUSE → EVENT → CONSEQUENCE. Unknown dates stay unknown; relative ordering may suffice. Check cycles, impossible overlaps, age/history, travel method/duration, communication limits and physical availability. Separate planned events from occurred events.

## Three layers

1. World canon: invariants and approved conditional truths.
2. Authored transition graph: approved guards and possible effects across reachable branches.
3. Actual path history: events/choices explicitly recorded for a named player/history.

Approving two scene outcomes approves conditional definitions, not both as occurred. Hypothetical traces are SIMULATED and never overwrite actual path state. Bible storage is separate from runtime saves.

## Transitions

Transition ID; source scene/revision; trigger; preconditions; old/new value or operation; guard; affected entity/fact; evidence; one-time/repeat behavior; merge policy. Item transfers update owner and inventories coherently. Knowledge/relationships require causal events. Delayed effects link decisions to trigger/cancellation evidence.

At merges preserve path differences or normalize through an approved reachable event. Never union exclusive inventories, grant skipped-scene knowledge or erase consequences. State can be guarded alternatives instead of one scalar. If reachability is uncertain, label it.

## Snapshot

Snapshot ID; bible revision; path ID/predicate; as-of event/time; entry assumptions; character availability/location/condition; knowledge/beliefs; relationships; items; flags; quests; decisions; consequences; mystery/clue/arc state; transition sources; gaps.

Snapshots and current-state summaries are derived views. Changed sources make affected views stale; regenerate from approved records. “Current” is not one global state across branches.

Example: `give_key` transfers ITEM-009 to CHAR-002; `keep_key` retains it. At merge a query without choice scope returns both guarded owners, never a universal transfer.
