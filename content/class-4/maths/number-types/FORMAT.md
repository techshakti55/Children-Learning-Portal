# Number Types source format (v1.0.0)

`topic.json` is the canonical UTF-8 JSON source. It is framework-independent draft content, not an API contract or an implemented importer. `REVIEW.md` is a readable projection for owner review; regenerate it after source changes. Never treat a file existing on main as permission to publish it.

## Records

| Field | Meaning |
| --- | --- |
| schemaVersion / contentVersion | Shape version / learning-content version; bump contentVersion when wording, answers or order change |
| id, title, language, classLevel, subject | Stable topic identity and audience; `en` means simple English |
| publicationStatus / reviewStatus | Currently draft / author-checked-awaiting-owner-review; owner review is still required |
| conventions | Topic-wide mathematical definitions |
| lessons | Ordered lesson records with stable id, order, title, optional, objectives, prerequisites, explanationBlocks, examples and practice |
| examples | Stable id, prompt, ordered steps and answer |
| revision | Stable id, ordered questions, coreQuestionIds and optionalQuestionIds |

Each question has `id`, `type: mcq`, `lessonId`, one `objective`, `prerequisites`, `optional`, `difficulty`, `prompt`, `options`, `correctOptionId`, `hint`, `explanation` and `mathCheck`. Options are four records with stable IDs A–D and distinct plain-text labels. Exactly one ID is correct. Difficulty is basic or challenge. Prerequisites can be lesson IDs or readable skills; resolve lesson IDs against this topic. All text is plain text, not executable HTML.

`mathCheck` is author-only verification metadata: `kind` selects a mathematical predicate; `candidates` gives four typed values in the same order as the displayed options. Some predicates also use `number` or `expected`. Named claim codes are documented by the checker predicates. Numeric lists represent factor lists or number pairs; 0.5 represents the displayed fraction 1/2. This metadata supports verification; it is not learner content. Text claims, prompts and explanations still need editorial review.

## Consumption and ordering

Read lessons by order and examples/questions by array order. Preserve stable IDs when editing; do not use array indexes as saved-answer identity. Correct answers reference option IDs, not positions. A future renderer may shuffle options only if it preserves their IDs. Print/OMR must freeze question and option order with contentVersion; those exports are not implemented here.

Lesson 4 and its five practice questions are optional enrichment. Core revision uses the eight coreQuestionIds. Offer the two optionalQuestionIds only after the child chooses enrichment; skipping them must not reduce core completion or score. The ten-question bank remains available for a full-topic revision. No basic question requires an HCF or LCM calculation.

## Checks and review

From the repository root run `python3 tests/content/check_number_types.py` (Windows: `py tests/content/check_number_types.py`). Uses only the Python standard library; adds no app dependencies. It checks counts, required content, IDs, unique options, computed single correct answers, candidate/display alignment for numeric/list options and the optional revision split. It is a local check, not CI evidence, a general-purpose JSON Schema validator or a reading-level certification. Prose, distractor meaning and worked examples also receive author review. Shakti's owner review remains pending before publication.
