import { z } from 'zod';
import { BANKROLL_CURRENCIES, BANKROLL_STATUS } from '../constants/bankroll';

export const bankrollSchema = z.object({
  name: z.string().min(1),
  initialAmount: z.number().min(0),
  status: z.enum(BANKROLL_STATUS),
  currency: z.enum(BANKROLL_CURRENCIES),
});

export type CreateBankrollInput = z.infer<typeof bankrollSchema>;
