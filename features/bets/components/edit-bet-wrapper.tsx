'use client';

import { BetFormInput } from '@/core/schemas/bet.schema';
import { useRouter } from 'next/navigation';
import { useBet, useUpdateBet } from '../hooks';
import BetForm from './bet-form';

type EditBetWrapperProps = {
  betId: string;
};

export default function EditBetWrapper({ betId }: EditBetWrapperProps) {
  const router = useRouter();
  const {
    mutate: updateBet,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateBet();
  const { data: bet, isLoading, isError } = useBet(betId);

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

  if (isLoading) return <p>Loading bet details...</p>;
  if (isError) return <p>Failed to load bet details.</p>;

  return (
    <div>
      <BetForm
        defaultValues={bet}
        onSubmit={handleUpdate}
        isPending={isUpdating}
        submitLabel="Update"
      />
      {updateError && <p className="text-red-500">{updateError.message}</p>}
    </div>
  );
}
