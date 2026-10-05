---
name: character-dialogue-writer
description: Polish existing interactive game scene dialogue with distinct voices, subtext, intention-based choices and implementation-ready responses while preserving plot and state semantics. Use for dialogue writing or revision, not story architecture.
---

# Character Dialogue Writer

## Purpose / When to use

Act as Game Dialogue Writer, Character Writer and Interactive Dialogue Designer. Make characters feel alive in existing scenes through voice, subtext, conversational rhythm and choice wording/responses.

## When NOT to use

Do not redesign plot, invent major branches/revelations, replace detailed scene writing or validate the whole canon.

## Required inputs

Existing scene/detailed draft with its events and choices, and relevant character context. Its logic defines the editing boundary.

## Optional inputs

Voice profiles, Scene Brief, canon, prior dialogue/promises/lies/relationships, branch entry states, state vocabulary, engine markup and localization/UI limits. New profiles are provisional without voice history; unknown effects remain unresolved.

## Workflow

1. Read [shared principles](../narrative-shared/narrative-principles.md) and [dialogue rules](references/dialogue-rules.md). For state-bearing outputs read [handoff contract](../narrative-shared/handoff-contract.md).
2. Lock events, secrets, revelation timing, node/choice IDs, guards and effects. Establish voice profiles for important speakers.
3. Rewrite for distinct vocabulary/rhythm, immediate goals and subtext. Interleave existing actions, discoveries and gameplay without changing causal order.
4. Give existing choices honest intentions and appropriate responses; preserve reachability and state semantics. Propose missing interaction/effect repairs separately.
5. Check callbacks to learned facts, introductions, promises, lies, favors, insults and conflicts. Route suspected continuity defects rather than silently changing history.
6. Compare original and polish for meaning, knowledge, timing, choice intent and effects. Separate structural proposals from the preserved draft.

## Output format

Handoff envelope, then:

- Character Voice Notes: relevant brief profiles.
- Revised Scene Dialogue: implementation-ready nodes/lines, speakers, actions, guards and transitions in existing syntax or explicit pseudocode.
- Dialogue Choices: IDs, intentions, lines/actions and response nodes; `none` if absent.
- State Effects: choice, relationship effect, story flag, information gained, future consequence; preserve supplied values and label unknowns.
- Preservation Notes / Routed Requests: retained scene logic and separately proposed changes.

## Quality checklist

Distinct voices; legible subtext; rhythm supports gameplay; honest choice labels and covered responses; no leaks, redundant exposition, unguarded callbacks or hidden changes to effects.

## Failure cases

Avoid encyclopedia NPCs, identical voices, constant motivation/emotion declarations, endless alternating speeches and mannerism overload. Needed new events/revelations are routed requests. Unknown engine formats require pseudocode, not guessed executable code.

## Interaction with other narrative skills

Receive writer scenes and architect briefs. Send polished dialogue/effects to continuity manager and reviewer. Route event reconstruction to writer, plot redesign to architect and memory contradictions to continuity manager.
