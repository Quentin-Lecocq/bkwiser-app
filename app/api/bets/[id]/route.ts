import { BetFormSchema } from '@/core/schemas/bet.schema';
import { getBetById } from '@/core/use-cases/bets/get-bet-by-id';
import { updateBet } from '@/core/use-cases/bets/update-bet';
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await request.json();
    const { data, error } = BetFormSchema.safeParse(body);
    const { id } = await params;

    if (!id || typeof id !== 'string') {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid or missing id' }),
        { status: 400 },
      );
    }

    if (error) {
      return new NextResponse(JSON.stringify({ error: 'Invalid bet data' }), {
        status: 400,
      });
    }

    const updatedBet = await updateBet(id, data);

    return NextResponse.json(updatedBet, {
      status: 200,
    });
  } catch (error) {
    console.error('Error in PUT /api/bets/id', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to update bet' }), {
      status: 500,
    });
  }
}
