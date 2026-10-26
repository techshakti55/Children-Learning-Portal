export const reviewedContentCommit = 'b0eced932ac8f694a63985478ea63c558eeef6ae';
export const legacyLessonIds = Object.freeze({
  'counting-world': 'nt-l1',
  'pair-up': 'nt-l2',
  'prime-detectives': 'nt-l3',
  'number-neighbours': 'nt-l4',
});

// Keep the source IDs, all explanation blocks and ordered examples/steps.
// UI labels/decoration are deliberately separate from the learning source.
export function adaptTopic(source) {
  if (source.schemaVersion !== '1.0.0') throw new Error('Unsupported Number Types schema');
  const ordered = [...source.lessons].sort((a, b) => a.order - b.order);
  const byId = new Map(ordered.map(lesson => [lesson.id, lesson]));
  if (byId.size !== ordered.length) throw new Error('Duplicate lesson ID');
  const lessons = ordered.map(lesson => ({
    id: lesson.id,
    order: lesson.order,
    title: lesson.title,
    optional: lesson.optional,
    objectives: [...lesson.objectives],
    prerequisites: lesson.prerequisites.map(value => {
      const prerequisite = byId.get(value);
      if (!prerequisite && /^nt-l\d+$/.test(value)) throw new Error(`Unknown prerequisite ${value}`);
      return prerequisite ? { text: `Lesson ${prerequisite.order}: ${prerequisite.title}`, lessonId: value } : { text: value };
    }),
    explanationBlocks: [...lesson.explanationBlocks],
    examples: lesson.examples.map(example => ({ id: example.id, prompt: example.prompt, steps: [...example.steps], answer: example.answer })),
  }));
  return {
    topic: { id: source.id, title: source.title, label: 'Number Types',
      description: 'Discover counting numbers, even and odd numbers, factors and primes.',
      publicationStatus: source.publicationStatus, reviewStatus: source.reviewStatus,
      contentVersion: source.contentVersion, conventions: [...source.conventions] },
    lessons,
  };
}

// Resolve only known IDs; never turn a stale/unknown value into a fabricated result.
export function resolveLessonId(value, lessons) {
  const id = legacyLessonIds[value] || value;
  return lessons.some(lesson => lesson.id === id) ? id : undefined;
}
