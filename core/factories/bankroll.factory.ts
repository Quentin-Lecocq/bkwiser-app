import {
  Bankroll,
  BankrollSchema,
  CreateBankrollInput,
} from '../schemas/bankroll.schema';

export const BankrollFactory = {
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
    const parsed = BankrollSchema.safeParse(bankroll);

    return parsed.success;
  },
  reset(bankroll: Bankroll): Bankroll {
    return {
      ...bankroll,
      currentAmount: bankroll.initialAmount,
      updatedAt: new Date().toISOString(),
    };
  },
  fromRaw(data: unknown): Bankroll | null {
    const parsed = BankrollSchema.safeParse(data);
    if (!parsed.success) return null;
    return parsed.data;
  },
  isArchived(bankroll: Bankroll): boolean {
    return bankroll.archivedAt !== null;
  },
};
