import { transactionFactory } from '../factories/transaction.factory';
import { toPersistence } from '../mappers/transaction.mapper';
import { transactionRepository } from '../repositories/transaction.repository';
import {
  CreateTransactionInput,
  Transaction,
} from '../schemas/transaction.schema';

export const transactionService = {
  async create(input: CreateTransactionInput): Promise<Transaction> {
    const transaction = transactionFactory.create(input);
    await transactionRepository.create(toPersistence(transaction));
    return transaction;
  },
};
