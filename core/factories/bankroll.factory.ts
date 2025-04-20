import { Bankroll } from '../domain/bankroll';
import {
  bankrollSchema,
  CreateBankrollInput,
} from '../schemas/bankroll.schema';

export const bankrollFactory = {
  create({ name, initialAmount }: CreateBankrollInput): Bankroll {
    return {
      id: crypto.randomUUID(),
      name,
      initialAmount,
      currentAmount: initialAmount,
      createdAt: new Date().toISOString(),
    };
  },
  isValid(bankroll: Bankroll): boolean {
    return (
      typeof bankroll.name === 'string' &&
      bankroll.name.trim().length > 0 &&
      typeof bankroll.initialAmount === 'number' &&
      bankroll.initialAmount >= 0
    );
  },
  reset(bankroll: Bankroll): Bankroll {
    return {
      ...bankroll,
      currentAmount: bankroll.initialAmount,
    };
  },
  fromRaw(data: unknown): Bankroll | null {
    const parsed = bankrollSchema.safeParse(data);
    if (!parsed.success) return null;

    return bankrollFactory.create(parsed.data);
  },
};
