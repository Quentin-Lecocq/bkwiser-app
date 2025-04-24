import { createBankrollError } from '@/core/errors/create-bankroll-error';
import { bankrollFactory } from '@/core/factories/bankroll.factory';
import { toPersistence } from '@/core/mappers/bankroll.mapper';
import { bankrollRepository } from '@/core/repositories/bankroll.repository';
import {
  Bankroll,
  CreateBankrollInput,
  createBankrollSchema,
} from '@/core/schemas/bankroll.schema';

export async function createBankroll(
  input: CreateBankrollInput,
): Promise<Bankroll> {
  try {
    const { error, data } = createBankrollSchema.safeParse(input);

    if (error) {
      throw createBankrollError('Invalid input to create bankroll');
    }

    const bankroll = bankrollFactory.create(data);
    await bankrollRepository.create(toPersistence(bankroll));

    return bankroll;
  } catch (error) {
    console.error('Failed to create bankroll:', error);
    throw createBankrollError('Bankroll create failed - usecase');
  }
}
