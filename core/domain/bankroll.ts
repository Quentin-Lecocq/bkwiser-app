import { BankrollCurrency, BankrollStatus } from '../constants/bankroll';

export type Bankroll = {
  id: string;
  name: string;
  initialAmount: number;
  currentAmount: number;
  createdAt: string;
  updatedAt: string;
  status: BankrollStatus;
  archivedAt: string | null;
  currency: BankrollCurrency;
};
