import { z } from 'zod';
import { BET_STATUS, BET_TYPES } from '../constants/bet';

export const CreateBetSchema = z.object({
  stake: z.number().gt(0),
  type: z.enum(BET_TYPES),
  legs: z.array(
    z.object({
      odds: z.number().gt(0),
      status: z.enum(BET_STATUS),
    }),
  ),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  bankrollId: z.string().uuid(),
});

export type CreateBetInput = z.infer<typeof CreateBetSchema>;

export const BetSchema = CreateBetSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  potentialWin: z.number().gt(0),
});

export type Bet = z.infer<typeof BetSchema>;

export const BetFormSchema = z.object({
  stake: z.number().gt(0),
  type: z.enum(BET_TYPES),
  legs: z.array(
    z.object({
      odds: z.number().gt(0),
      status: z.enum(BET_STATUS),
    }),
  ),
  date: z.string(),
});

export type BetFormInput = z.infer<typeof BetFormSchema>;
