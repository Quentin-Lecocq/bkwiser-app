import {
  CreateTransactionInput,
  Transaction,
  TransactionSchema,
} from '../schemas/transaction.schema';

export const TransactionFactory = {
  create(data: CreateTransactionInput): Transaction {
    const today = new Date().toISOString();

    return {
      id: crypto.randomUUID(),
      type: data.type,
      amount: data.amount,
      transactionDate: data.transactionDate
        ? new Date(data.transactionDate).toISOString()
        : today,
      createdAt: today,
      updatedAt: today,
      bankrollId: data.bankrollId,
    };
  },
  isValid(transaction: Transaction): boolean {
    const parsed = TransactionSchema.safeParse(transaction);
    return parsed.success;
  },
  fromRaw(data: unknown): Transaction | null {
    const parsed = TransactionSchema.safeParse(data);
    if (!parsed.success) return null;

    return parsed.data;
  },
  isDeposit(transaction: Transaction): boolean {
    return transaction.type === 'deposit';
  },
  isWithdraw(transaction: Transaction): boolean {
    return transaction.type === 'withdraw';
  },
  update(transaction: Transaction, changes: Partial<Transaction>): Transaction {
    return {
      ...transaction,
      ...changes,
      updatedAt: new Date().toISOString(),
    };
  },
};
