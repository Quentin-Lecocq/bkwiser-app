import GoBackButton from '@/components/go-back';
import CreateBetForm from '@/features/bets/components/create-bet.form';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <GoBackButton />
      <CreateBetForm bankrollId={id} />
    </div>
  );
}
