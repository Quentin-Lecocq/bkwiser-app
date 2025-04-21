'use client';

import { Bankroll } from '@/core/domain/bankroll';
import { useBankrolls } from '../hooks';

const BankrollList = () => {
  const { data, isLoading, isError } = useBankrolls();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>something went wrong</p>;

  return (
    <div>
      <h1>My bankrolls</h1>
      <ul>
        {data.map((bk: Bankroll) => (
          <li key={bk.id}>
            {bk.name} - {bk.currentAmount} {bk.currency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankrollList;
