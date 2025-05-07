import GoBackButton from '@/components/go-back';
import { TransactionForm } from '@/features/transactions/components/transaction-form';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <GoBackButton />
      <main className="mx-auto max-w-6xl py-4 px-8">
        <h2 className="text-2xl font-bold mb-4">Create transaction</h2>
        <TransactionForm bankrollId={id} />
      </main>
    </div>
  );
}
