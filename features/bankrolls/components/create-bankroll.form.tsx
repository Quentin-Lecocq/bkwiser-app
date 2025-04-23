'use client';

import {
  BANKROLL_CURRENCIES,
  BANKROLL_STATUS,
  CURRENCIES_SYMBOLS,
} from '@/core/constants/bankroll';
import {
  CreateBankrollInput,
  createBankrollSchema,
} from '@/core/schemas/bankroll.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useCreateBankroll } from '../hooks';

const CreateBankrollForm = () => {
  const router = useRouter();
  const { mutate, isPending, error } = useCreateBankroll();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateBankrollInput>({
    resolver: zodResolver(createBankrollSchema),
    defaultValues: {
      status: 'private',
      currency: 'EUR',
    },
  });

  function onSubmit(data: CreateBankrollInput) {
    mutate(data, {
      onSuccess: () => {
        reset();
        router.push('/bankrolls');
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Create Bankroll</h2>

      <input
        {...register('name')}
        placeholder="Bankroll Name"
        className="p-2 border rounded"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <input
        type="number"
        {...register('initialAmount', { valueAsNumber: true })}
        placeholder="Initial Amount"
        className="p-2 border rounded"
      />
      {errors.initialAmount && (
        <p className="text-red-500">{errors.initialAmount.message}</p>
      )}

      <select {...register('status')} className="p-2 border rounded">
        {BANKROLL_STATUS.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
      {errors.status && <p className="text-red-500">{errors.status.message}</p>}

      <select {...register('currency')} className="p-2 border rounded">
        {BANKROLL_CURRENCIES.map((currency) => (
          <option key={currency} value={currency}>
            {currency} ({CURRENCIES_SYMBOLS[currency]})
          </option>
        ))}
      </select>
      {errors.currency && (
        <p className="text-red-500">{errors.currency.message}</p>
      )}

      {error && <p className="text-red-500">{error.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
};

export default CreateBankrollForm;
