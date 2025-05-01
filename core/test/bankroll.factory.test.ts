import { describe, expect, it } from 'vitest';
import { BANKROLL_CURRENCIES, BANKROLL_STATUS } from '../constants/bankroll';
import { BankrollFactory } from '../factories/bankroll.factory';
import { sleep } from './helpers/sleep';
import { today } from './helpers/today';

describe('BankrollFactory', () => {
  it('should create a valid bankroll object', () => {
    const bk = BankrollFactory.create({
      name: 'main',
      initialAmount: 100,
      status: 'private',
      currency: 'EUR',
    });
    expect(bk.currentAmount).toBe(100);
    expect(bk.archivedAt).toBe(null);
  });
  it('should reset currentAmount to initialAmout and update updatedAt', async () => {
    const bk = BankrollFactory.create({
      name: 'reset me',
      initialAmount: 200,
      status: 'private',
      currency: 'EUR',
    });

    const updated = {
      ...bk,
      currentAmount: 50,
    };

    // pause 1ms to avoid same timestamp
    await sleep(2);

    const reset = BankrollFactory.reset(updated);

    expect(reset.currentAmount).toBe(200);
    expect(reset.updatedAt).not.toBe(updated.updatedAt);
  });
  it('should validate a correct bankroll', () => {
    const bk = BankrollFactory.create({
      name: 'valid',
      initialAmount: 100,
      status: 'public',
      currency: 'EUR',
    });

    expect(BankrollFactory.isValid(bk)).toBe(true);
  });
  it('should invalidate bankroll with empty name', () => {
    const invalid = {
      ...BankrollFactory.create({
        name: 'X',
        initialAmount: 100,
        status: 'private',
        currency: 'EUR',
      }),
      name: '',
    };

    expect(BankrollFactory.isValid(invalid)).toBe(false);
  });
  it('should return null for invalid raw input', () => {
    const result = BankrollFactory.fromRaw({
      name: '',
      initialAmount: -100,
      status: 'troll',
      currency: 'YEN',
    });

    expect(result).toBeNull();
  });
  it('should create bankroll from valid raw input', () => {
    const rawData = {
      id: crypto.randomUUID(),
      name: 'Raw Bankroll',
      initialAmount: 100,
      currentAmount: 100,
      status: BANKROLL_STATUS[0],
      currency: BANKROLL_CURRENCIES[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archivedAt: null,
    };

    const result = BankrollFactory.fromRaw(rawData);

    expect(result).not.toBeNull();
    expect(result?.name).toBe('Raw Bankroll');
    expect(result?.initialAmount).toBe(100);
  });
  it('should detect when a bankroll is archived', () => {
    const bk = BankrollFactory.create({
      name: 'archived',
      initialAmount: 100,
      status: 'private',
      currency: 'EUR',
    });

    const archived = {
      ...bk,
      archivedAt: today(),
    };

    expect(BankrollFactory.isArchived(archived)).toBe(true);
  });
});
