import { CreateBetSchema } from '@/core/schemas/bet.schema';
import { createBet } from '@/features/bets/use-cases/create-bet';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log({ body });
    const { error, data } = CreateBetSchema.safeParse(body);

    console.log({ data });
    console.log({ error });

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
    console.error('Error in POST /api/bets', error);
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
