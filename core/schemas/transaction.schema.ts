import { z } from 'zod';
import { TRANSACTION_TYPES } from '../constants/transaction';

export const createTransactionSchema = z.object({
  type: z.enum(TRANSACTION_TYPES),
  amount: z.number().gt(0),
  bankrollId: z.string().uuid(),
});

export const transactionSchema = createTransactionSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const transactionFormSchema = z.object({
  type: z.enum(TRANSACTION_TYPES),
  amount: z.number().gt(0),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type TransactionFormInput = z.infer<typeof transactionFormSchema>;
