import { Bankroll } from '../domain/bankroll';

export const bankrollRepository = {
  async create(bankroll: Bankroll): Promise<void> {
    console.log('Creating bankroll in repository', { bankroll });
    // await db.insert(bankroll);
  },
  async getAll(): Promise<Bankroll[]> {
    console.log('Get all bankrolls');
    // await db.getAll()
    return [];
  },
  async getById(id: string): Promise<Bankroll | null> {
    console.log('Get by id', { id });
    // await db.getById(id)
    return null;
  },
  async update(bankroll: Bankroll): Promise<void> {
    console.log('updating bankroll', { bankroll });
    // await db.update().where().set()
  },
};
