'use client';

import { Bankroll } from '@/core/domain/bankroll';
import Link from 'next/link';
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
          <li className="flex gap-4" key={bk.id}>
            <span>
              {bk.name} - {bk.currentAmount} {bk.currency}
            </span>
            <Link href={`/bankroll/${bk.id}`}>
              <button className="cursor-pointer">edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankrollList;
