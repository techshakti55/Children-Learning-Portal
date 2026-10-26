# UI milestone 1 — canonical draft review preview

[PR #2](https://github.com/techshakti55/Children-Learning-Portal/pull/2), existing
`feature/03-05-first-ui-milestone`. Tasks 02–05 are combined for review, not published.
The exact PR #1 source is documented in [CONTENT_ADAPTER.md](CONTENT_ADAPTER.md).

## Shared design and content

Cream background, dark green text, mint/yellow/peach/blue/lavender accents; Maths
Meadow is provisional. Shared components live in `frontend/src/components/ui.js`,
colour/spacing/radius tokens and responsive rules in `frontend/src/styles/theme.css`.

Home has a truthful first-visit or last-opened Continue state, one Number Types
review card and four non-interactive Coming soon topics. Topic lists three core
lessons and optional enrichment. Every lesson renders all canonical objectives,
readable prerequisites, every explanation block and two examples with all ordered
steps/answers. Native details/summary supports touch and keyboard. Canonical IDs are
used in links; all four old URLs and saved Continue IDs remain supported.

A persistent “Review preview · Draft learning content · Not published” banner makes
the draft status clear. The initial handwritten sample bank has been removed.
No sample score/completion, game, practice, backend or authentication is shown.
Ready/current/optional/Coming soon/unknown-route/reveal states exist. Async retry,
unsaved-change and completion states belong to later dependent features.

## Actual evidence, 26 October 2026

Main Coordination reported initial PR #1/#2 checks PASS. This integration reran the
Python content checker, syntax checks, seven Node tests, static build, exact source
byte comparison and seven built asset HTTP checks: PASS. Node tests verify rendering
and mapping at a stubbed DOM boundary; they do not verify browser behaviour.

Real Chromium launch was attempted again: BLOCKED by missing headless-shell. The
browser download fails with an invalid ZIP/end-of-central-directory error. **No
real mobile/desktop screenshots were produced, and real navigation, keyboard and
overflow checks did not run.** CI/production are unverified; no deployment occurred.

## Browser acceptance still required

Follow frontend/README.md to run the updated browser script. It checks 320, 390,
768 and 1280px and captures Home, Topic and four expanded-example Lesson screens
at 390 and 1280px into frontend/tmp/screenshots/ when Chromium becomes available.

Then review wrapping, readability, touch targets, focus visibility, 200% zoom,
reduced motion, screen-reader headings/current state, old and canonical URLs,
Continue migration, navigation and storage denial. Check that optional enrichment
remains optional and drafts are clearly preview-only on every screen. Tasks 03–05
remain In review until that real-browser/visual acceptance gate passes.

## Static learning visuals

Visual definitions are mapped separately by canonical lesson ID in
`frontend/src/features/number-types.presentation.js`; reusable figure markup is in
`frontend/src/components/learning-visuals.js`. Canonical JSON and adapter are unchanged.
Each figure has labels, counts, outlines, a caption and “Read the picture in words”.
Panels and chips wrap on mobile. No score, drag/drop, game or MCQ interaction exists.
10 Node tests now pass, including visual maths/count checks; real Chromium remains
blocked. Follow [the exact Windows review guide](WINDOWS_REVIEW.md) to collect real
screenshots and check navigation, keyboard, overflow and zoom in installed Chrome/Edge.
