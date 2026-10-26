import { test } from 'node:test';
import assert from 'node:assert/strict';
// Rendering boundary checks, not a substitute for a real layout/browser review.
async function launch(hash = '#/', blocked = false) {
  let navigate;
  const storage = new Map();
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
test('Home → Topic → all Lessons → Continue and unknown route', async () => {
  const app = await launch();
  assert.match(app.main.innerHTML, /Big discoveries/);
  assert.equal((app.main.innerHTML.match(/Coming soon/g) || []).length, 4);
  for (const card of app.main.innerHTML.matchAll(/<article class="card coming-soon">(.*?)<\/article>/gs)) assert.doesNotMatch(card[1], /<a\b/);
  app.go('#/topics/number-types');
  assert.match(app.main.innerHTML, /Your discovery path/);
  assert.match(app.main.innerHTML, /Optional extra/);
  for (const id of ['counting-world', 'pair-up', 'prime-detectives', 'number-neighbours']) {
    app.go(`#/topics/number-types/lessons/${id}`);
    assert.equal((app.main.innerHTML.match(/<details>/g) || []).length, 2);
    assert.match(app.main.innerHTML, /Before you start/);
    assert.equal(app.storage.get('clp-ui:last-lesson:v1'), id);
  }
  assert.match(app.main.innerHTML, /OPTIONAL ENRICHMENT/);
  app.go('#/');
  assert.match(app.main.innerHTML, /Pick up where you left off/);
  const home = app.main.innerHTML;
  app.go('#main');
  assert.equal(app.main.innerHTML, home);
  app.go('#/missing');
  assert.match(app.main.innerHTML, /Let’s find your path/);
});
test('direct entry works with denied browser storage', async () => {
  const app = await launch('#/topics/number-types/lessons/pair-up', true);
  assert.match(app.main.innerHTML, /Zero splits into two equal groups/);
  app.go('#/');
  assert.match(app.main.innerHTML, /Continue lesson/);
});
