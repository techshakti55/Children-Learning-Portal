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

Task 02 was unavailable at inspection (only main branch, no open PR), so the UI uses
labelled sample lessons in `frontend/src/features/number-types.sample.js`. Replace via
an explicit adapter after reviewing Task 02's final contract; do not overwrite its work.
Backend, authentication, games, formal practice, resources and deployment remain pending.
