import type { Transaction as PrismaTransaction } from '@/prisma/generated/client';
import { Transaction } from '../schemas/transaction.schema';

export function toDomain(prisma: PrismaTransaction): Transaction {
  return {
    id: prisma.id,
    type: prisma.type,
    amount: prisma.amount,
    bankrollId: prisma.bankrollId,
    // date: prisma.date.toISOString(),
    createdAt: prisma.createdAt.toISOString(),
    updatedAt: prisma.updatedAt.toISOString(),
  };
}

export function toPersistence(transaction: Transaction): PrismaTransaction {
  return {
    id: transaction.id,
    type: transaction.type,
    amount: transaction.amount,
    bankrollId: transaction.bankrollId,
    // date: new Date(transaction.date),
    createdAt: new Date(transaction.createdAt),
    updatedAt: new Date(transaction.updatedAt),
  };
}
