import type { Bankroll as PrismaBankroll } from '@prisma/client';
import { BankrollCurrencies, BankrollStatus } from '../constants/bankroll';
import { Bankroll } from '../domain/bankroll';

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
