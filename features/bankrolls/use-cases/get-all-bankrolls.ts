import { getAllBankrollsError } from '@/core/errors/bankrolls/get-all-bankrolls-error';
import { Bankroll } from '@/core/schemas/bankroll.schema';
import { BankrollService } from '@/core/services/bankroll.service';

export async function getAllBankrolls(): Promise<Bankroll[]> {
  try {
    const bankrolls = await BankrollService.getAll();
    return bankrolls;
  } catch (error) {
    console.error('Failed to get all bankrolls:', error);
    throw getAllBankrollsError('Get all bankrolls failed');
  }
}
