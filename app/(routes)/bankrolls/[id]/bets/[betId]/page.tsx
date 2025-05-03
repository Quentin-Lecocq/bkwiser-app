import GoBackButton from '@/components/go-back';

export default async function Page({
  params,
}: {
  params: Promise<{ betId: string }>;
}) {
  const { betId } = await params;
  const betData = await fetch(`/api/bets/${betId}`).then((res) => res.json());
  console.log({ betData });
  return (
    <div>
      <GoBackButton />
      {/* <EditBetWrapper betId={betId} /> */}
    </div>
  );
}
