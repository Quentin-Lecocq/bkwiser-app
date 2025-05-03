import { getBetById } from '@/core/use-cases/bets/get-bet-by-id';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id || typeof id !== 'string') {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid or missing id' }),
        { status: 400 },
      );
    }

    const bet = await getBetById(id);
    return NextResponse.json(bet, {
      status: 200,
    });
  } catch (error) {
    console.error('Error in GET /api/bets/id', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch bet' }), {
      status: 500,
    });
  }
}
