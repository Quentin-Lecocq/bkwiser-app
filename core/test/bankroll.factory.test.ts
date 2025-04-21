import { describe, expect, it } from 'vitest';
import { bankrollFactory } from '../factories/bankroll.factory';
import { sleep } from './helpers/sleep';
import { today } from './helpers/today';

describe('bankrollFactory', () => {
  it('should create a valid bankroll object', () => {
    const bk = bankrollFactory.create({
      name: 'main',
      initialAmount: 100,
      status: 'private',
      currency: 'EUR',
    });
    expect(bk.currentAmount).toBe(100);
    expect(bk.archivedAt).toBe(null);
  });
  it('should reset currentAmount to initialAmout and update updatedAt', async () => {
    const bk = bankrollFactory.create({
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

    const reset = bankrollFactory.reset(updated);

    expect(reset.currentAmount).toBe(200);
    expect(reset.updatedAt).not.toBe(updated.updatedAt);
  });
  it('should validate a correct bankroll', () => {
    const bk = bankrollFactory.create({
      name: 'valid',
      initialAmount: 100,
      status: 'public',
      currency: 'EUR',
    });

    expect(bankrollFactory.isValid(bk)).toBe(true);
  });
  it('should invalidate bankroll with empty name', () => {
    const invalid = {
      ...bankrollFactory.create({
        name: 'X',
        initialAmount: 100,
        status: 'private',
        currency: 'EUR',
      }),
      name: '',
    };

    expect(bankrollFactory.isValid(invalid)).toBe(false);
  });
  it('should return null for invalid raw input', () => {
    const result = bankrollFactory.fromRaw({
      name: '',
      initialAmount: -100,
      status: 'troll',
      currency: 'YEN',
    });

    expect(result).toBeNull();
  });
  it('should create bankroll from valid raw input', () => {
    const result = bankrollFactory.fromRaw({
      name: 'Raw',
      initialAmount: 100,
      status: 'private',
      currency: 'EUR',
    });
    expect(result).not.toBeNull();
    expect(result?.name).toBe('Raw');
  });
  it('should detect when a bankroll is archived', () => {
    const bk = bankrollFactory.create({
      name: 'archived',
      initialAmount: 100,
      status: 'private',
      currency: 'EUR',
    });

    const archived = {
      ...bk,
      archivedAt: today(),
    };

    expect(bankrollFactory.isArchived(archived)).toBe(true);
  });
});
