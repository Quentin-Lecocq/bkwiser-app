import { Transaction } from '@prisma/client';
import { db } from '../../lib/db';

// abstaction of database
export const transactionRepository = {
  async create(transaction: Transaction): Promise<void> {
    await db.transaction.create({
      data: {
        type: transaction.type,
        amount: transaction.amount,
        transactionDate: transaction.transactionDate || new Date(),
        createdAt: transaction.createdAt || new Date(),
        updatedAt: transaction.updatedAt || new Date(),
        bankroll: {
          connect: { id: transaction.bankrollId },
        },
      },
    });
  },
  async getAllByBankrollId(id: string): Promise<Transaction[]> {
    return db.transaction.findMany({
      where: {
        bankrollId: id,
      },
    });
  },
};
