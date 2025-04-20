export const BANKROLL_STATUS = ['private', 'public'] as const;
export type BankrollStatus = (typeof BANKROLL_STATUS)[number];

export const BANKROLL_CURRENCY = ['EUR', 'USD', 'GBP'] as const;
export type BankrollCurrency = (typeof BANKROLL_CURRENCY)[number];
export const CURRENCY_SYMBOLS = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};
