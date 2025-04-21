import { Bankroll } from '../domain/bankroll';
import { bankrollFactory } from '../factories/bankroll.factory';
import { bankrollRepository } from '../repositories/bankroll.repository';
import { CreateBankrollInput } from '../schemas/bankroll.schema';

export const bankrollService = {
  async create(input: CreateBankrollInput): Promise<Bankroll> {
    const bankroll = bankrollFactory.create(input);

    await bankrollRepository.create(bankroll);
    return bankroll;
  },
  async getAll(): Promise<Bankroll[]> {
    return bankrollRepository.getAll();
  },
  async getById(id: string): Promise<Bankroll | null> {
    return bankrollRepository.getById(id);
  },
  async reset(id: string): Promise<Bankroll | null> {
    const existing = await bankrollRepository.getById(id);
    if (!existing) return null;

    const reset = bankrollFactory.reset(existing);
    await bankrollRepository.update(reset);

    return reset;
  },
  async archive(id: string): Promise<Bankroll | null> {
    const existing = await bankrollRepository.getById(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const archived: Bankroll = {
      ...existing,
      archivedAt: now,
      updatedAt: now,
    };

    await bankrollRepository.update(archived);
    return archived;
  },
};
