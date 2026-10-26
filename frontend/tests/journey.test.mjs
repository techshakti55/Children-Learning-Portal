import { test } from 'node:test';
import assert from 'node:assert/strict';
import source from '../src/features/number-types.data.js';
import { legacyLessonIds } from '../src/features/number-types.adapter.js';
import { escapeHtml } from '../src/components/ui.js';
// Rendering-boundary tests; real browser layout/keyboard tests are separate.
async function launch(hash = '#/', { blocked = false, saved } = {}) {
  let navigate;
  const storage = new Map(saved ? [['clp-ui:last-lesson:v1', saved]] : []);
  const main = { innerHTML: '', focus() {} };
  globalThis.document = { querySelector: () => main, title: '' };
  globalThis.location = { hash };
  globalThis.localStorage = {
    getItem(key) { if (blocked) throw Error('denied'); return storage.get(key); },
    setItem(key, value) { if (blocked) throw Error('denied'); storage.set(key, value); },
  };
  globalThis.window = { addEventListener(event, callback) { navigate = callback; }, scrollTo() {} };
  await import(`../src/app.js?test=${Math.random()}`);
  return { main, storage, go(next) { location.hash = next; navigate(); } };
}
function assertOrdered(html, values) {
  let last = -1;
  for (const text of values) {
    const index = html.indexOf(escapeHtml(text), last + 1);
    assert.ok(index > last, `Missing or out-of-order content: ${text}`);
    last = index;
  }
}
test('Home → Topic → all canonical Lessons renders all paragraphs, objectives and worked steps', async () => {
  const app = await launch();
  assert.match(app.main.innerHTML, /Big discoveries/);
  assert.equal((app.main.innerHTML.match(/Coming soon/g) || []).length, 4);
  for (const c of app.main.innerHTML.matchAll(/<article class="card coming-soon">(.*?)<\/article>/gs)) assert.doesNotMatch(c[1], /<a\b/);
  app.go('#/topics/number-types');
  assert.match(app.main.innerHTML, /DRAFT REVIEW PREVIEW/);
  assert.match(app.main.innerHTML, /Optional extra/);
  for (const lesson of source.lessons) {
    app.go(`#/topics/number-types/lessons/${lesson.id}`);
    const html = app.main.innerHTML;
    assert.equal((html.match(/<details data-example-id=/g) || []).length, 2);
    assert.match(html, /Before you start/);
    assert.match(html, /class="learning-visuals"/);
    assert.match(html, /Read the picture in words/);
    assertOrdered(html, lesson.objectives);
    assertOrdered(html, lesson.explanationBlocks);
    for (const example of lesson.examples) {
      assertOrdered(html, [example.prompt, ...example.steps, example.answer]);
      assert.ok(html.includes(`data-example-id="${example.id}"`));
    }
    assert.equal(app.storage.get('clp-ui:last-lesson:v1'), lesson.id);
    for (const prerequisite of lesson.prerequisites) {
      if (/^nt-l\d+$/.test(prerequisite)) {
        const previous = source.lessons.find(l => l.id === prerequisite);
        assert.ok(html.includes(`Lesson ${previous.order}: ${previous.title}`));
        assert.ok(html.includes(`href="#/topics/number-types/lessons/${previous.id}"`));
      } else assert.ok(html.includes(escapeHtml(prerequisite)));
    }
    assert.doesNotMatch(html, /type="radio"|correctOptionId|mathCheck/);
  }
  assert.match(app.main.innerHTML, /OPTIONAL ENRICHMENT/);
  app.go('#/');
  assert.match(app.main.innerHTML, /Continue lesson/);
  const home = app.main.innerHTML;
  app.go('#main');
  assert.equal(app.main.innerHTML, home);
  app.go('#/missing');
  assert.match(app.main.innerHTML, /Let’s find your path/);
});
test('old saved Continue values and all legacy URLs resolve to canonical IDs', async () => {
  for (const [old, id] of Object.entries(legacyLessonIds)) {
    const app = await launch('#/', { saved: old });
    assert.match(app.main.innerHTML, /Continue lesson/);
    assert.ok(app.main.innerHTML.includes(`href="#/topics/number-types/lessons/${id}"`));
    app.go(`#/topics/number-types/lessons/${old}`);
    assert.ok(app.main.innerHTML.includes(`data-lesson-id="${id}"`));
    assert.equal(app.storage.get('clp-ui:last-lesson:v1'), id);
  }
  const unknown = await launch('#/', { saved: 'removed-lesson' });
  assert.doesNotMatch(unknown.main.innerHTML, /Continue lesson/);
});
test('direct canonical/legacy routes work with denied storage', async () => {
  for (const id of ['nt-l2', 'pair-up']) {
    const app = await launch(`#/topics/number-types/lessons/${id}`, { blocked: true });
    assert.match(app.main.innerHTML, /0 = 2 × 0/);
    app.go('#/');
    assert.match(app.main.innerHTML, /Continue lesson/);
  }
});
