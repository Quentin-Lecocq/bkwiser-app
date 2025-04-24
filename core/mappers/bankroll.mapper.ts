import { BankrollCurrencies, BankrollStatus } from '../constants/bankroll';
import { Bankroll } from '../schemas/bankroll.schema';

export function toDomain(prisma: {
  id: string;
  name: string;
  initialAmount: number;
  currentAmount: number;
  status: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
}): Bankroll {
  return {
    id: prisma.id,
    name: prisma.name,
    initialAmount: prisma.initialAmount,
    currentAmount: prisma.currentAmount,
    status: prisma.status as BankrollStatus,
    currency: prisma.currency as BankrollCurrencies,
    createdAt: prisma.createdAt.toISOString(),
    updatedAt: prisma.updatedAt.toISOString(),
    archivedAt: prisma.archivedAt ? prisma.archivedAt.toISOString() : null,
  };
}

export function toPersistence(bk: Bankroll): {
  id: string;
  name: string;
  initialAmount: number;
  currentAmount: number;
  status: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
} {
  return {
    id: bk.id,
    name: bk.name,
    initialAmount: bk.initialAmount,
    currentAmount: bk.currentAmount,
    status: bk.status,
    currency: bk.currency,
    createdAt: new Date(bk.createdAt),
    updatedAt: new Date(bk.updatedAt),
    archivedAt: bk.archivedAt ? new Date(bk.archivedAt) : null,
  };
}
