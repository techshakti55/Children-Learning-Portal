# First UI milestone · Tasks 03–05

Native ES modules and CSS; Node 22+ for local tools. No npm install is needed to
build or run the app. Current evergreen browsers are the target. See
[ADR-001](../docs/architecture/DECISIONS.md) for the choice and tradeoffs.

```powershell
cd frontend
npm run check
npm test
npm run build
npm run dev
# Open http://127.0.0.1:5173
```

To inspect the build instead: `node scripts/serve.mjs --dist`. The local server
binds only to loopback and is a review helper, not a production host.

## Structure

- `src/components/ui.js`: shared card, badge, link-button, breadcrumb and SVG art.
- `src/styles/theme.css`: colour/spacing/radius tokens and responsive layouts.
- `src/features/number-types.sample.js`: all four sample lesson records and topics.
- `src/app.js`: Home → Topic → Lesson hash routing and last-opened lesson.
- `scripts/build.mjs`: static copy build; no transpilation or bundle step.

The working name Maths Meadow is a preview name, not a final brand/domain decision.
The persistent banner identifies sample content. This is not Task 02's reviewed
question bank. It contains no MCQs, scoring, games, backend or authentication.
The ready topic opens lessons; coming-soon cards contain no interactive controls.
Native details/summary reveals explanations using touch or keyboard.
Only the last opened lesson ID is stored; no completion/results are fabricated.
Storage errors do not stop learning; history/refresh use hash routes.

## Optional real browser checks

In an environment with downloadable Chromium, install this optional review tool:

```powershell
npm install --no-save --package-lock=false playwright@1.62.1
npx playwright install chromium
node scripts/serve.mjs --dist
# In another terminal, from frontend:
node tests/ui.browser.mjs
```

If using a preinstalled Playwright, set `PLAYWRIGHT_MODULE` to its absolute
`index.mjs` path instead. Browser checks cover the Home → Topic → Lesson journey,
keyboard explanation reveal, refresh/back, coming-soon links, JS errors and
horizontal overflow at 320, 390, 768 and 1280px. They do not prove visual quality;
review the screens manually as described in [the UI guide](../docs/ui/README.md).
Node tests exercise content shape, escaping, rendering/routing and denied storage,
with a minimal DOM boundary stub; they are not real browser interaction tests.
