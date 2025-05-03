import { BetFactory } from '../factories/bet.factory';
import { toDomain, toPersistence } from '../mappers/bet.mapper';
import { BetRepository } from '../repositories/bet.repository';
import { Bet, CreateBetInput } from '../schemas/bet.schema';

export const BetService = {
  async create(input: CreateBetInput): Promise<Bet> {
    try {
      const bet = BetFactory.create(input);

      await BetRepository.create(toPersistence(bet));

      return bet;
    } catch (error) {
      console.error('Failed to create bet:', error);
      throw new Error('Bet creation failed');
    }
  },
  async getAll(bankrollId: string) {
    try {
      const rows = await BetRepository.getAllByBankrollId(bankrollId);
      return rows.map(toDomain);
    } catch (error) {
      console.error('Error fetching all bets', error);
      throw new Error('Failed to fetch bets');
    }
  },
  async getById(id: string): Promise<Bet | null> {
    try {
      const row = await BetRepository.getById(id);
      return row ? toDomain(row) : null;
    } catch (error) {
      console.error(`Error fetching bet with id ${id}:`, error);
      throw new Error('Failed to fetch bet');
    }
  },
};
