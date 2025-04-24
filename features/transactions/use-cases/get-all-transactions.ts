import { getAllTransactionsError } from '@/core/errors/transactions/get-all-transactions-error';
import { Transaction } from '@/core/schemas/transaction.schema';
import { transactionService } from '@/core/services/transaction.service';

export async function getAllTransactions(
  bankrollId: string,
): Promise<Transaction[]> {
  try {
    const transactions =
      await transactionService.getAllByBankrollId(bankrollId);
    return transactions;
  } catch (error) {
    console.error('Failed to get all transactions', error);
    throw getAllTransactionsError('Get all transactions failed');
  }
}
