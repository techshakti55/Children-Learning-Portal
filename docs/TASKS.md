# Development Tasks

Baseline: 26 October 2026. Ready means unblocked for starting, not implemented.

| ID | Task | Status | Deliverable | Completion check |
| --- | --- | --- | --- | --- |
| 01 | Scope baseline | Complete | Planning document and repository scaffold | Plan and task tracker available |
| 02 | First topic content | In review (coordination checked; draft) | Four lessons, eight examples, 20 practice and 10 revision questions | Maths reviewed; hints and explanations included |
| 03 | UI design system | In review (visual gate pending) | Typography, colours, cards, buttons and common states | Mobile and desktop design review |
| 04 | Home page | In review (visual gate pending) | Topic cards and continue section | Ready and coming-soon states work |
| 05 | Lessons | In review (canonical draft integrated) | Topic overview and lesson flow | Home → Topic → Lesson demo reviewed |
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
| 2026-10-26 | 01 | Initial repository scaffold and planning files | File structure, Word document and Markdown conversion checked | No app implementation yet at baseline |
| 2026-10-26 | 02 | [PR #1](https://github.com/techshakti55/Children-Learning-Portal/pull/1); content commit `4b4ac2c`; `feature/02-number-types-content`; `content/class-4/maths/number-types/topic.json`, FORMAT.md and REVIEW.md | Local Python check passed: four lessons, eight examples, 30 MCQs; all option predicates and answer keys checked; definitions, worked examples and explanations author-reviewed | Shakti review of PR #1; draft only, no CI or publication claim |
| 2026-10-26 | 03–05 first UI milestone | `feature/03-05-first-ui-milestone`; ADR-001; PR titled “Build first Home → Topic → Lesson UI milestone” | Syntax PASS; 4 Node checks PASS; static build PASS; built asset HTTP smoke PASS; Playwright BLOCKED by missing Chromium and invalid browser download | Real mobile/desktop visual and keyboard review; reviewed Task 02 integration; common async/edit/completion states in later milestones. No merge/deploy |
| 2026-10-26 | 02 + 03–05 integration | [PR #2](https://github.com/techshakti55/Children-Learning-Portal/pull/2), existing `feature/03-05-first-ui-milestone`; PR #1 exact reviewed commit `b0eced932ac8f694a63985478ea63c558eeef6ae` | Canonical files/checker byte match PASS; Python content check PASS; UI syntax PASS; 7 Node tests PASS; build PASS; 7 built asset HTTP checks PASS | Real screenshots/navigation/keyboard/overflow review BLOCKED by missing Chromium and invalid ZIP download; draft publication/owner sign-off not inferred; games and practice UI pending |

Main Coordination reports PR #1/#2 reviewed and the earlier content checker, UI
syntax, four tests and build rerun PASS. The row above records this integration's
own local evidence. The earlier “sample content unavailable” note is historical;
canonical PR #1 content is now included. Task 02's bank exists, but Task 07 practice
and Task 06 games are still not implemented. Content JSON remains draft with its
original reviewStatus. No main merge, CI verification or deployment is claimed.
