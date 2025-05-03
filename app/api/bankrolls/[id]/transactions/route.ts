import { CreateTransactionSchema } from '@/core/schemas/transaction.schema';
import { createTransaction } from '@/core/use-cases/transactions/create-transaction';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { error, data } = CreateTransactionSchema.safeParse(body);

    if (error) {
      return new NextResponse(
        JSON.stringify({
          error: 'Invalid transaction data',
        }),
        { status: 400 },
      );
    }

    const transaction = await createTransaction(data);
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
