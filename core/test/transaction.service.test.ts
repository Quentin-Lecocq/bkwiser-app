import { describe, expect, it, vi } from 'vitest';
import { transactionRepository } from '../repositories/transaction.repository';
import { CreateTransactionInput } from '../schemas/transaction.schema';
import { transactionService } from '../services/transaction.service';

// 👇 Mock du repository
vi.mock('../repositories/transaction.repository');

describe('transactionService', () => {
  it('should create a transaction and persist it', async () => {
    const input: CreateTransactionInput = {
      type: 'deposit',
      date: new Date().toISOString(),
      amount: 250,
      bankrollId: 'bk-123',
    };

    const transaction = await transactionService.create(input);

    expect(transaction.type).toBe('deposit');
    expect(transaction.amount).toBe(250);
    expect(transaction.bankrollId).toBe('bk-123');
    expect(typeof transaction.id).toBe('string');
    expect(typeof transaction.createdAt).toBe('string');
    expect(typeof transaction.updatedAt).toBe('string');

    expect(transactionRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: transaction.id,
        amount: 250,
        bankrollId: 'bk-123',
        type: 'deposit',
        createdAt: new Date(transaction.createdAt),
        updatedAt: new Date(transaction.updatedAt),
      }),
    );
  });
});
