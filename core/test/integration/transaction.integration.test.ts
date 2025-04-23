import { Transaction } from '@/core/schemas/transaction.schema';
import { transactionService } from '../../services/transaction.service';

import { db } from '../../../lib/db';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { today } from '../helpers/today';

const testBankrollId = 'bk-test';

describe('TransactionService Integration', () => {
  beforeEach(async () => {
    await db.bankroll.create({
      data: {
        id: testBankrollId,
        name: 'Test Bankroll',
        initialAmount: 1000,
        currentAmount: 1000,
        status: 'active',
        currency: 'EUR',
      },
    });
  });

  afterEach(async () => {
    await db.transaction.deleteMany({ where: { bankrollId: testBankrollId } });
    await db.bankroll.delete({ where: { id: testBankrollId } });
  });

  it('should create a transaction in the database', async () => {
    const created: Transaction = await transactionService.create({
      type: 'deposit',
      date: today(),
      amount: 150,
      bankrollId: testBankrollId,
    });

    const persisted = await db.transaction.findUnique({
      where: { id: created.id },
    });

    expect(persisted).not.toBeNull();
    expect(persisted?.amount).toBe(150);
    expect(persisted?.type).toBe('deposit');
    expect(persisted?.bankrollId).toBe(testBankrollId);
  });
});
