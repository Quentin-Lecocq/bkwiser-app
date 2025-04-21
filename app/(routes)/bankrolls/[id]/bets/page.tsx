import GoBackButton from '@/components/go-back';
import UIButton from '@/components/ui-button';
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
        <p>Bet of bankroll {id}</p>
      </main>
      <div className="flex gap-2">
        <Link href="/bankroll">
          <UIButton label="All bankrolls" />
        </Link>
      </div>
    </div>
  );
}
