import GoBackButton from '@/components/go-back';
import UIButton from '@/components/ui-button';
import BetList from '@/features/bets/components/bet-list';
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
      <main className="py-4">
        <BetList id={id} />
      </main>
      <div className="flex gap-2">
        <Link href="/bankroll">
          <UIButton label="All bankrolls" />
        </Link>
      </div>
    </div>
  );
}
