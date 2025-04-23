import { createBankrollSchema } from '@/core/schemas/bankroll.schema';
import { bankrollService } from '@/core/services/bankroll.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log({ body });
    const parsed = createBankrollSchema.safeParse(body);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid bankroll data' }),
        { status: 400 },
      );
    }

    const bankroll = await bankrollService.create(parsed.data);
    return NextResponse.json(bankroll, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/bankroll', error);
    return new NextResponse(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const bankrolls = await bankrollService.getAll();

    return NextResponse.json(bankrolls, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/bankroll', error);
    return new NextResponse(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    });
  }
}
