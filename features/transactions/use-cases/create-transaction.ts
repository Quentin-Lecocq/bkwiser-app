import { createTransactionError } from '@/core/errors/transactions/create-transaction-error';
import { CreateTransactionInput } from '@/core/schemas/transaction.schema';
import { TransactionService } from '@/core/services/transaction.service';

export async function createTransaction(input: CreateTransactionInput) {
  try {
    if (!input.bankrollId) {
      throw createTransactionError('Bankroll ID is required');
    }

    return await TransactionService.create(input);
  } catch (error) {
    console.error('Failed to create transaction in use case:', error);
    throw createTransactionError('Transaction creation failed - use case');
  }
}
