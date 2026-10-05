# Voice and dialogue rules

## Character Voice Profile

Establish for important speakers; summarize relevant fields in output:

```text
CHARACTER / ID:
Age / apparent age:
Background:
Personality:
Current emotional state:
Relationship with player:
What they want right now:
What they are hiding:
Vocabulary:
Sentence length:
Speaking rhythm:
Directness:
Humor style:
Confidence:
Common verbal habits:
Things they avoid talking about:
How they behave when angry:
How they behave when afraid:
How they behave when lying:
```

Emotion/relationship can change delivery without replacing personality. Avoid stereotypes and excessive phonetic spelling.

## Subtext and rhythm

For key exchanges distinguish WHAT IS SAID from WHAT IS MEANT. “You're back early” may conceal fear the player saw something. Keep hidden meaning author-facing unless the scene supports discovery.

Characters should not explain mutually known information, speak like encyclopedias, describe every emotion, sound identical, constantly declare motivations or always answer directly.

Use motivated interruption, hesitation, avoidance, silence, misunderstanding, implication, sarcasm, unfinished sentences, physical actions and topic changes without overuse. Mix dialogue with existing movement, environmental response, gameplay, interruptions and discovery. Do not put the only required clue in optional dialogue unless progression handles its absence.

## Interactive format

Use existing engine syntax; otherwise:

```text
NODE ID:
GUARD / ENTRY STATE:
SPEAKER:
LINE:
ACTION / ENVIRONMENT: existing event or marked staging proposal
NEXT NODE / PLAYER CONTROL:

CHOICE ID:
INTENTION:
PLAYER LINE / ACTION:
GUARD:
RESPONSE NODE:
RELATIONSHIP EFFECT:
STORY FLAG:
INFORMATION GAINED: fact ID, learner, source
FUTURE CONSEQUENCE:
```

Intentions can include [Comfort] “You couldn't have known”, [Challenge] “You knew the risk”, [Investigate] “What happened before the explosion?” or [Stay silent]. Each gets a fitting response; silence may be an action. Effects on trust, fear, respect, relationships, information or future dialogue must reuse approved definitions. Proposed effects stay outside preserved implementation output.

## Memory

Respect previous promises, lies, conflicts, favors, insults, important choices and revealed information. Guard optional callbacks and avoid repeated introductions/exposition. Evasion and misunderstanding are useful when motivated, but required progression must remain reachable.
