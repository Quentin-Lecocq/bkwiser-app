import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bankrollId = searchParams.get('bankrollId');

  if (!bankrollId) {
    return NextResponse.json({ error: 'Missing bankrollId' }, { status: 400 });
  }

  const transactions = await db.transaction.findMany({
    where: { bankrollId },
    orderBy: { transactionDate: 'desc' },
  });

  return NextResponse.json(transactions);
}
