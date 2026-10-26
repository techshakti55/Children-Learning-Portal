import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { adaptTopic, resolveLessonId, legacyLessonIds } from '../src/features/number-types.adapter.js';
import { upcomingTopics } from '../src/features/topics.js';
import generated from '../src/features/number-types.data.js';
import { escapeHtml, button } from '../src/components/ui.js';
const source = JSON.parse(await readFile(new URL('../../content/class-4/maths/number-types/topic.json', import.meta.url)));

test('adapter preserves stable IDs, all content and source ordering without mutation', () => {
  const copy = structuredClone(source);
  const { lessons, topic } = adaptTopic(source);
  assert.deepEqual(lessons.map(l => l.id), ['nt-l1', 'nt-l2', 'nt-l3', 'nt-l4']);
  assert.deepEqual(lessons.map(l => l.optional), [false, false, false, true]);
  for (const [i, lesson] of lessons.entries()) {
    for (const field of ['id', 'order', 'title', 'objectives', 'explanationBlocks', 'examples']) assert.deepEqual(lesson[field], source.lessons[i][field]);
    assert.equal(lesson.examples.length, 2);
    assert.ok(lesson.prerequisites.every(p => !/^nt-l\d+$/.test(p.text)));
    assert.equal('practice' in lesson, false);
  }
  assert.equal(topic.publicationStatus, 'draft');
  assert.equal(topic.reviewStatus, source.reviewStatus);
  assert.deepEqual(source, copy);
  const reversed = { ...source, lessons: [...source.lessons].reverse() };
  assert.deepEqual(adaptTopic(reversed), adaptTopic(source));
  assert.equal(upcomingTopics.length, 4);
});
test('generated browser projection equals canonical lesson content and excludes MCQs/author metadata', () => {
  assert.deepEqual(adaptTopic(generated), adaptTopic(source));
  const text = JSON.stringify(generated);
  for (const key of ['practice', 'revision', 'correctOptionId', 'mathCheck']) assert.equal(text.includes(`"${key}"`), false);
});
test('legacy saved IDs resolve to stable canonical IDs; unknown values do not', () => {
  const { lessons } = adaptTopic(source);
  for (const [old, id] of Object.entries(legacyLessonIds)) {
    assert.equal(resolveLessonId(old, lessons), id);
    assert.equal(resolveLessonId(id, lessons), id);
  }
  for (const bad of [null, undefined, '', 'nt-l99', 'toString']) assert.equal(resolveLessonId(bad, lessons), undefined);
  const invalid = structuredClone(source);
  invalid.lessons[0].prerequisites.push('nt-l99');
  assert.throws(() => adaptTopic(invalid), /Unknown prerequisite/);
  assert.throws(() => adaptTopic({ ...source, schemaVersion: '2.0.0' }), /Unsupported/);
});
test('shared renderers escape text and attributes', () => {
  assert.equal(escapeHtml('<script>"&'), '&lt;script&gt;&quot;&amp;');
  const rendered = button('<Learn>', '#/" onclick="bad');
  assert.ok(rendered.includes('&lt;Learn&gt;'));
  assert.ok(!rendered.includes('href="#/" onclick='));
});
