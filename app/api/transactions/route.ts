import { getAllTransactions } from '@/core/use-cases/transactions/get-all-transactions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
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
