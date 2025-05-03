import { getBankrollByIdError } from '@/core/errors/bankrolls/get-bankroll-by-id-error';
import { Bankroll } from '@/core/schemas/bankroll.schema';
import { BankrollService } from '@/core/services/bankroll.service';

export async function getBankrollById(id: string): Promise<Bankroll> {
  try {
    const bankroll = await BankrollService.getById(id);

    if (!bankroll) {
      throw getBankrollByIdError(`Bankroll with id ${id} not found`);
    }

    return bankroll;
  } catch (error) {
    console.error('Failed to get bankroll by id: ', error);
    throw getBankrollByIdError('Failed to get bankroll by ID');
  }
}
