import { Bet, BetFormInput } from '@/core/schemas/bet.schema';
import { httpRequest } from '@/lib/http-client';

export async function createBetDB(data: BetFormInput & { bankrollId: string }) {
  return httpRequest<Bet>(`/api/bankrolls/${data.bankrollId}/bets`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getBetsDB(bankrollId: string): Promise<Bet[]> {
  console.log({ bankrollId });
  return httpRequest<Bet[]>(`/api/bankrolls/${bankrollId}/bets`);
}
