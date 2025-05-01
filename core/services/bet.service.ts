import { BetFactory } from '../factories/bet.factory';
import { toDomain, toPersistence } from '../mappers/bet.mapper';
import { betRepository } from '../repositories/bet.repository';
import { Bet, CreateBetInput } from '../schemas/bet.schema';

export const betService = {
  async create(input: CreateBetInput): Promise<Bet> {
    try {
      const bet = BetFactory.create(input);

      await betRepository.create(toPersistence(bet));

      return bet;
    } catch (error) {
      console.error('Failed to create bet:', error);
      throw new Error('Bet creation failed');
    }
  },
  async getAll(bankrollId: string) {
    try {
      const rows = await betRepository.getAllByBankrollId(bankrollId);
      return rows.map(toDomain);
    } catch (error) {
      console.error('Error fetching all bets', error);
      throw new Error('Failed to fetch bets');
    }
  },
};
