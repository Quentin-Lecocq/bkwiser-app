import { z } from 'zod';
import { BANKROLL_CURRENCIES, BANKROLL_STATUS } from '../constants/bankroll';

export const CreateBankrollSchema = z.object({
  name: z.string().min(1),
  initialAmount: z.number().min(0),
  status: z.enum(BANKROLL_STATUS),
  currency: z.enum(BANKROLL_CURRENCIES),
});

export const BankrollSchema = CreateBankrollSchema.extend({
  id: z.string().uuid(),
  currentAmount: z.number().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  archivedAt: z.string().datetime().nullable(),
});

export type CreateBankrollInput = z.infer<typeof CreateBankrollSchema>;
export type Bankroll = z.infer<typeof BankrollSchema>;
