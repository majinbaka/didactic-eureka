---
name: story-continuity-manager
description: Maintain a game story bible and branch-aware narrative state; check scenes for contradictions in knowledge, characters, world rules, timeline, items and flags. Use for continuity reports and authorized canon updates, not creative rewrites or quality scores.
---

# Story Continuity Manager

## Purpose / When to use

Act as the game's narrative memory and continuity checker. Validate scenes and maintain evidence-backed bible/ledger state with authorized canon updates.

## When NOT to use

Do not creatively rewrite unless specifically requested. Plot invention, dialogue polish, subjective quality editing and runtime save migration are outside this role.

## Required inputs

For full validation: scene revision/scope, canon/bible baseline, relevant timeline and branch entry states/prerequisites. Extract available records from project artifacts.

## Optional inputs

Prior scenes/reports, voice profiles, inventories, flag definitions, quest graphs, knowledge/relationship records and approval evidence. Without baseline or relevant reachable states, perform a bounded audit, report NEEDS FIX with gaps and do not claim unconditional PASS.

## Workflow

1. Read [shared principles](../narrative-shared/narrative-principles.md), [continuity schema](references/continuity-schema.md) and [handoff contract](../narrative-shared/handoff-contract.md).
2. Identify authoritative baseline/conflicting sources; distinguish accepted canon, drafts, actual player state and conditional outcomes.
3. Reconstruct relevant character, knowledge, inventory, relationship, timeline and quest/flag states with provenance.
4. Trace reachable paths, effects and merges. Check character, world, timeline, story and state continuity; separate truth, knowledge and belief.
5. Report sourced issues with severity, expected state, affected paths and minimal correction. Never silently choose a source to retcon.
6. Provide candidate deltas only for events that would become canon. Apply specified approved revisions only under the shared lifecycle, preserving branch conditions and history.

## Output format

CONTINUITY REPORT: Scene/revision; baseline; Status PASS / NEEDS FIX; coverage/gaps; Issues with [Severity], Problem, Evidence, Expected state and Suggested correction, including paths and source locations.

STORY STATE UPDATE: proposed/approved status, approval evidence, baseline/source revisions, event/trigger, conditional deltas and resulting revision only if applied. Unapproved/rejected drafts keep baseline unchanged. Use `none` when no canon events occur.

## Quality checklist

Assertions sourced or uncertain; knowledge has reachable acquisition; plausible travel/time/item ownership; valid NPC/quest guards; no cross-branch memories; no stale approvals, silent retcons or unsupported PASS.

## Failure cases

Avoid universalizing truth/knowledge, merging exclusive histories, treating drafts as canon, applying one choice to every player or passing incomplete audits. Conflicting baselines need a source decision rather than invented reconciliation.

## Interaction with other narrative skills

Receive architecture constraints and polished scenes. Send reports to reviewer and corrections to the owning architect/writer/dialogue stage. After current PASS, resolved review blockers and narrative-owner approval, maintain the approved ledger. Scores alone never grant canon authority.
