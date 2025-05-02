import { db } from '../../lib/db';
import { Prisma, Transaction } from '../../prisma/generated/client';

// abstaction of database
export const TransactionRepository = {
  async create(data: Prisma.TransactionCreateInput): Promise<void> {
    await db.transaction.create({ data });
  },
  async getAllByBankrollId(id: string): Promise<Transaction[]> {
    return db.transaction.findMany({
      where: {
        bankrollId: id,
      },
    });
  },
};
