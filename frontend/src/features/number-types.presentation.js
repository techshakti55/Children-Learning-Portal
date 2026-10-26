// Static presentation only. Canonical topic.json and the adapter stay unchanged.
// Keys are canonical lesson IDs, never lesson array positions or display titles.
export const lessonVisuals = {
  'nt-l1': [{
    id: 'counting-families', kind: 'families', title: 'One family inside another',
    wholeOnly: [0], natural: [1, 2, 3, 4, 5],
    alternative: 'Whole numbers include 0 and all natural numbers. Natural numbers start at 1 here. Both lists continue without end.',
    caption: 'The natural-number box sits inside the whole-number box. 0 is whole, but not natural. 5 belongs to both families.',
  }],
  'nt-l2': [{
    id: 'even-odd-pairs', kind: 'pairs', title: 'Pairs tell us even or odd',
    groups: [{ number: 8, pairs: 4, leftover: 0, label: '8 is even' }, { number: 7, pairs: 3, leftover: 1, label: '7 is odd' }, { number: 0, pairs: 0, leftover: 0, label: '0 is even' }],
    alternative: '8 makes 4 pairs with no leftovers. 7 makes 3 pairs with 1 counter left. 0 makes 0 pairs with no leftovers, so zero is even.',
    caption: 'Each outlined pair holds two counters. A single counter is labelled “1 left over”. No counters are needed to show zero.',
  }],
  'nt-l3': [{
    id: 'factor-rectangles', kind: 'rectangles', title: 'Equal rows reveal factors',
    groups: [
      { number: 6, factors: [1, 2, 3, 6], classification: 'composite', rectangles: [{ rows: 1, columns: 6 }, { rows: 2, columns: 3 }] },
      { number: 7, factors: [1, 7], classification: 'prime', rectangles: [{ rows: 1, columns: 7 }] },
    ],
    alternative: '6 makes rectangles of 1 row of 6 and 2 rows of 3. Its positive factors are 1, 2, 3, 6, so it is composite. 7 makes only 1 row of 7, or the same rectangle turned around. Its positive factors are 1 and 7, so it is prime.',
    caption: 'Rows × columns = number of counters. Turning a rectangle around gives the same factor pair. 0 and 1 are neither prime nor composite.',
  }],
  'nt-l4': [{
    id: 'integer-line', kind: 'number-line', title: 'Meet the integer neighbours',
    values: [-3, -2, -1, 0, 1, 2, 3],
    alternative: 'Part of the integer number line, from left to right: -3, -2, -1, 0, 1, 2, 3. Numbers farther right are greater. 1 is to the right of -2, so 1 is greater than -2. The line continues in both directions.',
    caption: 'This is only part of the number line. It continues left and right. 1 is greater than −2 because 1 is farther right.',
  }, {
    id: 'number-pairs', kind: 'factor-pairs', title: 'Two different clues about a pair',
    coprime: [{ number: 8, factors: [1, 2, 4, 8] }, { number: 9, factors: [1, 3, 9] }], common: [1], twins: [3, 5],
    alternative: '8 has positive factors 1, 2, 4, 8. 9 has positive factors 1, 3, 9. Only 1 is shared, so 8 and 9 are co-prime although both are composite. 3 and 5 are both prime and differ by 2, so they are twin primes.',
    caption: 'Co-prime means only 1 is a common positive factor. Twin primes means both numbers are prime and their difference is 2. These are clues about pairs, not the same definition.',
  }],
};
