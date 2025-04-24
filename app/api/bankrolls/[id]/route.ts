import { getBankrollById } from '@/features/bankrolls/use-cases/get-bankroll-by-id';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id || typeof id !== 'string') {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid or missing ID' }),
        { status: 400 },
      );
    }
    const bankroll = await getBankrollById(id);
    return NextResponse.json(bankroll, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/bankrolls/id', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch bankroll' }),
      { status: 500 },
    );
  }
}
