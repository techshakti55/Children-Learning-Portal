# Technical Decisions

| Decision | Status | Direction |
| --- | --- | --- |
| Repository layout | Agreed baseline | One repo with frontend, backend, content, docs, tests and deployment |
| Product identity | Agreed baseline | Separate learning brand and domain; exact name open |
| Frontend framework | Selected for milestone 1 | Native JavaScript ES modules + CSS; see ADR-001 below |
| Backend framework and database | Open | Modular application; discuss and record tradeoffs first |
| Student progress | Agreed release scope | Browser-local first; shared-device limitation disclosed |
| Accounts | Future | Parent-managed accounts; private server-side learner access |
| Hosting | Open | Review capacity and isolation before considering existing EC2 |

For every new decision record date, reason, alternatives, impact and task/PR reference. Do not infer a stack from folder names.

## ADR-001 — First UI milestone (26 October 2026)

Accepted for Tasks 03–05 on `feature/03-05-first-ui-milestone`.

Use semantic HTML, native JavaScript ES modules and plain CSS with shared design tokens.
This milestone has three screen types and static content, so a runtime framework is not
needed. Shared rendering components and a separate content module keep ordinary text
out of page logic. A dependency-free Node 22+ build copies the validated static source;
it does not transpile or bundle. Hash routes support refresh and browser history without
server rewrite rules. All assets are local; no CDN, font service or analytics is used.

Alternatives: React + TypeScript + Vite would offer stronger contracts and a larger
component ecosystem, but adds install/build dependencies before backend/admin needs
are known. Plain HTML pages would duplicate navigation and lesson layouts. Revisit
React/TypeScript before the admin editor or complex games; this choice is deliberately
limited to the first milestone, not a claim that vanilla JS is best for every future screen.

Impact: target current evergreen browsers; JavaScript is required. Content is trusted,
repository-owned data and is escaped before HTML rendering. There is no remote HTML
or content API. LocalStorage stores only the last lesson ID, never identity or scores;
storage denial is handled and the UI still works. Shared devices share this position,
and clearing browser data removes it. No completion or practice scoring is implied.

Initial milestone used labelled sample lessons because Task 02 was unavailable at
inspection. ADR-002 below supersedes that temporary source with canonical draft content.
Backend, authentication, games, formal practice, resources and deployment remain pending.

## ADR-002 — Canonical draft adapter (26 October 2026)

Tasks 02 + 03–05, existing PR #2 branch. Integrate PR #1's exact reviewed content
commit `b0eced932ac8f694a63985478ea63c558eeef6ae`, preserving the canonical files
and checker bytes. Source publication/review metadata stays unchanged.

`prepare-content.mjs` projects lesson fields from the canonical JSON to an ignored
JS module before every build/dev/check/test. The browser adapter sorts by `order`,
preserves source IDs and text, and resolves prerequisite IDs to readable titles.
This avoids fetching the full draft question bank/keys into the lesson UI, avoids
browser-specific JSON import attributes, and keeps a single editable source.
Alternative runtime fetch adds loading/failure paths and static hosting path setup
unneeded for this review milestone. No runtime dependency was added.

Canonical routes use `nt-l1`–`nt-l4`; an explicit legacy alias map resolves all four
previous slugs both in URLs and the unchanged localStorage key. Opening a lesson
writes its canonical ID. Unknown/stale IDs fall back to a truthful first-visit state.
Canonical source ID changes require a deliberate migration, never array-index identity.

This is an explicitly labelled draft **review preview**, not a publication mechanism.
Production published-content filtering belongs to the future backend/build workflow.
No practice/game UI is added; author verification metadata and MCQs are excluded
from the generated browser projection. See docs/ui/CONTENT_ADAPTER.md.

## Static presentation follow-up (26 October 2026, PR #2)

Map diagram definitions by canonical lesson ID in a separate presentation module;
keep the canonical JSON and adapter unchanged. Use semantic HTML/CSS for exact
counters, nesting, grids and ticks, not generated raster images. This keeps text
readable/selectable and visuals dependency-free. Named figures, captions and plain
text alternatives explain the same meaning without colour. Static diagrams do not
introduce game state, practice or scoring. Browser visual acceptance is still pending.
