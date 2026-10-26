import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lessons, upcomingTopics } from '../src/features/number-types.sample.js';
import { escapeHtml, button } from '../src/components/ui.js';
test('unique lesson routes and optional fourth lesson', () => {
  assert.equal(lessons.length, 4);
  assert.equal(new Set(lessons.map(l => l.id)).size, 4);
  assert.deepEqual(lessons.map(l => Boolean(l.optional)), [false, false, false, true]);
  for (const lesson of lessons) {
    assert.match(lesson.id, /^[a-z-]+$/);
    assert.equal(lesson.examples.length, 2);
    for (const key of ['title', 'objective', 'prerequisite', 'explanation', 'takeaway']) assert.ok(lesson[key]);
  }
  assert.equal(upcomingTopics.length, 4);
});
test('shared renderers escape text and attributes', () => {
  assert.equal(escapeHtml('<script>"&'), '&lt;script&gt;&quot;&amp;');
  const rendered = button('<Learn>', '#/" onclick="bad');
  assert.ok(rendered.includes('&lt;Learn&gt;'));
  assert.ok(!rendered.includes('href="#/" onclick='));
});
