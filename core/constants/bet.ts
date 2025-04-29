export const BET_TYPES = ['single', 'multiple'] as const;
export type BetTypes = (typeof BET_TYPES)[number];

export const BET_STATUS = [
  'pending',
  'won',
  'lost',
  'canceled',
  'refund',
] as const;
export type BetStatus = (typeof BET_STATUS)[number];
