import { db } from '../../lib/db';
import { Bet, Prisma } from '../../prisma/generated/client';

export const BetRepository = {
  async create(data: Prisma.BetCreateInput): Promise<void> {
    await db.bet.create({ data });
  },
  async getAllByBankrollId(id: string): Promise<Bet[]> {
    return db.bet.findMany({
      where: {
        bankrollId: id,
      },
    });
  },
};
