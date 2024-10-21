import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import * as lodash from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  const balance = 10;
  const account = getBankAccount(balance);
  const toAccount = getBankAccount(balance);

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(balance + 20)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(balance * 2, toAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(balance / 2, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const currentBalance = account.getBalance();
    account.deposit(currentBalance + 10);
    expect(account.getBalance()).toBe(currentBalance * 2 + 10);
  });

  test('should withdraw money', () => {
    const currentBalance = account.getBalance();
    account.withdraw(currentBalance - 10);
    expect(account.getBalance()).toBe(currentBalance - currentBalance + 10);
  });

  test('should transfer money', () => {
    account.transfer(balance / 2, toAccount);
    expect(account.getBalance()).toBe(balance / 2);
    expect(toAccount.getBalance()).toBe(balance + balance / 2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockValue = 20;
    (lodash.random as jest.Mock).mockReturnValueOnce(mockValue);
    (lodash.random as jest.Mock).mockReturnValueOnce(50);
    const fetchedBalance = await account.fetchBalance();

    expect(fetchedBalance).not.toBeNull();
    expect(fetchedBalance).toBe(mockValue);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockValue = 30;
    (lodash.random as jest.Mock).mockReturnValueOnce(mockValue);
    (lodash.random as jest.Mock).mockReturnValueOnce(50);
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(mockValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockValue = 0;
    (lodash.random as jest.Mock).mockReturnValueOnce(50);
    (lodash.random as jest.Mock).mockReturnValueOnce(mockValue);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
