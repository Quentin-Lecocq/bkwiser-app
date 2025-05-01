import { BankrollFactory } from '../factories/bankroll.factory';
import { toDomain, toPersistence } from '../mappers/bankroll.mapper';
import { bankrollRepository } from '../repositories/bankroll.repository';
import { Bankroll, CreateBankrollInput } from '../schemas/bankroll.schema';
import { Transaction } from '../schemas/transaction.schema';

export const bankrollService = {
  async create(input: CreateBankrollInput): Promise<Bankroll> {
    try {
      const bankroll = BankrollFactory.create(input);
      await bankrollRepository.create(toPersistence(bankroll));
      return bankroll;
    } catch (error) {
      console.error('Error creating bankroll:', error);
      throw new Error('Failed to create bankroll');
    }
  },
  async getAll(): Promise<Bankroll[]> {
    try {
      const rows = await bankrollRepository.getAll();
      return rows.map(toDomain);
    } catch (error) {
      console.error('Error fetching all bankrolls:', error);
      throw new Error('Failed to fetch bankrolls');
    }
  },
  async getById(id: string): Promise<Bankroll | null> {
    try {
      const row = await bankrollRepository.getById(id);
      return row ? toDomain(row) : null;
    } catch (error) {
      console.error(`Error fetching bankroll with id ${id}:`, error);
      throw new Error('Failed to fetch bankroll');
    }
  },
  async reset(id: string): Promise<Bankroll | null> {
    try {
      const existing = await bankrollRepository.getById(id);
      if (!existing) return null;

      const reset = BankrollFactory.reset(toDomain(existing));
      await bankrollRepository.update(toPersistence(reset));
      return reset;
    } catch (error) {
      console.error(`Error resetting bankroll with id ${id}:`, error);
      throw new Error('Failed to reset bankroll');
    }
  },
  async archive(id: string): Promise<Bankroll | null> {
    try {
      const existing = await bankrollRepository.getById(id);
      if (!existing) return null;

      const now = new Date().toISOString();
      const archived: Bankroll = {
        ...toDomain(existing),
        archivedAt: now,
        updatedAt: now,
      };

      await bankrollRepository.update(toPersistence(archived));
      return archived;
    } catch (error) {
      console.error(`Error archiving bankroll with id ${id}:`, error);
      throw new Error('Failed to archive bankroll');
    }
  },
  async processTransaction(transaction: Transaction, bankrollId: string) {
    const bankroll = await bankrollRepository.getById(bankrollId);

    if (!bankroll) {
      throw new Error(`Bankroll with ID ${bankrollId} not found`);
    }

    if (
      transaction.type === 'withdraw' &&
      bankroll.currentAmount < transaction.amount
    ) {
      throw new Error('Insufficient funds for withdrawal');
    }

    const updatedBankroll = await bankrollRepository.update({
      ...bankroll,
      currentAmount:
        transaction.type === 'deposit'
          ? bankroll.currentAmount + transaction.amount
          : bankroll.currentAmount - transaction.amount,
    });

    return updatedBankroll;
  },
};
