'use client';

import { FC } from 'react';
import { useBankroll } from '../hooks';

type BankrollDetailsProps = {
  id: string;
};

const BankrollDetails: FC<BankrollDetailsProps> = ({ id }) => {
  const { data, isLoading, isError } = useBankroll(id);

  if (isLoading)
    return <p className="text-sm text-gray-500 italic">Loading bankroll...</p>;

  if (isError)
    return <p className="text-red-500 font-medium">Something went wrong</p>;

  if (!data) return null;

  return (
    <div className="p-6 rounded-lg border border-gray-200 shadow-sm bg-white">
      <h3 className="text-xl font-semibold text-gray-800">{data.name}</h3>

      <div className="mt-4 flex flex-col gap-1 text-sm text-gray-700">
        <p>
          <span className="font-medium">Status:</span> {data.status}
        </p>
        <p>
          <span className="font-medium">Initial Amount:</span>{' '}
          {data.initialAmount} {data.currency}
        </p>
        <p>
          <span className="font-medium">Current Amount:</span>{' '}
          {data.currentAmount} {data.currency}
        </p>
        <p>
          <span className="font-medium">Created At:</span>{' '}
          {new Date(data.createdAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-medium">Archived:</span>{' '}
          {data.archivedAt ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  );
};

export default BankrollDetails;
