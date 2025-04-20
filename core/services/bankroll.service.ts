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
};
