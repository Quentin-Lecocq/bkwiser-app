import type { Transaction as PrismaTransaction } from '@/prisma/generated/client'; // adapte selon ta config
import { db } from '../../lib/db';

export const transactionRepository = {
  async create(transaction: PrismaTransaction): Promise<void> {
    await db.transaction.create({ data: transaction });
  },
};
