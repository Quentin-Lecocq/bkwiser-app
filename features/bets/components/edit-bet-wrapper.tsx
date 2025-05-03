import { BetFormInput } from '@/core/schemas/bet.schema';
import { useRouter } from 'next/navigation';
import { useUpdateBet } from '../hooks';
import BetForm from './bet-form';

type EditBetWrapperProps = {
  betId: string;
  initialValues: BetFormInput;
};

export default function EditBetWrapper({
  betId,
  initialValues,
}: EditBetWrapperProps) {
  const router = useRouter();
  const { mutate: updateBet, isPending, error } = useUpdateBet();

  const handleUpdate = (data: BetFormInput) => {
    updateBet(
      { id: betId, ...data },
      {
        onSuccess: () => {
          router.back();
        },
      },
    );
  };

  return (
    <div>
      <BetForm
        defaultValues={initialValues}
        onSubmit={handleUpdate}
        isPending={isPending}
        submitLabel="Update"
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}
