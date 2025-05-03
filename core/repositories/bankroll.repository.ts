import { db } from '../../lib/db';
import { Bankroll, Prisma } from '../../prisma/generated/client';

// abstraction of database
export const BankrollRepository = {
  async create(bankroll: Prisma.BankrollCreateInput): Promise<void> {
    await db.bankroll.create({ data: bankroll });
  },
  async getAll(): Promise<Bankroll[]> {
    return db.bankroll.findMany();
  },
  async getById(id: string): Promise<Bankroll | null> {
    return db.bankroll.findUnique({
      where: {
        id,
      },
    });
  },
  async update(bankroll: Prisma.BankrollCreateInput): Promise<Bankroll> {
    return db.bankroll.update({
      where: { id: bankroll.id },
      data: bankroll,
    });
  },
};
