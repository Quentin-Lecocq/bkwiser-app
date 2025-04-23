import GoBackButton from '@/components/go-back';
import CreateTransactionForm from '@/features/transactions/components/create-transaction.form';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <GoBackButton />
      <CreateTransactionForm bankrollId={id} />
    </div>
  );
}
