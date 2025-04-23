import type { Bankroll as PrismaBankroll } from '@prisma/client';
import { BankrollCurrencies, BankrollStatus } from '../constants/bankroll';
import { Bankroll } from '../schemas/bankroll.schema';

export function toDomain(prisma: PrismaBankroll): Bankroll {
  return {
    ...prisma,
    status: prisma.status as BankrollStatus,
    currency: prisma.currency as BankrollCurrencies,
    createdAt: prisma.createdAt.toISOString(),
    updatedAt: prisma.updatedAt.toISOString(),
    archivedAt: prisma.archivedAt ? prisma.archivedAt.toISOString() : null,
  };
}

export function toPersistence(bk: Bankroll): PrismaBankroll {
  return {
    ...bk,
    status: bk.status,
    currency: bk.currency,
    createdAt: new Date(bk.createdAt),
    updatedAt: new Date(bk.updatedAt),
    archivedAt: bk.archivedAt ? new Date(bk.archivedAt) : null,
  };
}
