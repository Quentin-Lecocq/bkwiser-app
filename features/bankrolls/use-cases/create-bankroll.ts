import { createBankrollError } from '@/core/errors/bankrolls/create-bankroll-error';
import {
  Bankroll,
  CreateBankrollInput,
  createBankrollSchema,
} from '@/core/schemas/bankroll.schema';
import { bankrollService } from '@/core/services/bankroll.service';

export async function createBankroll(
  input: CreateBankrollInput,
): Promise<Bankroll> {
  try {
    const { error, data } = createBankrollSchema.safeParse(input);

    if (error) {
      throw createBankrollError('Invalid input to create bankroll');
    }

    const bankroll = await bankrollService.create(data);
    return bankroll;
  } catch (error) {
    console.error('Failed to create bankroll:', error);
    throw createBankrollError('Bankroll create failed - usecase');
  }
}
