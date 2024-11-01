import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  let spyMock: jest.SpyInstance;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    spyMock = jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = 100;
    const callback = jest.fn();
    doStuffByTimeout(callback, timeout);
    expect(spyMock).toBeCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const timeout = 100;
    const callback = jest.fn();
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  let spyMock: jest.SpyInstance;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    spyMock = jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const timeout = 100;
    const callback = jest.fn();

    doStuffByInterval(callback, timeout);
    expect(spyMock).toBeCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const timeout = 100;
    const callback = jest.fn();
    doStuffByInterval(callback, timeout);
    [1, 2, 3].forEach((el) => {
      jest.advanceTimersByTime(timeout);
      expect(callback).toHaveBeenCalledTimes(el);
    });
  });
});

describe('readFileAsynchronously', () => {
  let spyMockJoin: jest.SpyInstance;
  let spyMockExist: jest.SpyInstance;
  let spyMockRead: jest.SpyInstance;
  const pathToFile = '/file.test.ts';
  beforeEach(() => {
    spyMockJoin = jest.spyOn(path, 'join');
    spyMockExist = jest.spyOn(fs, 'existsSync');
    spyMockRead = jest.spyOn(fs.promises, 'readFile');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(pathToFile);
    expect(spyMockJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    spyMockExist.mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'Content from test file';
    spyMockExist.mockReturnValue(true);
    spyMockRead.mockResolvedValue(content);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(content);
  });
});
