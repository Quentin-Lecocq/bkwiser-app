import { CreateBankrollSchema } from '@/core/schemas/bankroll.schema';
import { createBankroll } from '@/core/use-cases/bankrolls/create-bankroll';
import { getAllBankrolls } from '@/core/use-cases/bankrolls/get-all-bankrolls';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { error, data } = CreateBankrollSchema.safeParse(body);

    if (error) {
      return new NextResponse(
        JSON.stringify({
          error: 'Invalid bankroll data',
        }),
        { status: 400 },
      );
    }

    const bankroll = await createBankroll(data);

    return NextResponse.json(bankroll, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/bankrolls', error);
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

export async function GET() {
  try {
    const bankrolls = await getAllBankrolls();

    return NextResponse.json(bankrolls, {
      status: 200,
    });
  } catch (error) {
    console.error('Error in GET /api/bankrolls', error);
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
