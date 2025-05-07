import { Bet, BetFormInput } from '@/core/schemas/bet.schema';
import { httpRequest } from '@/lib/http-client';

export async function createBetDB(data: BetFormInput & { bankrollId: string }) {
  return httpRequest<Bet>(`/api/bankrolls/${data.bankrollId}/bets`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getBetsDB(bankrollId: string): Promise<Bet[]> {
  return httpRequest<Bet[]>(`/api/bets?bankrollId=${bankrollId}`);
}

export async function updateBetDB(data: BetFormInput & { id: string }) {
  return httpRequest<Bet>(`/api/bets/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function getBetDB(id: string): Promise<Bet> {
  return httpRequest<Bet>(`/api/bets/${id}`);
}
