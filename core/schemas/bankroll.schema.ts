import { z } from 'zod';

export const bankrollSchema = z.object({
  name: z.string().min(1),
  initialAmount: z.number().min(0),
});

export type CreateBankrollInput = z.infer<typeof bankrollSchema>;
