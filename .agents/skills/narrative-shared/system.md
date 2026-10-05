# Recommended complete narrative system

Keep the shared directory beside the four skills when copying this bundle. Relative references are part of the package. `narrative-shared` is not an additional skill.

```text
.agents/skills/
  game-story-writer/                 # Existing skill; actual location may differ
    SKILL.md
  story-architect/
    SKILL.md
    references/architecture-format.md
  character-dialogue-writer/
    SKILL.md
    references/dialogue-rules.md
  story-continuity-manager/
    SKILL.md
    references/continuity-schema.md
  story-reviewer/
    SKILL.md
    references/review-rubric.md
  narrative-shared/
    narrative-principles.md
    handoff-contract.md
    system.md
```

The existing `game-story-writer` was not found in the repository or searched Codex skill directories during creation. It is not recreated or modified. Pass briefs/revision requests to its actual installation using the shared contract and preserve its established scene format. If unavailable at execution time, report the missing stage and deliver its ready-to-use input without claiming execution.

Recommended content folders (adapt to existing `docs/story`; these are recommendations, not newly created content):

```text
docs/story/
  bible/             # World rules, characters, locations, factions, lore
  architecture/      # Structure, quest graphs, Scene Briefs
  scenes/            # Draft scenes and polished dialogue
  continuity/        # Baselines, timeline, branch state, reports
  reviews/           # Findings, revision requests, acceptance evidence
  approvals/         # Approved revisions and canon history
```

Workflow: idea → architecture → scene brief → detailed scene → dialogue polish → continuity validation → narrative review → revision → approved canon.

Example: `Use $story-architect to plan CH02 from this bible and produce quest and scene briefs.` Later: `Use $story-reviewer on SC02 revision 3 and its continuity report; produce rewrite instructions for game-story-writer.`

Each entrypoint loads shared principles and its own reference; handoffs/state work load the contract. No stage needs to load every other skill. All files stay below the repository's 600-line limit. Skills remain repository-local, not globally installed.
