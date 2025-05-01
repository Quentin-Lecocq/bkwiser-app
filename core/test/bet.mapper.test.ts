import { describe, expect, it } from 'vitest';
import { toDomain, toPersistence } from '../mappers/bet.mapper';
import { Bet } from '../schemas/bet.schema';

describe('bet.mapper', () => {
  it('should convert PrismaBet to domain Bet', () => {
    const prismaBet = {
      id: 'bet-id',
      type: 'single',
      stake: 100,
      potentialWin: 250,
      bankrollId: 'bankroll-id',
      date: new Date('2025-05-01T10:00:00Z'),
      createdAt: new Date('2025-05-01T09:00:00Z'),
      updatedAt: new Date('2025-05-01T09:30:00Z'),
      legs: [
        {
          id: 'leg-id',
          odds: 2.5,
          status: 'pending',
        },
      ],
    };

    const result = toDomain(prismaBet);

    expect(result).toEqual({
      id: 'bet-id',
      type: 'single',
      stake: 100,
      potentialWin: 250,
      bankrollId: 'bankroll-id',
      date: '2025-05-01T10:00:00.000Z',
      createdAt: '2025-05-01T09:00:00.000Z',
      updatedAt: '2025-05-01T09:30:00.000Z',
      legs: [
        {
          id: 'leg-id',
          odds: 2.5,
          status: 'pending',
        },
      ],
    });
  });

  it('should convert domain Bet to Prisma.BetCreateInput', () => {
    const domainBet: Bet = {
      id: 'bet-id',
      type: 'single',
      stake: 100,
      potentialWin: 250,
      bankrollId: 'bankroll-id',
      date: '2025-05-01T10:00:00.000Z',
      createdAt: '2025-05-01T09:00:00.000Z',
      updatedAt: '2025-05-01T09:30:00.000Z',
      legs: [
        {
          id: 'leg-id',
          odds: 2.5,
          status: 'pending',
        },
      ],
    };

    const result = toPersistence(domainBet);

    expect(result).toEqual({
      id: 'bet-id',
      type: 'single',
      stake: 100,
      potentialWin: 250,
      date: new Date('2025-05-01T10:00:00.000Z'),
      createdAt: new Date('2025-05-01T09:00:00.000Z'),
      updatedAt: new Date('2025-05-01T09:30:00.000Z'),
      bankroll: {
        connect: { id: 'bankroll-id' },
      },
      legs: [
        {
          id: 'leg-id',
          odds: 2.5,
          status: 'pending',
        },
      ],
    });
  });
});
