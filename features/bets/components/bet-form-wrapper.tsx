'use client';

import { BetFormInput } from '@/core/schemas/bet.schema';
import { useRouter } from 'next/navigation';
import { useCreateBet } from '../hooks';
import BetForm from './bet-form';

type BetFormWrapperProps = {
  initialValues?: BetFormInput;
  bankrollId?: string;
  onSubmit?: (data: BetFormInput) => void;
  isPending?: boolean;
  submitLabel?: string;
};

export default function BetFormWrapper({
  initialValues,
  bankrollId,
  onSubmit,
  isPending: externalIsPending = false,
  submitLabel,
}: BetFormWrapperProps) {
  const router = useRouter();
  const isEditMode = !!onSubmit;

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
        defaultValues={initialValues}
        onSubmit={onSubmit ?? handleCreate}
        isPending={isEditMode ? externalIsPending : isCreating}
        submitLabel={submitLabel ?? (isEditMode ? 'Update' : 'Create')}
      />
      {error && !isEditMode && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}
