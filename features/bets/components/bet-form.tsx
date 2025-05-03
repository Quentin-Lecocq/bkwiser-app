'use client';

import { BET_TYPES } from '@/core/constants/bet';
import { BetFormInput, BetFormSchema } from '@/core/schemas/bet.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

type BetFormProps = {
  defaultValues?: BetFormInput;
  onSubmit: (data: BetFormInput) => void;
  isPending?: boolean;
  submitLabel?: string;
};

const BetForm: FC<BetFormProps> = ({
  defaultValues = {
    type: 'single',
    stake: 0,
    legs: [{ odds: 0, status: 'pending' }],
  },
  onSubmit,
  isPending = false,
  submitLabel = 'Submit',
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BetFormInput>({
    resolver: zodResolver(BetFormSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'legs',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Create bet</h2>

      <select {...register('type')} className="p-2 border rounded">
        {BET_TYPES.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
      {errors.type && <p className="text-red-500">{errors.type.message}</p>}

      <input
        type="number"
        {...register('stake', { valueAsNumber: true })}
        placeholder="Stake"
        className="p-2 border rounded"
      />
      {errors.stake && <p className="text-red-500">{errors.stake.message}</p>}

      <input
        type="datetime-local"
        {...register('date')}
        className="p-2 border rounded"
      />
      {errors.date && <p className="text-red-500">{errors.date.message}</p>}

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Legs</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="border p-2 rounded">
            <input
              type="number"
              step="0.01"
              {...register(`legs.${index}.odds`, { valueAsNumber: true })}
              placeholder="Odds"
              className="p-1 border rounded w-full mb-1"
            />
            <select
              {...register(`legs.${index}.status`)}
              className="p-1 border rounded w-full"
            >
              <option value="pending">Pending</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
              <option value="canceled">Canceled</option>
              <option value="refund">Refund</option>
            </select>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-sm text-red-500 mt-1"
            >
              Remove leg
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ odds: 0, status: 'pending' })}
          className="text-sm text-blue-500"
        >
          + Add leg
        </button>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isPending ? 'Submitting...' : submitLabel}
      </button>
    </form>
  );
};

export default BetForm;
