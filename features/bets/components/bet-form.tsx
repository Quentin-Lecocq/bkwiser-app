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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 max-w-md"
    >
      <h2 className="text-2xl font-bold">Create Bet</h2>

      {/* Type */}
      <div className="flex flex-col gap-1">
        <label htmlFor="type" className="font-medium">
          Bet Type
        </label>
        <select id="type" {...register('type')} className="p-2 border rounded">
          {BET_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm">{errors.type.message}</p>
        )}
      </div>

      {/* Stake */}
      <div className="flex flex-col gap-1">
        <label htmlFor="stake" className="font-medium">
          Stake
        </label>
        <input
          id="stake"
          type="number"
          {...register('stake', { valueAsNumber: true })}
          className="p-2 border rounded"
        />
        {errors.stake && (
          <p className="text-red-500 text-sm">{errors.stake.message}</p>
        )}
      </div>

      {/* Date */}
      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="font-medium">
          Date
        </label>
        <input
          id="date"
          type="datetime-local"
          {...register('date')}
          className="p-2 border rounded"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Legs</h3>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border border-gray-600 rounded bg-[#1a1a1a] flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor={`legs.${index}.odds`}
                className="text-sm text-white"
              >
                Odds
              </label>
              <input
                id={`legs.${index}.odds`}
                type="number"
                step="0.01"
                {...register(`legs.${index}.odds`, { valueAsNumber: true })}
                className="p-2 border rounded bg-black text-white border-gray-700"
              />
              {errors.legs?.[index]?.odds && (
                <p className="text-red-500 text-sm">
                  {errors.legs[index].odds?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor={`legs.${index}.status`}
                className="text-sm text-white"
              >
                Status
              </label>
              <select
                id={`legs.${index}.status`}
                {...register(`legs.${index}.status`)}
                className="p-2 border rounded bg-black text-white border-gray-700"
              >
                <option value="pending">Pending</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
                <option value="canceled">Canceled</option>
                <option value="refund">Refund</option>
              </select>
              {errors.legs?.[index]?.status && (
                <p className="text-red-500 text-sm">
                  {errors.legs[index].status?.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="text-sm text-red-400 hover:underline self-start"
            >
              Remove leg
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ odds: 0, status: 'pending' })}
          className="text-sm text-blue-400 hover:underline self-start"
        >
          + Add leg
        </button>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Submitting...' : submitLabel}
      </button>
    </form>
  );
};

export default BetForm;
