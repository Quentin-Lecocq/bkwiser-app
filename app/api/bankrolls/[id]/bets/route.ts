import { CreateBetSchema } from '@/core/schemas/bet.schema';
import { createBet } from '@/core/use-cases/bets/create-bet';
import { getAllBets } from '@/core/use-cases/bets/get-all-bets';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { error, data } = CreateBetSchema.safeParse(body);

    if (error) {
      return new NextResponse(
        JSON.stringify({
          error: 'Invalid bet data',
        }),
        { status: 400 },
      );
    }

    const bet = await createBet(data);

    return NextResponse.json(bet, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/bankrolls/[id]/bets', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Something went wrong',
      }),
      {
        status: 500,
      },
    );
  }
}

export async function GET(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id: bankrollId } = context.params;

  if (!bankrollId) {
    return NextResponse.json({ error: 'Missing bankrollId' }, { status: 400 });
  }

  const bets = await getAllBets(bankrollId);

  return NextResponse.json(bets, { status: 200 });
}
