import { z } from 'zod';
import { TRANSACTION_TYPES } from '../constants/transaction';

export const createTransactionSchema = z.object({
  type: z.enum(TRANSACTION_TYPES),
  amount: z.number().gt(0),
  transactionDate: z.string().datetime().optional(),
  bankrollId: z.string().uuid(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export const transactionSchema = createTransactionSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Transaction = z.infer<typeof transactionSchema>;

export const transactionFormSchema = z.object({
  type: z.enum(TRANSACTION_TYPES),
  amount: z.number().gt(0),
  transactionDate: z.string().optional(),
});

export type TransactionFormInput = z.infer<typeof transactionFormSchema>;
