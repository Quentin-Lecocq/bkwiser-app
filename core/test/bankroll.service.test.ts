import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Bankroll } from '../domain/bankroll';
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
  it('should create a bankroll an persist it', async () => {
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

    expect(bankrollRepository.create).toHaveBeenCalledWith(bankroll);
  });
  it('should reset a bankroll when it exists', async () => {
    const initial: Bankroll = {
      id: 'bk1',
      name: 'Resettable BK',
      initialAmount: 150,
      currentAmount: 50,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-05T00:00:00.000Z',
      status: 'private',
      currency: 'EUR',
      archivedAt: null,
    };

    mockedRepo.getById.mockResolvedValue(initial);

    const result = await bankrollService.reset('bk1');

    expect(result).not.toBeNull();
    expect(result?.currentAmount).toBe(150);
    expect(result?.updatedAt).not.toBe(initial.updatedAt);

    expect(mockedRepo.getById).toHaveBeenCalledWith('bk1');
    expect(mockedRepo.update).toHaveBeenCalledWith(result);
  });
  it('should return null if bankroll does not exist', async () => {
    mockedRepo.getById.mockResolvedValue(null);

    const result = await bankrollService.reset('does-not-exist');

    expect(result).toBeNull();
    expect(mockedRepo.update).not.toHaveBeenCalled();
  });
  it('should archive a bankroll if it exists', async () => {
    const now = new Date().toISOString();
    vi.setSystemTime(new Date(now));

    const initial: Bankroll = {
      id: 'bk2',
      name: 'Archivable BK',
      initialAmount: 500,
      currentAmount: 300,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-03-01T00:00:00.000Z',
      status: 'public',
      currency: 'EUR',
      archivedAt: null,
    };

    mockedRepo.getById.mockResolvedValue(initial);

    const result = await bankrollService.archive('bk2');

    expect(result).not.toBeNull();
    expect(result?.archivedAt).toBe(now);
    expect(result?.updatedAt).toBe(now);
    expect(mockedRepo.update).toHaveBeenCalledWith(result);
  });
  it('should return a list of bankrolls from the repository', async () => {
    const mockList: Bankroll[] = [
      {
        id: 'bk1',
        name: 'Bankroll 1',
        initialAmount: 100,
        currentAmount: 100,
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        archivedAt: null,
        status: 'private',
        currency: 'EUR',
      },
      {
        id: 'bk2',
        name: 'Bankroll 2',
        initialAmount: 200,
        currentAmount: 150,
        createdAt: '2025-02-01T00:00:00Z',
        updatedAt: '2025-02-01T00:00:00Z',
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
    const mockBankroll: Bankroll = {
      id: 'bk-id',
      name: 'My BK',
      initialAmount: 100,
      currentAmount: 100,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
      status: 'private',
      archivedAt: null,
      currency: 'EUR',
    };

    mockedRepo.getById.mockResolvedValue(mockBankroll);

    const result = await bankrollService.getById('bk-id');

    expect(result).toEqual(mockBankroll);
    expect(mockedRepo.getById).toHaveBeenCalledWith('bk-id');
  });
});
