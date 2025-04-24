import { createTransactionSchema } from '@/core/schemas/transaction.schema';
import { transactionService } from '@/core/services/transaction.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createTransactionSchema.safeParse(body);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          error: 'Invalid transaction data',
        }),
        { status: 400 },
      );
    }

    const transaction = await transactionService.create(parsed.data);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/bankrolls/${id}/transactions', error);
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
