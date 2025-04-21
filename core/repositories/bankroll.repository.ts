import type { Bankroll as PrismaBankroll } from '@prisma/client';
import { db } from '../../lib/db';
import { Bankroll } from '../domain/bankroll';

export const bankrollRepository = {
  async create(bankroll: Bankroll): Promise<void> {
    await db.bankroll.create({ data: bankroll });
  },
  async getAll(): Promise<PrismaBankroll[]> {
    return db.bankroll.findMany();
  },
  async getById(id: string): Promise<PrismaBankroll | null> {
    return db.bankroll.findUnique({
      where: { id },
    });
  },
  async update(bankroll: Bankroll): Promise<void> {
    await db.bankroll.update({
      where: { id: bankroll.id },
      data: bankroll,
    });
  },
};
