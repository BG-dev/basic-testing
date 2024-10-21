import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const endPoint = '/users/1';

  beforeAll(() => jest.useFakeTimers());
  beforeEach(() => jest.runOnlyPendingTimers());
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.useRealTimers());

  test('should create instance with provided base url', async () => {
    const spyMockCreate: jest.SpyInstance<AxiosInstance> = jest.spyOn(
      axios,
      'create',
    );
    await throttledGetDataFromApi(endPoint);
    expect(spyMockCreate).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const spyMockGet: jest.SpyInstance = jest.spyOn(
      axios.Axios.prototype,
      'get',
    );
    await throttledGetDataFromApi(endPoint);
    expect(spyMockGet).toHaveBeenCalledWith(endPoint);
  });

  test('should return response data', async () => {
    const response = {
      data: {
        id: 2313,
        username: 'test_username',
      },
    };
    const spyMockGet: jest.SpyInstance = jest.spyOn(
      axios.Axios.prototype,
      'get',
    );
    spyMockGet.mockResolvedValueOnce(response);
    const result = await throttledGetDataFromApi(endPoint);
    expect(result).toEqual(response.data);
  });
});
