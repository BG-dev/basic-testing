import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 10, b: 13, action: Action.Add };
    const expected = 23;
    expect(simpleCalculator(input)).toBe(expected);
  });

  test('should subtract two numbers', () => {
    const input = { a: 27, b: 13, action: Action.Subtract };
    const expected = 14;
    expect(simpleCalculator(input)).toBe(expected);
  });

  test('should multiply two numbers', () => {
    const input = { a: 100, b: 13, action: Action.Multiply };
    const expected = 1300;
    expect(simpleCalculator(input)).toBe(expected);
  });

  test('should divide two numbers', () => {
    const input = { a: 130, b: 13, action: Action.Divide };
    const expected = 10;
    expect(simpleCalculator(input)).toBe(expected);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 2, b: 8, action: Action.Exponentiate };
    const expected = 256;
    expect(simpleCalculator(input)).toBe(expected);
  });

  test('should return null for invalid action', () => {
    const input = { a: 2, b: 8, action: '()' };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = { a: 'b', b: 'z', action: Action.Add };
    expect(simpleCalculator(input)).toBeNull();
  });
});
