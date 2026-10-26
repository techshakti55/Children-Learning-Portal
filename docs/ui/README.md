# UI milestone 1

Branch: `feature/03-05-first-ui-milestone`. Tasks 03–05 are implemented for review,
not accepted as complete. Use the frontend README to run the preview.

## Shared design

Calm cream background, dark green text, soft mint, yellow, peach, blue and lavender
accents. The provisional name is Maths Meadow. Shared cards, buttons, badges and
breadcrumbs are in `frontend/src/components/ui.js`; colour and spacing tokens are
in `frontend/src/styles/theme.css`. Change these shared definitions for consistent
updates. No external image, font, analytics or CDN dependency is loaded.

Home offers a real last-opened lesson link (or a truthful first-visit state), one
ready Number Types card and four non-interactive coming-soon topics. Topic shows
three core lessons and a clearly optional fourth lesson. Lesson has an objective,
prerequisites, a readable explanation, labelled number visual, two revealable
worked examples, a takeaway and previous/next navigation. Core lesson 3 explicitly
says the core path ends there; lesson 4 is optional enrichment.

Implemented states: first visit, continue, ready, coming soon, current lesson,
collapsed/expanded example and unknown route with a home link. There is no async
content fetch, edit form or completion system yet, so loading/retry, unsaved-change
and completed states remain for their dependent milestones. Avoid fake loading,
completion counts or rewards in this preview.

## Review checklist (real browser review still pending)

- At 320/390px, tablet and desktop: inspect wrapping, typography, card spacing,
  touch targets and horizontal overflow on all six screens.
- Follow Home → Topic → Lesson → next/previous → Home → Continue.
- Refresh a direct lesson URL; use browser Back/Forward.
- Tab from the skip link through links and example summaries. Press Enter/Space
  on a summary, verify visible focus, and verify no keyboard trap.
- Confirm screen reader landmarks, heading order, current lesson and example labels.
- Check 200% zoom and reduced-motion preference. No autoplay/sound/drag exists.
- Confirm future topics cannot be opened, sample banner remains on every screen,
  and optional enrichment is visible before and inside lesson 4.
- Block browser storage: lesson navigation still works without saving a position.

## Evidence, 26 October 2026

Node 24.22.1: syntax check PASS, four Node checks PASS, static build PASS.
Local built asset HTTP smoke checks are recorded in `docs/STATUS.md`.
Real Playwright execution BLOCKED: Chromium executable missing. Attempted Chromium
installation returned invalid/truncated archives (ZIP end-of-directory error).
No screenshots or real mobile/desktop usability validation are claimed.
No CI or production evidence exists. Final content integration and visual review
are required before accepting Tasks 03–05.
