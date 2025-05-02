import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BetFactory } from '../factories/bet.factory';
import { toPersistence } from '../mappers/bet.mapper';
import { betRepository } from '../repositories/bet.repository';
import { CreateBetInput } from '../schemas/bet.schema';
import { betService } from '../services/bet.service';

vi.mock('../repositories/bet.repository', () => ({
  betRepository: {
    create: vi.fn(),
  },
}));

vi.mock('../factories/bet.factory', () => ({
  BetFactory: {
    create: vi.fn(),
  },
}));

vi.mock('../mappers/bet.mapper', () => ({
  toPersistence: vi.fn(),
}));

describe('betService', () => {
  const mockedRepo = vi.mocked(betRepository);
  const mockedFactory = vi.mocked(BetFactory);
  const mockedMapper = vi.mocked(toPersistence);

  const input: CreateBetInput = {
    type: 'single',
    stake: 100,
    date: '2025-05-01T10:00:00.000Z',
    bankrollId: 'bankroll-id',
    legs: [
      {
        odds: 2.5,
        status: 'pending',
      },
    ],
  };

  const fakeBet = {
    id: 'bet-id',
    potentialWin: 250,
    createdAt: 'now',
    updatedAt: 'now',
    ...input,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const persistentBet: any = {
    ...fakeBet,
    bankroll: { connect: { id: input.bankrollId } },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a bet and persist it', async () => {
    mockedFactory.create.mockReturnValue(fakeBet);
    mockedMapper.mockReturnValue(persistentBet);

    const result = await betService.create(input);

    expect(mockedFactory.create).toHaveBeenCalledWith(input);
    expect(mockedMapper).toHaveBeenCalledWith(fakeBet);
    expect(mockedRepo.create).toHaveBeenCalledWith(persistentBet);
    expect(result).toEqual(fakeBet);
  });

  it('should throw an error if creation fails', async () => {
    mockedFactory.create.mockImplementation(() => {
      throw new Error('Factory fail');
    });

    await expect(betService.create(input)).rejects.toThrow(
      'Bet creation failed',
    );
    expect(mockedRepo.create).not.toHaveBeenCalled();
  });
});
