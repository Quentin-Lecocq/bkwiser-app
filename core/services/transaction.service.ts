import { transactionFactory } from '../factories/transaction.factory';
import { toPersistence } from '../mappers/transaction.mapper';
import { transactionRepository } from '../repositories/transaction.repository';
import {
  CreateTransactionInput,
  Transaction,
} from '../schemas/transaction.schema';

export const transactionService = {
  async create(input: CreateTransactionInput): Promise<Transaction> {
    try {
      const transaction = transactionFactory.create(input);
      await transactionRepository.create(toPersistence(transaction));
      return transaction;
    } catch (error) {
      console.error('Failed to create transaction:', error);
      throw new Error('Transaction creation failed');
    }
  },
};
