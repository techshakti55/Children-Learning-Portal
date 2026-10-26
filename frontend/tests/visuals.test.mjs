import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lessonVisuals } from '../src/features/number-types.presentation.js';
import { renderLearningVisuals } from '../src/components/learning-visuals.js';
const factors = n => Array.from({ length: n }, (_, i) => i + 1).filter(d => n % d === 0);
test('visual mapping covers canonical lesson IDs with labelled text alternatives', () => {
  assert.deepEqual(Object.keys(lessonVisuals), ['nt-l1', 'nt-l2', 'nt-l3', 'nt-l4']);
  const ids = Object.values(lessonVisuals).flat().map(v => v.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const visuals of Object.values(lessonVisuals)) for (const v of visuals) {
    assert.ok(v.title && v.caption && v.alternative);
    const html = renderLearningVisuals([v]);
    assert.ok(html.includes(`aria-labelledby="${v.id}-title"`));
    assert.ok(html.includes(v.alternative));
    assert.match(html, /<figcaption>/);
    assert.doesNotMatch(html, /<button|<input|draggable|onclick|tabindex/);
  }
  assert.equal(renderLearningVisuals(), '');
});
test('pairs, factor rectangles, common factors and integer spacing are mathematically accurate', () => {
  const family = lessonVisuals['nt-l1'][0];
  assert.deepEqual(family.wholeOnly, [0]);
  assert.ok(family.natural.every(n => Number.isInteger(n) && n >= 1));
  for (const g of lessonVisuals['nt-l2'][0].groups) {
    assert.equal(2 * g.pairs + g.leftover, g.number);
    assert.equal(g.leftover, g.number % 2);
  }
  for (const g of lessonVisuals['nt-l3'][0].groups) {
    assert.deepEqual(g.factors, factors(g.number));
    for (const r of g.rectangles) assert.equal(r.rows * r.columns, g.number);
    assert.equal(g.classification, g.factors.length === 2 ? 'prime' : 'composite');
  }
  const [line, pair] = lessonVisuals['nt-l4'];
  assert.ok(line.values.every((n, i) => i === 0 || n - line.values[i - 1] === 1));
  assert.deepEqual(line.values, [-3, -2, -1, 0, 1, 2, 3]);
  for (const g of pair.coprime) assert.deepEqual(g.factors, factors(g.number));
  assert.deepEqual(pair.common, pair.coprime[0].factors.filter(n => pair.coprime[1].factors.includes(n)));
  assert.deepEqual(pair.common, [1]);
  assert.ok(pair.twins.every(n => factors(n).length === 2));
  assert.equal(pair.twins[1] - pair.twins[0], 2);
});
test('visual marks have correct counter counts and zero has no invented counters', () => {
  const html = renderLearningVisuals(lessonVisuals['nt-l2']);
  assert.equal((html.match(/class="counter"/g) || []).length, 15);
  assert.equal((html.match(/class="counter-pair"/g) || []).length, 7);
  assert.match(html, /0 counters. 0 = 2 × 0/);
  assert.match(html, /1 left over/);
  const rectangles = renderLearningVisuals(lessonVisuals['nt-l3']);
  assert.equal((rectangles.match(/class="counter"/g) || []).length, 19);
});
