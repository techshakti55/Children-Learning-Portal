import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { legacyLessonIds } from '../src/features/number-types.adapter.js';
import source from '../src/features/number-types.data.js';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
// Fail explicitly if unavailable. Never turn a missing browser into a passing check.
const browser = await chromium.launch();
const output = fileURLToPath(new URL('../tmp/screenshots/', import.meta.url));
await mkdir(output, { recursive: true });
const base = 'http://127.0.0.1:5173/';
const lessonHash = id => `#/topics/number-types/lessons/${id}`;
async function heading(page, title) {
  await page.waitForFunction(expected => document.querySelector('h1')?.textContent === expected, title);
}
try {
  for (const width of [320, 390, 768, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto(base);
    await heading(page, 'Big discoveries.Little steps.');
    assert.match(await page.locator('.review-banner').innerText(), /Review preview.*Draft.*Not published/);
    assert.equal(await page.locator('.coming-soon a').count(), 0);
    // Skip and primary navigation really run from the keyboard.
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.skip-link').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('main').evaluate(el => el === document.activeElement), true);
    const explore = page.getByRole('link', { name: 'Explore Number Types' });
    await explore.focus();
    await page.keyboard.press('Enter');
    await heading(page, 'Number Detectives');
    await page.getByRole('link', { name: 'Counting World', exact: true }).click();
    await heading(page, 'Counting World');
    await page.locator('summary').first().focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('details').first().getAttribute('open'), '');
    await page.keyboard.press('Space');
    assert.equal(await page.locator('details').first().getAttribute('open'), null);
    await page.reload();
    await heading(page, 'Counting World');
    await page.goBack();
    await heading(page, 'Number Detectives');
    await page.goForward();
    await heading(page, 'Counting World');
    const screens = [['home', '#/', 'Big discoveries.Little steps.'], ['topic', '#/topics/number-types', source.title], ...source.lessons.map(l => [l.id, lessonHash(l.id), l.title])];
    for (const [name, hash, title] of screens) {
      await page.goto(base + hash);
      await heading(page, title);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Page overflow at ${width}: ${hash}`);
      if (name.startsWith('nt-')) {
        const lesson = source.lessons.find(l => l.id === name);
        assert.deepEqual(await page.locator('.idea > p').allTextContents(), lesson.explanationBlocks);
        assert.deepEqual(await page.locator('.objectives > li').allTextContents(), lesson.objectives);
        for (const example of lesson.examples) {
          const details = page.locator(`[data-example-id="${example.id}"]`);
          await details.locator('summary').click();
          assert.deepEqual(await details.locator('ol > li').allTextContents(), example.steps);
          assert.ok((await details.locator('.example-answer').innerText()).endsWith(example.answer));
        }
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Expanded steps overflow at ${width}: ${hash}`);
      }
      if ([390, 1280].includes(width)) await page.screenshot({ path: `${output}${width}-${name}.png`, fullPage: true });
    }
    for (const [old, id] of Object.entries(legacyLessonIds)) {
      await page.evaluate(value => localStorage.setItem('clp-ui:last-lesson:v1', value), old);
      await page.goto(base);
      await page.reload();
      const link = page.getByRole('link', { name: 'Continue lesson' });
      assert.equal(await link.getAttribute('href'), lessonHash(id));
      await link.click();
      await heading(page, source.lessons.find(l => l.id === id).title);
      await page.goto(base + lessonHash(old));
      await heading(page, source.lessons.find(l => l.id === id).title);
      assert.equal(await page.evaluate(() => localStorage.getItem('clp-ui:last-lesson:v1')), id);
    }
    await page.goto(base + '#/missing');
    await heading(page, 'Let’s find your path');
    assert.deepEqual(errors, []);
    await page.close();
    console.log(`PASS real browser navigation, keyboard and overflow at ${width}px`);
  }
  const denied = await browser.newPage();
  await denied.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw Error('Storage denied'); } }));
  await denied.goto(base + lessonHash('nt-l2'));
  await heading(denied, 'Pair Up');
  await denied.close();
  console.log(`Screenshots: ${output}`);
} finally { await browser.close(); }
