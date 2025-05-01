import { Bet } from '@/core/schemas/bet.schema';
import { betService } from '@/core/services/bet.service';

export async function getAllBets(bankrollId: string): Promise<Bet[]> {
  try {
    const bets = await betService.getAll(bankrollId);
    return bets;
  } catch (error) {
    console.error('Failed to get all bets', error);
    throw new Error('Get all bet failed');
  }
}
