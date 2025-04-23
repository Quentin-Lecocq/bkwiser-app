import {
  CreateTransactionInput,
  Transaction,
} from '@/core/schemas/transaction.schema';

export async function createTransactionDB(
  data: CreateTransactionInput,
): Promise<Transaction> {
  try {
    const res = await fetch(`/api/bankrolls/${data.bankrollId}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to create transaction');
    }

    return res.json();
  } catch (error) {
    throw new Error('Network error: ' + (error as Error).message);
  }
}
