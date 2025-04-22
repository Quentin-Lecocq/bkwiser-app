export const TRANSACTION_TYPES = ['deposit', 'withdraw'] as const;
export type TransactionTypes = (typeof TRANSACTION_TYPES)[number];
