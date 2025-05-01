import { db } from '../../lib/db';
import { Prisma } from '../../prisma/generated/client';

export const betRepository = {
  async create(data: Prisma.BetCreateInput): Promise<void> {
    await db.bet.create({ data });
  },
};
