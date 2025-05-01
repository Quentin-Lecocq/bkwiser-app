import { betFactory } from '../factories/bet.factory';
import { toPersistence } from '../mappers/bet.mapper';
import { betRepository } from '../repositories/bet.repository';
import { Bet, CreateBetInput } from '../schemas/bet.schema';

export const betService = {
  async create(input: CreateBetInput): Promise<Bet> {
    try {
      const bet = betFactory.create(input);

      await betRepository.create(toPersistence(bet));

      return bet;
    } catch (error) {
      console.error('Failed to create bet:', error);
      throw new Error('Bet creation failed');
    }
  },
};
