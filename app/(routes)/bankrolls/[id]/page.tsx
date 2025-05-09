import GoBackButton from '@/components/go-back';
import UIButton from '@/components/ui-button';
import BankrollDetails from '@/features/bankrolls/components/bankroll-detail';
import TransactionList from '@/features/transactions/components/transactions-list';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <GoBackButton />
      <main className="my-4">
        <BankrollDetails id={id} />
        <TransactionList id={id} />
      </main>
      <div className="flex gap-2">
        <Link href={`/bankrolls/${id}/bets`}>
          <UIButton label="All bets" />
        </Link>
        <Link href={`/bankrolls/${id}/transactions/new`}>
          <UIButton label="Add transaction" />
        </Link>
        <Link href={`/bankrolls/${id}/bets/new`}>
          <UIButton label="Add bet" />
        </Link>
      </div>
    </div>
  );
}
