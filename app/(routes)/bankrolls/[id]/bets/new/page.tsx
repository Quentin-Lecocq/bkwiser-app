import GoBackButton from '@/components/go-back';
import BetFormWrapper from '@/features/bets/components/bet-form-wrapper';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <GoBackButton />
      <BetFormWrapper bankrollId={id} />
    </div>
  );
}
