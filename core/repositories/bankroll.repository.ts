import { db } from '../../lib/db';
import { Bankroll } from '../../prisma/generated/client';

// abstraction of database
export const bankrollRepository = {
  async create(bankroll: Bankroll): Promise<void> {
    await db.bankroll.create({ data: bankroll });
  },
  async getAll(): Promise<Bankroll[]> {
    return db.bankroll.findMany();
  },
  async getById(id: string): Promise<Bankroll | null> {
    return db.bankroll.findUnique({
      where: { id },
    });
  },
  async update(bankroll: Bankroll): Promise<Bankroll> {
    return db.bankroll.update({
      where: { id: bankroll.id },
      data: bankroll,
    });
  },
};
