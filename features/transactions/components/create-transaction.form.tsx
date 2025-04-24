'use client';

import { TRANSACTION_TYPES } from '@/core/constants/transaction';
import {
  TransactionFormInput,
  transactionFormSchema,
} from '@/core/schemas/transaction.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateTransaction } from '../hooks';

type CreateTransactionFormProps = {
  bankrollId: string;
};

const CreateTransactionForm: FC<CreateTransactionFormProps> = ({
  bankrollId,
}) => {
  const { mutate, isPending, error } = useCreateTransaction();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionFormInput>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: 'deposit',
    },
  });

  function onSubmit(data: TransactionFormInput) {
    const formattedData = {
      ...data,
      bankrollId,
    };

    mutate(formattedData, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Create transaction</h2>

      <select {...register('type')} className="p-2 border rounded">
        {TRANSACTION_TYPES.map((transaction) => (
          <option key={transaction} value={transaction}>
            {transaction.charAt(0).toUpperCase() + transaction.slice(1)}
          </option>
        ))}
      </select>
      {errors.type && <p className="text-red-500">{errors.type.message}</p>}

      <input
        type="number"
        {...register('amount', { valueAsNumber: true })}
        placeholder="Amount"
        className="p-2 border rounded"
      />
      {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}

      <input
        type="datetime-local"
        {...register('transactionDate')}
        className="p-2 border rounded"
      />
      {errors.transactionDate && (
        <p className="text-red-500">{errors.transactionDate.message}</p>
      )}

      {error && <p className="text-red-500">{error.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
};

export default CreateTransactionForm;
