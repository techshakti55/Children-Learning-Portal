# Canonical Number Types preview adapter

PR #2 integrates PR #1 exact reviewed commit
`b0eced932ac8f694a63985478ea63c558eeef6ae`. The four source files under
`content/class-4/maths/number-types/` and `tests/content/check_number_types.py` are
copied without edits. JSON blob SHA: `7f1772f667cbabe580733cc896467b9bc83d46ef`.
Both PRs' task/status records are combined, rather than one replacing the other.

## Single source and preview projection

`frontend/scripts/prepare-content.mjs` reads canonical JSON, selects only topic
metadata/conventions and lesson fields, and generates ignored
`frontend/src/features/number-types.data.js`. It runs before build, dev, syntax and
tests. Do not edit or commit that generated module. `build.mjs` then copies it with
the app into dist. Dev content changes require restarting `npm run dev` to regenerate.
No second handwritten lesson bank remains. Practice/revision/answer keys/mathCheck
are not in the browser artifact; the full canonical question bank remains in the repo.

`number-types.adapter.js` is a pure mapping, tested against both canonical JSON and
the generated projection. It does not mutate input, handles source order explicitly,
and rejects unsupported schema versions or unresolved lesson prerequisites.

| Canonical field | UI behaviour |
| --- | --- |
| id / order | Stable lesson route and source sequence; no index-based saved identity |
| title / optional | Lesson title and explicit optional enrichment label |
| objectives | Complete list, in source order |
| prerequisites | Skills kept verbatim; lesson IDs become linked “Lesson N: Title” text |
| explanationBlocks | Each block rendered as its own escaped paragraph, in source order |
| examples | Both examples, array order and stable example IDs preserved |
| examples.steps / answer | Ordered list inside native details/summary, followed by the answer |
| publicationStatus / reviewStatus | Source unchanged; every screen has a draft, not-published review banner |

## Continue compatibility

Storage key stays `clp-ui:last-lesson:v1`. Home resolves legacy values to canonical
links; opening any canonical or old route stores the canonical ID. Old bookmarked
URLs remain valid without modifying their hash. Unknown stored IDs offer the first
lesson instead of inventing completion. Storage denial leaves navigation usable.

| Previous URL/stored ID | Canonical ID |
| --- | --- |
| counting-world | nt-l1 |
| pair-up | nt-l2 |
| prime-detectives | nt-l3 |
| number-neighbours | nt-l4 |

Core ends after lesson 3; lesson 4 remains optional. No MCQ/game/scoring interface,
authentication, backend or publication/deployment is introduced. This preview
intentionally includes draft content for review and is not a production publication gate.
