import { describe, expect, it } from 'vitest';
import { BetStatus, BetTypes } from '../constants/bet';
import { BetFactory } from '../factories/bet.factory';
import { BetSchema } from '../schemas/bet.schema';

describe('', () => {
  it('should throw an error if no data is provided', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => BetFactory.create(undefined as any)).toThrow(
      'Data is required to create a Bet',
    );
  });

  it('should create a bet with custom values', () => {
    const customBetInput = {
      type: 'single' as BetTypes,
      stake: 100,
      date: new Date().toISOString(),
      bankrollId: '550e8400-e29b-41d4-a716-446655440000',
      legs: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          odds: 2.5,
          status: 'pending' as BetStatus,
        },
      ],
      potentialWin: 250,
    };

    const bet = BetFactory.create(customBetInput);

    expect(bet).toMatchObject({
      type: customBetInput.type,
      stake: customBetInput.stake,
      date: customBetInput.date,
      bankrollId: customBetInput.bankrollId,
      potentialWin: customBetInput.potentialWin,
    });

    expect(bet.legs).toHaveLength(1);
    expect(bet.legs[0]).toMatchObject({
      odds: 2.5,
      status: 'pending',
    });

    expect(bet.id).toBeDefined();
    expect(bet.createdAt).toBeDefined();
    expect(bet.updatedAt).toBeDefined();

    const validation = BetSchema.safeParse(bet);
    expect(validation.success).toBe(true);
  });
});
