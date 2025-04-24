import { transactionFactory } from '../factories/transaction.factory';
import { toDomain, toPersistence } from '../mappers/transaction.mapper';
import { transactionRepository } from '../repositories/transaction.repository';
import {
  CreateTransactionInput,
  Transaction,
} from '../schemas/transaction.schema';
import { bankrollService } from '../services/bankroll.service';

export const transactionService = {
  async create(input: CreateTransactionInput): Promise<Transaction> {
    try {
      const transaction = transactionFactory.create(input);

      await transactionRepository.create(toPersistence(transaction));

      await bankrollService.processTransaction(transaction, input.bankrollId);

      return transaction;
    } catch (error) {
      console.error('Failed to create transaction:', error);
      throw new Error('Transaction creation failed');
    }
  },
  async getAllByBankrollId(bankrollId: string): Promise<Transaction[]> {
    try {
      const rows = await transactionRepository.getAllByBankrollId(bankrollId);
      return rows.map(toDomain);
    } catch (error) {
      console.error('Error fetching all transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
  },
};
