import { TransactionTypes } from '../constants/transaction';
import { Transaction } from '../schemas/transaction.schema';

export function toDomain(prisma: {
  id: string;
  type: string;
  amount: number;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  bankrollId: string;
}): Transaction {
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

export function toPersistence(tx: Transaction): {
  id: string;
  type: TransactionTypes;
  amount: number;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  bankrollId: string;
} {
  return {
    id: tx.id,
    type: tx.type,
    amount: tx.amount,
    transactionDate: tx.transactionDate
      ? new Date(tx.transactionDate)
      : new Date(),
    createdAt: new Date(tx.createdAt),
    updatedAt: new Date(tx.updatedAt),
    bankrollId: tx.bankrollId,
  };
}
