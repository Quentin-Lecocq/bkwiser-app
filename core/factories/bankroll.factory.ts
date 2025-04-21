import { Bankroll } from '../domain/bankroll';
import {
  bankrollSchema,
  CreateBankrollInput,
} from '../schemas/bankroll.schema';

export const bankrollFactory = {
  create(data: CreateBankrollInput): Bankroll {
    const today = new Date().toISOString();
    return {
      id: crypto.randomUUID(),
      name: data.name,
      initialAmount: data.initialAmount,
      currentAmount: data.initialAmount,
      createdAt: today,
      updatedAt: today,
      status: data.status,
      archivedAt: null,
      currency: data.currency,
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
      updatedAt: new Date().toISOString(),
    };
  },
  fromRaw(data: unknown): Bankroll | null {
    const parsed = bankrollSchema.safeParse(data);
    if (!parsed.success) return null;

    return bankrollFactory.create(parsed.data);
  },
  isArchived(bankroll: Bankroll): boolean {
    return bankroll.archivedAt !== null;
  },
};
