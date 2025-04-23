import { Bankroll } from '@/core/schemas/bankroll.schema';

export async function createBankrollDB(data: {
  name: string;
  initialAmount: number;
}): Promise<Bankroll> {
  try {
    console.log({ data });
    const res = await fetch('/api/bankrolls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log({ res });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to create bankroll');
    }

    return res.json();
  } catch (error) {
    throw new Error('Network error: ' + (error as Error).message);
  }
}

export async function getBankrollByIdDB(id: string): Promise<Bankroll> {
  const res = await fetch(`/api/bankrolls/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch bankroll');
  }

  return res.json();
}

export async function getBankrollsDB() {
  const res = await fetch(`/api/bankrolls`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch bankrolls');
  return res.json();
}
