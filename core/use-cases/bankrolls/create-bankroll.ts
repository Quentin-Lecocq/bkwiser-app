import { createBankrollError } from '@/core/errors/bankrolls/create-bankroll-error';
import {
  Bankroll,
  CreateBankrollInput,
  CreateBankrollSchema,
} from '@/core/schemas/bankroll.schema';
import { BankrollService } from '@/core/services/bankroll.service';

export async function createBankroll(
  input: CreateBankrollInput,
): Promise<Bankroll> {
  try {
    const { error, data } = CreateBankrollSchema.safeParse(input);

    if (error) {
      throw createBankrollError('Invalid input to create bankroll');
    }

    const bankroll = await BankrollService.create(data);
    return bankroll;
  } catch (error) {
    console.error('Failed to create bankroll:', error);
    throw createBankrollError('Bankroll create failed - usecase');
  }
}
