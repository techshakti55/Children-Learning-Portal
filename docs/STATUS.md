# Current Status

## Baseline complete

Planning in Word and Markdown, repository scaffold, task tracker and topic brief.

## First UI milestone — implemented for review, 26 October 2026

Branch: `feature/03-05-first-ui-milestone`; Tasks 03–05. PR title:
“Build first Home → Topic → Lesson UI milestone”. No merge or deploy.

- Native JS modules + CSS selected in ADR-001; no runtime dependencies.
- Shared cards/buttons/badges, design tokens, responsive Home, Topic and Lesson layouts.
- Number Types opens four labelled sample lessons with two worked examples each;
  fourth lesson optional. Four future topics are non-interactive Coming soon cards.
- Last-opened lesson only, browser-local and shared-device limitation disclosed.
- Hash history/direct routes, skip link, focus styles, native example reveals and
  unknown-route recovery. No sample score/completion is shown.
- Task 02 not available at initial inspection: only main branch and no open PR.
  Its final reviewed content is not included or marked complete here.

## Local checks

Node 24.22.1. `npm run check` PASS; `npm test` PASS (4 checks covering data,
escaping, Home → Topic → all Lessons → Continue, invalid route and blocked storage).
`npm run build` PASS; built index, JS and CSS HTTP smoke PASS.
These Node tests use a DOM boundary stub, not a real browser.

Real Playwright checks BLOCKED: missing Chromium executable; browser installation
failed with invalid/truncated download archives. Real mobile/desktop visual,
keyboard, zoom and screen reader checks remain pending (see docs/ui/README.md).
Tasks 03–05 are not marked complete until that gate and content review pass.
CI not configured/verified. Production not deployed/verified.

## Still pending

Reviewed Task 02 content, games, formal practice/scoring, mistake review, full local
progress, print/OMR, backend, admin, authentication, CI, integration and deployment.
Loading/error retry, unsaved-change and completion states belong to those later flows.
Brand/domain, backend/database, file storage, hosting and operating budget remain open.
