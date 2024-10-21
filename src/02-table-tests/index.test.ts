import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 3, action: Action.Subtract, expected: 7 },
  { a: 5, b: -2, action: Action.Multiply, expected: -10 },
  { a: 666, b: 0, action: Action.Multiply, expected: 0 },
  { a: 3, b: 0, action: Action.Divide, expected: Infinity },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: 'eat', expected: null },
  { a: false, b: 'mem', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
