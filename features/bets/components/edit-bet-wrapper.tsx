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
  const { data: bet, isLoading, isError } = useBet(betId);
  const {
    mutate: updateBet,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateBet();

  const handleUpdate = (data: BetFormInput) => {
    updateBet(
      { ...data, id: betId },
      {
        onSuccess: () => {
          router.push(`/bankrolls/${bet?.bankrollId}/bets`);
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
