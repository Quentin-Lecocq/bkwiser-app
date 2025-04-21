export const BANKROLL_STATUS = ['private', 'public'] as const;
export type BankrollStatus = (typeof BANKROLL_STATUS)[number];

export const BANKROLL_CURRENCIES = ['EUR', 'USD', 'GBP'] as const;
export type BankrollCurrencies = (typeof BANKROLL_CURRENCIES)[number];
export const CURRENCIES_SYMBOLS = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};
