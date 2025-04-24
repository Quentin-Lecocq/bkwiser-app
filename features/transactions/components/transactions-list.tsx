'use client';

import { format } from 'date-fns';
import { FC } from 'react';
import { useTransactions } from '../hooks';

type TransactionListProps = {
  id: string;
};

const TransactionList: FC<TransactionListProps> = ({ id }) => {
  const { data: transactions = [], isLoading } = useTransactions(id);

  if (isLoading) return <p className="text-sm text-gray-400">Loading...</p>;

  return (
    <div className="mt-4 space-y-3">
      <h2 className="text-lg font-semibold">Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-sm text-gray-400">No transactions found.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="p-3 border border-gray-700 rounded-md bg-gray-900 flex justify-between items-center"
            >
              <div>
                <p className="text-sm">
                  <span className="font-semibold capitalize">{tx.type}</span> of{' '}
                  <span className="font-bold">{tx.amount} €</span>
                </p>
                <p className="text-xs text-gray-400">
                  {tx.transactionDate
                    ? format(new Date(tx.transactionDate), 'PPPpp')
                    : null}
                </p>
              </div>
              <span className="text-xs text-gray-500">
                {tx.id.slice(0, 6)}...
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
