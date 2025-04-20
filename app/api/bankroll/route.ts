import { bankrollSchema } from '@/core/schemas/bankroll.schema';
import { bankrollService } from '@/core/services/bankroll.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = bankrollSchema.safeParse(body);

  if (!parsed.success) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid bankroll data' }),
      { status: 400 },
    );
  }

  const bankroll = await bankrollService.create(parsed.data);
  return NextResponse.json(bankroll, { status: 201 });
}
