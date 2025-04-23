import type { Transaction } from '@/prisma/generated/client';
import { Prisma } from '@prisma/client';
import { db } from '../../lib/db';

export const transactionRepository = {
  async create(transaction: Transaction): Promise<void> {
    await db.transaction.create({
      data: {
        type: transaction.type,
        amount: transaction.amount,
        // date: new Date(transaction.date),
        createdAt: new Date(transaction.createdAt),
        updatedAt: new Date(transaction.updatedAt),
        bankrollId: transaction.bankrollId,
      } as Prisma.TransactionUncheckedCreateInput,
    });
  },
};
