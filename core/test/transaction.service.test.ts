import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TRANSACTION_TYPES } from '../constants/transaction';
import { toDomain } from '../mappers/transaction.mapper';
import { bankrollRepository } from '../repositories/bankroll.repository';
import { transactionRepository } from '../repositories/transaction.repository';
import { transactionService } from '../services/transaction.service';

vi.mock('../repositories/bankroll.repository', () => ({
  bankrollRepository: {
    getById: vi.fn(),
    update: vi.fn(),
  },
}));

vi.mock('../repositories/transaction.repository', () => ({
  transactionRepository: {
    create: vi.fn(),
    getAllByBankrollId: vi.fn(),
  },
}));

describe('transactionService', () => {
  const mockedBankrollRepo = vi.mocked(bankrollRepository);
  const mockedRepo = vi.mocked(transactionRepository);

  beforeEach(() => {
    mockedRepo.getAllByBankrollId.mockReset();
    mockedBankrollRepo.getById.mockReset();
    mockedBankrollRepo.update.mockReset();
  });

  it('should create a transaction and persist it', async () => {
    mockedBankrollRepo.getById.mockResolvedValue({
      id: 'bk-123',
      name: 'Main Bankroll',
      initialAmount: 500,
      currentAmount: 1000,
      status: 'active',
      currency: 'EUR',
      createdAt: new Date(),
      updatedAt: new Date(),
      archivedAt: null,
    });

    const input = {
      type: TRANSACTION_TYPES[0],
      transactionDate: new Date().toISOString(),
      amount: 250,
      bankrollId: 'bk-123',
    };

    const transaction = await transactionService.create(input);

    expect(transaction.type).toBe(TRANSACTION_TYPES[0]);
    expect(transaction.amount).toBe(250);
    expect(transaction.bankrollId).toBe('bk-123');
    expect(typeof transaction.id).toBe('string');
    expect(typeof transaction.createdAt).toBe('string');
    expect(typeof transaction.updatedAt).toBe('string');

    expect(transactionRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: transaction.id,
        amount: 250,
        bankroll: {
          connect: { id: 'bk-123' }, // ✅ nouvelle forme correcte
        },
        type: TRANSACTION_TYPES[0],
        createdAt: new Date(transaction.createdAt),
        updatedAt: new Date(transaction.updatedAt),
      }),
    );
  });

  it('should return a list of transactions for a specific bankroll', async () => {
    const mockTransactions = [
      {
        id: 'tx1',
        type: TRANSACTION_TYPES[0],
        amount: 100,
        transactionDate: new Date('2025-01-01T00:00:00Z'),
        createdAt: new Date('2025-01-01T00:00:00Z'),
        updatedAt: new Date('2025-01-01T00:00:00Z'),
        bankrollId: 'bk1',
      },
      {
        id: 'tx2',
        type: TRANSACTION_TYPES[1],
        amount: 50,
        transactionDate: new Date('2025-02-01T00:00:00Z'),
        createdAt: new Date('2025-02-01T00:00:00Z'),
        updatedAt: new Date('2025-02-01T00:00:00Z'),
        bankrollId: 'bk1',
      },
    ];

    mockedRepo.getAllByBankrollId.mockResolvedValue(mockTransactions);

    const result = await transactionService.getAllByBankrollId('bk1');

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('tx1');
    expect(result[1].type).toBe('withdraw');
    expect(mockedRepo.getAllByBankrollId).toHaveBeenCalledWith('bk1');
    expect(result).toEqual(mockTransactions.map(toDomain));
  });
});
