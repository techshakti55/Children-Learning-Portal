import assert from 'node:assert/strict';
// Optional tool; not an application dependency. See frontend/README.md.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:5173/');
    assert.equal(await page.locator('.coming-soon a').count(), 0);
    await page.getByRole('link', { name: 'Explore Number Types' }).click();
    await page.getByRole('link', { name: 'Counting World', exact: true }).click();
    await page.locator('summary').first().focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('details').first().getAttribute('open'), '');
    await page.reload();
    assert.equal(await page.locator('h1').innerText(), 'Counting World');
    await page.goBack();
    assert.equal(await page.locator('h1').innerText(), 'Number Detectives');
    for (const route of ['#/', '#/topics/number-types', ...['counting-world','pair-up','prime-detectives','number-neighbours'].map(id => `#/topics/number-types/lessons/${id}`)]) {
      await page.goto(`http://127.0.0.1:5173/${route}`);
      await page.locator('h1').waitFor();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow: ${width}, ${route}`);
    }
    assert.deepEqual(errors, []);
    await page.close();
    console.log(`PASS real browser checks at ${width}px`);
  }
} finally { await browser.close(); }
