// UI demonstration data, not the reviewed Task 02 content bank.
export const topic = {
  title: 'Number Detectives', label: 'Number Types',
  description: 'Every number has a story. Look for clues and discover the families it belongs to.',
};
export const lessons = [
  { id: 'counting-world', title: 'Counting World', subtitle: 'Meet natural and whole numbers', time: '4 min', symbol: '01',
    objective: 'Tell natural numbers and whole numbers apart.', prerequisite: 'You can count from 1 to 10.',
    explanation: 'Natural numbers are our counting numbers: 1, 2, 3, 4, … . Whole numbers include all natural numbers and zero: 0, 1, 2, 3, … . In this portal, natural numbers start at 1.',
    visual: ['0', '1', '2', '3', '4', '…'], caption: 'Whole numbers include zero. Natural numbers start at 1.',
    examples: [
      { question: 'There are no apples in the basket. Which number tells us how many?', answer: '0 apples. Zero is a whole number. It is not a natural number in this portal.' },
      { question: 'Is 5 natural or whole?', answer: 'Both! We count with 5, so it is natural. Every natural number is also whole.' },
    ], takeaway: 'Number families can overlap. A number can belong to more than one family.' },
  { id: 'pair-up', title: 'Pair Up', subtitle: 'Explore even and odd numbers', time: '4 min', symbol: '02',
    objective: 'Recognise even and odd whole numbers.', prerequisite: 'You can count objects and make pairs.',
    explanation: 'An even whole number can be split into two equal groups with none left over. An odd whole number leaves one object when we make pairs. Numbers ending in 0, 2, 4, 6 or 8 are even.',
    visual: ['●●', '●●', '●●'], caption: '6 dots make 3 pairs, with no dot left over. 6 is even.',
    examples: [
      { question: 'Can 7 socks all make pairs?', answer: 'No. We make 3 pairs and have 1 sock left. So 7 is odd.' },
      { question: 'Is zero even?', answer: 'Yes. Zero splits into two equal groups of 0, with none left over. So 0 is even.' },
    ], takeaway: 'Look at the last digit: 23 is odd because its last digit is 3.' },
  { id: 'prime-detectives', title: 'Prime Detectives', subtitle: 'Find factors and spot primes', time: '5 min', symbol: '03',
    objective: 'Use positive factors to recognise prime and composite numbers.', prerequisite: 'You know simple multiplication facts.',
    explanation: 'A factor divides a number exactly, with no remainder. A prime number has exactly two positive factors: 1 and itself. A composite number is a whole number greater than 1 with more than two positive factors. Both 0 and 1 are neither prime nor composite.',
    visual: ['1 × 6', '2 × 3'], caption: '6 has positive factors 1, 2, 3 and 6. So 6 is composite.',
    examples: [
      { question: 'Is 7 prime?', answer: 'Yes. Its only positive factors are 1 and 7. That is exactly two factors.' },
      { question: 'Is 2 prime, even though it is even?', answer: 'Yes. Its only positive factors are 1 and 2. It is the only even prime number.' },
    ], takeaway: '1 has only one positive factor. It is neither prime nor composite.' },
  { id: 'number-neighbours', title: 'Number Neighbours', subtitle: 'A little extra exploring', time: '6 min', symbol: '04', optional: true,
    objective: 'Meet integers, co-prime pairs and twin primes.', prerequisite: 'First learn factors and prime numbers in Lesson 3.',
    explanation: 'Integers include negative whole-number values, zero and positive whole numbers. Two positive integers are co-prime when their only common positive factor is 1. Twin primes are two prime numbers with a difference of 2.',
    visual: ['−2', '−1', '0', '1', '2'], caption: 'Part of an integer number line: numbers get larger as you move right.',
    examples: [
      { question: 'Are 8 and 9 co-prime, although neither is prime?', answer: 'Yes. The factors of 8 are 1, 2, 4, 8. The factors of 9 are 1, 3, 9. Their only common positive factor is 1.' },
      { question: 'Are 11 and 13 twin primes?', answer: 'Yes. Both are prime, and 13 − 11 = 2.' },
    ], takeaway: 'Co-prime describes a pair of numbers. Each number does not have to be prime.' },
];
export const upcomingTopics = [
  { title: 'Factors & Multiples', symbol: '×', description: 'Discover how numbers fit together.', tone: 'peach' },
  { title: 'HCF & LCM', symbol: '↔', description: 'Find what number families share.', tone: 'lavender' },
  { title: 'Fractions', symbol: '½', description: 'See the whole in a different way.', tone: 'yellow' },
  { title: 'Squares & Patterns', symbol: '▦', description: 'Spot the patterns hiding in numbers.', tone: 'blue' },
];
