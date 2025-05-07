import { getAllBets } from '@/core/use-cases/bets/get-all-bets';
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

  const bets = await getAllBets(bankrollId);

  return NextResponse.json(bets, {
    status: 200,
  });
}
