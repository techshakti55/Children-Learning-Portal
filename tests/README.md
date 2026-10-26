# Verification

Task 02: `python3 tests/content/check_number_types.py` (Windows: `py tests/content/check_number_types.py`).
The exact reviewed checker uses the standard library to verify source structure,
mathematical predicates, keys and the optional revision split. FORMAT.md documents limits.

UI: from `frontend`, run `npm run check`, `npm test`, `npm run build`. Seven Node tests
cover adapter fidelity, generated content, stable/legacy routes, full rendered lesson
content, escaping, Continue and denied storage. They use a rendering-boundary stub.
`tests/ui.browser.mjs` in frontend adds real Chromium navigation/keyboard/overflow
checks and screenshots when a browser is installed. See frontend/README.md.

No CI is implemented or verified. Practice/game UI tests, worksheet/key consistency,
scoring, full resume, published-content filtering and admin permissions remain future work.
