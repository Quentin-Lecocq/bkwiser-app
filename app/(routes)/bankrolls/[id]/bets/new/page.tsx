import GoBackButton from '@/components/go-back';
import CreateBetWrapper from '@/features/bets/components/create-bet-wrapper';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <GoBackButton />
      <CreateBetWrapper bankrollId={id} />
    </div>
  );
}
