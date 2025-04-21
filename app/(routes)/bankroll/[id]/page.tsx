import BankrollDetails from '@/features/bankroll/components/bankroll-detail';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <Link href={'/bankroll'}>go back all bankrolls</Link>
      <BankrollDetails id={id} />
    </div>
  );
}
