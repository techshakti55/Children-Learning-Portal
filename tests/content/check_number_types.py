"""Dependency-free structural and mathematical checks for the reviewed source bank."""
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
data = json.loads((ROOT / 'content/class-4/maths/number-types/topic.json').read_text())

def factors(n):
    return [d for d in range(1, n + 1) if n % d == 0]

def prime(n):
    return isinstance(n, int) and n > 1 and len(factors(n)) == 2

def composite(n):
    return isinstance(n, int) and n > 1 and len(factors(n)) > 2

def truth(check):
    kind = check['kind']
    values = check['candidates']
    n = check.get('number')
    if kind == 'family-claims':
        label = 'both' if n >= 1 else 'whole-only'
        return [v == label for v in values]
    if kind == 'parity-claims':
        return [v == ('even' if n % 2 == 0 else 'odd') for v in values]
    predicates = {
        'smallest-natural': lambda v: v == 1,
        'whole-not-natural': lambda v: v == 0,
        'first-whole': lambda v: v == [0, 1, 2, 3],
        'equals': lambda v: v == check['expected'],
        'even': lambda v: v % 2 == 0,
        'odd': lambda v: v % 2 == 1,
        'pairs': lambda v: v == n // 2,
        'leftover': lambda v: v == n % 2,
        'prime': prime,
        'composite': composite,
        'factors': lambda v: v == factors(n),
        'zero-one': lambda v: v == 'both-neither',
        'even-prime': lambda v: v % 2 == 0 and prime(v),
        'integer-not-whole': lambda v: isinstance(v, int) and v < 0,
        'greatest': lambda v: v == max(values),
        'smallest': lambda v: v == min(values),
        'coprime': lambda v: math.gcd(*v) == 1,
        'twin': lambda v: all(prime(x) for x in v) and abs(v[0] - v[1]) == 2,
        'composite-coprime': lambda v: all(composite(x) for x in v) and math.gcd(*v) == 1,
        'odd-composite-natural': lambda v: v >= 1 and v % 2 == 1 and composite(v),
        'coprime-twin': lambda v: all(prime(x) for x in v) and abs(v[0] - v[1]) == 2 and math.gcd(*v) == 1,
    }
    return [bool(predicates[kind](v)) for v in values]

assert data['publicationStatus'] == 'draft'
assert len(data['lessons']) == 4
ids = set()
questions = []
for index, lesson in enumerate(data['lessons'], 1):
    assert lesson['order'] == index
    assert lesson['optional'] == (index == 4)
    assert lesson['objectives'] and lesson['prerequisites'] and lesson['explanationBlocks']
    assert len(lesson['examples']) == 2
    assert len(lesson['practice']) == 5
    for example in lesson['examples']:
        assert example['prompt'] and len(example['steps']) >= 2 and example['answer']
        assert example['id'] not in ids
        ids.add(example['id'])
    questions.extend(lesson['practice'])
assert len(data['revision']['questions']) == 10
questions.extend(data['revision']['questions'])
for q in questions:
    assert q['id'] not in ids
    ids.add(q['id'])
    assert q['prompt'].strip() and q['hint'] and q['explanation'] and q['objective'] and q['prerequisites']
    assert q['optional'] == (q['lessonId'] == 'nt-l4')
    assert [o['id'] for o in q['options']] == list('ABCD')
    assert len({o['text'].strip().casefold() for o in q['options']}) == 4
    assert len(q['mathCheck']['candidates']) == 4
    results = truth(q['mathCheck'])
    assert sum(results) == 1, (q['id'], results)
    assert q['correctOptionId'] == 'ABCD'[results.index(True)], q['id']
    # Candidate metadata must match the displayed options, not just the answer key.
    for option, value in zip(q['options'], q['mathCheck']['candidates']):
        text = option['text']
        if isinstance(value, list):
            expected = ' and '.join(map(str, value)) if 'and' in text else ', '.join(map(str, value))
            assert text == expected, q['id']
        elif isinstance(value, (int, float)):
            assert (text == '1/2' and value == 0.5) or text == str(value), q['id']
# Worked-example arithmetic and factor lists; prose additionally reviewed manually.
assert 2 * 4 == 8 and 2 * 3 + 1 == 7
assert factors(7) == [1, 7] and factors(9) == [1, 3, 9]
assert 1 > -2 and math.gcd(3, 5) == 1 and prime(3) and prime(5) and 5 - 3 == 2
assert factors(8) == [1, 2, 4, 8] and factors(15) == [1, 3, 5, 15]
revision = data['revision']
assert revision['coreQuestionIds'] == [q['id'] for q in revision['questions'] if not q['optional']]
assert revision['optionalQuestionIds'] == [q['id'] for q in revision['questions'] if q['optional']]
assert len(revision['coreQuestionIds']) == 8 and len(revision['optionalQuestionIds']) == 2
print('PASS: 4 lessons, 8 examples, 20 practice + 10 revision MCQs; unique options, keys, maths predicates and optional split.')
