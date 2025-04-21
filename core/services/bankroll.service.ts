import { Bankroll } from '../domain/bankroll';
import { bankrollFactory } from '../factories/bankroll.factory';
import { toDomain } from '../mappers/bankroll.mapper';
import { bankrollRepository } from '../repositories/bankroll.repository';
import { CreateBankrollInput } from '../schemas/bankroll.schema';

export const bankrollService = {
  async create(input: CreateBankrollInput): Promise<Bankroll> {
    const bankroll = bankrollFactory.create(input);
    await bankrollRepository.create(bankroll);
    return bankroll;
  },
  async getAll(): Promise<Bankroll[]> {
    const rows = await bankrollRepository.getAll();
    return rows.map(toDomain);
  },
  async getById(id: string): Promise<Bankroll | null> {
    const row = await bankrollRepository.getById(id);
    return row ? toDomain(row) : null;
  },
  async reset(id: string): Promise<Bankroll | null> {
    const existing = await bankrollRepository.getById(id);
    if (!existing) return null;

    const reset = bankrollFactory.reset(toDomain(existing));
    await bankrollRepository.update(reset);
    return reset;
  },
  async archive(id: string): Promise<Bankroll | null> {
    const existing = await bankrollRepository.getById(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const archived: Bankroll = {
      ...toDomain(existing),
      archivedAt: now,
      updatedAt: now,
    };

    await bankrollRepository.update(archived);
    return archived;
  },
};
