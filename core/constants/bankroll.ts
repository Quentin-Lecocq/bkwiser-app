export const BANKROLL_STATUS = ['private', 'public'] as const;

export type BankrollStatus = (typeof BANKROLL_STATUS)[number];
