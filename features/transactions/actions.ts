import {
  CreateTransactionInput,
  Transaction,
} from '@/core/schemas/transaction.schema';
import { httpRequest } from '@/lib/http-client';

export async function createTransactionDB(data: CreateTransactionInput) {
  return httpRequest<Transaction>(
    `/api/bankrolls/${data.bankrollId}/transactions`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
}

export async function getTransactionsDB(
  bankrollId: string,
): Promise<Transaction[]> {
  return httpRequest<Transaction[]>(
    `/api/transactions?bankrollId=${bankrollId}`,
  );
}
