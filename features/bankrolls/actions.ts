import { Bankroll, CreateBankrollInput } from '@/core/schemas/bankroll.schema';
import { httpRequest } from '@/lib/http-client';

export async function createBankrollDB(data: CreateBankrollInput) {
  return httpRequest<Bankroll>('/api/bankrolls', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getBankrollByIdDB(id: string) {
  return httpRequest<Bankroll>(`/api/bankrolls/${id}`);
}

export async function getBankrollsDB() {
  return httpRequest<Bankroll[]>('api/bankrolls');
}
