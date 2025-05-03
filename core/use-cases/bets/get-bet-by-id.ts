import { Bet } from '@/core/schemas/bet.schema';
import { BetService } from '@/core/services/bet.service';

export async function getBetById(id: string): Promise<Bet> {
  try {
    const bet = await BetService.getById(id);

    if (!bet) {
      throw new Error(`Bet with id ${id} not found`);
    }

    return bet;
  } catch (error) {
    console.error('Failed to get bet by id: ', error);
    throw new Error('Failed to get bet by id');
  }
}
