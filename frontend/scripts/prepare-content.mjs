import { readFile, writeFile } from 'node:fs/promises';

// Rebuild this projection from the canonical file; never hand-edit a second content bank.
const source = JSON.parse(await readFile(new URL('../../content/class-4/maths/number-types/topic.json', import.meta.url), 'utf8'));
const { schemaVersion, contentVersion, id, title, publicationStatus, reviewStatus, conventions } = source;
const lessons = source.lessons.map(({ id, order, title, optional, objectives, prerequisites, explanationBlocks, examples }) =>
  ({ id, order, title, optional, objectives, prerequisites, explanationBlocks, examples }));
const data = { schemaVersion, contentVersion, id, title, publicationStatus, reviewStatus, conventions, lessons };
await writeFile(new URL('../src/features/number-types.data.js', import.meta.url),
  `// Generated lesson-only projection of canonical topic.json. Do not edit.\nexport default ${JSON.stringify(data, null, 2)};\n`);
console.log('Prepared canonical lesson projection (no MCQs or author-only mathCheck metadata).');
