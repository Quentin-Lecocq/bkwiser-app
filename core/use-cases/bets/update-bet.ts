import { EditBetInput } from '@/core/schemas/bet.schema';
import { BetService } from '@/core/services/bet.service';

export async function updateBet(betId: string, data: EditBetInput) {
  try {
    if (!betId) {
      throw new Error('Bet ID is required');
    }

    return await BetService.update(betId, data);
  } catch (error) {
    console.error('Failed to update bet in use case', error);
  }
}
