# Home → Topic → Lesson review preview · Tasks 02–05

Native JS ES modules + CSS. Node 22+ is required for local tools. No npm install is
needed to build or run the app; no runtime dependencies or CDN assets. See ADR-001
and ADR-002 in docs/architecture/DECISIONS.md.

```powershell
cd frontend
npm run check
npm test
npm run build
npm run dev
# Open http://127.0.0.1:5173
```

For the built artifact use `node scripts/serve.mjs --dist` after build. Both servers
bind only to loopback and are review helpers, not production hosts.

## Content and structure

- `src/components/ui.js`: shared cards, badges, buttons, breadcrumbs and local SVG art.
- `src/styles/theme.css`: shared tokens and responsive layouts.
- `src/features/number-types.adapter.js`: pure canonical mapping and old-ID aliases.
- `scripts/prepare-content.mjs`: derives a lesson-only module from the repository's
  canonical topic.json before dev/check/test/build. Restart dev after content edits.
- `src/features/number-types.data.js`: generated/ignored; never edit or commit.
- `src/features/topics.js`: future topic presentation, all Coming soon.
- `src/app.js`: hash navigation and last-opened lesson only.

PR #1 exact reviewed content `b0eced932ac8f694a63985478ea63c558eeef6ae` replaces the
initial sample bank. All objectives, explanations and ordered worked steps are
rendered, with readable prerequisite links. The draft review banner is intentional;
content is not published. Maths Meadow remains a working name. Core ends at Lesson 3;
Lesson 4 is optional. There are no games, MCQ practice, scores, backend or login.
See [adapter mapping/provenance](../docs/ui/CONTENT_ADAPTER.md).

Old title-slug URLs and stored Continue IDs still open the correct canonical lesson.
Only a lesson ID is stored, not completion or student identity. Storage denial is
handled. Shared devices share that position; clearing browser data removes it.

## Optional real Chromium checks and screenshots

These are review tools, not app dependencies. In an environment where Chromium can
be downloaded (or with an already installed matching Playwright/browser):

```powershell
npm install --no-save --package-lock=false playwright@1.62.1
npx playwright install chromium --only-shell
npm run build
node scripts/serve.mjs --dist
# Another terminal, from frontend:
node tests/ui.browser.mjs
```

A preinstalled module can be used with `PLAYWRIGHT_MODULE` set to its absolute
`index.mjs` path. The script fails explicitly if Chromium is missing. It covers
320/390/768/1280px, keyboard skip/navigation/reveal, Back/Forward/refresh, canonical
content/ordered steps, old URLs and saved Continue, denied storage and page overflow.
On a successful run it writes full-page Home, Topic and four Lesson screenshots
at 390px/1280px to ignored `frontend/tmp/screenshots/`. Inspect those before declaring
visual acceptance; also check zoom and screen-reader behaviour manually.

Current result: browser execution BLOCKED by missing Chromium and invalid/truncated
headless-shell download ZIP. No screenshots or real browser checks passed here.
Seven Node tests and the static build pass; Node rendering tests use a minimal DOM
boundary stub. See docs/STATUS.md for evidence and the pending review gate.
