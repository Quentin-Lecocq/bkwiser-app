import GoBackButton from '@/components/go-back';
import EditBetWrapper from '@/features/bets/components/edit-bet-wrapper';

export default async function Page({
  params,
}: {
  params: Promise<{ betId: string }>;
}) {
  const { betId } = await params;
  return (
    <div>
      <GoBackButton />
      <EditBetWrapper betId={betId} />
    </div>
  );
}
