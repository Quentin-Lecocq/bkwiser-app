import { getAllBankrollsError } from '@/core/errors/get-all-bankrolls-error';
import { Bankroll } from '@/core/schemas/bankroll.schema';
import { bankrollService } from '@/core/services/bankroll.service';

export async function getAllBankrolls(): Promise<Bankroll[]> {
  try {
    const bankrolls = await bankrollService.getAll();
    return bankrolls;
  } catch (error) {
    console.error('Failed to get all bankrolls:', error);
    throw getAllBankrollsError('Get all bankrolls failed');
  }
}
