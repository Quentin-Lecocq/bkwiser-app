import { getAllTransactions } from '@/features/transactions/use-cases/get-all-transactions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bankrollId = searchParams.get('bankrollId');

  if (!bankrollId) {
    return NextResponse.json(
      {
        error: 'Missing bankrollId',
      },
      {
        status: 400,
      },
    );
  }

  const transactions = await getAllTransactions(bankrollId);

  return NextResponse.json(transactions, {
    status: 200,
  });
}
