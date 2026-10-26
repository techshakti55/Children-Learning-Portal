# Windows PowerShell: local preview and manual browser review

This reviews PR #2 locally. It does not merge, publish or deploy anything.
Use installed Chrome or Edge; Playwright/Chromium installation is not required for
this manual review. Node.js 22 or newer and Git must be installed.

## 1. Open the PR branch

For a **fresh clone**, open PowerShell and run (choose another folder if this exists):

```powershell
git --version
node --version
git clone --branch feature/03-05-first-ui-milestone https://github.com/techshakti55/Children-Learning-Portal.git D:\Children-Learning-Portal
Set-Location D:\Children-Learning-Portal
```

For an **existing clone**, use its actual path instead and run:

```powershell
Set-Location D:\Children-Learning-Portal
git status --short
# If local changes are listed, keep them safe before switching branches.
git fetch origin
git switch feature/03-05-first-ui-milestone
git pull --ff-only origin feature/03-05-first-ui-milestone
git log -1 --oneline
```

Confirm the branch with `git branch --show-current`. Do not switch to main.

## 2. Run checks and start the built preview

```powershell
Set-Location D:\Children-Learning-Portal\frontend
npm.cmd run check
npm.cmd test
npm.cmd run build
node scripts/serve.mjs --dist
```

No `npm install` is needed. `npm.cmd` avoids PowerShell script execution-policy
issues. Expected checks: syntax PASS, 10 Node tests PASS, build PASS.
Optional Python content check from the repo root: `py tests/content/check_number_types.py`.
Keep the server PowerShell open; it should print `UI: http://127.0.0.1:5173`.
If that port is occupied, close the earlier preview process before retrying.
Stop this server later with Ctrl+C.

Open a **second PowerShell window**:

```powershell
Start-Process 'http://127.0.0.1:5173/'
```

This opens the default browser. Chrome/Edge can also open that address directly.

## 3. Desktop and mobile screenshots

In Chrome or Edge, open DevTools with F12 (or Ctrl+Shift+I). Press Ctrl+Shift+M
for the device toolbar. Select **Responsive**, set width/height **1280 × 900**, and
set browser zoom to 100% (Ctrl+0). The sizes refer to the page viewport, not the
outer browser window. Keep the device toolbar enabled for exact dimensions.

Visit each address below. For lessons, expand both “Show the explanation” controls
and every “Read the picture in words” control. Verify the draft banner is visible
at the top of every page. To capture: focus DevTools, press Ctrl+Shift+P, type
**Capture full size screenshot**, then press Enter. Save the downloaded PNG using
the suggested name. Repeat all six at **390 × 900** with `390-` instead of `1280-`.

| Page | Address | Desktop filename |
| --- | --- | --- |
| Home | http://127.0.0.1:5173/ | 1280-home.png |
| Topic | http://127.0.0.1:5173/#/topics/number-types | 1280-topic.png |
| Counting World | http://127.0.0.1:5173/#/topics/number-types/lessons/nt-l1 | 1280-nt-l1.png |
| Pair Up | http://127.0.0.1:5173/#/topics/number-types/lessons/nt-l2 | 1280-nt-l2.png |
| Prime Detectives | http://127.0.0.1:5173/#/topics/number-types/lessons/nt-l3 | 1280-nt-l3.png |
| Number Neighbours | http://127.0.0.1:5173/#/topics/number-types/lessons/nt-l4 | 1280-nt-l4.png |

Check all lessons also at **320 × 900** and **768 × 900**. Labels, captions, paired
counters, rectangles and the integer ticks must stay readable without clipping or
horizontal page scrolling. Panels and number chips should wrap to fit.

For an exact page-overflow check, use the DevTools Console at each width/page:

```javascript
({ viewport: innerWidth, page: document.documentElement.scrollWidth,
   noHorizontalOverflow: document.documentElement.scrollWidth <= innerWidth })
```

Expected `noHorizontalOverflow: true`. Check before and after expanding text/steps.
Capture any failing page and include its URL, viewport and browser version.
Screenshots alone do not confirm keyboard behaviour or mathematical accuracy.

## 4. Manual navigation, keyboard and content checks

1. On Home, choose Explore Number Types → Counting World → Next lesson. Follow the
   core sequence to Lesson 3. Confirm Lesson 4 is optional; choosing Topic overview
   or Home does not require completing it. Future topics must not open.
2. Expand each example and check ordered steps/answers. Follow prerequisite links.
   Use browser Back/Forward and refresh a direct lesson URL; the correct lesson stays open.
3. Open Pair Up, return Home, click Continue lesson. It must open Pair Up. Also open
   `http://127.0.0.1:5173/#/topics/number-types/lessons/pair-up`, refresh, and confirm
   this old URL still opens Pair Up. The other aliases are `counting-world`,
   `prime-detectives` and `number-neighbours`.
4. Test saved legacy Continue explicitly: on the preview page, open the Console and
   run `localStorage.setItem('clp-ui:last-lesson:v1', 'pair-up')`. Open Home and reload.
   Continue must open Pair Up; after opening it, the stored value should be `nt-l2`.
   Test an invalid value (`removed-lesson`): Home should offer Start first lesson.
5. Close DevTools, reload Home, press Tab. The Skip to learning link should appear.
   Press Enter to reach main. Keep using Tab/Shift+Tab; focus must be visible. Enter
   opens navigation links. In a lesson, Enter/Space toggles picture text and example
   summaries. There should be no keyboard trap or hover-only action.
6. Check visuals: natural numbers are nested inside whole numbers, with 0 outside
   the natural box; 8 has four pairs, 7 has three pairs plus one, 0 has no counters;
   6 has 1×6 and 2×3 rectangles while 7 has 1×7; the integer line increases left to
   right; 8/9 share only factor 1, while 3/5 are both prime and differ by 2.
7. Ensure words, outlines, counts and captions convey these facts without relying
   on colour. Read each picture's text alternative. At 200% zoom check wrapping and
   focus; reset with Ctrl+0 afterward. If available, use a screen reader to check
   figure names, headings, prerequisite links and summaries.

Record PASS/FAIL separately for desktop, mobile, keyboard, navigation and overflow.
These manual results and the 12 screenshots are the pending browser review evidence.
This guide does not claim the review has already passed.
