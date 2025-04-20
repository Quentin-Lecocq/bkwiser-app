import { BankrollStatus } from '../constants/bankroll';

export type Bankroll = {
  id: string;
  name: string;
  initialAmount: number;
  currentAmount: number;
  createdAt: string;
  status: BankrollStatus;
};
