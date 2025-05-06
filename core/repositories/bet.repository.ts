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
      orderBy: {
        date: 'desc',
      },
    });
  },
  async getById(id: string): Promise<Bet | null> {
    return db.bet.findUnique({
      where: {
        id,
      },
    });
  },
  async update(id: string, data: Prisma.BetUpdateInput): Promise<Bet> {
    return db.bet.update({
      where: {
        id,
      },
      data,
    });
  },
};
