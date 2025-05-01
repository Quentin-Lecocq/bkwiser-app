import { Bet, CreateBetInput } from '../schemas/bet.schema';

export const betFactory = {
  create(data: CreateBetInput): Bet {
    const today = new Date().toISOString();

    const cumulativeOdds = data.legs.reduce((acc, leg) => acc * leg.odds, 1);
    const potentialWin = data.stake * cumulativeOdds;

    return {
      id: crypto.randomUUID(),
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
