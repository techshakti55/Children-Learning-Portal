# Development Tasks

Baseline: 26 October 2026. Ready means unblocked for starting, not implemented.

| ID | Task | Status | Deliverable | Completion check |
| --- | --- | --- | --- | --- |
| 01 | Scope baseline | Complete | Planning document and repository scaffold | Plan and task tracker available |
| 02 | First topic content | Ready | Four lessons, eight examples, 20 practice and 10 revision questions | Maths reviewed; hints and explanations included |
| 03 | UI design system | Ready | Typography, colours, cards, buttons and common states | Mobile and desktop design review |
| 04 | Home page | Pending | Topic cards and continue section | Ready and coming-soon states work |
| 05 | Lessons | Pending | Topic overview and lesson flow | Home → Topic → Lesson demo reviewed |
| 06 | Games | Pending | Sorting, matching and visual construction | Accurate feedback; tap and keyboard access |
| 07 | Practice | Pending | Hints, scoring, mistakes, retry and local resume | Scoring and resume verified |
| 08 | Print and OMR | Pending | Download resources and online answer grid | Versioned question/option order matches key |
| 09 | Backend foundation | Pending | Content APIs and admin authentication | Drafts hidden; unauthorised writes blocked |
| 10 | Admin tools | Pending | Editor, import, reorder, preview and publish | Shakti can publish without code edits |
| 11 | Integration | Pending | Connected child and admin journeys | Acceptance checks pass |
| 12 | Release | Pending | Hosting, domain and operating guide | HTTPS, health and restore checks |

## Dependencies and reviews

- 02 and 03 can begin independently. Select the frontend stack before executable UI work.
- 04 and 05 follow 03 and reviewed sample content. First review is Home → Topic → Lesson.
- 06 and 07 follow the shared UI components and reviewed content. Second review covers games and practice.
- Agree the API contract before integrating 09 and 10. Technology selection precedes backend setup.
- 11 follows integration; 12 follows acceptance and hosting decisions.

## Change record

| Date | Task | Evidence | Checks | Remaining |
| --- | --- | --- | --- | --- |
| 2026-10-26 | 01 | Initial repository scaffold and planning files | File structure, Word document and Markdown conversion checked | No app implementation yet |

Add branch/commit/PR and actual check results for each later task. Do not mark a task complete based only on a UI mockup.
