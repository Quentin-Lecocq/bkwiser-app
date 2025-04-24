import { bankrollService } from '@/core/services/bankroll.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const bankroll = await bankrollService.getById(id);
    return NextResponse.json(bankroll, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/bankrolls/id', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch bankroll' }),
      { status: 500 },
    );
  }
}
