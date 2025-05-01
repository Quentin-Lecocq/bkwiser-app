import GoBackButton from '@/components/go-back';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <GoBackButton />
      <p>Create Bet Form for bankroll {id}</p>
    </div>
  );
}
