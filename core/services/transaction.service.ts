import { TransactionFactory } from '../factories/transaction.factory';
import { toDomain, toPersistence } from '../mappers/transaction.mapper';
import { TransactionRepository } from '../repositories/transaction.repository';
import {
  CreateTransactionInput,
  Transaction,
} from '../schemas/transaction.schema';
import { BankrollService } from '../services/bankroll.service';

export const TransactionService = {
  async create(input: CreateTransactionInput): Promise<Transaction> {
    try {
      const transaction = TransactionFactory.create(input);

      await TransactionRepository.create(toPersistence(transaction));

      await BankrollService.processTransaction(transaction, input.bankrollId);

      return transaction;
    } catch (error) {
      console.error('Failed to create transaction:', error);
      throw new Error('Transaction creation failed');
    }
  },
  async getAllByBankrollId(bankrollId: string): Promise<Transaction[]> {
    try {
      const rows = await TransactionRepository.getAllByBankrollId(bankrollId);
      return rows.map(toDomain);
    } catch (error) {
      console.error('Error fetching all transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
  },
};
