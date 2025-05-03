'use client';

import { BetFormInput } from '@/core/schemas/bet.schema';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useCreateBet } from '../hooks';
import BetForm from './bet-form';

type CreateBetWrapperProps = {
  bankrollId?: string;
};

const CreateBetWrapper: FC<CreateBetWrapperProps> = ({ bankrollId }) => {
  const router = useRouter();

  const { mutate: createBet, isPending: isCreating, error } = useCreateBet();

  const handleCreate = (data: BetFormInput) => {
    if (!bankrollId) return;

    createBet(
      { ...data, bankrollId },
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
        onSubmit={handleCreate}
        isPending={isCreating}
        submitLabel="Create"
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default CreateBetWrapper;
