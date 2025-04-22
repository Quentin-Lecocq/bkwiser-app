import { TransactionTypes } from '../constants/transaction';

export type Transaction = {
  id: string;
  type: TransactionTypes;
  amout: number;
  createdAt: string;
  updatedAt: string;
  bankrollId: string;
};
