import { Prisma, Bet as PrismaBet } from '../../prisma/generated/client';
import { BetStatus, BetTypes } from '../constants/bet';
import { Bet } from '../schemas/bet.schema';

export function toDomain(prismaBet: PrismaBet): Bet {
  return {
    id: prismaBet.id,
    type: prismaBet.type as BetTypes,
    stake: prismaBet.stake,
    potentialWin: prismaBet.potentialWin,
    bankrollId: prismaBet.bankrollId,
    date: prismaBet.date.toISOString(),
    createdAt: prismaBet.createdAt.toISOString(),
    updatedAt: prismaBet.updatedAt.toISOString(),
    legs: prismaBet.legs as {
      status: BetStatus;
      id: string;
      odds: number;
    }[],
  };
}

export function toPersistence(bet: Bet): Prisma.BetCreateInput {
  return {
    id: bet.id,
    type: bet.type,
    stake: bet.stake,
    date: bet.date ? new Date(bet.date) : new Date(),
    createdAt: new Date(bet.createdAt),
    updatedAt: new Date(bet.updatedAt),
    bankroll: {
      connect: { id: bet.bankrollId },
    },
    legs: bet.legs as Prisma.JsonValue[],
    potentialWin: bet.potentialWin,
  };
}
