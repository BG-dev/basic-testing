import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'Hello test';
    const data = await resolveValue(value);
    expect(data).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'Wow, we have problems!';
    expect(() => throwError(msg)).toThrowError(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
