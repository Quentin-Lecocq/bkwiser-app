'use client';

import { TRANSACTION_TYPES } from '@/core/constants/transaction';
import {
  CreateTransactionInput,
  createTransactionSchema,
} from '@/core/schemas/transaction.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const CreateTransactionForm = () => {
  const now = new Date();
  const defaultDateTime = now.toISOString().slice(0, 16);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: 'deposit',
      date: defaultDateTime,
    },
  });

  function onSubmit(data: CreateTransactionInput) {
    console.log('submit', data);
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
        {...register('date')}
        className="p-2 border rounded"
      />
      {errors.date && <p className="text-red-500">{errors.date.message}</p>}

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateTransactionForm;
