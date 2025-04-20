import { Bankroll } from '../domain/bankroll';

export const bankrollRepository = {
  async create(bankroll: Bankroll): Promise<void> {
    console.log('Creating bankroll in repository', { bankroll });
    // await db.insert(bankroll);
  },
};
