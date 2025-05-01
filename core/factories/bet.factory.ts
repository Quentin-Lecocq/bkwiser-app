import { Bet, CreateBetInput } from '../schemas/bet.schema';

export const BetFactory = {
  create(data: CreateBetInput): Bet {
    if (!data) {
      throw new Error('Data is required to create a Bet');
    }

    const today = new Date().toISOString();
    const betId = crypto.randomUUID();

    const cumulativeOdds = data.legs.reduce((acc, leg) => acc * leg.odds, 1);
    const potentialWin = data.stake * cumulativeOdds;

    return {
      id: betId,
      type: data.type,
      stake: data.stake,
      date: data.date,
      createdAt: today,
      updatedAt: today,
      bankrollId: data.bankrollId,
      legs: data.legs,
      potentialWin,
    };
  },
};
