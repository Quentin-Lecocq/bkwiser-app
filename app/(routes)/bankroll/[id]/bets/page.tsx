import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <p>Bet of bankroll {id}</p>
      <div className="flex gap-2">
        <Link href={`/bankroll/${id}`}>
          <Button className="cursor-pointer">Go back on bankroll</Button>
        </Link>
        <Link href="/bankroll">
          <Button className="cursor-pointer">All bankrolls</Button>
        </Link>
      </div>
    </div>
  );
}
