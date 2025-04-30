import { z } from 'zod';
import { BET_STATUS, BET_TYPES } from '../constants/bet';

export const createBetSchema = z.object({
  stake: z.number().gt(0),
  type: z.enum(BET_TYPES),
  legs: z.array(
    z.object({
      eventId: z.string().uuid(),
      odds: z.number().gt(0),
      status: z.enum(BET_STATUS),
    }),
  ),
  potentialWin: z.number().gt(0),
  date: z.string().datetime().optional(),
});

export type CreateBetInput = z.infer<typeof createBetSchema>;

export const betSchema = createBetSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  bankrollId: z.string().uuid(),
});

export type Bet = z.infer<typeof betSchema>;

export const betFormSchema = z.object({
  stake: z.number().gt(0),
  type: z.enum(BET_TYPES),
  legs: z.array(
    z.object({
      eventId: z.string().uuid(),
      odds: z.number().gt(0),
      status: z.enum(BET_STATUS),
    }),
  ),
  date: z.string(),
});

export type BetFormInput = z.infer<typeof betFormSchema>;
