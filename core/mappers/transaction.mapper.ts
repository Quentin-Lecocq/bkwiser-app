import {
  Prisma,
  Transaction as PrismaTransaction,
} from '../../prisma/generated/client';
import { TransactionTypes } from '../constants/transaction';

import { Transaction } from '../schemas/transaction.schema';

export function toDomain(prisma: PrismaTransaction): Transaction {
  return {
    id: prisma.id,
    type: prisma.type as TransactionTypes,
    amount: prisma.amount,
    transactionDate: prisma.transactionDate.toISOString(),
    createdAt: prisma.createdAt.toISOString(),
    updatedAt: prisma.updatedAt.toISOString(),
    bankrollId: prisma.bankrollId,
  };
}

export function toPersistence(tx: Transaction): Prisma.TransactionCreateInput {
  return {
    id: tx.id,
    type: tx.type,
    amount: tx.amount,
    transactionDate: tx.transactionDate
      ? new Date(tx.transactionDate)
      : new Date(),
    createdAt: new Date(tx.createdAt),
    updatedAt: new Date(tx.updatedAt),
    bankroll: {
      connect: { id: tx.bankrollId },
    },
  };
}
