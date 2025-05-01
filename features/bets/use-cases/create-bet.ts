import { CreateBetInput } from '@/core/schemas/bet.schema';
import { betService } from '@/core/services/bet.service';

export async function createBet(input: CreateBetInput) {
  try {
    if (!input.bankrollId) {
      throw new Error('heee');
    }

    return await betService.create(input);
  } catch (error) {
    console.error('Failed to create bet in use case', error);
  }
}
