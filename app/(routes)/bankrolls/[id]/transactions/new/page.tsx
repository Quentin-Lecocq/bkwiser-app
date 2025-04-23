import GoBackButton from '@/components/go-back';
import CreateTransactionForm from '@/features/transactions/components/create-transaction.form';

export default function Page() {
  return (
    <div>
      <GoBackButton />
      <CreateTransactionForm />
    </div>
  );
}
