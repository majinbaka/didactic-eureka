# Context packages, queries and summaries

## Selection

Start with task/scene IDs, participants, location, entry conditions, time, recipient and budget. Search indexes then traverse relevant links: relationships, recent shared events, active quests, knowledge, mysteries/clues, inventory, flags, consequences and rules. Include transitive constraints even if the source event is old.

Classify REQUIRED (correctness-critical), RELEVANT (likely useful), OPTIONAL (budget permitting). Include all REQUIRED facts; if they exceed budget, report overflow and propose splitting context rather than silently truncating restrictions. Avoid unrelated lore, regions, completed quests and histories without dependency reasons.

## Package contract

SCENE CONTEXT PACKAGE:
- Package ID, task/scene ID, recipient, audience and visibility policy.
- Bible path/revision, source revisions, branch/time, entry assumptions and stale-check instructions.
- REQUIRED: world/narrative rules, characters/current states, their knowledge/suspicion/false beliefs, player knowledge, location/travel/availability, active quest and guards.
- REQUIRED as applicable: mysteries/discovered clues, relationships, inventory/ownership, flags, important decisions/promises/lies, consequences and forbidden contradictions.
- RELEVANT: shared/recent causal events, voice/previous conversations, clue opportunities, arc pressure and setups needing payoff.
- OPTIONAL: compact supporting lore with provenance.
- Gaps, contradictions, proposed assumptions, omitted content and readiness limitations.
- Allowed draft latitude, required validation and next owner.

Cite stable IDs/file sections for each fact bundle. Include usable semantics, not just ID lists. Separate author truth from dialogue-safe knowledge. Player-safe packages omit author-only facts entirely; author packages label secrets and reveal guards. Conflicts stay visible and cannot be treated as established premises.

Packages are derived views. Consumers verify baseline/source revisions before reuse; changed dependencies invalidate relevant portions. Never copy a stale package back into canon.

## Queries

Return direct answers with evidence and scope:
- Where is ITEM-009? Owner/location at requested time/path, with transfer evidence.
- Can CHAR-004 appear in SCENE-042? Check travel, time, physical availability, guards and knowledge; UNKNOWN if constraints are missing.
- Which clues for MYST-002 were found? Filter acquisitions; show undiscovered available clues separately only for authors.
- What promises/consequences remain? Query durable records across chapters, respecting cancellation/fulfillment.
- Which setups need payoff? Distinguish planted/reinforced unresolved setups, plans and approved abandonment.

Do not invent missing facts to make answers decisive.

## Summary

Include baseline/scope, stable IDs, character states, knowledge boundaries, quests, decisions/obligations, mysteries, consequences and constraints. Preserve guards and citations. Identify omitted details and retrieval paths. Summary is not a new authority or a reason to forget earlier decisions.
