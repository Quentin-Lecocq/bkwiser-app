import type { Bankroll as PrismaBankroll } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TRANSACTION_TYPES } from '../constants/transaction';
import { toPersistence } from '../mappers/bankroll.mapper';
import { bankrollRepository } from '../repositories/bankroll.repository';
import { CreateBankrollInput } from '../schemas/bankroll.schema';
import { bankrollService } from '../services/bankroll.service';

vi.mock('../repositories/bankroll.repository', () => ({
  bankrollRepository: {
    create: vi.fn(),
    getById: vi.fn(),
    update: vi.fn(),
    getAll: vi.fn(),
  },
}));

describe('bankrollService', () => {
  const mockedRepo = vi.mocked(bankrollRepository);
  beforeEach(() => {
    mockedRepo.getById.mockReset();
    mockedRepo.update.mockReset();
    mockedRepo.create.mockReset();
    mockedRepo.getAll.mockReset();
  });
  it('should create a bankroll and persist it', async () => {
    const input: CreateBankrollInput = {
      name: 'Test BK',
      initialAmount: 100,
      status: 'private',
      currency: 'EUR',
    };

    const bankroll = await bankrollService.create(input);

    expect(bankroll.name).toBe('Test BK');
    expect(bankroll.initialAmount).toBe(100);
    expect(bankroll.currentAmount).toBe(100);
    expect(bankroll.status).toBe('private');
    expect(bankroll.currency).toBe('EUR');
    expect(bankroll.archivedAt).toBeNull();
    expect(typeof bankroll.id).toBe('string');

    expect(bankrollRepository.create).toHaveBeenCalledWith(
      toPersistence(bankroll),
    );
  });
  it('should reset a bankroll when it exists', async () => {
    const now = new Date('2025-04-23T10:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    const initial: PrismaBankroll = {
      id: 'bk1',
      name: 'Resettable BK',
      initialAmount: 150,
      currentAmount: 50,
      createdAt: new Date('2024-01-01T00:00:00Z'),
      updatedAt: new Date('2024-01-01T00:00:00Z'),
      status: 'private',
      currency: 'EUR',
      archivedAt: null,
    };

    mockedRepo.getById.mockResolvedValue(initial);

    const result = await bankrollService.reset('bk1');

    expect(result).not.toBeNull();
    expect(result?.currentAmount).toBe(150);
    expect(result?.updatedAt).toBe(now.toISOString());

    expect(mockedRepo.getById).toHaveBeenCalledWith('bk1');
    expect(mockedRepo.update).toHaveBeenCalledWith(toPersistence(result!));

    vi.useRealTimers();
  });
  it('should return null if bankroll does not exist', async () => {
    mockedRepo.getById.mockResolvedValue(null);

    const result = await bankrollService.reset('does-not-exist');

    expect(result).toBeNull();
    expect(mockedRepo.update).not.toHaveBeenCalled();
  });
  it('should archive a bankroll if it exists', async () => {
    const now = new Date('2025-04-23T09:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    const initial: PrismaBankroll = {
      id: 'bk2',
      name: 'Archivable BK',
      initialAmount: 500,
      currentAmount: 300,
      createdAt: new Date('2024-01-01T00:00:00Z'),
      updatedAt: new Date('2024-03-01T00:00:00Z'),
      status: 'public',
      currency: 'EUR',
      archivedAt: null,
    };

    mockedRepo.getById.mockResolvedValue(initial);

    const result = await bankrollService.archive('bk2');

    expect(result).not.toBeNull();
    expect(result?.archivedAt).toBe(now.toISOString());
    expect(result?.updatedAt).toBe(now.toISOString());
    expect(mockedRepo.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'bk2',
        archivedAt: now,
        updatedAt: now,
      }),
    );

    vi.useRealTimers();
  });
  it('should return a list of bankrolls from the repository', async () => {
    const mockList: PrismaBankroll[] = [
      {
        id: 'bk1',
        name: 'Bankroll 1',
        initialAmount: 100,
        currentAmount: 100,
        createdAt: new Date('2025-01-01T00:00:00Z'),
        updatedAt: new Date('2025-01-01T00:00:00Z'),
        archivedAt: null,
        status: 'private',
        currency: 'EUR',
      },
      {
        id: 'bk2',
        name: 'Bankroll 2',
        initialAmount: 200,
        currentAmount: 150,
        createdAt: new Date('2025-02-01T00:00:00Z'),
        updatedAt: new Date('2025-02-01T00:00:00Z'),
        archivedAt: null,
        status: 'public',
        currency: 'USD',
      },
    ];

    mockedRepo.getAll.mockResolvedValue(mockList);

    const result = await bankrollService.getAll();

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Bankroll 1');
    expect(result[1].currency).toBe('USD');
    expect(mockedRepo.getAll).toHaveBeenCalled();
  });
  it('should return a bankroll from getById', async () => {
    const mockBankroll = {
      id: 'bk-id',
      name: 'My BK',
      initialAmount: 100,
      currentAmount: 100,
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
      status: 'private',
      archivedAt: null,
      currency: 'EUR',
    };

    mockedRepo.getById.mockResolvedValue({
      ...mockBankroll,
      createdAt: new Date(mockBankroll.createdAt),
      updatedAt: new Date(mockBankroll.updatedAt),
    });

    const result = await bankrollService.getById('bk-id');

    expect(result).toEqual(mockBankroll);
    expect(mockedRepo.getById).toHaveBeenCalledWith('bk-id');
  });
  it('should process a transaction and update the bankroll', async () => {
    const bankrollId = 'bk1';
    const transaction = {
      id: 'txn1',
      type: TRANSACTION_TYPES[0],
      amount: 50,
      createdAt: new Date('2025-04-23T10:00:00Z').toISOString(),
      updatedAt: new Date('2025-04-23T10:00:00Z').toISOString(),
      bankrollId: bankrollId,
    };

    const initial: PrismaBankroll = {
      id: bankrollId,
      name: 'Test BK',
      initialAmount: 100,
      currentAmount: 100,
      createdAt: new Date('2025-01-01T00:00:00Z'),
      updatedAt: new Date('2025-01-01T00:00:00Z'),
      status: 'private',
      currency: 'EUR',
      archivedAt: null,
    };

    mockedRepo.getById.mockResolvedValue(initial);
    mockedRepo.update.mockResolvedValue({
      ...initial,
      currentAmount: 150,
      updatedAt: new Date('2025-04-23T10:00:00Z'),
    });

    const result = await bankrollService.processTransaction(
      transaction,
      bankrollId,
    );

    expect(result).not.toBeNull();
    expect(result?.currentAmount).toBe(150);
    expect(mockedRepo.getById).toHaveBeenCalledWith(bankrollId);
    expect(mockedRepo.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: bankrollId,
        currentAmount: 150,
      }),
    );
  });
  it('should throw an error if the bankroll does not exist', async () => {
    const bankrollId = 'nonexistent-bk';
    const transaction = {
      id: 'txn2',
      type: TRANSACTION_TYPES[1],
      amount: 50,
      createdAt: new Date('2025-04-24T10:00:00Z').toISOString(),
      updatedAt: new Date('2025-04-24T10:00:00Z').toISOString(),
      bankrollId,
    };

    mockedRepo.getById.mockResolvedValue(null);

    await expect(
      bankrollService.processTransaction(transaction, bankrollId),
    ).rejects.toThrow('Bankroll with ID nonexistent-bk not found');

    expect(mockedRepo.getById).toHaveBeenCalledWith(bankrollId);
    expect(mockedRepo.update).not.toHaveBeenCalled();
  });

  it('should throw an error if there are insufficient funds for withdrawal', async () => {
    const bankrollId = 'bk1';
    const transaction = {
      id: 'txn3',
      type: TRANSACTION_TYPES[1],
      amount: 200,
      createdAt: new Date('2025-04-24T10:00:00Z').toISOString(),
      updatedAt: new Date('2025-04-24T10:00:00Z').toISOString(),
      bankrollId,
    };

    const initial: PrismaBankroll = {
      id: bankrollId,
      name: 'Test BK',
      initialAmount: 100,
      currentAmount: 100,
      createdAt: new Date('2025-01-01T00:00:00Z'),
      updatedAt: new Date('2025-01-01T00:00:00Z'),
      status: 'private',
      currency: 'EUR',
      archivedAt: null,
    };

    mockedRepo.getById.mockResolvedValue(initial);

    await expect(
      bankrollService.processTransaction(transaction, bankrollId),
    ).rejects.toThrow('Insufficient funds for withdrawal');

    expect(mockedRepo.getById).toHaveBeenCalledWith(bankrollId);
    expect(mockedRepo.update).not.toHaveBeenCalled();
  });
});
